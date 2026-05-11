// function to clean the ingredients input text 
function cleanText(text){
    // define regular expression 
    var regex = /[^a-z\s]/gi;
    return text.replace(regex, "");
}

// function to check if ingredient already exists in the list 
function checkDuplicates(textInput){
    var ingredList = document.getElementById("ingredients-list");
    var values = [];

    for (var i=0; i<ingredList.length; i++){
        values.push(ingredList[i].value);
    }

    if (textInput in values){
        return true
    } else {
        return false
    }        
}

// Function to add remove functionality to an ingredient in the list 
function addRemoveFunctionality(ingredient) {
  const removeButton = ingredient.querySelector('.remove-btn');
  removeButton.addEventListener('click', () => {
    ingredient.remove(); // Remove the ingredient when the button is clicked
  });
}

// Add remove functionality to existing tasks
document.querySelectorAll('#ingredients-list .remove-btn').forEach(btn => {
  addRemoveFunctionality(btn.parentElement);
});


// Add ingredients data to a list 
function pushData(){
    // get ingredient list element (ul)
    let ingredList = document.getElementById("ingredients-list");
    // get value of the user's text input
    let inputText = document.getElementById("ingredients");

    // clean the input 
    var original = inputText.value;
    var cleaned = cleanText(original);

    // error catching - if user does not enter valid ingredient 
    if (cleaned.trim() === "") {
        document.getElementById("error-message").textContent =
            "Please enter the ingredient name in full! Numbers or special characters are not permitted";
        // empty the text input field
        inputText.value = ""
    } else if (checkDuplicates(cleaned)){
        // empty the text input field 
        inputText.value = ""
    } else {
        document.getElementById("error-message").textContent = "";
        
        // new HTML element to add to the list 
        let newItem = document.createElement("li");
        // create a text node 
        var node = document.createTextNode(cleaned);
        // create a remove button 
        var removeButton = document.createElement('button'); 
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // add the text node to the new list item 
        newItem.appendChild(node);
        // add remove button to the new list item 
        newItem.appendChild(removeButton);

        // Add remove functionality to the new list item 
        addRemoveFunctionality(newItem);

        // add the list item to the list 
	    ingredList.appendChild(newItem);

        // empty the text input field
        inputText.value = "";
        }
}


// Actions after submit button is pushed
// collate all the ingredients + put into an array 


