{"sub":"Evaluating data structure"}

3. The first step is to move type declarations from TypeScript to the TXON initialiser
- evaluate it on whether the resulting structure: supports all the features applied on GitLab, is as readable, and by comparing character counts.

4. The second step is to move data from the JSON structure to the TXON data, and then transform implicitly typed data into explicitly type instances by adding references to TXON types.
- The resulting data is evaluated on its readability and the difference in character count between the data structures.

5. Combined data structure
- Character count

---

Assume this JSON data structure:

```
{
    "Location": {
        "id": "string", "locationId": "string", "name": "string",
        "address": {
            "Address": {
                "line1": "string", "line2": "string"
            }
        },
        "coordinates": {
            "Coordinates": {
                "lat": "number", "lng": "number"
            }
        },
        "imageUrl": "string | null", "phoneNumber": "string | null",
        "description": {
            "Localizable":  {
                "da": "string | null", "en": "string | null"
            }
        },
        "roamingPartner": "string | null", "isRoaming": "boolean", "isOpen24": "boolean",
        "openingHours": {
            "Localizable": {
                "da": "string | null", "en": "string | null"
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
                        "id": "string", "connectorNo": "string", "displayId": "string",
                        "type": "string", "kW": "number", "speed": "string"
                    }
                }
            }
        },
        "isRemoteChargingSupported": "boolean", "isFuture": "boolean"
    }
}
```

<br>

Becomes this data structure when the TXON grammar is applied:

```
// some of this data has been modified because it did not match the type props by name :(
// .speed was made optional because it is missing from the data
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

{"break":true}