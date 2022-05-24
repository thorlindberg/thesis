{"sec":"Evaluation Strategy"}

In this section I present my strategy for evaluating the results of this experiment, derived from the development process and the existing TypeScript validation on GitLab. The txon.js validation library developed for this experiment aims to standardise the validation process, so that each company or development team does not need to invest resources into a custom process. This is accomplished by defining generic type declarations in the data structure itself, modelled on the TypeScript type declarations. As such the evaluation of this implementation must assess to which degree the developed library mirrors and substitutes the existing validation process, and determine the necessity for transformation of existing data structures.

<br>

{"sub":"Assessing substitution of TypeScript"}

The strategy for assessing the ability of txon.js to substitute TypeScript validation is to apply the TXON grammar to the sample data structure from GitLab. This is accomplished by moving the corresponding type declarations from TypeScript to a TXON initialiser in the data structure, and then transforming the data with references to types. The purpose of this is to compare the JSON structure and TXON structure in terms of features, readability, and character count.

Of course the data is not the only component in a validation process, and as such the TXON library and TypeScript validation must also be compared. These processes be compared on time complexity, character count, and average execution time, but as time is not a factor considered in this implementation, the comparison will only consider character count.

<br>

{"sub":"Transformation of data structures"}

The strategy for...
[ strategy: necessity for transformation of data structures ]

[ WRITE ABOUT HOW THE TYPESCRIPT TYPES HAVE TO BE MOVED TO TXON INITIALISER ]

TypeScript types -> TXON types in "init".
JSON data structure -> TXON instances in "data".
Combine the two outputs into a TXON data structure.

{"break":true}