<div style="page-break-after: always">
</div>

<!--Title------------------------------>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Master's in Information Technology
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="
            font-size: 3em;
            line-height: 1.5em;
        ">
            Type-Extensible Object Notation:
            <br>
            JSON with Syntax for Types
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            https://github.com/thorlindberg/thesis
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<!--Test-Driven Development--------->

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Test-Driven Development
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Test-Driven Development
            </div>
            <br><br>
            Testing has implications not only for the approach to implementation, but also the structure of the code itself and the overall practices surrounding projects. As each feature needs to be developed on a foundation of demonstrable necessity, the process must be divided into small enough steps for testing to be possible. The testing of a smaller component in a large codebase is referred to as <code>unit tests</code>, as each component becomes a testable <code>unit</code>.
            <br><br>
            The testing of a unit either aims to demonstrate a flaw in the current system, or demonstrate the functional implementation of a feature that meets the requirements for acceptance.
            <br><br>
            A test should ideally be executed in a short amount of time, resulting in fast testing. Tests should be executable in isolation, resulting in unordered testing. Tests should use production data when applicable, and tests should represent a feature or component of an overall project and implementation.
        </div>
        <div style="width: 47.5%">
            <img src="
                http://www.plantuml.com/plantuml/svg/ZOzFIyH03CNl-HJv02xUPLdM_oT1zBXu29tG3fqcPP8gY-ntTrgAKgoBSvlaz_BUsvjJzg5B0DP6wIbJXoaA-x5drEoD0cpDZubtK6dNgx3uNQHw13y1oxkXgdtCEaYurQGPFPDOkLJ0QVyjc_arpKSJdQVj2KwmlPmTuNMCXviSwyOtEppWTGX8w6oERx3yucOYNWP1RtWQMe5-JMRkYLf6AcNT4sFLaDHSbbTuUA2OYcwTMBUXcgAicCtpdmRt4aQBPpAxmC3ldBJlM1pDjRU_qowApWVEsFspuJdrckCoSgNYKGOkGM3F4eOkVG40
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Test cycle: Guernsey, M. (2013). Test-driven Database Development: Unlocking Agility. Addison-Wesley.
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Test-Driven Development
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Unit and Acceptance Testing
            </div>
            <br><br>
            In this project the units are exclusively validation checks that return an error based on nonconformance to requirements or types in a data structure. A unit is a JSON data structure consisting of a sample nonconforming JSON object, its expected validity or invalidity, and an optional expected feedback string describing the source of nonconformance.
            <br><br>
            These units act as acceptance tests that describe the requirements for successfully implementing a feature through validation. This also results in implementing type semantics, as a feature can be utilised once its correct application can be verified.
            <br><br>
            These units do not act as tests demonstrating the necessity for an implementation or evolution of the JSON specification, which I identify as a flaw of the experiment documented in this project.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "valid": "true | false",
    "feedback": "string",
    "json": {
        "init": {},
        "data": {}
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/RO_HIiOm38NlynIbtlxWfI13XWe-HrpIhLfJIJD5TEzkw-Psiq8BFTyvwMbV3DLUIXQ0hjXNuZjejyU8e-AR-mPNrpqEhq-QPw67dB8wKvJoZifYVrmoyMOzitzEqNYdKnodLBVjYVFKLGWqtD3kMM0z5-YkjwQmJl0Vc2BvM-TDPtO_Bc0gx2yh3CpqN6StNaoZZF-aVRIgHmqV9LfJbikX4HesxNWVUXPguLy0
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Test-Driven Development
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div>
            <img style="height: 40%" src="
                http://www.plantuml.com/plantuml/svg/vP5FImCn4CNl-HGXNWksXoAK8aK5mOCUFBezJ3VPRZH_IZ9HY-ntTzCE2zNGaoB5m2xPlD_BpBvPH8I0oHgstpr7xnYRHzmQTSdorus6TG3BFnZlrnNKBxV19oUllV61Om0NDn2Kmvtkl5I4bl2tLgCQr5QlMzC_E3ZAhhEcaVM579YExTyTcvzJfsn_WqXEOnGp_ZJ0XrUBLp1QzW26f4Q7KgEKNFMbUrNWTgDu9IIWgWHl8NBjTbOUMmXAyhl7XtjUPIu3KjK60g3sBhjyMfd-M7mfaECKC-heGD5EOq4XDNT1QddbDZ91bKKHxDYtan4hrOAStvALlUJvoMGfKQaQI0QvRxZLqGBMRNzAUCIWtVel8dN9hbIWkaMI6izm9IRZIfnc_bOxRPCzvVmduoCO_H-DwMId1E__P4hJ8nIbGBES_kemQRTa7MCBvMGESxT9rdm2
            ">
            <img style="height: 40%" src="
                http://www.plantuml.com/plantuml/svg/xL9Dgzim4BphLmZr-g3nUuT2UPJG5leZwXvaQnshrOUHLabDyN_lAdO4AJRfgL0IGOAqEzePZMSVKGPCrh1vzprwnzXhnD701vPFdxKy16dvByPfVPJjZo_19wS-UUC3no1T76G0X-U-ymeMw1hyr6k4qktreJVqmt9Z_TQRhbFjErKm4vl_9_RwTb7AvWaYEOrHlETV2_Xwj3XAenK1EcaYF5ttEW3L43UrXNRaXsk1-uxZE02lXP88jU2zZ7m8Ve208rMjTzXJcN1MHoknxK5ThaGCsXrg8VvWoiOIIz5M5l5gNEtaTPPGkgk8J9prksGR28LtTTPOHcs3e9F9P4NL9d3Q9fdTkKrZwTassKppT0CfVrwGpzkAsArgKRvciIo2D-qb51HpDzuiQb7jQY7Ojf1oAdB-SMfF6djEqrE6xgZGWF4dldmFgbMFyDvbU7V_JMgh5wh8nX-1B_xculCZjtUPs-hbxu9RTj_OnDWUdChnE6-IDRy1
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Unit tests for type declarations (top) and type instances (bottom)
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<!--Type Semantics------------------->

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Type Semantics
            </div>
            <br><br>
            The extensible implementation of types through this project meant that nodes in a data structure were only validated once they were explicitly typed. This choice ensures that untyped data structures remain valid JSON data, but has implications for designing the semantics of types.
            <br><br>
            As a semantic feature was added to the implementation, the possible combinations increased exponentially. As such the validation had to test for all possible cases and combinations of semantics, which in turn informed the design of type semantics.
            <br><br>
            In reflecting on this implementation it became evident that it is missing some features, and that there are better grammatical alternatives to the type semantics derived from testing. This includes semantics for <code>single</code> <code>optional</code> <code>arrayrised</code> <code>regex</code> and <code>enumerated</code> values.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "init": {
        "required": "string", "optional?": "string",
        "object": { "required": "string", "optional?": "string" },
        "array": [ { "required": "string", "optional?": "string" } ],
        "regex": { "type": "regex", "match": [ "j", { "OneOrMore": "word" }, "y" ] },
        "enum": { "type": "string", "case": [ "january", "february", "march" ] }
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/bP51JyCm38Nl-HMHpvMuemacGEA4zWFM7RpMj2cjKnnNeqBzxpJj645mMKx9UyzVdkHjK1HjWcTZDa77bkvCV3qvh0Gx-sdiV1wmU7iMFt3vw5ilLWKvz2Z4klZiIpf7_ukVQgUqk9EPpERc_8zP9y2nKxXDva7eVN12vQn2K75SGMR1z-eyOtkVoZz3_jXGiO2k0TWfGQ08ZhEvlvPX3mb5gAAFjKSEElQKGmolSXR53hMe5tLleO4iHdTCEtdnGZ5xybB6QXP6i8TV7Oc7xWyyAPX3WO4kSEG1POp6Antb-zwX5FL2lgp5R8dBkFel
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <img src="
            http://www.plantuml.com/plantuml/svg/pLJ1JiCm3BtdAwPmhU28X2Oq0H8tJjpO3gR9ja3YL8a3cr3_dMMj8hIvWvv6fLPf_9ptdcjt5Wa29MT5jtgB7eMOHjfQVIlosuE1LG0t-HAJtNK7zVjZy0dLlRS-J2W0nWQ2Hjh7qIlTGpduvzgGBj6rMQtjxgQImMTTB9UglbO5quhksOhfLQzKT2V8kJHeo80rKOUvb3S_ZfQqRNJPERrR8a_W-6XFbp5x7fcBzPpFgdYiCsXSSXcAoRtgC0Y4pT-0IYyXMSh03x1faBa9lj61jeoFCLx6-ndlYVV5Gjjgw9lK43iVBmKnN1CMiX17RE84jzGRqXYDHxR4fPoNN4Vnklv9HvspneVpNecUMm71uMmRZ0HOwoD51SDtEe8hBbdjV1EsrQyaNLfaYyHdZP0uGYel-LmY1Di6J7nHVl9Yfb7bMTWlahFV
        ">
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            Current implementation of type semantics from proposal
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Relational Type
            </div>
            <br><br>
            As a typed object typically inherits other types in object-oriented programming, there is a necessity for declaring relational types as properties of a typed object. This is evident in the implementation through TypeScript, but is missing from my implementation.
            <br><br>
            As a result types cannot reference each other when declared, but can be nested inside each other when instantiated. This is a suboptimal implementation because it results in the intermediary data structure not reflecting the data structure from which it is derived.
            <br><br>
            As an alternative it should be possible to reference not only types from the JSON typeset, but also types that have been declared. Types should be unordered, meaning a type can reference another type before the other type has been declared.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "init": {
        "required": "object",
        "optional?": "enum",
        "object": {
            "required": "string", "optional?": "string"
        },
        "enum": {
            "type": "string", "case": [ "january", "february", "march" ]
        }
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/RP3FIiH03CRlUOeXvmNlikYYWWyX7h9jt9tQ9ZMJ8aNwxkwiTMgfFNM-FxyFSaXEvarI0TWd7rk-W_nwYdGowi8NXCltGDNxi-aWzQEsQi6D9FLaB7xrHMkUe__5Fy_H-UfECC7-Pjw1dmP6YOwtV_fe_354u_gYeXuRhXntYwkzHnLgxxFDCdIBESVNk0qokKKvuMw5AdBfJGKxpsoWFlQy1bQKil8Ii24PoCOill7HVlyxikgCuNLPAOU10qkTZ_yD
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Optional Type
            </div>
            <br><br>
            A typed data structure is verified based on its type conformance, as it is crucial to ensure that the data is correctly formatted and contains the necessary contents to be used in an application. However there can be data that is explicitly not necessary, or data that can have no value.
            <br><br>
            These nullable types can be considered optional, as opposed to required types. The current implementation facilitates nullable types by providing default values, which is a typical practice in object-oriented programming. This is however not semantically ideal for an intermediary data structure, which would not know or necessitate defaults.
            <br><br>
            As an alternative the nullable types could use the <code>null data type</code> from the JSON specification, but this would result in a loss of intended type. Instead I propose using the question mark syntax (?) for optional types.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "init": {
        "type": {
            "required": "string", "optional?": "string"
        }
    },
    "data": {
        "type": {
            "required": "Hello, World!"
        }
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/bP31JiGm34Jl_egGSoNkg88AaE0FE5l4Ae5W5ySLgbRvzssRQjNLxcLpoymRZ-Kk6wfzPs60DjkKw16Mtsl4Nl7N7S3Dxna_VzvKHWulaaITAN8UK8bjzLa2RUWr_Fyh6grkWGBj_TO3DU4ZH_CFkxotQQ2zKbMblp4gXTdnsJHoxvjpGWQBmfYUTiY9A7M36l413MyjVQUKf74VeYdSNGo60j0HX-LyHm00
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Regular Expression (RegEx)
            </div>
            <br><br>
            The current implementation only considers binary validation of types and instances, as they either conform or do not conform. However it is typical to expect some degree of syntactical errors in the contents of a data structure, and this is where a <code>regular expression</code> can be applied.
            <br><br>
            The regular expression is a sequence that acts as pattern for finding or filtering a value of type String. This could be quite easily implemented in the current type semantics, by declaring types as objects containing an explicit regex "type" and "match" describing the sequence.
            <br><br>
            As an alternative to sequences of type String, the Swift 5.7 implementation of regex provides a grammar for arrayrised sequences. It also extrapolates the appropriate regex syntax from more natural human-readable text.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "init": {
        "regex": {
            "type": "regex",
            "match": [
                "My name is",
                { "OneOrMore": "word" },
                "and I am",
                { "OneOrMore": "digit" },
                "years old"
            ]
        }
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/ZP71IWD138RlUOgGi-1TYXGLn4Ff0rWFeHEsexj9oKJgKlRTxQxBeBM7vfPytv_0pB84UxmNKu15YRwLUnYxfyoDSuT7m5CzyFRZsUrJqwErvXZEMlRieZ5njIIpUaa_x7B8H0SOO74xtu6V16NDGNU_ykJIo5STrV66ej_BXavaLcxEXOvZkvkCruegNlMet0dcSXOSwpZ6rofhNvdFHmxcYN3uBnDhmXVaxif5AJSvBc_gXRsWjOd-iBVQ3VNbO2cQnj_v1W00
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
            RegEx in Swift 5.7: https://github.com/apple/swift-evolution/blob/main/proposals/0350-regex-type-overview.md
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<div style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
">
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <div style="color: rgb(145, 145, 145)">
            Type Semantics
        </div>
        <div class="name"></div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5cm;
    ">
        <div style="width: 47.5%">
            <div style="font-size: 2em">
                Enumerated Type
            </div>
            <br><br>
            The contents of a type instance can have requirements beyond its type and whether it is required or optional. These requirements in the current implementation are limited to minimum and maximum value ranges, for numbers and string or array lengths. However the TypeScript implementation provides enumerated types, which are the valid cases of a value.
            <br><br>
            This could be quite easily implemented in the current type semantics, by declaring types as objects containing an explicit "type" and arrayrised "case" values. If the validation was implemented in a text editor, this could illustrate nonconformance before data transmission, as is typical of enumerations in statically typed programming languages through compilation.
        </div>
        <div style="width: 47.5%">
<pre><code>{
    "init": {
        "date": {
            "month": {
                "type": "string", "case": [ "january", "february", "march" ]
            }
        }
    },
    "data": {
        "date": {
            "month": "january"
        }
    }
}</code></pre>
            <img src="
                http://www.plantuml.com/plantuml/svg/bP5DJiGm38NtFaNaTINsQ8H6WCGX61QcCTCCKsVak48Lojtflrhe1g-SzxwNnF8n6QbTKXI0GxBsoW_Gdvu3dPLgzmskgqSgFryqDkAVuZMgCoL9Dr8M6to9dYTq3_-gWl7WPiXmk9lUWJ61GOBX_IgFdepNogZMKQnQv8rrGcjlVCBEnMGQv8p57bLI6gbNS3k55vA6jCN2uGU_wzpNf6M5Vo9l6oN3jii5pCFGVyPRFl7xFiW0HnRVx-S7
            ">
        </div>
    </div>
    <div style="
        display: flex;
        justify-content: space-between;
    ">
        <i style="color: rgb(195, 195, 195)">
        </i>
        <div class="page"></div>
    </div>
</div>

<div style="page-break-after: always">
</div>

<!--Script---------------------------->

<script>

    var names = document.querySelectorAll(".name");
    for (var i = 0; i < names.length; i++) {
        names[i].style.color = "rgb(195, 195, 195)"
        names[i].innerHTML = "Type-Extensible Object Notation: JSON with Syntax for Types"
    }

    var pages = document.querySelectorAll(".page");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.color = "rgb(195, 195, 195)"
        pages[i].innerHTML = `${i+1} of ${pages.length}`
    }

</script>