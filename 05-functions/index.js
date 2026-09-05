"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function giveProject(projectName, amountUser) {
    return (`Project name: ${projectName}, amount of users: ${amountUser}`);
}
console.log(giveProject("TypeScript project", 30));
function calculatePriceTotal(monthlyPrice, amountMonths) {
    const totalAmount = monthlyPrice * amountMonths;
    return totalAmount;
}
console.log(calculatePriceTotal(5, 800));
function printString(text) {
    console.log(text);
}
printString("Hello");
//printString(30);
// 1. Was bedeutet hier das letzte : number?:
/*
function add(a: number, b: number): number {
    return a + b;
}
*/
// Antwort: es bedeutet der festgelegte Typ der Rückgabe der Funktion, die Funktion muss einen Wert dieses Typen zurückgeben sonst wird ein Fehler geworfen
// Antwort: Genauer nur: TypeScript meldet einen Compiler-/Typfehler, statt dass zur Laufzeit ein Fehler „geworfen“ werden muss. Wenn number angegeben ist, Funktion soll einen number zurückgeben.
// 2. Was ist der Unterschied zwischen einem Parameter und einem Argument?
// Antwort: Ein Parameter ist eine Variable die im Methodenkopf einer Funktion deklariert wird, ein Argument ein Wert der beim Aufruf einer Methode angegeben wird
// Antwort: Ein Parameter ist eine Variable, die im Funktionskopf deklariert wird. Ein Argument ist ein tatsächlicher Wert, der beim Aufruf übergeben wird. 
// Nur eine kleine sprachliche Sache: Du hast „Methodenkopf“ geschrieben. Allgemeiner ist Funktionskopf, weil nicht jede Funktion eine Methode ist.
// 3. Wann verwendet man als Rückgabetyp void?
// Antwort: Man verwendet void wenn die Funktion nichts zurückgeben soll, void bedeutet kein spezifischer Typ
// Antwort: Besser: void bedeutet als Rückgabetyp, dass von der Funktion kein nutzbarer Rückgabewert erwartet wird.
// Ja — wenn du den Rückgabetyp explizit als void angibst und dann einen konkreten Wert zurückgibst, ist das normalerweise ein TypeScript-Fehler.
// Das ist falsch, weil die Funktion laut Signatur keinen nutzbaren Wert zurückgeben soll, du aber einen string zurückgibst:
/*
function printMessage(): void {
    return "Hello";
}
*/
// Erlaubt ist dagegen ein nacktes return, denn damit beendest du nur die Funktion, ohne einen Wert zurückzugeben:
/*
function printMessage(): void {
    console.log("Hello");

    return;
}
*/ 
//# sourceMappingURL=index.js.map