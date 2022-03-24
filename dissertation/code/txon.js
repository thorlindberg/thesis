const TXON = {
    json: (str) => {
        // parse (check) txon string to json string
        return str
    },
    parse: (str) => JSON.parse(str),
    stringify: (obj) => JSON.stringify(obj)
}

const jsoned = TXON.json("Hello") ; console.log(jsoned)
const parsed = TXON.parse("{ sample: 'string' }") ; console.log(parsed)
const stringified = TXON.stringify(parsed) ; console.log(stringified)