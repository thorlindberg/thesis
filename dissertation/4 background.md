{"chp":"Background"}

In this chapter I present the background for this project by introducing the company I collaborated with on my proposal. This company provides software, design, and user insights to its clients. The identity of this company is kept anonymous in this report to avoid breach of confidentiality, and consequentially I utilise generic code and data samples derived from the material provided to me.

The company specialises in native multi-platform mobile application development. They operate two separate development teams, working in parallel on the same case. One team writes in the `Swift programming language` targeting the `iOS mobile operating system` {"citep":"apple2022swift"}, while another writes in the `Kotlin programming language` targeting the `Android mobile operating system` {"citep":"alpha2022kotlin"}.

As seen in figure {"ref":"companystructure"} the company consists of five departments: `management` `project management` `human resources` `engineering` and `design`. Management negotiates case-work with clients and manages the project managers, who manage the remaining three departments at the company. As clients differ from each other and their internal operations are unknown to me, this overview is not exhaustive and only consists of the two departments known to me at a specific client: `product management` and `back-end engineering`. Product management is responsible for negotiating product development with company management, and back-end engineering negotiates software development with company engineering.

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
    [Product management] -down- [Back-end engineering]
    [Back-end engineering] -down- [Application Programming Interface (API)]
}

frame Company {
    [Management] -down- [Project management]
    [Project management] -down- [Engineering]
    [Project management] -down- [Design]
    [Project management] -down- [Human resources]
}

[Product management] <-right-> [Management]
[Application Programming Interface (API)] -right- [Engineering]
[Back-end engineering] <-right-> [Engineering]

@enduml

{"fig":"companystructure","caption":"Responsibilities of involved parties and how parties relate and interact."}

{"break":true}

As seen in figure {"ref":"casedelivery"} the most represented deliverables across all published case-work reflects the departments at the company, as presented in figure {"ref":"companystructure"}. This only includes deliverables occurring in multiple cases, and there is greater variance in deliverables when considering single occurrences.

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
    "Case": [
        "Client",
        "Description",
        {
            "Deliverables": {
                "iOS Development": 23,
                "Android Development": 18,
                "UI/UX Design": 19,
                "Project Management": 16,
                "Quality Assurance (QA)": 7,
                "Backend Development": 6,
                "Business Development": 4,
                "Technical Leadership": 2
            }
        }
    ]
}

@endjson
@enduml

{"fig":"casedelivery","caption":"Deliverables that occur in multiple case descriptions published by the contracted company."}