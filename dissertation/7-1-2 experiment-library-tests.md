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