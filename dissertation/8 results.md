{"chp":"Results"}

In this chapter I present the results of my experiment, which include a syntax proposal for utilising the features demonstrated through my JavaScript library, and a critical evaluation through comparison to TypeScript type declarations. As a preface to the results I present the grammatical system established with TXON, as well as the structure of each syntactical component.

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