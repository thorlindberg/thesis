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

            const isObject = typeof initialiser[property] == "object"
            if (isObject) {

                // extended type
                const hasNoDot = !property.includes(".")
                if (hasNoDot) {

                    const JSONTypes = ["string", "number", "integer", "object", "array", "boolean", "null"]
                    const endsWithCustomType = !JSONTypes.includes(property)
                    if (endsWithCustomType) {

                        const hasType = property.hasOwnProperty("type")
                        if (hasType) {
                            
                            const JSONTypes = ["string", "number", "integer", "object", "array", "boolean", "null"]
                            const isJSONType = JSONTypes.includes(property.type)
                            if (isJSONType) {

                                // has default? -> conforms to type?
                                // has min? -> conforms to type?
                                // has max? -> conforms to type?

                                // has enum?
                                    // is array? (collection)
                                    // is object?
                                        // has default? -> conforms to type?
                                        // has min? -> conforms to type?
                                        // has max? -> conforms to type?

                            }

                        }

                    }

                }

                // type extension
                const hasDot = property.includes(".")
                if (hasDot) {

                    const hasSingleDot = property.split(".").length === 2
                    if (hasSingleDot) {

                        const JSONTypes = ["string", "number", "integer", "object", "array", "boolean", "null"]
                        const startsWithJSONType = JSONTypes.includes(property.split(".")[0])
                        const endsWithCustomType = !JSONTypes.includes(property.split(".")[1])
                        if (startsWithJSONType && endsWithCustomType) {
                            //
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
                        "type": "number",
                        "month": {
                            "min": 1,
                            "max": 12,
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
                            "min": 1,
                            "max": 12,
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
                            "min": 1,
                            "max": 12,
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
            "feedback": `instance of extended type "date" has property "month" of type "string" but requires type "number"`,
            "json": `{
                "init": {
                    "date": {
                        "type": "number",
                        "month": {
                            "min": 1,
                            "max": 12,
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
        },

        {
            "valid": false,
            "feedback": `instance of type extension "number.date" is missing required property "month"`,
            "json": `{
                "init": {
                    "number.date": {
                        "month": {
                            "min": 1,
                            "max": 12,
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
                            "min": 1,
                            "max": 12,
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
        
    ]

}

/*

// example: individual declaration and instantiation

{
    "init": {
        "date": {
            "month": {
                "type": "number",
                "min": 1,
                "max": 12,
                "default": 1
            },
            "day": {
                "type": "number",
                "min": 1,
                "max": 31
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
                "min": 1,
                "max": 12,
                "default": 1
            },
            "day": {
                "min": 1,
                "max": 31
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
            "min": 1,
            "max": 256,
            "default": "not found",
            "properties" : [
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
            "min": 1,
            "max": 256,
            "default": "not found",
            "properties" : [
                "firstname",
                "lastname"
            ],
            "age": {
                "type": "number",
                "min": 0,
                "max": 200,
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