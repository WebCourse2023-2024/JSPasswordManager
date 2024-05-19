const rangeInputElement = document.getElementById("rangeInput");
const numberInputElement = document.getElementById("numberInput");
const form = document.getElementById("passwordGeneratorForm");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

rangeInputElement.addEventListener("input", syncCharacterAmount);
numberInputElement.addEventListener("input", syncCharacterAmount);
form.addEventListener("submit", event =>{
    event.preventDefault();
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const characterAmount = numberInputElement.value;
    const password = generatePassWord(characterAmount, includeUppercase, includeNumbers, includeSymbols);

});

function arrayFromLowToHigh(low, high){
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

function syncCharacterAmount(event) {
    const value = event.target.value;
    rangeInputElement.value = value;
    numberInputElement.value = value;
}