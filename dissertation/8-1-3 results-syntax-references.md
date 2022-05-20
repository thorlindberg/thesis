{"sub":"Instantiation of typed data points"}

As a step towards improving the safety and usability of the JSON format through an extensible approach, this second half of the collective proposal introduces a syntax for instances as data points that reference a type initialisation specification.

The motivation for this implementation of types is the current lack of a standardised and generic syntax for explicitly typing dynamically typed data. The result of this is multiple independent approaches to typing, such as including requirements as properties ofobjects. This lack of standardisation means each involved party in a development process must independently verify their data structures.

<br>

Consider this simple explicitly typed `data structure` that conforms to the JSON specification:

```
{
    "date": {
        "month": { "type": "number", "value": 10 },
        "day": { "type": "number", "value": 28 },
        "year": { "type": "number", "value": 2005 }
    }
}
```

Suppose that this structure was used to type an entire data structure that may contain 100-1000 properties. This would be a poorly performing data format, as the information necessary for validating the data is much more prevalent than the actual information stored within it. In fact, in this example the data contains 177 characters of which the information only represents 8 characters or 4.5% of the data. You may alter this structure to reduce repetition, as in this specific instance all values are typed identically:


```
{
    "date": {
        "type": "number",
        "month": 10, "day": 28, "year": 2005
    }
}
```

This greatly reduces the character count by 48% to 92 characters of which the information represents 8 characters or 8.6% of the data. While this is certainly an improvement, it is also a best-case scenario and only works if all properties of an object can be identically typed. If this is not the case, the data structure would have to independently type each property or collections of properties:

```
{
    "date": {
        "month": { "type": "number", "value": 10 },
        "day": { "type": "number", "value": 28 },
        "year": { "type": "number", "value": 2005 },
        "category": { "type": "string", "value": "birthday" },
        "gifted": { "type": "boolean", "value": true }
    }
}
```
```
{
    "date": {
        "number": {
            "month": 10, "day": 28, "year": 2005
        },
        "string": {
            "category": "birthday"
        },
        "boolean": {
            "gifted": true
        }
    }
}
```

These can be considered safe structures, but also increasingly prone to syntax errors. All parties involved would have to agree to use identical structures for data points, to ensure compatibility with validation processes. The former structure with individual typing contains 301 characters of which the information represents 19 characters or 6.3% of the data. The latter structure with collections of properties through inverted typing contains 224 characters of which the information represents 19 characters or 8.48% of the data. It is evident that efficient explicit typing is possible with JSON, but that it necessitates a relational and generic approach for scalability and to guard against syntax errors. In addition, properties of types such as String can vary greatly in content, but typically match an enumerated list of values. As such, it would be apt to enumerate values in a type declaration.

<br>

I would like to propose a syntax for instantiating types with a generic and minimal `type instance syntax`, with relational references to type specifications outside the immediate data point and structure. This syntax is grammatically designed to accomodate different data structures, especially as pertaining to inheritance and shared typing of data points.

Types can be instantiated in the `data property`at the root of the data structure:

```
{
    "init": {
        "date": {
            "month": "number",
            "day": "number",
            "year": "number",
            "category": {
                "type": "string", "cases": [ "birthday", "work", "holiday" ]
            },
            "gifted": "boolean"
        }
    },
    "data": {
        "date": {
            "type": "date",
            "month": 10, "day": 28, "year": 2005, "category": "birthday", "gifted": true
        }
    }
}
```

This greatly reduces the character count of the data instance by 66.5% to 149 characters of which the information represents 19 characters or % of the data. The data is also safer because the property of type String has enumerated values, allowing it to be validated base on whether its case conforms to the enumeration. This approach is not without fault, as the data structure including the type declarations is larger at 454 characters, but this trade-off is offset by the reduction in repetition of type declarations as the data scales up in size.

Type instances can be arrayrised, enabling the explicit typing of multiple data points with identical structure with only a single declaration:

```
{
    "init": {
        "date": { ∙∙∙ }
    },
    "data": {
        "date": {
            "type": "date",
            "values": [
                {
                    "month": 10, "day": 28, "year": 2005, "category": "birthday", "gifted": true
                },
                {
                    "month": 12, "day": 25, "year": 2004, "category": "holiday", "gifted": false
                }
            ]
        }
    }
}
```

As this syntax aims to be extensible by selectively typing data, type instances can be nested inside each other, so that types can be declared once in the initialiser and repurposed throughout the data structure. This is also useful for splitting a type into components that are declaratively simpler and require fewer characters:

```
{
    "init": {
        "category": {
            "type": "string", "cases": [ "birthday", "work", "holiday" ]
        },
        "date": {
            "month": "number", "day": "number", "year": "number"
        }
    },
    "data": {
        "schedule": {
            "category": {
                "type": "category",
                "value": "birthday"
            },
            "date": {
                "type": "date",
                "month": 10, "day": 28, "year": 2005
            }
        }
    }
}
```

It is evident that despite being strongly, explicitly, yet dynamically typed, this data structure is readable and the typing can be utilised for validation ignored. A major advantage of this approach is that it is generic, by leveraging grammatical standards for typing data. This centralised approach means the involved parties can invest fewer resources in defensive mechanisms, as they can expect typed data in a standard format with TXON.

<br>

[ Text on detailed design ]

<br>

After experimenting with the implementation of this proposed syntax for type instances, it became evident that instances with a single value requiring an explicit type reference is not the optimal grammatical approach. If you were to type a single value:

```
{
    "init": {
        "description": {
            "type": "string"
        }
    },
    "data": {
        "type": "description",
        "value": "How-to use TXON"
    }
}
```

The explicit typing does not make sense in this situation, and it would be far more appropriate to type a single value as:

```
{
    "init": {
        "description": "string"
    },
    "data": {
        "description": "How-to use TXON"
    }
}
```

This is however not without fault as the type name would become a reserved property name for the entire data structure, as there is nothing to indicate whether it is a type reference or not. This is not in keeping with the extensible approach of TXON, so the propery name would need some other non-typical indicator such as an exclamation mark (!) to indicate it is initialising a type:

```
{
    "init": {
        "description": "string"
    },
    "data": {
        "description!": "A type instance",
        "description": "Not a type instance"
    }
}
```

<br>

As the TXON specification conforms to the JSON specification, there should be zero compatibility issues with existing implementations of JSON for editing, serialising or parsing data. Existing JSON data structures cannot be validated with the txon.js validation library, as it requires the declaration of types, but since it is not a TXON structure this would be unnecessary regardless. However, data structures with type declarations/instances are still valid JSON structures, and as such they can be parsed and the explicit typing can be ignored or utilised with other validation implementations or for other purposes.

<br>

Actually adopting this proposed syntax for type instances is quite feasible, as the data can remain otherwise unaltered and the explicit typing can be ignored. However, this will decrease performance and increase size of file transmissions, so it should not be done unless it clearly demonstrates an improved validation process both now and in the future.

{"break":true}

<!--

`Detailed design:` an enumerated list describing how the proposed changes are expressed, fluxuating between description and samples of code or other material that showcase these expressions. This should include a criticial reflection on the proposed expressions and unsupported expressions if any exist in the implementation.

-->