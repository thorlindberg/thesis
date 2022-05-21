{"chp":"Experiment Setup"}

In this chapter I document the reproducible conditions and efforts from which I derived my results, by presenting the development and evaluation of my implementation. The purpose of this experiment is to implement validation of the syntactical features neccessary for typing JSON data structures, from which I will derive a grammar for my proposed format. These features are directly inspired from the TypeScript typesetting syntax, and as such the experiment includes an evaluation strategy for comparing the experiment setup to an existing TypeScript setup.

The proposal is entitled the `Type-Extensible Object Notation` (TXON) specification, and is a superset format that conforms to the JSON specification. This is derived from experimenting with the implementation of its grammar and syntactical features, through the development of a JavaScript validation library. Each component of the library corresponds to a syntactical feature, and as a whole it represents the grammar of TXON typesetting.

<!--

This approach is different from the traditional setup of specifying data requirements at each end of the system and validating it with the recipient's specification. This experiment must demonstrate that embedding requirements in data improves guarding and reduces defensive mechanisms for validation on the client side, whether it be a CI/CD system or an application.

-->

As seen in figure {"ref":"experimentsetup"} this experiment is set up as two sequential parts: the development of a library for exploring a new grammar and an evaluation strategy for comparing the existing and proposed syntax for typed data.

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