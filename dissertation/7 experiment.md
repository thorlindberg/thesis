{"chp":"Experiment Setup"}

In this chapter I document the reproducible conditions and efforts put towards the type-extensible evolution of the JSON format. The purpose of this experiment is to implement a type declaration, instantiation and conformance validation. This is accomplished by constructing unit tests that demonstrate explicitly typed data structures conforming to the JSON specification, and then implementing the necessary JavaScript code until these can be functionally invalidated. The outcome of this experiment is a validation library that can be compared to an existing implementation of types with TypeScript, and the result is a proposal for the grammar of a typed JSON data structure.

The proposal is entitled the `Type-Extensible Object Notation` (TXON) format, and specifies a grammatical notation for declaring types and referencing them in type instances. The features and syntax of this grammar is directly derived from the unit tests and the ability to invalidate a nonconforming data structure through the `txon.js` validation library. This specification serves to embed explicit types directly in transmitted JSON data structures, for the purpose of standardising the validation of an otherwise weakly typed format. In order to succeed the TXON format must demonstrate that embedding requirements in data improves guarding and reduces dependency on custom defensive mechanisms.

As seen in figure {"ref":"experimentsetup"} this experiment describes three sequential parts: the unit tests that need to be invalidated by the library, the development of the validation library, and a strategy for evaluating the resulting grammar and syntax proposal. As this implementation heavily relies on code, each section will include an exhaustive presentation, split into smaller and more digestible components. The code samples will include three dots (...) to indicate that part of the sample has been excluded and will appear as its own separate code block.

<br>

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
    "experiment": {
        "testing": [
            "unit tests"
        ],
        "implementation of nonconformance invalidation": [
            "type declarations",
            "type instances"
        ],
        "evaluation": [
            "typed data structure",
            "statically typed server validation"
        ]
    }
}

@endjson
@enduml

{"fig":"experimentsetup","caption":"The sequence of the three parts described in this experiment."}

{"break":true}

{"sub":"Motivation"}

The syntax or grammar of any language or data format is derived from the ability to validate their correctness or inaccuracies. As such the syntax of type declarations and instances in TXON correspond directly to the features implemented in the JavaScript library. This also places certain restrictions or limitations on the usage of TXON, informed by the structure and flow of processes in the library. Each component of the syntax proposal is structured to provide an example of the valid and invalid data structure, the feedback provided from validating the invalid data, and a diagram illustrating the source of nonconformance.

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types: "string, number, object, array, boolean, and null". It explicitly precludes the types: "function, date, and undefined". A JSON object is represented as a string of curly brackets with properties inside.

```
{ "date": "28-10-2005" }
```

<br>

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explicitly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{ "type": "string", "date": "28-10-2005" }
```

{"break":true}

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