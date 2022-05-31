{"sec":"Reflections on Research Design"}

In this section I present and discuss my approach to delimiting the problem area of this project, conducting its experiment, and interpreting its results. The focal point of this reflection is the academic literature and existing work that informed my approach to this project, as well as a discussion of how these sources of inspirations aided and guided the project, as well as where the project failed to exhaustively apply their methods.

<br>

{"sub":"Unit tests as implementation motivation"}

This project began with the initial development of a validation library that aimed to check type conformance, and I expected that this would result in a grammatical notation entitled the Type-Extensible Object Notation (TXON). As features were added to the TXON syntax, it rapidly became evident to me that a grammar is a complex system with vast syntactical combinations. This is also evident in my presentation of the JSON specification, which utilises the `McKeeman Form` to illustrate its complex grammatical notation {"citep":"douglas2020form"}.

For this reason it became clear to me that I had to alter my approach, as I was not confident that my implementation could support and demonstrate support for its complex grammatical notation. With each feature added this complexity increased exponentially, and as such I decided to explore testing each feature during development, which lead me to derive my syntax and implementation from testing.

As presented in the vocabulary, this project is modeled on a `test-driven development` process, wherein decisions are made based on `unit tests` and features are directly informed by test results. This is expressed in the description of my experiment, as I wrote and presented the unit tests for my validation library, before I wrote the library and architected the hierarchy of it checks.

As described by {"cite":"guernsey2013testdriven"} this approach to development aims to segment the process into smaller units, and in my experiment these units are components of a validation process. This approach forced me to construct data structures that demonstrated a functional necessity rather than a desirable feature. As such each unit test was phrased as a combination of a data sample demonstrating nonconformance and an error message that should be expected when validating the sample.

The resulting unit tests were able to act as acceptance tests, which allowed me to confidently develop and implement each feature of the syntax proposal. However I failed in applying the test-driven approach exhaustively, as {"cite":"guernsey2013testdriven"} notes that tests should not only be about the features we implement but also demonstrate the necessity for an implementation to address flaws in the existing TypeScript system on GitLab.

<br>

{"sub":"Quantitative measurements in comparison"}

The result of my experiment included a comparison of the validation process when utilising TypeScript for JSON validation and TXON.js for TXON validation. These were compared on the validation features they provided, which are necessary to ensure that invalid data structures are not forwarded to the end-user application where the software can crash and become unusable. I chose this qualitative assessment because I do not believe that there is any significant efficiency differences between the two validation processes and data structures.

This perception is supported by the previous work I presented, such as {"cite":"eriksson2011comparison"} who compared the JSON and YAML format quantitatively, and found no significant performance differences. While this may be true, the qualitative comparison I produced only provides an assessment of the hypothetical conditions when validating a data structure.

As an alternative to this qualitative comparison, I could have validated a larger and more diverse amount of representative data structures, and then quantitatively measured differences between the TXON.js library and the TypeScript implementation. I did not choose this approach because I do not believe the data provided to me through GitLab would be large or diverse enough in order to conduct an exhaustive comparison. However I expect that the results of such a comparison could illustrate the frequency at which the TXON implementation cannot substitute TypeScript, due to its smaller subset of validation features.

{"break":true}