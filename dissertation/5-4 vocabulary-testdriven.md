{"sec":"Test-Driven Development"}

In this section I present the terminology used for planning and conducing a development process driven by testing, referred to as a `test-driven development` (TDD) process. It is an approach to planning, specifying and validating production code, but it also describes the process of writing and improving code by refactoring. This presentation will motivate the writing of tests before functional implementation, by illustrating why tests should be written and how to write them.

<br>

{"sub":"Why to test and approaches to testing"}

{"cite":"guernsey2013testdriven"} presents test-driven development as the process of writing tests that inform the criteria for a successful functional implementation, as opposed to the traditional approach of testing for validation. He argues for various perspectives on TDD by presenting it as a `design approach` and `programming technique`. As a design approach it is used to derive specification of requirements from writing tests with success criteria. As a programming technique it is used to write `clean code` by reiterating and refactoring the code until it functionally passes test criteria.

{"cite":"martin2018clean"} provides instructions on architecting clean software. His approach is grounded in a shared historical perspective of software segmentation. He defines clean code as concise communication of purpose and flexibility to modifications {"citep":"martin2018clean","page":"310"}. He defines `clean architecture` as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies {"citep":"martin2018clean","page":"196"}.

TDD can viewed as not just an approach to writing tests that define success criteria before implementation, but also an approach to defining current failures in existing systems before extending or improving features {"citep":"guernsey2013testdriven"}. This approach forces developers to demonstrate the need for a functional implementation, before investing resources into one, which helps guard against wasting resources on unnecessary or insufficient implementations. As seen in figure {"ref":"testcycle"} the full TDD cycle starts with a test for failure, which informs the design of an acceptance test that drives the agile functional implementation.

{"break":true}

@startuml

skinparam linetype ortho

<style>
componentDiagram {
    BackGroundColor transparent
    component {
        BackGroundColor white
    }
}
</style>

Start -right-> [ Add a test ]
[ Add a test ] --> [ Run the tests ]
[ Run the tests ] --> [ Make a little change ] : [Fail]
[ Make a little change ] --> [ Run the tests again ]
[ Run the tests again ] -right-> End : [Pass, development stops]
[ Run the tests ] --> [ Add a test ] : [Pass]
[ Run the tests again ] --> [ Make a little change ] : [Fail]
[ Run the tests again ] --> [ Add a test ] : [Pass, development continues]

@enduml

{"fig":"testcycle","caption":"A recursive test-driven development cycle."}

{"sub":"How to write tests"}

Development driven by testing has implications not only for the approach to implementation, but also the structure of the code itself and the overall practices surrounding projects. As each feature needs to be developed on a foundation of demonstrable necessity, the process must be divided into small enough steps for testing to be possible. The testing of a smaller component in a large codebase is referred to as `unit tests`, as each component becomes a testable `unit`. They provide a clear and measurable success criteria, which ensures that the requirements for a project are met with confidence. {"cite":"beck2003testdriven"} popularised TDD and his rules for writing unit tests are:

- Execution time should be short, resulting in fast testing.
- Tests should be executed in isolation from each other, resulting in unordered tests.
- Use production data when applicable, and ensure data is readable and understandable.
- Each test should represent a component of a larger overall goal with the project.

{"break":true}