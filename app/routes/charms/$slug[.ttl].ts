import { LoaderFunction } from "remix";
import Charm from "~/factory/Charm";
import N3Service from "~/services/n3";

export const loader: LoaderFunction = async ({ request, params }) => {
  const charms = await Charm.load();
  const charm = charms.filter((c) => c.subject.value === params.slug);
  try {
    const res = await N3Service.quadsToTurtle(charm);
    return new Response(res, { headers: { "Content-Type": "text/turtle" } });
  } catch (ex) {
    throw new Error("Internal Error");
  }
};

export default null;
