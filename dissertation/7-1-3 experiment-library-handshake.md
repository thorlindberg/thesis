The `handshake()` method takes an input, expected to be of type JSON String. Handshaking requires a String parameter and returns an Object with `valid` and optional `feedback` properties.

Before validating the contents of its input, the handshaking method defines its own properties and methods. Its peroperties consist of the parsed JSON Object and an array valid types in the JSON specification. Its methods consist of the three main / top-level steps in TXON validation:

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