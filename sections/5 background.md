{"sec":"Background"}

In this project I've chosen to collaborate with a company that specialises in native mobile application development. Their identity is kept anonymous, so rather than include confidential data or code samples, I have chosen to derive generic examples from the material they have provided me.

This company holds a unique perspective relative to the landscape of software development in Copenhagen, where return on investment (ROI) in my optics is valued above quality. Rather than take the typical multi-platform approach, using a platform-neutral framework like _React Native_, they maintain independent development teams for each platform, and they work exclusively with native code. They maintain an Android team utilising _Flutter_ and an iOS team utilising _Swift_. This nets them hardware efficiency and performance advantages, at the cost of operating and aligning two parallel developer teams working on the same projects.

In the following I illustrate the relationship between this company (_development company_) and their partners. This serves as a starting point for deducing which perspectives are held on working with data.

{"sub":"Organisation"}

As seen in {"ref":"organisation"}, there are two identifiable hierarchies that form a relationship between case partner and development. The top half of this diagram flows from partner to a formulated case. The bottom half of this diagram flows from developer to a product delivery.

{"fig":"organisation","url":"./figures/organisation.png","caption":"Hierarchical and structural relationship between development company and case partners.","width":"100%"}
The structure of the partner company informs how they formulate the case offered to the developers. They are also responsible for maintenance of a back-end, delivering customer data to the client developed in the delivery.

The structure of the development company informs how they plan and execute on a case. They are not responsible for the back-end, and thus have to negotiate infrastructure plans and changes with their partners. This presents challenges to their autonomy, hierarchy and responsibilities.

{"sub":"Source material"}

...

<br>

---

<br>

Information

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

---

<br>

{"sub":"Developer perspectives"}

This section presents the personas derived from interviews with each development team at the company, for the purpose of taking value-oriented design decisions derived from their perspectives. As these employees are coworkers, their perspectives are grounded in shared experiences, yet their unique deviations highlight how serialised data has varying implications on work practices.

{"break":true}