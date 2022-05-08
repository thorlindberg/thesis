**Tests**

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