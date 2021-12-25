import namespaces from "~/const/namespaces";
import { ICharm } from "types/Charms";
import fs from "fs/promises";
import { Parser } from "n3";
import path from "path";

export default class Charm {
  name;
  slug;
  description;
  constructor(data: ICharm) {
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
  }

  static async load() {
    const data = await fs.readFile(path.resolve("data/data.ttl"));
    const p = new Parser().parse(data.toString());
    return p;
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
      console.warn('failed to create charm - slug already exists')
      throw new Error("slug already exists");
    }
    const promise = fs.appendFile(path.resolve("data/data.ttl"), this.ttl);
    return promise;
  }
}
