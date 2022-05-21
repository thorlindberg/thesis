{"sub":"Initialisation of type declarations"}

As a step towards improving the safety and usability of the JSON format through an extensible approach, this first half of the collective proposal introduces a syntax for declarations as enumerations and specifications of type or type extension initialisation requirements.

The motivation for this implementation of types is the current inability to extend or enumerate types in the JSON specification. The result of this flaw is that developers cannot validate whether their data structures are correct or incorrect before they have been received by a client.

<br>

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

<br>

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

<br>

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

```
"date": {
    "month": 10, "day": 28, "year": 2005,
    "description": "laundry day", "responsible": "adam"
}
```

It is already evident that the current implementation of the proposal does not adequately facilitate shared typing or inherting through type extension, when the data structure requires multiple cases with multiple shared types.

<br>

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