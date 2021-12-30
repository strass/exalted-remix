import { Link, useLoaderData } from "remix";
import Charm from "../../../services/Charm";

export const loader = async () => {
  const charms = await Charm.load();
  const groupedCharms = charms.reduce ((acc, quad) => {
    const key = quad.subject.value.split("#")[1];
    acc[key] = {
      ...acc[key],
      slug: key,
      [quad.predicate.value.split("#")[1]]: key,
    };
    return acc;
  }, {});

  return Object.keys(groupedCharms).map((id) => groupedCharms[id]);
};

export default function Charms() {
  const charms = useLoaderData();

  return (
    <div>
      <h1>Charms</h1>
      <ul>
        {charms.map((charm) => (
          <li key={charm.slug}>
            <Link to={charm.slug}>{charm.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
