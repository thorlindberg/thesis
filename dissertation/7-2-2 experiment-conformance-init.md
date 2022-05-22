{"sub":"checkInit"}

The second validation method starts with a check for the existence of an `init` property at the root node of the parsed JSON object. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that it is missing a type initialiser property.

```
const checkInit = (object) => {

    const hasInit = object.hasOwnProperty("init")
    if (!hasInit) {
        return {
            valid: true,
            feedback: '"init" property not found at top level'
        }
    }

    ∙∙∙
    
}
```

{"break":true}

If an initialiser exists as a property of the root node, the method proceeds to validating the structure of types declared as properties of the initialiser. This is accomplished by looping through the initialiser properties, determining if the property name matches the syntax of a type extension (dot syntax), and only proceeding with validation if the property value is of type Object.

```
const checkInit = (object) => {

    ∙∙∙

    for (const [name, value] of Object.entries(object.init)) {

        const isObject = typeof value === "object"

        var isTypeExtensionName
        var firstType
        const hasDot = name.includes(".")
        if (hasDot) {
            const hasSingleDot = name.split(".").length === 2
            firstType = name.split(".")[0]
            const secondType = name.split(".")[1]
            if (hasSingleDot) {
                const startsWithJSONType = JSONTypes.includes(firstType)
                const endsWithCustomType = !JSONTypes.includes(secondType)
                isTypeExtensionName = startsWithJSONType && endsWithCustomType
            }
        }

        if (isObject) { ∙∙∙ }

    }

}
```

{"break":true}

A property value of type Object is checked in three steps, starting with a check for a `shared type` which is a property with the name "type" in the declaration node. This type is inherited by the other properties, so this check also impacts the rest of this validation method.

```
if (isObject) {

    const hasSharedType = value.hasOwnProperty("type")
    if (hasSharedType) { ∙∙∙ }

    if (isTypeExtensionName) { ∙∙∙ }

    for (const [propName, propValue] of Object.entries(value)) { ∙∙∙ }

}

```

{"break":true}

[ Text ]

```
// value has property type with value of JSON type
const hasSharedType = value.hasOwnProperty("type")
if (hasSharedType) {

    const propertyType = value.type
    const typeMatchesJSON = JSONTypes.includes(propertyType)
    if (!typeMatchesJSON) {
        return {
            valid: true,
            feedback: `type "${name}" has invalid shared JSON "type" declaration "${propertyType}"`
        }
    }

    // value has property default with value of type matching type property
    const hasSharedDefault = value.hasOwnProperty("default")
    if (hasSharedDefault) {
        const defaultType = typeof value.default
        const defaultMatchesType = defaultType === propertyType
        if (!defaultMatchesType) {
            return {
                valid: true,
                feedback: `type "${name}" has shared default of mismatched type "${defaultType}"`
            }
        }
    }

    // value has property minimum with value of type matching type property
    const hasSharedMinimum = value.hasOwnProperty("minimum")
    if (hasSharedMinimum) {
        const minType = typeof value.minimum
        const minMatchesType = minType === propertyType
        if (!minMatchesType) {
            return { valid: true, feedback: `type "${name}" has shared minimum of mismatched type "${minType}"` }
        }
    }

    // value has property maximum with value of type matching type property
    const hasSharedMaximum = value.hasOwnProperty("maximum")
    if (hasSharedMaximum) {
        const maxType = typeof value.maximum
        const maxMatchesType = maxType === propertyType
        if (!maxMatchesType) {
            return { valid: true, feedback: `type "${name}" has shared maximum of mismatched type "${maxType}"` }
        }
    }

}
```

{"break":true}

[ Text ]

```
if (isTypeExtensionName) {

    // value has property default with value of type matching type property
    const hasSharedDefault = value.hasOwnProperty("default")
    if (hasSharedDefault) {
        const defaultType = typeof value.default
        const defaultMatchesType = defaultType === firstType
        if (!defaultMatchesType) {
            return {
                valid: true,
                feedback: `extension "${name}" has shared default of mismatched type "${defaultType}"`
            }
        }
    }

    // value has property minimum with value of type matching type property
    const hasSharedMinimum = value.hasOwnProperty("minimum")
    if (hasSharedMinimum) {
        const minType = typeof value.minimum
        const minMatchesType = minType === firstType
        if (!minMatchesType) {
            return {
                valid: true,
                feedback: `extension "${name}" has shared minimum of mismatched type "${minType}"`
            }
        }
    }

    // value has property maximum with value of type matching type property
    const hasSharedMaximum = value.hasOwnProperty("maximum")
    if (hasSharedMaximum) {
        const maxType = typeof value.maximum
        const maxMatchesType = maxType === firstType
        if (!maxMatchesType) {
            return {
                valid: true,
                feedback: `extension "${name}" has shared maximum of mismatched type "${maxType}"`
            }
        }
    }

}
```

{"break":true}

[ Text ]

```
// loop through property names and find "case" array or case declaration
for (const [propName, propValue] of Object.entries(value)) {

    // prop name is "case" and array and all strings
    const isCaseName = propName === "case"
    const isArray = propValue instanceof Array
    const isCase = isCaseName && isArray
    if (isCase) {
        const typesMatchString = propValue.filter(n => typeof n === "string").length === propValue.length
        if (!typesMatchString) {
            return {
                valid: true,
                feedback: `type "${propName}" has case declaration array with invalid contents`
            }
        }
    }

    // propValue is object
    const isObject = typeof propValue === "object"
    if (isObject) {
        ∙∙∙
    }

}
```

{"break":true}

[ Text ]

```
// loop through property names and find "case" array or case declaration
for (const [propName, propValue] of Object.entries(value)) {

    ∙∙∙

    // propValue is object
    const isObject = typeof propValue === "object"
    if (isObject) {

        var hasLocalJSON
        const hasLocalType = propValue.hasOwnProperty("type")
        if (hasLocalType) {
            hasLocalJSON = JSONTypes.includes(propValue.type)
        }

        const hasDefault = propValue.hasOwnProperty("default")
        if (hasDefault) {
            ∙∙∙
        }

        const hasMinimum = propValue.hasOwnProperty("minimum")
        if (hasMinimum) {
            ∙∙∙
        }

        const hasMaximum = propValue.hasOwnProperty("maximum")
        if (hasMaximum) {
            ∙∙∙
        }

    }

}
```

{"break":true}

[ Text ]

```
// loop through property names and find "case" array or case declaration
for (const [propName, propValue] of Object.entries(value)) {

    ∙∙∙

    // propValue is object
    const isObject = typeof propValue === "object"
    if (isObject) {

        var hasLocalJSON
        const hasLocalType = propValue.hasOwnProperty("type")
        if (hasLocalType) {
            hasLocalJSON = JSONTypes.includes(propValue.type)
        }

        const hasDefault = propValue.hasOwnProperty("default")
        if (hasDefault) {
            const defaultType = typeof propValue.default
            var typeMismatch
            if (hasLocalJSON) {
                typeMismatch = defaultType != propValue.type
            } else if (isTypeExtensionName) {
                typeMismatch = defaultType != firstType
            } else {
                typeMismatch = defaultType != value.type
            }
            if (typeMismatch) {
                return {
                    valid: true,
                    feedback: `type "${name}" has property "${propName}" with default of mismatched type "${defaultType}"`
                }
            }
        }

        const hasMinimum = propValue.hasOwnProperty("minimum")
        if (hasMinimum) {
            ∙∙∙
        }

        const hasMaximum = propValue.hasOwnProperty("maximum")
        if (hasMaximum) {
            ∙∙∙
        }

    }

}
```

{"break":true}

[ Text ]

```
// loop through property names and find "case" array or case declaration
for (const [propName, propValue] of Object.entries(value)) {

    ∙∙∙

    // propValue is object
    const isObject = typeof propValue === "object"
    if (isObject) {

        var hasLocalJSON
        const hasLocalType = propValue.hasOwnProperty("type")
        if (hasLocalType) {
            hasLocalJSON = JSONTypes.includes(propValue.type)
        }

        const hasDefault = propValue.hasOwnProperty("default")
        if (hasDefault) {
            ∙∙∙
        }

        const hasMinimum = propValue.hasOwnProperty("minimum")
        if (hasMinimum) {
            const minType = typeof propValue.minimum
            var typeMismatch
            if (hasLocalJSON) {
                typeMismatch = minType != propValue.type
            } else if (isTypeExtensionName) {
                typeMismatch = minType != firstType
            } else {
                typeMismatch = minType != value.type
            }
            if (typeMismatch) {
                return {
                    valid: true,
                    feedback: `type "${name}" has property "${propName}" with minimum of mismatched type "${minType}"`
                }
            }
        }

        const hasMaximum = propValue.hasOwnProperty("maximum")
        if (hasMaximum) {
            ∙∙∙
        }

    }

}
```

{"break":true}

[ Text ]

```
// loop through property names and find "case" array or case declaration
for (const [propName, propValue] of Object.entries(value)) {

    ∙∙∙

    // propValue is object
    const isObject = typeof propValue === "object"
    if (isObject) {

        var hasLocalJSON
        const hasLocalType = propValue.hasOwnProperty("type")
        if (hasLocalType) {
            hasLocalJSON = JSONTypes.includes(propValue.type)
        }

        const hasDefault = propValue.hasOwnProperty("default")
        if (hasDefault) {
            ∙∙∙
        }

        const hasMinimum = propValue.hasOwnProperty("minimum")
        if (hasMinimum) {
            ∙∙∙
        }

        const hasMaximum = propValue.hasOwnProperty("maximum")
        if (hasMaximum) {
            const maxType = typeof propValue.maximum
            var typeMismatch
            if (hasLocalJSON) {
                typeMismatch = maxType != propValue.type
            } else if (isTypeExtensionName) {
                typeMismatch = maxType != firstType
            } else {
                typeMismatch = maxType != value.type
            }
            if (typeMismatch) {
                return {
                    valid: true,
                    feedback: `type "${name}" has property "${propName}" with maximum of mismatched type "${maxType}"`
                }
            }
        }

    }

}
```

{"break":true}