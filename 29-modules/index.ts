// Fehler vorher:
// "ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'"
// dadurch hat export function ... immer ein Fehler geworfen in math.ts und user.ts
//
// Grund:
// In der tsconfig.json steht "module": "nodenext" und "verbatimModuleSyntax": true.
// Dadurch schaut TypeScript in die package.json, um zu entscheiden, ob Dateien als CommonJS
// oder als ECMAScript Modules behandelt werden.
// Ohne "type": "module" in der package.json gilt das Projekt für Node als CommonJS.
// CommonJS passt aber nicht zu normalen import/export Statements wie unten.
//
// Lösung:
// In package.json wurde "type": "module" ergaenzt.
// Dadurch behandelt Node/TypeScript diese Dateien als ECMAScript Modules.
//
// Wichtig bei "module": "nodenext":
// Lokale Imports brauchen die spätere JavaScript-Endung ".js", obwohl die Datei in TypeScript
// als ".ts" existiert. TypeScript kompiliert math.ts/user.ts später zu math.js/user.js,
// und Node lädt am Ende diese JavaScript-Dateien.

import { add, multiply } from "./math.js";
import type { User } from "./user.js"
import { printUser } from "./user.js";
// Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './math.js'? -> wenn man js weglässt
// Module '"./math.js"' has no exported member 'subtract'. -> weil subtract nicht als Funktion existiert oder nicht exportiert wird in math.ts
//import { subtract } from "./math.js";

const user01: User = {

    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de"
};

printUser(user01);

console.log(add(4, 5));

console.log(multiply(4, 5));


// 1. Was macht export bei einer Funktion, einem Type oder einer Klasse?

// Antwort: export macht diese Funktion/Type/Klasse für andere Dateien im Projekt verfügbar zum Import. Sie darf also dann von anderen Modulen/Dateien importiert werden.
// Eine Datei mit import oder export ist dann ein Modul und hat ihren eigenen Scope. Das ist einer der Gründe, warum wir später in größeren Projekten problemlos viele gleichnamige lokale Variablen in verschiedenen Dateien haben können.

// Antwort: Richtig. export stellt einen Wert oder Typ anderen Modulen zur Verfügung.
// Sobald eine Datei import oder export verwendet, wird sie als Modul behandelt und besitzt ihren eigenen Modul-Scope.


// 2. Was macht import { add } from "./math" ?

// Antwort: Es importiert die Funktion add() aus der math.ts Datei in die aktuelle Datei in der dieser Import gemacht wird.

// Antwort: Richtig. Genauer: Es importiert den Named Export mit dem Namen add aus dem angegebenen Modul.
// In deinem aktuellen NodeNext-Setup würdest du im TypeScript-Code typischerweise "./math.js" schreiben, obwohl die Quelldatei math.ts heißt.


// 3. Warum benutzt man bei einem Type Alias sinnvollerweise: import type { User } from "./user" ?

// Antwort: Man benutzt diesen speziellen "import type" und nicht nur "import" weil Types nur im TypeScript-Typsystem existiert und nicht dann zur kompilierten JavaScript Laufzeit.
// Ein Type Alias verschwindet beim Kompilieren, existiert also eben nicht im JavaScript zur Laufzeit, anders als Funktionen oder Klassen.

// Antwort: Genau richtig. import type macht ausdrücklich klar, dass User nur zur Compile Time gebraucht wird und kein Runtime-Import erzeugt werden soll.
// Bei deiner aktuellen TypeScript-Konfiguration kann diese Trennung sogar erforderlich sein.


// 4. Was ist der Unterschied zwischen einem Named Export und einem Default Export?

// Antwort: Mit einem Named Export exportiert und importiert man die Funktion/Type/Klasse mit dem genauen Namen dessen, mit einem Default Export (statt nur "export" noch "export default") importiert man ohne die geschweiften Klammern {}
// und das was nach import steht beim import muss nicht genau den Namen der Funktion haben. Deshalb kann es aber auch nur einen Default Export pro Datei geben,
// weil dann dieser geänderte Name beim Import eindeutig noch der einen Funktion/Type/Klasse zuordnungsbar werden muss

// Antwort: Richtig. Named Exports können beliebig viele pro Modul existieren und werden über ihren Exportnamen ausgewählt.
// Einen Default Export gibt es höchstens einmal pro Modul. Deshalb kann der Importname frei gewählt werden: Der Modulpfad plus "Default Export" ist bereits eindeutig.


// 5. Warum stehen bei einem Named Import geschweifte Klammern wie bei: import { add, multiply } from "./math" ?

// Antwort: Weil man genau mit dem Namen der Funktion/Type/Klasse importiert, anders als beim Default Import, bei dem man nicht mit genau diesem Namen exportieren und importieren muss (gibt aber nur ein Default Export pro Datei!).

// Antwort: Richtig. Die geschweiften Klammern bedeuten: Wähle diese konkreten Named Exports aus dem Modul aus.
// Ohne geschweifte Klammern wird dagegen der Default Export importiert.


// 6. Was ist der Unterschied zwischen diesen beiden Imports?

/*
import { greet } from "./greet";
import greet from "./greet";
*/

// Antwort: Das erste ist ein Named Import, das zweite ein Default Import.

// Antwort: Genau richtig. Beim ersten muss das Modul einen Named Export greet besitzen.
// Beim zweiten muss das Modul einen Default Export besitzen; der lokale Name greet könnte dort theoretisch auch anders heißen.


// 7. Warum teilt man größere Anwendungen überhaupt auf mehrere Module/Dateien auf?

// Antwort: Weil alles in einer Datei schnell unübersichtlich wird vorallem bei größeren Projekten. Außerdem hat jede Datei dann seine eigene Aufgabe und kann modularisiert verändert werden, was auch dazu führen kann,
// dass weniger Code gesamt verändert werden muss in der Hauptdatei.

// Antwort: Richtig. Zusätzlich verbessert die Aufteilung Wartbarkeit, Wiederverwendbarkeit, Trennung von Verantwortlichkeiten und Testbarkeit.
// Änderungen können gezielter in einzelnen Modulen erfolgen, statt dass eine einzige große Datei alle Aufgaben enthält.