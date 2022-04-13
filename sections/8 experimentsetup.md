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

This subsection constitutes my proposal for an extensible superset format, and presents:

- Syntax for extended types
- Syntax for type extensions
- Validation library and tests
- Implementation and evaluation strategy

<br>

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types: *string, number, object, array, boolean, and null*. It explicitly precludes the types: *function, date, and undefined*. A JSON object is represented as a string of curly brackets with properties inside.

```
{
    "date": "28-10-2005"
}
```

<br>

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explictly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{
    "type": "string",
    "date": "28-10-2005"
}
```

<br>

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A date property with a string-value could instead be represented as an object with properties for month, day, and year. Representing these properties with integer-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of integers.

As evidenced, embedding these restrictions in the data results in more specification properties than useful data. As the amount of information scales linearly, so too does the restrictions, while increasing the chance of syntax errors.

```
{
    "type": "int",
    "date": {
        "month": 28,
        "day": 10,
        "year": 2005
    }
}
```
```
{
    "type": "int",
    "date": {
        "month": {
            "min": 1,
            "max": 31,
            "value": 28
        },
        "day": {
            "min": 1,
            "max": 31,
            "value": 10
        },
        "year": {
            "value": 2005
        }
    }
}
```

<br>

As it turns out, this is not a unique problem, and thus the solution already exists: enumerations. This user-defined data type allows us to declare a specification once, and then instantiate it without repetition of requirements.

As enum (enumeration) is not a type allowed in the JSON format, I have chosen to leverage existing JSON types to construct an enum syntax. This decision informs the phrasing of TXON as an optional extension that could be ignored by JSON parsers, rather than an alternative format.

The enumerated date type is its own object, declaring the required properties and conformance instructions for property values. Notably these instructions do not have to be exhaustive, as properties can fit within strict value ranges or have no values at all (null). Instantiating a user-defined type is indifferent from providing the intended type as a string-value property, with the property name and value matching the corresponding specification.

```
{
    "type": "date",
    "enum": {
        "month": {
            "type": "int",
            "min": 1,
            "max": 12
        },
        "day": {
            "type": "int",
            "min": 1,
            "max": 31
        },
        "year": {
            "type": "int"
        }
    }
}
```
```
{
    "type": "date",
    "month": 28,
    "day": 10,
    "year": 2005
}
```

<br>

It is common practice to nest JSON objects inside a top-level "data" property, to check if an API call has returned the intended result or thrown an error. Inspired by this practice, I have decided to require an "init" property for extended type declarations. The information property (data) can contain extended types, which must conform to the declaration specified in the initialisation property (init).

```
{
    "init": {
        "date": {
            "month": {
                "type": "int",
                "min": 1,
                "max": 12
            },
            "day": {
                "type": "int",
                "min": 1,
                "max": 31
            },
            "year": {
                "type": "int"
            }
        }
    },
    "data": {
        ...
    }
}
```

<br>

Instances of extended types are themselves extensible, meaning they must include the required properties, but are not limited to only enumerated properties.

There are two valid approaches to instantiating extended types:

*Array of objects*. Each object contains the extended type value and its required properties. The advantage of this approach is that each object contains an extended type, but this also increases the chance of syntax errors. This is ideal when an array contains multiple types.

*Object with array of objects*. The object contains the extended type value and a "values" array containing objects with required properties. The advantage of this approach is that the extended type is instantitated once, resulting in an inferred type for objects in "values". This is ideal when an array only contains one type.

```
// array of objects

"data": {
    "dates": [
        {
            "type": "date",
            "month": 28,
            "day": 10,
            "year": 2005
        }
    ]
}
```
```
// object with array of objects

"data": {
    "dates": {
        "type": "date",
        "values": [
            {
                "month": 28,
                "day": 10,
                "year": 2005
            }
        ]
    }
}
```

<br>

---

<br>

The txon.js library *handshakes* a JSON file, validating conformance of its "data" property to extended type declarations in its "init" property.

Handshaking is a property-function of TXON, and thus it is called as following.

```
const TXON = {
    handshake: (json) => { ... }
}
```
```
const validation = TXON.handshake('{ "init": ..., "data": ... }')
// validation.result == true || false
// validation.error == undefined || ["..."]
```

<br>

The function requires the parsing of a JSON object containing an "init" and "data" property, and will throw errors by storing them in a returned array **(will be changed to throwing 1 error when detected and immediately returning)**.

```
let object, initialiser, data
let error = []
```
```
// check: parsing JSON to JS
const hasJSON = true
if (hasJSON) {
    object = JSON.parse(json)
} else {
    error.push("ERROR: could not parse JSON")
    return { result: false, error: error }
}
```
```
// check: has .init prop
const hasInit = object.hasOwnProperty("init")
if (hasInit) {
    initialiser = object.init
} else {
    error.push("ERROR: .init property not found in JSON")
    return { result: false, error: error }
}
```
```
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

Objects with extended types can be instantiated at the top-level of the "data" property, or nested inside it, requiring their recursive detection.

If no extended types are instantiated, the return value will be true but throw an error noting this.

If extended types are instantiated but do not conform, the return value will be false and an error is thrown describing how and where the mismatch occoured during validation.

**(This code block is incomplete)**

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

Once validation is complete, a descripitive object is returned and can be interpreted by the recipient. **(will be changed to returning true, as this will not be reached if an error is returned during validation)**.

```
// return: false, error || true
return error.length ? { result: false, error: error } : { result: true }
```

<br>