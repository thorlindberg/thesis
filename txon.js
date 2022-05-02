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
        for (const [name, value] of Object.entries(initialiser)) {

            const JSONTypes = ["string", "integer", "number", "object", "array", "boolean", "null"]

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

        // ADD TYPE EXTENSION SUPPORT TO BELOW. THIS MEANS INFERRING TYPE FROM TYPE VALUE [0]
        // validate(input)
            // input has property "type"?
                // "type" name found in init?
                    // input has property "values"?
                        // loop through "values"
                            // is value typeof "object"?
                                // property value does not meet shared default (if any)?
                                    // return false
                                // property value does not meet shared min (if any)?
                                    // return false
                                // property value does not meet shared max (if any)?
                                    // return false
                                // property value does not meet local default (if any)?
                                    // return false
                                // property value does not meet local min (if any)?
                                    // return false
                                // property value does not meet local max (if any)?
                                    // return false
                    // input has no property "values"?
                        // loop through properties of input
                            // is property defined from extended type?
                                // property have value of incorrect type?
                                    // return false
                                // property value does not meet shared default (if any)?
                                    // return false
                                // property value does not meet shared min (if any)?
                                    // return false
                                // property value does not meet shared max (if any)?
                                    // return false
                                // property value does not meet local default (if any)?
                                    // return false
                                // property value does not meet local min (if any)?
                                    // return false
                                // property value does not meet local max (if any)?
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
                            const valuetype = typeof propValue
                            const inittype = initialiser[property.type][prop].type
                            const typesConform = valuetype === inittype
                            if (!typesConform) {
                                return { valid: false, feedback: `value type does not conform to init. ${valuetype} and ${inittype}` }
                            } else {
                                const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                                if (hasEnum) {
                                    const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                    const enumsConform = objenum.includes(propValue)
                                    if (!enumsConform) {
                                        return { valid: false, feedback: `enum value does not conform to init. ${propValue} not in ${objenum}` }
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