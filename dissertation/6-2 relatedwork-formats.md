{"sub":"Data Interchange Format Specifications"}

In the landscape of data format specifications it is evident that authors collectively trend towards similar yet distinctly different approaches. This is likely informed by the purpose of the respective data format, as no format can be or should attempt to be applicable in every situation. There is a negotiation of values involved in deciding how to specify a format, as the author[s] must choose a side on conflicting values.

As noted in the section on ["Data Storage and Interchange Formats"](#datastorageandinterchangeformats) there exists a vast difference between the optimal specification of storage and interchangable data formats. Scalability is perhaps the most influential factor in specifying a format, as efficiency and strict requirements increase in importance as the data increases in size. But as light-weight and less strict data formats have been popularised, they have been applied in ways for which they were not intended, as the alternatives sacrifice readability for safety.

This is illustrated in the section on ["Company Partnership, Case and Material"](#companypartnershipcaseandmaterial") wherein I present an organisational move towards smaller and more modular data specifications for transmission in a distributed system.

In the following I present two sides of specifying requirements for data interchange formats, to illustrate why JSON is the correct choice and where it is applicable but not exhaustive in features.

<br>

#### a.&emsp;Scope of light-weight human-readable data format

{"cite":"eriksson2011comparison"} compares the scope and performance of the JavaScript Object Notation (JSON) and YAML Ain't Markup Language (YAML) formats for data transmission. These light-weight data interchange formats aim to structure information with minimal additional data, such as tags or type/requirement specifications. Their purpose is to increase human-readability and ease-of-use for both authors and recipients, and they are most applicable when specification of data requirements is not critical.

The overarching point he argues is that the similarities and difference between JSON and YAML are intentional and a product of their history. He notes that JSON was born as a format independent from any programming language but with similar notation to C, C++, Java {"citep":"eriksson2011comparison","page":"5"}, while YAML is a superset of JSON that aimed to increase readability by sacrificing performance when parsing similarly structured data {"citep":"eriksson2011comparison","page":"20"}. YAML syntactically prescribes node nesting to identation, but manages to be semantically similar to JSON, allowing JSON data to also be valid YAML data. However he argues that its implementation greatly reduces its scope of use, and as such it is neither syntactically or performance-wise a better alternative format {"citep":"eriksson2011comparison","page":"19"}.

Beyond the syntax differences, he also notes that YAML implements an extensible data type entitled *relational trees* by allowing declaration of an anchor data node which can be referenced and inserted elsewhere. He argues that this increases readability, compactness and clarity while reducing the risk of syntax errors {"citep":"eriksson2011comparison","page":"9"}. The format proposal I develop through this project is heavily inspired by such a data type, but rather than transforming the actual data I only aim to validate nodes based on a referenced specification.

<br>

#### b.&emsp;Scope of data format with strict requirements

{"cite":"goff2001xmlserialization"} describes document object serialisation processes with the eXtensible Markup Language (XML) data format, assessing its implementation in heterogeneous distributed systems. While this paper focuses heavily on the serialisation process, it also illustrates why more strict and "heavy" data formats are applicable for data interchange, as well as the extent of their scope.

He notes that the are three identifiable capabilities required of an object representation, and that these are often evident in ongoing research into the XML specification {"citep":"goff2001xmlserialization","page":"3"}. These capabilities can be summarised as: *language neutrality*, *verifiable validity*, and the *ability to be deserialised*.

This description is not far from the design goals of the JSON specification, which also aims to be neutral and easily deserialised. However they differ vastly in the extent of their ability to be easily verified. This is evident in the limited extent of pre-defined capabilities for specifying node requirements in JSON. While it is entirely possible to specify any requirements within JSON semantics, the specification does not officially support these stricter requirements, which means there is no universal syntax to expect when parsing.

[ The following is an example of a JSON with typed data, but everything is just type of String ]

```
{
    "name": { "type": "string", "value": "My Cool Adventure" },
    "plays": { "type": "uint", "value": 150 },
    "reputation": { "type": "int", "value": -2 },
    "visible": { "type": "bool", "value": false },
    "data": { "type": "bytes", "value": "UTIHCQsOEBIUFxkbHSAiJCYHCQsOEBIUFxkbHSAiJCYICAg=" },
    "created": { "type": "datetime", "value": "2020-05-13T10:06:09.5137659-04:00" }
}
```

{"break":true}