{"chp":"Background"}

In this project I've chosen to collaborate with a company that specialises in native mobile application development. Their identity is kept anonymous, so rather than include confidential data or code samples, I have chosen to derive generic examples from the material they have provided me.

This company holds a unique perspective relative to the landscape of software development in Copenhagen, where return on investment (ROI) in my optics is valued above quality. Rather than take the typical multi-platform approach, using a platform-neutral framework like "React Native", they maintain independent development teams for each platform, and they work exclusively with native code. They maintain an Android team utilising "Flutter" and an iOS team utilising "Swift". This nets them hardware efficiency and performance advantages, at the cost of operating and aligning two parallel developer teams working on the same projects.

As seen in figure {"ref":"companystructure"} ...

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
    [Project management] -down-> [Management]
    [Management] -down-> [Human resources]
    [Management] -down-> [Engineering]
    [Management] -down-> [Design]
}

[Product management] -right-> [Project management]

[Back-end engineering] <-right-> [Engineering]

@enduml

{"fig":"companystructure","caption":"Responsibilities of involved parties and how parties relate and interact."}

In the following I illustrate the relationship between this company (developer) and their partners. This serves as a starting point for deducing which perspectives are held on working with data.

{"break":true}