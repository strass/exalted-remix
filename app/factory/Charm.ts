import namespaces from "~/const/namespaces";
import fs from "fs/promises";
import { Parser } from "n3";
import path from "path";
import { SchemaOf, object, string, mixed } from "yup";
import * as n3 from "n3";

export interface ICharm {
  name: string;
  slug: string;
  description: string;
  type: "Charmlike" | "SolarCharm";
  cost:
    | string
    | Record<"mote" | "anima" | "willpower" | "bhl" | "lhl" | "ahl", number>;
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
  subject: n3.NamedNode;
  type: ICharm["type"] = "Charmlike";

  constructor(charm: ICharm) {
    this.name = charm.name;
    this.slug = charm.slug;
    this.description = charm.description;
    this.type = charm.type ?? "Charmlike";
    this.cost = charm.cost;
    this.subject = n3.DataFactory.namedNode(charm.slug);
  }

  static async load() {
    const data = await fs.readFile(path.resolve("data/data.ttl"));
    const p = new Parser().parse(data.toString());
    return p;
  }

  static validationSchema: SchemaOf<ICharm> = object({
    name: string().required(),
    slug: string().required(),
    description: string().required(),
    type: mixed().oneOf<ICharm["type"]>(["Charmlike", "SolarCharm"]),
  });

  static async validate(values: ICharm) {
    return Charm.validationSchema.validate(values, { abortEarly: false });
  }

  get ttl() {
    const w = new n3.Writer();
    const prefixes = { ex: namespaces.CHARM, rdfs: NNM.label, dc: 'https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#' };
    w.addPrefixes(prefixes);
    const objectPredicatePairs = [
      [NNM.type, `ex:${this.type}`],
      ["rdfs:label", this.name],
      ['dc:description', this.description]
      // ["ex:cost", this.cost],
    ];
    w.addQuads(
      objectPredicatePairs.map(([predicate, object]) =>
        n3.DataFactory.triple(
          this.subject,
          n3.DataFactory.namedNode(predicate),
          object.startsWith("ex:")
            ? n3.DataFactory.namedNode(object)
            : n3.DataFactory.literal(object)
        )
      )
    );

    return new Promise<string>((res, rej) => {
      return w.end((err, result: string) => {
        if (err) rej(err);

        return res(
          result.split("\n").slice(Object.keys(prefixes).length).join("\n")
        );
      });
    });
  }

  async save() {
    const charms = await Charm.load();
    if (charms.find((c) => c.subject.value === `#${this.slug}`)) {
      console.warn("failed to create charm - slug already exists");
      throw new Error("slug already exists");
    }
    return Charm.validate(this)
      .then(async () =>
        fs.appendFile(path.resolve(process.env.DATA_FILE), await this.ttl)
      )
      .catch((ex) => {
        throw ex;
      });
  }
}
