{"sub":"Data Interchange Format Specifications"}

In the landscape of data format specifications it is evident that authors collectively trend towards similar yet distinctly different approaches. This is likely informed by the purpose of the respective data format, as no format can be or should attempt to be applicable in every situation. There is a negotiation of values involved in deciding how to specify a format, as the author[s] must choose a side on conflicting values.

As noted in the subsection on ["Data Storage and Interchange Formats"](#datastorageandinterchangeformats) there exists a vast difference between the optimal specification of storage and interchangable data formats. Scalability is perhaps the most influential factor in specifying a format, as efficiency and strict requirements increase in importance as the data increases in size. But as light-weight and less strict data formats have been popularised, they have been applied in ways for which they were not intended, as the alternatives sacrifice readability for safety.

This is illustrated in the subsection on ["Company Partnership, Case and Material"](#companypartnershipcaseandmaterial") wherein I present an organisational move towards smaller and more modular data specifications for transmission in a distributed system.

In the following I present two sides of specifying requirements for data interchange formats, to illustrate why JSON is the correct choice and where it is applicable but not exhaustive in features.

<br>

**Scope of light-weight human-readable formats**

{"cite":"eriksson2011comparison"} compares the scope and performance of the JavaScript Object Notation (JSON) and YAML Ain't Markup Language (YAML) formats for data transmission. These light-weight data interchange formats aim to structure information with minimal additional data, such as tags or type/requirement specifications. Their purpose is to increase human-readability and ease-of-use for both authors and recipients, and they are most applicable when specification of data requirements is not critical.

The overarching point he argues is that the similarities and difference between JSON and YAML are intentional and a product of their history. He notes that JSON was born as a format independent from any programming language but with similar notation to C, C++, Java {"citep":"eriksson2011comparison","page":"5"}, while YAML is a superset of JSON that aimed to increase readability by sacrificing performance when parsing similarly structured data {"citep":"eriksson2011comparison","page":"20"}. YAML syntactically prescribes node nesting to identation, but manages to be semantically similar to JSON, allowing JSON data to also be valid YAML data. However he argues that its implementation greatly reduces its scope of use, and as such it is neither syntactically or performance-wise a better alternative format {"citep":"eriksson2011comparison","page":"19"}.

Beyond the syntax differences, he also notes that YAML implements an extensible data type entitled *relational trees* by allowing declaration of an anchor data node which can be referenced and inserted elsewhere. He argues that this increases readability, compactness and clarity while reducing the risk of syntax errors {"citep":"eriksson2011comparison","page":"9"}. The format proposal I develop through this project is heavily inspired by such a data type, but rather than transforming the actual data I only aim to validate nodes based on a referenced specification.

<br>

**Scope of strict and extensible formats**

{"cite":"goff2001xmlserialization"} document object serialisation processes with the eXtensible Markup Language (XML) format, assessing its implementation in heterogeneous distributed systems.

{"break":true}