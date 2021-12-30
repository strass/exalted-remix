import { LoaderFunction } from "remix";
import Charm from "../../../services/Charm";
import N3Service from "../../../services/n3";

export const loader: LoaderFunction = async ({ request, params }) => {
  const charms = N3Service.createStore(await Charm.load());
  let charmQuads = charms.getQuads(request.url, null, null, null);
  if (charmQuads.length === 0) {
    charmQuads = charms.getQuads(params.slug as string, null, null, null);
  }
  try {
    const res = await N3Service.quadsToTurtle(charmQuads);
    return new Response(res, { headers: { "Content-Type": "text/turtle" } });
  } catch (ex) {
    console.error(ex)
    throw new Error("Internal Error");
  }
};

export default null;
