{"sub":"Validation of JSON and TXON"}

The TypeScript language offers strongly and explicitly typed declarations and structures, which are applicable to a validation process. On their own these structures do not validate, but as data is cast to a typed structure it can be checked based on type conformance. As such they require the writing of more code than declarations. Type declarations support enumerated values and optional values, as well as relational references from one structure to another type or structure, allowing types to inherit from each other.

The `txon.js library` supports type conformance validation of typed JSON data structures, as long as they contain an initialiser property and data property at the root node. TXON types must be correctly declared before conformance of references to them can be checked. Type declarations support enumerated values, minimum to maximum ranges, and default value insertion.

As TXON declarations were modelled on TypeScript declarations, they measure similarly on readability.

Character count...

{"break":true}