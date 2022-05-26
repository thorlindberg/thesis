{"sub":"Data format syntax and transmission"}

<!--

https://www.json.org/json-en.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction

-->

When data structures leave the confines of a specific programming language, it must be altered in format to something interoperable with other languages and systems. This process is referred to as `serialisation` and its inverse process is referred to as `de-serialisation` of data structures. The choice of format for serialised data is typically informed by its use, much like the choice between structures in a programming language.

Formats for serialised data are best differentiated on their features, as they typically serve similar purposes and one format can accomodate similar needs as another format. The two main categories of formats are `plain-text` or `binary`, where plaint-text refers to formats that are readable to humans and binary referes to formats that are not readable because they use binary serisalisation.

Plain-text formats are intrinsically less efficient but more interoperable and their readability makes them easy to interpret when looking directly at the data. In interchange and transmission of data interoperability is an important feature, as a standardised format needs to be applicable to as many potential languages and systems as possible. This does not mean that plain-text formats are always the optimal choice, but for a standardised format they are typically the ideal.

The `Extensible Markup Language` (XML) is a markup language, meaning its values are explicitly assigned meaning by placing each value between an opening and closing tag. Unlike other markup languages, the names of tags in XML refer to value names rather than being predefined tags. This syntax provides a standardised and extensible language for expressing objects and their properties, by nesting named tags and their values inside each other. As such, an object is represented as a tag whose value is other tagged values. Each tag can be heavily specified with an extensible syntax, with requirements such as the character length of the tagged value.

The `JavaScript Object Notation` (JSON) is an interoperable expression of JavaScript objects, with the differences being that names are expressed with the `String` type, trailing commas are not allowed, and objects cannot be assigned methods. JSON is syntactically and structrually similar to the XML format, but differs in that its tags are curly brackets. This allows JSON to express data structures with fewer characters, but also removes the specification and requirements that can be included in a tag. As a result the JSON structure is hypothetically less safe than a corresponding XML structure could be, and this is the sacrifice made in return for a more readable data structure.

{"break":true}