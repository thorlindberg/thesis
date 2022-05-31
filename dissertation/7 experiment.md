{"chp":"Experiment Setup"}

In this chapter I document the reproducible conditions and efforts put towards the type-extensible evolution of the JSON format. The purpose of this experiment is to implement a type declaration, instantiation and conformance validation. This is accomplished by constructing unit tests that demonstrate JSON data structures with type nonconformance, and then implementing the necessary JavaScript code until these can be functionally invalidated. The outcome of this experiment is a validation library that can be compared to an existing implementation of types with TypeScript, and the result is a proposal for the grammar of a typed JSON data structure.

The proposal is entitled the `Type-Extensible Object Notation` (TXON) format, and specifies a grammatical notation for declaring types and referencing them in type instances. The features and syntax of this grammar is directly derived from the unit tests and the ability to invalidate a nonconforming data structure through the `TXON.js` validation library. This specification serves to embed explicit types directly in transmitted JSON data structures, for the purpose of standardising the validation of an otherwise weakly typed format.

As seen in figure {"ref":"experimentsetup"} this experiment describes three sequential parts: the unit tests that need to be invalidated by the library, the development of the validation library, and a strategy for evaluating the resulting grammar and syntax proposal. As this implementation heavily relies on code, each section will include an exhaustive presentation, split into smaller and more digestible components. The samples use three dots (...) to indicate redacted code blocks, but all code is documented.

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
        "implementation": [
            "library",
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

{"sub":"Motivation for relational type instances"}

The syntax or grammar of any language or data format is derived from the ability to validate their correctness or inaccuracies. As such the syntax of type declarations and instances in TXON correspond directly to the features implemented in the JavaScript library. This also places certain restrictions or limitations on the usage of TXON, informed by the validation flow of the library. 

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types `string` `number` `object` `array` `boolean` and `null`. This precludes the JavaScript types `function` `date` and `undefined`.

```
{ "date": "28-10-2005" }
```

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explicitly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{ "type": "string", "date": "28-10-2005" }
```

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A `date` property with a string-value could instead be represented as an object with properties for `month` `day` and `year`. Representing these properties with number-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of numbers. Embedding these restrictions in the data results in more specification properties than useful data.

```
{ "type": "number", "date": { "month": 10, "day": 28, "year": 2005 } }
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

{"break":true}