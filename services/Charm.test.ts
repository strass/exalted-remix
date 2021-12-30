import Charm from "./Charm";

describe("CharmBuilder", () => {
  it("has properties", () =>
    expect(Charm.propertyNames).toMatchInlineSnapshot(`
Array [
  "type",
  "name",
  "slug",
  "description",
  "cost",
  "keywords",
  "charmPrerequisites",
  "abilityMin",
  "essenceMin",
  "duration",
]
`));

  it("can generate a ttl", async () => {
    const charm = new Charm(Charm.examples.wiseArrow as any);
    expect(await charm.ttl).toMatchInlineSnapshot(`
"
<wise-arrow> a ex:Charmlike;
    rdfs:label \\"Wise Arrow\\";
    ex:Charmlike.Type \\"Supplemental\\";
    ex:Charmlike.Cost \\"1m\\";
    ex:Charmlike.Keyword \\"Uniform\\";
    ex:Charmlike.charmPrerequisites \\"None\\";
    ex:Charmlike.abilityMin 2;
    ex:Charmlike.essenceMin 1;
    ex:Charmlike.duration \\"Instant\\";
    dc:description \\"This Charm enhances an Archery attack roll, reducing the opponent’s Defense or allowing her to bypass her opponent’s cover. The target’s Defense is reduced by 1. Alternatively, the Solar may target an opponent hiding behind full cover, provided there is some opening for an arrow to reach him. This requires an aim action, and treats him as if, instead of full cover, he had +3 Defense\\".
"
`);
  });
});

export {};
