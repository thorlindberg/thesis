{"sec":"Source Material and Developer Perspectives"}

In this section I present the information I have gathered from interviews at the company with their two engineering teams (iOS and Android), as well as the backend engineers, on the topic of interchangeable data. I spoke with the lead engineer on the iOS team about decoding data.

<br>

{"sub":"System architecture and information flow"}

For this case the company engineers have chosen to utilise the `GitLab` platform, which acts as an automated application for validating data and forwarding it to the company `Firebase` database.

As illustrated in figure {"ref":"informationflow"} the flow of information in this system involves the `users` `client` and `company`. When users attempt to authenticate themselves within the software application, a request for information is sent to the client backend. If authentication succeeds, the information is forwarded to the company backend, wherein the information is validated based on requirements defined in TypeScript. If the information meets all specified requirements it is returned as a response to the application. When information is received by the application, its model attempts to cast correctly specified objects and forward them to the view model, which presents them in the user interface.

The implication of this architecture is that the company achieves final control of data validation, which allows them to align their full stack of software (frontend and backend), despite not having control over the data storage system. This situation inspired me to investigate how the existing validation process could become more generic and embedded in their data structures.

<br>

@startuml

skinparam linetype ortho

<style>
componentDiagram {
    BackGroundColor transparent
    frame {
        BackGroundColor white
    }
    component {
        BackGroundColor white
    }
}
</style>

frame Client {
    [Application Programming Interface]
    frame Backend {
        [Initial data structure]
    }
}

frame GitLab {
    [TypeScript validation]
    [Validated data structure]
}

frame Firebase {
    [Database] -up-> [Final data structure]
}

frame Application {
    [User Interface]
    [View Model]
    frame Model {
        [Object structure]
        [HTTP request]
        [HTTP response]
    }
}

[User Interface] -left-> [View Model]
[View Model] -right-> [User Interface] 
[View Model] --> [Object structure]
[Object structure] -down-> [HTTP request]
[HTTP request] -right-> [Application Programming Interface]
[HTTP response] -left-> [Object structure]

[Final data structure] -left-> [HTTP response]

[Application Programming Interface] -down-> [Initial data structure]
[Initial data structure] -right-> [TypeScript validation]

[TypeScript validation] -up-> [Validated data structure]
[Validated data structure] -up-> [Database]

@enduml

{"fig":"informationflow","caption":"Flow of information from a request in the client to a response from Firebase."}

{"break":true}

{"sub":"Validation process and type declarations"}

As data is transmitted from the client database to the company backend, it reaches GitLab where it is validated based on type requirements. The company utilises the TypeScript language to declare types, which is a superset language of JavaScript {"citep":"micro2022typescript"}. These types are predominantly Objects specifying value types, but some types are akin to enumerations specifying a range of values.

Types can specify required values with a non-null type, but also specify optional values by assigning a non-null type and a type null. Developers can declare two types and assign a type to the value of another type. Type names can be declared with "TypeName[]" to type arrayrised data structures.

```
type EnumeratedTypeName = "a" | "b" | "c"
```
```
type ObjectTypeName = {
    requiredValue: EnumeratedTypeName
    optionalValue: string | null
    arrayrizedValue: ArrayTypeName[]
}
```

<br>

As seen in figure {"ref":"typehierarchy"}  there is a hierarchy of type declarations on the company GitLab, representing information on the location of an installation by the client. These declarations are used during validation of incoming JSON data, as the specify type requirements. I have excluded the enumerated type declarations, as my proposal does not explore this concept. It is evident that a location has multiple installed chargers, which is the longest branching of types within this structure.

<br>

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

{"sub":"Sample data structure"}

In order to investigate how the data transmitted between the backend and application, I needed a data sample and the validation code utilised on the GitLab platform. The company provides several data samples, from which I have chosen a sample that contains a hierarchy of typed objects with nested type properties. This is a good example of a data structure that could be prone to syntax errors, as some of its properties represents complex types such as dates.

As seen in figure {"ref":"samplejson"} the root node of this data structure contains information about a proprietary charger installation by the client, in addition to arrays of nodes that appear identical in structure. This data structure can be considered safe from an application developer perspective, as it likely mirrors the structures the data will be cast to inside the application. However it does not contain explicit information about the intended type of values, and this is an area that I will aim to improve .

<br>

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ff9999
        }
    }
}
</style>

{
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

@endjson
@enduml

{"fig":"samplejson","caption":"Data sample from GitLab provided to me by the company."}

{"break":true}

TypeScript provides extensible and explicit typing of JavaScript structures. Its extensible syntax means that structures like Objects become typed by adding type annotations and the "type" keyword. This also means that TypeScript code becomes valid JavaScript code by removing these annotations and the keyword. As TypeScript is a superset of JavaScript, and the JSON format is derived from JavaScript, a JSON data structure can be decoded and cast directly to a typed object. Through this process the properties of a JSON structure can be validated on their type based on the typed properties of the TypeScript object. A property can be annotated with another typed structure, resulting in relational references between structures.

<!--
1. Translate statically typed objects to TXON type declarations.
-->

In the following is the typed objects declared in TypeScript for validating the sample data structure provided to me by the company I partnered with on this project. The main typed object is `Location` which has properties annotated with the types `Address` `Coordinates` `Localizable` `ChargePoint[]` and `Connector[]`.

<br>

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

<br>

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

{"break":true}

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

{"break":true}

{"sub":"Developer perspectives on data interchange"}

I asked the lead engineer on the iOS team how data is handled once it reaches their application on iOS. He explained to me that they utilise the Codable protocol, which is used to declare data structures within the Swift language {"citep":"apple2022swift"}.

As seen in figure {"ref":"codablestruct"} when a data structure is received as an API response, he said that it is cast to the Codable structure, which attempts to find and draw out properties that match the Codable declaration. The implications of this approach are that developers must anticipate a specific structure of data, and guard against missing properties throughout the application. If the application attempts to access properties that were not initialised with the Codable protocol, the entire application may crash and its components become inaccessible.

<br>

@startuml

skinparam linetype ortho

<style>
componentDiagram {
    BackGroundColor transparent
    frame {
        BackGroundColor white
    }
    component {
        BackGroundColor white
    }
}
</style>

frame Backend {
    frame Client  {
        [Database]
    }
    frame Developer {
        [GitLab]
    }
}

frame Application {
    frame View {
        [User Interface]
    }
    frame "View Model" {
        [Observable]
    }
    frame Model {
        [HTTP request]
        [HTTP response]
        frame Protocol {
            [Codable] -up-> [Data Structure]
        }
    }
}

[Class] -left-> [Observable]
[Observable] -up-> [User Interface]
[User Interface] -right-> [HTTP request]
[HTTP request] -right-> [Database]
[Database] -down-> [GitLab]
[GitLab] -left-> [HTTP response]
[HTTP response] -left-> [Codable]
[Data Structure] -left-> [Class]

@enduml

{"fig":"codablestruct","caption":"Process of casting data structure to Codable protocol in the Swift language."}

I anticipated that the engineers would not be concerned with interchangeable data if asked directly, so instead I asked them about their experiences with software crashes and pushing updates to correct these errors. This lead to a discussion of the utilities they have to test and deploy API calls, as well as how they negotiate data structures with their client. It was evident from this discussion that potential invalid data structures are not of immediate concern to the engineers, but despite this the engineers had previous experiences with invalid data structures. They explained that the result was a high amount of time invest in debugging the software, but from their perspective these issues should ideally be handled by their backend engineers or the client engineers.

{"break":true}