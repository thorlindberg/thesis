const TXON = {
    handshake: (str) => {
        // handshake between the TXON reqs and data
        return true
    },
    parse: (str) => JSON.parse(str),
    stringify: (obj) => JSON.stringify(obj)
}

const validated = TXON.handshake("{ contract: { }, data: { } }") ; console.log(validated)
const parsed = TXON.parse("{ sample: 'string' }") ; console.log(parsed)
const stringified = TXON.stringify(parsed) ; console.log(stringified)