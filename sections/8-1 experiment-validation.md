{"sub":"Validation library"}

In this section I illustrate the functional aspect of my proposal, written with the JavaScript language and phrased as a library. I present the intent of my library, and then relate the components of its validation process to the components of my syntax proposal.

<br>

**Intended use**

The txon.js library *handshakes* a JSON String, validating conformance of its "data" property to extended type declarations from its "init" property. TXON is initialised as an Object with a *docs* method, *handshake* method, and *tests* property.

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

**Validation process**

The validation process consists of steps. Each step corresponds to a feature from the proposed syntax, and can return its own descriptive error if non-conformance is encountered. In the case of non-conformance, the process will not continue with the next step if any, thus reducing unnecessary computation. If non-conformance is not encountered in any step, no error will be returned.

Developers may desire for validation to continue despite non-conformance, and can in this case utilise the syntax for default values. If non-conformance is encountered but a default is defined, the process will continue with the inserted default value.

The extensible nature of the proposed syntax necessitates that validation be performed recursively, so that developers do not have to re-architect their existing data structures. As a result, the following steps may appear repetitive and validation performance scales non-linearly with data size.

<br>

**Validation steps**

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
    const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
    if (isExtendedType) {
        property.values.forEach(value => {
            const objprops = Object.getOwnPropertyNames(value)
            const initprops = Object.getOwnPropertyNames(initialiser[property.type])
            const propsConform = objprops.toString() === initprops.toString() 
            if (!propsConform) {
                error.push(
                    `ERROR: properties of extended type do not conform to init. ${objprops} and ${initprops}`
                )
            } else {
                objprops.forEach(prop => {
                    const valuetype = typeof value[prop]
                    const inittype = initialiser[property.type][prop].type
                    const typesConform = valuetype === inittype
                    if (!typesConform) {
                        error.push(
                            `ERROR: value type does not conform to init. ${valuetype} and ${inittype}`
                        )
                    } else {
                        const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                        if (hasEnum) {
                            const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                            const enumsConform = objenum.includes(value[prop])
                            if (!enumsConform) {
                                error.push(
                                    `ERROR: enum value does not conform to init. ${value[prop]} not in ${objenum}`
                                )
                            }
                        }
                    }
                })
            }
        })
    }
}
checkConformance(data)
```

<br>

return: false, error || true

```
return error.length ? { result: false, error: error } : { result: true }
```

{"break":true}