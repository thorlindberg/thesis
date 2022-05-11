{"sub":"Syntax Proposal"}

[ Text ]

<br>

**(a) Syntax for extended types**

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

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A date property with a string-value could instead be represented as an object with properties for month, day, and year. Representing these properties with number-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of numbers.

As evidenced, embedding these restrictions in the data results in more specification properties than useful data. As the amount of information scales linearly, so too does the restrictions, while increasing the chance of syntax errors.

```
{
    "type": "number",
    "date": { "month": 10, "day": 28, "year": 2005 }
}
```

{"break":true}

```
{
    "type": "number",
    "date": {
        "month": { "min": 1, "max": 31, "value": 10 },
        "day": { "min": 1, "max": 31, "value": 28 },
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
        "month": { "type": "number", "min": 1, "max": 12 },
        "day": { "type": "number", "min": 1, "max": 31 },
        "year": { "type": "number" }
    }
}
```
```
{ "type": "date", "month": 10, "day": 28, "year": 2005 }
```

<br>

It is common practice to nest JSON objects inside a top-level "data" property, to check if an API call has succesfully returned the expected result or thrown an error.

Inspired by this practice, I have decided to require an "init" property for extended type declarations. The information property (data) can contain extended types, which must conform to the declaration specified in the initialisation property (init).

{"break":true}

```
{
    "init": {
        "date": {
            "month": { "type": "number", "min": 1, "max": 12 },
            "day": { "type": "number", "min": 1, "max": 31 },
            "year": { "type": "number" }
        }
    },
    "data": { ... }
}
```

<br>

Instances of extended types are themselves extensible, meaning they are not limited to only enumeration properties.

There are two valid approaches to instantiating extended types:

*Array of objects*. Each object contains the extended type value and its required properties. The advantage of this approach is that each object contains an extended type, but this also increases the chance of syntax errors. This is ideal when an array contains multiple types.

*Object with array of objects*. The object contains the extended type value and a "values" array containing objects with required properties. The advantage of this approach is that the extended type is instantitated once, resulting in an inferred type for objects in "values". This is ideal when an array only contains one type.

```
// array of objects

"data": {
    "dates": [
        { "type": "date", "month": 10, "day": 28, "year": 2005 }
    ]
}
```
```
// object with array of objects

"data": {
    "dates": {
        "type": "date",
        "values": [
            { "month": 10, "day": 28, "year": 2005 }
        ]
    }
}
```

{"break":true}

An extended type property can be partially instatiated if a default value is given. The default can be any of the available JSON types, including *null*, or **another an extended type.**

Defaults are inserted in place of non-instantiated enumeration properties during validation. The value does not have to match the type given in the enumeration, but if it does it must conform to the given range (min to max). **--THIS RAISES THE QUESTION: SHOULD VALIDATION RETURN THE VALIDATED JSON???--**

If the default is of type *null*, the value is optional during validation. If no default is given or the default is of any other type, it is required during validation.

```
{
    "init": {
        "date": {
            "month": { "type": "number", "min": 1, "max": 12, "default": 1 },
            "day": { "type": "number", "min": 1, "max": 31 },
            "year": { "type": "number", "default": null }
        }
    },
    "data": { ... }
}
```
```
// only required "day" instantiated

"data": {
    "dates": [
        { "type": "date", "day": 10 }
    ]
}
```
```
// optional "year" not instantiated

"data": {
    "dates": [
        { "type": "date", "month": 10, "day": 28 }
    ]
}
```

{"break":true}

**(b) Syntax for type extensions**

In addition to extending JSON with new types, you can also extend existing JSON types (*retroactive modeling*). Types can be extended with enumerations, which becomes available with the dot (.) syntax. Enumeration values must conform to the extended type, and the *null* type can not be extended.

Type extension reduces type-repetition in instantiation, and thus it is a better option when enumeration values conform to a single type. **--WHAT ABOUT NULL VALUES? CAN AN EXTENSION CONFORM TO A TYPE BUT HAVE DEFAULT OF NULL???--**

```
{
    "init": {
        "number.date": {
            "month": { "min": 1, "max": 12 },
            "day": { "min": 1, "max": 31 },
            "year": { "min": 0, "max": 3000 }
        },
        "number.temperature": {
            "celsius": { "min": -100, "max": 100 }
        }
    },
    "data": { ... }
}
```
```
"data": {
    "dates": [
        {
            "type": "number.date",
            "month": 10, "day": 28, "year": 2005
        }
    ],
    temperatures: [
        {
            "type": "number.temperature",
            "celsius": 30
        }
    ]
}
```

Type extensions are not limited to JSON types, as you are able to extend an extended type...

**--THIS IS EXPERIMENTAL--**

```
{
    "init": {
        "number.date": {
            "month": { "min": 1, "max": 12 }
        },
        "date.day": {
            "day": { "min": 1, "max": 31 }
        }
        "date.year": {
            "year": { "min": 0, "max": 3000 }
        }
    },
    "data": { ... }
}
```

{"break":true}