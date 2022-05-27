{"sec":"Programming Languages and Development"}

In this section I present the terminology used for processing serialised data structures at the software level of a distributed system. This is applicable to traditional software levels such as the application and client that is the end-point for transmitted data, but also applicable to modern concepts of software levels that live on a server and handle data in a similar manner but with the goal of forwarding it to an end-point.

[ What is decoding and encoding? ]

<br>

<!--
https://docs.oracle.com/cd/E57471_01/bigData.100/extensions_bdd/src/cext_transform_typing.html
-->

{"sub":"Decoding and Encoding in Local Software"}

I preface this presentation of how data is processed at the local level of software in system, by covering how data structures are typed in software. Programming languages differentiate between two type systems: `static` and `dynamic` typing.

In the static type system the declaration, instantiation and processing of a value throughout the application is checked when the software is compiled. This implies that the software cannot be executed if type checking fails, as the software must first be succesfully compiled with valid type checks. As such this type system is typical of `compiled programming languages`.

In the dynamic type system the declaration, instantiating and processing of a value throughout the application is checked at `runtime`, which is when the software is executed. This system is typical of `interpreted programming languages`, which are designed to be implicitly typed and to continue execution by ignoring the parts that fail during checking.

Both compiled and interpreted programming languages have their use cases. The JSON specification is modelled on the dynamically typed JavaScript programming language, and as such is itself dynamically typed with no support for explicit types. This is of course ideal for processing JSON data in JavaScript, as the language does not expect types before runtime. However this introduces interoperability challenges when JSON needs to be received by and cast to structures in statically typed languages such as Swift and Kotlin.

<!--
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
https://developer.apple.com/documentation/foundation/archives_and_serialization/encoding_and_decoding_custom_types
-->

The JavaScript language implements a built-in `JSON` object with a method for encoding ("stringifying") an object to a JSON string and decoding ("parsing") a JSON data structure represented as string to an object. The lack of explicit types in JavaScript means that it is not necessary to declare a container for the parsed data structure. In the Swift programming language the notation uninitialised objects requires explicit typing, and an object must conform to a `protocol`. The `Codable protocol` automatically matches a JSON data structure with an uninitialised object, and parses JSON to an initialised object. This process attempts to match property names between the data and object, meaning properties that were not declared are not initialised. If a property matches by name but its value is mismatched by type, an error will be thrown. This can be avoided by not declaring a structure for the parsed JSON or a part of the data, and instead initialising it as-is.

{"break":true}

{"sub":"Decoding and Encoding in Server Software"}

[ `Continuous Integration and Development` (CI/CD) ]

{"break":true}