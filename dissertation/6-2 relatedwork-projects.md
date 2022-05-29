{"sec":"Attempts at Extensibility of Data Syntax"}

Previous projects have focused on documenting and comparing object serialisation formats in terms of features, efficiency, performance, file size, and programming language support. The central theme in these comparisons is the ability of a format to be applied across heterogeneous structures, systems and languages, thus achieving interoperability despite differences in data structure.

The choice of data format is informed by the intended use of the stored data. An application utilising a proprietary data format is more likely to store information in a binary file, to reduce its file size. The proprietary nature of such an application does not necessitate interoperability, and thus transparency of the source data is a non-issue.

The inverse is true of an application interacting with other systems, such as a client receiving information from a platform developed by a source serving multiple clients. This necessitates interoperability, as the application must conform to the format defined by the source, and it is more likely to receive information in a plaintext file, to ensure correct interpretation. Plain text (ASCII) data is human-readable, resulting in a more transparent and approachable format at the cost of decreased performance and increased file size.

Plain-text data can be human-readable, but the decriptive syntax for the information contained is not necessarily accessible to humans. A proprietary format with limited scope can prescribe meaning implicitly to data objects, but an interoperable format must be explicit. This is achieved by surrounding information with descriptive tags, nesting it into hierarchies, and/or prescribing meaning to special characters such as tabs.

The data structure must be interoperable with different languages and thus various parsers. The explicit nature of these data format streamlines the design of parsers, as data can be validated without implicit meaning.

{"break":true}

{"sub":"TSON: JSON with language-specific type-safety"}

Developed by {"cite":"miou2019tson"} this project proposes a syntax for declaring explicitly typed property values in the JSON format. These types correspond to types from the C# programming language. This is a simple approach to a syntactical extension of the JSON specification, but it also transform the data itself to a format only reflecting types in one specific language or langauges that may declare types in an identical manner. As such it reduces the scope of JSON to a point where its users would likely be better served by an entirely new format.

He provides an example of how to declare a valid TSON root node, and as evidenced it is semantically identical to a JSON root node, with the exception of explicit C# types surrounding property values {"citep":"miou2019tson"}. As this syntax transforms the actual data, it also invalidates it as a JSON object, and as such it is not compatible with JSON parsers.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "name": "string(\"My Cool Adventure\")",
    "plays": "uint(150)",
    "reputation": "int(-2)",
    "visible": "bool(false)",
    "data": "bytes(\"UTIHCQsOEBIUFxkbHSAiJCYHCQsOEBIUFxkbHSAiJCYICAg=\")",
    "created": "datetime(\"2020-05-13T10:06:09.5137659-04:00\")"
}

@endjson
@enduml

<br>

He provides a list of the types available in the TSON specification, including the C# types that are not available in the JSON specification {"citep":"miou2019tson"}. As seen in table {"ref":"tsonjson"} comparing these two specifications, but I note that as JSON does not distinguish between floats and doubles for its "number" type, meaning integers and numbers are implicitly typed, I have marked them as available in the JSON specification.

{"break":true}

<table style="width:100%">
<tr><th><sub>Type</sub></th><th><sub>Subtype</sub></th> <th><sub>TSON</sub></th><th><sub>JSON</sub></th></tr>
<tr  style="padding-bottom:0"><td style="padding-bottom:0"><sub>Object</sub></td><td style="padding-bottom:0"><sub>-</sub></td><td style="padding-bottom:0"><sub>•</sub></td><td style="padding-bottom:0"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Array</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>-</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>string</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>boolean</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>int</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>uint</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>long</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>ulong</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>char</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>short</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>ushort</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>float</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>double</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>sbyte</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>byte</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>byte[]</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>null</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>datetime</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Literal</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>uri</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub>•</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub></sub></td></tr>
</table>

{"tbl":"tsonjson","caption":"Description."}

<br>

An interesting finding here is the inclusion of a DateTime type, as dates are complex structures with a high degree of variance in declaration between programming languages and data formats. While this can be expected to ease validation of dates when parsed, this specification in general does not provide much in terms of extensibility, as it only extends the type declarations available in JSON, when it could extend the syntax itself to support declaration of any type desirable.

{"break":true}

{"sub":"The \"Typeable Simple Object Notation\" (TSON)"}

Developed by {"cite":"lyon2014typeable"} this project proposes an alternative data interchange format derived from the JSON specification. The `Typeable Simple Object Notation` (TSON) is grammatically similar to JSON, but its node names are syntactically more akin to JavaScript objects. Where as JSON requires names to be of type String, the TSON specification makes this optional as long as a name does not contain double-quotes (") between characters, or any of the characters reserved for denoting structure or types in JSON (,:[]{}).

This proposal implies that a TSON data structure does not conform to the JSON specification, and as such it is incompatible with existing JSON parsers. As a result the developer has implemented their own library specifically targeting the C# programming language. This effectively limits the use of TSON to a single programming language, and as such it cannot be considered interoperable outside systems that are exclusively written in C#.

The library contains its own C# parsing and classes, providing developers with the tools to construct typed classes in C# and cast TSON data structures to classes after parsing. As seen in this example the contents of a class can be typed with the predefined TSON classes or extended with a custom class that conforms to TSON by being typed with its classes.

```
class Data : TsonTypedObjectNode {
    [TsonNotNull]
    public TsonNumberNode NumNode { get; set; }
    [TsonNotNull]
    public TsonStringNode StringNode { get; set; }
    [TsonNotNull]
    public TsonBooleanNode BoolNode { get; set; }
    [TsonNotNull]
    public TsonObjectNode ObjectNode { get; set; }
    [TsonNotNull]
    public TsonArrayNode ArrayNode { get; set; }
    public CustomData CustomData { get; set; }
    public TsonArrayNode<TsonStringNode> StringNodeList { get; set; }
    public TsonArrayNode<TsonNumberNode> NumberNodeList { get; set; }
    public TsonArrayNode<CustomData> CustomDataList { get; set; }
    public TsonArrayNode<TsonObjectNode> ObjectNodeList { get; set; }
}

class CustomData : TsonTypedObjectNode {
    public TsonStringNode Thing1 { get; set; }
    public TsonNumberNode Thing2 { get; set; }
}
```

<br>

A data structure that conforms to the TSON specification and these classes is seen in the following, along with the method for parsing and initialising a TSON structure to the C# class. It is evident that this approach results in a more readable format, as less characters that do not denote information or types is included, but that this comes at the heavy cost of interoperability and compatibility with JSON parsers. The proposal for this format does not include anything that demonstrates an expanded feature set or other improvements when compared to the JSON specification and format, not even when only considering a C# implementation.

```
NumNode: 10,
StringNode: abc,
BoolNode: true,
ObjectNode: { a: 1, b: 2 },
ArrayNode: [ 1, 2 ],
CustomData: { Thing1: a, Thing2: 2 },
StringNodeList: [ a, b, c ],
NumberNodeList: [ 1, 2, 3 ],
CustomDataList: [ { Thing1: a, Thing2: 1 }, { Thing1: b, Thing2: 2 } ]
```
```
Tson.ToObjectNode<Data>(File.ReadAllText("data.tson"))
```

{"break":true}