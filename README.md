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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac consequat neque, in ultrices magna. Aliquam ultricies metus quis sem consequat faucibus. Pellentesque vestibulum ut mi nec cursus. Donec lobortis, elit vitae scelerisque accumsan, neque orci suscipit metus, sit amet placerat ligula massa et neque. Duis fringilla lectus ut ex pharetra aliquam. Aliquam lobortis ligula sed sem ullamcorper elementum. Phasellus porta ultricies tincidunt. Phasellus mattis metus eu turpis blandit, non posuere arcu ultrices. Vivamus gravida posuere bibendum. Suspendisse placerat dolor nulla, auctor consectetur dolor lacinia vitae.

Curabitur in viverra eros, ac aliquam velit. Sed eget efficitur diam. Aenean mollis dolor non augue elementum, quis sagittis elit condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin quis ipsum dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum eget semper quam. Mauris bibendum eros faucibus velit blandit, quis tristique lacus sollicitudin.

<br>

Introduction
---

As the prevalence of smartphones and internet of things (IoT) devices increasingly dictate the human experience, the software industry has pivoted towards connectivity-centered development. The common mobile software application is fully reliant on an internet connection, acting almost exclusively as a recipient (client) for transmitted data. These clients typically serve purposes such as social media communication, content consumption, user account access etc.

This reliance on connectivity means the software becomes a front-end client in a distributed computing system, with the logistical and computational responsibilities assigned and distributed to and among a network of devices. With this reality comes a series of architectural considerations and decisions that inform how and to what extent the front-end software is designed, developed and maintained.

A main feature of distributed systems is their ability to handle hardware and software heterogeneity, as information must travel digitally and physically across layers of applications, networks, and hardware. Heterogeneity manifests as differences in protocols, programming language features, and data formats. Heterogeneous systems must have the ability to transmit and parse information across layers, despite these differences. As data transmission has become ubiquitous, it is a great starting point for designing new software. Section {sec:vocabulary} explores the landscape of distribution and data transmission in-depth, establishing a vocabulary of terminology used for analysing and discussing the results of this project's experiment.

Existing research predominantly evaluates data serialisation formats from a feature, performance, and efficiency perspective. While these aspects are quantifiable, measurable, and potentially motivate decisions for designing large-scale data transmission systems, they fail to illustrate the conditions that inform the choice of data format for the common software development team. As performance differences are negligible, these conditions are likely more abstract and extend beyond development into the organisational structures and division of responsibilities in the team and between levels of developers.

The contribution of this paper is an exploration into the balance between readability and safety in the JavaScript Object Notation (JSON), in order to propose a derived extensible format informed by the value perspective of developers. This proposed format, conceptualised as the Type-Extensible Object Notation (TXON), is paired with a translation layer written in JavaScript, to provide full compatibility with JSON data and language parsers. TXON aims to offer both a human-readable yet safe and extensible format, as well as extensible types in the data.

There exists a rich history of design philosophy in programming language and data format syntax, features, and architecture. It is crucial to preface the project with this historical perspective, as the project has to build upon firmly established structures and rigid practices. This contextualisation ensures that decisions made for the project are grounded in the realities of software development, and thus takes into consideration any barriers to implementation of the proposal.

Design philosophy extends to software development, as human-readable code becomes a tool for collaboration and communication rather than a set of machine instructions. The human perspective is at the core of programming languages, as their aim is to be accessible and perceivable to humans. Programming code is eventually translated to assembly and then machine code, before it is executed by the processing unit. The implications are that programming language design should facilitate and motivate efficiency from a human perspective, in the interplay between man and machine.

{martin2018clean} provides instructions on _architecting clean software_. His approach is grounded in a shared historical perspective of software segmentation. He defines _clean code_ as concise communication of purpose and flexibility to modifications [p. 310]{martin2018clean}. He defines _clean architecture_ as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies [p. 196]{martin2018clean}.

![](figures/cleanarchitecture.jpg)
<br>
{fig:cleanarchitecture} The clean architecture [p. 196]{martin2018clean}.

As seen in figure {fig:cleanarchitecture}, this division results in four types of layers, guided by the various types of business rules and internal or external dependencies. This fragmentation of components facilitates the independent development, testing and evolution of the software layers. This philosophical perspective on software illustrates the importance of design in software, as system architecture can either motivate or inhibit developers from achieving their desired design goals.

XML (eXtensible Markup Language) is...

JavaScript Object Notation (JSON) is...

{charmaz2006constructing} defines a qualitative research perspective referred to as _Grounded Theory_. While this is a set of methodologies, it is also a general approach to conducting research and analysing the qualitative results of interviewing. From her perspective, qualitative data is gathered and processed for the purpose of guiding and grounding research decisions, rather than to qualitatively evaluate a hypothesis. This approach does not have to exist in a vacuum, and can instead guide the initial inquiry process in a research project. It is applicable to this project, as I approach the experimental development process for a value-oriented perspective, where values are derived directly from interviews with developers.

{norman2013design} coined and popularised the term _User Experience_, as a lens through which we can view the design of objects. With his philosophy of cyclical perception, action and reflection, he established a conceptual framework that describes human interaction and how technology can accommodate our expectations. Communicating through code can be described as a _design goal_ of software development (and clean code), and thus it is pertinent to approach this project with an emphasis on how developer interaction with code shapes their experience.

{buley2013user} defines a methodological approach to researching users and designing from a user-centered perspective. Her framework of _personas_ is a tool for quantitatively assessing potential users, and then deriving profiles for user evaluation during design ideation. A persona is at a surface level analogous to a stakeholder in a stakeholder analysis, which describes the organisational hierarchy and relationship between participants. The difference is that personas are less relationship-centered, as they emphasise how differing backgrounds and perspectives can inform usage, and the experience derived from interaction. Personas are created by identifying, for each type of user, their needs, values, goals, frustrations, and desires [p. 132]{buley2013user}.

![](figures/persona.pdf)
<br>
{fig:persona} A complete persona [p. 133]{buley2013user}.

As seen in figure {fig:persona}, the persona represents a fictive person derived from real information on users. It is crucial that the persona does not represent a real person, as the goal is not to design for a specific person, but for personas to represent multiple and potentially conflicting perspectives.

The following section {sec:case} presents the company I collaborate with and their _implementation case_, which lays the foundation for this project. Through organisation and system hierarchies and structures, as well as personas, this section explores perspectives on working with serialised data, in relation to the proposal in this project.

**Problem statement**

Based on this information...


<br>

Implementation
---

In this project I've chosen to collaborate with a company that specialises in native mobile application development. Their identity is kept anonymous, so rather than include confidential data or code samples, I have chosen to derive generic examples from the material they have provided me.

This company holds a unique perspective relative to the landscape of software development in Copenhagen, where return on investment (ROI) in my optics is valued above quality. Rather than take the typical multi-platform approach, using a platform-neutral framework like _React Native_, they maintain independent development teams for each platform, and they work exclusively with native code. They maintain an Android team utilising _Flutter_ and an iOS team utilising _Swift_. This nets them hardware efficiency and performance advantages, at the cost of operating and aligning two parallel developer teams working on the same projects.

In the following I illustrate the relationship between this company (_development company_) and their partners. This serves as a starting point for deducing which perspectives are held on working with data.

**Organisational structure and stakeholders**

As seen in figure {fig:organisation}, there are two identifiable hierarchies that form a relationship between case partner and development. The top half of this diagram flows from partner to a formulated case. The bottom half of this diagram flows from developer to a product delivery.

![](figures/organisation.pdf)
<br>
{fig:organisation} Hierarchical and structural relationship between development company and case partners.

The structure of the partner company informs how they formulate the case offered to the developers. They are also responsible for maintenance of a back-end, delivering customer data to the client developed in the delivery.

The structure of the development company informs how they plan and execute on a case. They are not responsible for the back-end, and thus have to negotiate infrastructure plans and changes with their partners. This presents challenges to their autonomy, hierarchy and responsibilities.

**Data provided to me**

...

**Perspectives on serialised data**

This section presents the personas derived from interviews with each development team at the company, for the purpose of taking value-oriented design decisions derived from their perspectives. As these employees are coworkers, their perspectives are grounded in shared experiences, yet their unique deviations highlight how serialised data has varying implications on work practices.

\begin{figure*}
\def\arraystretch{1.5}
\centering
\begin{tabular}{|p{0.3\linewidth}|p{0.5\linewidth}|}
\hline
Feature & Description
\hline
... & ... 
... & ... 
... & ... 
\hline
\end{tabular}
\vspace{0.5cm}
\begin{tabular}{|p{0.3\linewidth}|p{0.5\linewidth}|}
\hline
Feature & Description
\hline
... & ... 
... & ... 
... & ... 
\hline
\end{tabular}
\caption{Personas.}
\label{fig:personas}
\end{figure*}

**How-might-we**

...

<br>

Vocabulary
---

This section explores fundamental principles of the system architectures that support distribution of serialised data. It serves to establish a vocabulary for communication in computing, as well as to provide background knowledge on how data becomes distributed, and motivate my choices of systems.

**Distributed Computing**

{kshemkalyani2011distributed} define _distributed systems_ as "a collection of independent entities that cooperate to solve a problem that cannot be individually solved." They characterise distributed computing as  "a collection of mostly autonomous processors communicating over a communication network". They identify common features of distributed systems, notably a lack of shared resources which necessitates communication, autonomy and heterogeneity.

In characterising distributed systems, {kshemkalyani2011distributed} raise the notion that the physical differences of entities, and variation in their resources, creates a reliance on distributed communication. Distributed resources, particularly the absence of shared memory, implies an inherent asynchrony between entities. This means that each individual entity must act autonomously, while collaborating with and distributing tasks among the entities within the system.

As seen in figure {fig:networkcomms}, a distributed system achieves asynchronous collaboration through a communication network, either a wide (WAN) area or local (LAN) area network, depending on the geography of the system. Each entity in the system consists of at least one processor (P) with its own solitary memory (M), providing the entity computational autonomy. This network structure creates the potential for both hardware and software heterogeneity, which necessitates coordination and distribution of tasks and responsibilities.

![](figures/networkcomms.pdf)
<br>
{fig:networkcomms} A distributed system connects processors by a communication network [p. 2]{kshemkalyani2011distributed}.

_Hardware heterogeneity_ manifests as a variation in physical resources and thus implicitly a variation in computational capability. This necessitates a variance in entity responsibilities, as each individual entity is... This can of course be a cognitive decision made by system architects and engineers, facilitating a more efficient distribution, as computational tasks are inherently varied in requirements.

_Software heterogeneity_ manifests as a variation in programming languages and frameworks. Distributed systems use a layered architecture, with a middle layer driving the software distribution, the so-called "middleware." As seen in figure {fig:processinteraction}, the middleware layer exists as an addition to the protocol-oriented application layer, which handles the communication protocols such as _HTTP_. Additionally, as data flows in a heterogeneous distributed system, it must adhere to a standardised and yet interoperable format, modelled on the software systems used in the network.

![](figures/processinteraction.pdf)
<br>
{fig:processinteraction} Interaction of the software components at each processor [p. 3]{kshemkalyani2011distributed}.

At this point, you are probably wondering _why distribution is relevant_ to this project, and _how it pertains to data serialisation_. {kshemkalyani2011distributed} define various potential requirements of a system, that would motivate heterogeneous distribution. As data serialisation is typically utilised for distributed communication, it is not inherently performance- or scalability-oriented, but it is inherently distributed and geographically remote. The implication is that the inherent distributed nature of serialised data exchange necessitates the use of a distributed system, and not vice versa.

Given the inherent nature of serialised data exchange, and the ubiquity of distributed computing systems, the design of such systems informs our approach to communicating across them. It should be noted that systems do not exist in a vacuum, and thus system should be contextually designed based on market forces. System designers must balance or choose between industry standard protocols, which maximise interoperability, and the technically best solutions, which require more control and closed source development.

![](figures/pubsubsystem.pdf)
<br>
{fig:pubsubsystem} Components of a _publish-subscribe_ system [p. 9]{tarkoma2012publish}.

{kshemkalyani2011distributed} identify a set of design challenges applicable to the traditional server-client model of distributed systems. An _Applications Programming Interface (API)_ enables the distributed system to communicate internally and more importantly externally, maximising the adoption of system services by outside forces. It introduces the challenge of _transparency_, as the system should be accessible without revealing its internal operations (resource [re]location, replication, concurrency, failure handling etc.) and implementation policies.

{kshemkalyani2011distributed} describe several applications of distributed computing, of which the publish-subscribe model of content distribution is particularly relevant to this project, because it is the most prominent server-client system. In this model, information is filtered by relevancy, meaning the server distributes only the requested information. As argued by {kshemkalyani2011distributed}, information distribution requires three types of mechanisms: distribution (publishing), specific requests (subscribe), and the ability to manipulate information based on a request before publishing.

In the following section on _the transmission of data in distributed computing systems_, I present an in-depth illustration of how publish-subscribe models facilitate distribution of data-driven systems.

**Data Transmission**

This section explores the standards and methods for distributed communication through a publish-subscribe service. It serves as background knowledge on how serialised data is distributed, to illustrate how our choice of data serialisation library is informed by the system model.

{tarkoma2012publish} defines _publish-subscribe (pub/sub)_ as the efficient and timely selective communication of events between participating components. He relates his conceptual perspective to how humans selectively focus on (or "subscribe" to) probable sources of interesting events.

He notes that participants in this type of distributed system would appear sourceless to each other, and thus they publish without direction. This introduces the crucial element of time beyond the typical asynchrony, as participants subscribe based on the probability that information will be communicated, even if no information yet exists. He contrasts this with database systems, wherein information is retrieved through queries, aimed at previously communicated information, rather than aimed at future communication.

{tarkoma2012publish} illustrates the structural components of a pub/sub system through figure {fig:pubsubsystem}, as well as how the participants interact through events and notifications. Publishers and subscribers are referred to as the _main entities_, and publishers are the starting point for the chain of events in the system. As a situation occurs, referred to as an _event_, the publisher detects it and publishes a notification to the service, also referred to as the _event message_. Events denote _discrete_ measurable changes in the _state_ of a situation. The pub/sub service handles the communication infrastructure, and subscribers must express interest in a publisher before an event.

The nature of this relationship between publishers and subscribers introduces coordination challenges, as publishers and subscribers must agree on event expectations before a situation occurs. The pub/sub system does not take responsibility for these challenges, as it can only set expectations but not solve conflicts. The system is only responsible for delivering the communicated event between publishers and their subscribers.

The system can take different approaches to communicating events between entities over a network. In the simplest form, a pub/sub system can communicate directly from publishers to subscribers, with publishers taking on responsibility for the transmission of events. As the network scales and increasingly more entities subscribe this approach become untenable, and responsibilities are instead delegated to an intermediary type of entity, referred to as _brokers_ or _pub/sub routers_.

In a _centralised_ pub/sub system, publishers either utilise a _one-to-one message protocol_, or they communicate events to a _broker server_, which forwards messages to its subscribers. In a _distributed_ pub/sub system events are never communicated directly between publishers and subscribers, and brokers are deployed as an _overlay network_ for routing. This overlay is an additional layer on-top of the network, allowing the brokers to collaboratively transmit events between entities, gaining the aforementioned advantages of a distributed system.

The network layer is one of multiple layers typical of networking systems. As seen in figure {fig:ositcilayers}, {alani2014guide} presents the 7 layers of the _Open Systems Interconnection_ (OSI) model relative to the 4 layers of the _Transmission Control Protocol_ (TCP). The OSI model abstracts networking systems into a conceptual framework, to describe and standardise the functional relationship between these layers. The TCI/IP model maps to the OSI model, but  

![](figures/ositcilayers.pdf)
<br>
{fig:ositcilayers} Comparison between layers in the OSI model and TCI/IP model, providing a standard communication architecture for distributed processing systems [p. 21]{alani2014guide}.

As data in a distributed systems flows from the software (_application layer_) to the hardware (_physical layer_), it is transformed by protocols which add additional information to the data. This process is referred to as _encapsulation_, and consists of _capsulation_ from the source host and _decapsulation_ towards the destination host. As data flows from source host's application layer and towards the physical layer, protocols prepend headers (leading information) and append trailers (trailing information) to the data. This additional information indicates the purpose of communicating the data and how it should be interpreted by the next layer.

![](figures/encapsulation.pdf)
<br>
![](figures/endtoendflow.pdf)
<br>
{fig:dataflow} End-to-end data flow and encapsulation with headers and trailers [p. 15]{alani2014guide}.

This transformation of distributed data has consequences for...

The take away from the OSI model is that as data flows through a distributed system, it is transformed by protocols utilised in the layers. These protocols inform the state of the data...

{tarkoma2012publish} presents the _Representational State Transfer_ (REST) _Application Programming Interface_ (API), an architectural model and web technology for implementing publish-subscribe systems. This model consists of resources and representations of their state. _Resources_ are akin to objects, whose current or future state is represented in the system. State is altered through API requests sent by a client, which becomes transitional once it awaits at least one server response. As a web technology, REST is typically seen with the HTTP protocol.

...

**Data Parsing**

...

**Typesetting**

...

**Backwards Compatibility**

...

**Language Extensibility**

...



<br>

Related Work
---

Previous research provides a baseline for building upon existing knowledge through this project. This research typically focuses on documenting the object serialisation process or comparing serialisation formats in terms of features, efficiency, performance, file size, and programming language support.

{goff2001xmlserialization} document object serialisation processes with the eXtensible Markup Language (XML) format, assessing its implementation in heterogeneous distributed systems.

{eriksson2011comparison} compared the features of two plaintext object serialisation formats: JavaScript Object Notation (JSON) and YAML, then determined their efficiency by measuring performance and data storage size.
{kazuaki2011survey} surveyed object serialisation techniques, concluding that each technique had its advantages and disadvantages in the context it was applied.

{tauro2012binary} document implementation techniques for binary object serialisation in the programming languages: C++, Java and .NET. They conclude that binary serialisation is memory and bandwidth efficient.

{sumaray2012efficiency} ...

{vanura2018performance} ...


<br>

Experiment Setup
---

**Features**

\begin{figure}[H]
\def\arraystretch{1.5}
\centering
\begin{tabular}{|p{0.35\linewidth}|p{0.1\linewidth}|p{0.1\linewidth}|p{0.1\linewidth}|}
\hline
Feature & XML & JSON & Proto
\hline
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
... & Yes & No & Yes 
... & No & Yes & Yes 
... & Yes & No & Yes 
\hline
\end{tabular}
\end{figure}

XML: https://www.w3.org/XML/ https://www.w3.org/TR/2008/REC-xml-20081126/

JSON: https://www.json.org/json-en.html

Proto: https://developers.google.com/protocol-buffers

**Declaration**

```
<Object>
    <Property>Content</Property>
</Object>
```
<br>
XML object declaration.

\vspace{1mm}

```
{
    Object : {
        Property : Content
    }
}
```
<br>
JavaScript object notation.

```
message Object {
    Optional Type Property = Content;
}
```
<br>
Protocol Buffers object declaration.

**Syntax**

```
<Person>
    <name>1</name>
    <id>2</id>
    <email>3</email>
</Person>
```
<br>
XML object properties.

```
{
    "Person": {
        "name":     "1",
        "id":       "2",
        "email":    "3"
    }
}
```
<br>
JavaScript object properties.

```
message Person {
    required string name =  1;
    required int32 id =     2;
    optional string email = 3;
}
```
<br>
Protocol Buffers object properties.

**Serialisation**

...

**Transmission**

...

**Readability**

...

**Type safety**

...

**Language support**

...

**Documentation**

...


<br>

Results
---

...


<br>

Discussion
---

...


<br>

Conclusion
---

...


<br>

Future Work
---

...


<br>

---

<br>

@book{kshemkalyani2011distributed,
  title = {Distributed Computing: Principles, Algorithms, and Systems},
  author = {Kshemkalyani, A.D. and Singhal, M.},
  isbn = {9781139470315},
  note = {\url{https://books.google.dk/books?id=G7SZ32dPuLgC}},
  year = {2011},
  publisher = {Cambridge University Press}
}

@article{kazuaki2011survey,
    title = {Comparative Survey of Object Serialization Techniques and the Programming Supports},
    author = {Kazuaki Maeda},
    country	= {},
    institution	= {},
    journal = {International Journal of Computer and Information Engineering},
    volume = {5},
    number = {12},
    year = {2011},
    pages = {1488 - 1493},
    ee = {https://publications.waset.org/pdf/15057},
    url = {https://publications.waset.org/vol/60},
    bibsource = {https://publications.waset.org/},
    issn = {eISSN: 1307-6892},
    publisher = {World Academy of Science, Engineering and Technology},
    index = {Open Science Index 60, 2011},
    note = {\url{https://publications.waset.org/15057/comparative-survey-of-object-serialization-techniques-and-the-programming-supports}}
}

@article{tauro2012binary,
    author = {Tauro, Clarence and Ganesan, N and Mishra, Saumya and Bhagwat, Anupama},
    year = {2012},
    month = {05},
    pages = {25-29},
    title = {Article: Object Serialization: A Study of Techniques of Implementing Binary Serialization in C++, Java and .NET},
    volume = {45},
    journal = {International Journal of Computer Applications},
    note = {\url{https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.685.1077&rep=rep1&type=pdf}}
}

@inproceedings{eriksson2011comparison,
    title = {Comparison between JSON and YAML for Data Serialization.},
    author = {Malin Eriksson and V. Hallberg},
    year = {2011},
    note = {\url{https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.472.5744&rep=rep1&type=pdf}}
}

@inbook{vanura2018performance,
    author = {Vanura, Jan and Kriz, Pavel},
    year = {2018},
    month = {06},
    pages = {166-175},
    title = {Perfomance Evaluation of Java, JavaScript and PHP Serialization Libraries for XML, JSON and Binary Formats},
    isbn = {978-3-319-94375-6},
    doi = {10.1007/978-3-319-94376-3_11},
    note = {\url{https://www.researchgate.net/publication/325829004_Perfomance_Evaluation_of_Java_JavaScript_and_PHP_Serialization_Libraries_for_XML_JSON_and_Binary_Formats}}
}

@inproceedings{sumaray2012efficiency,
    author = {Sumaray, Audie and Makki, S. Kami},
    title = {A Comparison of Data Serialization Formats for Optimal Efficiency on a Mobile Platform},
    year = {2012},
    isbn = {9781450311724},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/2184751.2184810},
    doi = {10.1145/2184751.2184810},
    booktitle = {Proceedings of the 6th International Conference on Ubiquitous Information Management and Communication},
    articleno = {48},
    numpages = {6},
    keywords = {JSON, XML, ProtoBuf, thrift, data serialization, Dalvik, Android},
    location = {Kuala Lumpur, Malaysia},
    series = {ICUIMC '12},
    note = {\url{https://dl.acm.org/doi/abs/10.1145/2184751.2184810?casa_token=bdZ6IE8_tAEAAAAA:JrS60mJemsuBluBQN4YVQsskxRLo-Ve14ljG4bwtIkaPtBJ-V-TE3QFLKlNBcu2LuVjxptSo_wh}}
}

@article{goff2001xmlserialization,
    author = {Goff, J and Bhatti, N. and Hassan, Wassem and Kovács, Z and Martin, P. and Mcclatchey, Richard and Stockinger, Heinz and Willers, Ian},
    year = {2001},
    month = {05},
    pages = {},
    title = {Object Serialization and Deserialization Using XML},
    note = {\url{https://www.researchgate.net/publication/46276571_Object_Serialization_and_Deserialization_Using_XML}}
}

@book{tarkoma2012publish,
    title = {Publish / Subscribe Systems: Design and Principles},
    author = {Tarkoma, S.},
    isbn = {9781118354285},
    lccn = {2012017050},
    series = {Wiley Series on Communications Networking \& Distributed Systems},
    url = {https://books.google.dk/books?id=iLGzgqi5JPgC},
    year = {2012},
    publisher = {Wiley},
    note = {\url{https://books.google.dk/books?id=iLGzgqi5JPgC}}
}

@book{alani2014guide,
    title = {Guide to OSI and TCP/IP Models},
    author = {Alani, M.M.},
    isbn = {9783319051529},
    lccn = {2014932534},
    series = {SpringerBriefs in Computer Science},
    url = {https://books.google.dk/books?id=PRi5BQAAQBAJ},
    year = {2014},
    publisher = {Springer International Publishing},
    note = {url{https://books.google.dk/books?id=PRi5BQAAQBAJ}}
}

@book{martin2018clean,
  title = {Clean Architecture: A Craftsman's Guide to Software Structure and Design},
  author = {Martin, R.C.},
  isbn = {9780134494166},
  lccn = {2017945537},
  series = {Martin, Robert C},
  url = {https://books.google.dk/books?id=8ngAkAEACAAJ},
  year = {2018},
  publisher = {Prentice Hall}
}

@book{charmaz2006constructing,
  abstract = {The author introduces the reader to the craft of using grounded theory in social research, and provides a clear, step-by-step guide for those new to the field.},
  added-at = {2013-12-08T00:24:54.000+0100},
  address = {London; Thousand Oaks, Calif.},
  author = {Charmaz, Kathy},
  biburl = {https://www.bibsonomy.org/bibtex/2d2525487bbdc4e27e2dee6ca37fc7327/taton},
  description = {Constructing Grounded Theory: A Practical Guide through Qualitative Analysis (Introducing Qualitative Methods series): Kathy Charmaz: 9780761973539: Amazon.com: Books},
  interhash = {306f7b45d327c3214344d0a19631f92c},
  intrahash = {d2525487bbdc4e27e2dee6ca37fc7327},
  isbn = {0761973524 9780761973522 0761973532 9780761973539},
  keywords = {constructing},
  publisher = {Sage Publications},
  refid = {70149187},
  timestamp = {2013-12-08T00:24:54.000+0100},
  title = {Constructing grounded theory : a practical guide through qualitative analysis},
  url = {http://www.amazon.com/Constructing-Grounded-Theory-Qualitative-Introducing/dp/0761973532},
  year = 2006
}

@book{buley2013user,
  title = {The User Experience Team of One: A Research and Design Survival Guide},
  author = {Buley, L.},
  isbn = {9781933820187},
  lccn = {2013939951},
  url = {https://books.google.dk/books?id=vQ7cnAEACAAJ},
  year = {2013},
  publisher = {Rosenfeld Media}
}

@book{norman2013design,
  abstract = {First, businesses discovered quality as a key competitive edge; next came service. This title reveals how smart design is the next competitive frontier. 'The Design of Everyday Things' is a primer on how and why some products satisfy customers while others only frustrate them.},
  added-at = {2012-09-28T16:01:03.000+0200},
  address = {[New York]},
  author = {Norman, Donald A.},
  biburl = {https://www.bibsonomy.org/bibtex/2e51bef4e8b0c0ea3c13e8b5e6a561bed/schmidt2},
  description = {The Design of Everyday Things: Amazon.de: Don Norman: Englische Bücher},
  interhash = {c6fd1560a6892285580779b96140f88c},
  intrahash = {e51bef4e8b0c0ea3c13e8b5e6a561bed},
  isbn = {0465067107 9780465067107},
  keywords = {books design lang:en product_design toread ui usability ux},
  publisher = {Basic Books},
  refid = {215302602},
  timestamp = {2012-09-28T16:01:03.000+0200},
  title = {The design of everyday things},
  year = 2002
}