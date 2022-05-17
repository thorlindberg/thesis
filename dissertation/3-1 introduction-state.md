{"sub":"State-of-the-Art"}

I approached this project with understanding of and respect for the existing structures and practices wherein I seek to contribute. It is crucial to acknowledge that the importance of data interchange has resulted in extensive work into the grammar, transmission and universiality of data formats. For this reason I developed my proposal with emphasis on humility and causing the least disruption of existing implementations in systems and languages.

The popularity of the JavaScript Object Notation (JSON) made it an obvious choice for this project. As the web became ubiquitous, so too did the JavaScript language, from which the JSON data format is derived. The specification for the JSON format stresses human-readability and universiality across systems and programming languages {"citep":"ecma2022json"}. JSON is a plain-text format, meaning it can be displayed and edited in any text processing application. The seven values types available in JSON are: object, array, string, number, true, false, and null.

{"cite":"douglas2020form"} presents the grammar of JSON in the McKeeman Form, which is a notation for expressing grammars While JSON specifies a clear hierarchy of data nodes, this notation is necessary as some of the grammar includes recursion. As seen in figure {"ref":"jsontypes"} I have attempted to hierarchally present this grammatical notation, but this should be viewed as an abstractation that does not accurately portray the exhaustive grammar of JSON.

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

{"fig":"jsontypes","caption":"Grammatical notation of types specified in the JSON data format."}

{"break":true}