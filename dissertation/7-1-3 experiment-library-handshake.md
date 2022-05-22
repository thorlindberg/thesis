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

    const checkJSON = (input) => { ∙∙∙ }
    const checkInit = (object) => { ∙∙∙ }
    const checkData = (object) => { ∙∙∙ }

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