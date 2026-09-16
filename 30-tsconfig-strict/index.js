// Vorhandene Einstellungen:
// strict: true
// module: nodenext
// target: esnext
// verabatimModuleSyntax: true
// noUncheckedIndexedAccess: true
// exactOptionalPropertyTypes: true
// declaration: true
// sourceMap: true
let username = "Lukas";
// Type 'null' is not assignable to type 'string'.
// wird abgelehnt wegen strict: true was auch strictNullChecks beinhaltet, da string und null verschiedene Typen sind
//username = null;
// Parameter 'value' implicitly has an 'any' type.
// wird abgelehnt wegen der noImplicitAny Einstellung, die besagt dass wenn TypeScript den Wert nicht inferrieren kann wie hier von value, und der Typ von
// value auf any fallen würde, dann wird es abgelehnt und ein Fehler ausgegeben
/*function printValue(value){

    console.log(value);
}*/
function printValue(value) {
    console.log(value);
}
const technologies = [
    "TypeScript",
    "React"
];
// bei Hover wird das angezeigt: const technology: string | undefined
// heißt TypeScript erkennt dass das fünfte Element im Array nicht existieren kann wie im technologies Array, in dem nur zwei Elemente sind
// und inferriert den Typen von technology automatisch auf string | undefined
// dafür ist die noUncheckedIndexedAccess Option im tsconfig.json verantworlich
const technology = technologies[5];
const user01 = {};
const user02 = {
    email: "test@example.com"
};
export {};
// "Type '{ email: undefined; }' is not assignable to type 'User' with 'exactOptionalPropertyTypes: true'. 
// Consider adding undefined' to the types of the target's properties."
// dafür ist die exactOptionalPropertyTypes Option im tsconfig verantwortlich, hiermit darf man keine Property dem Objekt der den Type hat geben, aber wenn es 
// eine Property enthält, muss diese Property zwingend vom Typ dieser sein
// Also email darf als Property weggelassen werden, aber wenn sie enthalten ist, muss sie vom Typ string sein, darf auch nicht undefined sein
/*const user03: User = {
    email: undefined
};*/
// 1. Was ist die Aufgabe einer tsconfig.json in einem TypeScript-Projekt?
// Antwort: Die tsconfig.json ist die zentrale Konfigurationsdatei eines TypeScript Projekts und legt Einstellungen vorallem für den Compiler fest 
// also wie streng die Typen und Konzepte von TypeScript geprüft werden sollen, außerdem welche JavaScript Version erzeugt werden soll, 
// welches Module-System verwendet werden soll etc.
// Antwort: Richtig. Die tsconfig.json legt projektweit fest, wie TypeScript den Code prüft und kompiliert, 
// z.B. Strictness, JavaScript-Target, Module-System, Output-Dateien und weitere Compiler-Regeln.
// 2. Was bedeutet strict: true grundsätzlich?
// Antwort: strict ist einer der wichtigsten Eintstellungen und legt die strengere TypeScript Typ Prüfungen fest. 
// Damit warnt TypeScript möglichst früh auf potentiell unsicheren Code und gibt Fehler bei Typprüfungen aus.
// Antwort: Richtig. strict: true aktiviert eine Gruppe strenger TypeScript-Prüfungen, darunter z.B. strictNullChecks und noImplicitAny. 
// Dadurch werden viele potenziell unsichere Stellen bereits beim Kompilieren erkannt.
// 3. Warum ist username = null normalerweise ein Fehler, wenn username nur als string typisiert wurde und strikte Nullprüfung aktiv ist?
// Antwort: Wegen der strictNullChecks Option, die durchsetzt dass z.B. string und null verschiedene Typen sind und man keiner als string typisierten Variable 
// einfach null zuweisen kann wie mit let name: string = null;
// Antwort: Genau richtig. Mit strictNullChecks ist null ein eigener Typ. Soll null erlaubt sein, müsste der Typ z.B. string | null lauten.
// 4. Was soll noImplicitAny verhindern?
// Antwort: noImplicitAny verhindert, dass ein Typ any wird (ohne explizit diesen so zu deklarieren mit :any), weil TypeScript diesen nicht inferrieren kann, 
// z.B. wenn man einfach den Typen nicht angibt wie bei einem Argument in einem Funktionskopf.
// Antwort: Richtig mit einer Präzisierung: noImplicitAny verhindert nicht any generell. Ein bewusst geschriebenes value: any ist weiterhin erlaubt. 
// Es verhindert, dass TypeScript stillschweigend bzw. implizit auf any zurückfällt, wenn kein Typ bestimmt werden kann.
// 5. Warum kann noUncheckedIndexedAccess dazu führen, dass ein Array-Zugriff den Typ string | undefined statt nur string bekommt?
// Antwort: Weil ein beliebiger Array-Index theoretisch außerhalb des Arrays liegen könnte, also wenn nicht so viele Elemente in einem Array sind 
// als der Index der aufgerufen wird (z.B. nur zwei Elemente im Array aber ruft array[5] oder auch array[2] auf, zwei Elemente sind Position 0 und 1).
// Antwort: Richtig. Bei zwei Elementen existieren nur Index 0 und 1. array[2] könnte daher undefined ergeben. 
// Deshalb berücksichtigt TypeScript mit noUncheckedIndexedAccess auch bei Array-Zugriffen die Möglichkeit undefined.
// 6. Was ist der Unterschied zwischen rootDir und outDir?
// Antwort: in rootDir wird der TypeScript-Quellcode gespeichert und in outDir der kompilierte JavaScript Code.
// Antwort: Fast richtig. rootDir legt fest, welcher Ordner als Wurzel des TypeScript-Quellcodes betrachtet wird; er "speichert" die Dateien nicht selbst. 
// outDir legt dagegen fest, in welchen Ordner der Compiler die erzeugten JavaScript-/Output-Dateien schreiben soll.
// 7. Wofür werden .d.ts-Dateien verwendet und welche Compiler-Option kann sie erzeugen?
// Antwort: Die Compiler-Option declaration erzeugt diese und sie werden verwendet um öffentliche Typinformationen des Codes festzulegen 
// was vorallem bei Libraries wichtig ist.
// Antwort: Genau richtig. .d.ts-Dateien enthalten Typdeklarationen bzw. die typisierte öffentliche API des Codes, ohne dessen eigentliche Implementierung. 
// declaration: true kann sie erzeugen.
// 8. Wofür sind Source Maps gedacht und welche Datei sieht man dadurch beispielsweise zusätzlich zu index.js?
// Antwort: Sind sind zum Helfen beim Debuggen gedacht, weil sie Fehler im ausgeführten JavaScript wieder auf die ursprüngliche TypeScript-Zeile zurückführen.
// Antwort: Richtig. Source Maps verbinden den erzeugten JavaScript-Code mit dem ursprünglichen TypeScript-Code, 
// damit Debugger auf die richtigen TS-Zeilen zeigen können. Zusätzlich zu index.js entsteht z.B. index.js.map.
// 9. Warum ist bei verbatimModuleSyntax die Unterscheidung zwischen import und import type wichtig?
// Antwort: Weil sie dafür sorgt, dass TypeScript bei Imports genauer zwischen Runtime-Imports also nur import ... und Type-Imports 
// also mit import type ... unterscheidet, ein Typ existiert nur im Typsystem und ein Runtime Import zur Runtime also nach dem Kompilieren 
// des TS Codes in JS Code noch.
// Antwort: Richtig. import type kennzeichnet eindeutig einen reinen Compile-Time-Import und wird beim Kompilieren entfernt. 
// Ein normaler import ist für Runtime-Werte wie Funktionen oder Klassen gedacht und bleibt entsprechend im erzeugten JavaScript erhalten.
//# sourceMappingURL=index.js.map