// Retrieve DOM elements
const rangeInputElement = document.getElementById("rangeInput");
const numberInputElement = document.getElementById("numberInput");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplayElement = document.getElementById("passwordDisplay");

// Character code arrays for different character types
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

// Event listeners for syncing range and number inputs
rangeInputElement.addEventListener("input", syncCharacterAmount);
numberInputElement.addEventListener("input", syncCharacterAmount);

// Event listener for form submission
form.addEventListener("submit", event => {
    event.preventDefault();
    const characterAmount = numberInputElement.value;
    console.log("character amount : " + characterAmount);
    const password = generatePassWord(characterAmount);
    passwordDisplayElement.innerText = password;
    console.log("password length: " + password.length);
    console.log("password : " + password);
});

/**
 * Generates a random password based on the specified character amount.
 * Distributes characters evenly among lowercase, uppercase, numbers, and symbols.
 *
 * @param {number} characterAmount - The length of the desired password.
 * @returns {string} - The generated password.
 */
function generatePassWord(characterAmount) {
    const baseLength = Math.floor(characterAmount / 4);
    const remainder = characterAmount % 4;

    const lowerCaseCount = remainder > 0 ? baseLength + 1 : baseLength;
    const upperCaseCount = remainder > 1 ? baseLength + 1 : baseLength;
    const numberCount = remainder > 2 ? baseLength + 1 : baseLength;

    // Generate the password by concatenating random characters from each character set
    let password = [].concat(getRandomCharacters(LOWERCASE_CHAR_CODES, lowerCaseCount))
        .concat(getRandomCharacters(UPPERCASE_CHAR_CODES, upperCaseCount))
        .concat(getRandomCharacters(NUMBER_CHAR_CODES, numberCount))
        .concat(getRandomCharacters(SYMBOL_CHAR_CODES, baseLength));

    // Shuffle the password array to ensure randomness
    password.sort(() => Math.random() - 0.5);

    return password.join('');
}

/**
 * Generates an array of random characters from the given character code array.
 *
 * @param {Array} charCodeArray - The array of character codes to choose from.
 * @param {number} count - The number of random characters to generate.
 * @returns {Array} - An array of randomly selected characters.
 */
function getRandomCharacters(charCodeArray, count) {
    let result = [];
    for (let i = 0; i < count; i++) {
        const randomCode = charCodeArray[Math.floor(Math.random() * charCodeArray.length)];
        result.push(String.fromCharCode(randomCode));
    }
    return result;
}

/**
 * Generates an array of numbers from a low value to a high value.
 *
 * @param {number} low - The starting value of the range.
 * @param {number} high - The ending value of the range.
 * @returns {Array} - An array of numbers from low to high.
 */
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

/**
 * Synchronizes the range input and number input values.
 *
 * @param {Event} event - The event object from the input event.
 */
function syncCharacterAmount(event) {
    const value = event.target.value;
    rangeInputElement.value = value;
    numberInputElement.value = value;
}
