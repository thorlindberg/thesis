{"sec":"Evaluation Strategy"}

In this section I present my strategy for evaluating the results of this experiment, derived from the development process and the existing TypeScript validation on GitLab. The txon.js validation library developed for this experiment aims to standardise the validation process, so that each company or development team does not need to invest resources into a custom process. This is accomplished by defining generic type declarations in the data structure itself, modelled on the TypeScript type declarations. As such the evaluation of this implementation must assess to which degree the developed library mirrors and substitutes the existing validation process, and determine the necessity for transformation of existing data structures.

<br>

{"sub":"Assessing substitution and transformation"}

The strategy for assessing the ability of txon.js to substitute TypeScript validation is to apply the TXON grammar to the sample data structure from GitLab. This is accomplished by moving the corresponding type declarations from TypeScript to a TXON initialiser in the data structure, and then transforming the data with references to types. The purpose of this is to compare the JSON structure and TXON structure in terms of features, readability, and character count.

Of course the data is not the only component in a validation process, and as such the TXON library and TypeScript validation must also be compared. These processes be compared on time complexity, character count, and average execution time, but as time is not a factor considered in this implementation, the comparison will only consider character count.

The process of determining the transformation from JSON to TXON is split into two steps that can be individually assesses. The first step is to move type declarations from TypeScript to the TXON initialiser, and then evaluate it on whether the resulting structure: supports all the features applied on GitLab, is as readable, and by comparing character counts. The second step is to move data from the JSON structure to the TXON data, and then transform implicitly typed data into explicitly type instances by adding references to TXON types. The resulting data is evaluated on its readability and the difference in character count between the data structures.

{"break":true}