{"sec":"Experiment Setup"}

This section presents the conditions defined to determine the advantages and disadvantages of the proposed superset JSON format. I provide examples of data, code and infrastructure necessary to construct an environment wherein the TXON syntax and features can be tested.

The success of this experiment is measured by the reduction in lines of code necessary in guarding data validity through defensive mechanisms. The criteria for success with this project is a reduction of at least 10%.

The examples presented in this section represent fetched temperature measurements. This decision was taken because weather data has direction, spatial/geographical localisation, and various representational states, in addition to general relevance for server-driven applications.

<br>

---

<br>

{"sub":"Information"}

Data records information by structuring it for hierarchy and relativity. Directional data can be represented through a 1, 2 or 3-dimensional matrix, or mapped to an object or n-dimensional matrix of objects. This subsection presents various data structures and compares them for serialisation.

<br>

Objects from information -> serialisation -> deserialisation.

- Structure as Matrix vs Object (JS)
- Serialisation to JSON
- Parsing to Object (JS) vs Codable (S)

<br>

1-dimensional matrix

```
// hourly temperature on given day and location

temperatures = [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
```

<br>

2-dimensional matrix

```
// hourly temperature by day on given week and location

temperatures = [
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
]
```

<br>

3-dimensional matrix

```
// three weeks of hourly temperature by day on given week and location

temperatures = [
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ],
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ],
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ]
]
```

<br>

object of n-th dimensional matrix 

```
// n weeks of hourly temperature by day on given week and location

{
    temperatures: [
        [
            {
                day: "monday",
                temperatures: {
                    0: -1, 1: -1, 2: -2, 3: -2, 4: -1, 5: -1,
                    6: 0, 7: 0, 8: 1, 9: 2, 10: 4, 11: 4,
                    12: 5, 13: 5, 14: 6, 15: 7, 16: 8, 17: 8,
                    18: 7, 19: 5, 20: 4, 21: 3, 22: 1, 23: 0
                }
            },
            {
                day: "tuesday",
                temperatures: {
                    0: -1, 1: -1, 2: -2, 3: -2, 4: -1, 5: -1,
                    6: 0, 7: 0, 8: 1, 9: 2, 10: 4, 11: 4,
                    12: 5, 13: 5, 14: 6, 15: 7, 16: 8, 17: 8,
                    18: 7, 19: 5, 20: 4, 21: 3, 22: 1, 23: 0
                }
            }
            ...
        ],
        ...
    ]
}
```

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

- Syntax for extended type
- Syntax for type extension
- Validation library

<br>

Current syntax (JSON)

```
{
    "type": "date",
    "date": "28-10-05",
    "default": "00-00-00",
    "nullable": "false"
}
```

<br>

Non-readable syntax (XML-style)

```
{
    "type": "date",
    "date": "28-10-05",
    "default": "00-00-00",
    "nullable": "false"
}
```

<br>

Extended type declaration and conformance. The init property defines an extended type, that is how the type should be initialised. The data property defines values conforming to and initialising an extended type.

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

The txon.js library 'handshakes' a JSON file, validating conformance of extended types in its data property to declarations in its init property.

<br>

Handshaking consists of several steps...

```
const TXON = {

    handshake: (json) => {

        ...

    }

}
```

<br>

...

```
let object, initialiser, data
let error = []
```

<br>

...

```
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
```

<br>

Recursive...

```
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
```

<br>

...

```
// return: false, error || true
return error.length ? { result: false, error: error } : { result: true }
```

<br>