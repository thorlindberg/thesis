{"sec":"Vocabulary"}

This section explores fundamental principles of the system architectures that support distribution of serialised data. It serves to establish a vocabulary for communication in computing, as well as to provide background knowledge on how data becomes distributed, and motivate my choices of systems.

{"sub":"Distributed Computing"}

{"cite":"kshemkalyani2011distributed"} define _distributed systems_ as "a collection of independent entities that cooperate to solve a problem that cannot be individually solved." They characterise distributed computing as  "a collection of mostly autonomous processors communicating over a communication network". They identify common features of distributed systems, notably a lack of shared resources which necessitates communication, autonomy and heterogeneity.

In characterising distributed systems, {"cite":"kshemkalyani2011distributed"} raise the notion that the physical differences of entities, and variation in their resources, creates a reliance on distributed communication. Distributed resources, particularly the absence of shared memory, implies an inherent asynchrony between entities. This means that each individual entity must act autonomously, while collaborating with and distributing tasks among the entities within the system.

As seen in {"ref":"networkcomms"}, a distributed system achieves asynchronous collaboration through a communication network, either a wide (WAN) area or local (LAN) area network, depending on the geography of the system. Each entity in the system consists of at least one processor (P) with its own solitary memory (M), providing the entity computational autonomy. This network structure creates the potential for both hardware and software heterogeneity, which necessitates coordination and distribution of tasks and responsibilities.

{"fig":"networkcomms","url":"./figures/networkcomms.png","caption":"A distributed system connects processors by a communication network.","width":"100%"}

_Hardware heterogeneity_ manifests as a variation in physical resources and thus implicitly a variation in computational capability. This necessitates a variance in entity responsibilities, as each individual entity is... This can of course be a cognitive decision made by system architects and engineers, facilitating a more efficient distribution, as computational tasks are inherently varied in requirements.

_Software heterogeneity_ manifests as a variation in programming languages and frameworks. Distributed systems use a layered architecture, with a middle layer driving the software distribution, the so-called "middleware." As seen in {"ref":"processinteraction"}, the middleware layer exists as an addition to the protocol-oriented application layer, which handles the communication protocols such as _HTTP_. Additionally, as data flows in a heterogeneous distributed system, it must adhere to a standardised and yet interoperable format, modelled on the software systems used in the network.

{"fig":"processinteraction","url":"./figures/processinteraction.png","caption":"Interaction of the software components at each processor.","width":"100%"}

At this point, you are probably wondering _why distribution is relevant_ to this project, and _how it pertains to data serialisation_. {"cite":"kshemkalyani2011distributed"} define various potential requirements of a system, that would motivate heterogeneous distribution. As data serialisation is typically utilised for distributed communication, it is not inherently performance- or scalability-oriented, but it is inherently distributed and geographically remote. The implication is that the inherent distributed nature of serialised data exchange necessitates the use of a distributed system, and not vice versa.

Given the inherent nature of serialised data exchange, and the ubiquity of distributed computing systems, the design of such systems informs our approach to communicating across them. It should be noted that systems do not exist in a vacuum, and thus system should be contextually designed based on market forces. System designers must balance or choose between industry standard protocols, which maximise interoperability, and the technically best solutions, which require more control and closed source development.

{"fig":"pubsubsystem","url":"./figures/pubsubsystem.png","caption":"Components of a _publish-subscribe_ system.","width":"100%"}

{"cite":"kshemkalyani2011distributed"} identify a set of design challenges applicable to the traditional server-client model of distributed systems. An _Applications Programming Interface (API)_ enables the distributed system to communicate internally and more importantly externally, maximising the adoption of system services by outside forces. It introduces the challenge of _transparency_, as the system should be accessible without revealing its internal operations (resource [re]location, replication, concurrency, failure handling etc.) and implementation policies.

{"cite":"kshemkalyani2011distributed"} describe several applications of distributed computing, of which the publish-subscribe model of content distribution is particularly relevant to this project, because it is the most prominent server-client system. In this model, information is filtered by relevancy, meaning the server distributes only the requested information. As argued by {"cite":"kshemkalyani2011distributed"}, information distribution requires three types of mechanisms: distribution (publishing), specific requests (subscribe), and the ability to manipulate information based on a request before publishing.

In the following section on _the transmission of data in distributed computing systems_, I present an in-depth illustration of how publish-subscribe models facilitate distribution of data-driven systems.

{"sub":"Data Transmission"}

This section explores the standards and methods for distributed communication through a publish-subscribe service. It serves as background knowledge on how serialised data is distributed, to illustrate how our choice of data serialisation library is informed by the system model.

"cite":"tarkoma2012publish"} defines _publish-subscribe (pub/sub)_ as the efficient and timely selective communication of events between participating components. He relates his conceptual perspective to how humans selectively focus on (or "subscribe" to) probable sources of interesting events.

He notes that participants in this type of distributed system would appear sourceless to each other, and thus they publish without direction. This introduces the crucial element of time beyond the typical asynchrony, as participants subscribe based on the probability that information will be communicated, even if no information yet exists. He contrasts this with database systems, wherein information is retrieved through queries, aimed at previously communicated information, rather than aimed at future communication.

{"cite":"tarkoma2012publish"} illustrates the structural components of a pub/sub system through {"ref":"pubsubsystem"}, as well as how the participants interact through events and notifications. Publishers and subscribers are referred to as the _main entities_, and publishers are the starting point for the chain of events in the system. As a situation occurs, referred to as an _event_, the publisher detects it and publishes a notification to the service, also referred to as the _event message_. Events denote _discrete_ measurable changes in the _state_ of a situation. The pub/sub service handles the communication infrastructure, and subscribers must express interest in a publisher before an event.

The nature of this relationship between publishers and subscribers introduces coordination challenges, as publishers and subscribers must agree on event expectations before a situation occurs. The pub/sub system does not take responsibility for these challenges, as it can only set expectations but not solve conflicts. The system is only responsible for delivering the communicated event between publishers and their subscribers.

The system can take different approaches to communicating events between entities over a network. In the simplest form, a pub/sub system can communicate directly from publishers to subscribers, with publishers taking on responsibility for the transmission of events. As the network scales and increasingly more entities subscribe this approach become untenable, and responsibilities are instead delegated to an intermediary type of entity, referred to as _brokers_ or _pub/sub routers_.

In a _centralised_ pub/sub system, publishers either utilise a _one-to-one message protocol_, or they communicate events to a _broker server_, which forwards messages to its subscribers. In a _distributed_ pub/sub system events are never communicated directly between publishers and subscribers, and brokers are deployed as an _overlay network_ for routing. This overlay is an additional layer on-top of the network, allowing the brokers to collaboratively transmit events between entities, gaining the aforementioned advantages of a distributed system.

The network layer is one of multiple layers typical of networking systems. As seen in {"ref":"ositcilayers"}, {"cite":"alani2014guide"} presents the 7 layers of the _Open Systems Interconnection_ (OSI) model relative to the 4 layers of the _Transmission Control Protocol_ (TCP). The OSI model abstracts networking systems into a conceptual framework, to describe and standardise the functional relationship between these layers. The TCI/IP model maps to the OSI model, but  

{"fig":"ositcilayers","url":"./figures/ositcilayers.png","caption":"Comparison between layers in the OSI model and TCI/IP model, providing a standard communication architecture for distributed processing systems.","width":"100%"}

As data in a distributed systems flows from the software (_application layer_) to the hardware (_physical layer_), it is transformed by protocols which add additional information to the data. This process is referred to as _encapsulation_, and consists of _capsulation_ from the source host and _decapsulation_ towards the destination host. As data flows from source host's application layer and towards the physical layer, protocols prepend headers (leading information) and append trailers (trailing information) to the data. This additional information indicates the purpose of communicating the data and how it should be interpreted by the next layer.

{"fig":"dataflow","url":"./figures/endtoendflow.png","caption":"End-to-end data flow.","width":"100%"}

{"fig":"encapsulation","url":"./figures/encapsulation.png","caption":"Encapsulation with headers and trailers.","width":"100%"}

This transformation of distributed data has consequences for...

The take away from the OSI model is that as data flows through a distributed system, it is transformed by protocols utilised in the layers. These protocols inform the state of the data...

{"cite":"tarkoma2012publish"} presents the _Representational State Transfer_ (REST) _Application Programming Interface_ (API), an architectural model and web technology for implementing publish-subscribe systems. This model consists of resources and representations of their state. _Resources_ are akin to objects, whose current or future state is represented in the system. State is altered through API requests sent by a client, which becomes transitional once it awaits at least one server response. As a web technology, REST is typically seen with the HTTP protocol.

...

{"sub":"Data Parsing"}

...

{"sub":"Typesetting"}

...

{"sub":"Backwards Compatibility"}

...

{"sub":"Language Extensibility"}

...

{"pagebreak":true}