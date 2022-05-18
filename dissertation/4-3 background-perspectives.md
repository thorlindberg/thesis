{"sec":"Developer Perspectives on Interchangable Data"}

In this section I present the information I have gathered from interviews at the company with their two engineering teams (iOS and Android), as well as the backend engineers, on the topic of interchangable data and error guarding. I spoke with the lead engineer on the iOS team about handling data responses in software clients, and with engineers on both the iOS and the Android team about experiences with software crashes caused by invalid data structures.

I asked the lead engineer on the iOS team how data is handled once it reaches their application on iOS. He explained to me that they utilise the Codable protocol, which is used to declare data structures within the Swift language {"citep":"apple2022swift"}. As seen in figure {"ref":"codablestruct"} when a data structure is received as an API response, he said that it is cast to the Codable structure, which attempts to find and draw out properties that match the Codable declaration. The implications of this approach are that developers must anticipate a specific structure of data, and guard against missing properties throughout the application. If the application attempts to access properties that were not initialised with the Codable protocol, the entire application may crash and its components become inaccessible.

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
        [HTTP response]
        [Class]
        frame Protocol {
            [Codable] -up-> [Data Structure]
        }
    }
}

[Class] -left-> [Observable]
[Observable] -up-> [User Interface]
[User Interface] -right-> [HTTP request]
[HTTP request] -right-> [Database]
[Database] -down-> [GitLab]
[GitLab] -left-> [HTTP response]
[HTTP response] -left-> [Codable]
[Data Structure] -left-> [Class]

@enduml

{"fig":"codablestruct","caption":"Process of casting data structure to Codable protocol in the Swift language."}

I anticipated that the engineers would not be concerned with interchangable data if asked directly, so instead I asked them about their experiences with software crashes and pushing updates to correct these errors. This lead to a discussion of the utilities they have to test and deploy API calls, as well as how they negotiate data structures with their client. It was evident from this discussion that potential invalid data structures are not of immediate concern to the engineers, but espite this the engineers had previous experiences with invalid data structures. They explained that the result was a high amount of time invest in debugging the software, but from their perspective these issues should ideally be handled by their backend engineers or the client engineers.

{"break":true}