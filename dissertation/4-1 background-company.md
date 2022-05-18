{"sub":"Company Structure and Hierarchy"}

The company specialises in native multi-platform mobile application development. They operate two separate development teams working in parallel on the same case. One team writes in the "Swift" language targeting the "iOS" operating system {"citep":"apple2022swift"}, while another utilises the "Flutter" framework targeting the "Android" operating system {"citep":"alpha2022flutter"}. This results in more performant software compared to multi-platform frameworks, at the cost of aligning two teams.

As seen in figure {"ref":"companystructure"} the company consists of five departments: management, project management, human resources, engineering, and design. Management negotitates case-work with clients and manages the project managers, who manage the remaining three departments. As clients are entirely unrelated and their internal operations are unknown to me, this overview is not exhaustive and only cosists of the two departments known to me: product management and back-end engineering. Product management is responsible for negotating product development with the company, and back-end engineering negotitates software development with company engineering.

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
}

frame Developer {
    [Management] -down- [Project management]
    [Project management] -down- [Engineering]
    [Project management] -down- [Design]
    [Project management] -down- [Human resources]
}

[Product management] <-right-> [Management]

[Back-end engineering] -down- [Application Programming Interface (API)]
[Engineering] <-left-> [Application Programming Interface (API)]

@enduml

{"fig":"companystructure","caption":"Responsibilities of involved parties and how parties relate and interact."}

{"break":true}