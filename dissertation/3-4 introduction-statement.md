{"sub":"Problem Statement"}

As the project was developed it was crucial to deliminate the problem area, to ensure continuity from exploration to development to evaluation. This project explores the problem area of a strongly-typed data interchange format conforming to the JSON specification, and results in a proposal for the its syntax and implementation.

Inspired by the syntax and implementation of TypeScript the Type-Extensible Object Notation (TXON) proposed in this report emphasises the values of extensibility, human-readability, and universiality/interoperability across systems and programming languages. This is expressed in my approach to altering as few existing structures and practices as possible, while providing a safer and easier to use syntax than JSON.

The proposal presented in this report aims to demonstrate the features:

1. Type declarations and instances (through relational references).
2. Extensible typing (as little or much as wanted) and extensible types (inheritance).
3. Enumerated values with required or optional cases.

The proposed features are demonstrated with a validation library, and critically evaluated with an implementation comparison to TypeScript declarations in a CI/CD environment on GitLab. This is not an exhaustive review of the format, but this should not be necessary as it conforms to the JSON specification with non-breaking extension.

{"break":true}