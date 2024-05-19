const rangeInputElement = document.getElementById("rangeInput");
const numberInputElement = document.getElementById("numberInput");

rangeInputElement.addEventListener("input", syncCharacterAmount);
numberInputElement.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(event) {
    const value = event.target.value;
    rangeInputElement.value = value;
    numberInputElement.value = value;
}