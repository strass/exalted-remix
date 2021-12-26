import * as n3 from "n3";
import { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ request, params }) => {
  const writer = new n3.Writer();
  writer.addPrefixes({
    ex: "http://szorny.essence.ooo/ontology/#",
    exch: "http://szorny.essence.ooo/ontology/charm#",
  });
  try {
    const res = await new Promise<string>((res, rej) =>
      writer.end((err, out) => {
        if (err) rej(err);
        res(out);
      })
    );
    return new Response(res);
  } catch (ex) {
    throw new Error();
  }
};

export default null;
