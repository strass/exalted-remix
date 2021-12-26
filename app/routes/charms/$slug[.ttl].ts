import * as n3 from "n3";
import { LoaderFunction } from "remix";
import namespaces from "~/const/namespaces";
import Charm from "~/factory/Charm";

export const loader: LoaderFunction = async ({ request, params }) => {
  const charms = await Charm.load();
  const charm = charms.filter((c) => c.subject.value === params.slug);

  const writer = new n3.Writer();
  writer.addPrefixes({ ex: namespaces.CHARM });
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
