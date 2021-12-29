import fs from "fs/promises";
import { Parser } from "n3";
import path from "path";
import { SchemaOf, object, string, number } from "yup";
import * as n3 from "n3";
import { N3Service } from "../services/n3.js";

export interface ICharm {
  name: string;
  slug: string;
  description: string;
  type: string;
  cost: string;
  // TODO: would this be useful to store separately?
  // keyword: string[];
  keywords: string;
  charmPrerequisites: string;
  abilityMin: number;
  essenceMin: number;
  duration: string;
}

const NNM = {
  type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
  label: "https://www.w3.org/1999/02/22-rdf-syntax-ns#",
};

export default class Charm {
  name: ICharm["name"];
  slug: ICharm["slug"];
  description: ICharm["description"];
  cost: ICharm["cost"];
  type: ICharm["type"] = "Charmlike";
  keywords: ICharm["keywords"];
  charmPrerequisites: ICharm["charmPrerequisites"];
  abilityMin: ICharm["abilityMin"];
  essenceMin: ICharm["essenceMin"];
  duration: ICharm["duration"];

  constructor(charm: ICharm) {
    this.name = charm?.name;
    this.slug = charm?.slug;
    this.description = charm?.description;
    this.type = charm?.type;
    this.cost = charm?.cost;
    this.keywords = charm?.keywords;
    this.charmPrerequisites = charm?.charmPrerequisites;
    this.abilityMin = charm?.abilityMin;
    this.essenceMin = charm?.essenceMin;
    this.duration = charm?.duration;
  }

  static async load() {
    const data = await fs.readFile(path.resolve("data/data.ttl"));
    const p = new Parser().parse(data.toString());
    return p;
  }

  static validationSchema: SchemaOf<ICharm> = object({
    name: string().label("Name").required(),
    slug: string()
      .label("Slug")
      .required()
      .test("unique slug", "Slug already taken", (value, context) => {
        return (context?.options?.context?.slugs ?? []).includes(value)
          ? false
          : true;
      }),
    type: string().label("Type").required(),
    cost: string().label("Cost").required(),
    // keyword: string().label("").required(),
    keywords: string().label("Keywords").required(),
    charmPrerequisites: string().label("Prerequisite Charms").required(),
    abilityMin: number().label("Ability Minimum").integer().required(),
    essenceMin: number().label("Essence Minimum").integer().required(),
    duration: string().label("Duration").required(),
    description: string()
      .label("Description")
      .meta({ type: "textarea" })
      .required(),
  });

  static async validate(values: ICharm, slugs: string[]) {
    return Charm.validationSchema.validate(values, {
      abortEarly: false,
      context: { slugs },
    });
  }

  static propertyNames = Object.getOwnPropertyNames(
    new Charm(undefined as any)
  );
  get subject() {
    return new n3.NamedNode(this.slug);
  }
  get ttl() {
    const w = new n3.Writer();
    const prefixes = {
      ex: process.env.ONTOLOGY_URI as string,
      rdfs: NNM.label,
      dc: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#",
    } as const;
    w.addPrefixes(prefixes);
    const objectPredicatePairs = [
      [NNM.type, `ex:Charmlike`],
      ["rdfs:label", this.name],
      ["ex:Charmlike.type", this.type],
      ["ex:Charmlike.cost", this.cost],
      ["ex:Charmlike.keyword", this.keywords],
      ["ex:Charmlike.charmPrerequisites", this.charmPrerequisites],
      ["ex:Charmlike.abilityMin", this.abilityMin],
      ["ex:Charmlike.essenceMin", this.essenceMin],
      ["ex:Charmlike.duration", this.duration],
      ["dc:description", this.description],
      // ["ex:cost", this.cost],
    ] as const;
    w.addQuads(
      objectPredicatePairs.map(([predicate, object]) =>
        n3.DataFactory.triple(
          this.subject,
          n3.DataFactory.namedNode(predicate),
          typeof object === "string" && object.startsWith("ex:")
            ? n3.DataFactory.namedNode(object)
            : n3.DataFactory.literal(object)
        )
      )
    );

    return new Promise<string>((res, rej) => {
      return w.end((err, result: string) => {
        if (err) rej(err);

        return res(
          // Remove the prefixes lines because the data.ttl file already has them
          result.split("\n").slice(Object.keys(prefixes).length).join("\n")
        );
      });
    });
  }

  async save() {
    const charms = await Charm.load();
    const store = N3Service.createStore(charms);
    const slugs = store.getSubjects(null, null, null);
    console.log(slugs);
    return Charm.validate(
      this,
      slugs.map((s) => s.id)
    )
      .then(async () =>
        fs.appendFile(path.resolve(process.env.DATA_FILE as string), await this.ttl)
      )
      .catch((ex) => {
        throw ex;
      });
  }

  static examples = {
    wiseArrow: {
      slug: "wise-arrow",
      name: "Wise Arrow",
      type: "Supplemental",
      cost: "1m",
      keywords: "Uniform",
      charmPrerequisites: "None",
      abilityMin: 2,
      essenceMin: 1,
      duration: "Instant",
      description: `This Charm enhances an Archery attack roll, reducing the opponent’s Defense or allowing her to bypass her opponent’s cover. The target’s Defense is reduced by 1. Alternatively, the Solar may target an opponent hiding behind full cover, provided there is some opening for an arrow to reach him. This requires an aim action, and treats him as if, instead of full cover, he had +3 Defense`,
    } as ICharm,
  } as const;
}
