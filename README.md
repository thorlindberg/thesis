### Type-Extensible Object Notation: JSON with Syntax for Types

Project description

| Section          | Paragraphs |
| :--------------- | :--------- |
| Context          | <br> ... <br><br> ... <br><br> ... <br><br> |
| Problem          | <br> Exchange of serialised data requires coordination to avoid incosistency between expectations and the actual received data. This can be guarded against through strong type-safety, but the JSON serialisation format provides limited capabilities. <br><br> |
| State-of-the-Art | <br> There are several approaches to guarding against inconsistencies in serialised data. These include full-stack end-to-end implementations, back-end or front-end validation through defensive coding, declaring types as a property of the serialised objects, and including type declarations in properties. <br><br> The [TSON library](https://github.com/miou-gh/tson) embeds C# type declarations into JSON properties, allowing objects to be parsed with type declarations. This approach retains the readability of the JSON format while extending the available types, but transforms the data and makes it incompatible with other languages than C# and standard JSON deserialisers. <br><br> |
| Idea             | <br> Inspired by the [TypeScript language](https://www.typescriptlang.org), a backwards-compatible type-extensible abstraction of JavaScript, this project aims to introduce type declarations to the JSON format by adding syntax for types. The Type-Extensible Object Notation (TEON) format is phrased as a language-neutral serialisation library with full backwards-compatibility to JSON. <br><br> TypeScript's extensibility over enforcement is a heavily emphasised value in this project. In other words, it is important that the proposed solution does not enforce strong typing, but rather provides extensibility to JSON, allowing developers to type as few or as many of their properties.<br><br> Another important aspect is ... <br><br> |
| Methods          | <br> ... <br><br> |

1–3 paragraphs of context. What is the general setting you are working in?

1 paragraph outlining the specific problem you are interested in.

1–2 paragraphs of state-of-the-art: what is the closest anybody has gotten to solving this problem?

1–3 paragraphs outlining your specific idea for solving this problem.

1 paragraph on method and deliverables: What are you specifically going to do and what will you submit?
(Interviews, case study, literature study, informal survey, prototype implementation, explorative programming,
proving theorems, constructing algorithms)

----------

Repository structure

| Folder        | Description                                                       |
| :------------ | :---------------------------------------------------------------- |
| Dissertation  | LaTeX exam report and presentation                                |
| Meeting notes | Date-enumerated notes from supervision                            |
| Code          | Code samples demonstrating object serialisation format properties |
| Models        | Illustrations of systems and processes                            |

----------

Project plan

| Day | Month    | Year | Description                      |
| :-- | :------- | :--- | :------------------------------- |
| 1   | February | 2022 | Project begins                   |
| 4   | February | 2022 | Deadline for project description |

----------

Literature

*Clean Architecture* by Robert C. Martin (https://blog.cleancoder.com)

----------

Sources

https://thenewstack.io/c-creator-bjarne-stroustrup-weighs-in-on-distributed-systems-type-safety-and-rust/

https://www.cs.cmu.edu/~rwh/papers/ml5/tgc.pdf

https://theory.stanford.edu/~aiken/publications/papers/sas03.pdf

https://arxiv.org/abs/2002.06184

https://programming-group.com/assets/pdf/papers/2020_Implementing-a-Language-for-Distributed-Systems.pdf

https://medium.com/swiftcommmunity/codables-a-better-way-parse-data-in-swift-e08015f4ee4e

https://arxiv.org/abs/1401.7372

https://www.cse.iitb.ac.in/~comad/2000/COMAD2KonLineProc/Papers/Res-1-1.pdf

http://www.jfdc.cnic.cn/EN/10.11871/jfdc.issn.2096-742X.2020.04.013

https://dl.acm.org/doi/abs/10.1145/2184751.2184810?casa_token=bdZ6IE8_tAEAAAAA:JrS60mJemsuBluBQN4YVQsskxRLo-Ve14ljG4bwtIkaPtBJ-V-TE3QFLKlNBcu2LuVjxptSo_wh_

https://www.semanticscholar.org/paper/Perfomance-Evaluation-of-Java%2C-JavaScript-and-PHP-Vanura-Kriz/cb4595484f544ffffd0954dc4f2fa011fad3038d

https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.472.5744&rep=rep1&type=pdf

https://www.back4app.com/parse

https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.685.1077&rep=rep1&type=pdf

https://publications.waset.org/15057/comparative-survey-of-object-serialization-techniques-and-the-programming-supports
