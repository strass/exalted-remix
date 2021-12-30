// @ts-nocheck

export module prefixes {
    export const ex = "http://www.szoreny.essence.ooo/ontology#";
    export const owl = "http://www.w3.org/2002/07/owl#";
    export const rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
    export const xml = "http://www.w3.org/XML/1998/namespace";
    export const xsd = "http://www.w3.org/2001/XMLSchema#";
    export const rdfs = "http://www.w3.org/2000/01/rdf-schema#";
};

export module iris {
    export module ex {
        export const _ = "http://www.szoreny.essence.ooo/ontology#";
        export const Charm_aggravatedHealthLevelCost = "http://www.szoreny.essence.ooo/ontology#Charm.aggravatedHealthLevelCost";
        export const Charm_healthLevelCost = "http://www.szoreny.essence.ooo/ontology#Charm.healthLevelCost";
        export const Charm_animaCost = "http://www.szoreny.essence.ooo/ontology#Charm.animaCost";
        export const Charm_cost = "http://www.szoreny.essence.ooo/ontology#Charm.cost";
        export const Charm_bashingHealthLevelCost = "http://www.szoreny.essence.ooo/ontology#Charm.bashingHealthLevelCost";
        export const Charm_charmPrerequisite = "http://www.szoreny.essence.ooo/ontology#Charm.charmPrerequisite";
        export const Charm_description = "http://www.szoreny.essence.ooo/ontology#Charm.description";
        export const Charm_duration = "http://www.szoreny.essence.ooo/ontology#Charm.duration";
        export const Charm_essenceMinimum = "http://www.szoreny.essence.ooo/ontology#Charm.essenceMinimum";
        export const Charm_keyword = "http://www.szoreny.essence.ooo/ontology#Charm.keyword";
        export const Charm_lethalHealthLevelCost = "http://www.szoreny.essence.ooo/ontology#Charm.lethalHealthLevelCost";
        export const Charm_moteCost = "http://www.szoreny.essence.ooo/ontology#Charm.moteCost";
        export const Charm_name = "http://www.szoreny.essence.ooo/ontology#Charm.name";
        export const Charm_statMinimum = "http://www.szoreny.essence.ooo/ontology#Charm.statMinimum";
        export const Charm_statMinimumName = "http://www.szoreny.essence.ooo/ontology#Charm.statMinimumName";
        export const Charm_statMinimumValue = "http://www.szoreny.essence.ooo/ontology#Charm.statMinimumValue";
        export const Charm_type = "http://www.szoreny.essence.ooo/ontology#Charm.type";
        export const Charm_uri = "http://www.szoreny.essence.ooo/ontology#Charm.uri";
        export const Charm_willpowerCost = "http://www.szoreny.essence.ooo/ontology#Charm.willpowerCost";
        export const Charm = "http://www.szoreny.essence.ooo/ontology#Charm";
        export const Charmset = "http://www.szoreny.essence.ooo/ontology#Charmset";
    };
    export module rdf {
        export const type = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    };
    export module owl {
        export const Ontology = "http://www.w3.org/2002/07/owl#Ontology";
        export const DatatypeProperty = "http://www.w3.org/2002/07/owl#DatatypeProperty";
        export const topDataProperty = "http://www.w3.org/2002/07/owl#topDataProperty";
        export const Class = "http://www.w3.org/2002/07/owl#Class";
        export const disjointWith = "http://www.w3.org/2002/07/owl#disjointWith";
    };
    export module rdfs {
        export const subPropertyOf = "http://www.w3.org/2000/01/rdf-schema#subPropertyOf";
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

export type Charm = RDF.Resource & {

};

export type Charmset = RDF.Resource & {

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
export function isCharm(obj: any): obj is Charm {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("Charm" in types);
}
export function isCharmset(obj: any): obj is Charmset {
    const types = (obj.type || []).reduce((memo, type) => { memo[type] = true; return memo; }, {});
    return (obj != null) &&
        ("type" in obj && obj.type instanceof Array) &&
        ("Charmset" in types);
}
export default {
    prefixes,
    iris
};
