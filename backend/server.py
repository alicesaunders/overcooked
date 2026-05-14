from flask import Flask, request, jsonify
from flask_cors import CORS

# create flask app 
app = Flask(__name__)
# allow front end requests 
CORS(app)

# define an api route 
@app.route("/recipes", methods=["POST"])

# define function for the route 
def get_recipes():
    data = request.json

    ingredients = data["ingredients"]

    # add semantic search here
    # recipes = semantic_search(ingredients)

    # example output - need json format
    recipes = [
        {
            "id": 1,
            "title": "Tomato Pasta",
            "ingredients": ["tomato", "pasta", "garlic"]
        },
        {
            "id": 2,
            "title": "Onion Soup",
            "ingredients": ["onion", "butter"]
        }
    ]

    return jsonify(recipes)


# define route for separate results page 
@app.route("/recipe/<int:recipe_id>")
def get_recipe(recipe_id):

    recipes = [
        {
            "id": 1,
            "title": "Tomato Pasta",
            "ingredients": ["tomato", "pasta", "garlic"],
            "instructions": "Boil pasta..."
        },
        {
            "id": 2,
            "title": "Onion Soup",
            "ingredients": ["onion", "butter"],
            "instructions": "Cook onions..."
        }
    ]

    recipe = next(
        (r for r in recipes if r["id"] == recipe_id),
        None
    )

    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    return jsonify(recipe)

if __name__ == "__main__":
    app.run(debug=True)