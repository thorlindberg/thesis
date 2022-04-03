{"sec":"Experiment Setup"}

This section presents the conditions defined to determine the advantages and disadvantages of the TXON superset JSON format. It provides examples of data, code and infrastructure necessary to construct an environment wherein the TXON syntax and features can be tested.

Success is defined by the reduction in percentage of lines of defensive mechanisms code. In order to succeed, this project must reduce the defensive mechanisms from the implementation case by at least 10%.

<br>

{"sub":"Information"}

2D matrix -> Objects -> Data structure?

<br>

{"sub":"Serialisation"}

Objects from information -> serialisation -> deserialisation.

<br>

{"sub":"Transmission"}

...

```
...
```

<br>

{"sub":"Defensive mechanisms"}

...

```
...
```

<br>

{"sub":"Type-extensibility"}

JavaScript object

```
...
```

JavaScript enumeration

```
function Item(name, category) {

    const types = {
        undefined: "undefined",
        string: "string",
        number: "number",
        boolean: "boolean",
        object: "object",
        nil: "null"
    }

    this.name = new function() {
        this.type = types.string
        this.enum = null
        if (typeof name == this.type) {
            this.value = name
        } else {
            throw new TypeError(`type mismatch`)
        }
    }

    this.category = new function() {

        this.type = types.string
        this.enum = categories

        const hasProperty = this.enum.hasOwnProperty(category)
        const hasValue = Object.values(this.enum).includes(category)

        if (hasProperty) {
            this.value = this.enum[category]
        } else if (hasValue) {
            this.value = category
        } else {
            throw new Error(`not found in enum`)
        }

    }

}

const categories = {
    largeDrink: "🍺",
    smallDrink: "🥤",
    meat: "🥩",
    plant: "🌱",
    dairy: "🧀",
    cake: "🍪",
    dough: "🍞"
}

const itemsByKey = [
    new Item("Diet Coke (1.5L)", "largeDrink"),
    new Item("Fanta (0.5L)", "smallDrink"),
    new Item("Olives", "plant")
]

const itemsByValue = [
    new Item("Diet Coke (1.5L)", categories.largeDrink),
    new Item("Fanta (0.5L)", categories.smallDrink),
    new Item("Olives", categories.plant)
]
```

JSON object

```
...
```

TXON enumeration

```
{
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
                {
                    "name": "DietCoke(1.5L)",
                    "category": "largeDrink"
                },
                {
                    "name": "Fanta(0.5L)",
                    "category": "smallDrink"
                },
                {
                    "name": "Olives",
                    "category": "plant"
                }
            ]
        }
    }
}
```

<br>

{"sub":"Translation layer"}

The txon.min.js library can 'handshake' and 'initialise' TXON objects.

Handshaking...

```
const TXON = {
    handshake: (json) => {

        const obj = JSON.parse(json)
        const contract = obj.init
        const data = obj.data

        Object.values(data).forEach(prop => {
            if (contract.hasOwnProperty(prop.type)) { // .init has type "item"
                prop.values.forEach(val => {
                    console.log(
                        Object.getOwnPropertyNames(contract[prop.type]),
                        Object.getOwnPropertyNames(val)
                    )
                    Object.getOwnPropertyNames(val).forEach(c => {
                        console.log(c)
                    })
                })
            }
        })

        return true
    }
}
```

Initialising...

```
const TXON = {
    initialise: (json) => {
        const obj = JSON.parse(json)
        // init objs as JS objets, see enumJS
        return obj
    }
}
```

<br>