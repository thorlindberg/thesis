{"sub":"checkData"}

The third validation method has to accommodate any and all data structures considered valid in the JSON specification. As such the validation must be executed recursively for every nested node in the structure, and it must be applied extensively by only validating data that was intended to be typed with TXON.

It starts with a check for the existence of a `data` property at the root ndoe of the parsed JSON object. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further vlaidated, but with the feedback that it is missing a data structure.

It then defines two of its own methods: a `recursion` method to determine the approach to recursively validating based on the value type of a property, and a recursively-called `validate` method for validating a property.

It ends with an initial call of the recursion method on the data structure, and a check for the return of a nonconformance error detected during recursion.

```
const checkData = (object) => {

    const hasData = object.hasOwnProperty("data")
    if (!hasData) {
        return {
            valid: true,
            feedback: '"data" property not found at top level'
        }
    }

    const recursion = (input) => { ... }

    const validate = (input) => { ... }
                                
    const recursionError = recursion(object.data)
    if (recursionError != null) {
        return recursionError
    }

}
```

{"break":true}

The recursion method takes a property value and differentiates between values of type Array and Object. If the value is of type Array, it loops through each element and differentiates between elements of type Array and Object. If the element is of type Array it calls the recursion method, but if the element is of type Object it calls the validation method. If the value is of type Object it calls the validation method.

The purpose of this hierarchy is that only values of type Object can be validated as TXON structures, but arrayrised values are also looped over recursively to detect Objects. <p style="color">This approach is missing a recursive looping of the properties of an Object, as it only considers recursive looping of arrayrised values.</p>

```
const recursion = (input) => {

    const isArray = input instanceof Array
    if (isArray) {
        for (const element of input) {

            const isArray = element instanceof Array
            if (isArray) {
                const recursionError = recursion(element)
                if (recursionError != null) {
                    return recursionError
                }
            }

            const isObject = typeof element === "object"
            if (isObject) {
                const validateError = validate(element)
                if (validateError != null) {
                    return validateError
                }
            }
            
        }
    }

    const isObject = typeof input === "object"
    if (isObject) {
        const validateError = validate(input)
        if (validateError != null) {
            return validateError
        }
    }

}
```

{"break":true}

The validation method starts by checking if the object has a "type" property, as this is a reserved property name for TXON type instances. It then determines if the type is an extension, and if the type has been declared in the initialiser object.

```
const validate = (input) => {

    const hasType = input.hasOwnProperty("type")
    if (hasType) {

        var isTypeExtensionName
        var firstType
        const hasDot = input.type.includes(".")
        if (hasDot) {
            const hasSingleDot = input.type.split(".").length === 2
            firstType = input.type.split(".")[0]
            const secondType = input.type.split(".")[1]
            if (hasSingleDot) {
                const startsWithJSONType = JSONTypes.includes(firstType)
                const endsWithCustomType = !JSONTypes.includes(secondType)
                isTypeExtensionName = startsWithJSONType && endsWithCustomType
            }
        }

        const typeInitialised = object.init.hasOwnProperty(input.type)
        if (typeInitialised) { ... }

    }

}
```

<br>

A type declared and instantiated is considered initialised, and the validation proceeds to differentiate between type instances with and without a "values" property.

```
const typeInitialised = object.init.hasOwnProperty(input.type)
if (typeInitialised) {

    const hasValues = input.hasOwnProperty("values")

    if (!hasValues) { ... }

    if (hasValues) { ... }

}
```

{"break":true}

If the type instance does not have a "values" property, the validation loops through the instance properties instead, checking if all required properties have been instantiated. If the check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated but is missing a required property. If the check passes for all required properties, it proceeds to check the property values.

```
if (!hasValues) {

    for (const [name, value] of Object.entries(object.init[input.type])) {

        const isObject = typeof value === "object"
        if (isObject) {

            const inInstance = input.hasOwnProperty(name)
            const hasLocalDefault = object.init[input.type][name].hasOwnProperty("default")
            const hasSharedDefault = object.init[input.type].hasOwnProperty("default")

            const notInstantiated = !inInstance && !hasLocalDefault && !inInstance && !hasSharedDefault
            if (notInstantiated) {
                return { valid: false, feedback: `instance of type "${input.type}" missing required property "${name}"`}
            }

            if (inInstance) { ... }

        }

    }

}
```

<br>

A property value is validated by first differentiating local, shared, and extension types. It then proceeds to check that the value matches the type declared for the property in the initialiser. If this check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated with a property value that does not conform. It then proceeds to check that the value is between a local or shared minimum and maximum, if any have been declared. If this check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated with a property value that is either below the minimum or above the maximum.

{"break":true}

```
if (inInstance) {

    const hasLocalType = object.init[input.type][name].hasOwnProperty("type")
    const hasSharedType = object.init[input.type].hasOwnProperty("type")

    var typeTarget
    if (hasLocalType) {
        typeTarget = object.init[input.type][name].type
    } else if (hasSharedType) {
        typeTarget = object.init[input.type].type
    } else if (isTypeExtensionName) {
        typeTarget = firstType
    } else {
        typeTarget = input.type
    }

    const typeMismatch = typeof input[name] != typeTarget
    if (typeMismatch) {
        return { valid: false, feedback: `instance of type "${input.type}" has property "${name}" of mismatched type "${typeof input[name]}"` }
    }

    const hasLocalMinimum = object.init[input.type][name].hasOwnProperty("minimum")
    const hasSharedMinimum = object.init[input.type].hasOwnProperty("minimum")

    if (hasLocalMinimum) {
        const belowMinimum = input[name] < object.init[input.type][name].minimum
        if (belowMinimum) {
            return { valid: false, feedback: `instance of type "${input.type}" has property "${name}" with value "${input[name]}" below minimum "${object.init[input.type][name].minimum}"` }
        }
    } else if (hasSharedMinimum) {
        const belowMinimum = input[name] < object.init[input.type].minimum
        if (belowMinimum) {
            return { valid: false, feedback: `instance of type "${input.type}" has property "${name}" with value "${input[name]}" below minimum "${object.init[input.type].minimum}"` }
        }
    }

    const hasLocalMaximum = object.init[input.type][name].hasOwnProperty("maximum")
    const hasSharedMaximum = object.init[input.type].hasOwnProperty("maximum")

    if (hasLocalMaximum) {
        const aboveMaximum = input[name] > object.init[input.type][name].maximum
        if (aboveMaximum) {
            return { valid: false, feedback: `instance of type "${input.type}" has property "${name}" with value "${input[name]}" above maximum "${object.init[input.type][name].maximum}"` }
        }
    } else if (hasSharedMaximum) {
        const aboveMaximum = input[name] > object.init[input.type].maximum
        if (aboveMaximum) {
            return { valid: false, feedback: `instance of type "${input.type}" has property "${name}" with value "${input[name]}" above maximum "${object.init[input.type].maximum}"` }
        }
    }

}
```

{"break":true}

If the type instance has a "values" property, validation proceeds if its value is of type Array. It then proceeds to loop through its elements, validating elements of type Object by looping through their properties. It checks if all required properties have been instantiated. If the check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated but is missing a required property. If the check passes for all required properties, it proceeds to check the property values.

```
if (hasValues) {

    const isArray = input.values instanceof Array
    if (isArray) {
        
        for (const element of input.values) {

            const isObject = typeof element === "object"
            if (isObject) {

                for (const [name, value] of Object.entries(object.init[input.type])) {

                    const isObject = typeof value === "object"
                    if (isObject) {

                        const inInstance = element.hasOwnProperty(name)
                        const hasLocalDefault = object.init[input.type][name].hasOwnProperty("default")
                        const hasSharedDefault = object.init[input.type].hasOwnProperty("default")

                        const notInstantiated = !inInstance && !hasLocalDefault && !inInstance && !hasSharedDefault
                        if (notInstantiated) {
                            return { valid: false, feedback: `instance of type "${input.type}" missing required property "${name}"`}
                        }

                        if (inInstance) { ... }

                    }

                }

            }

        }

    }

}
```

{"break":true}

A property value is validated by first differentiating local, shared, and extension types. It then proceeds to check that the value matches the type declared for the property in the initialiser. If this check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated with a property value that does not conform. It then proceeds to check that the value is between a local or shared minimum and maximum, if any have been declared. If this check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated with a property value that is either below the minimum or above the maximum.

```
if (inInstance) {

    const hasLocalType = object.init[input.type][name].hasOwnProperty("type")
    const hasSharedType = object.init[input.type].hasOwnProperty("type")

    var typeTarget
    if (hasLocalType) {
        typeTarget = object.init[input.type][name].type
    } else if (hasSharedType) {
        typeTarget = object.init[input.type].type
    } else if (isTypeExtensionName) {
        typeTarget = firstType
    } else {
        typeTarget = input.type
    }

    const typeMismatch = typeof element[name] != typeTarget
    if (typeMismatch) {
        return { valid: false, feedback: `instance of type "${input.type}" has "values" array containing property "${name}" of mismatched type "${typeof element[name]}"` }
    }

    const hasLocalMinimum = object.init[input.type][name].hasOwnProperty("minimum")
    const hasSharedMinimum = object.init[input.type].hasOwnProperty("minimum")

    if (hasLocalMinimum) {
        const belowMinimum = element[name] < object.init[input.type][name].minimum
        if (belowMinimum) {
            return { valid: false, feedback: `instance of type "${input.type}" has "values" array containing property "${name}" with value "${element[name]}" below minimum "${object.init[input.type][name].minimum}"` }
        }
    } else if (hasSharedMinimum) {
        const belowMinimum = element[name] < object.init[input.type].minimum
        if (belowMinimum) {
            return { valid: false, feedback: `instance of type "${input.type}" has "values" array containing property "${name}" with value "${element[name]}" below minimum "${object.init[input.type].minimum}"` }
        }
    }
    
    const hasLocalMaximum = object.init[input.type][name].hasOwnProperty("maximum")
    const hasSharedMaximum = object.init[input.type].hasOwnProperty("maximum")

    if (hasLocalMaximum) {
        const aboveMaximum = element[name] > object.init[input.type][name].maximum
        if (aboveMaximum) {
            return { valid: false, feedback: `instance of type "${input.type}" has "values" array containing property "${name}" with value "${element[name]}" above maximum "${object.init[input.type][name].maximum}"` }
        }
    } else if (hasSharedMaximum) {
        const aboveMaximum = element[name] > object.init[input.type].maximum
        if (aboveMaximum) {
            return { valid: false, feedback: `instance of type "${input.type}" has "values" array containing property "${name}" with value "${element[name]}" above maximum "${object.init[input.type].maximum}"` }
        }
    }

}
```

{"break":true}