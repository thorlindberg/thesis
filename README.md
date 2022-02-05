## Type-Extensible Object Notation: JSON with Syntax for Types

<details>
<summary>Project description</summary>

#### Context

As mobile and internet of things (IoT) devices continue to dominate the computing space, software development increasingly centers around building clients that receive, exchange and present data. This system of connected devices is known as distributed computing, consisting of multiple heterogeneous or homogeneous bodies. <br><br> JSON is a lightweight, human-readable, and language-neutral data-interface format, making it easy to exchange, read, debug, and parse across languages. Exchanging data across hetereogenous distributed systems is accomplished through data serialisation, which requires coordination of expectations for the format of the deserialised data. This can be guarded against through strong type-safety, but JSON does not support explicitly typed data, and limits data to six inferred types: _string, number, object, array, boolean, and null_.

#### Problem

The limitations of the JSON format are driven by its design philosophy and the balance between readability and capability. Human-readability is an important advantage of JSON over other data formats such as Markup Languages, and by omitting explicit typesetting the data becomes highly interoperable between programming languages. However, these choices make the data fragile and prone to human-errors, failing to provide developers with the necessary capabilities to properly guard against parse errors without extra layers of validation and substitution.

#### State-of-the-Art

There are several approaches to guarding against inconsistencies in serialised data. These include full-stack end-to-end implementations, back-end or front-end validation through defensive coding, declaring types as an additional object value, and declaring types as part of the existing object values.

The [TSON library](https://github.com/miou-gh/tson) embeds C# type declarations into JSON values, allowing objects to be parsed with type declarations. This approach retains the readability of the JSON format while extending the available types, but also transforms the data, making it incompatible with other languages and JSON deserialisers.

#### Idea

Inspired by the [TypeScript language](https://www.typescriptlang.org), a backwards-compatible type-extensible abstraction of JavaScript, this project aims to introduce type declarations to the JSON format by adding syntax for types. The Type-eXtensible Object Notation (TXON) format is phrased as a language-neutral serialisation layer that is fully compatible with JSON.

TypeScript's extensibility over enforcement is a heavily emphasised value in this project. In other words, it is important that the proposed solution does not enforce strong typing, but rather provides extensibility to JSON, allowing developers to type as few or as many of their object values.

#### Methods and Deliverables

1. Building data validation tests to illustrate the limitation and breaking points of the JSON format.
2. Formulating an interoperable approach to syntax for types.
3. Writing an extensibility layer into JSON serialisation/deserialisation to extend its typesetting capabilities.

A critical evaluation of the proposed solution will be part of the project report.
  
</details>

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

Each 'thread' stretches across all section types in the report (_introduction, experiment, discussion etc._) and consists of a topic/concept that is described, tested, critically evaluated, discussed and concluded upon, to varying degrees. The latter half are more experimental and explorative, in providing a majority of the research produced through this project.

| Thread | Start        | End          | Description                                         | Deliverable[s]          |
| :----- | :----------- | :----------- | :-------------------------------------------------- | :---------------------- |
| _Int_  | _dd-mm-yyyy_ | _dd-mm-yyyy_ | _String_                                            | _String_                |
| 1      | 07-02-2022   | 27-02-2022   | Data in Heterogeneous Distributed Computing Systems | 8 x 2400 characters     |
| 2      | 28-02-2022   | 20-03-2022   | Interoperable Typesetting in Data Formats           | 8 x 2400 characters     |
| 3      | 21-03-2022   | 10-04-2022   | Design Philosophy of Language Extensibility         | 8-10 x 2400 characters  |
| 4      | 11-04-2022   | 01-05-2022   | Type Validity in JSON Serialisation                 | 10-12 x 2400 characters |
| 5      | 02-05-2022   | 22-05-2022   | Extensibility Layer for JSON Typesetting            | 10-12 x 2400 characters |

----------

Literature

*Clean Architecture* by Robert C. Martin (https://blog.cleancoder.com)

----------

<details>
<summary>Sources</summary>

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
  
</details>
