// function to restrict what can be entered into the ingredients field
function lettersOnly(input){
    // define regular expression 
    var regex = /[^a-z|\s]/gi;
    // store value from the input field
    var original = input.value 
    // replace anything not defined in the regex with ""
    input.value = input.value.replace(regex, "");
    // check if anything was removed
    if (original !== input.value) {
        document.getElementById("error-message").textContent =
            "Please only enter the ingredient name in full!";
    } else {
        document.getElementById("error-message").textContent = "";
    }
}