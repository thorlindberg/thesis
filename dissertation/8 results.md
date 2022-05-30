{"chp":"Results"}

In this chapter I present the results of my experiment, which includes a syntax proposal for extensibly typed JSON data structures and a critical evaluation of its implementation through the TXON.js library. To preface these results I present the Type-Extensible Object Notation (TXON)) grammar derived from this experiment, as well as the system of terminologies used throughout the proposal.

<br>

{"sub":"Grammatical notation"}

As a superset format of JSON the TXON grammar can also be expressed with the McKeeman Form {"citep":"douglas2020form"}. As seen in figure {"ref":"txongrammar"} this form implies a hierarchy of declarations, and some elements of the syntax can be recursively declared.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "json": "element",
    "ws": {
        "members": [ "member", "member , members" ],
        "member": "ws string ws : element",
        "elements": [ "element", "element , elements" ],
        "element" : "ws value ws",
        "characters": [ "character characters" ],
        "character": ""
    },
    "value": {
        "object": [ "{ ws }", "{ ws }" ],
        "array": "[ member ]",
        "string": "\" characters \"",
        "number": {
            "integer": [ "digit", "onenine digits", "- digit", "- onenine digits" ],
            "fraction": [ ". digits" ],
            "exponent": [ "E sign digits", "e sign digits" ]
        },
        "true": "true",
        "false": "false",
        "null": "null"
    }
}

@endjson
@enduml

{"fig":"txongrammar","caption":"Grammatical notation of types declared and instantiated with TXON."}

{"break":true}

{"sub":"Terminology and definitions in proposal"}

As a preface to the resulting syntax proposal, I provide the following system of terms and define the meaning I prescribe to them in my proposal. The purpose of these definitions is to alleviate any potential confusion of terminology, as it is crucial to understand the language used to understand the proposal as a whole. This system of terms reflects the grammatical notation of the TXON data structure, but also covers the intricacies of applying it to existing data structures with untyped data points.

<br>

A `type` differentiates values and deliminates their potential content, such as characters, numbers, or more complex types like arrays and objects. Types are properties that derive meaning from their names, referred to as their `type names`, and values that conform to `JSON types`.

<br>

`Type names` establish a reference point for utilising types, and syntactically differentiate between `extended types` and `type extensions`. Type names from the JSON specification are reserved, so they can only be utilised in an extension.

- `Extended types` extend JSON types with enumerated properties. A local type can be declared for each case of an enumerated property, with the optional addition of a shared type for all cases.

- `Type extensions` extend a JSON type with enumerated properties using the dot (.) syntax. A local type can be declared for each case of an enumerated property, but no additional or shared type declaration is necessary as the extension inherits from the JSON type.

<br>

`JSON types` define the acceptable type of values for properties in a JSON/TXON data structure. The seven type names in the JSON specification are: object, array, string, number, true, false, and null.

<br>

The `type system` is comprised of all available types presented above. In a TXON data structure this system is expressed through the declaration of one or more types in the "init" property of the root node. These `declarations` are referenced through `instances` in the "data" property of the root node.

{"break":true}

`Declarations` act as blueprints for instantiating a type, and must be named with an `extended type` or `type extension`. This blueprint enumerates `value names`, which are either required or `optional values`, with values conforming to the JSON specification. There are two reserved property names in a declaration: "type" for `shared types` and "case" for `case names`.

- `Value names` are the names of enumerated properties of a type utilised during instantiation, and specify a JSON type that their values must conform to in an instance.

- `Optional values` are the properties of a type not required during instantiation, and as such they are optional. They specify a JSON type name, which they must conform to if included in an instance. Their names are similar to required values, but utilise the question mark syntax (?) appended to their name.

- `Shared types` are properties with the name "type" declared at the root of an extended type. Their values must conform to type names in the JSON specification, and all enumerated properties inherit this type.

- `Local types` are properties with the name "type" declared with enumerated properties or the values of enumerated properties. These types override shared types or type extensions, or can be the sole source of typing for extended types with no shared type.

- `Case names` are the names of enumerated properties of a type, declared as the arrayrised value of a "case" property at the root of a type. This is useful when a type is an extension or an extended type with a shared type and all values share the same JSON type. As such their values must conform to type names in the JSON specification.

<br>

`Instances` act as initialisers based on the specification of the type declaration they reference. An instance is a data point of the JSON value type "Object" containing the property name "type" that references an extended type or type extension. Instances must at minimum initialise the required properties of the type they reference. Instead of separate instances for multiple data points initialising the same referenced type, `shared instances` can be utilised with a "values" property name.

- `Shared instances` are initialised with a data point of the JSON value type "Object" that contains the property names "type" and "values". The "type" property must reference an extended type or type extension, and will be inherited by all initialised data points. The "values" property has an arrayrised value containing one or more data points of the JSON value type "Object". Each data point is an instance of the inherited type, and as such they must initialise all required properties of that type, but they do not need individual type references.

{"break":true}