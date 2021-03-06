{"sec":"Programming Languages and Development"}

In this section I present the terminology used for processing serialised data structures at the software level of a distributed system. This is applicable to traditional software levels such as the application and client that is the end-point for transmitted data, but also applicable to modern concepts of software levels that live on a server and handle data in a similar manner but with the goal of forwarding it to an end-point.

<br>

{"sub":"Decoding and Encoding in Local Software"}

{"cite":"oracle2015typing"} presents two type systems in programming languages: `static` and `dynamic`.

In the `static type system` the declaration, instantiation and processing of a value throughout the application is checked when the software is compiled. This implies that the software cannot be executed if type checking fails, as the software must first be successfully compiled with valid type checks. As such this type system is typical of `compiled programming languages`.

In the `dynamic type system` the declaration, instantiating and processing of a value throughout the application is checked at `runtime`, which is when the software is executed. This system is typical of `interpreted programming languages`, which are designed to be implicitly typed and to continue execution by ignoring the parts that fail during checking.

Both compiled and interpreted programming languages have their use cases. The JSON specification is modeled on the dynamically typed JavaScript programming language, and as such is itself dynamically typed with no support for explicit types. This is of course ideal for processing JSON data in JavaScript, as the language does not expect types before runtime. However this introduces interoperability challenges when JSON needs to be received by and cast to structures in statically typed languages such as Swift and Kotlin.

{"cite":"mozilla2022json"} describes that the JavaScript language implements a built-in `JSON` object with a method for encoding ("stringifying") an object to a JSON string and decoding ("parsing") a JSON data structure represented as string to an object. The lack of explicit types in JavaScript means that it is not necessary to declare a container for the parsed data structure. In the Swift programming language the notation uninitialised objects requires explicit typing, and an object must conform to a `protocol`. {"cite":"apple2022codable"} describes the `Codable protocol` as an automatic matching and initialisation of JSON data structures to a declared but uninitialised object. This process attempts to match property names between the data and object, meaning properties that were not declared are not initialised. If a property matches by name but its value is mismatched by type, an error will be thrown. This can be avoided by not declaring a structure for the parsed JSON or a part of the data, and instead initialising it as-is.

{"break":true}

{"sub":"Decoding and Encoding in Server-side Software"}

When developing software it is important to validate during development, to ensure that a feature or component is working as intended. Validation requires resources in the form of written code, acceptance tests, and traditionally a human would have to manual conduct the process. A more modern approach is to automate this through a `Continuous Integration and Deployment` (CI/CD) service such as `GitLab` {"citep":"github2022gitlab"}.

GitLab automates the processes in-between pushing changes to code and `integration` or `deployment`. The automated integration is achieved by defining a set of checks and validation methods that are applied to code changes. The automated deployment of changes goes a step further, by actually deploying these changes. Both of these processes require no human intervention, but there is also a step process of `delivery` that only deploys after manual review.

{"cite":"amirault2021template"} provides a GitLab template for continuously integrating a project written in the Swift programming language. It is evident from this template that a setup on GitLab can be configured by individually specifying the executable events for each stage in the continuous process.

```
stages:
    - build
    - test
    - archive
    - deploy

build_project:
    stage: build
    script:
        - xcodebuild clean -project ProjectName.xcodeproj -scheme SchemeName | xcpretty
        - xcodebuild test -project ProjectName.xcodeproj -scheme SchemeName -destination 'platform=iOS Simulator,name=iPhone 8,OS=11.3' | xcpretty -s
    tags:
        - ios_11-3
        - xcode_9-3
        - macos_10-13

archive_project:
    stage: archive
    script:
        - xcodebuild clean archive -archivePath build/ProjectName -scheme SchemeName
        - xcodebuild -exportArchive -exportFormat ipa -archivePath "build/ProjectName.xcarchive" -exportPath "build/ProjectName.ipa" -exportProvisioningProfile "ProvisioningProfileName"
    rules:
        - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    artifacts:
        paths:
            - build/ProjectName.ipa
    tags:
        - ios_11-3
        - xcode_9-3
        - macos_10-13
```

{"break":true}