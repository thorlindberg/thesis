{"chp":"Results"}

In this chapter I present the results of my experiment, which include a syntax proposal for utilising the features demonstrated through my JavaScript library, and a critical evaluation through comparison to TypeScript type declarations. As a preface to the results I present the grammatical system established with TXON, as well as the structural blueprint for each component of the collective proposal.

<br>

{"sub":"Grammatical notation"}

As a superset of JSON the grammar of TXON can also be expressed with the McKeeman Form {"citep":"douglas2020form"}. As seen in figure {"ref":"txongrammar"} ...

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

[ Text ]

{"break":true}

{"sub":"Structure of a proposal"}

[ clarify that this was inspired by Swift Evolution proposals ]

A proposal for changes to syntax or grammatical features of a programming language is typically structured as an argument for the conditions that necessitate the proposed change. This includes samples of code that demonstrate the flaws of the current implementation, the proposal applied as a solution in a real-world scenario, and design considerations for both the impact of the proposed change and alternative solutions to the issue. As seen in the following the blueprint for a language proposal includes these components with this structure.

`Introduction:` a brief description of what the proposal aims to address and hows it improves upon a current situation.

`Motivation:` a step-wise description of the conditions necessitating the proposal, fluxuating between description and samples of code or other material that demonstrates the flaws of the current implementation. This argument for change concludes with the goal of the proposal.

`Proposed solution:` a step-wise description of the proposed changes, fluxuating between description and samples of code or other material that demonstrate the new implementation. This argument for the demonstrated proposal concludes with the changes accomplished.

`Detailed design:` an enumerated list describing how the proposed changes are expressed, fluxuating between description and samples of code or other material that showcase these expressions. This should include a criticial reflection on the proposed expressions and unsupported expressions if any exist in the implementation.

`Alternatives considered:` a step-wise description of alternative changes, fluxuating between description and samples of code or other material that demonstrate the alternative implementations. This can vary greatly in how closely the alternatives correlate or do not correlate, as there are often multiple varied paths to achieving the same effect.

`Source compatibility:` a description of the impact on existing code if any, such as changes that deprecate existing code over new preferred approaches or invalidate it syntactically, referred to as "source-breaking".

`Future directions:` a description of further changes that could be or should be made to accomodate this proposal or improve upon the implementation of a certain part of the given language.

{"break":true}

{"sub":"Motivation"}

The syntax or grammar of any language or data format is derived from the ability to validate their correctness or inaccuracies. As such the syntax of type declarations and instances in TXON correspond directly to the features implemented in the JavaScript library. This also places certain restrictions or limitations on the usage of TXON, informed by the structure and flow of processes in the library. Each component of the syntax proposal is structured to provide an example of the valid and invalid data structure, the feedback provided from validating the invalid data, and a diagram illustrating the source of misconformance.

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types: "string, number, object, array, boolean, and null". It explicitly precludes the types: "function, date, and undefined". A JSON object is represented as a string of curly brackets with properties inside.

```
{ "date": "28-10-2005" }
```

<br>

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explictly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{ "type": "string", "date": "28-10-2005" }
```

<br>

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A date property with a string-value could instead be represented as an object with properties for month, day, and year. Representing these properties with number-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of numbers.

As evidenced, embedding these restrictions in the data results in more specification properties than useful data. As the amount of information scales linearly, so too does the restrictions, while increasing the chance of syntax errors.

```
{
    "type": "number",
    "date": { "month": 10, "day": 28, "year": 2005 }
}
```
```
{
    "type": "number",
    "date": {
        "month": { "min": 1, "max": 31, "value": 10 },
        "day": { "min": 1, "max": 31, "value": 28 },
        "year": { "value": 2005 }
    }
}
```

<br>

As it turns out, this is not a unique problem, and thus the solution already exists: enumerations. This user-defined data type allows us to declare a specification once, and then instantiate it without repetition of requirements.

{"break":true}

{"sub":"Terminology and definitions in proposal"}

As a preface to the resulting syntax proposal, I provide the following system of terms and define the meaning I prescribe to them in my proposal. The purpose of these definitions is to alleviate any potential confusion of terminology, as it is crucial to understand the language used to understand the proposal as a whole. This system of terms reflects the grammatical notation of the TXON data structure, but also covers the intricacies of applying it to existing data structures with untyped data points.

<br>

A `type` differentiates values and deliminates their potential content, such as characters, numbers, or more complex types like arrays and objects. Types are properties that derive meaning from their names, referred to as their `type names`, and values that conform to `JSON types`.

`Type names` establish a reference point for utilising types, and syntactically differentiate between `extended types` and `type extensions`. Type names from the JSON specification are reserved, so they can only be utilised in an extension.

- `Extended types` extend JSON types with enumerated properties. A local type can be declared for each case of an enumerated property, with the optional addition of a shared type for all cases.

- `Type extensions` extend a JSON type with enumerated properties using the dot (.) syntax. A local type can be declared for each case of an enumerated property, but no additional or shared type declaration is necessary as the extension inherits from the JSON type.

`JSON types` define the acceptable type of values for properties in a JSON/TXON data structure. The seven type names in the JSON specification are: object, array, string, number, true, false, and null.

<br>

The `type system` is comprised of all available types presented above. In a TXON data structure this system is expressed through the declaration of one or more types in the "init" property of the root node. These `declarations`can be referenced through `instances` in the "data" property of the root node.

`Declarations` act as blueprints for instantiating a type, and must be named with an `extended type` or `type extension`. This blueprint enumerates `value names`, which are either required or `optional values`, with values conforming to the JSON specification. There are two reserved property names in a declaration: "type" for `shared types` and "case" for `case names`.

- `Value names` are the names of enumerated properties of a type utilised during instantiation, and specify a JSON type that their values must conform to in an instance.

- `Optional values` are the properties of a type not required during instantiation, and as such they are optional. They specify a JSON type name, which they must conform to if included in an instance. Their names are similar to required values, but utilise the question mark syntax (?) appended to their name.

- `Shared types` are properties with the name "type" declared at the root of an extended type. Their values must conform to type names in the JSON specification, and all enumerated properties inherit this type.

- `Local types` are properties with the name "type" declared with enumerated properties or the values of enumerated properties. These types override shared types or type extensions, or can be the sole source of typing for extended types with no shared type.

- `Case names` are the names of enumerated properties of a type, declared as the arrayrised value of a "case" property at the root of a type. This is useful when a type is an extension or an extended type with a shared type and all values share the same JSON type. As such their values must conform to type names in the JSON specification.

`Instances` act as initialisers based on the specification of the type declaration they reference. An instance is a data point of the JSON value type "Object" containing the property name "type" that references an extended type or type extension. Instances must at minimum initialise the required properties of the type they reference. Instead of separate instances for multiple data points initialising the same referenced type, `shared instances` can be utilised with a "values" property name.

- `Shared instances` are initialised with a data point of the JSON value type "Object" that contains the property names "type" and "values". The "type" property must reference an extended type or type extension, and will be inherited by all initialised data points. The "values" property has an arrayrised value containing one or more data points of the JSON value type "Object". Each data point is an instance of the inherited type, and as such they must initialise all required properties of that type, but they do not need individual type references.

{"break":true}