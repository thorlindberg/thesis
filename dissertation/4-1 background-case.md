{"sec":"Case-work and Source Material"}

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

As the client relies so heavily on connecting users with their data, the software developed also primarily relies on data interchange. The company and I have agreed to produce a proposal for an improved data format that guards against potential errors, by investigating the current data validation proccesses and how errors are handled in their systems and software architecture.

{"break":true}

{"sub":"Source material and sample data"}

[ Text ]

---

As seen in figure {"ref":"organisation"}, there are two identifiable hierarchies that form a relationship between case partner and development. The top half of this diagram flows from partner to a formulated case. The bottom half of this diagram flows from developer to a product delivery.

{"fig":"organisation","url":"figures/organisation.png","caption":"Hierarchical and structural relationship between development company and case partners.","width":"100%"}

The structure of the partner company informs how they formulate the case offered to the developers. They are also responsible for maintenance of a back-end, delivering customer data to the client developed in the delivery.

The structure of the development company informs how they plan and execute on a case. They are not responsible for the back-end, and thus have to negotiate infrastructure plans and changes with their partners. This presents challenges to their autonomy, hierarchy and responsibilities.

{"sub":"Case-work and delivery"}

[ A typical case delivery by this company? ]

<br>

{"sub":"Architecture and data samples"}

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