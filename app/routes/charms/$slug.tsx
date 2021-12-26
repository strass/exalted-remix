import { Link, LoaderFunction, useLoaderData, useLocation } from "remix";
import Charm from "~/factory/Charm";
import * as n3 from "n3";
import invariant from "tiny-invariant";
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "No charm id");
  const charms = new n3.Store(await Charm.load());
  const charmQuads = charms.getQuads(params.slug, null, null, null);
  console.log(
    Object.fromEntries(
      charmQuads.map((charm) => [
        charm.predicate.value.split("#")[1],
        charm.object.value,
      ])
    )
  );
  return Object.fromEntries(
    charmQuads.map((charm) => [
      charm.predicate.value.split("#")[1],
      charm.object.value,
    ])
  );
};

export default function Charms() {
  const charm = useLoaderData<ReturnType<typeof loader>>();
  const location = useLocation();
  return (
    <div>
      <h1>{charm.label}</h1>
      <p style={{ whiteSpace: "pre" }}>{charm.description}</p>
      <Link to={`${location.pathname}.ttl`} reloadDocument>
        rdf
      </Link>
    </div>
  );
}
