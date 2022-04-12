const TXON = {

    documentation: [
        "HOW TO USE:",
        "›\tValidate JSON:\t\tTXON.handshake(json)",
        "›\tValidate sample:\t\tTXON.handshake(TXON.sample)",
        "›\tValidate tests:\t\tTXON.tests.forEach(test => TXON.handshake(test))"
    ].join("\n"),

    handshake: (json) => {

        let object, initialiser, data
        let withExtendedType = []

        // check: parsing JSON to JS
        const hasJSON = true
        if (hasJSON) {
            object = JSON.parse(json)
        } else {
            return {
                result: false,
                feedback: "ERROR: could not parse JSON"
            }
        }

        // check: has .init prop
        const hasInit = object.hasOwnProperty("init")
        if (hasInit) {
            initialiser = object.init
        } else {
            return {
                result: false,
                feedback: "ERROR: .init property not found in JSON"
            }
        }

        // check: has .data prop
        const hasData = object.hasOwnProperty("data")
        if (hasData) {
            data = object.data
        } else {
            return {
                result: false,
                feedback: "ERROR: .data property not found in jSON"
            }
        }

        // check: .data contains object[s] conforming to extended type[s] defined in .init
        const getExtendedType = (property) => {
            if (typeof property === "object") {
                Object.values(property).forEach(n => getExtendedType(n))
            }
            if (typeof property === "array") {
                property.forEach(n => getExtendedType(n))
            }
            const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
            if (isExtendedType) {
                property.values.forEach(value => {
                    const objprops = Object.getOwnPropertyNames(value)
                    const initprops = Object.getOwnPropertyNames(initialiser[property.type])
                    const propsConform = objprops.toString() === initprops.toString() 
                    if (propsConform) {
                        objprops.forEach(prop => {
                            const inittype = initialiser[property.type][prop].type
                            const valuetype = typeof value[prop]
                            const typesConform = inittype === valuetype
                            if (typesConform) {
                                console.log( // remove
                                    `ERROR: value › ${value[prop]} ‹ does not conform to init type › ${initialiser[property.type][prop].type} ‹`
                                )
                            }
                            const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                            if (hasEnum) {
                                const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                                console.log(
                                    objenum.includes(value[prop])
                                )
                            }
        
                        })
                    }
                })
                withExtendedType.push(property)
            }
        }
        getExtendedType(data) // rewrite to be recursively created array rather than using .push()
        const hasExtendedType = withExtendedType.length
        console.log(
            withExtendedType,
            hasExtendedType
        )
        if (hasExtendedType) {
            // process extended objects?
        } else {
            return {
                result: true,
                feedback: "NOTE: .data property contains no extended type from .init"
            }
        }

        // all checks passed succesfully
        return {
            result: true,
            feedback: "SUCCESS: .data property conforms to .init property"
        }

        // --- OLD CODE ---

        /*

        const object = JSON.parse(json)
        const initialiser = object.init
        const data = object.data

        Object.values(data).forEach(prop => { // items

            console.log(
                initialiser.hasOwnProperty(prop.type) // .init has type "item"
            )

            prop.values.forEach(obj => {

                const objprops = Object.getOwnPropertyNames(obj)
                const initprops = Object.getOwnPropertyNames(initialiser[prop.type])

                console.log(
                    objprops.toString() === initprops.toString() // value obj has same properties as init obj definition
                )
                
                objprops.forEach(n => {

                    const inittype = initialiser[prop.type][n].type
                    const valuetype = typeof obj[n]

                    console.log(
                        inittype === valuetype
                    )

                    if (initialiser[prop.type][n].hasOwnProperty("enum")) {

                        const objenum = Object.getOwnPropertyNames(initialiser[prop.type][n].enum)

                        console.log(
                            objenum.includes(obj[n])
                        )

                    }

                })
            })

        })

        return true
        */

    },

    sample: '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',

    tests: [
        '...',      // parseable JSON
        '...',      // extended type in init
        '...',      // extended type not in init
        '...'       // extended type not in data
    ]

}