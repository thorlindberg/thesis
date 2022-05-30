{"sec":"Comparison of Formats and Validation"}

In this section I present a comparison of the data formatting and validation of `JSON` data structures with `TypeScript` code and `TXON` data structures with the `TXON.js` library. As TXON aims to provide typed JSON data and a generic validation process, it is ideal to compare it to an existing JSON data structure and corresponding validation of it with TypeScript. These can be compared on their typing and validation features, while considering readability of the resulting data structures.

A TXON data structure contains an initialiser and a data property, and as such the following results will compare the declaration of types in TypeScript and the initialiser, and then the instantiation of types in JSON and the data property. It is crucial to preface these results by reiterating that TXON is not final in its current implementation, but is rather a proposal presented for discussion.

<br>

{"sub":"Types from TypeScript to TXON"}

TypeScript provides extensible and explicit typing of JavaScript structures. Its extensible syntax means that structures like Objects become typed by adding type annotations and the "type" keyword. This also means that TypeScript code becomes valid JavaScript code by removing these annotations and the keyword. As TypeScript is a superset of JavaScript, and the JSON format is derived from JavaScript, a JSON data structure can be parsed and cast directly to a TypeScript structure. Through this process the properties of a JSON structure can be validated on their type based on the typed properties of the TypeScript structure. A property can be annotated with another typed structure, resulting in relational references between structures.

<!--
1. Translate statically typed objects to TXON type declarations.
-->

In the following is the typed objects declared in TypeScript for validating the sample data structure provided to me by the company I partnered with on this project. The main typed object is `Location` which has properties annotated with the types `Address` `Coordinates` `Localizable` `ChargePoint[]` and `Connector[]`.

```
type Location = {
    id: string
    locationId: string
    name: string
    address: Address
    coordinates: Coordinates
    imageUrl: string | null
    phoneNumber: string | null
    description: Localizable
    roamingPartner: string | null
    isRoaming: boolean
    isOpen24: boolean
    openingHours: Localizable
    chargePoints: ChargePoint[]
    isRemoteChargingSupported: boolean
    isFuture: boolean
}
```
```
type Address = {
    line1: string
    line2: string
}

type Coordinates = {
    lat: number
    lng: number
}

type Localizable =  {
    da: string | null
    en: string | null
}

type ChargePoint[] = {
    id: string
    type: ChargePointType
    connectors: Connector[]
}

type ChargePointType = string

type Connector[] = {
    id: string
    connectorNo: string
    displayId: string
    type: string
    kW: number
    speed: string
}
```

<br>

<!--
2. Transform JSON data structure by embedding TXON types in an initialiser property at its root node.

// some of this data has been modified because it did not match the type props by name :(
// .speed was made optional because it is missing from the data
-->

As seen in figure {"ref":"embedtypes"} these TypeScript types can be translated to TXON and embedded in the initialiser of a data structure. The TXON grammar does not support relational references within type declarations, but these types can be individually declared and then referenced in the hierarchy of the typed data structure. The TXON types derived from these TypeScript declarations have been slightly modified, as the TXON grammar does cannot declare a type value as an array of another type. Instead the TXON type declaration must be of type array and then another type must be declared, which can be referenced when arrayrising typed data.

{"break":true}

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "init": {
        "location": {
            "id": "string", "locationId": "string", "name": "string",
            "address": {
                "line1": "string", "line2": "string"
            },
            "coordinates": {
                "lat": "number", "lng": "number"
            },
            "imageUrl?": "string", "phoneNumber?": "string",
            "description": {
                "da?": "string", "en?": "string"
            },
            "roamingPartner?": "string", "isRoaming": "boolean", "isOpen24": "boolean",
            "openingHours": {
                "da?": "string", "en?": "string"
            },
            "chargePoints": [
                {
                    "id": "string",
                    "connectors": [
                        {
                            "id": "string", "connectorNo": "string", "displayId": "string",
                            "name": "string", "kW": "number", "speed?": "string"
                        }
                    ]
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": "boolean"
        }
    },
    "data": {}
}

@endjson
@enduml

{"fig":"embedtypes","caption":"TXON data structure with type declarations embedded in its initialiser."}

<!--
3. Transform JSON data structure by embedding its content in a data property at its root node.
-->
<!--
4. Translate objects in data property to type instances by extending with type references.
-->

With the type declarations moved from TypeScript to the TXON data structure, we can now embed the original JSON data structure in the data property of the TXON data structure. As seen in figure {"ref":"embeddedjson"} this structure does not contain any information on the intended value types for its properties.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "init": {},
    "data": {
        "address": "København, Blegdamsvej 9",
        "chargePoints": [
            {
                "connectors": [
                    {
                        "capacitykW": 43, "connectorId": "1", "typeId": 1, "typeName": "AC",
                        "variantName": "z"
                    },
                    {
                        "capacitykW": 50, "connectorId": "2", "typeId": 2, "typeName": "DC",
                        "variantName": "x"
                    }
                ],
                "id": "DKa100", "modelId": "a100", "modelName": "a"
            },
            {
                "connectors": [
                    {
                        "capacitykW": 43, "connectorId": "1", "typeId": 1, "typeName": "AC",
                        "variantName": "z"
                    },
                    {
                        "capacitykW": 50, "connectorId": "2", "typeId": 2, "typeName": "DC",
                        "variantName": "x"
                    }
                ],
                "id": "DKb200", "modelId": "b200", "modelName": "b"
            },
            {
                "connectors": [
                    {
                        "connectorId": "1", "typeId": 2, "typeName": "DC", "variantName": "y",
                        "capacitykW": 175
                    },
                    {
                        "connectorId": "2", "typeId": 2, "typeName": "DC", "variantName": "x",
                        "capacitykW": 175
                    }
                ],
                "id": "DKc300", "modelId": "c300", "modelName": "c"
            }
        ],
        "city": "København", "country": "DK", "houseNumber": "9", "id": 55,
        "isRoamingLocation": true, "isSemipublic": true, "isFuture": true,
        "latitude": 55.696914, "locationIdentity": "DKpartner", "longitude": 12.566042,
        "name": "København", "open24": false, "phoneNumber": "12345", "pictureUrl": "https://image.url",
        "postalCode": "2100", "roamingPartnerName": "DKpartner", "streetName": "Blegdamsvej"
    }
}

@endjson
@enduml

{"fig":"embeddedjson","caption":"TXON data structure with data contents derived from JSON data structure."}

{"break":true}

We can then extend the JSON data by adding explicit relational references to type names that we declared in the initialiser of the TXON structure. As seen in figure {"ref":"typedjson"} the resulting data structure required minimal transformation, and the information was only altered when a type required its value be split into multiple values.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "init": {},
    "data": {
        "location": {
            "type": "location",
            "id": "55", "locationId": "DKpartner", "name": "København",
            "address": {
                "line1": "København,", "line2": "Blegdamsvej 9"
            },
            "coordinates": {
                "lat": "55.696914", "lng": "12.566042"
            },
            "imageUrl?": "https://image.url", "phoneNumber?": "12345",
            "description": {
                "da?": "string", "en?": "string"
            },
            "roamingPartner?": "DKpartner", "isRoaming": true, "isOpen24": false,
            "openingHours": {
                "da?": "string", "en?": "string"
            },
            "chargePoints": [
                {
                    "connectors": [
                        {
                            "id": "z", "connectorNo": "1", "displayId": "1", "name": "AC", "kW": 43
                        },
                        {
                            "id": "x", "connectorNo": "2", "displayId": "2", "name": "DC", "kW": 50
                        }
                    ],
                    "id": "DKa100",
                    "modelId": "a100",
                    "modelName": "a"
                },
                {
                    "connectors": [
                        {
                            "id": "z", "connectorNo": "1", "displayId": "1", "name": "AC", "kW": 43
                        },
                        {
                            "id": "x", "connectorNo": "2", "displayId": "2", "name": "DC", "kW": 50
                        }
                    ],
                    "id": "DKb200",
                    "modelId": "b200",
                    "modelName": "b"
                },
                {
                    "connectors": [
                        {
                            "id": "y", "connectorNo": "1", "displayId": "2", "name": "DC", "kW": 175
                        },
                        {
                            "id": "x", "connectorNo": "1", "displayId": "2", "name": "DC", "kW": 175
                        }
                    ],
                    "id": "DKc300",
                    "modelId": "c300",
                    "modelName": "c"
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": true,
            "city": "København", "country": "DK", "isSemipublic": true, "postalCode": "2100"
        }
    }
}

@endjson
@enduml

{"fig":"typedjson","caption":"TXON data structure with typed data through type instances of relational references."}

With both types declared in the initialiser and instances of types initialised in the data property, we now have a complete TXON data structure. If we compare this resulting structure to the original TypeScript declarations and the original JSON data structure, there was not much necessity for their transformation.

As seen in figure {"ref":"txonstructure"} this representation is easier to cross-reference and thus debug, as everything is embedded into one structure.

[ Text ]

{"break":true}

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
    }
}
</style>

{
    "init": {
        "location": {
            "id": "string", "locationId": "string", "name": "string",
            "address": {
                "line1": "string", "line2": "string"
            },
            "coordinates": {
                "lat": "number", "lng": "number"
            },
            "imageUrl?": "string", "phoneNumber?": "string",
            "description": {
                "da?": "string", "en?": "string"
            },
            "roamingPartner?": "string", "isRoaming": "boolean", "isOpen24": "boolean",
            "openingHours": {
                "da?": "string", "en?": "string"
            },
            "chargePoints": [
                {
                    "id": "string",
                    "connectors": [
                        {
                            "id": "string", "connectorNo": "string", "displayId": "string",
                            "name": "string", "kW": "number", "speed?": "string"
                        }
                    ]
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": "boolean"
        }
    },
    "data": {
        "location": {
            "type": "location",
            "id": "55", "locationId": "DKpartner", "name": "København",
            "address": {
                "line1": "København,", "line2": "Blegdamsvej 9"
            },
            "coordinates": {
                "lat": "55.696914", "lng": "12.566042"
            },
            "imageUrl?": "https://image.url", "phoneNumber?": "12345",
            "description": {
                "da?": "string", "en?": "string"
            },
            "roamingPartner?": "DKpartner", "isRoaming": true, "isOpen24": false,
            "openingHours": {
                "da?": "string", "en?": "string"
            },
            "chargePoints": [
                {
                    "connectors": [
                        {
                            "id": "z", "connectorNo": "1", "displayId": "1", "name": "AC", "kW": 43
                        },
                        {
                            "id": "x", "connectorNo": "2", "displayId": "2", "name": "DC", "kW": 50
                        }
                    ],
                    "id": "DKa100",
                    "modelId": "a100",
                    "modelName": "a"
                },
                {
                    "connectors": [
                        {
                            "id": "z", "connectorNo": "1", "displayId": "1", "name": "AC", "kW": 43
                        },
                        {
                            "id": "x", "connectorNo": "2", "displayId": "2", "name": "DC", "kW": 50
                        }
                    ],
                    "id": "DKb200",
                    "modelId": "b200",
                    "modelName": "b"
                },
                {
                    "connectors": [
                        {
                            "id": "y", "connectorNo": "1", "displayId": "2", "name": "DC", "kW": 175
                        },
                        {
                            "id": "x", "connectorNo": "1", "displayId": "2", "name": "DC", "kW": 175
                        }
                    ],
                    "id": "DKc300",
                    "modelId": "c300",
                    "modelName": "c"
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": true,
            "city": "København", "country": "DK", "isSemipublic": true, "postalCode": "2100"
        }
    }
}

@endjson
@enduml

{"fig":"txonstructure","caption":"TXON data structure with type declarations in initialiser and type instances in data property."}

{"break":true}

{"sub":"Validation of JSON to TXON"}

[ Text ]

---------------------------------------------------------------------------------

The `TXON.js library` supports type conformance validation of typed JSON data structures, as long as they contain an initialiser property and data property at the root node. TXON types must be correctly declared before conformance of references to them can be checked. Type declarations support enumerated values, minimum to maximum ranges, and default value insertion.

{"break":true}