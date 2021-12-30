import * as n3 from "n3";
import invariant from "tiny-invariant";
import { prefixes, iris } from "../app/routes/ontology/__schema.js";

invariant(process.env.ONTOLOGY_URI, "Provide ONTOLOGY_URI env var");
class N3Service {
  get namespaces() {
    return prefixes;
  }
  static DataFactory = n3.DataFactory;
  get DataFactory() {
    return N3Service.DataFactory;
  }
  get iris() {
    return iris;
  }
  static createStore = (quads: n3.Quad[]) => new n3.Store(quads);
  get createStore() {
    return N3Service.createStore;
  }
  writer: n3.Writer;
  parser: n3.Parser;
  constructor() {
    this.writer = new n3.Writer();
    this.parser = new n3.Parser();
    this.writer.addPrefixes(prefixes);
  }

  quadsToTurtle(quads: n3.Quad[]) {
    const writer = new n3.Writer();
    return new Promise<string>((res, rej) => {
      writer.addQuads(quads);
      return writer.end((err, out) => {
        if (err) rej(err);
        res(out);
      });
    });
  }
}

export default new N3Service();
