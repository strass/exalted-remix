import namespaces from "~/const/namespaces";
import { ICharm } from "types/Charms";
import fs from "fs/promises";
import { Parser } from "n3";
import path from "path";
import { SchemaOf, object, string } from "yup";

export default class Charm {
  name;
  slug;
  description;
  constructor(charm: ICharm) {
    this.name = charm.name;
    this.slug = charm.slug;
    this.description = charm.description;
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
  });

  static async validate(values: ICharm) {
    return Charm.validationSchema.validate(values, { abortEarly: false });
  }

  get uri() {
    return `${namespaces.CHARM}/${this.slug}`;
  }

  get ttl() {
    return `<#${this.slug}>
  a exch:charm ;
  exch:label "${this.name}" ;
  exch:description """${this.description}""" .
`;
  }

  async save() {
    const charms = await Charm.load();
    if (charms.find((c) => c.subject.value === `#${this.slug}`)) {
      console.warn("failed to create charm - slug already exists");
      throw new Error("slug already exists");
    }
    return Charm.validate(this)
      .then(() => {
        return fs.appendFile(path.resolve("data/data.ttl"), this.ttl);
      })
      .catch((ex) => {
        throw ex
      });
  }
}
