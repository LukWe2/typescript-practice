function formatInput(input) {
    if (typeof input === "string") {
        console.log(input.toUpperCase());
    }
    else {
        console.log(input * 2);
    }
}
;
formatInput("Hello");
formatInput(4);
function describeValue(value) {
    if (typeof value === "string") {
        console.log(value);
    }
    else if (typeof value === "number") {
        console.log(value + 10);
    }
    else {
        console.log(value ? "True value" : "False value");
    }
}
;
describeValue("Cool");
describeValue(20);
describeValue(true);
export {};
/*
function describeValueFalse(value: string | number | boolean){

    if (typeof value === "string"){
        // Property 'toFixed' does not exist on type 'string'. Did you mean 'fixed'?
        console.log(value.toFixed(2));
    } else if (typeof value === "number"){
        // Property 'toUpperCase' does not exist on type 'number'.
        console.log(value.toUpperCase());
    } else {
        console.log(`${value} value`);
    }
};
*/
// 1. Was bedeutet Type Narrowing?
// Antwort: Type Narrowing bedeutet, dass man genauer eingrenzt, welcher Typ gerade benutzt wird, vorallem bei Unions. Mit typeof kann man in Zweigen festlegen, was bei genau einem der möglichen Typen passieren soll und typspezifische Methoden aufrufen,
// die bei einem Union nicht auf alle zulässigen Typen aufrufbar sind und somit einen Fehler geben würden
// Antwort: Type Narrowing bedeutet, dass TypeScript einen breiteren Typ wie string | number anhand einer Prüfung auf einen konkreteren Typ wie string oder number eingrenzt.
// 2. Welchen Typ hat value hier innerhalb des if?:
/*
function test(value: string | number): void {
    if (typeof value === "string") {
        // Welcher Typ ist value hier?
    }
}
*/
// Antwort: value ist Typ string, da wir mit typeof Type Narrowing anwenden und in diesem Zweig nur der Fall dass value string ist aufgerufen wird
// 3. Welchen Typ hat value hier im else?:
/*
function test(value: string | number): void {
    if (typeof value === "string") {
        // ...
    } else {
        // Welcher Typ ist value hier?
    }
}
*/
// Antwort: Hier hat value den Type number, da im if Zweig der Fall dass value string ist abgedeckt wird und dann aufgrund des Unions value nurnoch number sein kann im else-Zweig
// 4. Warum reicht typeof nicht immer aus, um unterschiedliche Objektarten voneinander zu unterscheiden?
// Antwort: Da typeof bei Objekten nur object zurückgibt und nicht den spezifischen Typen wie wenn es ein Type oder Interface ist
// Antwort: Auch richtig beantwortet. Verschiedene Dinge ergeben bei typeof einfach wie ein Objekt oder Array. Damit kann man nicht erkennen, welche konkrete Objekt-Shape vorliegt.
// Genau deshalb ist das nächste Konzept passend: Dort schauen wir uns Narrowing von Objekten mit in und anschließend instanceof an.
//# sourceMappingURL=index.js.map