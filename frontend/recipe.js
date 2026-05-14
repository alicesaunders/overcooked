async function loadRecipe() {

    try {

        const params =
            new URLSearchParams(window.location.search);

        const recipeId = params.get("id");

        console.log(recipeId);

        const response = await fetch(
            `http://127.0.0.1:5000/recipe/${recipeId}`
        );

        if (!response.ok) {
            throw new Error("Recipe not found");
        }

        const recipe = await response.json();

        console.log(recipe);

        displayRecipe(recipe);

    } catch(error) {

        console.error(error);

        document.getElementById("recipe-container")
            .innerHTML =
            "<h1>Failed to load recipe</h1>";
    }
}

loadRecipe();

function displayRecipe(recipe) {

    const container =
        document.getElementById("recipe-container");

    container.innerHTML = `
        <h1>${recipe.title}</h1>

        <h2>Ingredients</h2>

        <p>${recipe.ingredients.join(", ")}</p>

        <h2>Instructions</h2>

        <p>${recipe.instructions}</p>
    `;
}

