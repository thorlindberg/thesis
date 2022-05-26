{"sub":"Data format syntax and transmission"}

<!--

https://www.json.org/json-en.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction

-->

When data structures leave the confines of a specific programming language, it must be altered in format to something interoperable with other languages and systems. This process is referred to as `serialisation` and its inverse process is referred to as `de-serialisation` of data structures. The choice of format for serialised data is typically informed by its use, much like the choice between structures in a programming language.

Formats for serialised data are best differentiated on their features, as they typically serve similar purposes and one format can accomodate similar needs as another format. The two main categories of formats are `plain-text` and `binary`, where plaint-text refers to formats that are readable to humans and binary referes to formats that are not readable because they use binary serisalisation.

Plain-text formats are intrinsically less efficient but more interoperable and their readability makes them easy to interpret when looking directly at the data. In interchange and transmission of data interoperability is an important feature, as a standardised format needs to be applicable to as many potential languages and systems as possible. This does not mean that plain-text formats are always the optimal choice, but for a standardised format they are typically the ideal.

The `Extensible Markup Language` (XML)...

The `JavaScript Object Notation` (JSON)...

{"break":true}