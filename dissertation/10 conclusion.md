{"chp":"Conclusion"}

With the `Type-Extensible Object Notation` (TXON) I aimed to address the type weakness of the `JavaScript Object Notation` (JSON) specification. In order to investigate this problem area I sampled an existing JSON data structure and corresponding typed object and validation process written in TypeScript. The implementation I developed succeeded in translating the typed object to the embedded type initialisation, by transforming the existing data structure. I partially succeeded in implementing a generic version of the TypeScript validation features, but due to time constraints I could not validate `regular expressions` (regex).

Through the evaluation of the implementation, it became evident that my implementation of default values were not appropriate for validation. This concept was borrowed from software development, where default values are provided when an optional value is not or cannot be initialised. In the TXON proposal I suggested that a better alternative would be to utilise the question mark (?) symbol to denote a property that does not need to be instantiated for validation.

<br>

The approach I took to developing my implementation was driven unit testing, which proved to be a successful methodology for validating features continuously. This approach should have been taken earlier in the process, specifically when I delimited the problem area and attempted to demonstrate the flaws of the current implementation. As a result it became difficult to evaluate the functional implementation of my proposal, as I could not compare it to a demonstrable flaw or shortcoming. For this reason I decided to compare the features of the two implementations of validation methods, in order to illustrate what I did and did not achieve through this project.

<br>

As a final point I motivate further interest in this problem area, by illustrating my perspective on the future of data interchange formats in software development. With the increasing prevalence of mobile software applications and interest in server-driven applications, it is crucial that the industry and the tools we use can facilitate this evolution. In the field of design there has also been an increasing focus on the role of servers in mobile applications, and I anticipate that as applications becomes more generic in structure, their user interfaces will rely increasingly on server-driven information and updates.

{"break":true}