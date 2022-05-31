{"sec":"Comparison of Formats and Validation"}

In this section I present a comparison of the data formatting and validation of `JSON` data structures with `TypeScript` code and `TXON` data structures with the `TXON.js` library. As TXON aims to provide typed JSON data and a generic validation process, it is ideal to compare it to an existing JSON data structure and corresponding validation of it with TypeScript. These can be compared on their typing and validation features, while considering readability of the resulting data structures.

A TXON data structure contains an initialiser and a data property, and as such the following results will compare the declaration of types in TypeScript and the initialiser, and then the instantiation of types in JSON and the data property. It is crucial to preface these results by reiterating that TXON is not final in its current implementation, but is rather a proposal presented for discussion.

<br>

{"sub":"Type-safety and transformation of JSON"}

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

We can then extend the JSON data by adding explicit relational references to type names that we declared in the initialiser of the TXON structure. As seen in figure {"ref":"typedjson"} the information was only altered when a type required its value be split into multiple values.

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

With both types declared in the initialiser and instances of types initialised in the data property, we now have a complete TXON data structure. If we compare this result to the original TypeScript declarations and the JSON data structure, the structure has been barely transformed.

As seen in figure {"ref":"txonstructure"} this structure representing the typed object from TypeScript and the intermediary JSON data structure, offers an overview that is more optimal for debugging an invalid data sample. This is especially true as the data structure is transmitted between actors, and each actor has to determine if their expectations align with what the sender has embedded in the initialiser. As such this format serves to both validate the data with the generic features of the TXON.js library, but it also serves as a contract between actors in a distributed system, embedding the purpose of the data through explicit and relational types.

The extensible nature of the TXON syntax ensured minimal transformation of the structure and information, and it is evident that the result is no less readable than the JSON data from which it was derived. This is not an exhaustive assessment, as only one sample was translated from JSON to TXON, and as such I do not claim that these statements are universally true for all data structures. It is entirely possible and likely that the inverse is true when another data structure is translated to TXON, or with another degree of explicit typing of the data.

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

<br>

{"sub":"Validation processes and debugging"}

An object in TypeScript is the end-point for the validation on GitLab, because it provides a statically typed, strong and explicit target on which JSON data structures can be cast. Only the data that matches this object on both value types and structure will be initialised, and as such it provides a powerful guard against errors. This is important because the object is encoded again, and then forwarded to the database that drives the end-user client application. If we could not guard against errors before the data reaches the application, it could cause the customer software to become unusable.

{"break":true}

<!--
TypeScript decoding and casting to object -> feedback?
-->

The validation of a JSON structure on GitLab is achieved by compared the decoded data to a typed object declared with the TypeScript programming language. The validation is its own `TypeScript library`, which is continuously executed as new data structures are integrated and need to be validated before deployment to a `Firebase` database. The validation is paired with a `validate library of predefined feedback messages, which are applied when a data structure is invalid but the developers do not want to throw an exception, which would stop the validation process. Once validation has completed and if no exceptions have been thrown, the library casts the data to a typed object and forwards it to the database.

The validation library on GitHub contains an enumeration of the error messages that can be returned during validation, and these are:

<br>

```
type TypeValidationErrorMessage =
    | "Extra key was found"
    | "Null found for a non-nullable field"
    | "Mandatory field not found"
    | "Regex mismatch"
    | "Type mismatch"
```

<br>

The validation library on GitLab then implements a `validate` method, which is one of several helper functions in the library. The `validate` method defines checks for validating an incoming JSON data structure, and also defines the conditions for detecting nonconformance in the data. The implication is that this process is selective, meaning it allows some leeway of errors to be present, as long as the required properties can be cast to its typed object. The method can be summarised as:

{"break":true}

```
export const validate = <T extends { [key: string]: any }>(
    data: Partial<T>,
    against: TypeSpec<T>,
    options?: ValidationOptions
): Result<T, TypeValidationError> => {

    ...

    for (const k of Object.keys(against)) { ... }

    return data as T

}
```
```
for (const k of Object.keys(against)) {
        
    const value: T[string] | undefined | null = data[k]
    const spec = against[k]

    if (value === null) { ... }

    if (value === undefined) { ... }

    const specType = spec.type
    const valueType = typeof value

    if (isPrimitive(specType)) { ... }

    if (isPrimitiveArray(specType)) { ... }

    if (isTypeSpec(specType)) { ... }

    if (isTypeSpecArray(specType)) { ... }

}
```
```
const value: T[string] | undefined | null = data[k]
const spec = against[k]

if (value === null) {
    const nullable = spec.nullable ?? false
    if (!nullable) { return typeValidationErrors.nullFound(k) }
    continue
}

if (value === undefined) {
    const mandatory = spec.mandatory ?? true
    if (mandatory) { return typeValidationErrors.mandatoryMissing(k) }
    continue
}
```

{"break":true}

```
const specType = spec.type
const valueType = typeof value

if (isPrimitive(specType)) {
    if (valueType !== specType) {
        return typeValidationErrors.typeMismatch(k)
    }
    if (spec.regex !== undefined && !spec.regex.test(value)) {
        return typeValidationErrors.regexMismatch(k)
    }
    continue
}

if (isPrimitiveArray(specType)) {
    if (!Array.isArray(value)) {
        return typeValidationErrors.typeMismatch(k)
    }
    const array = value as any[]
    const elemType = specType.replace("[]", "")
    const invalidElement = array.find((e) => typeof e !== elemType)
    if (invalidElement) {
        return typeValidationErrors.typeMismatch(k)
    }
    continue
}

if (isTypeSpec(specType)) {
    if (valueType !== "object" || Array.isArray(value)) {
        return typeValidationErrors.typeMismatch(k)
    }
    const result = validate(value as Partial<any>, specType, options)
    if (isError(result)) {
        return result
    }
    continue
}

if (isTypeSpecArray(specType)) {
    if (!Array.isArray(value)) {
        return typeValidationErrors.typeMismatch(k)
    }
    if (specType.length === 0) {
        throw Error(`PropertySpec for ${k} must be non-empty.`)
    }
    const array = value as Partial<any>[]
    for (let i = 0; i < array.length; ++i) {
        const specIdx = Math.min(i, specType.length - 1)
        const result = validate(array[i], specType[specIdx], options)
        if (isError(result)) {
            return result
        }
    }
}
```

{"break":true}

It is evident from this method that validation is performed recursively, and that validation does not continue once a nonconformance error has been returned or exception has been thrown. The implications of this implementation are that if a data structure was to be found invalid, the developer would have to look at the type declarations in TypeScript, and then look at the data structure that is invalid. The developer would then have to compare the two, and determine the reason for the respective nonconformance issue.

The validation of a TXON data structure can be achieved through the TXON.js validation library. As described in the experiment, the library provides a handshake method that takes a stringified data structure as its input parameter, and returns an object denoting the validity of the data structure. This object contains both a boolean value that is always `true` unless nonconformance was detected, and a string of feedback describing why validation failed or could not be performed. The implication is that if no feedback is returned, the data structure has completed validation and passed all checks.

This approach is different from what is described with TypeScript on GitLab, in that the aim is not to decode, validate, cast to an object, and then encode the data structure before forwarding, but rather to validate it and then forward it to the end-user client. As a consequence this validation process does not initialise an object with the JavaScript programming language, but this could be achieved if the developer chooses to do so post-validation.

<!--
Comparison of debugging for each validation process
-->

If we compare these two validation processes, it is evident that...

[ Text ]

{"break":true}