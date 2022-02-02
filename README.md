## Type-Extensible Object Notation: JSON with Syntax for Types

Project description

| Section          | Paragraphs |
| :--------------- | :--------- |
| Context          | <br> As mobile and internet of things (IoT) devices continue to dominate the computing space, software development increasingly centers around building clients that receive, exchange and present data. This system of connected devices is known as distributed computing, consisting of multiple heterogeneous or homogeneous bodies. <br><br> JSON is a lightweight, human-readable, and language-neutral data-interface format, making it easy to exchange, read, debug, and parse across languages. Exchanging data across hetereogenous distributed systems is accomplished through data serialisation, which requires coordination of expectations for the format of the deserialised data. This can be guarded against through strong type-safety, but JSON does not support explicitly typed data, and limits data to six inferred types: _string, number, object, array, boolean, and null_. <br><br> |
| Problem          | <br> The limitations of the JSON format are driven by its design philosophy and the balance between readability and capability. Human-readability is an important advantage of JSON over other data formats such as Markup Languages, and by omitting explicit typesetting the data becomes highly interoperable between programming languages. However, these choices make the data fragile and prone to human-errors, failing to provide developers with the necessary capabilities to properly guard against parse errors without extra layers of validation and substitution. <br><br> |
| State-of-the-Art | <br> There are several approaches to guarding against inconsistencies in serialised data. These include full-stack end-to-end implementations, back-end or front-end validation through defensive coding, declaring types as an additional object value, and declaring types as part of the existing object values. <br><br> The [TSON library](https://github.com/miou-gh/tson) embeds C# type declarations into JSON values, allowing objects to be parsed with type declarations. This approach retains the readability of the JSON format while extending the available types, but also transforms the data, making it incompatible with other languages and JSON deserialisers. <br><br> |
| Idea             | <br> Inspired by the [TypeScript language](https://www.typescriptlang.org), a backwards-compatible type-extensible abstraction of JavaScript, this project aims to introduce type declarations to the JSON format by adding syntax for types. The Type-eXtensible Object Notation (TXON) format is phrased as a language-neutral serialisation layer that is fully compatible with JSON. <br><br> TypeScript's extensibility over enforcement is a heavily emphasised value in this project. In other words, it is important that the proposed solution does not enforce strong typing, but rather provides extensibility to JSON, allowing developers to type as few or as many of their object values. <br><br> |
| Methods and Deliverables | <br> 1. Building data validation tests to illustrate the limitation and breaking points of the JSON format. <br> 2. Formulating an interoperable approach to syntax for types. <br> 3. Writing an extensibility layer into JSON serialisation/deserialisation to extend its type-setting capabilities. <br><br> A critical evaluation of the proposed solution will be part of the project report. <br><br> |

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
