{"sub":"Validation library and tests"}

The txon.js library *handshakes* a JSON file, validating conformance of its "data" property to extended type declarations in its "init" property.

Handshaking is a property-function of TXON, and thus it is called as following.

```
const TXON = {
    handshake: (json) => { ... }
}
```
```
const validation = TXON.handshake('{ "init": ..., "data": ... }')
// validation.result == true || false
// validation.error == undefined || ["..."]
```

<br>

The function requires the parsing of a JSON object containing an "init" and "data" property, and will throw errors by storing them in a returned array **(will be changed to throwing 1 error when detected and immediately returning)**.

```
let object, initialiser, data
let error = []
```
```
// check: parsing JSON to JS
const hasJSON = true
if (hasJSON) {
    object = JSON.parse(json)
} else {
    error.push("ERROR: could not parse JSON")
    return { result: false, error: error }
}
```
```
// check: has .init prop
const hasInit = object.hasOwnProperty("init")
if (hasInit) {
    initialiser = object.init
} else {
    error.push("ERROR: .init property not found in JSON")
    return { result: false, error: error }
}
```
```
// check: has .data prop
const hasData = object.hasOwnProperty("data")
if (hasData) {
    data = object.data
} else {
    error.push("ERROR: .data property not found in JSON")
    return { result: false, error: error }
}
```

<br>

Objects with extended types can be instantiated at the top-level of the "data" property, or nested inside it, requiring their recursive detection.

If no extended types are instantiated, the return value will be true but throw an error noting this.

If extended types are instantiated but do not conform, the return value will be false and an error is thrown describing how and where the mismatch occoured during validation.

**(This code block is incomplete)**

```
// check: .data contains object[s] conforming to extended type[s] defined in .init
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

Once validation is complete, a descripitive object is returned and can be interpreted by the recipient. **(will be changed to returning true, as this will not be reached if an error is returned during validation)**.

```
// return: false, error || true
return error.length ? { result: false, error: error } : { result: true }
```

<br>