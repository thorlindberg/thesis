{"sub":"Initialisation of type declarations"}

As a step towards improving the safety and usability of the JSON format through an extensible approach, this first half of the collective proposal introduces a syntax for declarations as enumerations and specifications of type or type extension initialisation requirements.

The motivation for this implementation of types is the current inability to extend or enumerate types in the JSON specification. The result of this flaw is that developers cannot validate whether their data structures are correct or incorrect before they have been received by a client.

<br>

Consider a simple `data structure` that conforms to the JSON specification:

```
{
    "date": "28-10-2005"
}
```

Suppose you are transmitting this to a client but you decide to alter the date format. This would cause the data to be invalidated by the recipient, but this is easily fixed by altering the expected structure. You may have altered the data structure to `split properties` of the original:

```
{
    "date": {
        "month": 28, "day": 10, "year": 2005
    }
}
```

This is much clearer to both parties, and because the data points have number values they are less likely to be invalidated. Text editors and data parsers that implement the JSON specification will highlight or throw an error if the properties include characters beyond numbers. As data interchange formats are typically not manually typed, it is possible for any value to end up as an unintended type. As such, the recipient would likely validate the types independently to ensure that they are indeed correct. This could be eased by including a `type declaration` that explicitly states the intended value:

```
{
    "date": {
        "type": "number", "month": 28, "day": 10, "year": 2005
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
            "month": 28,
            "day": 10,
            "year": 2005
        }
    }
}
```

It is evident from this syntactical approach that despite these strict requirements the data remains readable, by separating the type declaration from the actual data through relation references. Additionally, this syntax scales far better with larger data structures, requiring less repetition and as such a lesser chance of syntax errors. The initialiser can be ignored when casting the data in software, but also acts as embedded documentation of the intent with the data structure. This approach is generic in structure yet flexible to differently structured data and use-cases, while remaining human-readable and conforming to the JSON specification.

<br>

[ Text on detailed design ]

<br>

[ Text on alternatives ]
[ Could use question mark (?) syntax for optionals :) ]

<br>

As the TXON specification conforms to the JSON specification, there should be zero compatibility issues with existing implementations of JSON for editing, serialising or parsing data. Existing JSON data structures cannot be validated with the txon.js validation library, as it requires the declaration of types, but since it is not a TXON structure this would be unnecessary regardless. However, data structures with type declarations/instances are still valid JSON structures, and as such they can be parsed and the explicit typing can be ignored or utilised with other validation implementations or for other purposes.

<br>

[ Text on future directions ]

---

`Detailed design:` an enumerated list describing how the proposed changes are expressed, fluxuating between description and samples of code or other material that showcase these expressions. This should include a criticial reflection on the proposed expressions and unsupported expressions if any exist in the implementation.

`Alternatives considered:` a step-wise description of alternative changes, fluxuating between description and samples of code or other material that demonstrate the alternative implementations. This can vary greatly in how closely the alternatives correlate or do not correlate, as there are often multiple varied paths to achieving the same effect.

`Source compatibility:` a description of the impact on existing code if any, such as changes that deprecate existing code over new preferred approaches or invalidate it syntactically, referred to as "source-breaking".

`Future directions:` a description of further changes that could be or should be made to accomodate this proposal or improve upon the implementation of a certain part of the given language.

{"break":true}