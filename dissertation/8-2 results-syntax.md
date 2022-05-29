{"sec":"Syntax Proposal"}

In this section I present my syntax proposal for extensibly typed JSON data structures. A proposal for changes to syntax or grammatical features of a programming language is typically structured as an argument for the conditions that necessitate the proposed change. This includes samples of code that demonstrate the flaws of the current implementation, the proposal applied as a solution in a real-world scenario, and design considerations for both the impact of the proposed change and alternative solutions to the issue.

<br>

{"sub":"Proposal for extensible typing"}

As a step towards improving the safety and usability of the JSON format through an extensible approach, this first half of the collective proposal introduces a syntax for declarations as enumerations and specifications of type or type extension initialisation requirements.

The motivation for this implementation of types is the current inability to extend or enumerate types in the JSON specification. The result of this flaw is that developers cannot validate whether their data structures are correct or incorrect before they have been received by a client.

Consider a simple `data structure` that conforms to the JSON specification:

```
{
    "date": "10-28-2005"
}
```

Suppose you are transmitting this to a client but you decide to alter the date format. This would cause the data to be invalidated by the recipient, but this is easily fixed by altering the expected structure. You may have altered the data structure to `split properties` of the original:

```
{
    "date": {
        "month": 10, "day": 28, "year": 2005
    }
}
```

This is much clearer to both parties, and because the data points have number values they are less likely to be invalidated. Text editors and data parsers that implement the JSON specification will highlight or throw an error if the properties include characters beyond numbers. As data interchange formats are typically not manually typed, it is possible for any value to end up as an unintended type. As such, the recipient would likely validate the types independently to ensure that they are indeed correct. This could be eased by including a `type declaration` that explicitly states the intended value:

```
{
    "date": {
        "type": "number", "month": 10, "day": 28, "year": 2005
    }
}
```

However, this does not ensure that all the properties are present in the data structure, nor does it actually validate types independently. It would be better if the data could better specify its intent with a generic structure that is easily validated without investing time in defensive mechanisms on the recipient end.

{"break":true}

I would like to propose a syntax for declaring types with a generic and extensible `type declaration syntax`, altering existing data structures as little as possible, while greatly reducing dependency on additional layers of data validation at multiple points of a distributed system. This syntax is grammatically based on typed values in TypeScript, allowing you to explicitly (but not statically) type and enumerate data points.

Types can be declared in the `initialiser property` at the root of the data structure:

```
{
    "init": {
        "date": {
            "type": "number",
            "case": [ "month", "day", "year" ]
        }
    }
}
```

Declarations provide a generic and single-location place to specify enumerated and explicitly typed values in a data structure. For example, the "date" type can be instantiated in the `data property`at the root of the data structure:

```
{
    "init": {
        "date": {
            "type": "number",
            "cases": [ "month", "day", "year" ]
        }
    },
    "data": {
        "date": {
            "type": "date",
            "month": 10,
            "day": 28,
            "year": 2005
        }
    }
}
```

It is evident from this syntactical approach that despite these strict requirements the data remains readable, by separating the type declaration from the actual data through relation references. Additionally, this syntax scales far better with larger data structures, requiring less repetition and as such a lesser chance of syntax errors. The initialiser can be ignored when casting the data in software, but also acts as embedded documentation of the intent with the data structure. This approach is generic in structure yet flexible to differently structured data and use-cases, while remaining human-readable and conforming to the JSON specification.

{"break":true}

In aiming to reflect the values of extensible implementations, type declarations were designed to extend existing types with the dot syntax (.), but they are not extensible in the sense that invalid declarations can be ignored. A type can be an extension of another type:

```
{
    "init": {
        "date.number": {
            "cases": [ "month", "day", "year" ]
        }
    },
    "data": {
        "date": {
            "type": "date.number",
            "month": 10, "day": 28, "year": 2005
        }
    }
}
```

This results in all enumerated values inheriting typing from the type before the dot in the declared extension. The implication of this is that types do not have to be explicitly declared with a property in a type initialiser, and as such the character count is reduced while maintaining readability. Here are a few examples of the possible type declarations, and how extensions improve the syntax:

```
"date": {
    "month": { "type": "number" },
    "day": { "type": "number" },
    "year": { "type": "number" }
}
```
```
"date": {
    "type": "number",
    "cases": [ "month", "day", "year" ]
}
```
```
"date.number": {
    "cases": [ "month", "day", "year" ]
}
```

In evaluating this design it became clear that the complexity in the combination of syntactical features increases greatly with each added feature. As such the actual implementation of this proposal would need to exhaustively demonstrate that the grammatical notation (the "system" of syntax) does not contain conflicting combinations. If we take a more complex data point with differently typed values, such as:

{"break":true}

```
"date": {
    "month": 10, "day": 28, "year": 2005,
    "description": "laundry day", "responsible": "adam"
}
```

It is already evident that the current implementation of the proposal does not adequately facilitate shared typing or inherting through type extension, when the data structure requires multiple cases with multiple shared types.

{"break":true}

After experimenting with the implementation of this proposed syntax for type declarations, it became evident that not all type values should be required, and that default values are not an appropiate approach to declaring optional values. With the current implementation you can declare a type:

```
{
    "init": {
        "date": {
            "month": "string",
            "day": "string",
            "year": "string"
        }
    }
}
```

Instead you should be able to declare a type value as optional by appending a question mark (?) to its name:

```
{
    "init": {
        "date": {
            "month": "string",
            "day": "string",
            "year?": "string"
        }
    }
}
```

This is easier to read and interpret than providing default values, which do not make much sense in an enumeration case anyway.

<br>

As the TXON specification conforms to the JSON specification, there should be zero compatibility issues with existing implementations of JSON for editing, serialising or parsing data. Existing JSON data structures cannot be validated with the txon.js validation library, as it requires the declaration of types, but since it is not a TXON structure this would be unnecessary regardless. However, data structures with type declarations/instances are still valid JSON structures, and as such they can be parsed and the explicit typing can be ignored or utilised with other validation implementations or for other purposes.

<br>

Actually adopting this proposed syntax for type declarations is quite feasible, as the data can remain otherwise unaltered and the declarations can be ignored. However, this will decrease performance and increase size of file transmissions, so it should not be done unless it clearly demonstrates an improved validation process both now and in the future.

{"break":true}

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
        "date": { ... }
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

In aiming to reflect the values of extensible implementations, type instances were designed to be an addition to existing data structures rather than an alternative. The current implementation is not exhaustive, as considering every potential and realistic structure is beyond the scope of this proposal. If we start by declaring a type extension in the initialiser:

```
{
    "init": {
        "date.number": {
            "cases": [ "month", "day", "year" ]
        }
    }
}
```

There are several ways to instantiate this type, such as an instance as a property of the root "data" node:

```
{
    "data": {
        "type": "date.number",
        "month": 10, "day": 28, "year": 2005
    }
}
```

And a nested instance as a non-typed property of the typed data point:

```
{
    "data": {
        "type": "date.number",
        "month": 10, "day": 28, "year": 2005,
        "associated": {
            "type": "date.number",
            "month": 5, "day": 19, "year": 2003
        }
    }
}
```

And a data point with related data that does not correspond to any declared type:

```
{
    "data": {
        "users": {
            "count": 2300678
        },
        "date": {
            "type": "date.number",
            "month": 10, "day": 28, "year": 2005,
            "birthdays": 280301, "gifted": true
        }
    }
}
```

The design of this implementations considers the hierarchy of the data structure, by typing the required properties at the same level as a type reference, and ignoring properties that are not explicitly typed. It is entirely likely that this implementation does not support certain structures, or that the provided syntax creates conflicting conditions.

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