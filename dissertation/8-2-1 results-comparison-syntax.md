{"sub":"Types from TypeScript to TXON"}

TypeScript provides extensible and explicit typing of JavaScript structures. Its extensible syntax means that structures like Objects become typed by adding type annotations and the "type" keyword. This also means that TypeScript code becomes valid JavaScript code by removing these annotations and the keyword. As TypeScript is a superset of JavaScript, and the JSON format is derived from JavaScript, a JSON data structure can be parsed and cast directly to a TypeScript structure. Through this process the properties of a JSON structure can be validated on their type based on the typed properties of the TypeScript structure. A property can also be extended with another type, by annotating it with the name of a type.

[ Presentation of the type declaration sample ]

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

type ChargePointType = string

type Connector[] = {
    id: string
    connectorNo: string
    displayId: string
    type: string
    kW: number
    speed: string
}

type ChargePoint[] = {
    id: string
    type: ChargePointType
    connectors: Connector[]
}
```

```
type Location = {
    id: string
    locationId: string
    name: string
    address: {
        line1: string
        line2: string
    }
    coordinates: {
        lat: number
        lng: number
    }
    imageUrl: string | null
    phoneNumber: string | null
    description: Localizable
    roamingPartner: string | null
    isRoaming: boolean
    isOpen24: boolean
    openingHours: {
        da: string | null
        en: string | null
    }
    chargePoints: {
        id: string
        type: {
            ChargePointType = string
        }
        connectors: {
            id: string
            connectorNo: string
            displayId: string
            type: string
            kW: number
            speed: string
        }
    }
    isRemoteChargingSupported: boolean
    isFuture: boolean
}
```

[ Text ]

TXON provides extensible and explicit typing of JSON structures. 

[ Prsentation of the derived type declarations in the initialiser ]

```
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
    "data": { ... }
}
```

---------------------------------------------------------------------------------

TypeScript offers extensible and explicit typing of its structures, but it is also statitically typed, meaning its code does not compile with type errors. Its typed structures can be applied for validation by parsing and casting JSON data to them. TXON offers extensible and explicit typing of JSON structures, but it is dynamically typed, meaning its code can be parsed with type nonconformance. For this reason TXON requires a generic validation layer, the txon.js library, which standardises validation. TXON stresses minimal transformation of JSON data to add explicit typing.

The grammar for declaring and instantiating types in a TXON data structure is derived from the syntax for XML specification and TypeScript types. As such it is expected that enumerated TXON types are similar to enumerated TypeScript structures, but like XML it differs in certain ways. These differences inform the degree of their ability to be validated, and so I begin by presenting the transformation of a JSON data structure validated with TypeScript to a TXON data structure validated with the txon.js library.

There are three steps necessary for the comparison of data structures utilising TypeScript and TXON. The first step is to compare type declarations on readability and character count. The second step is to compare type instances on readability and character count. The last step is to compare the efficiency of the entire untyped JSON with TypeScript types and TXON data structure with embedded types.

For this evaluation the data structure examined is the sample data provided to me by the company. This JSON data corresponds to the enumerated TypeScript type `Location` which has properties referencing other typed enumerations named `Address`, `Coordinates`, `Localizable`, `ChargePoint[]`, and  `Connector[]`. It also includes untyped data, which is properties not enumerated for a type, and as such it is suitable for evaluating extensible typing. This is the data structure provided to me:

```
```

<br>

[ Transformation required to achieve this ]

[ Implicitly typed data becomes explicitly typed data ]

// some of this data has been modified because it did not match the type props by name :(
// .speed was made optional because it is missing from the data

Becomes this data structure when the TXON grammar is applied:

```
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
                    "modelId": "a100", // not in type
                    "modelName": "a" // not in type
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
                    "modelId": "b200", // not in type
                    "modelName": "b" // not in type
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
                    "modelId": "c300", // not in type
                    "modelName": "c" // not in type
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": true,
            "city": "København", "country": "DK", "isSemipublic": true, "postalCode": "2100" // not in type
        }
    }
}
```

<br>

[ How they are different ]

<br>

The final comparison is between the JSON data structure with TypeScript and the TXON data structure that embeds type declarations and references within the JSON data stucture.

{"break":true}