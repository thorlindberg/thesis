{"sub":"Arrays, dimensions and relational data"}

<!--

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays

-->

Where as value names in programming languages can be useful for explicitly denoting the purpose of a value, they are not optimal for handling multiple values with a shared purpose. For this reason a value can be made a collection of values, referred to as the value type `Array`.

An array can simultaneously contain different types of values, which can be accessed individually through an array `index` (array[index]). If a programming language implements arrays as `zero-indexed`, the first value in the array can be accessed with the index zero (array[0]). This approach allows dense packing and optimal handling of values, as their shared purpose needs only be declared once as a property name.

As an array is itself a value type, an array can be a collection of arrays, referred to as a `multi-dimensional` array. These arrays assign meaning to values based on their relative positioning in two or more dimensions. It is typical to use `two-dimensional` arrays for data structures that are transformed, analysed or for storage purposes. A `three-dimensional` array is functionally a stack of two-dimensional arrays with identical dimension sizes, and there are useful for analysing trends. Arrays with more than two dimensions are not optimal for storing or transmitting data structures, as they are difficult to represent and interpret by people using two-dimensional text editors.

For this reason it is more common to utilise multi-dimensional arrays for representing data structures, but these can be further optimised by leveraging `relational keys`. As values are assigned meaning based on their position in a two-dimensional array, it can be useful to assign different categories of values in one dimension, and entries in another dimension.

As seen in figure {"ref":"relationalarrays"}, a `header` can be added as the first entry in the array, describing the categories of values, and an `identifier` category can be added as the first category in the opposite dimension. The purpose of this is to minimise the array, and split it into multiple two-dimensional arrays, linked together by their identifier values. As these data structures increase size, it becomes paramount to minimise wasted space, and this process ensures explicit linking of data when their implicit meaning is lost with their relative positioning.

[ UML diagram of relational multi-dimensional arrays ]

{"break":true}