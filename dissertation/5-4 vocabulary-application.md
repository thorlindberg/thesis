{"sub":"Data in Applications and Programming Languages"}

Text

<br>

**(a) Swift Enumeration Structure**

Text

<br>

**(b) Swift Codable Protocol**

Text

{"break":true}

--------------------------- OLD TEXT BELOW ---------------------------

<br>

Information

Data records information by structuring it for hierarchy and relativity. Directional data can be represented through a 1, 2 or 3-dimensional matrix, or mapped to an object or n-dimensional matrix of objects. This section presents various data structures and compares them for serialisation.

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

Guarding

<br>

- Defensive mechanisms
- Validation of types
- Casting in languages

<br>

```
foo = Int(12)
```

<br>