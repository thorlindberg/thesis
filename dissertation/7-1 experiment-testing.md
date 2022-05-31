{"sec":"Unit Testing for Validation"}

In this section I present the `unit tests` that I constructed for this experiment. Each test consists of a JSON data structure and a corresponding error message based on the TXON syntax. As such when I describe a `unit` in this experiment, I am referring to a sample data structure that either does not meet the minimum requirements to be validated with `TXON.js` or validation was attempted but a nonconformance case was encountered.

<br>

{"sub":"Type declaration units"}

As seen in figure {"ref":"requirementsunits"} these units demonstrate that a TXON data structure must contain an `init` property and `data` property at its root node, before it can be validated.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": true,
            "feedback": "\"init\" property not found at top level",
            "json": {
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "\"data\" property not found at top level",
            "json": {
                "init": {}
            }
        }
    ]
}

@endjson
@enduml

{"fig":"requirementsunits","caption":"Unit tests for a type initialiser or data at the root node."}

As seen in figure {"ref":"sharedvalues"} the properties of a declared type must either conform to a shared requirement, if one has been declared, or declare its own local requirements.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": true,
            "feedback": "type \"date\" has invalid shared JSON \"type\" declaration \"double\"",
            "json": {
                "init": {
                    "date": {
                        "type": "double"
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has shared default of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": "\"10\""
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has shared minimum of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": "\"1\""
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has shared maximum of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": "\"15\""
                    }
                },
                "data": []
            }
        }
    ]
}

@endjson
@enduml

{"fig":"sharedvalues","caption":"Unit tests for type declarations with shared type, minimum, maximum or default value."}

{"break":true}

As seen in figure {"ref":"sharedextension"} the properties of a declared extension must either conform to a shared requirement, if one has been declared, or declare its own local requirements.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": true,
            "feedback": "extension \"number.date\" has shared default of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": "\"10\""
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "extension \"number.date\" has shared minimum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": "\"5\""
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "extension \"number.date\" has shared maximum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": "\"15\""
                    }
                },
                "data": []
            }
        }
    ]
}

@endjson
@enduml

{"fig":"sharedextension","caption":"Unit tests for type extensions with shared minimum, maximum or default value."}

As seen in figure {"ref":"declarationmismatch"} the properties or cases of a declared type or extension must conform to their local requirements.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": true,
            "feedback": "type \"number.date\" has case declaration array with invalid contents",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "case": [
                            100
                        ]
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with default of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": "\"8\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with minimum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": 8,
                            "minimum": "\"1\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with maximum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "type": "number",
                            "default": 8,
                            "minimum": 1,
                            "maximum": "\"12\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with default of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": "\"8\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with minimum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": "\"1\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"number.date\" has property \"month\" with maximum of mismatched type \"string\"",
            "json": {
                "init": {
                    "number.date": {
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": 1,
                            "maximum": "\"12\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has property \"month\" with default of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": "\"8\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has property \"month\" with minimum of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": "\"1\""
                        }
                    }
                },
                "data": []
            }
        },
        {
            "valid": true,
            "feedback": "type \"date\" has property \"month\" with maximum of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "default": 10,
                        "minimum": 5,
                        "maximum": 15,
                        "month": {
                            "default": 8,
                            "minimum": 1,
                            "maximum": "\"12\""
                        }
                    }
                },
                "data": []
            }
        }
    ]
}

@endjson
@enduml

{"fig":"declarationmismatch","caption":"Unit tests for property names of declaration and conformance of types."}

{"break":true}

{"sub":"Type instance units"}

As seen in figure {"ref":"instanceproperty"} a node that references a type in the data node must instantiate all required properties from the respective type declaration.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": false,
            "feedback": "instance of type \"date\" missing required property \"month\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date"
                }
            }
        }
    ]
}

@endjson
@enduml

{"fig":"instanceproperty","caption":"Unit test for conformance of required properties in instance."}

As seen in figure {"ref":"instancevalue"} a node that references a type in the data node must instantiate a property with its declared value type and within its range.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": false,
            "feedback": "instance of type \"date\" has property \"month\" of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "month": "\"10\""
                }
            }
        },
        {
            "valid": false,
            "feedback": "instance of type \"date\" has property \"month\" with value \"0\" below minimum \"1\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "month": 0
                }
            }
        },
        {
            "valid": false,
            "feedback": "instance of type \"date\" has property \"month\" with value \"13\" above maximum \"12\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "month": 13
                }
            }
        }
    ]
}

@endjson
@enduml

{"fig":"instancevalue","caption":"Unit tests for conformance of value type and range in instance."}

As seen in figure {"ref":"instancevaluearray"} a node that references a type in the data node must instantiate an arrayised property with its declared value type and within its range.

@startuml
@startjson

<style>
jsonDiagram {
    BackGroundColor transparent
    node {
        BackGroundColor white
        highlight {
            BackGroundColor #ffdc7d
        }
    }
}
</style>

{
    "units": [
        {
            "valid": false,
            "feedback": "instance of type \"date\" has \"values\" array containing property \"month\" of mismatched type \"string\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "values": [
                        {
                            "month": "\"10\""
                        }
                    ]
                }
            }
        },
        {
            "valid": false,
            "feedback": "instance of type \"date\" has \"values\" array containing property \"month\" with value \"0\" below minimum \"1\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "values": [
                        {
                            "month": 0
                        }
                    ]
                }
            }
        },
        {
            "valid": false,
            "feedback": "instance of type \"date\" has \"values\" array containing property \"month\" with value \"13\" above maximum \"12\"",
            "json": {
                "init": {
                    "date": {
                        "type": "number",
                        "day": {
                            "default": 1
                        },
                        "month": {
                            "minimum": 1,
                            "maximum": 12
                        }
                    }
                },
                "data": {
                    "type": "date",
                    "values": [
                        {
                            "month": 13
                        }
                    ]
                }
            }
        }
    ]
}

@endjson
@enduml

{"fig":"instancevaluearray","caption":"Unit tests for conformance of arrayised value type and range in instance."}

{"break":true}