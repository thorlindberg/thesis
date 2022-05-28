{"sec":"Collaboration and Case Description"}

In this section I present my collaboration with the company and the specific case from which I source data samples and other material. As the company is kept anonymous, I present generic examples of data structures rather than confidential data samples. 

As seen in figure {"ref":"casedelivery"} the most represented deliverables across all published case-work reflects the departments at the company, as presented in figure {"ref":"companystructure"}. This only includes deliverables occuring in multiple cases, and there is greater variance in deliverables when considering single occurences.

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
    "Cases": {
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
}

@endjson
@enduml

{"fig":"casedelivery","caption":"Deliverables that occur in multiple case descriptions published by the contracted company."}

{"sub":"Client project and case"}

In my collaboration with the contracted company I am only involved with the engineering department, who are responsible for software development and coordinating backend engineering with the client. The deliverables for this client are: project management, iOS/Android development, backend development, and UI/UX design. This case is typical as its deliverables occur frequently across all published cases. 

Their client for this case provides both physical infrastructure and back-end maintenance for their product, but have contracted the company to develop a mobile application connecting users with their data. The client collects and stores the status of their products (e.g. charge state), and they track availability of their proprietary chargers to offer users a map of available chargers.

As the client relies so heavily on connecting users with their data, the software developed also primarily relies on data interchange. The company and I have agreed to produce a proposal for an improved data structure that guards against potential errors, by investigating the current data validation processes and how errors are handled in their systems and software architecture.

{"break":true}