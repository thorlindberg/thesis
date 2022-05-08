**Intended use**

The txon.js library *handshakes* a JSON String, validating conformance of its *data property* to extended type declarations from its "init" property. TXON is initialised as an Object with a *docs method*, *handshake method*, and *tests property*.

```
const TXON = {

    docs: [ ∙∙∙ ].join("\n"),

    tests: [ ∙∙∙ ],

    handshake: (input) => { ∙∙∙ }

}
```

<br>

Docs requires no input parameters and returns a String documenting the intended use of my library. This approach ensures that the code is documented as it is written, but it exists only at the top-level of the library rather than in individual components.

```
docs: [

    "How to validate with TXON",
    ∙∙∙

].join("\n")
```

{"break":true}

The *tests* property is of type Array\<String> and contains sample JSON Strings that demonstrate the features and intended use of TXON.

```
tests: [
    
    {
        "valid": true,
        "feedback": '"init" property not found at top level',
        "json": `{
            "data": [ ]
        }`
    },
    ∙∙∙

]
```

<br>

Tests can be iterated through to illustrate the expected outcome of a correct or incorrect appropriation of my syntax proposal.

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