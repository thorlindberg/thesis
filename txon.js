const TXON = {

    docs: [
        "How to validate with TXON..."
    ].join("\n"),

    handshake: (json) => {

        let object, initialiser, data

        // check: parsing JSON to JS
        const hasJSON = true
        if (hasJSON) {
            object = JSON.parse(json)
        } else {
            return { result: false, feedback: "could not parse JSON" }
        }

        // check: has .init prop
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return { result: false, feedback: "init property not found in JSON" }
        }

        // check: has .data prop
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            return { result: false, feedback: "data property not found in JSON" }
        }

        // check: .data contains object[s] conforming to extended type[s] defined in .init
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
                        return { result: false, feedback: `properties of extended type do not conform to init. ${objprops} and ${initprops}` }
                    } else {
                        objprops.forEach(prop => {
                            const valuetype = typeof value[prop]
                            const inittype = initialiser[property.type][prop].type
                            const typesConform = valuetype === inittype
                            if (!typesConform) {
                                return { result: false, feedback: `value type does not conform to init. ${valuetype} and ${inittype}` }
                            } else {
                                const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                                if (hasEnum) {
                                    const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                    const enumsConform = objenum.includes(value[prop])
                                    if (!enumsConform) {
                                        return { result: false, feedback: `enum value does not conform to init. ${value[prop]} not in ${objenum}` }
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
        conformance(data)

        // all checks passed
        return { result: true, feedback: "all checks passed succesfully" }

    },

    tests: [

        {
            "result": Boolean,
            "feedback": String,
            "json": `{
                ...
            }`
        },

        {
            "result": true,
            "feedback": "init property not found",
            "json": `{
                "data": []
            }`
        },

        {
            "result": true,
            "feedback": "data property not found",
            "json": `{
                "init": {}
            }`
        },

        {
            "result": true,
            "feedback": "extended type not instantiated",
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
            "result": true,
            "feedback": "extended type not declared",
            "json": `{
                "init": {},
                "data": [
                    {
                        "type": "number.date",
                        "month": 4
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