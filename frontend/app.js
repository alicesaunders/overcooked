// function to clean the ingredients input text 
function cleanText(text){
    // define regular expression 
    var regex = /[^a-z\s]/gi;
    return text.replace(regex, "");
}

// function to check if ingredient already exists in the list 
function checkDuplicates(textInput){
    var ingredList = document.getElementById("ingredients-list");
    var ingredItems = ingredList.getElementsByTagName("li");

    var values = [];

    for (var i=0; i < ingredItems.length; i++){
        values.push(ingredItems[i].dataset.ingredient);
    }

    return values.includes(textInput);
}        


// Function to add remove functionality to an ingredient in the list 
function addRemoveFunctionality(ingredient) {
  const removeButton = ingredient.querySelector('.remove-btn');
  removeButton.addEventListener('click', () => {
    ingredient.remove(); // Remove the ingredient when the button is clicked
  });
}

// Add remove functionality to existing ingredients
document.querySelectorAll('#ingredients-list .remove-btn').forEach(btn => {
  addRemoveFunctionality(btn.parentElement);
});

// Add edit functionality to existing ingredients
function addEditFunctionality(ingredient) {
    const editButton = ingredient.querySelector('.edit-btn');
    const saveButton = ingredient.querySelector(".save-btn");
    const textSpan = ingredient.querySelector(".ingredient-text");
    const editInput = ingredient.querySelector(".edit-input");
    const errorMessage = ingredient.querySelector(".edit-error")

    // enter edit mode 
    editButton.addEventListener('click', () => {
        editInput.value = textSpan.textContent;
        textSpan.style.display = "none";
        editButton.style.display = "none";
        editInput.style.display = "inline-block";
        saveButton.style.display = "inline-block";
    });

    // save updated ingredient 
    saveButton.addEventListener("click", () => {
        const cleaned = cleanText(editInput.value).toLowerCase();

        // check input is valid 
        if (cleaned.trim() === "") {
            errorMessage.textContent =
                "Please enter a valid ingredient";
            return;
        }

        // duplicate check 
        const currentIngredient = ingredient.dataset.ingredient;
        ingredient.dataset.ingredient = ""; // temporarily remove current value
        if (checkDuplicates(cleaned)) {
            errorMessage.textContent =
                "Ingredient already exists";
            ingredient.dataset.ingredient =
                currentIngredient; // add current value back in again 
            return;
        }

        // clear error
        errorMessage.textContent = "";

        // update visible text
        textSpan.textContent = cleaned;

        // update dataset
        ingredient.dataset.ingredient = cleaned;

        // EXIT EDIT MODE
        textSpan.style.display = "inline";
        editButton.style.display = "inline-block";
        editInput.style.display = "none";
        saveButton.style.display = "none";

    });
}


// Add ingredients data to a list 
function pushData(){
    // get ingredient list element (ul)
    var ingredList = document.getElementById("ingredients-list");
    // get the user's text input
    var inputText = document.getElementById("ingredients");
    // clean the input 
    var original = inputText.value;
    var cleaned = cleanText(original).toLowerCase();

    // error catching - if user does not enter valid ingredient 
    if (cleaned.trim() === "") {
        document.getElementById("error-message").textContent =
            "Please enter the ingredient name in full! Numbers or special characters are not permitted";
        // empty the text input field
        inputText.value = ""

    } else if (checkDuplicates(cleaned)){
         document.getElementById("error-message").textContent =
        "Ingredient already exists in the list";

        // empty the text input field 
        inputText.value = ""

    } else {
        document.getElementById("error-message").textContent = "";
        
        // new HTML element to add to the list 
        let newItem = document.createElement("li");

        // add ingredient to dataset item 
        newItem.dataset.ingredient = cleaned;

        // create a span (editable) for ingredient text 
        const ingredientText = document.createElement("span");
        ingredientText.textContent = cleaned;
        ingredientText.classList.add("ingredient-text");

        // create a remove button 
        var removeButton = document.createElement('button'); 
        removeButton.textContent = 'Remove'; // add text content
        removeButton.classList.add('remove-btn'); // add styling 

        // create an edit button 
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');

        // add inline editor 
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = cleaned;
        editInput.classList.add("edit-input");
        editInput.style.display = "none";

        // save inline edits
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("save-btn");
        saveButton.style.display = "none";

        // inline edit error message
        const editError = document.createElement("p");
        editError.classList.add("edit-error");

        // append all to the new list item 
        newItem.appendChild(ingredientText); // text span with ingredient
        newItem.appendChild(editInput); // inline editor
        newItem.appendChild(editButton); // edit button
        newItem.appendChild(saveButton); // save button
        newItem.appendChild(removeButton); // remove button
        newItem.appendChild(editError); // inline edit error

        // Add remove/edit functionality to the new list item 
        addRemoveFunctionality(newItem);
        addEditFunctionality(newItem);

        // add the list item to the list 
	    ingredList.appendChild(newItem);

        // empty the text input field
        inputText.value = "";
        }
}


// Actions after submit button is pushed
// collate all the ingredients + put into an array 
async function createArray() { 

    // change to results page 
    document.getElementById("input-page").style.display = "none";
    document.getElementById("results-page").style.display = "block";

    // create an array 
    var ingreds = document.querySelectorAll("#ingredients-list li");
    var arr = [...ingreds].map(
        item => item.dataset.ingredient
    );

    // display the ingredients on the results page
    const resultsList = document.getElementById(
    "results-ingredients-list"
    );

    resultsList.innerHTML = "";

    arr.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        resultsList.appendChild(li);
    });
    
    // send ingredients to flask backend 
    const response = await fetch("http://127.0.0.1:5000/recipes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            ingredients: arr
        })
    });

    // convert response into JS object
    const recipes = await response.json();

    console.log(recipes);

    displayRecipes(recipes);

}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById("recipe-results");

    resultsDiv.innerHTML = "";

    recipes.forEach(recipe => {

        const recipeCard = document.createElement("div");

        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h3>
                <a href="recipe.html?id=${recipe.id}">
                ${recipe.title}
                </a>
            </h3>

            <p>${recipe.ingredients.join(", ")}</p>
        `;

        resultsDiv.appendChild(recipeCard);
    });
}


