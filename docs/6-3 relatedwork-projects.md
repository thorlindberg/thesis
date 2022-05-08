{"sub":"Attempts at Extensibility of Data Syntax"}

Previous projects have focused on documenting and comparing object serialisation formats in terms of features, efficiency, performance, file size, and programming language support. The central theme in these comparisons is the ability of a format to be applied across heterogeneous structures, systems and languages, thus achieving interoperability despite differences in data structure.

The choice of data format is informed by the intended use of the stored data. An application utilising a proprietary data format is more likely to store information in a binary file, to reduce its file size. The proprietary nature of such an application does not necessitate interoperability, and thus transparency of the source data is a non-issue.

The inverse is true of an application interacting with other systems, such as a client receiving information from a platform developed by a source serving multiple clients. This necessitates interoperability, as the application must conform to the format defined by the source, and it is more likely to receive information in a plaintext file, to ensure correct interpretation. Plain text (ASCII) data is human-readable, resulting in a more transparent and approachable format at the cost of decreased performance and increased file size.

Plain data can be human-readable, but the decriptive syntax for the information contained is not necessarily accessible to humans. A proprietary format with limited scope can prescribe meaning implicitly to data objects, but an interoperable format must be explicit. This is achieved by surrounding information with descriptive tags, nesting it into hierarchies, and/or prescribing meaning to special characters such as tabs.

The data structure must be interoperable with different languages and thus various parsers. The explicit nature of these data format streamlines the design of parsers, as data can be validated without implicit meaning.

{"break":true}

**TSON: JSON with language-specific type-safety**

Developed by {"cite":"miou2019tson"} this project defines the declaration of explicitly typed property values in the JSON format, corresponding to types from the C# programming language. This is a simple approach to a syntactical extension of the JSON specification, but the result is more complex, as the data becomes incompatible with existing JSON parsers, and the data is transformed to a format only reflecting types in C# and other languages that may declare types in an identical manner.

The types available are, compared to JSON as following.

[ Note that JSON does not distinguish between floats and doubles for its number-type, and integers or numbers are implicitly typed, thus 1 and 1.0 would be the same value. For this comparison I have chosen to compare the types that JSON supports rather than the ones it explicitly declares. ]

<br>

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

<br>

[ something about how: datetime is the most interesting here, and I expect this to be useful but it is not very interesting from an extensibility standpoint. it is probably great for C# devs? ]

{"break":true}

**The "Typeable Simple Object Notation" (TSON)**

[ Text ] {"cite":"lyon2014typeable"}

{"break":true}