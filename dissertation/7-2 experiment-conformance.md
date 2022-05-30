{"sec":"Implementation of Type Conformance"}

In this section I present the implementation of the TXON syntax through the development of a JavaScript library. The purpose of this implementation is to apply its validation method to the constructed unit tests, and achieve the predefined feedback when an error is detected. This method can then be applied to real data structures utilising the same syntax as in the tests, and should return the same errors corresponding to the features of the validation.

<br>

{"sub":"The TXON.js validation library"}

A library is a collection of utilities that in combination achieve a shared goal. In this instance, the `TXON.js` library is instantiated as a JavaScript object and its method provide validation of a TXON String. In the following I present the features, intent and structure of my library. This library supports the following validation features, corresponding to the grammatical notation of the TXON format.

- Type declarations in the `initialiser property`.
- Type instances in the `data property`.

Users can declare their own extended types (e.g. "date"), or declare extensions of JSON types or extended types using a dot-syntax (e.g. "string.date" or "date.month"). `Extended types` are specified as enumerations and instantiated by associating data with the type. This is further presented in the syntax proposal. `Type extensions` allow you to inherit the requirements of an existing type, while extending it as a sub-type with an enumeration. This is further presented in the syntax proposal.

The TXON.js library `handshakes` a JSON String, validating conformance of its `data` property to extended type declarations from its `init` property. TXON is initialised as an Object providing a `docs method` `handshake method` and `tests property`.

Handshaking is structured to interrupt validation at the first sign of nonconformance, rather than collecting errors and returning them arraryised. `Nonconformance` is when a type has been declared and instantiated, but the instance does not match the specification of the type. This choice has little impact on small amounts of information with near-instantaneous parsing, but greatly improves usability and reduces validation times as received information scale up in size.

```
const TXON = {
    
    docs: [ ∙∙∙ ].join("\n"),
    tests: [ ∙∙∙ ],
    handshake: (input) => { ∙∙∙ }

}
```

{"break":true}

The `docs` property requires no input parameters and returns a String documenting the intended use of my library. This approach ensures that the code is documented as it is written, but it exists only at the top-level of the library rather than in individual components.

```
docs: [

    "How to validate with TXON",
    ...
    
].join("\n")
```

<br>

The `tests` property is of type Array\<Object> and is intended to demonstrate each syntactical feature of TXON being validated through the library. Each Object contains the intended result of the test (properties `valid`and `feedback`), as well as a sample data structure (`json`).

```
tests: [

    {
        "valid": true,
        "feedback": '"init" property not found at top level',
        "json": `{
            "data": [ ]
        }`
    },
    ...
    
]
```

<br>

Tests can be iterated through to validate both type declarations and conformance of instances, to demonstrate the resulting feedback when the respective error is found. This can be useful for people wanting to learn TXON, and writing tests was instrumental in developing the validation library.

```
TXON.tests.forEach(test => {
    
    const validation = TXON.handshake(test.json)
    const checksPassed = validation.valid && validation.feedback == null
    if (checksPassed) {
        console.log(true, "no feedback, all checks passed")
    } else {
        console.log(validation.valid, validation.feedback)
    }

})
```

{"break":true}

The `handshake()` method takes an input, expected to correspond to a JSON string. If all validation checks are passed without detecting nonconformance to types, then the resulting property will have no feedback property. Handshaking requires a String as input parameter, and returns an Object with `valid` and optional `feedback` properties. The `valid` property is of type Boolean, indicating success (true) or failure (false). The `feedback` property is of type String and describes the first encountered nonconformance issue. 

```
{ "valid": true, "feedback": '"init" property not found at top level' }
```

A TXON data structure can return `true` for property `valid` for other reasons, such as the lack of an initialiser, because while its contents may be correctly typed it is not a valid TXON structure. This allows developers to check if the property exists, to determine if validation was successful.

Before validating the contents of its input, the handshaking method defines its own properties and methods. Its properties consist of the parsed JSON Object and an array of valid types in the JSON specification. Its methods consist of the three requirements in validating a TXON data structure.

`checkJSON` implements a try-catch attempting to parse the input to JSON.

`checkInit` ensures that the parsed JSON contains an init property and attempts to detect an incorrect type declaration.

`checkData` ensures that the parsed JSON contains a data property and attempts to detect an incorrect type instance.

```
handshake: (input) => {

    var object
    const JSONTypes = [ "string", "integer", "number", "object", "array", "boolean", "null"  ]

    const checkJSON = (input) => { ... }
    const checkInit = (object) => { ... }
    const checkData = (object) => { ... }

    const jsonError = checkJSON(input)
    if (jsonError != null) { return jsonError }

    const initError = checkInit(object)
    if (initError != null) { return initError }

    const dataError = checkData(object)
    if (dataError != null) { return dataError }

    return { valid: true }

}
```

{"break":true}

{"sub":"checkJSON"}

The first validation method contains a `try-catch` to check that the input parameter is a String that can be parsed with the JavaScript built-in `JSON.parse()`method. If the try fails, the catch will return an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that it failed to parse.

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
        return { valid: true, feedback: `type "${name}" has invalid shared JSON "type" declaration "${propertyType}"` }
    }

    const hasSharedDefault = value.hasOwnProperty("default")
    if (hasSharedDefault) {
        const defaultType = typeof value.default
        const defaultMatchesType = defaultType === propertyType
        if (!defaultMatchesType) {
            return { valid: true, feedback: `type "${name}" has shared default of mismatched type "${defaultType}"` }
        }
    }

    const hasSharedMinimum = value.hasOwnProperty("minimum")
    if (hasSharedMinimum) {
        const minType = typeof value.minimum
        const minMatchesType = minType === propertyType
        if (!minMatchesType) {
            return { valid: true, feedback: `type "${name}" has shared minimum of mismatched type "${minType}"` }
        }
    }

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

{"sub":"checkData"}

The third validation method has to accommodate any and all data structures considered valid in the JSON specification. As such the validation must be executed recursively for every nested node in the structure, and it must be applied extensively by only validating data that was intended to be typed with TXON.

It starts with a check for the existence of a `data` property at the root node of the parsed JSON object. If the check fails it returns an Object that indicates the data structure is valid as it cannot be further validated, but with the feedback that it is missing a data structure.

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

If the type instance does not have a `values` property, the validation loops through the instance properties instead, checking if all required properties have been instantiated. If the check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type was instantiated but is missing a required property. If the check passes for all required properties, it proceeds to check the property values.

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

If the type instance has a `values` property, validation proceeds if its value is of type Array. It then proceeds to loop through its elements, validating elements of type Object by looping through their properties. It checks if all required properties have been instantiated. If the check fails it returns an Object that indicates the data structure is invalid, with the feedback that a type instance is missing a required property. If the check passes for required properties it proceeds to check arrayrised values.

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