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
        { "capacitykW": 43, "connectorId": "1", "typeId": 1, "typeName": "AC", "variantName": "z" },
        { "capacitykW": 50, "connectorId": "2", "typeId": 2, "typeName": "DC", "variantName": "x" }
      ],
      "id": "DKa100",
      "modelId": "a100",
      "modelName": "a"
    },
    {
      "connectors": [
        { "capacitykW": 43, "connectorId": "1", "typeId": 1, "typeName": "AC", "variantName": "z" },
        { "capacitykW": 50, "connectorId": "2", "typeId": 2, "typeName": "DC", "variantName": "x" }
      ],
      "id": "DKb200",
      "modelId": "b200",
      "modelName": "b"
    },
    {
      "connectors": [
        { "connectorId": "1", "typeId": 2, "typeName": "DC", "variantName": "y", "capacitykW": 175 },
        { "connectorId": "2", "typeId": 2, "typeName": "DC", "variantName": "x", "capacitykW": 175 }
      ],
      "id": "DKc300",
      "modelId": "c300",
      "modelName": "c"
    },
    {
      "connectors": [
        { "connectorId": "1", "typeId": 2, "typeName": "DC", "variantName": "y", "capacitykW": 150 },
        { "connectorId": "2", "typeId": 2, "typeName": "DC", "variantName": "y", "capacitykW": 150 }
      ],
      "id": "DKc400",
      "modelId": "d400",
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
  "latitude": 55.696914,,
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