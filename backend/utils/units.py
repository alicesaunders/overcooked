# Constants to remove from recipe corpus

UNITS = frozenset({
    "g", "gram", "grams",
    "kg", "kilogram", "kilograms",
    "mg",
    "lb", "lbs", "pound", "pounds",
    "oz", "ounce", "ounces",

    "ml", "l", "litre", "liter", "liters", "litres",
    "cup", "cups", "c",
    "tbsp", "tablespoon", "tablespoons",
    "tsp", "teaspoon", "teaspoons",

    "pinch", "dash",

    "can", "cans",
    "packet", "packets",
    "slice", "slices",
})
