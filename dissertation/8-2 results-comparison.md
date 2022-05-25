{"sec":"Comparison of Formats and Validation"}

In this section I present a comparison of the data validation processes achieved through JSON with TypeScript and TXON with the txon.js library. The implementation of validation with TXON aims to substitute existing TypeScript validation with JSON, and as such they should be compared on their `syntax` and `validation features`. It is crucial to preface these results by reiterating that this is not a final evaluation, and the current implementation is intended as a topic of discussion and initial attempt towards a final proposal.

TypeScript offers extensible and explicit typing of its structures, but it is also statitically typed, meaning its code does not compile with type errors. Its typed structures can be applied for validation by parsing and casting JSON data to them. TXON offers extensible and explicit typing of JSON structures, but it is dynamically typed, meaning its code can be parsed with type nonconformance. For this reason TXON requires a generic validation layer, the txon.js library, which standardises validation. TXON stresses minimal transformation of JSON data to add explicit typing.

<br>