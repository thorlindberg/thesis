{"sub":"Types from TypeScript to TXON"}

TypeScript provides extensible and explicit typing of JavaScript structures. Its extensible syntax means that structures like Objects become typed by adding type annotations and the "type" keyword. This also means that TypeScript code becomes valid JavaScript code by removing these annotations and the keyword. As TypeScript is a superset of JavaScript, and the JSON format is derived from JavaScript, a JSON data structure can be parsed and cast directly to a TypeScript structure. Through this process the properties of a JSON structure can be validated on their type based on the typed properties of the TypeScript structure. A property can be annotated with another typed structure, resulting in relational references between structures.

In the following is the typed objects declared in TypeScript for validating the sample data structure provided to me by the company I partnered with on this project. The main typed object is `Location` which has properties annotated with the types `Address`, `Coordinates`, `Localizable`, `ChargePoint[]`, and `Connector[]`.

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
```
```
type Coordinates = {
    lat: number
    lng: number
}
```
```
type Localizable =  {
    da: string | null
    en: string | null
}
```
```
type ChargePoint[] = {
    id: string
    type: ChargePointType
    connectors: Connector[]
}
```
```
type ChargePointType = string
```
```
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

TXON provides extensible and explicit typing of JSON structures. 

[ Presentation of the derived type declarations in the initialiser ]

// some of this data has been modified because it did not match the type props by name :(
// .speed was made optional because it is missing from the data

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

{"break":true}