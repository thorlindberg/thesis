{"sec":"Data Storage and Interchange Formats"}

In this section I present the terminology used for formatting, storage and transmission of data. This theoretical framework is necessary for understanding the experiment process and the resulting proposal. It also demonstrates the conditions that necessitate the use of different data formats, and motivates my choice of JSON as the basis for my proposal. I demonstrate that while no data format can be applied equally well for all use-cases, each format has its advantages and disadvantages.

<br>

{"sub":"Arrays, dimensions and relational data"}

Where as value names in programming languages can be useful for explicitly denoting the purpose of a value, they are not optimal for handling multiple values with a shared purpose. For this reason a value can be made a collection of values, referred to as the value type `Array`.

{"cite":"mozilla2022arrays"} presents arrays in the context of the JavaScript programming language, but this description is also applicable to other programming languages. An array can simultaneously contain different types of values, which can be accessed individually through an array `index` (array[index]). If a programming language implements arrays as `zero-indexed`, the first value in the array can be accessed with the index zero (array[0]). This approach allows dense packing and optimal handling of values, as their shared purpose needs only be declared once as a property name.

{"break":true}

As an array is itself a value type, an array can be a collection of arrays, referred to as a `multi-dimensional` array. These arrays assign meaning to values based on their relative positioning in two or more dimensions. It is typical to use `two-dimensional` arrays for data structures that are transformed, analysed or for storage purposes. A `three-dimensional` array is functionally a stack of two-dimensional arrays with identical dimension sizes, and there are useful for analysing trends. Arrays with more than two dimensions are not optimal for storing or transmitting data structures, as they are difficult to represent and interpret by people using two-dimensional text editors.

For this reason it is more common to utilise multi-dimensional arrays for representing data structures, but these can be further optimised by leveraging `relational keys`. As values are assigned meaning based on their position in a two-dimensional array, it can be useful to assign different categories of values in one dimension, and entries in another dimension.

As seen in figure {"ref":"relationalarrays"} a `header` can be added as the first entry in the array, describing the categories of values, and an `identifier` category can be added as the first category in the opposite dimension. The purpose of this is to minimise the array, and split it into multiple two-dimensional arrays, linked together by their identifier values. As these data structures increase size, it becomes paramount to minimise wasted space, and this process ensures explicit linking of data when their implicit meaning is lost with their relative positioning.

<br>

<div class="table" style="display:flex;justify-content:space-evenly">
<table>
    <caption>Students</caption>
    <tr>
        <td>identifier</td>
        <td>name</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Sam</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Mary</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Tine</td>
    </tr>
</table>
<table>
    <caption>Student Courses</caption>
    <tr>
        <td>student</td>
        <td>course</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>3</td>
    </tr>
    <tr>
        <td>2</td>
        <td>3</td>
    </tr>
    <tr>
        <td>2</td>
        <td>4</td>
    </tr>
    <tr>
        <td>3</td>
        <td>3</td>
    </tr>
    <tr>
        <td>3</td>
        <td>5</td>
    </tr>
</table>
<table>
    <caption>Courses</caption>
    <tr>
        <td>identifier</td>
        <td>name</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Mathematics</td>
    </tr>
    <tr>
        <td>2</td>
        <td>History</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Physics</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Chemistry</td>
    </tr>
    <tr>
        <td>5</td>
        <td>English</td>
    </tr>
</table>
</div>

{"fig":"relationalarrays","caption":"Multi-dimensional arrays for students and courses, connected in a multi-dimensional array through relational keys (identifiers). Each student can be connected to multiple courses, but should only be connected once per course."}

{"break":true}

{"sub":"Objects and relational types"}

Where as arrays can be useful for compact storage of data, they are not the optimal choice for safe and collaborative software development. This is because the meaning of array values is implicit, which makes it difficult to interpret and safely access or validate the contents of an array. To achieve a collection of values with explicit meaning, the value type `Object` can be applied instead.

{"cite":"mozilla2022objects"} presents objects in the context of the JavaScript programming language, but this description is also applicable to other programming languages. The structure of an object is a `declaration` which does not contain any values. An object is assigned its values through the process of `initialisation` where the object becomes an `instance` of itself. If an object is not intended to be reused, it can be initialised without declaration as an `object literal`.

As seen in figure {"ref":"relationalobject"} an object can contain both values and functions, each with their own name. The values are referred to as `properties` of the object, and the functions are referred to as its `methods`. These can be accessed by name through the `dot syntax` (object.name) or the `bracket syntax` (object.["name"]). This approach is considered "safe" because a value can always be accessed by name even if the collection is unordered. In other words there is no implicit meaning assigned to the index position in the collection.

As the values of an object can reference other objects as properties or functions as methods, they become relational without having to rely on identifiers. This allows developers to abstract a collection into multiple collections, referred to as `components`. This is the main motivation for applying objects through object-oriented programming, as this relationship between data structures is considered safe, easy to interpret, and can be mapped to real-world objects.

<br>

```
const value = "Hello, World!"
const doubleNumber = (number) => number * 2

const objectLiteral = {
    property: value,
    method: doubleNumber
}

objectLiteral.doubleNumber(12) // returns 24
```

{"fig":"relationalobject","caption":"Objects in JavaScript can contain properties and methods that reference structures or functions. This object has a relational value and relational method to double a number value."}

{"break":true}

{"sub":"Data format syntax and transmission"}

When data structures leave the confines of a specific programming language, it must be altered in format to something interoperable with other languages and systems. This process is referred to as `serialisation` and its inverse process is referred to as `de-serialisation` of data structures. The choice of format for serialised data is typically informed by its use, much like the choice between structures in a programming language.

Formats for serialised data are best differentiated on their features, as they typically serve similar purposes and one format can accomodate similar needs as another format. The two main categories of formats are `plain-text` or `binary`, where plaint-text refers to formats that are readable to humans and binary referes to formats that are not readable because they use binary serisalisation.

Plain-text formats are intrinsically less efficient but more interoperable and their readability makes them easy to interpret when looking directly at the data. In interchange and transmission of data interoperability is an important feature, as a standardised format needs to be applicable to as many potential languages and systems as possible. This does not mean that plain-text formats are always the optimal choice, but for a standardised format they are typically the ideal.

<br>

{"cite":"mozilla2022xml"} presents the `Extensible Markup Language` (XML) as a markup language, meaning its values are explicitly assigned meaning by placing each value between an opening and closing tag. Unlike other markup languages, the names of tags in XML refer to value names rather than being predefined tags. This syntax provides a standardised and extensible language for expressing objects and their properties, by nesting named tags and their values inside each other. As such, an object is represented as a tag whose value is other tagged values. Each tag can be heavily specified with an extensible syntax, with requirements such as the character length of the tagged value.

<br>

{"cite":"mozilla2022json"} presents the `JavaScript Object Notation` (JSON) as an interoperable representation of JavaScript objects, with the differences being that names are expressed with the `String` type, trailing commas are not allowed, and objects cannot be assigned methods. JSON is syntactically and structurally similar to the XML format, but differs in that its tags are curly brackets. This allows JSON to express data structures with fewer characters, but also removes the specification and requirements that can be included in a tag. As a result the JSON structure is hypothetically less safe than a corresponding XML structure could be, and this is the sacrifice made in return for a more readable data structure.

{"break":true}