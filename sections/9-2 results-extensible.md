{"sub":"Syntax for type extensions"}

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