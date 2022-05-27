{"sec":"Proposal for Type-Extensible Format"}

In the following section I present my proposal for a data interchange format, motivated and informed by these current conditions in the field of software development. This does not include an exhaustive implementation in a distributed system, but rather illustrates and argues for a data object notation that is both safer and easier to use.

In this section I introduce my proposal for the notation and syntax of a strongly- and extensibly-typed data interchange format, as documented with this report. This format is the result of a process involving exploration of the field and development in collaboration with software developers.

<br>

{"sub":"State-of-the-Art"}

I approached this project with understanding of and respect for the existing structures and practices wherein I seek to contribute. It is crucial to acknowledge that the importance of data interchange has resulted in extensive work into the grammar, transmission and universiality of data formats. For this reason I developed my proposal with emphasis on humility and causing the least disruption of existing implementations in systems and languages.

The popularity of the JavaScript Object Notation (JSON) made it an obvious choice for this project. As the web became ubiquitous, so too did the JavaScript language, from which the JSON data format is derived. The specification for the JSON format stresses human-readability and universiality across systems and programming languages {"citep":"ecma2022json"}. JSON is a plain-text format, meaning it can be displayed and edited in any text processing application. The seven value types available in JSON are: object, array, string, number, true, false, and null.

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

{"sub":"Purpose of this Project"}

This project contributes with a proposal for type declarations within the JavaScript Object Notation (JSON) specification, by defining a syntax for extensible declaration and relation references. The result is a superset JSON data format, the Type-Extensible Object Notation (TXON), paired with a JavaScript library to validate the conformance of a data structure to this format. Type declarations in this format can contain enumerated values and extensible types, while remaining compatible with JSON parsers.

The proposal was directly inspired by the TypeScript programming language, which is a superset of the JavaScript language, from which the JSON specification is derived {"citep":"micro2022typescript"}. TypeScript takes an extensible approach to declaring strongly-typed JavaScript properties, by maintaing the structure of JavaScript, allowing developers to add as many or no declarations at all. This also means that TypeScript code becomes JavaScript code with slight modifications to declarations.

The TXON format provides support for type declarations and instances, which are validated and compared for conformance. The syntax itself is extensible, meaning all, some, or none of the data can be typed with TXON, just as it is with TypeScript. The type declarations are also extensible, meaning they can extend existing declarations or JSON types with enumerated values, minimum to maximum value ranges, and default values.

{"break":true}

As seen in figure {"ref":"txonsyntax"} a TXON data structure contains at least two root nodes: "init" and "data". It is typical of JSON data structures to contain data in a root "data" property, and the "init" property was added to contain type declarations. As seen in figure {"ref":"txonjson"} the TXON syntax requires fewer characters than JSON at scale, when it is assumed that both structures require validation. This illustrates how the TXON approach to generalised validation saves both development time and reduces file sizes, relative to utilising JSON and writing custom validation code.

```
{
    "init": {
        "number.date": { "case": "month" }
    },
    "data": {
        "date": { "type": "number.date", "month": 4 },
        "description": "The month of my birth"
    }
}
```
{"fig":"txonsyntax","caption":"Example of the extensible approach to both type declaration and initialisation, as the type inherits from the JSON \"number\" type and not all of the data references a type."}

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
    "txon": {
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
    "json": {
        "data": {
            "month": 4,
            "description": "The month of my birth"
        }
    }
}

@endjson
@enduml

{"fig":"txonjson","caption":"Comparison of a strongly-typed TXON data structure and a weakly-typed JSON data structure."}

{"break":true}

{"sub":"Target Audience"}

I characterise the intended reader of this report, by presenting the knowledge and experience that an ideal reader would have from my perspective. This characterisation is included to provide a baseline for what I expect from the reader, and the target audience this report was written to accomodate.

An ideal reader would have an educational background (either degree or current program) in Information Technology, Computer Science, or equivalent experience. This should provide them with an understanding of various data formats, most importantly the difference in application between plain-text and binary data. Additionally they should understand matrices, relational data, and object-oriented programming. Experience with statically and strongly-typed programming languages, and an understanding of how type-checking guides developers while they write, would be ideal but not expected.

<br>

{"sub":"Problem Statement"}

As the project was developed it was crucial to deliminate the problem area, to ensure continuity from exploration to development to evaluation. This project explores the problem area of a strongly-typed data interchange format conforming to the JSON specification, and results in a proposal for the its syntax and implementation.

Inspired by the syntax and implementation of TypeScript the Type-Extensible Object Notation (TXON) proposed in this report emphasises the values of extensibility, human-readability, and universiality/interoperability across systems and programming languages. This is expressed in my approach to altering as few existing structures and practices as possible, while providing a safer and easier to use syntax than JSON.

The proposal presented in this report aims to demonstrate the features:

1. Type declarations and instances (through relational references).
2. Extensible typing (as little or much as wanted) and extensible types (inheritance).
3. Enumerated values with required or optional cases.

The proposed features are demonstrated with a validation library, and critically evaluated with an implementation comparison to TypeScript declarations in a CI/CD environment on GitLab. This is not an exhaustive review of the format, but this should not be necessary as it conforms to the JSON specification with non-breaking extension.

{"break":true}