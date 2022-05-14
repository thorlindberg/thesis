{"sec":"Case Description and Material"}

In this section I present my collaboration with the company and the specific case from which I source data samples and other material. As the company is kept anonymous, I present generic examples of data structures rather than confidential data samples. 

As seen in table {"ref":"casedelivery"} the most represented deliverables across all published case-work reflects the departments at the company, as presented in figure {"ref":"companystructure"}. This only includes deliverables occuring in multiple cases, and there is greater variance in deliverables when considering single occurences.

<table style="width:100%">
<tr><th><sub>Deliverable</sub></th><th><sub style="float: right">Cases</sub></th></tr>
<tr  style="padding-bottom:0"><td style="padding-bottom:0"><sub>iOS Development</sub></td><td style="padding-bottom:0"><sub style="float: right">23</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Android Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">18</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>UI/UX Design</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">19</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Project Management</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">16</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Quality Assurance (QA)</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">7</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Backend Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">6</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Business Development</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">4</sub></td></tr>
<tr style="padding-bottom:0;padding-top:0;border:none"><td style="padding-bottom:0;padding-top:0;border:none"><sub>Technical Leadership</sub></td><td style="padding-bottom:0;padding-top:0;border:none"><sub style="float: right">2</sub></td></tr>
</table>

{"tbl":"casedelivery","caption":"Deliverables that occur in multiple case descriptions published by the contracted company."}

{"sub":"Client project and case"}

In my collaboration with the contracted company I am only involved with the engineering department, who are responsible for software development and coordinating backend engineering with the client. The deliverables for this client are: project management, iOS/Android development, backend development, and UI/UX design. This case is typical as its deliverables occur frequently across all published cases. 

Their client for this case provides both physical infrastructure and back-end maintenance for their product, but have contracted the company to develop a mobile application connecting users with their data. The client collects and stores the status of their products (e.g. charge state), and they track availability of their proprietary chargers to offer users a map of available chargers.

As the client relies so heavily on connecting users with their data, the software developed also primarily relies on data interchange. The company and I have agreed to produce a proposal for an improved data structure that guards against potential errors, by investigating the current data validation processes and how errors are handled in their systems and software architecture.

{"break":true}

{"sub":"Source code and sample data"}

For this project the company engineers have chosen to utilise the Continuous Integration and Continuous Development (CI/CD) platform "GitLab" as their backend. As users attempt to authenticate themselves within the developed software application, a request for information is sent to the client backend. If authentication succeeds, the information is forwarded to the company backend (GitLab), wherein the information is validated with TypeScript and forwarded as a response to the application. This flow of information is illustrated in figure {"ref":"informationflow"}.

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

frame Application {
    [View Model] -left-> [View (UI)]
    frame Model {
        [HTTP] -left-> [Protocol]
        [Protocol] -left-> [Object]
    }
}

frame Client  {
    [Database]
}

frame Developer {
    frame Backend {
        [GitLab]
    }
}

[View (UI)] -up-> [HTTP]
[Object] -left-> [View Model]
[HTTP] -right-> [Database]
[Database] -down-> [GitLab]
[GitLab] -left-> [View (UI)]

@enduml

{"fig":"informationflow","caption":"Flow of information from the initial request sent from application to backend, to a response from the data validation backend (GitLab)."}

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