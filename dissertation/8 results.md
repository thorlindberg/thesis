{"chp":"Results"}

In this chapter I present the results of my experiment, which include a syntax proposal for utilising the features demonstrated through my JavaScript library, and a critical evaluation through comparison to TypeScript type declarations. As a preface to the results I present the grammatical system established with TXON, as well as the structure of each syntactical component.

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

{"break":true}

{"sub":"Syntax proposal structure"}

The syntax or grammar of any language or data format is derived from the ability to validate their correctness or inaccuracies. As such the syntax of type declarations and instances in TXON correspond directly to the features implemented in the JavaScript library. This also places certain restrictions or limitations on the usage of TXON, informed by the structure and flow of processes in the library. Each component of the syntax proposal is structured to provide an example of the valid and invalid data structure, the feedback provided from validating the invalid data, and a diagram illustrating the source of misconformance.

{"sub":"Evaluating the implementation"}

[ Text ]

{"break":true}