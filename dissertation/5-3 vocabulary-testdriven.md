{"sec":"Test-Driven Development"}

In this section I present the terminology used for planning and conducing a development process driven by testing, referred to as a `test-driven development` (TDD) process. It is an approach to planning, specifying and validating production code, but it also describes the process of writing and improving code by refactoring. This presentation will motivate the writing of tests before functional implementation, by illustrating why tests should be written and how to write them.

{"cite":"guernsey2013testdriven"} presents test-driven development as the process of writing tests that inform the criteria for a succesful functional implementations, as opposed to the traditional approach of varying degrees of testing to validate a feature. He argues for various perspectives on TDD by presenting it as a `design approach` and `programming technique`. As a design approach it is used to derive specification of requirements from writing tests with success criteria. As a programming technique it is used to write clean code by reiterating and refactoring the code until it functionally passes test criteria.

He notes that TDD is not just about writing tests to define success criteria before implementation, but also about defining current failures in existing systems before extending or improving features. This approach forces developers to demonstrate the need for a functional implementation, before investing resources into one, which helps guard against wasting resources on unnecessary or insufficient implementations. As seen in figure {"ref":"testcycle"} the full TDD cycle starts with a test for failure, which informs the design of an acceptance test that drives the agile functional implementation.

@startuml

skinparam linetype ortho

<style>
componentDiagram {
    BackGroundColor transparent
    component {
        BackGroundColor white
    }
    interface {
        BackGroundColor white
    }
}
</style>

Start --> [ Add a test ]
[ Add a test ] --> [ Run the tests ]
[ Run the tests ] --> [ Make a little change ] : [Fail]
[ Make a little change ] --> [ Run the tests again ]
[ Run the tests again ] --> End : [Pass, development stops]
[ Run the tests ] --> [ Add a test ] : [Pass]
[ Run the tests again ] --> [ Make a little change ] : [Fail]
[ Run the tests again ] --> [ Add a test ] : [Pass, development continues]

@enduml

{"fig":"testcycle","caption":"A test-driven cycle from demonstrating a test that necessitates change, to the final functional implementation after agile development."}

Development driven by testing has implications not only for the approach to implementation, but also the structure of the code itself and the overall practices surrounding projects. As each feature needs to be developed on a foundation of demonstrable necessity, the process must be divided into small enough steps for testing to be possible. The testing of a smaller component in a large codebase is referred to as `unit tests`, as each component becomes a testable `unit`. They provide a clear and measurable success criteria, which ensures that the requirements for a project are met with confidence. {"ref":"beck2003testdriven"} popularised TDD nad his rules for writing unit tests are:

- Execution time should be short, resulting in fast testing.
- Tests should be executed in isolation from each other, resulting in reordable tests.
- Use production data when applicable, and ensure data is readable and understandable.
- Each test should represent a component of a larger overall goal with the project.

{"break":true}