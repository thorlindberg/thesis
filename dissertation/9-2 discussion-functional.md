{"sec":"Reflections on Functional Implementation"}

In this section I present and discuss my approach to developing a type-extensible format and implementing its grammar and syntax through a validation library. The focal point of this reflection is the alternative decisions I could have taken, as well as a discussion of why I chose the decisions I made with my implementation.

<br>

{"sub":"Error handling and feedback implementation"}

As I presented in my comparison of the TypeScript and TXON validation processes, both of their libraries included a validation method that stopped validation once an error was encountered. The implication was that neither library is capable of continuously returning errors as they are encountered when evaluating a data structure. This was a feature that I considered for my implementation with the TXON.js library, as a result of deriving my development process from unit tests.

It became evident to me as I evaluated the unit tests that the validation process could only return an error message once. This was not the ideal implementation from my perspective, as the debugging process for an invalid data structure would require repeated validation until all checks had passed. As an alternative I explored returning arrayrised errors, with each error added as it was encountered. The implication of this implementation would be that the entire validation process would have to be executed, and any errors encountered would be collectively returned at the end of each execution. This was also not the ideal implementation, because it is unnecessary and inefficient to wait for the entire process to complete.

As an alternative implementation I would propose a continuous validation process, which would asynchronously return error messages when nonconformance was encountered, but would execute the entire validation process. This means an engineer could execute once, and immediately respond to errors as they are encountered. While they correct the invalid data structure, the process would continue providing error messages throughout validation. This would improve scalability of the validation method, where the validation process may not complete before an error can be corrected.

This implementation reflects the sentiments expressed by {"cite":"guernsey2013testdriven"} in his description of test-driven development. He notes that unit tests should facilitate fast testing through short execution time and that testing should be unordered, which is achieved through isolated, continuous, or parallel unit testing.

{"break":true}

{"sub":"Typed objects and relational properties"}

[ Text ]

<!--

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

-->

{"break":true}