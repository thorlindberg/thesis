const TXON = {

    docs: [
        "How to validate with TXON..."
    ].join("\n"),

    handshake: (json) => {

        let object, initialiser, data
        let error = []

        // check: parsing JSON to JS
        const hasJSON = true
        if (hasJSON) {
            object = JSON.parse(json)
        } else {
            error.push("ERROR: could not parse JSON")
            return { result: false, error: error }
        }

        // check: has .init prop
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            error.push("ERROR: .init property not found in JSON")
            return { result: false, error: error }
        }

        // check: has .data prop
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            error.push("ERROR: .data property not found in JSON")
            return { result: false, error: error }
        }

        // check: .data contains object[s] conforming to extended type[s] defined in .init
        const checkConformance = (property) => {
            if (typeof property === "object") {
                Object.values(property).forEach(n => checkConformance(n))
            }
            if (typeof property === "array") {
                property.forEach(n => checkConformance(n))
            }
            const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
            if (isExtendedType) {
                property.values.forEach(value => {
                    const objprops = Object.getOwnPropertyNames(value)
                    const initprops = Object.getOwnPropertyNames(initialiser[property.type])
                    const propsConform = objprops.toString() === initprops.toString() 
                    if (!propsConform) {
                        error.push(
                            `ERROR: properties of extended type do not conform to init. ${objprops} and ${initprops}`
                        )
                    } else {
                        objprops.forEach(prop => {
                            const valuetype = typeof value[prop]
                            const inittype = initialiser[property.type][prop].type
                            const typesConform = valuetype === inittype
                            if (!typesConform) {
                                error.push(
                                    `ERROR: value type does not conform to init. ${valuetype} and ${inittype}`
                                )
                            } else {
                                const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                                if (hasEnum) {
                                    const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                    const enumsConform = objenum.includes(value[prop])
                                    if (!enumsConform) {
                                        error.push(
                                            `ERROR: enum value does not conform to init. ${value[prop]} not in ${objenum}`
                                        )
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
        checkConformance(data)

        // return: false, error || true
        return error.length ? { result: false, error: error } : { result: true }

    },

    tests: [
        // parseable JSON
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // properties mismatch between data and init
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"product":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // type mismatch with property in extended type
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":12,"category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // value mismatch with enum
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"product"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // combined three errors above this
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"product":"Diet Coke (1.5L)","category":"largeDrink"},{"name":12,"category":"smallDrink"},{"name":"Olives","category":"product"}]}}}',
        // extended type in init and data
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // extended type not in init
        '{"init":{"product":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
        // extended type not in data
        '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"product","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',
    ]

}