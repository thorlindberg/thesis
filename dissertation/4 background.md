{"chp":"Background"}

In this chapter I present the background for this project, by introducing the company I have chosen to collaborate with on my proposal. This company provides software design, development and user insights to its clients, on a case-work basis. The identity of this company is intentionally kept anymous in this report to avoid breach of confidentiality, and as such I have chosen to derive generic data samples from the professional material they have provided me.

The company specialises in native multi-platform mobile application development, in contrast to the more common platform-neutral approach. They operate two separate development teams working in parallel on the same client case. One team writes in the "Swift" language for targeting the "iOS" operating system, while another utilises the "Flutter" framework for targeting the "Android" operating system. This approach nets them hardware efficiency and software performance advantages relative to multi-platform frameworks such as "React Native", at the cost of operating and aligning two teams rather than one.

As seen in figure {"ref":"companystructure"} the company consits of five departments: management, project management, human resources, engineering, and design. Management negotitates case-work with clients and manages the project managers, who manage the remaining three departments. As clients are entirely unrelated and their internal operations are unknown to me, this overview is not exhaustive and only cosists of the two departments known to me: product management and back-end engineering. Product management is responsible for negotating product development with the company, and back-end engineering negotitates software development with company engineering.

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
    database {
        BackGroundColor white
    }
}
</style>

frame Client {
    [Product management] -down-> [Back-end engineering]
}

frame Developer {
    [Management] -down-> [Project management]
    [Project management] -down-> [Human resources]
    [Project management] -down-> [Engineering]
    [Project management] -down-> [Design]
}

[Product management] -right-> [Management]

[Back-end engineering] <-right-> [Engineering]

@enduml

{"fig":"companystructure","caption":"Responsibilities of involved parties and how parties relate and interact."}

In the following sections I elaborate on the case-work and material provided to me by this company, and developer perspectives I have gathered through interviews with their employees.

{"break":true}