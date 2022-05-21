{"chp":"Vocabulary"}

This section explores fundamental principles of the system architectures that support distribution of serialised data. It serves to establish a vocabulary for communication in computing, as well as to provide background knowledge on how data becomes distributed, and motivate my choices of systems.

{"break":true}

<!--

{"cite":"martin2018clean"} provides instructions on "architecting clean software". His approach is grounded in a shared historical perspective of software segmentation. He defines "clean code" as concise communication of purpose and flexibility to modifications {"citep":"martin2018clean","page":"310"}. He defines "clean architecture" as division into autonomous layers and independence within the system. The layers should include at least one for business rules and another for user/system interfaces. The system should be independent and testable without frameworks, user interfaces, database choice, and external agencies {"citep":"martin2018clean","page":"196"}.

{"fig":"cleanarchitecture","url":"figures/cleanarchitecture.jpg","caption":"The clean architecture.","width":"100%"}

As seen in figure {"ref":"cleanarchitecture"}, this division results in four types of layers, guided by the various types of business rules and internal or external dependencies. This fragmentation of components facilitates the independent development, testing and evolution of the software layers. This philosophical perspective on software illustrates the importance of design in software, as system architecture can either motivate or inhibit developers from achieving their desired design goals.

XML (eXtensible Markup Language) is...

JavaScript Object Notation (JSON) is...

-->