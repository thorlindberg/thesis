{"sec":"Experiment Setup"}

In this section I present the specification of my Type-Extensible Object Notation (TXON) data interchange format. This is a superset of JSON and its validation features are implemented in JavaScript, to evaluate its usefulness by comparing it to an existing TypeScript validation process.

The TXON library is paired with a JSON-derived TXON syntax proposal for declaring types, type extensions, and instantiating type conformance. As such, the validation features in this experiment reflect syntactical features, and their testing is conducted with proposed syntactical samples.

This approach is different from the traditional setup of specifying data requirements at each end of the system and validating it with the recipient's specification. This experiment must demonstrate that embedding requirements in data improves guarding and reduces defensive mechanisms for validation on the client side, whether it be a CI/CD system or an application.

{"break":true}