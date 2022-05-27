{"sub":"Library and features"}

A library is a collection of utilities that in combination achieve a shared goal. In this instance, the TXON library is instantiated as a TXON object and its method provides validation of a JSON String. In the following I present the features, intent and structure of my library. This library supports the following validation features, reflecting syntactical features in the .txon data format.

- Type declarations in the `initialiser property`.
- Type instances in the `data property`.

Users can declare their own extended types (e.g. "date"), or declare extensions of JSON types or extended types using a dot-syntax (e.g. "string.date" or "date.month"). `Extended types` are specified as enumerations and instantiated by associating data with the type. This is further presented in the syntax proposal. `Type extensions` allow you to inherit the requirements of an existing type, while extending it as a sub-type with an enumeration. This is further presented in the syntax proposal.

<br>

The txon.js library "handshakes" a JSON String, validating conformance of its "data" property to extended type declarations from its "init" property. TXON is initialised as an Object with a "docs method", "handshake method", and "tests property".

```
const TXON = {
    
    docs: [ ∙∙∙ ].join("\n"),
    tests: [ ∙∙∙ ],
    handshake: (input) => { ∙∙∙ }

}
```

<br>

The `docs` property requires no input parameters and returns a String documenting the intended use of my library. This approach ensures that the code is documented as it is written, but it exists only at the top-level of the library rather than in individual components.

```
docs: [

    "How to validate with TXON",
    ...
    
].join("\n")
```

{"break":true}

The `tests` property is of type Array\<Object> and is intended to demonstrate each syntactical feature of TXON being validated throug the library. Each Object contains the intended result of the test (properties `valid`and `feedback`), as well as a sample data structure (`json`).

```
tests: [

    {
        "valid": true,
        "feedback": '"init" property not found at top level',
        "json": `{
            "data": [ ]
        }`
    },
    ...
    
]
```

<br>

Tests can be iterated through to validate both type declarations and conformance of instances, to demonstrate the resulting feedback when the respective error is found. This can be useful for people wanting to learn TXON, and writing tests was instrumental in developing the library and validation flow.

```
TXON.tests.forEach(test => {
    
    const validation = TXON.handshake(test.json)
    console.log("expected\t", test.valid, test.feedback)
    const checksPassed = validation.valid && validation.feedback == null
    if (checksPassed) {
        console.log("outcome\t\t", true, "no feedback, all checks passed")
    } else {
        console.log("outcome\t\t", validation.valid, validation.feedback)
    }
    console.log("-")

})
```

{"break":true}

The `handshake()` method takes an input, expected to be of type JSON String. If all validation checks are passed without detecting nonconformance to types, then the resulting property will have no feedback property. Handshaking requires a String as input parameter, and returns an Object with "valid" and optional "feedback" properties. The `valid` property is of type Boolean, indicating success (true) or failure (false). The `feedback` property is of type String and describes the first encountered nonconformance issue. 

```
{ "valid": true, "feedback": '"init" property not found at top level' }
```

A TXON data structure can return "true" for property `valid` for other reasons, such as the lack of an initialiser, because while its contents may be correctly typed it is not a valid TXON structure. This allows developers to check if the property exists, to determine if validation was successful.

Before validating the contents of its input, the handshaking method defines its own properties and methods. Its properties consist of the parsed JSON Object and an array of valid types in the JSON specification. Its methods consist of the three requirements in validating a TXON data structure.

`checkJSON` implements a try-catch attempting to parse the input to JSON.

`checkInit` ensures that the parsed JSON contains an init property and attempts to detect an incorrect type declaration.

`checkData` ensures that the parsed JSON contains a data property and attempts to detect an incorrect type instance.

```
handshake: (input) => {

    var object
    const JSONTypes = [
        "string", "integer", "number", "object", "array", "boolean", "null" 
    ]

    const checkJSON = (input) => { ... }
    const checkInit = (object) => { ... }
    const checkData = (object) => { ... }

    const jsonError = checkJSON(input)
    if (jsonError != null) { return jsonError }

    const initError = checkInit(object)
    if (initError != null) { return initError }

    const dataError = checkData(object)
    if (dataError != null) { return dataError }

    return { valid: true }

}
```

{"break":true}