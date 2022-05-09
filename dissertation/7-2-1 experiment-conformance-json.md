**JSON**

The first process consists of only one step, a try-catch that attempts to parse the input to a JavaScript Object, returning an error if it fails.

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