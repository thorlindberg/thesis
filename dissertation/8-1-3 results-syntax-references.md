{"sub":"Instantiation of typed data points"}

As a step towards improving the safety and usability of the JSON format through an extensible approach, this second half of the collective proposal introduces a syntax for instances as data points that reference a type initialisation specification.

The motivation for this implementation of types is the current lack of a standardised and generic syntax for explicitly typing dynamically typed data. The result of this is multiple independent approaches to typing, such as including requirements as properties ofobjects. This lack of standardisation means each involved party in a development process must independently verify their data structures.

<br>

Consider this simple explicitly typed `data structure` that conforms to the JSON specification:

```
{
    "date": {
        "month": { "type": "number", "value": 28 },
        "day": { "type": "number", "value": 10 },
        "year": { "type": "number", "value": 2005 }
    }
}
```

Suppose that this structure was used to type an entire data structure that may contain 100-1000 properties. This would be a poorly performing data format, as the information necessary for validating the data is much more prevalent than the actual information stored within it. In fact, in this example the data contains 177 characters of which the information only represents 8 characters or 4.5% of the data. You may alter this structure to reduce repetition, as in this specific instance all values are typed identically:


```
{
    "date": {
        "type": "number",
        "month": 28, "day": 10, "year": 2005
    }
}
```

This greatly reduces the character count by 48% to 92 characters of which the information represents 8 characters or 8.6% of the data. While this is certainly an improvement, it is also a best-case scenario and only works if all properties of an object can be identically typed. If this is not the case, the data structure would have to independently type each property or collections of properties:

```
{
    "date": {
        "month": { "type": "number", "value": 28 },
        "day": { "type": "number", "value": 10 },
        "year": { "type": "number", "value": 2005 },
        "category": { "type": "string", "value": "birthday" },
        "gifted": { "type": "boolean", "value": 1 }
    }
}
```
```
{
    "date": {
        "number": {
            "month": 28, "day": 10, "year": 2005
        },
        "string": {
            "category": "birthday"
        },
        "boolean": {
            "gifted": 1
        }
    }
}
```

These can be considered safe structures, but also increasingly prone to syntax errors. All parties involved would have to agree to use identical structures for data points, to ensure compatibility with validation processes. The former structure with individual typing contains 301 characters of which the information represents 19 characters or 6.3% of the data. The altter structure with collections of properties through inverted typing contains 224 characters of which the information represents 19 characters or 8.48% of the data. It is evident that efficient explicit typing is possible with JSON, but that it necessitates a relational and generic approach for scalability and to guard against syntax errors. In addition, properties of types such as String can vary greatly in content, but typically match an enumerated list of values. As such, it would be apt to enumerate values in a type declaration.

<br>

I would like to propose a syntax for type instances...

These features of a data point could be implemented in a `type instance` that references such a specification outside of the immediate data point and structure:

```

```

---

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