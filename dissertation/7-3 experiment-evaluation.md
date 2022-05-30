{"sec":"Evaluation Strategy"}

In this section I present my strategy for evaluating the results of this experiment, through an example of its use. The purpose of this evaluation is to evaluate the impact of implementing the TXON format in an existing system. This is accomplished by assessing the transformation of a JSON to TXON data structure, and assessing to which degree the `TXON.js` library can substitute an existing validation process that casts the JSON data structure to TypeScript types. As the proposed grammar provides a standardised and generic approach to typed data and its validation, I demonstrate that when a data structure is invalid it is easier to debug if it conforms to the TXON specification.

<br>

{"sub":"Transformation from JSON to TXON"}

While a TXON data structure conforms to the JSON specification, its contents are extended with type declarations and explicitly typed data through type instances. The implication of this is that types that would otherwise exist in a statically typed programming language such as TypeScript, have to be embedded into the JSON data structure. Once these types are part of the data structure, they can be instantiated through relational references by extending the contents of the data with types. This process can be summarised with these steps:

<br>

1. Translate statically typed objects to TXON type declarations.
2. Transform JSON data structure by embedding TXON types in an initialiser property at its root node.
3. Transform JSON data structure by embedding its content in a data property at its root node.
4. Translate objects in data property to type instances by extending with type references.

<br>

As a JSON data structure is typically not written by hand but rather an automated intermediary, this transformation functionally occurs in the software. The implication of this is that a TXON data structure is achieved by extending the object being encoded to JSON in a programming language. As TXON conforms to the JSON specification it is already compatible with JSON encoders, so the functional implementation only requires extending the encoded object with an initialiser and type references. During the modification of this object, the encoded JSON structure can be continuously validated by utilising the TXON.js library.

{"break":true}

{"sub":"Debugging with TypeScript and TXON.js"}

When a data structure exists as an intermediary between programming languages, it can be encoded and decoded by different actors in the transmission process. Each actor has an expectation of the data structure, so when they receive it they must validate that the encoded object within can be decoded and cast to an object in their programming language.

As a result of this dependency on validation, the substitution of JSON with TXON must also involve the processes that validate their contents. The TypeScript and TXON.js validation processes can be compared on their character count, time complexity, universality or execution time, but these measures are unlikely to have a real-world impact on developer practices because the differences would be negligible.

As an alternative, these validation processes can be assessed on how they inform the `debugging` of data structures. When an actor validates a data structure and finds it incompatible with their own expected object, the actor must react by `debugging` the data structure. This process requires human intervention to determine and demonstrate where and why an error occurred, and solve the issue at its source. As such the evaluation must assess the validation processes by asking these questions:

<br>

1. What is the expected feedback from validation?
2. What is the expected reaction to an invalid data structure?
3. What is the expected approach to debugging an invalid data structure?

<br>

This assessment demonstrates that the TXON implementation is easier to debug than the existing JSON and TypeScript setup. I also take into consideration that the aim of the JSON format is to be human-readable. As a result the TXON format is not a suitable alternative if it only achieves type-extensibility by sacrificing readability.

{"break":true}