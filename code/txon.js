const TXON = {

    // return true | false == .data validated by .init
    handshake: (json) => {

        // find property with .type in initialiser
        // validate values based on init contract

        const object = JSON.parse(json)
        const initialiser = object.init
        const data = object.data
        var result = []
        var error = ""

        Object.values(data).forEach(prop => { // items

            result.push(
                initialiser.hasOwnProperty(prop.type) // .init has type "item"
            )

            prop.values.forEach(obj => {

                const objprops = Object.getOwnPropertyNames(obj)
                const initprops = Object.getOwnPropertyNames(initialiser[prop.type])

                result.push(
                    objprops.toString() === initprops.toString() // value obj has same properties as init obj definition
                )
                
                objprops.forEach(n => {

                    const inittype = initialiser[prop.type][n].type
                    const valuetype = typeof obj[n]

                    result.push(
                        inittype === valuetype
                    )

                    if (initialiser[prop.type][n].hasOwnProperty("enum")) {

                        const objenum = Object.getOwnPropertyNames(initialiser[prop.type][n].enum)

                        result.push(
                            objenum.includes(obj[n])
                        )

                    }

                })
            })

        })

        return [!result.includes(false), error]

    },

    // sample JSON file
    sample: '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"Diet Coke (1.5L)","category":"largeDrink"},{"name":"Fanta (0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',

}