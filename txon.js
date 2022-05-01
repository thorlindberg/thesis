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
            return { valid: true, feedback: "could not parse JSON" }
        }

        // check: Object has "init" property
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return { valid: true, feedback: "init property not found" }
        }

        // check: Object has "data" property
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

        // check: type-extensibility is correctly initialised
        for (var property of Object.getOwnPropertyNames(initialiser)) {

            const JSONTypes = ["string", "integer", "number", "object", "array", "boolean", "null"]

            // property value is of type Object
            const isObject = typeof initialiser[property] === "object"

            // name is type extension
            var isTypeExtensionName;
            var firstType;
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
                        return { valid: true, feedback: `extended type "${property}" has invalid shared JSON "type" declaration "${propertyType}"` }
                    }

                    // property value has property default with value of type matching type property
                    const hasSharedDefault = initialiser[property].hasOwnProperty("default")
                    if (hasSharedDefault) {
                        const defaultType = typeof initialiser[property].default
                        const defaultMatchesType = defaultType === propertyType
                        if (!defaultMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared default of mismatched type "${defaultType}"` }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minType = typeof initialiser[property].minimum
                        const minMatchesType = minType === propertyType
                        if (!minMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared minimum of mismatched type "${minType}"` }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxType = typeof initialiser[property].maximum
                        const maxMatchesType = maxType === propertyType
                        if (!maxMatchesType) {
                            return { valid: true, feedback: `extended type "${property}" has shared maximum of mismatched type "${maxType}"` }
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
                            return { valid: true, feedback: `type extension "${property}" has shared default of mismatched type "${defaultType}"` }
                        }
                    }

                    // property value has property minimum with value of type matching type property
                    const hasSharedMinimum = initialiser[property].hasOwnProperty("minimum")
                    if (hasSharedMinimum) {
                        const minType = typeof initialiser[property].minimum
                        const minMatchesType = minType === firstType
                        if (!minMatchesType) {
                            return { valid: true, feedback: `type extension "${property}" has shared minimum of mismatched type "${minType}"` }
                        }
                    }

                    // property value has property maximum with value of type matching type property
                    const hasSharedMaximum = initialiser[property].hasOwnProperty("maximum")
                    if (hasSharedMaximum) {
                        const maxType = typeof initialiser[property].maximum
                        const maxMatchesType = maxType === firstType
                        if (!maxMatchesType) {
                            return { valid: true, feedback: `type extension "${property}" has shared maximum of mismatched type "${maxType}"` }
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

        // initialisation<shared> -> true

        {
            "valid": true,
            "feedback": 'extended type "date" has invalid shared JSON "type" declaration "double"',
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
            "feedback": 'extended type "date" has shared default of mismatched type "string"',
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
            "feedback": 'extended type "date" has shared minimum of mismatched type "string"',
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
            "feedback": 'extended type "date" has shared maximum of mismatched type "string"',
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
            "feedback": 'type extension "number.date" has shared default of mismatched type "string"',
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
            "feedback": 'type extension "number.date" has shared minimum of mismatched type "string"',
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
            "feedback": 'type extension "number.date" has shared maximum of mismatched type "string"',
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

        {},

        /*

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
            "feedback": `type extension "number.date" declared but not instantiated`,
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
            "feedback": `type extension "number.date" instantaited but not declared`,
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
            "feedback": `instance of extended type "date" is missing required property "month"`,
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
            "feedback": `instance of extended type "date" has property "month" of type "string" but requires type "number"`,
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
            "feedback": `instance of type extension "number.date" is missing required property "month"`,
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
            "feedback": `instance of type extension "number.date" has property "month" of mismatched type "string"`,
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