{"sub":"Library and features"}

A library is a collection of utilities that in combination achieve a shared goal. In this instance, the TXON library is instantiated as a TXON object and its method provides validation of a JSON String. In the following I present the features, intent and structure of my library. This library supports the following validation features, reflecting syntactical features in the .txon data format.

- Type declarations in the `initialiser property`.
- Type instances in the `data property`.

Users can declare their own extended types (e.g. "date"), or declare extensions of JSON types or extended types using a dot-syntax (e.g. "string.date" or "date.month"). `Extended types` are specified as enumerations and instantiated by associating data with the type. This is further presented in the syntax proposal. `Type extensions` allow you to inherit the requirements of an existing type, while extending it as a sub-type with an enumeration. This is further presented in the syntax proposal.

<br>

The txon.js library "handshakes" a JSON String, validating conformance of its "data property" to extended type declarations from its "init" property. TXON is initialised as an Object with a "docs method", "handshake method", and "tests property".

```
const TXON = {
    
    docs: [ ∙∙∙ ].join("\n"),
    tests: [ ∙∙∙ ],
    handshake: (input) => { ∙∙∙ }

}
```

<br>