{"sec":"Reflections on Functional Implementation"}

In this section I present and discuss my approach to developing a type-extensible format and implementing its grammar and syntax through a validation library. The focal point of this reflection is the alternative decisions I could have taken, as well as a discussion of why I chose to make the decisions that informed my implementation.

<br>

{"sub":"Alternatives in the implementation"}

[ Text ]

<div style="color:red">

Alternatively the method could asynchronously return errors as/if nonconformance is encountered. As the user is informed of an error, corrects the error, and re-calls the method, the advantage is that the user does not need to care about completion, and only needs to respond to errors. For large amounts of information, the re-call would without issue run in parallel with the initial call if the initial call has not yet completed.

Explicit subtypes:

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
            "id": "string",
            "connectors": "array<connector>"
        },
        "connector": {
            "id": "string", "connectorNo": "string", "displayId": "string",
            "name": "string", "kW": "number", "speed": "string"
        }
    }
}
```

Implicit subtypes:

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
                            "name": "string", "kW": "number", "speed": "string"
                        }
                    ]
                }
            ],
            "isRemoteChargingSupported": "boolean", "isFuture": "boolean"
        }
    }
}
```

</div>

{"break":true}