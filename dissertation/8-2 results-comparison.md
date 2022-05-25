{"sec":"Comparison of Formats and Validation"}

In this section I present a comparison of the data formatting and validation of `JSON` data structures with `TypeScript` code and `TXON` data structures with the `txon.js` library. As TXON aims to provide typed JSON data and a generic validation process, it is ideal to compare it to an existing JSON data structure and corresponding validation of it with TypeScript. These can be compared on their typing and validation features, while considering readability of the resulting data structures.

A TXON data structure contains an initialiser and a data property, and as such the following results will compare the declaration of types in TypeScript and the initialiser, and then the instantiation of types in JSON and the data property. It is crucial to preface these results by reiterating that TXON is not final in its current implementation, but is rather a proposal presented for discussion.

<br>