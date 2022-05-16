{"sec":"Purpose of this Project"}

This project contributes with a proposal for type declarations within the JavaScript Object Notation (JSON) specification, by defining a syntax for extensible declaration and relation references. The result is a superset JSON data format, the Type-Extensible Object Notation (TXON), paired with a JavaScript library to validate the conformance of a data structure to this format. Type declarations in this format can contain enumerated values and extensible types, while remaining compatible with JSON parsers. This proposal is developed within the context of the existing and historical body of work on interchangable data formats and extensibility in programming languages.

The proposal was directly inspired by the TypeScript programming language, which is a superset of the JavaScript language, from which the JSON specification is derived. TypeScript takes an extensible approach to declaring strongly-typed JavaScript properties, by maintaing the structure of JavaScript, allowing developers to add as many or no declarations at all. This also means that TypeScript code becomes JavaScript code with slight modifications to declarations.

[ Example of the TXON features + syntax ]

[ Diagram of a JSON data structure compared to a TXON data structure ]

{"break":true}