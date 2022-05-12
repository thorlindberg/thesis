{"sub":"checkData"}

The third process

```
const checkData = (object) => {

    const hasData = object.hasOwnProperty("data")
    if (!hasData) {
        return {
            valid: true,
            feedback: '"data" property not found at top level'
        }
    }

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
            if (typeInitialised) {

                const hasValues = input.hasOwnProperty("values")

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

                            if (inInstance) {

                                // type

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

                                // minimum

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

                                // maximum

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

                        }

                    }

                }

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

                                        if (inInstance) {

                                            // type

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

                                            // minimum

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

                                            // maximum

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

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    }
                                
    const recursionError = recursion(object.data)
    if (recursionError != null) {
        return recursionError
    }

}
```

{"break":true}