{"sec":"Test-Driven Development"}

In this section I present the terminology used for planning and conducing a development process driven by testing, referred to as a `test-driven development` (TDD) process. It is an approach to planning, specifying and validating production code, but it also describes the process of writing and improving code by refactoring. This presentation will motivate the writing of tests before functional implementation, by illustrating why tests should be written and how to write them.

{"cite":"guernsey2013testdriven"} presents test-driven development as the process of writing tests that inform the criteria for a succesful functional implementations, as opposed to the traditional approach of varying degrees of testing to validate a feature. He argues for various perspectives on TDD by presenting it as a `design approach` and `programming technique`. As a design approach it is used to derive specification of requirements from writing tests with success criteria. As a programming technique it is used to write clean code by reiterating and refactoring the code until it functionally passes test criteria.

He notes that TDD is not just about writing tests to define success criteria before implementation, but also about defining current failures in existing systems before extending or improving features. This approach forces developers to demonstrate the need for a functional implementation, before investing resources into one, which helps guard against wasting resources on unnecessary or insufficient implementations. He identifies two levels of this approach to TDD:

1. Text
2. Text

[ Why should testing inform the development process ]

[ The TDD cycle ]

[ How to write tests and test patterns ]

<!--

The first step is to quickly add a test, basically just enough code to fail. Next you run your tests, often the complete test suite although for sake of speed you may decide to run only a subset, to ensure that the new test does in fact fail. You then update your functional code to make it pass the new tests. The fourth step is to run your tests again. If they fail you need to update your functional code and retest. Once the tests pass the next step is to start over (you may first need to refactor any duplication out of your design as needed, turning TFD into TDD).

TDD = Refactoring + TFD.

Instead of writing functional code first and then your testing code as an afterthought, if you write it at all, you instead write your test code before your functional code. Furthermore, you do so in very small steps - one test and a small bit of corresponding functional code at a time. A programmer taking a TDD approach refuses to write a new function until there is first a test that fails because that function isn't present. In fact, they refuse to add even a single line of code until a test exists for it. Once the test is in place they then do the work required to ensure that the test suite now passes (your new code may break several existing tests as well as the new one). This sounds simple in principle, but when you are first learning to take a TDD approach it proves require great discipline because it is easy to "slip"� and write functional code without first writing a new test. One of the advantages of pair programming is that your pair helps you to stay on track.
 TDDSpecification by Example	
 
 There are two levels of TDD:

- Acceptance TDD (ATDD). With ATDD you write a single acceptance test, or behavioral specification depending on your preferred terminology, and then just enough production functionality/code to fulfill that test. The goal of ATDD is to specify detailed, executable requirements for your solution on a just in time (JIT) basis. ATDD is also called Behavior Driven Development (BDD).

- Developer TDD. With developer TDD you write a single developer test, sometimes inaccurately referred to as a unit test, and then just enough production code to fulfill that test. The goal of developer TDD is to specify a detailed, executable design for your solution on a JIT basis. Developer TDD is often simply called TDD.

Figure 2 depicts a UML activity diagram showing how ATDD and developer TDD fit together. Ideally, you'll write a single acceptance test, then to implement the production code required to fulfill that test you'll take a developer TDD approach. This in turn requires you to iterate several times through the write a test, write production code, get it working cycle at the developer TDD level.

-->

{"break":true}