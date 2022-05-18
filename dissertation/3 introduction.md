{"chp":"Introduction"}

As humanity increasingly becomes reliant on smartphones and internet-of-things (IOT) devices for communication, the software industry must pivot towards development of applications centered on data transmission. These applications can be completely reliant on a consistent internet connection, acting as clients receiving and presenting transmitted information to users. These clients typically serve purposes such as social media communication, content consumption, user account access etc.

This evolution in computing has implications for how software projects are planned, conducted and maintained. As the server becomes the predominant source of both information and computation, the software itself plays a diminishing role in delivering content to consumers. Deployment of software applications on mobile platforms requires publishing approval, as well as the consent of users for updates. For these reasons mobile applications must be heavily tested before deployment, which discourages the development of complex applications prone to errors (referred to as "hard-coded"). The software industry has instead moved towards developing simple applications (referred to as "soft-coded") that are flexible to server-driven changes and updates.

The data transmitted to these applications is often simple data structures containing small amounts of information, with a high frequency of transmission. In the case of platforms, especially social media platforms, user activity is recorded, batched, and algorithmically processed on-server, meaning user devices only receive the small result. Transmission occurs across layers in a system, referred to as a distributed system due to the distributed nature of communication. A main feature of distributed systems is their ability to handle hardware and software heterogeneity, as information must travel digitally and physically across layers of applications, networks, and hardware. Heterogeneity manifests as differences in protocols, programming language features, and data formats.

<br>

{"sub":"Purpose of this Project"}

Existing research predominantly evaluates data serialisation formats from a feature, performance, and efficiency perspective. While these aspects are quantifiable, measurable, and potentially motivate decisions for designing large-scale data transmission systems, they fail to illustrate the conditions that inform the choice of data format for the common software development team. As performance differences are negligible in small-scale systems, these conditions are likely more abstract and extend beyond development into the organisational structures and division of responsibilities in the team and between levels of developers.

{"break":true}

{"sub":"State-of-the-Art"}

I approached this project with understanding of and respect for the existing structures and practices wherein I seek to contribute. It is crucial to acknowledge that the importance of data interchange has resulted in extensive work into the grammar, transmission and universiality of data formats. For this reason I developed my proposal with emphasis on humility and causing the least disruption of existing implementations in systems and languages.

The popularity of the JavaScript Object Notation (JSON) made it an obvious choice for this project. As the web became ubiquitous, so too did the JavaScript language, from which the JSON data format is derived. The specification for the JSON format stresses human-readability and universiality across systems and programming languages {"citep":"ecma2022json"}. JSON is a plain-text format, meaning it can be displayed and edited in any text processing application. The seven values types available in JSON are: object, array, string, number, true, false, and null.

{"cite":"douglas2020form"} presents the grammar of JSON in the McKeeman Form, which is a notation for expressing grammars While JSON specifies a clear hierarchy of data nodes, this notation is necessary as some of the grammar includes recursion. As seen in figure {"ref":"jsontypes"} I have attempted to hierarchally present this grammatical notation, but this should be viewed as an abstractation that does not accurately portray the exhaustive grammar of JSON.

<br>

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

{
    "json": "element",
    "ws": {
        "members": [ "member", "member , members" ],
        "member": "ws string ws : element",
        "elements": [ "element", "element , elements" ],
        "element" : "ws value ws",
        "characters": [ "character characters" ],
        "character": ""
    },
    "value": {
        "object": [ "{ ws }", "{ ws }" ],
        "array": "[ member ]",
        "string": "\" characters \"",
        "number": {
            "integer": [ "digit", "onenine digits", "- digit", "- onenine digits" ],
            "fraction": [ ". digits" ],
            "exponent": [ "E sign digits", "e sign digits" ]
        },
        "true": "true",
        "false": "false",
        "null": "null"
    }
}

@endjson
@enduml

{"fig":"jsontypes","caption":"Grammatical notation of types specified in the JSON data format."}

{"break":true}