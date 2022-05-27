{"sec":"Case Description and Material"}

In this section I present my collaboration with the company and the specific case from which I source data samples and other material. As the company is kept anonymous, I present generic examples of data structures rather than confidential data samples. 

As seen in table {"ref":"casedelivery"} the most represented deliverables across all published case-work reflects the departments at the company, as presented in figure {"ref":"companystructure"}. This only includes deliverables occuring in multiple cases, and there is greater variance in deliverables when considering single occurences.

<table style="width:100%">
<tr><th><sub>Deliverable</sub></th><th><sub style="float: right">Cases</sub></th></tr>
<tr  style="padding-bottom:0"><td style="padding-bottom:0"><sub>iOS Development</sub></td><td style="padding-bottom:0"><sub style="float: right">23</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Android Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">18</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>UI/UX Design</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">19</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Project Management</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">16</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Quality Assurance (QA)</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">7</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Backend Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">6</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Business Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">4</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Technical Leadership</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">2</sub></td></tr>
</table>

{"tbl":"casedelivery","caption":"Deliverables that occur in multiple case descriptions published by the contracted company."}

{"sub":"Client project and case"}

In my collaboration with the contracted company I am only involved with the engineering department, who are responsible for software development and coordinating backend engineering with the client. The deliverables for this client are: project management, iOS/Android development, backend development, and UI/UX design. This case is typical as its deliverables occur frequently across all published cases. 

Their client for this case provides both physical infrastructure and back-end maintenance for their product, but have contracted the company to develop a mobile application connecting users with their data. The client collects and stores the status of their products (e.g. charge state), and they track availability of their proprietary chargers to offer users a map of available chargers.

As the client relies so heavily on connecting users with their data, the software developed also primarily relies on data interchange. The company and I have agreed to produce a proposal for an improved data structure that guards against potential errors, by investigating the current data validation processes and how errors are handled in their systems and software architecture.

{"break":true}

{"sub":"System architecture and information flow"}

For this project the company engineers have chosen to utilise the Continuous Integration and Continuous Development (CI/CD) platform "GitLab" as their backend. The purpose of this backend is not to store data, as the client is responsible for storing information on users and products, but to validate that interchanged data structures are compatible with the structures defined in the developed software applications.

As illustrated in figure {"ref":"informationflow"} the flow of information in this system involves users, the client and the company. When users attempt to authenticate themselves within the software application, a request for information is sent to the client backend. If authentication succeeds, the information is forwarded to the company backend (GitLab), wherein the information is validated based on requirements defined in TypeScript. If the information meets all specified requirements it is returned as a response to the application. When information is received by the application, its model attempts to cast correctly specified objects and forward them to the view model, which presents them in the interface.

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
        [HTTP response] -left-> [Protocol]
        [Protocol] -up-> [Class]
    }
}

[Protocol] -left-> [Observable]
[Observable] -up-> [User Interface]
[User Interface] -right-> [Class]

[Class] -right-> [HTTP request]
[HTTP request] -right-> [Database]
[Database] -down-> [GitLab]
[GitLab] -left-> [HTTP response]

@enduml

{"fig":"informationflow","caption":"Flow of information from the initial request sent from application to backend, to a response from the data validation backend (GitLab)."}

The implication of this system architecture is that while software design necessitates strict data structure requirements, it is not the company developing the software that decides how its data is structured. The client maintains full control of their user and product data, and as such the developers must negotiate data structures with the client to avoid crashes. At the application level the software must guard against errors by only casting responses that conform to their expected data structures. The current approach of validating data through CI/CD before receiving it lessens the burden on the developers, but it is not infallable as it is not evident why a received data structure is different than expected. This situation directly inspired me to investigate how the current data structures could be re-formatted with a new syntax, to explicitly specify the intent of the data.

{"break":true}

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

{"sub":"Sample data structure"}

In order to investigate how the data interchanged between the application client and backends, I needed a data sample and the validation code utilised on the GitLab platform. The company provides several data samples, from which I have chosen a sample that contains what appears to be multiple objects akin to enumerations. This is a prime example of a data structure that is prone to syntax errors, and as such it is an ideal source for investigating an improved syntax.

As seen in figure {"ref":"samplejson"} the root node of this data structure contains information about a proprietary charger installation by the client, in addition to arrays of nodes that appear identical in structure. This data structure can be considered safe from an application developer perspective, as it likely mirrors the structures the data will be cast to inside the application. However it does not contain explicit information about the intended type of values, and this is an area that I will aim to improve with my proposal.

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