{"sec":"Unit Testing"}

In this section I illustrate the `unit tests` that I constructed for this experiment. Each test consists of a JSON data structure and a corresponding error message based on the TXON syntax. As such when I describe a `unit` in this experiment, I am referring to a sample data structure that either does not meet the minimum requirements to be validated with `txon.js` or validation was attempted but a nonconformance case was encountered.

<br>

{"sec":"Type declaration units"}

As seen in figure {"ref":"requirementsunits"} the first set of units demonstrate the minimum requirements of a TXON data structure. Only structures containing an `init` property and `data` property at the root node can be validated.

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

As seen in figure {"ref":"sharedvalues"} ...

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
                        "default": "10"
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
                        "minimum": "1"
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
                        "maximum": "15"
                    }
                },
                "data": []
            }
        }
    ]
}

@endjson
@enduml

{"fig":"shared values","caption":"Unit tests for type declarations with shared type, minimum, maximum or default value."}

As seen in figure {"ref":"sharedextension"} ...

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
                        "default": "10"
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
                        "minimum": "5"
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
                        "maximum": "15"
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

As seen in figure {"ref":"declarationmismatch"} ...

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
                            "default": "8"
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
                            "minimum": "1"
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
                            "maximum": "12"
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
                            "default": "8"
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
                            "minimum": "1"
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
                            "maximum": "12"
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
                            "default": "8"
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
                            "minimum": "1"
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
                            "maximum": "12"
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

{"sec":"Type instance units"}

As seen in figure {"ref":"instanceproperty"} ...

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

As seen in figure {"ref":"instancevalue"} ...

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
                    "month": "10"
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

As seen in figure {"ref":"instancevaluearray"} ...

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
                            "month": "10"
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

{"fig":"instancevaluearray","caption":"Unit tests for conformance of arrayrised value type and range in instance."}

{"break":true}