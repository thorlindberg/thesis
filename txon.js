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
            return { result: false, error: "ERROR: could not parse JSON" }
        }

        // check: has .init prop
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return { result: false, error: "ERROR: .init property not found in JSON" }
        }

        // check: has .data prop
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            return { result: false, error: "ERROR: .data property not found in JSON" }
        }

        // check: .data contains object[s] conforming to extended type[s] defined in .init
        const validateConformance = (property) => {
            if (typeof property === "object") {
                Object.values(property).forEach(n => validateConformance(n))
            }
            if (typeof property === "array") {
                property.forEach(n => validateConformance(n))
            }
            const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
            if (isExtendedType) {
                property.values.forEach(value => {
                    const objprops = Object.getOwnPropertyNames(value)
                    const initprops = Object.getOwnPropertyNames(initialiser[property.type])
                    const propsConform = objprops.toString() === initprops.toString() 
                    if (!propsConform) {
                        return { result: false, error: `ERROR: properties of extended type do not conform to init. ${objprops} and ${initprops}` }
                    } else {
                        objprops.forEach(prop => {
                            const valuetype = typeof value[prop]
                            const inittype = initialiser[property.type][prop].type
                            const typesConform = valuetype === inittype
                            if (!typesConform) {
                                return { result: false, error: `ERROR: value type does not conform to init. ${valuetype} and ${inittype}` }
                            } else {
                                const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                                if (hasEnum) {
                                    const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                    const enumsConform = objenum.includes(value[prop])
                                    if (!enumsConform) {
                                        return { result: false, error: `ERROR: enum value does not conform to init. ${value[prop]} not in ${objenum}` }
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
        validateConformance(data)

        // all checks passed
        return { result: true, error: null }

    },

    tests: [

        // test: 
        ``,

        // --------- OLD TESTS BELOW ---------

        // test: parseable JSON
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant":"🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item",
                    "values": [
                        { "name": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives", "category": "plant" }
                    ]
                }
            }
        }`,

        // test: properties mismatch between data and init
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item",
                    "values": [
                        { "product": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": "Fanta (0.5L)","category": "smallDrink"},
                        { "name": "Olives", "category": "plant"}
                    ]
                }
            }
        }`,

        // test: type mismatch with property in extended type
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item", "values": [
                        { "name": 12, "category": "largeDrink" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives","category": "plant" }
                    ]
                }
            }
        }`,

        // test: value mismatch with enum
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item",
                    "values": [
                        { "name": "Diet Coke (1.5L)", "category": "product" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives","category": "plant" }
                    ]
                }
            }
        }`,

        // test: combined three errors above this
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item",
                    "values": [
                        { "product": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": 12, "category": "smallDrink" },
                        { "name": "Olives", "category": "product" }
                    ]
                }
            }
        }`,

        // test: extended type in init and data
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item", "values": [
                        { "name": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives", "category": "plant" }
                    ]
                }
            }
        }`,

        // test: extended type not in init
        `{
            "init": {
                "product": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "item", "values": [
                        { "name": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives", "category": "plant" }
                    ]
                }
            }
        }`,
            
        // test: extended type not in data
        `{
            "init": {
                "item": {
                    "name": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string",
                        "enum": {
                            "largeDrink": "🍺",
                            "smallDrink": "🥤",
                            "plant": "🌱"
                        }
                    }
                }
            },
            "data": {
                "items": {
                    "type": "product",
                    "values": [
                        { "name": "Diet Coke (1.5L)", "category": "largeDrink" },
                        { "name": "Fanta (0.5L)", "category": "smallDrink" },
                        { "name": "Olives", "category": "plant" }
                    ]
                }
            }
        }`
        
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