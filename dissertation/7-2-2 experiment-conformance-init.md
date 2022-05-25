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

    ...
    
}
```

{"break":true}

If an initialiser exists as a property of the root node, the method proceeds to validating the structure of types declared as properties of the initialiser. This is accomplished by looping through the initialiser properties, determining if the property name matches the syntax of a type extension (dot syntax), and only proceeding with validation if the property value is of type Object.

```
const checkInit = (object) => {

    ...

    for (const [name, value] of Object.entries(object.init)) {

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

        const isObject = typeof value === "object"
        if (isObject) { ... }

    }

}
```

<br>

A property value of type Object is checked in three steps, starting with a check for a `shared type` which is a property with the name "type" in the declaration node. This type is inherited by the other properties, so this check also impacts the rest of this validation method.

```
const isObject = typeof value === "object"
if (isObject) {

    const hasSharedType = value.hasOwnProperty("type")
    if (hasSharedType) { ... }

    if (isTypeExtensionName) { ... }

    for (const [propName, propValue] of Object.entries(value)) { ... }

}
```

{"break":true}

If a type declaration has a shared type it proceeds with the following validation. This starts with validating that its shared type value corresponds to a JSON type. If this is not true it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that a shared type was incorrectly syntactically declared.

It then proceeds to checking if a shared default, minimum, or maximum exists. If any of these exists, they are validated based on whether their value type corresponds to the shared type. If this is not true for any of these properties, an Object is returned that indicates the data structure is valid as it cannot be further validated, but with the feedback that the respective property has a nonconforming value.

```
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

    const hasSharedMinimum = value.hasOwnProperty("minimum")
    if (hasSharedMinimum) {
        const minType = typeof value.minimum
        const minMatchesType = minType === propertyType
        if (!minMatchesType) {
            return {
                valid: true,
                feedback: `type "${name}" has shared minimum of mismatched type "${minType}"`
            }
        }
    }

    const hasSharedMaximum = value.hasOwnProperty("maximum")
    if (hasSharedMaximum) {
        const maxType = typeof value.maximum
        const maxMatchesType = maxType === propertyType
        if (!maxMatchesType) {
            return {
                valid: true,
                feedback: `type "${name}" has shared maximum of mismatched type "${maxType}"`
            }
        }
    }

}
```

{"break":true}

If a type declaration is a type extension it proceeds with the following validation. This step being second to the validation of a shared type means it is syntactically possible to declare a shared type for a type extension, but that the declaration will still be validated based on the JSON type in the extension name.

The step is indifferent from the validation of a shared type, except it determines conformance based on the extension name rather than its "type" property. It checks if a shared default, minimum, or maximum exists. If any of these exists, they are validated based on whether their value type corresponds to the shared type. If this is not true for any of these properties, an Object is returned that indicates the data structure is valid as it cannot be further validated, but with the feedback that the respective property has a nonconforming value type.

```
if (isTypeExtensionName) {

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

Once the shared type, default, minimum, and maximum have been checked, the properties of each declaration are looped over to determine if the enumerated values have been correctly declared relative to the type. There are two types of enumerates: property names beyond the reserved names, and names in a "case" entitled property. The `case` property is an array of value names, and was implemented to ensure that values could be enumerated without requiring a local type.

This loop in the validation begins by checking if the property is named "case" and then that it only contains elements of type String. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that a type was declared with enumeration cases of a different type than String.

```
for (const [propName, propValue] of Object.entries(value)) {

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

    const isObject = typeof propValue === "object"
    if (isObject) { ... }

}
```

{"break":true}

After validating the case property, the next step is to check if the property value is of type Object. If the value is an object, it is checked in four steps, starting with determining if it has a local type with a value corresponding to a JSON type. This step does not return an error if the local type is not a JSON type, and instead the "type" property is ignored and a shared type or type extension is used instead.

```
const isObject = typeof propValue === "object"
if (isObject) {

    var hasLocalJSON
    const hasLocalType = propValue.hasOwnProperty("type")
    if (hasLocalType) {
        hasLocalJSON = JSONTypes.includes(propValue.type)
    }

    const hasDefault = propValue.hasOwnProperty("default")
    if (hasDefault) { ... }

    const hasMinimum = propValue.hasOwnProperty("minimum")
    if (hasMinimum) { ... }

    const hasMaximum = propValue.hasOwnProperty("maximum")
    if (hasMaximum) { ... }

}
```

<br>

The second step is to check for a local default value, the same way the shared default was validated. The difference is that this check deviates based on whether a valid local type was declared, and if not then based on if the type is an extension, and if not using the shared type. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that the default value is of a mismatched type.

```
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
```

{"break":true}

The third step is to check for a local minimum value, the same way the shared minimum was validated. The difference is that this check deviates based on whether a valid local type was declared, and if not then based on if the type is an extension, and if not using the shared type. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that the minimum value is of a mismatched type.

```
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
```

<br>

The fourth step is to check for a local maximum value, the same way the shared maximum was validated. The difference is that this check deviates based on whether a valid local type was declared, and if not then based on if the type is an extension, and if not using the shared type. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that the maximum value is of a mismatched type.

```
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
```

{"break":true}