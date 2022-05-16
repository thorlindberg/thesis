{"sub":"System architecture and information flow"}

For this project the company engineers have chosen to utilise the Continuous Integration and Continuous Development (CI/CD) platform "GitLab" as their backend. The purpose of this backend is not to store data, as the client is responsible for storing information on users and products, but to validate that interchanged data structures are compatible with the structures defined in the developed software applications.

As illustrated in figure {"ref":"informationflow"} the flow of information in this system involves users, the client and the company. When users attempt to authenticate themselves within the software application, a request for information is sent to the client backend. If authentication succeeds, the information is forwarded to the company backend (GitLab), wherein the information is validated based on requirements defined in TypeScript. If the information meets all specified requirements it is returned as a response to the application. When information is received by the application, its model attempts to cast correctly specified objects and forward them to the view model, which presents them in the interface.

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
        [HTTP response] -left-> [Protocol]
        [Protocol] -up-> [Class]
    }
}

[Protocol] -left-> [Observable]
[Observable] -up-> [User Interface]
[User Interface] -right-> [Class]

[Class] -right-> [HTTP request]
[HTTP request] -right-> [Database]
[Database] -down-> [GitLab]
[GitLab] -left-> [HTTP response]

@enduml

{"fig":"informationflow","caption":"Flow of information from the initial request sent from application to backend, to a response from the data validation backend (GitLab)."}

The implication of this system architecture is that while software design necessitates strict data structure requirements, it is not the company developing the software that decides how its data is structured. The client maintains full control of their user and product data, and as such the developers must negotiate data structures with the client to avoid crashes. At the application level the software must guard against errors by only casting responses that conform to their expected data structures. The current approach of validating data through CI/CD before receiving it lessens the burden on the developers, but it is not infallable as it is not evident why a received data structure is different than expected. This situation directly inspired me to investigate how the current data structures could be re-formatted with a new syntax, to explicitly specify the intent of the data.

{"break":true}