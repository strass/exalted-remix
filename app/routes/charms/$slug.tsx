import { LoaderFunction, useLoaderData } from "remix";
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
  return (
    <div>
      <h1>{charm.label}</h1>
      <p>{charm.description}</p>
    </div>
  );
}
