const TXON = {

    docs: [
        "How to validate with TXON..."
    ].join("\n"),

    handshake: (json) => {

        let object, initialiser, data

        // check: parsing JSON to JS Object
        const hasJSON = true
        if (hasJSON) {
            object = JSON.parse(json)
        } else {
            return { valid: true, feedback: "could not parse JSON" }
        }

        // check: Object has .init prop
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return { valid: true, feedback: "init property not found" }
        }

        // check: Object has .data prop
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            return { valid: true, feedback: "data property not found" }
        }

        // loop through initialiser and find type declaration
            // loop through data and find matching type instance
                    //  validate instance based on requirements declaration
                        // throw error if mismatch

        for (var property of Object.getOwnPropertyNames(initialiser)) {

            const JSONTypes = ["string", "integer", "integer", "object", "array", "boolean", "null"]

            // property value is of type Object
            const isObject = typeof initialiser[property] === "object"

            // name is type extension
            var isTypeExtensionName;
            const hasDot = property.includes(".")
            if (hasDot) {
                const hasSingleDot = property.split(".").length === 2
                const firstType = property.split(".")[0]
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

                    const typeMatchesJSON = JSONTypes.includes(initialiser[property].type)
                    if (!typeMatchesJSON) {
                        return { valid: true, feedback: `extended type "${property}" has invalid shared JSON "type" declaration ${initialiser[property].type}` }
                    }

                    // property value has property default with value of type matching type property
                    const hasSharedDefault = initialiser[property].hasOwnProperty("default")
                    if (hasSharedDefault) {
                        const defaultMatchesType = typeof initialiser[property].default != initialiser[property].type
                        if (!defaultMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared default of mismatched type ${typeof initialiser[property].default}` }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minMatchesType = typeof initialiser[property].minimum != initialiser[property].type
                        if (!minMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared minimum of mismatched type ${typeof initialiser[property].minimum}` }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxMatchesType = typeof initialiser[property].maximum != initialiser[property].type
                        if (!maxMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared maximum of mismatched type ${typeof initialiser[property].minimum}` }
                        }
                    }

                }

                if (isTypeExtensionName) {

                    // property value has property default with value of type matching type property
                    const hasSharedDefault = initialiser[property].hasOwnProperty("default")
                    if (hasSharedDefault) {
                        const defaultMatchesType = typeof initialiser[property].default != firstType
                        if (!defaultMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared default of mismatched type ${typeof initialiser[property].default}` }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minMatchesType = typeof initialiser[property].minimum != firstType
                        if (!minMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared minimum of mismatched type ${typeof initialiser[property].minimum}` }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxMatchesType = typeof initialiser[property].maximum != firstType
                        if (!maxMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared maximum of mismatched type ${typeof initialiser[property].minimum}` }
                        }
                    }

                }

                // loop through property names and find "case" array or case declaration
                for (var prop of Object.getOwnPropertyNames(property)) {

                    // prop name is "case" and array and all strings
                    const isCaseName = property === "case"
                    const isArray = typeof property[prop] === "array"
                    const isCase = isCaseName && isArray
                    if (isCase) {
                        const typesMatchString = property[prop].filter(n => typeof n === "string").length === property[prop].length;
                        if (!typesMatchString) {
                            return { valid: true, feedback: `extended type "${property}" has case declaration array with invalid contents` }
                        }
                    }

                    // prop is object
                    const isObject = typeof property[prop] === "object"
                    if (isObject) {

                        const hasLocalType = property[prop].hasOwnProperty("type")

                        if (hasLocalType) {
                            const isJSONType = JSONTypes.includes(property[prop].type)
                            if (isJSONType) {
                                const hasDefault = property[prop].hasOwnProperty("default")
                                if (hasDefault) {
                                    const typeMismatch = typeof property[prop].default != property[prop].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with default of mismatched type ${typeof initialiser[property].default}` }
                                    }
                                }
                                const hasMinimum = property[prop].hasOwnProperty("minimum")
                                if (hasMinimum) {
                                    const typeMismatch = typeof property[prop].minimum != property[prop].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with minimum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
                                const hasMaximum = property[prop].hasOwnProperty("maximum")
                                if (hasMaximum) {
                                    const typeMismatch = typeof property[prop].maximum != property[prop].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with maximum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
                            }
    
                        }
    
                        if (!hasLocalType) {

                            if (isTypeExtensionName) {

                                const hasDefault = property[prop].hasOwnProperty("default")
                                if (hasDefault) {
                                    const typeMismatch = typeof property[prop].default != firstType
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with default of mismatched type ${typeof initialiser[property].default}` }
                                    }
                                }
                                const hasMinimum = property[prop].hasOwnProperty("minimum")
                                if (hasMinimum) {
                                    const typeMismatch = typeof property[prop].minimum != firstType
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with minimum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
                                const hasMaximum = property[prop].hasOwnProperty("maximum")
                                if (hasMaximum) {
                                    const typeMismatch = typeof property[prop].maximum != firstType
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with maximum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
            
                            }

                            if (!isTypeExtensionName) {

                                const hasDefault = property[prop].hasOwnProperty("default")
                                if (hasDefault) {
                                    const typeMismatch = typeof property[prop].default != initialiser[property].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with default of mismatched type ${typeof initialiser[property].default}` }
                                    }
                                }
                                const hasMinimum = property[prop].hasOwnProperty("minimum")
                                if (hasMinimum) {
                                    const typeMismatch = typeof property[prop].minimum != initialiser[property].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with minimum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
                                const hasMaximum = property[prop].hasOwnProperty("maximum")
                                if (hasMaximum) {
                                    const typeMismatch = typeof property[prop].maximum != initialiser[property].type
                                    if (typeMismatch) {
                                        return { valid: true, feedback: `extended type "${property}" has prop ${prop} with maximum of mismatched type ${typeof initialiser[property].minimum}` }
                                    }
                                }
            
                            }
                            
                        }    
    
                    }
    
                }

            }

        }

        /*
        const recursion = (n) => {

        }

        // recursively checking nested data
        const conformance = (n) => {
            if (typeof n === "object") {
                Object.values(property).forEach(n => conformance(n))
            }
            if (typeof n === "array") {
                property.forEach(n => conformance(n))
            }
        }
        conformance(data)
        */

        /*
        // check: data contains object[s] conforming to extended type[s] defined in init
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
                        return { valid: false, feedback: `properties of extended type do not conform to init. ${objprops} and ${initprops}` }
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
        return { valid: true, feedback: "all checks passed succesfully" }

    },

    tests: [

        // returns true

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
            "feedback": `extended type "date" declared but not instantiated`,
            "json": `{
                "init": {
                    "date": {
                        "type": "integer",
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
            "feedback": `extended type "date" intantiated but not declared`,
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
            "feedback": `type extension "integer.date" declared but not instantiated`,
            "json": `{
                "init": {
                    "integer.date": {
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
            "feedback": `type extension "integer.date" instantaited but not declared`,
            "json": `{
                "init": {},
                "data": [
                    {
                        "type": "integer.date",
                        "month": 4
                    }
                ]
            }`
        },

        // returns false

        {
            "valid": false,
            "feedback": `instance of extended type "date" is missing required property "month"`,
            "json": `{
                "init": {
                    "date": {
                        "type": "integer",
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
            "feedback": `instance of extended type "date" has property "month" of type "string" but requires type "integer"`,
            "json": `{
                "init": {
                    "date": {
                        "type": "integer",
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
            "feedback": `instance of type extension "integer.date" is missing required property "month"`,
            "json": `{
                "init": {
                    "integer.date": {
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "integer.date"
                    }
                ]
            }`
        },

        {
            "valid": false,
            "feedback": `instance of type extension "integer.date" has property "month" of mismatched type "string"`,
            "json": `{
                "init": {
                    "integer.date": {
                        "month": {
                            "minimum": 1,
                            "maximum": 12,
                            "default": 1
                        }
                    }
                },
                "data": [
                    {
                        "type": "integer.date",
                        "month": "four"
                    }
                ]
            }`
        }
        
    ]

}

/*

// example: individual declaration and instantiation

{
    "init": {
        "date": {
            "month": {
                "type": "integer",
                "minimum": 1,
                "maximum": 12,
                "default": 1
            },
            "day": {
                "type": "integer",
                "minimum": 1,
                "maximum": 31
            },
            "year": {
                "type": "integer",
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
            "type": "integer",
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
                "type": "integer",
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