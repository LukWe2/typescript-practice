// 02 – Type Inference
// Erstelle Variablen für Projektname, Nutzeranzahl, Veröffentlichungsstatus, monatliche Kosten und Framework ohne explizite Typangaben und gib sie aus.
// Weise anschließend zwei Variablen absichtlich Werte eines falschen Typs zu und beobachte die durch Type Inference erkannten Fehler.
let projectName = "TypeScript Practice";
let playerAmount = 5;
let isProjectReleased = false;
let monthlyCosts = 500;
let usedFramework = "React";
console.log(`Project name: ${projectName}, Player Amount: ${playerAmount}, Project released: ${isProjectReleased}, Monthly Costs: ${monthlyCosts}, used framework: ${usedFramework}`);
export {};
// Wenn ich let age = 24; schreibe, habe ich dann eine untypisierte Variable erstellt?
// Antwort: Nein, TypeScript typisiert die Variable automatisch wenn kein Typ explizit angegeben ist -> heißt Type Inference
// Antwort: Nein, let age = 24 erzeugt keine untypisierte Variable. TypeScript erkennt anhand des Wertes 24, dass age vom Typ number ist. Das nennt man Type Inference.
//# sourceMappingURL=index.js.map