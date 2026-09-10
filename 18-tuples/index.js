"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const developer01 = ["Lukas", 24, "React", true];
const developer02 = ["Anna", 22, "Angular", false];
function printDeveloper(developer) {
    // beim Zugriff jetzt nicht developer.name, developer.age und developer.framework, weil kein Objekt und Properties sondern nur benannte Tuple Elemente (Named Tuple Elements), deswegen Zugriff mit Index
    console.log(`Name: ${developer[0]}, Age: ${developer[1]}, Framework: ${developer[2]}`);
}
printDeveloper(developer01);
const [name, age, framework, isWorking] = developer02;
// hatte vorher: `Name: ${developer02[0]}, Age: ${developer02[1]}, Framework: ${developer02[2]}`, soll aber nicht mit Indizes in Tupel auf Elemente zugreifen, sondern eben mit dem Destructuring erstellten Variablen
console.log(`Name: ${name}, Age: ${age}, Framework: ${framework}, Working: ${isWorking}`);
function getCoordinates(latitude, longitude) {
    return [latitude, longitude];
}
const [latitudeVariable, longitudeVariable] = getCoordinates(4, 6);
console.log(`Latitude: ${latitudeVariable}, Longitude: ${longitudeVariable}`);
// Reihenfolge der Typen stimmt nicht, in Tupel ist erst string, dann number deklariert aber hier wird ein Array mit einem Wert von number als erstes und dann als zweites string erstellt was zu einem Fehler führt
// Type 'number' is not assignable to type 'string'. und Type 'string' is not assignable to type 'number'.
/*
const wrongDeveloper: DeveloperTuple = [
    24,
    "Lukas",
    "React",
    true
];
*/
// 1. Was ist der wichtigste Unterschied zwischen (string | number)[] und [string, number]?
// Antwort: Das erste ist ein Union Array, heißt die Elemente des Arrays können alle entweder den Typen string oder number haben, egal von der Reihenfolge her
// beim zweiten wird ein Tupel definiert, also auch ein Array aber es muss genau die Anzahl, die Typen und die Reihenfolge der spezifizerten Typen innerhalb der eckigen Klammern haben
// Antwort: Deine Antwort passt. Noch präziser: (string | number)[] ist ein normales Array, bei dem jedes Element entweder string oder number sein darf. Länge und Reihenfolge sind flexibel.
// [string, number] ist ein Tuple mit fester Struktur: Index 0 → string und Index 1 → number
// 2. Warum ist das hier falsch?: let user: [string, number] = [24, "Lukas"];
// Antwort: Das ist falsch, weil mit dem Tupel genau die Reihenfolge und Typen festgelegt werden, die im Array vorkommen dürfen
// Antwort: Richtig. Bei einem Tuple sind Typ und Position festgelegt
// 3. Was ist ein typischer Use Case für Tuples?
// Antwort: Wenn eine Funktion mehrere Typen zurückgibt oder in React der useState
// Antwort: Auch richtig. Besonders gut sind: kleine feste Rückgabestrukturen von Funktionen, Destructuring, React-Patterns wie useState()
// 4. Was passiert bei diesem Destructuring?: const [name, age] = user;
// Antwort: bei diesem Destructuring werden in die zwei links definierten Variablen die zwei Elemente des Tupels user gepackt
// Antwort: Deine Erklärung stimmt. Wenn user z. B. ist: ["Lukas", 24] dann wird: name = "Lukas" age = 24 und TypeScript kennt automatisch die jeweiligen Typen.
// 5. Wann würdest du eher ein Objekt statt eines Tuples verwenden?
// Antwort: Wenn Position der Elemente selbst keine Bedeutung hat oder bei komplexeren also vielen Daten, sonst wird ein Tupel schnell schwer verständlich
// Antwort: Auch richtig. Ein Objekt ist oft besser, wenn: viele Werte vorhanden sind, die Bedeutung über Property-Namen klarer sein soll, die Positionen nicht die eigentliche Bedeutung tragen
// Also: ["Lukas", 24, true, "React", 60000], Dagegen deutlich lesbarer:
/*
{
    name: "Lukas",
    age: 24,
    active: true,
    framework: "React",
    salary: 60000
}
*/ 
//# sourceMappingURL=index.js.map