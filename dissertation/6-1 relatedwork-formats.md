{"sec":"Data Interchange Format Specifications"}

In the following I present data interchange format specifications with varying levels of requirements. These formats aim to balance their scalability with readability, while mimicking the systems and programming languages from which they are derived.

<br>

{"sub":"Scope of light-weight human-readable data format"}

{"cite":"eriksson2011comparison"} compares the scope and performance of the `JavaScript Object Notation` (JSON) and `YAML Ain't Markup Language` (YAML) formats for data transmission. These light-weight data interchange formats aim to structure information with minimal additional data, such as tags or type/requirement specifications. Their purpose is to increase human-readability and ease-of-use for both authors and recipients, and they are most applicable when specification of data requirements is not critical.

The overarching point he argues is that the similarities and difference between JSON and YAML are intentional and a product of their history. He notes that JSON was born as a format independent from any programming language but with similar notation to C, C++, Java {"citep":"eriksson2011comparison","page":"5"}, while YAML is a superset of JSON that aimed to increase readability by sacrificing performance when parsing similarly structured data {"citep":"eriksson2011comparison","page":"20"}. YAML syntactically prescribes node nesting to identation, but manages to be semantically similar to JSON, allowing JSON data to also be valid YAML data. However he argues that its implementation greatly reduces its scope of use, and as such it is neither syntactically or performance-wise a better alternative format {"citep":"eriksson2011comparison","page":"19"}.

{"break":true}

Beyond the syntax differences, he also notes that YAML implements an extensible data type entitled "relational trees" by allowing declaration of an anchor data node which can be referenced and inserted elsewhere. He argues that this increases readability, compactness and clarity while reducing the risk of syntax errors {"citep":"eriksson2011comparison","page":"9"}. The format proposal I develop through this project is heavily inspired by such a data type, but rather than transforming the actual information I only aim to validate nodes based on a referenced specification.

<br>

{"sub":"Scope of data format with strict requirements"}

{"cite":"goff2001xmlserialization"} describes document object serialisation processes with the `Extensible Markup Language` (XML) data format, assessing its implementation in heterogeneous distributed systems. While this paper focuses heavily on the serialisation process, it also illustrates why more strict and "heavy" data formats are applicable for data interchange, as well as the extent of their scope.

He identifies three capabilities required of an object representation, and notes that these are evident in ongoing research into the XML specification {"citep":"goff2001xmlserialization","page":"3"}. These three capabilities are `language neutrality` `verifiable validity` and the `ability to be deserialised`.

This description is not far from the design goals of the JSON specification, which also aims to be neutral and easily deserialised. However they differ vastly in the extent of their ability to be easily verified. This is evident in the limited extent of pre-defined capabilities for specifying node requirements in JSON. As seen in {"ref":"typedjson"} it is entirely possible to specify any requirements within JSON semantics, but the specification does facilitate validation of these requirements.

<br>

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
    "name": {
        "type": "string",
        "value": "My Cool Adventure"
    },
    "plays": {
        "type": "uint",
        "value": 150
    },
    "reputation": {
        "type": "int",
        "value": -2
    },
    "visible": {
        "type": "bool",
        "value": false
    },
    "data": {
        "type": "bytes",
        "value": "UTIHCQsOEBIUFxkbHSAiJCYHCQsOEBIUFxkbHSAiJCYICAg="
    },
    "created": {
        "type": "datetime",
        "value": "2020-05-13T10:06:09.5137659-04:00"
    }
}

@endjson
@enduml

{"fig":"typedjson","caption":"..."}