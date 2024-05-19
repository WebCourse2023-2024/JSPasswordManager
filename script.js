const rangeInputElement = document.getElementById("rangeInput");
const numberInputElement = document.getElementById("numberInput");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplayElement = document.getElementById("passwordDisplay");

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
    const characterAmount = numberInputElement.value;
    console.log("character amount : " + characterAmount);
    const password = generatePassWord(characterAmount);
    passwordDisplayElement.innerText = password;
    console.log("password length: " + password.length);
    console.log("password : " + password);

});

function generatePassWord(characterAmount) {
    const baseLength = Math.floor(characterAmount / 4);
    const remainder = characterAmount % 4;

    const lowerCaseCount = remainder > 0? baseLength + 1: baseLength;
    const upperCaseCount = remainder > 1? baseLength + 1: baseLength;
    const numberCount = remainder > 2? baseLength + 1: baseLength;

    let password = [].concat(getRandomCharacters(LOWERCASE_CHAR_CODES, lowerCaseCount))
        .concat(getRandomCharacters(UPPERCASE_CHAR_CODES, upperCaseCount))
        .concat(getRandomCharacters(NUMBER_CHAR_CODES, numberCount))
        .concat(getRandomCharacters(SYMBOL_CHAR_CODES, baseLength));

    password.sort(() => Math.random() - 0.5);

    return password.join('');
}

function getRandomCharacters(charCodeArray, count) {
    let result = [];
    for (let i = 0; i < count; i++) {
        const randomCode = charCodeArray[Math.floor(Math.random() * charCodeArray.length)];
        result.push(String.fromCharCode(randomCode));
    }
    return result;
}

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