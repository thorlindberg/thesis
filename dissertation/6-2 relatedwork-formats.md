{"sub":"Data Interchange Format Specifications"}

In the landscape of data format specifications it is evident that authors collectively trend towards similar yet distinctly different approaches. This is likely informed by the purpose of the respective data format, as no format can be or should attempt to be applicable in every situation. There is a negotiation of values involved in deciding how to specify a format, as the author[s] must choose a side on conflicting values.

As noted in the subsection on ["Data Storage and Interchange Formats"](#datastorageandinterchangeformats) there exists a vast difference between the optimal specification of storage and interchangable data formats. Scalability is perhaps the most influential factor in specifying a format, as efficiency and strict requirements increase in importance as the data increases in size. But as light-weight and less strict data formats have been popularised, they have been applied in ways for which they were not intended, as the alternatives sacrifice readability for safety.

This is illustrated in the subsection on ["Company Partnership, Case and Material"](#companypartnership,caseandmaterial") wherein I present an organisational move towards smaller and more modular data specifications for transmission in a distributed system.

In the following I present two sides of specifying requirements for data interchange formats, to illustrate why JSON is the correct choice and where it is applicable but not exhaustive in features.

<br>

**Light-weight readable data**

{"cite":"eriksson2011comparison"} compares the syntax and performance of the JavaScript Object Notation (JSON) and YAML Ain't Markup Language (YAML) formats for storing and transmitting data as plain-text. These light-weight data interchange formats aim to structure information with minimal additional data, such as tags or type/requirement specifications. Their purpose is to increase human-readability and ease-of-use for both authors and recipients, and they are most applicable in systems where specification of data requirements is not critical.

{"break":true}

**Type-safe extensible data**

{"cite":"goff2001xmlserialization"} document object serialisation processes with the eXtensible Markup Language (XML) format, assessing its implementation in heterogeneous distributed systems.

{"break":true}