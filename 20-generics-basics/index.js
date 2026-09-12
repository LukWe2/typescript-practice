"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(value) {
    return value;
}
;
const stringValue = identity("Hallo");
const numberValue = identity(42);
const booleanValue = identity(true);
console.log(stringValue);
console.log(numberValue);
console.log(booleanValue);
function getFirst(values) {
    return values[0];
}
console.log(getFirst([2, 3, 4, 6]));
console.log(getFirst(["Hi", "Bye", "What"]));
function createPair(firstValue, secondValue) {
    return [firstValue, secondValue];
}
const [first, second] = createPair("Lukas", 24);
console.log(first);
console.log(second);
const stringResponse = {
    data: "20 degrees",
    success: true
};
const numberResponse = {
    data: 42,
    success: false
};
/*
const falseResponse: ApiResponse<number> = {
    data: "Hello",
    success: true
};
*/
// 1. Was ist T hier?:
/*
function identity<T>(value: T): T {
    return value;
}
*/
// Antwort: T ist hier der Generic also der Typ des Arguments und des Rückgabewertes wird noch nicht festgelegt sondern kann jeder Typ sein, somit ist die Funktion generell für alle Typen einsetzbar, statt dass man für jeden Typ eine eigene braucht.
// Antwort: Richtig. T ist ein generischer Typ-Parameter, also ein Platzhalter für einen konkreten Typ. Beim Aufruf wird festgelegt bzw. inferiert, was T ist. Dadurch brauchst du nicht für string, number, boolean usw. jeweils eine eigene Funktion.
//2. Warum ist Generic hier besser als any****?
/*
function identity<T>(value: T): T

gegenüber:

function identity(value: any): any
*/
// Antwort: Es ist besser, da mit any der Typ der Variable value und des Rückgabewertes "verloren" geht. Wenn sie generell formuliert ist für alle Typen, dann ist auch das Argument und Rückgabewert am Ende von diesem Typ, sonst wäre der Typ any.
// Antwort: Auch richtig. Mit any geht die konkrete Typinformation verloren. Bei function identity<T>(value: T): T bleibt die Beziehung erhalten: Input-Typ = T, Output-Typ = derselbe T
// 3. Was erkennt TypeScript hier für T?: const value = identity(42);
// Antwort: TypeScript erkennt hier für T den Typen number, da 42 ein Wert vom Typ number ist. Somit ist das Argument number und auch der Rückgabewert, da T den Typ number hat und das dann für beide gilt.
// 4. Was bedeuten T und U hier?
/*
function createPair<T, U>(
    first: T,
    second: U
): [T, U]
*/
// Antwort: T ist der Typ des ersten Arguments der Variable, welcher eben flexibel ist und U der der zweiten Variable. Man kann wie hier auch zwei generische Variablen erstellen.
// Antwort: Auch richtig. Zwei verschiedene Generic-Parameter bedeuten, dass beide Typen unabhängig voneinander sein dürfen:
//5. Was bedeutet: ApiResponse<string> wenn definiert wurde:
/*
type ApiResponse<T> = {
    data: T;
    success: boolean;
};
*/
//Antwort: Es bedeutet dass hier der Typ string für den Generic Type Alias ApiResponse benutzt wird, heißt das T ist von Typ string, und somit auch der Parameter data. Hier wird ein Objekt beschrieben mit einem Generic,
// das ist etwas als das Erstellen eines Types für eine Function (siehe Notizen)
//# sourceMappingURL=index.js.map