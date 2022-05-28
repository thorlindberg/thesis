{"sec":"Proposal for Type-Extensible Format"}

In this section I present my proposal for a new data interchange format, motivated and informed by the changes occouring the field of software development. This format provides a grammar and syntax for declaring and instantiating strong, extensible and explicit types. It is the result of deriving tests from existing data structures to demonstrate type weaknesses, followed by functional implementation that validates its syntax when applied to data structures.

<br>

{"sub":"State-of-the-Art"}

I approached this project with understanding and respect for the existing structures and practices wherein I seek to contribute. It is crucial to acknowledge that the importance of data interchange has resulted in extensive work into the grammar, transmission and universiality of data formats. For this reason I developed my proposal with emphasis on causing the least disruption of existing implementations in systems and languages.

The popularity of the `JavaScript Object Notation` (JSON) made it an obvious choice for this project. As the web became ubiquitous, so too did the `JavaScript programming language`, from which the JSON data format is derived. The specification for the JSON format stresses human-readability and universiality across systems and programming languages {"citep":"ecma2022json"}. JSON is a plain-text format, meaning it can be displayed and edited in any text processing application. The seven types in JSON are `object` `array` `string` `number` `true` `false` and `null`.

{"cite":"douglas2020form"} presents the grammar of JSON in the `McKeeman Form`, which is a notation for expressing grammars. While JSON specifies a clear hierarchy of data nodes, this notation is necessary as some of the grammar includes recursion. As seen in figure {"ref":"jsontypes"} I have attempted to hierarchally represent this grammatical notation, but this should be viewed as an abstractation that does not exhaustively portray the grammar of JSON.

<br>

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "json": {
        "element": [
            "ws",
            {
                "value": {
                    "object": [
                        "{ ws }",
                        "{ members }"
                    ],
                    "array": [
                        "[ ws ]",
                        "[ elements ]"
                    ],
                    "string": "\" characters \"",
                    "number": {
                        "integer": [
                            "digit",
                            "onenine digits",
                            "- digit",
                            "- onenine digits"
                        ],
                        "fraction": ". digits",
                        "exponent": [
                            "E sign digits",
                            "e sign digits"
                        ]
                    },
                    "true": "true",
                    "false": "false",
                    "null": "null"
                }
            },
            "ws"
        ]
    }
}

@endjson
@enduml

{"fig":"jsontypes","caption":"Grammatical notation of types specified in the JSON data format."}

{"break":true}

{"sub":"Purpose of this Project"}

This project contributes to existing implementations of the JSON specification by proposing a grammar for explicit and extensible typing of values. This proposal is phrased as the `Type-Extensibe Object Notation` (TXON) which is a format that conforms completely to the JSON specification, and as such it maintains full compatibility with existing JSON encoders and decoders. The TXON format is paired with the `txon.js` library written in JavaScript, to validate the syntactical application in a data structure and conformance within its embedded type system.

The proposal was directly inspired by the `TypeScript programming language`, which is a superset of the JavaScript language, from which the JSON specification is derived {"citep":"micro2022typescript"}. TypeScript takes an extensible approach to declaring strongly-typed JavaScript properties, by maintaing the structure of JavaScript, allowing developers to add as many or no declarations at all. This also means that TypeScript code becomes JavaScript code with slight modifications.

The TXON format provides support for type declarations and instances, which are validated and compared for conformance. The syntax itself is extensible, meaning all, some, or none of the data can be typed with TXON, just as it is with TypeScript. The type declarations are also extensible, meaning they can extend existing declarations or JSON types with enumerated values, minimum to maximum value ranges, and default values.

As seen in figure {"ref":"txonjson"} the TXON data structure mirrors the JSON data structure, but adds an `initialiser` through its "init" property for type declarations and explicit selective typing of the corresponding node. A TXON data structure must contain an "init" and "data" property to be validated, but this is not expected to cause issue as JSON structures typically branch from a "data" property at the root node. As such the format is extensibly adding information on types, while maintaing as much of the original structure as possible.

<br>

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "TXON": {
        "init": {
            "number.date": {
                "case": "month"
            }
        },
        "data": {
            "date": {
                "type": "number.date",
                "month": 4
            },
            "description": "The month of my birth"
        }
    },
    "JSON": {
        "data": {
            "month": 4,
            "description": "The month of my birth"
        }
    }
}

@endjson
@enduml

{"fig":"txonjson","caption":"Comparison of a TXON data structure and JSON data structure."}

{"break":true}

{"sub":"Target Audience"}

The intended reader of this report can be characterised by illustrating the knowledge and experience expected from them. This characterisation is included because the topics involved in this report are not exhaustively presented and discussed, but to a limited degree that matches the perspective of the target audience.

An ideal reader would have an educational background (either degree or current program) in Information Technology, Computer Science, or equivalent experience. This should provide them with an understanding of various data formats, as well as experience in working with them in software development. Additionally they should understand matrices, relational data, and object-oriented programming. Experience with statically and strongly-typed programming languages is not expected, but would help the reader understand the choices made when developing this project.

<br>

{"sub":"Problem Statement"}

As the project was developed it was crucial to deliminate the problem area, to ensure continuity from exploration to development to evaluation. This project explores the problem area of a strongly-typed data interchange format conforming to the JSON specification. The result of this development is a proposal for the grammar, implementation and validation of such a format.

Inspired by the syntax and implementation of TypeScript the proposed Type-Extensible Object Notation (TXON) emphasises the values of extensibility, human-readability, and interoperability across systems and programming languages. This is expressed in my approach to altering as few existing structures and practices as possible, while providing a safer and easier to use syntax than JSON. The proposal presented in this report aims to implement validation of a typed JSON superset syntax providing:

<br>

1. Type declarations and instances (through relational references).
2. Extensible typing (as little or much as wanted) and extensible types (relational inheritance).
3. Enumerated values, minimum to maximum ranges, and default value insertion.

<br>

The proposed features are demonstrated and validated through the `txon.js` library, and critically evaluated with a comparison to TypeScript validation in the CI/CD environment of GitLab. This is not an exhaustive review of the format, but this should not be necessary as it conforms to the JSON specification.

{"break":true}