{"sec":"Reflections on Research Design"}

In this section I present and discuss my approach to delimiting the problem area of this project, conducting its experiment, and interpreting its results. The focal point of this reflection is the academic literature and existing work that informed my approach to this project, as well as a discussion of how these sources of inspirations aided and guided the project, as well as where the project failed to exhaustively apply their methods.

<br>

{"sub":"Unit tests as implementation motivation"}

This project began with the initial development of a validation library that aimed to check type conformance, and I expected that this would result in a grammatical notation entitled the Type-Extensible Object Notation (TXON). As features were added to the TXON syntax, it rapidly became evident to me that a grammar is a complex system with vast syntactical combinations. This is also evident in my presentation of the JSON specification, which utilises the `McKeeman Form` to illustrate its complex grammatical notation {"citep":"douglas2020form"}.

For this reason it became clear to me that I had to alter my approach, as I was not confident that my implementation could support and demonstrate support for its complex grammatical notation. With each feature added this complexity increased exponentially, and as such I decided to explore testing each feature during development, which lead me to derive my syntax and implementation from testing.

As presented in the vocabulary, this project is modeled on a `test-driven development` process, wherein decisions are made based on `unit tests` and features are directly informed by test results. This is expressed in the description of my experiment, as I wrote and presented the unit tests for my validation library, before I wrote the library and architected the hierarchy of it checks.

As described by {"cite":"guernsey2013testdriven"} this approach to development aims to segment the process into smaller units, and in my experiment these units are components of a validation process. This approach forced me to construct data structures that demonstrated a functional necessity rather than a desirable feature. As such each unit test was phrased as a combination of a data sample demonstrating nonconformance and an error message that should be expected when validating the sample.

The resulting unit tests were able to act as acceptance tests, which allowed me to confidently develop and implement each feature of the syntax proposal. However I failed in applying the test-driven approach exhaustively, as {"cite":"guernsey2013testdriven"} notes that tests should not only be about the features we implement but also demonstrate the necessity for an implementation to address flaws in the existing TypeScript system on GitLab.

<!--

- Execution time should be short, resulting in fast testing.
- Tests should be executed in isolation from each other, resulting in unordered tests.
- Use production data when applicable, and ensure data is readable and understandable.
- Each test should represent a component of a larger overall goal with the project.

-->

{"break":true}

{"sub":"Quantitative measurements"}

[ Text ]

{"break":true}