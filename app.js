// function to restrict what can be entered into the ingredients field
function lettersOnly(input){
    // define regular expression 
    var regex = /[^a-z|\s]/gi;
    // replace anything not defined in the regex with ""
    input.value = input.value.replace(regex, "");

}