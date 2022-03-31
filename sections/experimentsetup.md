Experiment Setup
---

**Features**

\begin{figure}[H]
\def\arraystretch{1.5}
\centering
\begin{tabular}{|p{0.35\linewidth}|p{0.1\linewidth}|p{0.1\linewidth}|p{0.1\linewidth}|}
\hline
Feature & XML & JSON & Proto
\hline
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
\hline
\end{tabular}
\end{figure}

XML: https://www.w3.org/XML/ https://www.w3.org/TR/2008/REC-xml-20081126/

JSON: https://www.json.org/json-en.html

Proto: https://developers.google.com/protocol-buffers

**Declaration**

```
<Object>
    <Property>Content</Property>
</Object>
```
<br>
XML object declaration.

```
{
    Object : {
        Property : Content
    }
}
```
<br>
JavaScript object notation.

```
message Object {
    Optional Type Property = Content;
}
```
<br>
Protocol Buffers object declaration.

**Syntax**

```
<Person>
    <name>1</name>
    <id>2</id>
    <email>3</email>
</Person>
```
<br>
XML object properties.

```
{
    "Person": {
        "name":     "1",
        "id":       "2",
        "email":    "3"
    }
}
```
<br>
JavaScript object properties.

```
message Person {
    required string name =  1;
    required int32 id =     2;
    optional string email = 3;
}
```
<br>
Protocol Buffers object properties.

**Serialisation**

...

**Transmission**

...

**Readability**

...

**Type safety**

...

**Language support**

...

**Documentation**

...


<br>

