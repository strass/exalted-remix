import { FunctionComponent } from "react";
import { ICharm } from "../../services/Charm";

const CharmDisplay: FunctionComponent<{
  charm: Omit<ICharm, "slug">;
  children?: never;
}> = ({ charm }) => {
  return (
    <>
      <h1>{charm.name}</h1>
      <ul>
        <li>{charm.type}</li>
        <li>{charm.cost}</li>
        <li>{charm.keywords}</li>
        <li>{charm.charmPrerequisites}</li>
        <li>
          {charm.abilityMin} {charm.essenceMin}
        </li>
        <li>{charm.duration}</li>
      </ul>
      <p style={{ whiteSpace: "pre-wrap" }}>{charm.description}</p>
    </>
  );
};

export default CharmDisplay;
