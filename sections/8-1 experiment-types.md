{"sub":"Syntax for extended types"}

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types: *string, number, object, array, boolean, and null*. It explicitly precludes the types: *function, date, and undefined*. A JSON object is represented as a string of curly brackets with properties inside.

```
{ "date": "28-10-2005" }
```

<br>

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explictly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{ "type": "string", "date": "28-10-2005" }
```

<br>

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A date property with a string-value could instead be represented as an object with properties for month, day, and year. Representing these properties with integer-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of integers.

As evidenced, embedding these restrictions in the data results in more specification properties than useful data. As the amount of information scales linearly, so too does the restrictions, while increasing the chance of syntax errors.

```
{
    "type": "int",
    "date": { "month": 28, "day": 10, "year": 2005 }
}
```
```
{
    "type": "int",
    "date": {
        "month": { "min": 1, "max": 31, "value": 28 },
        "day": { "min": 1, "max": 31, "value": 10 },
        "year": { "value": 2005 }
    }
}
```

<br>

As it turns out, this is not a unique problem, and thus the solution already exists: enumerations. This user-defined data type allows us to declare a specification once, and then instantiate it without repetition of requirements.

As enum (enumeration) is not a type allowed in the JSON format, I have chosen to leverage existing JSON types to construct an enum syntax. This decision informs the phrasing of TXON as an optional extension that could be ignored by JSON parsers, rather than an alternative format.

The enumerated date type is its own object, declaring the required properties and conformance instructions for property values. Notably these instructions do not have to be exhaustive, as properties can fit within strict value ranges or have no values at all (null). Instantiating a user-defined type is indifferent from providing the intended type as a string-value property, with the property name and value matching the corresponding specification.

```
{
    "type": "date",
    "enum": {
        "month": { "type": "int", "min": 1, "max": 12 },
        "day": { "type": "int", "min": 1, "max": 31 },
        "year": { "type": "int" }
    }
}
```
```
{ "type": "date", "month": 28, "day": 10, "year": 2005 }
```

<br>

It is common practice to nest JSON objects inside a top-level "data" property, to check if an API call has returned the intended result or thrown an error. Inspired by this practice, I have decided to require an "init" property for extended type declarations. The information property (data) can contain extended types, which must conform to the declaration specified in the initialisation property (init).

```
{
    "init": {
        "date": {
            "month": { "type": "int", "min": 1, "max": 12 },
            "day": { "type": "int", "min": 1, "max": 31 },
            "year": { "type": "int" }
        }
    },
    "data": { ... }
}
```

<br>

Instances of extended types are themselves extensible, meaning they must include the required properties, but are not limited to only enumerated properties.

There are two valid approaches to instantiating extended types:

*Array of objects*. Each object contains the extended type value and its required properties. The advantage of this approach is that each object contains an extended type, but this also increases the chance of syntax errors. This is ideal when an array contains multiple types.

*Object with array of objects*. The object contains the extended type value and a "values" array containing objects with required properties. The advantage of this approach is that the extended type is instantitated once, resulting in an inferred type for objects in "values". This is ideal when an array only contains one type.

```
// array of objects

"data": {
    "dates": [
        { "type": "date", "month": 28, "day": 10, "year": 2005 }
    ]
}
```
```
// object with array of objects

"data": {
    "dates": {
        "type": "date",
        "values": [
            { "month": 28, "day": 10, "year": 2005 }
        ]
    }
}
```

<br>
