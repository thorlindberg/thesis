const TXON = {

    // return true | false == .data validated by .init
    handshake: (json) => {

        const obj = JSON.parse(json)
        const contract = obj.init
        const data = obj.data

        Object.values(data).forEach(prop => {
            if (contract.hasOwnProperty(prop.type)) { // .init has type "item"
                prop.values.forEach(val => {
                    /*
                    console.log(
                        Object.getOwnPropertyNames(contract[prop.type]),
                        Object.getOwnPropertyNames(val)
                    )
                    Object.getOwnPropertyNames(val).forEach(c => {
                        console.log(c)
                    })
                    */
                    console.log(Object.getOwnPropertyNames(val))
                    console.log(Object.getOwnPropertyNames(contract[prop.type]))
                })
            }
        })

        return true

    },

    // sample TX/JSON file
    sample: '{"init":{"item":{"name":{"type":"string"},"category":{"type":"string","enum":{"largeDrink":"🍺","smallDrink":"🥤","plant":"🌱"}}}},"data":{"items":{"type":"item","values":[{"name":"DietCoke(1.5L)","category":"largeDrink"},{"name":"Fanta(0.5L)","category":"smallDrink"},{"name":"Olives","category":"plant"}]}}}',

}