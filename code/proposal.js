// this document represents my proposal for the examination

const extendedType = {
    "init": {
        "number.date": [ "day", "month", "year" ]
    },
    "data": {
        "date": {
            "type": "number.date",
            "day": 27,
            "month": 4,
            "year": 1997
        }
    }
}

const sharedType = {
    "init": {
        "date": {
            "type": "number",
            "case": [ "day", "month", "year" ]
        }
    },
    "data": {
        "date": {
            "type": "number.date",
            "day": 27,
            "month": 4,
            "year": 1997
        }
    }
}

const localType = {
    "init": {
        "date": {
            "day" : "number",
            "month": "number",
            "year": "number"
        }
    },
    "data": {
        "date": {
            "type": "date",
            "day": 27,
            "month": 4,
            "year": 1997
        }
    }
}