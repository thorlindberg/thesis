{"sec":"Company Collaboration and Case"}

As seen in figure {"ref":"organisation"}, there are two identifiable hierarchies that form a relationship between case partner and development. The top half of this diagram flows from partner to a formulated case. The bottom half of this diagram flows from developer to a product delivery.

{"fig":"organisation","url":"figures/organisation.png","caption":"Hierarchical and structural relationship between development company and case partners.","width":"100%"}

The structure of the partner company informs how they formulate the case offered to the developers. They are also responsible for maintenance of a back-end, delivering customer data to the client developed in the delivery.

The structure of the development company informs how they plan and execute on a case. They are not responsible for the back-end, and thus have to negotiate infrastructure plans and changes with their partners. This presents challenges to their autonomy, hierarchy and responsibilities.

{"sub":"Case-work and delivery"}

[ A typical case delivery by this company? ]

<br>

{"sub":"Architecture and data samples"}

[ Text ]

As seen in figure {"ref":"maxMismatchJSON"} an extensible type declaration can declare optional local minimum and maximum value requirements, which are used during conformance validation.

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

#highlight "init" / "date" / "month" / "maximum"
#highlight "data" / "values" / "0" / "month"

{
    "init": {
        "date": {
            "type": "number",
            "day": { "default": 1 },
            "month": { "minimum": 1, "maximum": 12 }
        }
    },
    "data": {
        "type": "date",
        "values": [ { "month": 13 } ]
    }
}

@endjson
@enduml

{"fig":"maxMismatchJSON","caption":"Example: instance of type \"date\" has \"values\" array containing property \"month\" with value \"13\" above maximum \"12\"."}

<br>

As seen in figure {"ref":"sourceJSON"} an extensible type declaration can declare optional local minimum and maximum value requirements, which are used during conformance validation.

[ UML diagram ]

{"fig":"sourceJSON","caption":"Example: instance of type \"date\" has \"values\" array containing property \"month\" with value \"13\" above maximum \"12\"."}

{"break":true}