import { json, Link, LoaderFunction, useLoaderData, useLocation } from "remix";
import Charm from "../../../services/Charm";
import { Store, DataFactory } from "n3";
import invariant from "tiny-invariant";
import CharmDisplay from "~/components/CharmDisplay";
import { ComponentProps, FunctionComponent } from "react";
import N3Service from "../../../services/n3";

type LoaderResponse = Omit<
  ComponentProps<typeof CharmDisplay>["charm"],
  "slug"
>;

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "No charm id");
  const charms = new Store(await Charm.load());
  const charmQuads = charms.getQuads(params.slug, null, null, null);
  // think about using validationschema to cast?
  if (charmQuads.length === 0) throw new Error("Not Found");
  console.log(charmQuads);
  const response = {
    name: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.rdfs}label`,
      null
    )[0]?.value,
    type: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}type`,
      null
    )[0]?.value,
    cost: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}cost`,
      null
    )[0]?.value,
    keywords: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}keywords`,
      null
    )[0]?.value,
    charmPrerequisites: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}charmPrerequisites`,
      null
    )[0]?.value,
    abilityMin: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}abilityMin`,
      null
    )[0]?.value,
    essenceMin: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}essenceMin`,
      null
    )[0]?.value,
    duration: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.exch}duration`,
      null
    )[0]?.value,
    description: charms.getObjects(
      params.slug,
      `${N3Service.namespaces.dc}description`,
      null
    )[0]?.value,
  };
  const castResponse = Charm.validationSchema.cast(response);
  return json(castResponse as LoaderResponse);
};

const Charms: FunctionComponent = () => {
  const charm = useLoaderData<LoaderResponse>();
  const location = useLocation();
  return (
    <article style={{ maxWidth: 400 }}>
      <CharmDisplay charm={charm} />
      <Link to={`${location.pathname}.ttl`} reloadDocument>
        rdf
      </Link>
    </article>
  );
};

export default Charms;
