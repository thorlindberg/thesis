**Non-conformance detection flow**

The *handshake* method takes an input, expected to be of type JSON String. Handshaking requires a String parameter and returns an Object with *valid* and optional *feedback* properties.

Before validating the contents of its input, the handshaking method defines its own properties and methods. Its peroperties consist of the parsed JSON Object and an array valid types in the JSON specification. Its methods consist of the three main / top-level steps in TXON validation:  checkJSON, checkInit, and checkData.

checkJSON implements a try-catch attempting to parse the input to JSON.

checkInit ensures that the parsed JSON contains an init property and attempts to detect an incorrect type declaration.

checkData ensures that the parsed JSON contains a data property and attempts to detect an incorrect type instance.

```
handshake: (input) => {

    // properties

    var object
    const JSONTypes = [
        "string", "integer", "number", "object", "array", "boolean", "null" 
    ]

    // methods

    const checkJSON = (input) => { ∙∙∙ }
    const checkInit = (object) => { ∙∙∙ }
    const checkData = (object) => { ∙∙∙ }

    // flow

    const jsonError = checkJSON(input)
    if (jsonError != null) { return jsonError }

    const initError = checkInit(object)
    if (initError != null) { return initError }

    const dataError = checkData(object)
    if (dataError != null) { return dataError }

    // all checks passed

    return { valid: true }

}
```

<br>

*Non-conformance* is defined as incorrect type declaration, incorrect type instantiation, or mismatch between the two.

Handshaking is structured to interrupt validation at the first sign of non-conformance, rather than collecting errors and returning them arraryised. This choice has little impact on small amounts of information with near-instantaneous parsing, but greatly improves usability and reduces validation times as received information scale up in size.

Alternatively, the method could asynchronously return errors as/if non-conformance is encountered. As the user is informed of an error, corrects the error, and re-calls the method, the advantage is that the user does not need to care about completion, and only needs to respond to errors. For large amounts of information, the re-call would without issue run in parallel with the initial call if the initial call has not yet completed.

Validation can throw errors with the type of Object. The *valid* property is of type Boolean, indicating success (true) or failure (false). The *feedback* property is of type String and describes the first encountered non-conformance issue.

```
{ "valid": true, "feedback": '"init" property not found at top level' }
```

{"break":true}

[ A PROCESS (3) CONSISTS OF STEPS (n). EACH PROCESS IS CHECKED FOR RETURN AFTER CALL. STEPS CAN HAVE RETURNS TOO ]

The validation process consists of steps. Each step corresponds to a feature from the proposed syntax, and can return its own descriptive error if non-conformance is encountered. In the case of non-conformance, the process will not continue with the next step if any, thus reducing unnecessary computation. If non-conformance is not encountered in any step, no error will be returned.

Developers may desire for validation to continue despite non-conformance, and can in this case utilise the syntax for default values. If non-conformance is encountered but a default is defined, the process will continue with the inserted default value.

The extensible nature of the proposed syntax necessitates that validation be performed recursively, so that developers do not have to re-architect their existing data structures. As a result, the following steps may appear repetitive and validation performance scales non-linearly with data size.

{"break":true}

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

{"break":true}

The second process consists of two main / top-level steps. The first step returns an error if the input of type Object does not have an init property.

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

<br>

The second step validates the type declarations in that init property, and consits of several smaller steps.

```
const checkInit = (object) => {

    ∙∙∙

    // check: type declaration
    for (const [name, value] of Object.entries(object.init)) {

        // value is of type Object
        const isObject = typeof value === "object"

        // name is extension
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

        // validate type declaration
        if (isObject) {

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

        }

    }

}
```

{"break":true}

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