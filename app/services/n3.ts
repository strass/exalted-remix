import * as n3 from "n3";

export class N3Service {
  static namespaces = {
    ex: process.env.ONTOLOGY_URI,
    /** URI for Charm and Charmlike Properties */
    exch: `${process.env.ONTOLOGY_URI}Charmlike.`,
    dc: "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  } as const;
  static DataFactory = n3.DataFactory;
  get DataFactory() {
    return N3Service.DataFactory;
  }

  writer: n3.Writer;
  parser: n3.Parser;
  constructor() {
    this.writer = new n3.Writer();
    this.parser = new n3.Parser();
    this.writer.addPrefixes(N3Service.namespaces);
  }

  quadsToTurtle(quads: n3.Quad[]) {
    return new Promise<string>((res, rej) => {
      this.writer.addQuads(quads);
      return this.writer.end((err, out) => {
        if (err) rej(err);
        res(out);
      });
    });
  }
}

export default new N3Service();
