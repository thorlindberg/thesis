{"chp":"Related Work"}

In this section I present academic literature and projects from which I derived my theoretical and methodological framework. As this project proposes extensibility of a data interchange format surrounded by well-established practices and rigid structures, it is crucial that my approach is informed by previous related work. By referencing literature and applying its methods in my experiment, I aim to avoid constructing a proposal that is incompatible with existing computer systems or developing without consideration for end-users.

These following four main topics cover the areas of work that inspired my process, and were necessary for planning, conducting and understanding my experiment. They are not exhaustive, and as such only cover a small subset of work that I delimit based on relevance to my specific project.

<br>

{"sub":"Framework for design and development"}

I chose a Test-Driven Development (TDD) process for this project as described in the section on ["Test-Driven Development (TDD)"](#test-drivendevelopment(tdd))", and as such I have chosen to include literature on recommendations derived from practice for writing test-able code. This is presented in the section on ["Writing Testable Code"](#writingtestablecode).

The JSON specification was an obvious choice for my project, as it has widespread use in software application development. However it is worth including work that compares and contrasts it with other similar formats such as YAML and XML, to illustrate their differences and advantages or disadvantages. Without this comparison, my experiment could result in a proposal for an already existing alternative. This is presented in the section on ["Specification of Data Serialisation Formats"](#specificationofdataserialisationformats).

The problem presented in this project can be solved in many different ways and at different levels. For this reason I include previous work towards extending the JSON syntax. By searching publicly accessible repositories on GitHub, I have found projects that worked towards extending the format with more explicit and type-safe syntax features. These projects are presented in the section on ["Attempts at Extensibility of Data Syntax"](#attemptsatextensibilityofdatasyntax).

{"break":true}