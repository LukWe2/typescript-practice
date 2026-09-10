// Kann auch Typen für Funktionen festlegen, die beschreiben von welchem Typ deren Argumente dann haben müssen und welchen Typen von Rückgabe also jede die diesen Typ besitzen
// Kann innerhalb von Funktionskopf eine weitere Funktion aufrufen, was eine Callback Funktion ist
// kann entweder bei der Definition dieser Callback Funktion im Methodenkopf die Typen für Argumente und Rückgabe definieren:
/*
const calculate = function(a: number, b: number, callback: (number01: number, number02: number) => number){
    return callback(a, b);
}
*/
// oder direkt einen vorher definierten Typen mitgeben wie hier MathOperation: const calculate = function(a: number, b: number, callback: MathOperation){ callback(a, b); } 

type MathOperation = (

    number01: number,
    number02: number
 ) => number;


const add: MathOperation = (a, b) => {

return a + b;
};

const multiply: MathOperation = function(a, b){

return a * b;
};

console.log(add(2, 3));
console.log(multiply(4, 3));

const calculate = function(a: number, b: number, callback: MathOperation){

    return callback(a, b);
}

console.log(calculate(5, 3, add));
console.log(calculate(5, 3, multiply));

// hier wieder explizite Definition der Typen für Argumente und Rückgabewerte der Callback Funktion innerhalb des Methodenkopfes der aufrufenden Funktion, statt direkt einen Typen zuzuweisen wie callback: TextType
// wenn TextType = ( value: string ) => string;
function processText(text: string, callback: (value: string) => string){

    return callback(text);
};

// Callback Funktion 1:
const toUpperCase = (value: string): string => {

    return value.toUpperCase();
}

// Callback Funktion 2:
const addPrefix = function(value: string): string {

    return `Result: ${value}`;
}

console.log(processText("Hallo", toUpperCase));
console.log(processText("Nice", addPrefix));

/*
// Test wegen Function Type (geht nicht um Callback Function hier), gleiche Signatur wie oben add()
const wrongOperation: MathOperation = (
    a,
    b
) => {
    return `${a + b}`;
};
*/
