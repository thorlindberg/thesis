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

Becomes this TXON data structure when grammar is applied:

```

```

<br>

[ How they are different ]

{"break":true}