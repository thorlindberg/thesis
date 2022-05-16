{"sub":"Validation process and type declarations"}

As data is transmitted from the client database to the company backend, it reaches GitLab where it is validated based on type requirements. The company utilises the TypeScript language to declare types, which is a superset language of JavaScript {"citep":"micro2022typescript"}. These types are predominantly Objects specifying value types, but some types are akin to enumerations specifying a range of values.

Types can specify required values with a non-null type, but also specify optional values by assigning a non-null type and a type null. Developers can declare two types and assign a type to the value of another type. Type names can be declared with "TypeName[]" to type arrayrized data structures.

```
type EnumeratedTypeName = "a" | "b" | "c"
```
```
type ObjectTypeName = {
    requiredValue: string
    optionalValue: string | null
    nestedValue: NestedTypeName
    arrayrizedValue: ArrayTypeName[]
}

type NestedTypeName = {
    requiredValue: string
}
```

<br>

As seen in figure {"ref":"typehierarchy"}  there is a hierarchy of type declarations on the company GitLab, representing information on the location of an installation by the client. These declarations are used during validation of incoming JSON data, as the specify type requirements. I have chosen to exclude enumerated type declarations, but this concept is explored in my proposal. It is evident that a location has multiple installed chargers, which is the longest branching of types within this structure.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

#highlight "Location" / "chargePoints" / "ChargePoint[]"

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

@endjson
@enduml

{"fig":"typehierarchy","caption":"Hierarchy of type declarations with TypeScript on GitLab."}

{"break":true}