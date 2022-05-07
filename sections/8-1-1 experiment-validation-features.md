{"sub":"Validation library"}

A library is a collection of utilities that in combination achieve a shared goal. In this instance, the TXON library is instantiated as a TXON object and its method provides validation of a JSON String.

In the following I present the features, intent and structure of my library.

<br>

**Features**

This library supports the following validation features, reflecting syntactical features in the .txon data format.

- Type specification declaration (in *init property*).
- Type instantiation (in *data property*).
- Default value insertion (during validation).

Users can declare their own extended types (e.g. "date"), or declare extensions of JSON types or extended types using a dot-syntax (e.g. "string.date" or "date.month"). 

*Extended types* are specified as enumerations and instantiated by associating data with the type. This is further presented in the syntax proposal.

*Extension of types* allows you to inherit the requirements of an existing type, while extending it as a sub-type with an enumeration. This is further presented in the syntax proposal.

In the following I present my intent with TXON, by providing an overview of the library as an object in JavaScript.

{"break":true}