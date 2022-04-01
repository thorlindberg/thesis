Introduction
---

As the prevalence of smartphones and internet of things (IoT) devices increasingly dictate the human experience, the software industry has pivoted towards connectivity-centered development. The common mobile software application is fully reliant on an internet connection, acting almost exclusively as a recipient (client) for transmitted data. These clients typically serve purposes such as social media communication, content consumption, user account access etc.

This reliance on connectivity means the software becomes a front-end client in a distributed computing system, with the logistical and computational responsibilities assigned and distributed to and among a network of devices. With this reality comes a series of architectural considerations and decisions that inform how and to what extent the front-end software is designed, developed and maintained.

A main feature of distributed systems is their ability to handle hardware and software heterogeneity, as information must travel digitally and physically across layers of applications, networks, and hardware. Heterogeneity manifests as differences in protocols, programming language features, and data formats. Heterogeneous systems must have the ability to transmit and parse information across layers, despite these differences. As data transmission has become ubiquitous, it is a great starting point for designing new software. The [vocabulary section](#vocabulary) explores the landscape of distribution and data transmission in-depth, establishing a vocabulary of terminology used for analysing and discussing the results of this project's experiment.

Existing research predominantly evaluates data serialisation formats from a feature, performance, and efficiency perspective. While these aspects are quantifiable, measurable, and potentially motivate decisions for designing large-scale data transmission systems, they fail to illustrate the conditions that inform the choice of data format for the common software development team. As performance differences are negligible, these conditions are likely more abstract and extend beyond development into the organisational structures and division of responsibilities in the team and between levels of developers.

The contribution of this paper is an exploration into the balance between readability and safety in the JavaScript Object Notation (JSON), in order to propose a derived extensible format informed by the value perspective of developers. This proposed format, conceptualised as the Type-Extensible Object Notation (TXON), is paired with a translation layer written in JavaScript, to provide full compatibility with JSON data and language parsers. TXON aims to offer both a human-readable yet safe and extensible format, as well as extensible types in the data.

There exists a rich history of design philosophy in programming language and data format syntax, features, and architecture. It is crucial to preface the project with this historical perspective, as the project has to build upon firmly established structures and rigid practices. This contextualisation ensures that decisions made for the project are grounded in the realities of software development, and thus takes into consideration any barriers to implementation of the proposal.

Design philosophy extends to software development, as human-readable code becomes a tool for collaboration and communication rather than a set of machine instructions. The human perspective is at the core of programming languages, as their aim is to be accessible and perceivable to humans. Programming code is eventually translated to assembly and then machine code, before it is executed by the processing unit. The implications are that programming language design should facilitate and motivate efficiency from a human perspective, in the interplay between man and machine.

{"cite":"martin2018clean"} provides instructions on _architecting clean software_. His approach is grounded in a shared historical perspective of software segmentation. He defines _clean code_ as concise communication of purpose and flexibility to modifications {"citep":"martin2018clean","page":"310"}. He defines _clean architecture_ as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies {"citep":"martin2018clean","page":"196"}.

{"fig":"cleanarchitecture","url":"./figures/cleanarchitecture.jpg","caption":"The clean architecture."}

As seen in figure {"ref":"cleanarchitecture"}, this division results in four types of layers, guided by the various types of business rules and internal or external dependencies. This fragmentation of components facilitates the independent development, testing and evolution of the software layers. This philosophical perspective on software illustrates the importance of design in software, as system architecture can either motivate or inhibit developers from achieving their desired design goals.

XML (eXtensible Markup Language) is...

JavaScript Object Notation (JSON) is...

{"cite":"charmaz2006constructing"} defines a qualitative research perspective referred to as _Grounded Theory_. While this is a set of methodologies, it is also a general approach to conducting research and analysing the qualitative results of interviewing. From her perspective, qualitative data is gathered and processed for the purpose of guiding and grounding research decisions, rather than to qualitatively evaluate a hypothesis. This approach does not have to exist in a vacuum, and can instead guide the initial inquiry process in a research project. It is applicable to this project, as I approach the experimental development process for a value-oriented perspective, where values are derived directly from interviews with developers.

{"cite":"norman2013design"} coined and popularised the term _User Experience_, as a lens through which we can view the design of objects. With his philosophy of cyclical perception, action and reflection, he established a conceptual framework that describes human interaction and how technology can accommodate our expectations. Communicating through code can be described as a _design goal_ of software development (and clean code), and thus it is pertinent to approach this project with an emphasis on how developer interaction with code shapes their experience.

{"cite":"buley2013user"} defines a methodological approach to researching users and designing from a user-centered perspective. Her framework of _personas_ is a tool for quantitatively assessing potential users, and then deriving profiles for user evaluation during design ideation. A persona is at a surface level analogous to a stakeholder in a stakeholder analysis, which describes the organisational hierarchy and relationship between participants. The difference is that personas are less relationship-centered, as they emphasise how differing backgrounds and perspectives can inform usage, and the experience derived from interaction. Personas are created by identifying, for each type of user, their needs, values, goals, frustrations, and desires {"citep":"buley2013user","page":"132"}.

{"fig":"persona","url":"./figures/persona.pdf","caption":"A complete persona."}

As seen in figure {"ref":"persona"}, the persona represents a fictive person derived from real information on users. It is crucial that the persona does not represent a real person, as the goal is not to design for a specific person, but for personas to represent multiple and potentially conflicting perspectives.

The following [implementation section](#implementation) presents the company I collaborate with and their _implementation case_, which lays the foundation for this project. Through organisation and system hierarchies and structures, as well as personas, this section explores perspectives on working with serialised data, in relation to the proposal in this project.

**Problem statement**

Based on this information...

<br>