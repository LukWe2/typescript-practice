"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project = {
    projectName: "TypeScript Project",
    userAmount: 20,
    usedFramework: "React",
    isReleased: false,
    monthlyCosts: 500
};
console.log(project);
console.log(`Project Name: ${project.projectName}`);
console.log(project.isReleased);
//project.monthlyCosts = "1000";
//project.projectManager = "Lukas";
// 1. Was erkennt TypeScript automatisch bei diesem Objekt?:
/*
let user = {
    name: "Lukas",
    age: 24
};
*/
// Antwort: es erkennt automatisch die Typen der Objektelemente string und age
// Antwort: TypeScript erkennt automatisch die gesamte Shape inklusive Property-Typen, also nicht nur „es erkennt die Typen“, sondern auch, dass die Properties name und age existieren.
// 2. Warum ist das hier ein Fehler?: user.age = "25";
// Antwort: weil age im Objekt von TypeScript durch Type Inference als number typisiert wurde und man hier versucht, der Property einen String zuzuweisen
// 3. Was bedeutet bei TypeScript die „Shape“ eines Objekts?
// Antwort: Die Shape eines Objekts beschreibt bei einer expliziten Typiserung eines Objekts wie im project-Objekt die explizite Zuweisung von Typen zu den Properties
// Antwort: Deine Richtung stimmt, aber „Shape“ ist etwas allgemeiner als nur die explizite Typisierung. Die Shape eines Objekts beschreibt seine Struktur: Welche Properties gibt es? + Welche Typen haben sie?
// Das gilt unabhängig davon, ob wir sie selbst hinschreiben oder oder TypeScript sie automatisch inferiert. In beiden Fällen kennt TypeScript diese Shape.
//# sourceMappingURL=index.js.map