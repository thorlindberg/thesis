{"sub":"Objects and relational types"}

<!--

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics

-->

Where as arrays can be useful for compact storage of data, they are not the optimal choice for safe and collaborative software development. This is because the meaning of array values is implicit, which makes it difficult to interpret and safely access or validate the contents of an array. To achieve a collection of values with explicit meaning, the value type `Object` can be applied instead.

The structure of an object is a `declaration` which does not contain any values. An object is assigned its values through the process of `initialisation` where the object becomes an `instance` of itself. If an object is not intended to be reused, it can be initialised without declaration as an `object literal`.

An object can contain both values and functions, each with their own name. The values are referred to as `properties` of the object, and the functions are referred to as its `methods`. These can be accessed by name through the `dot syntax` (object.name) or the `bracket syntax` (object.["name"]). This approach is considered "safe" because a value can always be accessed by name even if the collection is unordered. In other words there is no implicit meaning assigned to the index position in the collection.

As the values of an object can reference other objects as properties or functions as methods, they become relational without having to rely on identifiers. This allows developers to abstract a collection into multiple collections, referred to as `components`. This is the main motivation for applying objects through object-oriented programming, as this relationship between data structures is considered safe, easy to interpret, and can be mapped to real-world objects.

[ UML diagram of object-oriented branching data structures ]

{"break":true}