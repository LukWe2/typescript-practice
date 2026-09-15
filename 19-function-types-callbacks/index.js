// Kann auch Typen für Funktionen festlegen, die beschreiben von welchem Typ deren Argumente dann haben müssen und welchen Typen von Rückgabe also jede die diesen Typ besitzen
// Kann innerhalb von Funktionskopf eine weitere Funktion aufrufen, was eine Callback Funktion ist
// kann entweder bei der Definition dieser Callback Funktion im Methodenkopf die Typen für Argumente und Rückgabe definieren:
/*
const calculate = function(a: number, b: number, callback: (number01: number, number02: number) => number){
    return callback(a, b);
}
*/
// oder direkt einen vorher definierten Typen mitgeben wie hier MathOperation: const calculate = function(a: number, b: number, callback: MathOperation){ callback(a, b); } 
const add = (a, b) => {
    return a + b;
};
const multiply = function (a, b) {
    return a * b;
};
console.log(add(2, 3));
console.log(multiply(4, 3));
const calculate = function (a, b, callback) {
    return callback(a, b);
};
console.log(calculate(5, 3, add));
console.log(calculate(5, 3, multiply));
// hier wieder explizite Definition der Typen für Argumente und Rückgabewerte der Callback Funktion innerhalb des Methodenkopfes der aufrufenden Funktion, statt direkt einen Typen zuzuweisen wie callback: TextType
// wenn TextType = ( value: string ) => string;
function processText(text, callback) {
    return callback(text);
}
;
// Callback Funktion 1:
const toUpperCase = (value) => {
    return value.toUpperCase();
};
// Callback Funktion 2:
const addPrefix = function (value) {
    return `Result: ${value}`;
};
console.log(processText("Hallo", toUpperCase));
console.log(processText("Nice", addPrefix));
export {};
/*
// Test wegen Function Type (geht nicht um Callback Function hier), gleiche Signatur wie oben add()
const wrongOperation: MathOperation = (
    a,
    b
) => {
    return `${a + b}`;
};
*/
//# sourceMappingURL=index.js.map