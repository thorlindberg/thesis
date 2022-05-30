{"sec":"Evaluation Strategy"}

In this section I present my strategy for evaluating the results of this experiment, through an example of its use. The purpose of this evaluation is to evaluate the impact of implementing the TXON format in an existing system. This is accomplished by assessing the transformation of a JSON to TXON data structure, and assessing to which degree the `txon.js` library can substitute an existing validation process that casts the JSON data structure to TypeScript types. As the proposed grammar provides a standardised and generic approach to typed data and its validation, I demonstrate that when a data structure is invalid it is easier to debug if it conforms to the TXON specification.

<br>

{"sub":"Transformation from JSON to TXON"}

While a TXON data structure conforms to the JSON specification, its contents are extended with type declarations and explicitly typed data through type instances. The implication of this is that types that would otherwise exist in a statically typed programming language such as TypeScript, have to be embedded into the JSON data structure. Once these types are part of the data structure, they can be instantiated through relational references by extending the contents of the data with types. This process can be summarised with these steps:

<br>

1. Translate statically typed objects to TXON type declarations.
2. Transform JSON data structure by embedding TXON types in an initialiser property at its root node.
3. Transform JSON data structure by embedding its content in a data property at its root node.
4. Translate objects in data property to type instances by extending with type references.

<br>

As a JSON data structure is typically not written by hand but rather an automated intermediary, this transformation functionally occurs in the software. The implication of this is that a TXON data structure is achieved by extending the object being encoded to JSON in a programming language. As TXON conforms to the JSON specification it is already compatible with JSON encoders, so the functional implementation only requires extending the encoded object with an initialiser and type references. During the modification of this object, the encoded JSON structure can be continuously validated by utilising the txon.js library.

{"break":true}

{"sub":"Debugging with TypeScript and TXON"}

[ TypeScript types ]

[ Casting to TypeScript types ]

---

The strategy for assessing the ability of txon.js to substitute TypeScript validation is to apply the TXON grammar to the sample data structure from GitLab. This is accomplished by moving the corresponding type declarations from TypeScript to a TXON initialiser in the data structure, and then transforming the data with references to types. The purpose of this is to compare the JSON structure and TXON structure in terms of features, readability, and character count.

Of course the data is not the only component in a validation process, and as such the TXON library and TypeScript validation must also be compared. These processes be compared on time complexity, character count, and execution time, but as time is not a factor considered in this implementation, the comparison will only consider character count.

The process of determining the transformation from JSON to TXON is split into two steps that can be individually assessed. The first step is to move type declarations from TypeScript to the TXON initialiser, and then evaluate it on whether the resulting structure: supports all the features applied on GitLab, is as readable, and by comparing character counts. The second step is to move data from the JSON structure to the TXON data, and then transform implicitly typed data into explicitly type instances by adding references to TXON types. The resulting data is evaluated on its readability and the difference in character count between the data structures.

The combined data structure, containing both the initialiser and data property at the root node, can be evaluated on its character count. As both the original JSON data structure and the resulting TXON data structure conform to the JSON specification, this is suitable for comparing their efficiencies and inefficiencies. Their readability is defined as the ability to both understand and manually debug the data structure, and as such the TXON format has a clear advantage due to its embedded type declarations. For this reason and because TXON aims to minimally transform existing data structures, the two formats as a whole are not compared on readability, because the data is expected to be near identical.

{"break":true}