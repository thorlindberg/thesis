{"chp":"Background"}

In this chapter I present the background for this project by introducing the company I collaborated with on my proposal. This company provides software, design, and user insights to its clients. The identity of this company is kept anonymous in this report to avoid breach of confidentiality, and consequentially I utilise generic code and data samples derived from the material provided to me.

The company specialises in native multi-platform mobile application development, and operate two separate development teams working in parallel. One team writes in the `Swift programming language` targeting the `iOS operating system` {"citep":"apple2022swift"}, while another writes in the `Kotlin programming language` targeting the `Android operating system` {"citep":"alpha2022kotlin"}.

As seen in figure {"ref":"companystructure"} the company consists of five departments: `management` `project management` `human resources` `engineering` and `design`. Management negotiates case-work with clients and manages the project managers, who manage the remaining three departments at the company. As clients differ from each other and their internal operations are unknown to me, this overview is not exhaustive and only consists of the two departments known to me at a specific client: `product management` and `back-end engineering`. Product management is responsible for negotiating product development with company management, and back-end engineering negotiates software development with company engineering. The `Application Programming Interface (API)` acts as a channel for communication between the two teams of engineers, and a datastream between the client database, company servers, and company application.

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