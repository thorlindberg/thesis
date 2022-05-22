{"sub":"checkJSON"}

The first validation method contains a `try-catch` to check that the input parameter is a String that can be parsed with the JavaScript built-in `JSON.parse()`method. If the try fails, the catch will return an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that it failed to parse.

```
const checkJSON = (input) => {

    try {
        object = JSON.parse(input)
    } catch {
        return {
            valid: true,
            feedback: "could not parse JSON"
        }
    }

}
```

<br>