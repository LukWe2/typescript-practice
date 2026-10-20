// 19 – Function Types & Callbacks
// Erstelle den Function Type MathOperation für zwei number-Parameter und einen number-Rückgabewert und implementiere damit add und multiply.
// Erstelle calculate(a, b, callback), das eine passende Funktion als Callback erhält und deren Rückgabewert verwendet.
// Erstelle zusätzlich processText(text, callback) mit String-Callbacks wie toUpperCase und addPrefix und teste einen Function Type mit falschem Rückgabetyp.
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
// definieren als zweites Argument in processText() eine Callback Funktion, die bestimmten Typ von Argument und Rückgabewert haben muss, hier nur Definition und Implementation von Body der processText-Funktion, die einfach die Callback-Funktion darin für das erste Argument
// text was ein String ist aufruft
// definieren unten dann zwei Callback Funktionen, die beide funktionieren, die Callback Funktion wird beim Aufruf von processText() dann eben einfach als zweites Argument mit angegeben und je nachdem welche angegeben ist, wird dann logischerweise auch ausgeführt
// processText("Hallo", toUpperCase) -> toUpperCase() wird in Body aufgerufen, processText("Nice", addPrefix) -> addPrefix() wird in Body aufgerufen auf text
// wichtig: wenn in Aufruf die Funktion ohne Klammern also wie hier processText("Hallo", toUpperCase) als ...(... , toUpperCase) aufgerufen wird, dann übergibt man nur die Funktion an sich, wenn man sie mit Klammern aufruft also so: ...(... , toUpperCase()), dann würde
// diese Funktion als Argument direkt aufgerufen werden vor der äußeren Funktion (hier processText), dann gibt man processText() das Ergebnis als Argument, da aber processText eine Funktion erwartet und keinen anderen Wert (wenn toUpperCase() z.B. ein string returned) oder auch
// kein undefined was passieren würde wenn toUpperCase() void zurückgeben würde, man würde also dann processText(text, RÜCKGABERGEBNIS VON HIER AUFGERUFENER METHODE)
// Problem: wenn die Callback Funktion bzw. die übergebene Funktion ein Argument braucht wie z.B. functionWithArgument("Hello"), dann würde sie wegen den Klammern ebenfalls direkt ausgeführt werden
// man kann diese dann in eine Wrapper Funktion packen und sie wird nicht automatisch ausgeführt werden also z.B. processText(text, () => functionWithArgument("Hello"));
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