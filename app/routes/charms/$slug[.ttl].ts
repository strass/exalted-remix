import * as n3 from "n3";
import { LoaderFunction } from "remix";
import Charm from "~/factory/Charm";

export const loader: LoaderFunction = async ({ request, params }) => {
  const charms = await Charm.load();
  const charm = charms.filter((c) => c.subject.value === `#${params.slug}`);
  console.log(charm);
  const writer = new n3.Writer();
  writer.addPrefixes({ exch: "http://essence.ooo/#" });
  writer.addQuads(charm);
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
