function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const TXON = {

    handshake: (json) => {

        // find property with .type in initialiser
        // validate values based on init contract

        let object, initialiser, data

        // check: parsing JSON to JS
        if (true) {
            object = JSON.parse(json)
        } else {
            return { result: false, error: "ERROR: could not parse JSON" }
        }

        // check: has .init prop
        if (object.hasOwnProperty("init")) {
            initialiser = object.init
        } else {
            return { result: false, error: "ERROR: .init property not found in JSON" }
        }

        // check: has .data prop
        if (object.hasOwnProperty("data")) {
            data = object.data
        } else {
            return { result: false, error: "ERROR: .data property not found in jSON" }
        }

        // check: data contains object with type defined in init
        // resource: https://stackoverflow.com/a/65488445/15072454
        const hasExtendedType = () => {
            // Object.values(data).filter(value => initialiser.hasOwnProperty(value.type))
        }
        if (hasExtendedType) {
            // extended types exist, create array of objects with extended type?
        } else {
            return { result: false, error: "ERROR: .data property contains no extended type from .init" }
        }

        return { result: true }

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