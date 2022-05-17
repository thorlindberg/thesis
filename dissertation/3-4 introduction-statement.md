{"sec":"Problem Statement"}

In this section I present my statement for how to approach the given problem...

There exists a rich history of design philosophy in programming language and data format syntax, features, and architecture. It is crucial to preface the project with this historical perspective, as the project has to build upon firmly established structures and rigid practices. This contextualisation ensures that decisions made for the project are grounded in the realities of software development, and thus takes into consideration any barriers to implementation of the proposal.

Design philosophy extends to software development, as human-readable code becomes a tool for collaboration and communication rather than a set of machine instructions. The human perspective is at the core of programming languages, as their aim is to be accessible and perceivable to humans. Programming code is eventually translated to assembly and then machine code, before it is executed by the processing unit. The implications are that programming language design should facilitate and motivate efficiency from a human perspective, in the interplay between man and machine.

{"cite":"martin2018clean"} provides instructions on "architecting clean software". His approach is grounded in a shared historical perspective of software segmentation. He defines "clean code" as concise communication of purpose and flexibility to modifications {"citep":"martin2018clean","page":"310"}. He defines "clean architecture" as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies {"citep":"martin2018clean","page":"196"}.

{"fig":"cleanarchitecture","url":"figures/cleanarchitecture.jpg","caption":"The clean architecture.","width":"100%"}

As seen in figure {"ref":"cleanarchitecture"}, this division results in four types of layers, guided by the various types of business rules and internal or external dependencies. This fragmentation of components facilitates the independent development, testing and evolution of the software layers. This philosophical perspective on software illustrates the importance of design in software, as system architecture can either motivate or inhibit developers from achieving their desired design goals.

XML (eXtensible Markup Language) is...

JavaScript Object Notation (JSON) is...

{"cite":"charmaz2006constructing"} defines a qualitative research perspective referred to as "Grounded Theory". While this is a set of methodologies, it is also a general approach to conducting research and analysing the qualitative results of interviewing. From her perspective, qualitative data is gathered and processed for the purpose of guiding and grounding research decisions, rather than to qualitatively evaluate a hypothesis. This approach does not have to exist in a vacuum, and can instead guide the initial inquiry process in a research project. It is applicable to this project, as I approach the experimental development process for a value-oriented perspective, where values are derived directly from interviews with developers.

{"cite":"norman2013design"} coined and popularised the term "User Experience", as a lens through which we can view the design of objects. With his philosophy of cyclical perception, action and reflection, he established a conceptual framework that describes human interaction and how technology can accommodate our expectations. Communicating through code can be described as a "design goal" of software development (and clean code), and thus it is pertinent to approach this project with an emphasis on how developer interaction with code shapes their experience.

{"cite":"buley2013user"} defines a methodological approach to researching users and designing from a user-centered perspective. Her framework of "personas" is a tool for quantitatively assessing potential users, and then deriving profiles for user evaluation during design ideation. A persona is at a surface level analogous to a stakeholder in a stakeholder analysis, which describes the organisational hierarchy and relationship between participants. The difference is that personas are less relationship-centered, as they emphasise how differing backgrounds and perspectives can inform usage, and the experience derived from interaction. Personas are created by identifying, for each type of user, their needs, values, goals, frustrations, and desires {"citep":"buley2013user","page":"132"}.

{"fig":"persona","url":"figures/persona.png","caption":"A complete persona.","width":"100%"}

As seen in figure {"ref":"persona"}, the persona represents a fictive person derived from real information on users. It is crucial that the persona does not represent a real person, as the goal is not to design for a specific person, but for personas to represent multiple and potentially conflicting perspectives.

The following chapter presents the company I collaborate with and their implementation case, which lays the foundation for this project. Through organisation and system hierarchies and structures, as well as personas, this section explores perspectives on working with serialised data, in relation to the proposal in this project.

{"break":true}