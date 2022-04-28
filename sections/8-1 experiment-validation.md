{"sub":"Type validation library"}

In this section I illustrate the functional aspect of my proposal, written with the JavaScript language and phrased as a library. I present the intent of my library, and then relate the components of its validation process to the components of my syntax proposal.

<br>

**Features**

This library supports the following features, with the aim of validating information based on its instantiated type, which corresponds to a type declaration of requirements for validity.

The developer can declare their own types, or declare extensions of existing types using a dot-syntax. There is support for infinite nesting and various syntaxes for declaration and instantiation.

*Extended types* are specified as requirements and instantiated for validation purposes.

*Extension of types* allows you to inherit an existing type (incl. beyond JSON types, that is self-declared types) while extending it with new requirements.

- Type specification declaration (in *init property*).
- Type instantiation (in *data property*).
- Optional values (ignored during validation).
- Default value insertion (for type misconformance).

<br>

**Intended use**

The txon.js library *handshakes* a JSON String, validating conformance of its *data property* to extended type declarations from its "init" property. TXON is initialised as an Object with a *docs method*, *handshake method*, and *tests property*.

Docs requires no input parameters and returns a String documenting the intended use of my library. This approach ensures that the code is documented as it is written, but it exists only at the top-level of the library rather than in individual components.

```
docs: [
    "How to validate with TXON..."
].join("\n")
```

<br>

Handshaking requires a String parameter and returns an Object with *result* and *error* properties.

The *result* property is of type Boolean, indicating success (true) or failure (false). If the result is true, the *error* property will be of type Null. If the result is false, the *error* property will be of type String describing the first encountered non-conformance issue.

```
const validation = TXON.handshake('{ "init": ..., "data": ... }')

// validation.result -> Bool
// validation.error -> Null || String
```

<br>

The *tests* property is of type Array\<String> and contains sample JSON Strings that demonstrate the features and intended use of TXON.

```
tests: [
    '{ "init": ..., "data": ... }',
    ...
]
```

<br>

Tests can be iterated through to illustrate the expected outcome of a correct or incorrect appropriation of my syntax proposal.

```
TXON.tests.forEach(test => {
    
    const validation = TXON.handshake(test)

    if (validation.result) {
        ...
    } else {
        ...
    }
    
})
```

<br>

**Process**

The validation process consists of steps. Each step corresponds to a feature from the proposed syntax, and can return its own descriptive error if non-conformance is encountered. In the case of non-conformance, the process will not continue with the next step if any, thus reducing unnecessary computation. If non-conformance is not encountered in any step, no error will be returned.

Developers may desire for validation to continue despite non-conformance, and can in this case utilise the syntax for default values. If non-conformance is encountered but a default is defined, the process will continue with the inserted default value.

The extensible nature of the proposed syntax necessitates that validation be performed recursively, so that developers do not have to re-architect their existing data structures. As a result, the following steps may appear repetitive and validation performance scales non-linearly with data size.

<br>

**Implementation**

...

```
let object, initialiser, data
let error = []
```

<br>

check: parsing JSON to JS

```
const hasJSON = true
if (hasJSON) {
    object = JSON.parse(json)
} else {
    error.push("ERROR: could not parse JSON")
    return { result: false, error: error }
}
```

<br>

check: has .init prop

```
const hasInit = object.hasOwnProperty("init")
if (hasInit) {
    initialiser = object.init
} else {
    error.push("ERROR: .init property not found in JSON")
    return { result: false, error: error }
}
```

<br>

check: has .data prop

```
const hasData = object.hasOwnProperty("data")
if (hasData) {
    data = object.data
} else {
    error.push("ERROR: .data property not found in JSON")
    return { result: false, error: error }
}
```

<br>

check: .data contains object[s] conforming to extended type[s] defined in .init

```
const checkConformance = (property) => {
    if (typeof property === "object") {
        Object.values(property).forEach(n => checkConformance(n))
    }
    if (typeof property === "array") {
        property.forEach(n => checkConformance(n))
    }
    ...
}
checkConformance(data)
```

<br>

return: false, error || true

```
return error.length ? { result: false, error: error } : { result: true }
```

{"break":true}