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
    console.log(data.toString());
    const p = new Parser().parse(data.toString());
    console.log(p);
    return p;
  }

  get uri() {
    return `${namespaces.CHARM}/${this.slug}`;
  }

  get ttl() {
    return `<#${this.slug}>
  exch:label "${this.name}" ;
  exch:description """${this.description}""" .
`;
  }

  async save() {
    console.log(path.resolve("data/data.ttl"));
    // TODO: check for duplicate fields
    const promise = fs.appendFile(path.resolve("data/data.ttl"), this.ttl);
    await promise;
    Charm.load();
    return promise;
  }
}
