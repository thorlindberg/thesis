function Item(name, category) {

    const types = {
        undefined: "undefined",
        string: "string",
        number: "number",
        boolean: "boolean",
        object: "object",
        nil: "null"
    }

    this.name = new function() {
        this.type = types.string
        this.enum = null
        if (typeof name == this.type) {
            this.value = name
        } else {
            throw new TypeError(`type mismatch between value: ${name} and type: ${this.type}`)
        }
    }

    this.category = new function() {

        this.type = types.string
        this.enum = items

        const hasProperty = this.enum.hasOwnProperty(category)
        const hasValue = Object.values(this.enum).includes(category)

        if (hasProperty) {
            this.value = this.enum[category]
        } else if (hasValue) {
            this.value = category
        } else {
            throw new Error(`case: ${category} not found in enum: ${this.enum}`)
        }

    }

}

const items = {
    largeDrink: "🍺",
    smallDrink: "🥤",
    meat: "🥩",
    plant: "🌱",
    dairy: "🧀",
    cake: "🍪",
    dough: "🍞"
}

const itemsByKey = [
    new Item("Diet Coke (1.5L)", "largeDrink"),
    new Item("Fanta (0.5L)", "smallDrink"),
    new Item("Olives", "plant"),
    // new Item("Tomatoes", "error")
]

const itemsByValue = [
    new Item("Diet Coke (1.5L)", items.largeDrink),
    new Item("Fanta (0.5L)", items.smallDrink),
    new Item("Olives", items.plant),
    // new Item("Olives", items.error)
]