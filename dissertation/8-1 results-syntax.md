{"sec":"Proposal for Type-Extensible Object Notation"}

In this section I present my syntax proposal for extensibly typed JSON data structures. A proposal for changes to syntax or grammatical features of a programming language is typically structured as an argument for the conditions that necessitate the proposed change. This includes samples of code that demonstrate the flaws of the current implementation, the proposal applied as a solution in a real-world scenario, and design considerations for both the impact of the proposed change and alternative solutions to the issue.

<br>

{"sub":"Introduction"}

As a step towards evolving the type-extensibility of the JSON specification, this proposal introduces a grammar for type declarations, type extensions, and explicit type instances. The syntax for this type-extensible grammar was designed to have minimal impact on the structure and no transformation of the information contained in a JSON data structure. 

<br>

{"sub":"Motivation"}

The motivation for this implementation of types is the current inability to explicitly or relationally type data in the JSON specification. The result of this flaw is that developers cannot validate whether their data structures are correct or incorrect before they have been decoded in a software application.

Consider a simple `data structure` that conforms to the JSON specification:

```
{
    "date": "10-28-2005"
}
```

Suppose you are transmitting this to a client but you decide to alter the date format. This would cause the data to be invalidated by the recipient, but this is easily fixed by altering the expected structure. Let us assume you alter the date property by splitting it into its components:

```
{
    "date": {
        "month": 10, "day": 28, "year": 2005
    }
}
```

{"break":true}

This is much clearer to both parties, and because the data points have number values they are less likely to be invalidated. Text editors and data encoders that implement the JSON specification will highlight or throw an error if the properties include string characters without quotation marks. As data interchange formats are typically not manually typed, it is possible for any value to end up as an unintended type. As such, the recipient would likely validate the types independently to ensure that they are indeed correct. This could be eased with an explicit `type declaration` stating the value type:

```
{
    "date": {
        "type": "number", "month": 10, "day": 28, "year": 2005
    }
}
```

However, this does not ensure that all the properties are present in the data structure, nor does it actually validate types without the recipient constructing a custom validation process. It would be better if the data could better specify its intent with a generic structure, that can be validated without each recipient investing resources into their own validation process.

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

Suppose that this structure was used to type an entire data structure that may contain 100-1000 properties. This would be a poorly performing data format, as the information necessary for validating the data is more prevalent than the actual information it stores. In fact, in this example the data contains 177 characters of which the information only represents 8 characters or 4.5% of the data. You may alter this structure to reduce repetition, as in this specific instance all values are typed identically:


```
{
    "date": {
        "type": "number",
        "month": 10, "day": 28, "year": 2005
    }
}
```

{"break":true}

This greatly reduces the character count by 48% to 92 characters of which the information represents 8 characters or 8.6% of the data. While this is certainly an improvement, it is also a best-case scenario and only works if all properties of an object can be identically typed. If this is not the case, the data structure would have to independently type each property:

<br>

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

<br>

Alternatively the data structure could be inverted, so that each value inherits from an explicit type, by nesting the values as properties of a type object:


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

<br>

These can be considered safe structures, but also increasingly prone to syntax errors. All parties involved would have to agree to use identical structures for data points, to ensure compatibility with validation processes. The former structure with individual typing contains 301 characters of which the information represents 19 characters or 6.3% of the data. The latter structure with collections of properties through inverted typing contains 224 characters of which the information represents 19 characters or 8.48% of the data. It is evident that efficient explicit typing is possible with JSON, but that it necessitates a relational and generic approach for scalability and to guard against syntax errors.

{"break":true}

{"sub":"Proposed solution"}

I propose a syntax for declaring types with a generic and extensible syntax for `type declarations`, altering existing data structures as little as possible, while greatly reducing dependency on additional layers of data validation at multiple points of a distributed system. This syntax is grammatically based on typed values in TypeScript, allowing you to explicitly type data points representing objects. This is paired with a syntax for `type instances`, with relational references to type specifications outside the immediate data point and structure. This syntax is grammatically designed to accommodate different data structures, especially as pertaining to type inheritance and shared typing of data points. As these instances are applied extensibly, they must co-exist with untyped data points, without forcing a strict transformation of existing data structures.

<br>

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

Declarations provide a single source and reference point when explicitly typing values in a data structure. For example, the "date" type can be instantiated in the `data property`at the root of the data structure:

```
{
    "init": {
        "date": {
            "type": "number",
            "case": [ "month", "day", "year" ]
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

{"break":true}

It is evident from this syntactical approach that despite these strict requirements the data remains readable, by separating the type declaration from the actual data through relation references. Additionally, this syntax scales far better with larger data structures, by requiring less repetition, which also lowers the risk of syntax errors. The initialiser can be ignored when casting the data in software, but also acts as embedded documentation for the intent with the data structure. This approach is generic in structure, yet flexible to differently structured data and use-cases, while remaining human-readable and conforming to the JSON specification.

<br>

Types can be instantiated in the `data property`at the root of the data structure:

```
{
    "init": {
        "date": {
            "month": "number",
            "day": "number",
            "year": "number",
            "category": {
                "type": "string", "case": [ "birthday", "work", "holiday" ]
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

<br>

This greatly reduces the character count of the data instance by 66.5% to 149 characters of which the information represents 19 characters or 12.7% of the data. This approach is not without fault, as the data structure including the type declarations is larger at 454 characters, but this trade-off is offset by the reduction in repetition of type declarations as the data scales up in size.

{"break":true}

Type instances can be arrayised, enabling the explicit typing of multiple data points with identical structure with only a single declaration:

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

<br>

As this syntax aims to be extensible by selectively typing data, type instances can be nested inside each other, so that types can be declared once in the initialiser and repurposed throughout the data structure. This is also useful for splitting a type into components that are declaratively simpler and require fewer characters:

```
{
    "init": {
        "category": {
            "type": "string", "case": [ "birthday", "work", "holiday" ]
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

{"break":true}

{"sub":"Detailed design"}

In aiming to reflect the values of extensible implementations, 
type declarations can become type extensions with the dot syntax (.), and type instances can be extensibly added to the data.

<br>

A type can be an extension of another type:

```
{
    "init": {
        "date.number": {
            "case": [ "month", "day", "year" ]
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

<br>

This results in all typed values inheriting typing from the type before the dot in the declared extension. The implication of this is that types do not have to be explicitly declared with a property in a type initialiser, and as such the character count is reduced while maintaining readability. Here are a few examples of the possible type declarations, and how extensions improve the syntax:

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
    "case": [ "month", "day", "year" ]
}
```
```
"date.number": {
    "case": [ "month", "day", "year" ]
}
```

{"break":true}

In evaluating this design it became clear that the complexity in the combination of syntactical features increases greatly with each added feature. As such the actual implementation of this proposal would need to exhaustively demonstrate that the grammatical notation (the "system" of syntax) does not contain conflicting combinations. If we take a more complex data point with differently typed values, such as:

<br>

```
"date": {
    "month": 10, "day": 28, "year": 2005,
    "description": "laundry day", "responsible": "adam"
}
```

It is already evident that the current implementation of the proposal does not adequately facilitate shared typing or inheriting through type extension, when the data structure requires multiple cases with multiple shared types.

<br>

If we start by declaring a type extension in the initialiser:

```
{
    "init": {
        "date.number": {
            "case": [ "month", "day", "year" ]
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

{"break":true}

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

<br>

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

<br>

The design of this implementations considers the hierarchy of the data structure, by typing the required properties at the same level as a type reference, and ignoring properties that are not explicitly typed. It is entirely likely that this implementation does not support certain structures, or that the provided syntax creates conflicting conditions.

{"break":true}

{"sub":"Alternatives considered"}

After experimenting with the implementation of this proposed syntax for types, it became evident that not all type values should be required, and that default values are not an appropriate approach to declaring optional values. It also became evident that instances with a single value requiring an explicit type reference is not the optimal grammatical approach. 

With the current implementation you can declare a type:

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

This is easier to read and interpret than providing default values, which does not make sense in an enumerated case anyway.

{"break":true}

If you were to type a single value:

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

<br>

This is however not without fault as the type name would become a reserved property name for the entire data structure, as there is nothing to indicate whether it is a type reference or not. This is not in keeping with the extensible approach of TXON, so the property name would need some other non-typical indicator such as an exclamation mark (!) to indicate it is initialising a type:

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

{"break":true}

{"sub":"Source compatibility"}

As the TXON specification conforms to the JSON specification, there should be zero compatibility issues with existing implementations of JSON for editing, decoding or encoding objects. Existing JSON data structures cannot be validated with the TXON.js library, as it requires the declaration of types, but since they do not contain type references anyway the library is not applicable regardless. However, typed data structures are still valid JSON structures, and as such they can be parsed and the explicit typing can be ignored or utilised with other validation implementations or for other purposes.

<br>

{"sub":"Future directions"}

Actually adopting this proposed syntax for type declarations is quite feasible, as the data structure can remain otherwise unaltered and the type declarations and references can be ignored. However, this will decrease performance and increase size of file transmissions, so it should not be done unless it clearly demonstrates an improved validation process both now and in the future.

{"break":true}