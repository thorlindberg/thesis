


function Item(name, category) {

    this.name = new function() {
        this.type = "string"
        this.enum = null
        this.case = name
    }

    this.category = new function() {

        this.type = "string"
        this.enum = items

        const hasProperty = this.enum.hasOwnProperty(category)
        const hasValue = Object.values(this.enum).includes(category)

        if (hasProperty || hasValue) {
            this.case = this.enum[category]
        } else {
            throw new Error(`case "${category}" not found in enum`)
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
    new Item("Tomatoes", "error")
]

const itemsByValue = [
    new Item("Diet Coke (1.5L)", items.largeDrink),
    new Item("Fanta (0.5L)", items.smallDrink),
    new Item("Olives", items.plant),
    new Item("Olives", items.error)
]









