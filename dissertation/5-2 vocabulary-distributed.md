{"sec":"Distributed Computing and Heterogeneity"}

In this section I present the terminology used to describe the structure of a distributed computing system and its processes. This is included because data interchange formats act as intermediaries between programming languages and layers in a distributed system, which results in the data being transformed. These transformations can influence how we process and validate the data, and as such the structure of the system must inform the design and development of a data format proposal.

{"sub":"Coordination in a distributed system"}

{"cite":"kshemkalyani2011distributed"} define the `distributed system` as "a collection of independent entities that cooperate to solve a problem that cannot be individually solved." They characterise distributed computing as  "a collection of mostly autonomous processors communicating over a communication network". They identify common features of distributed systems, notably a lack of `shared resources` which necessitates `communication` `autonomy` and `heterogeneity`.

In characterising distributed systems they raise the notion that the physical differences of entities, and variation in their resources, creates a reliance on distributed communication. Distributed resources, particularly the absence of shared memory, implies an inherent asynchrony between entities. This means that each individual entity must act autonomously, while collaborating with and distributing tasks among the entities within the system.

A distributed system achieves asynchronous collaboration through a communication network. This network structure creates the potential for both `hardware heterogeneity` and `software heterogeneity`, which necessitates coordination and distribution of tasks and responsibilities.

`Hardware heterogeneity` manifests as a variation in physical resources and thus implicitly a variation in computational capability. This can of course be a cognitive decision made by system architects and engineers, facilitating a more efficient distribution, as computational tasks are inherently varied in requirements.

`Software heterogeneity` manifests as a variation in programming languages and frameworks. Distributed systems use a layered architecture, with a middle layer driving the software distribution, the so-called `middleware`. As seen in figure {"ref":"processinteraction"}, the middleware layer exists as an addition to the protocol-oriented application layer, which handles the communication protocols such as `HTTP`. Additionally, as data flows in a heterogeneous distributed system, it must adhere to a standardised and yet interoperable format, modelled on the software systems used in the network.

{"break":true}

{"sub":"Layers of a distributed system"}

The network layer is one of multiple layers typical of networking systems. As seen in figure {"ref":"ositcilayers"}, {"cite":"alani2014guide"} presents the 7 layers of the "Open Systems Interconnection" (OSI) model relative to the 4 layers of the "Transmission Control Protocol" (TCP). The OSI model abstracts networking systems into a conceptual framework, to describe and standardise the functional relationship between these layers.

{"fig":"ositcilayers","url":"figures/ositcilayers.png","caption":"Comparison between layers in the OSI model and TCI/IP model, providing a standard communication architecture for distributed processing systems.","width":"100%"}

As data in a distributed systems flows from the software ("application layer") to the hardware ("physical layer"), it is transformed by protocols which add additional information to the data. This process is referred to as "encapsulation", and consists of "capsulation" from the source host and "decapsulation" towards the destination host. As data flows from source host's application layer and towards the physical layer, protocols prepend headers (leading information) and append trailers (trailing information) to the data. This additional information indicates the purpose of communicating the data and how it should be interpreted by the next layer. The take away from the OSI model is that as data flows through a distributed system, it is transformed by protocols utilised in the layers. These protocols inform the state of the data.

{"fig":"dataflow","url":"figures/endtoendflow.png","caption":"End-to-end data flow.","width":"100%"}

{"fig":"encapsulation","url":"figures/encapsulation.png","caption":"Encapsulation with headers and trailers.","width":"100%"}

{"cite":"tarkoma2012publish"} presents the `Representational State Transfer` (REST) API as an architectural model and web technology for implementing publish-subscribe systems. This model consists of `resources` and `representations` of their state. Resources are akin to objects, whose current or future state is represented in the system. State is altered through API requests sent by a client, which becomes transitional once it awaits at least one server response.

{"break":true}

{"sub":"Communication in a heterogeneous system"}

{"cite":"kshemkalyani2011distributed"} identify a set of design challenges applicable to the traditional server-client model of distributed systems. An `Application Programming Interface `(API) enables the distributed system to communicate internally and more importantly externally, maximising the adoption of system services by outside forces. It introduces the challenge of "transparency", as the system should be accessible without revealing its internal operations (resource [re]location, replication, concurrency, failure handling etc.) and implementation policies.

They describe several applications of distributed computing, of which the publish-subscribe model of content distribution is particularly relevant to this project, because it is the most prominent server-client system. In this model, information is filtered by relevancy, meaning the server distributes only the requested information. Information distribution requires three types of mechanisms: `distribution` (publishing) `specific requests` (subscribe) and the ability to `manipulate information` based on a request before publishing.

{"cite":"tarkoma2012publish"} defines "publish-subscribe (pub/sub)" as the efficient and timely selective communication of events between participating components. He relates his conceptual perspective to how humans selectively focus on (or "subscribe" to) probable sources of interesting events.

He notes that participants in this type of distributed system would appear sourceless to each other, and thus they publish without direction. This introduces the crucial element of time beyond the typical asynchrony, as participants subscribe based on the probability that information will be communicated, even if no information yet exists. He contrasts this with database systems, wherein information is retrieved through queries, aimed at previously communicated information, rather than aimed at future communication.

{"cite":"tarkoma2012publish"} illustrates the structural components of a pub/sub system as seen in figure {"ref":"pubsubsystem"}, as well as how the participants interact through events and notifications. Publishers and subscribers are referred to as the "main entities", and publishers are the starting point for the chain of events in the system. As a situation occurs, referred to as an "event", the publisher detects it and publishes a notification to the service, also referred to as the "event message". Events denote "discrete" measurable changes in the "state" of a situation. The pub/sub service handles the communication infrastructure, and subscribers must express interest in a publisher before an event.

{"fig":"pubsubsystem","url":"figures/pubsubsystem.png","caption":"Components of a \"publish-subscribe\" system.","width":"100%"}

The nature of this relationship between publishers and subscribers introduces coordination challenges, as publishers and subscribers must agree on event expectations before a situation occurs. The pub/sub system does not take responsibility for these challenges, as it can only set expectations but not solve conflicts. The system is only responsible for delivering the communicated event between publishers and their subscribers.

The system can take different approaches to communicating events between entities over a network. In the simplest form, a pub/sub system can communicate directly from publishers to subscribers, with publishers taking on responsibility for the transmission of events. As the network scales and increasingly more entities subscribe this approach become untenable, and responsibilities are instead delegated to an intermediary type of entity, referred to as "brokers" or "pub/sub routers".

In a "centralised" pub/sub system, publishers either utilise a "one-to-one message protocol", or they communicate events to a "broker server", which forwards messages to its subscribers. In a "distributed" pub/sub system events are never communicated directly between publishers and subscribers, and brokers are deployed as an "overlay network" for routing. This overlay is an additional layer on-top of the network, allowing the brokers to collaboratively transmit events between entities, gaining the aforementioned advantages of a distributed system.

{"break":true}