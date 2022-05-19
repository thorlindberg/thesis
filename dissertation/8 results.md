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

A proposal for changes to syntax or grammatical features of a programming language is typically structured as an argument for the conditions that necessitate the proposed change. This includes samples of code that demonstrate the flaws of the current implementation, the proposal applied as a solution in a real-world scenario, and design considerations for both the impact of the proposed change and alternative solutions to the issue. As seen in the following the blueprint for a language proposal includes these components with this structure.

`Introduction:` a brief description of what the proposal aims to address and hows it improves upon a current situation.

`Motivation:` a step-wise description of the conditions necessitating the proposal, fluxuating between description and samples of code or other material that demonstrates the flaws of the current implementation. This argument for change concludes with the goal of the proposal.

`Proposed solution:` a step-wise description of the proposed changes, fluxuating between description and samples of code or other material that demonstrate the new implementation. This argument for the demonstrated proposal concludes with the changes accomplished.

`Detailed design:` an enumerated list describing how the proposed changes are expressed, fluxuating between description and samples of code or other material that showcase these expressions. This should include a criticial reflection on the proposed expressions and unsupported expressions if any exist in the implementation.

`Alternatives considered:` a step-wise description of alternative changes, fluxuating between description and samples of code or other material that demonstrate the alternative implementations. This can vary greatly in how closely the alternatives correlate or do not correlate, as there are often multiple varied paths to achieving the same effect.

`Source compatibility:` a description of the impact on existing code if any, such as changes that deprecate existing code over new preferred approaches or invalidate it syntactically, referred to as "source-breaking".

`Future directions:` a description of further changes that could be or should be made to accomodate this proposal or improve upon the implementation of a certain part of the given language.

{"break":true}