{"chp":"Experiment Setup"}

In this chapter I document the reproducible conditions and efforts put towards the type-extensible evolution of the JSON format. The purpose of this experiment is to implement a type declaration, instantiation and conformance validation. This is accomplished by constructing unit tests that demonstrate JSON data structures with type nonconformance, and then implementing the necessary JavaScript code until these can be functionally invalidated. The outcome of this experiment is a validation library that can be compared to an existing implementation of types with TypeScript, and the result is a proposal for the grammar of a typed JSON data structure.

The proposal is entitled the `Type-Extensible Object Notation` (TXON) format, and specifies a grammatical notation for declaring types and referencing them in type instances. The features and syntax of this grammar is directly derived from the unit tests and the ability to invalidate a nonconforming data structure through the `TXON.js` validation library. This specification serves to embed explicit types directly in transmitted JSON data structures, for the purpose of standardising the validation of an otherwise weakly typed format.

As seen in figure {"ref":"experimentsetup"} this experiment describes three sequential parts: the unit tests that need to be invalidated by the library, the development of the validation library, and a strategy for evaluating the resulting proposal and its functional implementation. As this implementation heavily relies on code, each section will include an exhaustive presentation, split into smaller and more digestible components. The samples use three dots (...) to indicate redacted code blocks, but all code is documented.

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
        "unit testing": [
            "type declaration units",
            "type instance units"
        ],
        "implementation": [
            "validation library",
            "type declarations",
            "type instances"
        ],
        "evaluation": [
            "data transformation",
            "validation features"
        ]
    }
}

@endjson
@enduml

{"fig":"experimentsetup","caption":"The sequence of the three parts described in this experiment."}

{"break":true}