**Type-Extensible Object Notation: JSON with Syntax for Types**
---

_Master's Thesis in Information Technology_

<br>

Thor Wessel Lindberg
<br>
Department of Digital Design
<br>
IT-University of Copenhagen, Denmark
<br>
[mawl@itu.dk](mailto:mawl@itu.dk)

Dr. Jørgen Staunstrup
<br>
Department of Computer Science
<br>
IT-University of Copenhagen, Denmark
<br>
[jst@itu.dk](mailto:jst@itu.dk)

<br>

<b><i>Abstract—</i></b>Object-oriented programming allows developers to logically segment code, but as data is transmitted between languages and distributed across heterogeneous systems, these objects need to be serialised and deserialised. Heterogeneity creates a multitude of potential validation conflicts, as data formats must balance human readability with safety. This report builds on existing research into data formats for object serialisation, by suggesting an extensible syntax on top of the JavaScript Object Notation (JSON), with an additional backwards-compatibility layer.

<br><div style='page-break-after:always'></div>

Table of Contents
---


[1&emsp;Introduction](#introduction)
<br>

&emsp;[1.1&emsp;Problem statement](#problemstatement)
<br>

[2&emsp;Implementation](#implementation)
<br>

&emsp;[2.1&emsp;Organisational structure and stakeholders](#organisationalstructureandstakeholders)
<br>
&emsp;[2.2&emsp;Data provided to me](#dataprovidedtome)
<br>
&emsp;[2.3&emsp;Information](#information)
<br>
&emsp;[2.4&emsp;Guarding](#guarding)
<br>
&emsp;[2.5&emsp;Perspectives on serialised data](#perspectivesonserialiseddata)
<br>
&emsp;[2.6&emsp;How-might-we](#how-might-we)
<br>

[3&emsp;Vocabulary](#vocabulary)
<br>

&emsp;[3.1&emsp;Distributed Computing](#distributedcomputing)
<br>
&emsp;[3.2&emsp;Data Transmission](#datatransmission)
<br>
&emsp;[3.3&emsp;Data Parsing](#dataparsing)
<br>
&emsp;[3.4&emsp;Typesetting](#typesetting)
<br>
&emsp;[3.5&emsp;Backwards Compatibility](#backwardscompatibility)
<br>
&emsp;[3.6&emsp;Language Extensibility](#languageextensibility)
<br>

[4&emsp;Related Work](#relatedwork)
<br>

[5&emsp;Experiment Setup](#experimentsetup)
<br>

&emsp;[5.1&emsp;Syntax for extended types](#syntaxforextendedtypes)
<br>
&emsp;[5.2&emsp;Syntax for type extensions](#syntaxfortypeextensions)
<br>
&emsp;[5.3&emsp;Validation library and tests](#validationlibraryandtests)
<br>
&emsp;[5.4&emsp;Implementation and evaluation strategy](#implementationandevaluationstrategy)
<br>

[6&emsp;Results](#results)
<br>

[7&emsp;Discussion](#discussion)
<br>

[8&emsp;Future Work](#futurework)
<br>

[9&emsp;Conclusion](#conclusion)
<br>

[10&emsp;Bibliography](#bibliography)

<br><div style='page-break-after:always'></div>

<span id="introduction"></span>1&emsp;Introduction
---

As the prevalence of smartphones and internet of things (IoT) devices increasingly dictate the human experience, the software industry has pivoted towards connectivity-centered development. The common mobile software application is fully reliant on an internet connection, acting almost exclusively as a recipient (client) for transmitted data. These clients typically serve purposes such as social media communication, content consumption, user account access etc.

This reliance on connectivity means the software becomes a front-end client in a distributed computing system, with the logistical and computational responsibilities assigned and distributed to and among a network of devices. With this reality comes a series of architectural considerations and decisions that inform how and to what extent the front-end software is designed, developed and maintained.

A main feature of distributed systems is their ability to handle hardware and software heterogeneity, as information must travel digitally and physically across layers of applications, networks, and hardware. Heterogeneity manifests as differences in protocols, programming language features, and data formats. Heterogeneous systems must have the ability to transmit and parse information across layers, despite these differences. As data transmission has become ubiquitous, it is a great starting point for designing new software. The [vocabulary section](#vocabulary) explores the landscape of distribution and data transmission in-depth, establishing a vocabulary of terminology used for analysing and discussing the results of this project's experiment.

Existing research predominantly evaluates data serialisation formats from a feature, performance, and efficiency perspective. While these aspects are quantifiable, measurable, and potentially motivate decisions for designing large-scale data transmission systems, they fail to illustrate the conditions that inform the choice of data format for the common software development team. As performance differences are negligible, these conditions are likely more abstract and extend beyond development into the organisational structures and division of responsibilities in the team and between levels of developers.

The contribution of this paper is an exploration into the balance between readability and safety in the JavaScript Object Notation (JSON), in order to propose a derived extensible format informed by the value perspective of developers. This proposed format, conceptualised as the Type-Extensible Object Notation (TXON), is paired with a translation layer written in JavaScript, to provide full compatibility with JSON data and language parsers. TXON aims to offer both a human-readable yet safe and extensible format, as well as extensible types in the data.

There exists a rich history of design philosophy in programming language and data format syntax, features, and architecture. It is crucial to preface the project with this historical perspective, as the project has to build upon firmly established structures and rigid practices. This contextualisation ensures that decisions made for the project are grounded in the realities of software development, and thus takes into consideration any barriers to implementation of the proposal.

Design philosophy extends to software development, as human-readable code becomes a tool for collaboration and communication rather than a set of machine instructions. The human perspective is at the core of programming languages, as their aim is to be accessible and perceivable to humans. Programming code is eventually translated to assembly and then machine code, before it is executed by the processing unit. The implications are that programming language design should facilitate and motivate efficiency from a human perspective, in the interplay between man and machine.

[Martin, R.C. (2018)](#martin2018clean) provides instructions on _architecting clean software_. His approach is grounded in a shared historical perspective of software segmentation. He defines _clean code_ as concise communication of purpose and flexibility to modifications [(Martin, R.C., 2018, p. 310)](#martin2018clean). He defines _clean architecture_ as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies [(Martin, R.C., 2018, p. 196)](#martin2018clean).

<br>

<span id="cleanarchitecture"></span><img style="width:100%" src="./figures/cleanarchitecture.jpg"/>

Figure 1: The clean architecture.

<br>

As seen in [figure 1](#cleanarchitecture), this division results in four types of layers, guided by the various types of business rules and internal or external dependencies. This fragmentation of components facilitates the independent development, testing and evolution of the software layers. This philosophical perspective on software illustrates the importance of design in software, as system architecture can either motivate or inhibit developers from achieving their desired design goals.

XML (eXtensible Markup Language) is...

JavaScript Object Notation (JSON) is...

[Charmaz, Kathy (2006)](#charmaz2006constructing) defines a qualitative research perspective referred to as _Grounded Theory_. While this is a set of methodologies, it is also a general approach to conducting research and analysing the qualitative results of interviewing. From her perspective, qualitative data is gathered and processed for the purpose of guiding and grounding research decisions, rather than to qualitatively evaluate a hypothesis. This approach does not have to exist in a vacuum, and can instead guide the initial inquiry process in a research project. It is applicable to this project, as I approach the experimental development process for a value-oriented perspective, where values are derived directly from interviews with developers.

[Norman, Donald A. (2002)](#norman2013design) coined and popularised the term _User Experience_, as a lens through which we can view the design of objects. With his philosophy of cyclical perception, action and reflection, he established a conceptual framework that describes human interaction and how technology can accommodate our expectations. Communicating through code can be described as a _design goal_ of software development (and clean code), and thus it is pertinent to approach this project with an emphasis on how developer interaction with code shapes their experience.

[Buley, L. (2013)](#buley2013user) defines a methodological approach to researching users and designing from a user-centered perspective. Her framework of _personas_ is a tool for quantitatively assessing potential users, and then deriving profiles for user evaluation during design ideation. A persona is at a surface level analogous to a stakeholder in a stakeholder analysis, which describes the organisational hierarchy and relationship between participants. The difference is that personas are less relationship-centered, as they emphasise how differing backgrounds and perspectives can inform usage, and the experience derived from interaction. Personas are created by identifying, for each type of user, their needs, values, goals, frustrations, and desires [(Buley, L., 2013, p. 132)](#buley2013user).

<br>

<span id="persona"></span><img style="width:100%" src="./figures/persona.png"/>

Figure 2: A complete persona.

<br>

As seen in [figure 2](#persona), the persona represents a fictive person derived from real information on users. It is crucial that the persona does not represent a real person, as the goal is not to design for a specific person, but for personas to represent multiple and potentially conflicting perspectives.

The following [implementation section](#implementation) presents the company I collaborate with and their _implementation case_, which lays the foundation for this project. Through organisation and system hierarchies and structures, as well as personas, this section explores perspectives on working with serialised data, in relation to the proposal in this project.

<span id="problemstatement"></span>**1.1&emsp;Problem statement**

Based on this information...

<br><div style='page-break-after:always'></div>

<span id="implementation"></span>2&emsp;Implementation
---

In this project I've chosen to collaborate with a company that specialises in native mobile application development. Their identity is kept anonymous, so rather than include confidential data or code samples, I have chosen to derive generic examples from the material they have provided me.

This company holds a unique perspective relative to the landscape of software development in Copenhagen, where return on investment (ROI) in my optics is valued above quality. Rather than take the typical multi-platform approach, using a platform-neutral framework like _React Native_, they maintain independent development teams for each platform, and they work exclusively with native code. They maintain an Android team utilising _Flutter_ and an iOS team utilising _Swift_. This nets them hardware efficiency and performance advantages, at the cost of operating and aligning two parallel developer teams working on the same projects.

In the following I illustrate the relationship between this company (_development company_) and their partners. This serves as a starting point for deducing which perspectives are held on working with data.

<span id="organisationalstructureandstakeholders"></span>**2.1&emsp;Organisational structure and stakeholders**

As seen in [figure 3](#organisation), there are two identifiable hierarchies that form a relationship between case partner and development. The top half of this diagram flows from partner to a formulated case. The bottom half of this diagram flows from developer to a product delivery.

<br>

<span id="organisation"></span><img style="width:100%" src="./figures/organisation.png"/>

Figure 3: Hierarchical and structural relationship between development company and case partners.

<br>

The structure of the partner company informs how they formulate the case offered to the developers. They are also responsible for maintenance of a back-end, delivering customer data to the client developed in the delivery.

The structure of the development company informs how they plan and execute on a case. They are not responsible for the back-end, and thus have to negotiate infrastructure plans and changes with their partners. This presents challenges to their autonomy, hierarchy and responsibilities.

<span id="dataprovidedtome"></span>**2.2&emsp;Data provided to me**

...

<br>

---

<br>

<span id="information"></span>**2.3&emsp;Information**

Data records information by structuring it for hierarchy and relativity. Directional data can be represented through a 1, 2 or 3-dimensional matrix, or mapped to an object or n-dimensional matrix of objects. This subsection presents various data structures and compares them for serialisation.

<br>

Objects from information -> serialisation -> deserialisation.

- Structure as Matrix vs Object (JS)
- Serialisation to JSON
- Parsing to Object (JS) vs Codable (S)

<br>

1-dimensional matrix

```
// hourly temperature on given day and location

temperatures = [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
```

<br>

2-dimensional matrix

```
// hourly temperature by day on given week and location

temperatures = [
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
    [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
]
```

<br>

3-dimensional matrix

```
// three weeks of hourly temperature by day on given week and location

temperatures = [
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ],
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ],
    [
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0],
        [-1,-1,-2,-2,-1,-1,0,0,1,2,4,4,5,5,6,7,8,8,7,5,4,3,1,0]
    ]
]
```

<br>

object of n-th dimensional matrix 

```
// n weeks of hourly temperature by day on given week and location

{
    temperatures: [
        [
            {
                day: "monday",
                temperatures: {
                    0: -1, 1: -1, 2: -2, 3: -2, 4: -1, 5: -1,
                    6: 0, 7: 0, 8: 1, 9: 2, 10: 4, 11: 4,
                    12: 5, 13: 5, 14: 6, 15: 7, 16: 8, 17: 8,
                    18: 7, 19: 5, 20: 4, 21: 3, 22: 1, 23: 0
                }
            },
            {
                day: "tuesday",
                temperatures: {
                    0: -1, 1: -1, 2: -2, 3: -2, 4: -1, 5: -1,
                    6: 0, 7: 0, 8: 1, 9: 2, 10: 4, 11: 4,
                    12: 5, 13: 5, 14: 6, 15: 7, 16: 8, 17: 8,
                    18: 7, 19: 5, 20: 4, 21: 3, 22: 1, 23: 0
                }
            }
            ...
        ],
        ...
    ]
}
```

<br>

JavaScript enumeration

```
function Item(name, category) {

    const types = {
        undefined: "undefined",
        string: "string",
        number: "number",
        boolean: "boolean",
        object: "object",
        nil: "null"
    }

    this.name = new function() {
        this.type = types.string
        this.enum = null
        if (typeof name == this.type) {
            this.value = name
        } else {
            throw new TypeError(`type mismatch`)
        }
    }

    this.category = new function() {

        this.type = types.string
        this.enum = categories

        const hasProperty = this.enum.hasOwnProperty(category)
        const hasValue = Object.values(this.enum).includes(category)

        if (hasProperty) {
            this.value = this.enum[category]
        } else if (hasValue) {
            this.value = category
        } else {
            throw new Error(`not found in enum`)
        }

    }

}

const categories = {
    largeDrink: "🍺",
    smallDrink: "🥤",
    meat: "🥩",
    plant: "🌱",
    dairy: "🧀",
    cake: "🍪",
    dough: "🍞"
}

const itemsByKey = [
    new Item("Diet Coke (1.5L)", "largeDrink"),
    new Item("Fanta (0.5L)", "smallDrink"),
    new Item("Olives", "plant")
]

const itemsByValue = [
    new Item("Diet Coke (1.5L)", categories.largeDrink),
    new Item("Fanta (0.5L)", categories.smallDrink),
    new Item("Olives", categories.plant)
]
```

<br>

---

<br>

<span id="guarding"></span>**2.4&emsp;Guarding**

<br>

- Defensive mechanisms
- Validation of types
- Casting in languages

<br>

```
foo = Int(12)
```

<br>

---

<br>

<span id="perspectivesonserialiseddata"></span>**2.5&emsp;Perspectives on serialised data**

This section presents the personas derived from interviews with each development team at the company, for the purpose of taking value-oriented design decisions derived from their perspectives. As these employees are coworkers, their perspectives are grounded in shared experiences, yet their unique deviations highlight how serialised data has varying implications on work practices.

<span id="how-might-we"></span>**2.6&emsp;How-might-we**

...

<br><div style='page-break-after:always'></div>

<span id="vocabulary"></span>3&emsp;Vocabulary
---

This section explores fundamental principles of the system architectures that support distribution of serialised data. It serves to establish a vocabulary for communication in computing, as well as to provide background knowledge on how data becomes distributed, and motivate my choices of systems.

<span id="distributedcomputing"></span>**3.1&emsp;Distributed Computing**

[Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed) define _distributed systems_ as "a collection of independent entities that cooperate to solve a problem that cannot be individually solved." They characterise distributed computing as  "a collection of mostly autonomous processors communicating over a communication network". They identify common features of distributed systems, notably a lack of shared resources which necessitates communication, autonomy and heterogeneity.

In characterising distributed systems, [Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed) raise the notion that the physical differences of entities, and variation in their resources, creates a reliance on distributed communication. Distributed resources, particularly the absence of shared memory, implies an inherent asynchrony between entities. This means that each individual entity must act autonomously, while collaborating with and distributing tasks among the entities within the system.

As seen in [figure 4](#networkcomms), a distributed system achieves asynchronous collaboration through a communication network, either a wide (WAN) area or local (LAN) area network, depending on the geography of the system. Each entity in the system consists of at least one processor (P) with its own solitary memory (M), providing the entity computational autonomy. This network structure creates the potential for both hardware and software heterogeneity, which necessitates coordination and distribution of tasks and responsibilities.

<br>

<span id="networkcomms"></span><img style="width:100%" src="./figures/networkcomms.png"/>

Figure 4: A distributed system connects processors by a communication network.

<br>

_Hardware heterogeneity_ manifests as a variation in physical resources and thus implicitly a variation in computational capability. This necessitates a variance in entity responsibilities, as each individual entity is... This can of course be a cognitive decision made by system architects and engineers, facilitating a more efficient distribution, as computational tasks are inherently varied in requirements.

_Software heterogeneity_ manifests as a variation in programming languages and frameworks. Distributed systems use a layered architecture, with a middle layer driving the software distribution, the so-called "middleware." As seen in [figure 5](#processinteraction), the middleware layer exists as an addition to the protocol-oriented application layer, which handles the communication protocols such as _HTTP_. Additionally, as data flows in a heterogeneous distributed system, it must adhere to a standardised and yet interoperable format, modelled on the software systems used in the network.

<br>

<span id="processinteraction"></span><img style="width:100%" src="./figures/processinteraction.png"/>

Figure 5: Interaction of the software components at each processor.

<br>

At this point, you are probably wondering _why distribution is relevant_ to this project, and _how it pertains to data serialisation_. [Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed) define various potential requirements of a system, that would motivate heterogeneous distribution. As data serialisation is typically utilised for distributed communication, it is not inherently performance- or scalability-oriented, but it is inherently distributed and geographically remote. The implication is that the inherent distributed nature of serialised data exchange necessitates the use of a distributed system, and not vice versa.

Given the inherent nature of serialised data exchange, and the ubiquity of distributed computing systems, the design of such systems informs our approach to communicating across them. It should be noted that systems do not exist in a vacuum, and thus system should be contextually designed based on market forces. System designers must balance or choose between industry standard protocols, which maximise interoperability, and the technically best solutions, which require more control and closed source development.

<br>

<span id="pubsubsystem"></span><img style="width:100%" src="./figures/pubsubsystem.png"/>

Figure 6: Components of a _publish-subscribe_ system.

<br>

[Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed) identify a set of design challenges applicable to the traditional server-client model of distributed systems. An _Applications Programming Interface (API)_ enables the distributed system to communicate internally and more importantly externally, maximising the adoption of system services by outside forces. It introduces the challenge of _transparency_, as the system should be accessible without revealing its internal operations (resource [re]location, replication, concurrency, failure handling etc.) and implementation policies.

[Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed) describe several applications of distributed computing, of which the publish-subscribe model of content distribution is particularly relevant to this project, because it is the most prominent server-client system. In this model, information is filtered by relevancy, meaning the server distributes only the requested information. As argued by [Kshemkalyani, A. and Singhal, M. (2011)](#kshemkalyani2011distributed), information distribution requires three types of mechanisms: distribution (publishing), specific requests (subscribe), and the ability to manipulate information based on a request before publishing.

In the following section on _the transmission of data in distributed computing systems_, I present an in-depth illustration of how publish-subscribe models facilitate distribution of data-driven systems.

<span id="datatransmission"></span>**3.2&emsp;Data Transmission**

This section explores the standards and methods for distributed communication through a publish-subscribe service. It serves as background knowledge on how serialised data is distributed, to illustrate how our choice of data serialisation library is informed by the system model.

"cite":"tarkoma2012publish"} defines _publish-subscribe (pub/sub)_ as the efficient and timely selective communication of events between participating components. He relates his conceptual perspective to how humans selectively focus on (or "subscribe" to) probable sources of interesting events.

He notes that participants in this type of distributed system would appear sourceless to each other, and thus they publish without direction. This introduces the crucial element of time beyond the typical asynchrony, as participants subscribe based on the probability that information will be communicated, even if no information yet exists. He contrasts this with database systems, wherein information is retrieved through queries, aimed at previously communicated information, rather than aimed at future communication.

[Tarkoma, S. (2012)](#tarkoma2012publish) illustrates the structural components of a pub/sub system through [figure 6](#pubsubsystem), as well as how the participants interact through events and notifications. Publishers and subscribers are referred to as the _main entities_, and publishers are the starting point for the chain of events in the system. As a situation occurs, referred to as an _event_, the publisher detects it and publishes a notification to the service, also referred to as the _event message_. Events denote _discrete_ measurable changes in the _state_ of a situation. The pub/sub service handles the communication infrastructure, and subscribers must express interest in a publisher before an event.

The nature of this relationship between publishers and subscribers introduces coordination challenges, as publishers and subscribers must agree on event expectations before a situation occurs. The pub/sub system does not take responsibility for these challenges, as it can only set expectations but not solve conflicts. The system is only responsible for delivering the communicated event between publishers and their subscribers.

The system can take different approaches to communicating events between entities over a network. In the simplest form, a pub/sub system can communicate directly from publishers to subscribers, with publishers taking on responsibility for the transmission of events. As the network scales and increasingly more entities subscribe this approach become untenable, and responsibilities are instead delegated to an intermediary type of entity, referred to as _brokers_ or _pub/sub routers_.

In a _centralised_ pub/sub system, publishers either utilise a _one-to-one message protocol_, or they communicate events to a _broker server_, which forwards messages to its subscribers. In a _distributed_ pub/sub system events are never communicated directly between publishers and subscribers, and brokers are deployed as an _overlay network_ for routing. This overlay is an additional layer on-top of the network, allowing the brokers to collaboratively transmit events between entities, gaining the aforementioned advantages of a distributed system.

The network layer is one of multiple layers typical of networking systems. As seen in [figure 7](#ositcilayers), [Alani, M.M. (2014)](#alani2014guide) presents the 7 layers of the _Open Systems Interconnection_ (OSI) model relative to the 4 layers of the _Transmission Control Protocol_ (TCP). The OSI model abstracts networking systems into a conceptual framework, to describe and standardise the functional relationship between these layers. The TCI/IP model maps to the OSI model, but  

<br>

<span id="ositcilayers"></span><img style="width:100%" src="./figures/ositcilayers.png"/>

Figure 7: Comparison between layers in the OSI model and TCI/IP model, providing a standard communication architecture for distributed processing systems.

<br>

As data in a distributed systems flows from the software (_application layer_) to the hardware (_physical layer_), it is transformed by protocols which add additional information to the data. This process is referred to as _encapsulation_, and consists of _capsulation_ from the source host and _decapsulation_ towards the destination host. As data flows from source host's application layer and towards the physical layer, protocols prepend headers (leading information) and append trailers (trailing information) to the data. This additional information indicates the purpose of communicating the data and how it should be interpreted by the next layer.

<br>

<span id="dataflow"></span><img style="width:100%" src="./figures/endtoendflow.png"/>

Figure 8: End-to-end data flow.

<br>

<br>

<span id="encapsulation"></span><img style="width:100%" src="./figures/encapsulation.png"/>

Figure 9: Encapsulation with headers and trailers.

<br>

This transformation of distributed data has consequences for...

The take away from the OSI model is that as data flows through a distributed system, it is transformed by protocols utilised in the layers. These protocols inform the state of the data...

[Tarkoma, S. (2012)](#tarkoma2012publish) presents the _Representational State Transfer_ (REST) _Application Programming Interface_ (API), an architectural model and web technology for implementing publish-subscribe systems. This model consists of resources and representations of their state. _Resources_ are akin to objects, whose current or future state is represented in the system. State is altered through API requests sent by a client, which becomes transitional once it awaits at least one server response. As a web technology, REST is typically seen with the HTTP protocol.

...

<span id="dataparsing"></span>**3.3&emsp;Data Parsing**

...

<span id="typesetting"></span>**3.4&emsp;Typesetting**

...

<span id="backwardscompatibility"></span>**3.5&emsp;Backwards Compatibility**

...

<span id="languageextensibility"></span>**3.6&emsp;Language Extensibility**

...

<br><div style='page-break-after:always'></div>

<span id="relatedwork"></span>4&emsp;Related Work
---

Previous research provides a baseline for building upon existing knowledge through this project. This research typically focuses on documenting the object serialisation process or comparing serialisation formats in terms of features, efficiency, performance, file size, and programming language support.

[Goff, J et al. (2001)](#goff2001xmlserialization) document object serialisation processes with the eXtensible Markup Language (XML) format, assessing its implementation in heterogeneous distributed systems.

[Malin Eriksson and V. Hallberg (2011)](#eriksson2011comparison) compared the features of two plaintext object serialisation formats: JavaScript Object Notation (JSON) and YAML, then determined their efficiency by measuring performance and data storage size.
[Kazuaki Maeda (2011)](#kazuaki2011survey) surveyed object serialisation techniques, concluding that each technique had its advantages and disadvantages in the context it was applied.

[Tauro, Clarence et al. (2012)](#tauro2012binary) document implementation techniques for binary object serialisation in the programming languages: C++, Java and .NET. They conclude that binary serialisation is memory and bandwidth efficient.

[Sumaray, Audie and Makki, S. Kami (2012)](#sumaray2012efficiency) ...

[Vanura, Jan and Kriz, Pavel (2018)](#vanura2018performance) ...

<br><div style='page-break-after:always'></div>

<span id="experimentsetup"></span>5&emsp;Experiment Setup
---

This section presents the conditions defined to determine the advantages and disadvantages of the proposed superset JSON format. I provide examples of data, code and infrastructure necessary to construct an environment wherein the TXON syntax and features can be tested.

The success of this experiment is measured by the reduction in lines of code necessary in guarding data validity through defensive mechanisms. The criteria for success with this project is a reduction of at least 10%.

The examples presented in this section represent fetched temperature measurements. This decision was taken because weather data has direction, spatial/geographical localisation, and various representational states, in addition to general relevance for server-driven applications.

<br><div style='page-break-after:always'></div>

<span id="syntaxforextendedtypes"></span>**5.1&emsp;Syntax for extended types**

The JavaScript Object Notation (JSON) specifies a format for storing and transmitting JavaScript objects. This format allows the types: *string, number, object, array, boolean, and null*. It explicitly precludes the types: *function, date, and undefined*. A JSON object is represented as a string of curly brackets with properties inside.

```
{ "date": "28-10-2005" }
```

<br>

Inspired by type restrictions/facets in the XML/XSD format, it has become common to explictly embed the intended type as a string-value property in a JSON object. This approach to type annotation enables the recipient to validate the content type based on its intended type, but not beyond the types available in JSON.

```
<xs:restriction base="xs:string"></xs:restriction>
```
```
{ "type": "string", "date": "28-10-2005" }
```

<br>

The type limitations of JSON can be circumvented by deconstructing a property value into its components. A date property with a string-value could instead be represented as an object with properties for month, day, and year. Representing these properties with number-values would further clarify the intended values, but does not define a range of valid values. This limitation could be mitigated through properties further specifying a range of numbers.

As evidenced, embedding these restrictions in the data results in more specification properties than useful data. As the amount of information scales linearly, so too does the restrictions, while increasing the chance of syntax errors.

```
{
    "type": "number",
    "date": { "month": 10, "day": 28, "year": 2005 }
}
```

<br><div style='page-break-after:always'></div>

```
{
    "type": "number",
    "date": {
        "month": { "min": 1, "max": 31, "value": 10 },
        "day": { "min": 1, "max": 31, "value": 28 },
        "year": { "value": 2005 }
    }
}
```

<br>

As it turns out, this is not a unique problem, and thus the solution already exists: enumerations. This user-defined data type allows us to declare a specification once, and then instantiate it without repetition of requirements.

As enum (enumeration) is not a type allowed in the JSON format, I have chosen to leverage existing JSON types to construct an enum syntax. This decision informs the phrasing of TXON as an optional extension that could be ignored by JSON parsers, rather than an alternative format.

The enumerated date type is its own object, declaring the required properties and conformance instructions for property values. Notably these instructions do not have to be exhaustive, as properties can fit within strict value ranges or have no values at all (null). Instantiating a user-defined type is indifferent from providing the intended type as a string-value property, with the property name and value matching the corresponding specification.

```
{
    "type": "date",
    "enum": {
        "month": { "type": "number", "min": 1, "max": 12 },
        "day": { "type": "number", "min": 1, "max": 31 },
        "year": { "type": "number" }
    }
}
```
```
{ "type": "date", "month": 10, "day": 28, "year": 2005 }
```

<br>

It is common practice to nest JSON objects inside a top-level "data" property, to check if an API call has succesfully returned the expected result or thrown an error.

Inspired by this practice, I have decided to require an "init" property for extended type declarations. The information property (data) can contain extended types, which must conform to the declaration specified in the initialisation property (init).

<br><div style='page-break-after:always'></div>

```
{
    "init": {
        "date": {
            "month": { "type": "number", "min": 1, "max": 12 },
            "day": { "type": "number", "min": 1, "max": 31 },
            "year": { "type": "number" }
        }
    },
    "data": { ... }
}
```

<br>

Instances of extended types are themselves extensible, meaning they are not limited to only enumeration properties.

There are two valid approaches to instantiating extended types:

*Array of objects*. Each object contains the extended type value and its required properties. The advantage of this approach is that each object contains an extended type, but this also increases the chance of syntax errors. This is ideal when an array contains multiple types.

*Object with array of objects*. The object contains the extended type value and a "values" array containing objects with required properties. The advantage of this approach is that the extended type is instantitated once, resulting in an inferred type for objects in "values". This is ideal when an array only contains one type.

```
// array of objects

"data": {
    "dates": [
        { "type": "date", "month": 10, "day": 28, "year": 2005 }
    ]
}
```
```
// object with array of objects

"data": {
    "dates": {
        "type": "date",
        "values": [
            { "month": 10, "day": 28, "year": 2005 }
        ]
    }
}
```

<br><div style='page-break-after:always'></div>

An extended type property can be partially instatiated if a default value is given. The default can be any of the available JSON types, including *null*, or **another an extended type.**

Defaults are inserted in place of non-instantiated enumeration properties during validation. The value does not have to match the type given in the enumeration, but if it does it must conform to the given range (min to max). **--THIS RAISES THE QUESTION: SHOULD VALIDATION RETURN THE VALIDATED JSON???--**

If the default is of type *null*, the value is optional during validation. If no default is given or the default is of any other type, it is required during validation.

```
{
    "init": {
        "date": {
            "month": { "type": "number", "min": 1, "max": 12, "default": 1 },
            "day": { "type": "number", "min": 1, "max": 31 },
            "year": { "type": "number", "default": null }
        }
    },
    "data": { ... }
}
```
```
// only required "day" instantiated

"data": {
    "dates": [
        { "type": "date", "day": 10 }
    ]
}
```
```
// optional "year" not instantiated

"data": {
    "dates": [
        { "type": "date", "month": 10, "day": 28 }
    ]
}
```

<br><div style='page-break-after:always'></div>

<span id="syntaxfortypeextensions"></span>**5.2&emsp;Syntax for type extensions**

In addition to extending JSON with new types, you can also extend existing JSON types (*retroactive modeling*). Types can be extended with enumerations, which becomes available with the dot (.) syntax. Enumeration values must conform to the extended type, and the *null* type can not be extended.

Type extension reduces type-repetition in instantiation, and thus it is a better option when enumeration values conform to a single type. **--WHAT ABOUT NULL VALUES? CAN AN EXTENSION CONFORM TO A TYPE BUT HAVE DEFAULT OF NULL???--**

```
{
    "init": {
        "number.date": {
            "month": { "min": 1, "max": 12 },
            "day": { "min": 1, "max": 31 },
            "year": { "min": 0, "max": 3000 }
        },
        "number.temperature": {
            "celsius": { "min": -100, "max": 100 }
        }
    },
    "data": { ... }
}
```
```
"data": {
    "dates": [
        {
            "type": "number.date",
            "month": 10, "day": 28, "year": 2005
        }
    ],
    temperatures: [
        {
            "type": "number.temperature",
            "celsius": 30
        }
    ]
}
```

Type extensions are not limited to JSON types, as you are able to extend an extended type...

**--THIS IS EXPERIMENTAL--**

```
{
    "init": {
        "number.date": {
            "month": { "min": 1, "max": 12 }
        },
        "date.day": {
            "day": { "min": 1, "max": 31 }
        }
        "date.year": {
            "year": { "min": 0, "max": 3000 }
        }
    },
    "data": { ... }
}
```

<br><div style='page-break-after:always'></div>

<span id="validationlibraryandtests"></span>**5.3&emsp;Validation library and tests**

The txon.js library *handshakes* a JSON file, validating conformance of its "data" property to extended type declarations in its "init" property.

Handshaking is a property-function of TXON, and thus it is called as following.

```
const TXON = {
    handshake: (json) => { ... }
}
```
```
const validation = TXON.handshake('{ "init": ..., "data": ... }')
// validation.result == true || false
// validation.error == undefined || ["..."]
```

<br>

The function requires the parsing of a JSON object containing an "init" and "data" property, and will throw errors by storing them in a returned array **--will be changed to throwing 1 error when detected and immediately returning--**.

```
let object, initialiser, data
let error = []
```
```
// check: parsing JSON to JS
const hasJSON = true
if (hasJSON) {
    object = JSON.parse(json)
} else {
    error.push("ERROR: could not parse JSON")
    return { result: false, error: error }
}
```
```
// check: has .init prop
const hasInit = object.hasOwnProperty("init")
if (hasInit) {
    initialiser = object.init
} else {
    error.push("ERROR: .init property not found in JSON")
    return { result: false, error: error }
}
```
```
// check: has .data prop
const hasData = object.hasOwnProperty("data")
if (hasData) {
    data = object.data
} else {
    error.push("ERROR: .data property not found in JSON")
    return { result: false, error: error }
}
```

<br>

Objects with extended types can be instantiated at the top-level of the "data" property, or nested inside it, requiring their recursive detection.

If no extended types are instantiated, the return value will be true but throw an error noting this.

If extended types are instantiated but do not conform, the return value will be false and an error is thrown describing how and where the mismatch occoured during validation.

**--This code block is incomplete--**

```
// check: .data contains object[s] conforming to extended type[s] defined in .init
const checkConformance = (property) => {
    if (typeof property === "object") {
        Object.values(property).forEach(n => checkConformance(n))
    }
    if (typeof property === "array") {
        property.forEach(n => checkConformance(n))
    }
    const isExtendedType = property.hasOwnProperty("type") && property.hasOwnProperty("values") && initialiser.hasOwnProperty(property.type)
    if (isExtendedType) {
        property.values.forEach(value => {
            const objprops = Object.getOwnPropertyNames(value)
            const initprops = Object.getOwnPropertyNames(initialiser[property.type])
            const propsConform = objprops.toString() === initprops.toString() 
            if (!propsConform) {
                error.push(
                    `ERROR: properties of extended type do not conform to init. ${objprops} and ${initprops}`
                )
            } else {
                objprops.forEach(prop => {
                    const valuetype = typeof value[prop]
                    const inittype = initialiser[property.type][prop].type
                    const typesConform = valuetype === inittype
                    if (!typesConform) {
                        error.push(
                            `ERROR: value type does not conform to init. ${valuetype} and ${inittype}`
                        )
                    } else {
                        const hasEnum = initialiser[property.type][prop].hasOwnProperty("enum")
                        if (hasEnum) {
                            const objenum = Object.getOwnPropertyNames(initialiser[property.type][prop].enum)
                            const enumsConform = objenum.includes(value[prop])
                            if (!enumsConform) {
                                error.push(
                                    `ERROR: enum value does not conform to init. ${value[prop]} not in ${objenum}`
                                )
                            }
                        }
                    }
                })
            }
        })
    }
}
checkConformance(data)
```

<br>

Once validation is complete, a descripitive object is returned and can be interpreted by the recipient. **--will be changed to returning true, as this will not be reached if an error is returned during validation--**.

```
// return: false, error || true
return error.length ? { result: false, error: error } : { result: true }
```

<br><div style='page-break-after:always'></div>

<span id="implementationandevaluationstrategy"></span>**5.4&emsp;Implementation and evaluation strategy**

...

<br><div style='page-break-after:always'></div>

<span id="results"></span>6&emsp;Results
---

...

<br><div style='page-break-after:always'></div>

<span id="discussion"></span>7&emsp;Discussion
---

...

<br><div style='page-break-after:always'></div>

<span id="futurework"></span>8&emsp;Future Work
---

...

State-driven to server-driven UI. How can we optimise JSON for design workflows?

<br><div style='page-break-after:always'></div>

<span id="conclusion"></span>9&emsp;Conclusion
---

...

<br><div style='page-break-after:always'></div>

<span id="bibliography"></span>10&emsp;Bibliography
---

<span id="kshemkalyani2011distributed"></span>Kshemkalyani, A. and Singhal, M. (2011). _Distributed Computing: Principles, Algorithms, and Systems_. Cambridge University Press. [https://books.google.dk/books?id=G7SZ32dPuLgC](https://books.google.dk/books?id=G7SZ32dPuLgC).

<span id="kazuaki2011survey"></span>Kazuaki Maeda (2011). _Comparative Survey of Object Serialization Techniques and the Programming Supports_. World Academy of Science, Engineering and Technology. [https://publications.waset.org/15057/comparative-survey-of-object-serialization-techniques-and-the-programming-supports](https://publications.waset.org/15057/comparative-survey-of-object-serialization-techniques-and-the-programming-supports).

<span id="tauro2012binary"></span>Tauro, Clarence and Ganesan, N and Mishra, Saumya and Bhagwat, Anupama (2012). _Article: Object Serialization: A Study of Techniques of Implementing Binary Serialization in C++, Java and .NET_. International Journal of Computer Applications. [https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.685.1077&rep=rep1&type=pdf](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.685.1077&rep=rep1&type=pdf).

<span id="eriksson2011comparison"></span>Malin Eriksson and V. Hallberg (2011). _Comparison between JSON and YAML for Data Serialization_. . [https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.472.5744&rep=rep1&type=pdf](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.472.5744&rep=rep1&type=pdf).

<span id="vanura2018performance"></span>Vanura, Jan and Kriz, Pavel (2018). _Performance Evaluation of Java, JavaScript and PHP Serialization Libraries for XML, JSON and Binary Formats_. . [https://www.researchgate.net/publication/325829004_Perfomance_Evaluation_of_Java_JavaScript_and_PHP_Serialization_Libraries_for_XML_JSON_and_Binary_Formats](https://www.researchgate.net/publication/325829004_Perfomance_Evaluation_of_Java_JavaScript_and_PHP_Serialization_Libraries_for_XML_JSON_and_Binary_Formats).

<span id="sumaray2012efficiency"></span>Sumaray, Audie and Makki, S. Kami (2012). _A Comparison of Data Serialization Formats for Optimal Efficiency on a Mobile Platform_. Association for Computing Machinery. [https://dl.acm.org/doi/abs/10.1145/2184751.2184810?casa_token=bdZ6IE8_tAEAAAAA:JrS60mJemsuBluBQN4YVQsskxRLo-Ve14ljG4bwtIkaPtBJ-V-TE3QFLKlNBcu2LuVjxptSo_wh](https://dl.acm.org/doi/abs/10.1145/2184751.2184810?casa_token=bdZ6IE8_tAEAAAAA:JrS60mJemsuBluBQN4YVQsskxRLo-Ve14ljG4bwtIkaPtBJ-V-TE3QFLKlNBcu2LuVjxptSo_wh).

<span id="goff2001xmlserialization"></span>Goff, J and Bhatti, N. and Hassan, Wassem and Kovács, Z and Martin, P. and Mcclatchey, Richard and Stockinger, Heinz and Willers, Ian (2001). _Object Serialization and Deserialization Using XML_. Association for Computing Machinery. [https://www.researchgate.net/publication/46276571_Object_Serialization_and_Deserialization_Using_XML](https://www.researchgate.net/publication/46276571_Object_Serialization_and_Deserialization_Using_XML).

<span id="tarkoma2012publish"></span>Tarkoma, S. (2012). _Publish / Subscribe Systems: Design and Principles_. Wiley. [https://books.google.dk/books?id=iLGzgqi5JPgC](https://books.google.dk/books?id=iLGzgqi5JPgC).

<span id="alani2014guide"></span>Alani, M.M. (2014). _Guide to OSI and TCP/IP Models_. Springer International Publishing. [https://books.google.dk/books?id=PRi5BQAAQBAJ](https://books.google.dk/books?id=PRi5BQAAQBAJ).

<span id="martin2018clean"></span>Martin, R.C. (2018). _Clean Architecture: A Craftsman's Guide to Software Structure and Design_. Prentice Hall. [https://books.google.dk/books?id=8ngAkAEACAAJ](https://books.google.dk/books?id=8ngAkAEACAAJ).

<span id="charmaz2006constructing"></span>Charmaz, Kathy (2006). _Constructing grounded theory:a practical guide through qualitative analysis_. Sage Publications. [http://www.amazon.com/Constructing-Grounded-Theory-Qualitative-Introducing/dp/0761973532](http://www.amazon.com/Constructing-Grounded-Theory-Qualitative-Introducing/dp/0761973532).

<span id="buley2013user"></span>Buley, L. (2013). _The User Experience Team of One: A Research and Design Survival Guide_. Rosenfeld Media. [https://books.google.dk/books?id=vQ7cnAEACAAJ](https://books.google.dk/books?id=vQ7cnAEACAAJ).

<span id="norman2013design"></span>Norman, Donald A. (2002). _The design of everyday things_. Basic Books. []().