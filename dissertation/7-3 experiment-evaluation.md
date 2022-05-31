{"sec":"Evaluation Strategy"}

In this section I present my strategy for evaluating the results of this experiment, which is a proposal for an evolution of the JSON specification. The purpose of this evaluation is to assess to which degree the functional implementation of TXON succeeds at substituting the current setup with JSON and TypeScript validation on GitLab. This assessment is accomplished by illustrating the transformation of a JSON structure to a TXON structure, and then demonstrating that the TXON structure does not depend on a custom validation process. I expect that this transformation will have minimal impact on the information contained in the structure, and that the `TXON.js` library is a suitable substitution for the features of TypeScript that I have chosen to implement.

<br>

{"sub":"Transformation from JSON to TXON"}

While a `TXON` data structure conforms to the `JSON` specification, its contents are extended with type declarations and explicitly typed data through type instances. The implication of this is that types that would otherwise exist in a statically typed programming language such as TypeScript, have to be embedded into the JSON data structure. Once these types are part of the data structure, they can be instantiated through relational references by extending the contents of the data with types. This process can be summarised with these steps:

<br>

1. Translate statically typed objects to TXON type declarations.
2. Transform JSON data structure by embedding TXON types in an initialiser property at its root node.
3. Transform JSON data structure by embedding its content in a data property at its root node.
4. Translate objects in data property to type instances by extending with type references.

<br>

As a JSON data structure is typically not written by hand but rather an automated intermediary, this transformation functionally occurs in the software. The implication of this is that a TXON data structure is achieved by extending the object being encoded to JSON in a programming language. As TXON conforms to the JSON specification it is already compatible with JSON encoders, so the functional implementation only requires extending the encoded object with an initialiser and type references. During the modification of this object, the encoded JSON structure can be continuously validated by utilising the TXON.js library.

{"break":true}

{"sub":"Validation with TypeScript and TXON.js"}

When a data structure exists as an intermediary between programming languages, it can be encoded and decoded by different actors in the transmission process. Each actor has an expectation of the data structure, so when they receive it they must validate that the encoded object within can be decoded and cast to an object in their programming language. As a result of this dependency on validation, the substitution of JSON with TXON must also involve the processes that validate their contents.

The `TypeScript` and `TXON.js` validation processes could be compared on their `character count` `time complexity` `universality` or `execution time`. I expect that these measures would have a negligible difference due to the relative small size of the data structures. Further this would not impact the developers practices and time investment required to accommodate JSON as an intermediary format, so these comparisons are not included in this evaluation.

As an alternative I have chosen to assess the TXON.js library by comparing it to the existing library of validation features utilised on the company GitHub. The purpose of this assessment is to determine to which degree my implementation of its features serve as a suitable generic substitution for the TypeScript implementation. This comparison aims to answer these questions:

<br>

1. What are the features of the TypeScript validation implementation?
2. Which of these features can be substituted by the TXON.js validation implementation?
3. How do these validation processes provide useful feedback when encountering invalid data structures?

<br>

This evaluation is performed with the perspective on validation that an invalid data structure returns an error, which must be acted upon by a developer. As such the assessment of a validation process must take into account how the implementation affects the people responsible for its maintenance, as well as the degree of resource investment into correcting the implementation.

{"break":true}