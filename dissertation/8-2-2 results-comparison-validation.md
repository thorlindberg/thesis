{"sub":"Validation of JSON to TXON"}

[ Text ]

```
{
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
```

[ Text ]

```
{
    "init": { ... },
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

---------------------------------------------------------------------------------

The `txon.js library` supports type conformance validation of typed JSON data structures, as long as they contain an initialiser property and data property at the root node. TXON types must be correctly declared before conformance of references to them can be checked. Type declarations support enumerated values, minimum to maximum ranges, and default value insertion.

{"break":true}