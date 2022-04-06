{"sec":"Experiment Setup"}

This section presents the conditions defined to determine the advantages and disadvantages of the proposed superset JSON format. I provide examples of data, code and infrastructure necessary to construct an environment wherein the TXON syntax and features can be tested.

The success of this experiment is measured by the reduction in lines of code necessary in guarding data validity through defensive mechanisms. The criteria for success with this project is a reduction of at least 10%.

<br>

---

<br>

{"sub":"Information"}

2D matrix -> Objects -> Data structure?
Objects from information -> serialisation -> deserialisation.

<br>

- Structure as Matrix vs Object (JS)
- Serialisation to JSON
- Parsing to Object (JS) vs Codable (S)

<br>

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

<br>

---

<br>

{"sub":"Guarding"}

<br>

- Defensive mechanisms
- Validation of types
- Casting in languages

<br>

```
foo = Int(12)
```

<br>

---

<br>

{"sub":"Proposal"}

<br>

- Format with JSON
- Syntax for enums
- Translation layer

<br>

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

The txon.min.js library can 'handshake' and 'initialise' TXON objects.

<br>

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

<br>

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