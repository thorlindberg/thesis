{"chp":"Experiment Setup"}

In this chapter I document the reproducible conditions and efforts from which I derived my results, by presenting the development and evaluation of my implementation. The purpose of this experiment is to implement validation of the syntactical features neccessary for typing JSON data structures, from which I will derive a grammar for my proposed format. These features are directly inspired from the TypeScript type syntax, and as such the experiment includes an evaluation strategy for comparing the experiment setup to an existing TypeScript setup.

The proposal is entitled the `Type-Extensible Object Notation` (TXON) specification, and is a superset format that conforms to the JSON specification. This is derived from experimenting with the implementation of its grammar and syntactical features, through the development of a JavaScript validation library. Each component of the library corresponds to a syntactical feature, and as a whole it represents the grammar of TXON types.

<p style="color: red">
This approach is different from the traditional setup of specifying data requirements at each end of the system and validating it with the recipient's specification. This experiment must demonstrate that embedding requirements in data improves guarding and reduces defensive mechanisms for validation on the client side, whether it be a CI/CD system or an application.
</p>

As seen in figure {"ref":"experimentsetup"} this experiment is set up as two sequential parts: the development of a library for exploring a new grammar and an evaluation strategy for comparing the existing and proposed syntax for typed data. As this implementation heavily relies on code, each section will include an exhaustive presentation, split into smaller and more digestible components. The code samples will include three dots (...) to indicate that part of the sample has been excluded and will appear as its own separate sample.

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
        "implementation": [
            "syntax for type declarations",
            "syntax for type instances"
        ],
        "evaluation": [
            "typed data structure",
            "statically typed server validation"
        ]
    }
}

@endjson
@enduml

{"fig":"experimentsetup","caption":"..."}

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