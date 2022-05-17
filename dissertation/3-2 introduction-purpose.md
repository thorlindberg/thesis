{"sub":"Purpose of this Project"}

<!--
I contribute to this field with a proposal for a strongly-typed superset syntax for JSON data structures, similar to how the superset TypeScript languages provides typing of JavaScript data structures. The Type-Extensible Object Notation (TXON) data format developed for this proposal provides a syntax for type declarations and relational references in JSON data structures. As a superset of JSON this format is fully compatible with existing JSON parsers, as it conforms to the JSON specification. A validation layer evaluates the conformance of the data structure based on references to its type declarations, providing developers with feedback on where and why the transmitted data structure is invalid.
-->

This project contributes with a proposal for type declarations within the JavaScript Object Notation (JSON) specification, by defining a syntax for extensible declaration and relation references. The result is a superset JSON data format, the Type-Extensible Object Notation (TXON), paired with a JavaScript library to validate the conformance of a data structure to this format. Type declarations in this format can contain enumerated values and extensible types, while remaining compatible with JSON parsers. This proposal is developed within the context of the existing and historical body of work on interchangable data formats and extensibility in programming languages.

The proposal was directly inspired by the TypeScript programming language, which is a superset of the JavaScript language, from which the JSON specification is derived {"citep":"micro2022typescript"}. TypeScript takes an extensible approach to declaring strongly-typed JavaScript properties, by maintaing the structure of JavaScript, allowing developers to add as many or no declarations at all. This also means that TypeScript code becomes JavaScript code with slight modifications to declarations.

The TXON format provides support for type declarations and instances, which are validated and compared for conformance. The syntax itself is extensible, meaning all, some, or none of the data can be typed with TXON, just as it is with TypeScript. The type declarations are also extensible, meaning they can extend existing declarations or JSON types with enumerated values, minimum to maximum value ranges, and default values.

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