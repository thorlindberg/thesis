const TXON = {

    docs: [
        "How to validate with TXON..."
    ].join("\n"),

    handshake: (json) => {

        let object, initialiser, data

        // check: parsing JSON to JS Object
        try {
            object = JSON.parse(json)
        } catch {
            return {
                valid: true,
                feedback: "could not parse JSON"
            }
        }

        // check: Object has "init" property
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return {
                valid: true,
                feedback: "init property not found"
            }
        }

        // check: Object has "data" property
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            return {
                valid: true,
                feedback: "data property not found"
            }
        }

        // check: type declaration
        for (var property of Object.getOwnPropertyNames(initialiser)) {

            const JSONTypes = ["string", "integer", "number", "object", "array", "boolean", "null"]

            // property value is of type Object
            const isObject = typeof initialiser[property] === "object"

            // name is extension
            var isTypeExtensionName
            var firstType
            const hasDot = property.includes(".")
            if (hasDot) {
                const hasSingleDot = property.split(".").length === 2
                firstType = property.split(".")[0]
                const secondType = property.split(".")[1]
                if (hasSingleDot) {
                    const startsWithJSONType = JSONTypes.includes(firstType)
                    const endsWithCustomType = !JSONTypes.includes(secondType)
                    isTypeExtensionName = startsWithJSONType && endsWithCustomType
                }
            }

            // validate type declaration
            if (isObject) {

                // property value has property type with value of JSON type
                const hasSharedType = initialiser[property].hasOwnProperty("type")
                if (hasSharedType) {

                    const propertyType = initialiser[property].type
                    const typeMatchesJSON = JSONTypes.includes(propertyType)
                    if (!typeMatchesJSON) {
                        return {
                            valid: true,
                            feedback: `type "${property}" has invalid shared JSON "type" declaration "${propertyType}"`
                        }
                    }

                    // property value has property default with value of type matching type property
                    const hasSharedDefault = initialiser[property].hasOwnProperty("default")
                    if (hasSharedDefault) {
                        const defaultType = typeof initialiser[property].default
                        const defaultMatchesType = defaultType === propertyType
                        if (!defaultMatchesType) {
                            return {
                                valid: true,
                                feedback: `type "${property}" has shared default of mismatched type "${defaultType}"`
                            }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minType = typeof initialiser[property].minimum
                        const minMatchesType = minType === propertyType
                        if (!minMatchesType) {
                            return { valid: true, feedback: `type "${property}" has shared minimum of mismatched type "${minType}"` }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxType = typeof initialiser[property].maximum
                        const maxMatchesType = maxType === propertyType
                        if (!maxMatchesType) {
                            return { valid: true, feedback: `type "${property}" has shared maximum of mismatched type "${maxType}"` }
                        }
                    }

                }

                if (isTypeExtensionName) {

                    // property value has property default with value of type matching type property
                    const hasSharedDefault = initialiser[property].hasOwnProperty("default")
                    if (hasSharedDefault) {
                        const defaultType = typeof initialiser[property].default
                        const defaultMatchesType = defaultType === firstType
                        if (!defaultMatchesType) {
                            return {
                                valid: true,
                                feedback: `extension "${property}" has shared default of mismatched type "${defaultType}"`
                            }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minType = typeof initialiser[property].minimum
                        const minMatchesType = minType === firstType
                        if (!minMatchesType) {
                            return {
                                valid: true,
                                feedback: `extension "${property}" has shared minimum of mismatched type "${minType}"`
                            }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxType = typeof initialiser[property].maximum
                        const maxMatchesType = maxType === firstType
                        if (!maxMatchesType) {
                            return {
                                valid: true,
                                feedback: `extension "${property}" has shared maximum of mismatched type "${maxType}"`
                            }
                        }
                    }

                }

                // loop through property names and find "case" array or case declaration
                for (var prop of Object.getOwnPropertyNames(initialiser[property])) {

                    // prop name is "case" and array and all strings
                    const isCaseName = prop === "case"
                    const isArray = initialiser[property][prop] instanceof Array
                    const isCase = isCaseName && isArray
                    if (isCase) {
                        const typesMatchString = initialiser[property][prop].filter(n => typeof n === "string").length === initialiser[property][prop].length
                        if (!typesMatchString) {
                            return {
                                valid: true,
                                feedback: `type "${property}" has case declaration array with invalid contents`
                            }
                        }
                    }

                    // prop is object
                    const isObject = typeof initialiser[property][prop] === "object"
                    if (isObject) {

                        var hasLocalJSON
                        const hasLocalType = initialiser[property][prop].hasOwnProperty("type")
                        if (hasLocalType) {
                            hasLocalJSON = JSONTypes.includes(initialiser[property][prop].type)
                        }

                        const hasDefault = initialiser[property][prop].hasOwnProperty("default")
                        if (hasDefault) {
                            const defaultType = typeof initialiser[property][prop].default
                            var typeMismatch
                            if (hasLocalJSON) {
                                typeMismatch = defaultType != initialiser[property][prop].type
                            } else if (isTypeExtensionName) {
                                typeMismatch = defaultType != firstType
                            } else {
                                typeMismatch = defaultType != initialiser[property].type
                            }
                            if (typeMismatch) {
                                return {
                                    valid: true,
                                    feedback: `type "${property}" has property "${prop}" with default of mismatched type "${defaultType}"`
                                }
                            }
                        }

                        const hasMinimum = initialiser[property][prop].hasOwnProperty("minimum")
                        if (hasMinimum) {
                            const minType = typeof initialiser[property][prop].minimum
                            var typeMismatch
                            if (hasLocalJSON) {
                                typeMismatch = minType != initialiser[property][prop].type
                            } else if (isTypeExtensionName) {
                                typeMismatch = minType != firstType
                            } else {
                                typeMismatch = minType != initialiser[property].type
                            }
                            if (typeMismatch) {
                                return {
                                    valid: true,
                                    feedback: `type "${property}" has property "${prop}" with minimum of mismatched type "${minType}"`
                                }
                            }
                        }

                        const hasMaximum = initialiser[property][prop].hasOwnProperty("maximum")
                        if (hasMaximum) {
                            const maxType = typeof initialiser[property][prop].maximum
                            var typeMismatch
                            if (hasLocalJSON) {
                                typeMismatch = maxType != initialiser[property][prop].type
                            } else if (isTypeExtensionName) {
                                typeMismatch = maxType != firstType
                            } else {
                                typeMismatch = maxType != initialiser[property].type
                            }
                            if (typeMismatch) {
                                return {
                                    valid: true,
                                    feedback: `type "${property}" has property "${prop}" with maximum of mismatched type "${maxType}"`
                                }
                            }
                        }
    
                    }
    
                }

            }

        }

        // check: type instantiation
        const recursion = (property) => {

            if (typeof property === "object") {
                Object.values(property).forEach(n => recursion(n))
            }
            if (typeof property === "array") {
                property.forEach(n => recursion(n))
            }

        }

        // recursion(data)

        // recursion(input)
            // is input instanceof "array"?
                // loop through elements
                    // is element instanceof "array"?
                        // recursion(element)
                    // is element typeof "object"?
                        // validate(element)
            // is input typeof "object"?
                // validate(input)

        // validate(input)
            // input has property "type"?
                // "type" name found in init?
                    // input has property "values"?
                        // loop through "values"
                            // is value typeof "object"?
                                // !!! value does not meet requirements (min, max, can default be inserted?)
                                    // return false
                    // input has no property "values"?
                        // loop through properties of input
                            // is property defined for extended type?
                                // !!! property does not meet requirements (type, min, max, can default be inserted?)
                                    // return false
        
        /*
        // check: data contains object[s] conforming to type[s] defined in init
        const conformance = (property) => {
            if (typeof property === "object") {
                Object.values(property).forEach(n => conformance(n))
            }
            if (typeof property === "array") {
                property.forEach(n => conformance(n))
            }
            const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
            if (isExtendedType) {
                property.values.forEach(value => {
                    const objprops = Object.getOwnPropertyNames(value)
                    const initprops = Object.getOwnPropertyNames(initialiser[property.type])
                    const propsConform = objprops.toString() === initprops.toString() 
                    if (!propsConform) {
                        return { valid: false, feedback: `properties of type do not conform to init. ${objprops} and ${initprops}` }
                    } else {
                        objprops.forEach(prop => {
                            const valuetype = typeof value[prop]
                            const inittype = initialiser[property.type][prop].type
                            const typesConform = valuetype === inittype
                            if (!typesConform) {
                                return { valid: false, feedback: `value type does not conform to init. ${valuetype} and ${inittype}` }
                            } else {
                                const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                                if (hasEnum) {
                                    const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                    const enumsConform = objenum.includes(value[prop])
                                    if (!enumsConform) {
                                        return { valid: false, feedback: `enum value does not conform to init. ${value[prop]} not in ${objenum}` }
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
        conformance(data)
        */

        // all checks passed
        return {
            valid: true,
            feedback: "all checks passed"
        }

    },

    tests: [

        // initialisation<shared> -> true

        {
            "valid": true,
            "feedback": 'type "date" has invalid shared JSON "type" declaration "double"',
            "json": `{
                "init": {
                    "date": {
                        "type": "double"
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has shared default of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": "10"
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has shared minimum of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": "1"
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has shared maximum of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": "15"
                    }
                },
                "data": []
            }`
        },

        // initialisation<isTypeExtensionName> -> true

        {
            "valid": true,
            "feedback": 'extension "number.date" has shared default of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": "10"
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'extension "number.date" has shared minimum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": "5"
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'extension "number.date" has shared maximum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": "15"
                    }
                },
                "data": []
            }`
        },

        // initialisation<Object.getOwnPropertyNames(property)> -> true

        {
            "valid": true,
            "feedback": 'type "number.date" has case declaration array with invalid contents',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "case": [
                            100
                        ]
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month"" with default of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": "8"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month" with minimum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": 8,
                            "minimum": "1"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month" with maximum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": 8,
                            "minimum": 1,
                            "maximum": "12"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month" with default of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": "8"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month" with minimum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": "1"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "number.date" has property "month" with maximum of mismatched type "string"',
            "json": `{
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": 1,
                            "maximum": "12"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has property "month" with default of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": "8"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has property "month" with minimum of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": "1"
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": 'type "date" has property "month" with maximum of mismatched type "string"',
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": 1,
                            "maximum": "12"
                        }
                    }
                },
                "data": []
            }`
        },

        // returns true

        /*

        {
            "valid": true,
            "feedback": "init property not found",
            "json": `{
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": "data property not found",
            "json": `{
                "init": {}
            }`
        },

        {
            "valid": true,
            "feedback": `type "date" declared but not instantiated`,
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": `type "date" intantiated but not declared`,
            "json": `{
                "init": {},
                "data": [
                    {
                        "type": "date",
                        "month": 4
                    }
                ]
            }`
        },

        {
            "valid": true,
            "feedback": `extension "number.date" declared but not instantiated`,
            "json": `{
                "init": {
                    "number.date": {
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": []
            }`
        },

        {
            "valid": true,
            "feedback": `extension "number.date" instantaited but not declared`,
            "json": `{
                "init": {},
                "data": [
                    {
                        "type": "number.date",
                        "month": 4
                    }
                ]
            }`
        },

        // returns false

        {
            "valid": false,
            "feedback": `instance of type "date" is missing required property "month"`,
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "date"
                    }
                ]
            }`
        },

        {
            "valid": false,
            "feedback": `instance of type "date" has property "month" of type "string" but requires type "number"`,
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "date",
                        "month": "four"
                    }
                ]
            }`
        },

        {
            "valid": false,
            "feedback": `instance of extension "number.date" is missing required property "month"`,
            "json": `{
                "init": {
                    "number.date": {
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "number.date"
                    }
                ]
            }`
        },

        {
            "valid": false,
            "feedback": `instance of extension "number.date" has property "month" of mismatched type "string"`,
            "json": `{
                "init": {
                    "number.date": {
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "number.date",
                        "month": "four"
                    }
                ]
            }`
        }
        */
        
    ]

}

/*

// example: individual declaration and instantiation

{
    "init": {
        "date": {
            "month": {
                "type": "number",
                "minimum": 1,
                "maximum": 12,
                "default": 1
            },
            "day": {
                "type": "number",
                "minimum": 1,
                "maximum": 31
            },
            "year": {
                "type": "number",
                "default": null
            }
        }
    },
    "data": [
        {
            "type": "date",
            "month": 10,
            "day": 28,
            "year": 2005
        },
        {
            "type": "date",
            "day": 28
        },
        {
            "type": "date",
            "month": 10,
            "day": 28
        }
    ]
}

// example: shared declaration (type) and instantiation

{
    "init": {
        "date": {
            "type": "number",
            "month": {
                "minimum": 1,
                "maximum": 12,
                "default": 1
            },
            "day": {
                "minimum": 1,
                "maximum": 31
            },
            "year": {
                "default": null
            }
        }
    },
    "data": {
        "type": "date",
        "values": [
            {
                "month": 10,
                "day": 28,
                "year": 2005
            },
            {
                "day": 28
            },
            {
                "month": 10,
                "day": 28
            }
        ]
    }
}

// example: shared declaration (type, min, max, default) and instantiation

{
    "init": {
        "person": {
            "type": "string",
            "minimum": 1,
            "maximum": 256,
            "default": "not found",
            "case" : [
                "firstname",
                "lastname"
            ]
        }
    },
    "data": {
        "type": "person",
        "values": [
            {
                "firstname": "thor",
                "lastname": "lindberg"
            }
        ]
    }
}

// example: shared declaration with overrides (type, min, max, default) and instantiation

{
    "init": {
        "person": {
            "type": "string",
            "minimum": 1,
            "maximum": 256,
            "default": "not found",
            "case" : [
                "firstname",
                "lastname"
            ],
            "age": {
                "type": "number",
                "minimum": 0,
                "maximum": 200,
                "default": null
            }
        }
    },
    "data": {
        "type": "person",
        "values": [
            {
                "firstname": "thor",
                "lastname": "lindberg",
                "age": 25
            },
            {
                "firstname": "thor",
                "lastname": "lindberg"
            },
            {
                "age": 25
            }
        ]
    }
}

*/