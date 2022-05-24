{"sec":"Comparison of JSON and TXON"}

In this section I present a comparison of the differences between JSON and TXON data structures, when the TXON grammar is applied to the sample data provided to me. The purpose of this comparison is to demonstrate that a generic validation approach can replace the existing TypeScript validation on GitLab.

Assume this JSON data structure:

```
{
    "Location": {
        "id": "string",
        "locationId": "string",
        "name": "string",
        "address": {
            "Address": {
                "line1": "string",
                "line2": "string"
            }
        },
        "coordinates": {
            "Coordinates": {
                "lat": "number",
                "lng": "number"
            }
        },
        "imageUrl": "string | null",
        "phoneNumber": "string | null",
        "description": {
            "Localizable":  {
                "da": "string | null",
                "en": "string | null"
            }
        },
        "roamingPartner": "string | null",
        "isRoaming": "boolean",
        "isOpen24": "boolean",
        "openingHours": {
            "Localizable": {
                "da": "string | null",
                "en": "string | null"
            }
        },
        "chargePoints": {
            "ChargePoint[]": {
                "id": "string",
                "type": {
                    "ChargePointType": "string"
                },
                "connectors": {
                    "Connector[]": {
                        "id": "string",
                        "connectorNo": "string",
                        "displayId": "string",
                        "type": "string",
                        "kW": "number",
                        "speed": "string"
                    }
                }
            }
        },
        "isRemoteChargingSupported": "boolean",
        "isFuture": "boolean"
    }
}
```

<br>

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
            "chargePoints": "array<chargepoint>",
            "isRemoteChargingSupported": "boolean", "isFuture": "boolean"
        },
        "chargepoint": {
            "id": "string", "type": "string", "connectors": "array<connector>"
        },
        "connector": {
            "id": "string", "connectorNo": "string", "displayId": "string",
            "type": "string", "kW": "number", "speed": "string"
        }
    },
    "data": {
        "address": "København, Blegdamsvej 9",
        "chargePoints": [
            {
                "connectors": [
                    {
                        "capacitykW": 43,
                        "connectorId": "1",
                        "typeId": 1,
                        "typeName": "AC",
                        "variantName": "z"
                    },
                    {
                        "capacitykW": 50,
                        "connectorId": "2",
                        "typeId": 2,
                        "typeName": "DC",
                        "variantName": "x"
                    }
                ],
                "id": "DKa100",
                "modelId": "a100",
                "modelName": "a"
            },
            {
                "connectors": [
                    {
                        "capacitykW": 43,
                        "connectorId": "1",
                        "typeId": 1,
                        "typeName": "AC",
                        "variantName": "z"
                    },
                    {
                        "capacitykW": 50,
                        "connectorId": "2",
                        "typeId": 2,
                        "typeName": "DC",
                        "variantName": "x"
                    }
                ],
                "id": "DKb200",
                "modelId": "b200",
                "modelName": "b"
            },
            {
                "connectors": [
                    {
                        "connectorId": "1",
                        "typeId": 2,
                        "typeName": "DC",
                        "variantName": "y",
                        "capacitykW": 175
                    },
                    {
                        "connectorId": "2",
                        "typeId": 2,
                        "typeName": "DC",
                        "variantName": "x",
                        "capacitykW": 175
                    }
                ],
                "id": "DKc300",
                "modelId": "c300",
                "modelName": "c"
            }
        ],
        "city": "København",
        "country": "DK",
        "houseNumber": "9",
        "id": 55,
        "isRoamingLocation": true,
        "isSemipublic": true,
        "isFuture": true,
        "latitude": 55.696914,
        "locationIdentity": "DKpartner",
        "longitude": 12.566042,
        "name": "København",
        "open24": false,
        "phoneNumber": "12345",
        "pictureUrl": "https://image.url",
        "postalCode": "2100",
        "roamingPartnerName": "DKpartner",
        "streetName": "Blegdamsvej"
    }
}
```

<br>

[ How they are different ]

{"break":true}