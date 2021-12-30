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

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug, "No charm id");
  const charms = new Store(await Charm.load());
  let charmQuads = charms.getQuads(request.url, null, null, null);
  if (charmQuads.length === 0) {
    charmQuads = charms.getQuads(params.slug, null, null, null);
  }
  // think about using validationschema to cast?
  if (charmQuads.length === 0) throw new Error("Not Found");

  const charm = Charm.hydrate(charmQuads)
  return json(charm as LoaderResponse);
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
