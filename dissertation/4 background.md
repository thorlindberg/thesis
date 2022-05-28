{"chp":"Background"}

In this chapter I present the background for this project by introducing the company I collaborated with on my proposal. This company provides software, design, and user insights to its clients. The identity of this company is kept anymous in this report to avoid breach of confidentiality, and consequentially I utilise generic code and data samples derived from the material provided to me.

The company specialises in native multi-platform mobile application development. They operate two separate development teams, working in parallel on the same case. One team writes in the `Swift programming language` targeting the `iOS mobile operating system` {"citep":"apple2022swift"}, while another writes in the `Kotlin programming language` targeting the `Android mobile operating system` {"citep":"alpha2022kotlin"}.

As seen in figure {"ref":"companystructure"} the company consists of five departments: `management` `project management` `human resources` `engineering` and `design`. Management negotitates case-work with clients and manages the project managers, who manage the remaining three departments at the comapny. As clients differ from each other and their internal operations are unknown to me, this overview is not exhaustive and only cosists of the two departments known to me at a specific client: `product management` and `back-end engineering`. Product management is responsible for negotating product development with company managemnet, and back-end engineering negotitates software development with company engineering.

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