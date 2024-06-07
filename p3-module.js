// Function to check if the denomination of the coin is valid
function validDenomination(coin) {
    const validDenoms = [1, 5, 10, 25, 50, 100];
    return validDenoms.indexOf(coin) !== -1;
}

// Function to calculate the value of a single coin object
function valueFromCoinObject({denom = 0, count = 0}) {
    return denom * count;
}

// Function to calculate the total value from an array of coin objects
function valueFromArray(arr) {
    return arr.reduce((accumulator, currentObj) => accumulator + valueFromCoinObject(currentObj), 0);
}

// Main function to be exported; calculates total coin value from multiple coin objects
function coinCount(...coinage) {
    return valueFromArray(coinage);
}

// Export the coinCount function
module.exports = { coinCount };