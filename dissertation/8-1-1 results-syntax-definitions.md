{"sub":"Terminology and definitions used in proposal"}

As a preface to the resulting syntax proposal, I provide the following system of terms and define the meaning I prescribe to them in my proposal. The purpose of these definitions is to alleviate any potential confusion of terminology, as it is crucial to understand the language used to understand the proposal as a whole.

A "type" differentiates values and deliminates their potential contents, such as characters, numbers, or more complex types like arrays and objects. There are three valid types in TXON specification: extended types, type extensions, and JSON types.

- "Extended types" extend JSON types with enumerated properties. A local type can be declared for each case of an enumerated property, with the optional addition of a shared type for all cases.

- "Type extensions" extend a JSON type with enumerated properties using the dot (.) syntax. A local type can be declared for each case of an enumerated property, but no additional or shared type declaration is necessary as the extension inherits from the JSON type.

- "JSON types" define the acceptable type of values for properties in a JSON/TXON data structure. The seven types in the JSON specification are: object, array, string, number, true, false, and null.

<br>

The "type system" is comprised of all the available types, as declared in the JSON specification and in the initialiser of a TXON data structure.

"Declarations" are...

"Instances" are...

{"break":true}