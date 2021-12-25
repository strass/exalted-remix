import { Link, LoaderFunction, useLoaderData, useLocation } from "remix";
import Charm from "~/factory/Charm";

export const loader: LoaderFunction = async ({ params }) => {
  const charms = await Charm.load();
  return Object.fromEntries(
    charms
      .filter((charm) => charm.subject.value === `#${params.slug}`)
      .map((charm) => [charm.predicate.value.split("#")[1], charm.object.value])
  );
};

export default function Charms() {
  const charm = useLoaderData<ReturnType<typeof loader>>();
 const location = useLocation()
  return (
    <div>
      <h1>{charm.label}</h1>
      <p>{charm.description}</p>
      <Link to={`${location.pathname}.ttl`} reloadDocument>rdf</Link>
    </div>
  );
}
