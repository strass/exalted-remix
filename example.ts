
export module prefixes {
    export const ex = "http://www.szoreny.essence.ooo/ontology#";
    export const owl = "http://www.w3.org/2002/07/owl#";
    export const rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
    export const xml = "http://www.w3.org/XML/1998/namespace";
    export const xsd = "http://www.w3.org/2001/XMLSchema#";
    export const rdfs = "http://www.w3.org/2000/01/rdf-schema#";
};

export module iris {
    export module undefined {
        export const ontology = "http://www.szoreny.essence.ooo/ontology";
    };
    export module rdf {
        export const type = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    };
    export module owl {
        export const Ontology = "http://www.w3.org/2002/07/owl#Ontology";
        export const ObjectProperty = "http://www.w3.org/2002/07/owl#ObjectProperty";
        export const inverseOf = "http://www.w3.org/2002/07/owl#inverseOf";
        export const DatatypeProperty = "http://www.w3.org/2002/07/owl#DatatypeProperty";
        export const topDataProperty = "http://www.w3.org/2002/07/owl#topDataProperty";
        export const Class = "http://www.w3.org/2002/07/owl#Class";
        export const disjointWith = "http://www.w3.org/2002/07/owl#disjointWith";
    };
    export module ex {
        export const charmProperty = "http://www.szoreny.essence.ooo/ontology#charmProperty";
        export const hasPrerequisite = "http://www.szoreny.essence.ooo/ontology#hasPrerequisite";
        export const isPrerequisite = "http://www.szoreny.essence.ooo/ontology#isPrerequisite";
        export const Charmlike = "http://www.szoreny.essence.ooo/ontology#Charmlike";
        export const isInCharmset = "http://www.szoreny.essence.ooo/ontology#isInCharmset";
        export const Charmset = "http://www.szoreny.essence.ooo/ontology#Charmset";
        export const CharmlikeProperty = "http://www.szoreny.essence.ooo/ontology#CharmlikeProperty";
        export const abilityRequirement = "http://www.szoreny.essence.ooo/ontology#abilityRequirement";
        export const aggravated_health_level_cost = "http://www.szoreny.essence.ooo/ontology#aggravated_health_level_cost";
        export const health_level_cost = "http://www.szoreny.essence.ooo/ontology#health_level_cost";
        export const anima_cost = "http://www.szoreny.essence.ooo/ontology#anima_cost";
        export const cost = "http://www.szoreny.essence.ooo/ontology#cost";
        export const bashing_health_level_cost = "http://www.szoreny.essence.ooo/ontology#bashing_health_level_cost";
        export const essenceRequirement = "http://www.szoreny.essence.ooo/ontology#essenceRequirement";
        export const lethal_health_level_cost = "http://www.szoreny.essence.ooo/ontology#lethal_health_level_cost";
        export const mote_cost = "http://www.szoreny.essence.ooo/ontology#mote_cost";
        export const willpower_cost = "http://www.szoreny.essence.ooo/ontology#willpower_cost";
        export const E3Charm = "http://www.szoreny.essence.ooo/ontology#E3Charm";
        export const E3Charmlike = "http://www.szoreny.essence.ooo/ontology#E3Charmlike";
        export const E3Evocation = "http://www.szoreny.essence.ooo/ontology#E3Evocation";
        export const EssenceCharm = "http://www.szoreny.essence.ooo/ontology#EssenceCharm";
        export const EssenceCharmlike = "http://www.szoreny.essence.ooo/ontology#EssenceCharmlike";
        export const EssenceEvocation = "http://www.szoreny.essence.ooo/ontology#EssenceEvocation";
    };
    export module rdfs {
        export const subPropertyOf = "http://www.w3.org/2000/01/rdf-schema#subPropertyOf";
        export const range = "http://www.w3.org/2000/01/rdf-schema#range";
        export const subClassOf = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
    };
    export module xsd {
        export const positiveInteger = "http://www.w3.org/2001/XMLSchema#positiveInteger";
        export const string = "http://www.w3.org/2001/XMLSchema#string";
    };
};


export type duration = string;
export type integer = number;
export type decimal = number;
export module RDF {
    export type Resource = {
        id: string
    };
};

export type Charmset = RDF.Resource & {

};

export type E3Charm = E3Charmlike & {

};

export type E3Charmlike = Charmlike & {

};

export type E3Evocation = E3Charmlike & {

};

export type EssenceCharm = EssenceCharmlike & {

};

export type EssenceCharmlike = Charmlike & {

};

export type EssenceEvocation = EssenceCharmlike & {

};

export type Charmlike = RDF.Resource & {

};

export function isBoolean(obj: any): obj is boolean {
    return typeof obj === "boolean";
}
export function isString(obj: any): obj is string {
    return typeof obj === "string";
}
export function isDuration(obj: any): obj is duration {
    return typeof obj === "string";
}
export function isInteger(obj: any): obj is integer {
    return typeof obj === "number";
}
export function isDecimal(obj: any): obj is decimal {
    return typeof obj === "number";
}
export function isCharmset(obj: any): obj is Charmset {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("Charmset" in types);
}
export function isE3Charm(obj: any): obj is E3Charm {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("E3Charm" in types) &&
        (isE3Charmlike(obj));
}
export function isE3Charmlike(obj: any): obj is E3Charmlike {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("E3Charmlike" in types || "E3Charm" in types || "E3Evocation" in types) &&
        (isCharmlike(obj));
}
export function isE3Evocation(obj: any): obj is E3Evocation {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("E3Evocation" in types) &&
        (isE3Charmlike(obj));
}
export function isEssenceCharm(obj: any): obj is EssenceCharm {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("EssenceCharm" in types) &&
        (isEssenceCharmlike(obj));
}
export function isEssenceCharmlike(obj: any): obj is EssenceCharmlike {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("EssenceCharmlike" in types || "EssenceCharm" in types || "EssenceEvocation" in types) &&
        (isCharmlike(obj));
}
export function isEssenceEvocation(obj: any): obj is EssenceEvocation {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("EssenceEvocation" in types) &&
        (isEssenceCharmlike(obj));
}
export function isCharmlike(obj: any): obj is Charmlike {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("Charmlike" in types || "E3Charmlike" in types || "EssenceCharmlike" in types);
}
export default {
    prefixes,
    iris
};
