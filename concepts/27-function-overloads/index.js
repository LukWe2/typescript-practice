// 27 – Function Overloads
// Erstelle processInput() mit mehreren Overload Signatures: Ein string-Aufruf soll einen string zurückgeben, ein number-Aufruf dagegen eine number.
// Schreibe darunter eine gemeinsame Implementation Signature, die alle erlaubten Varianten verarbeiten kann, und narrowe den Union Type innerhalb der Implementierung, bevor die passende Verarbeitung erfolgt.
// Teste, dass TypeScript beim Aufruf mit string bzw. number jeweils einen präzisen Rückgabetyp inferiert und ein nicht definierter Aufruf wie processInput(true) abgelehnt wird.
// Erstelle zusätzlich getUserName() mit einer Overload für nur firstName und einer weiteren für firstName + lastName.
// Die gemeinsame Implementierung soll beide Varianten unterstützen; deshalb muss ein Parameter, der nicht bei jeder Overload vorhanden ist, in der Implementation entsprechend optional behandelt werden.
// Achte darauf, dass die Overload Signatures nur erlaubte Aufrufvarianten beschreiben, während nur die Implementation Signature den tatsächlichen Funktionscode enthält.
function processInput(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value * 2;
}
;
// bei Hover: const textResult: string
// TypeScript erkennt dass Variable string sein wird und die Overload Funktion für string Argument und Rückgabetyp benutzt
const textResult = processInput("Hallo");
console.log(textResult);
const numberResult = processInput(8);
console.log(numberResult);
function getUserName(firstName, lastName) {
    if (lastName) {
        return `First name: ${firstName}, Last name: ${lastName}`;
    }
    return `Just first name: ${firstName}`;
}
console.log(getUserName("Lukas"));
console.log(getUserName("Anna", "Müller"));
export {};
// 1. Was ist eine Overload Signature bei einer TypeScript-Funktion?
// Antwort: Eine Overload Signature beschreibt eine Version einer Implementation (Implementations-Signature) einer Funktion, bei der verschiedene Varianten der Argumenttypen und Rückgabetypen deklariert werdern. Dabei ist zu beachten, dass die Implementations-Signature alle Varianten dieser abdecken muss in ihrer
// Implementation. Somit müssen auch alle Argumenttypen und Rückgabetypen der Overloads in der Implementation als Union angegeben sein.
// Antwort: Fast komplett richtig. Eine Overload Signature beschreibt eine erlaubte Aufrufvariante derselben Funktion.
// Die Implementation Signature muss mit allen Overloads kompatibel sein und alle Fälle verarbeiten können.
// Dafür verwendet man häufig Union Types oder optionale Parameter, aber sie müssen nicht zwingend immer einfach als Union angegeben werden.
// 2. Warum braucht man zusätzlich zu den Overload Signatures noch eine Implementation Signature?
// Antwort: Weil die Implementation Signature die eingentliche Logik enthält was mit den Argumenten der Funktion passiert. Sie muss dabei alle Cases der Overload Signatures abdecken (z.B. was passiert wenn value string ist und was wenn value number ist)
// Antwort: Richtig. Die Overload Signatures beschreiben nur, welche Aufrufe erlaubt sind. Die Implementation Signature enthält den tatsächlich ausgeführten Code und muss alle Overload-Fälle verarbeiten können.
// 3. Was erkennt TypeScript als Typ von result bei: const result = processInput("Hello"); wenn der Overload function processInput(value: string): string; existiert?
// Antwort: Dann erkennt sie als Typ von result string, da beim Funktionsaufruf nur ein String als Argument aufgerufen wird, was genau dieser Overload Singature mit dem einzelnen String als Rückgabewert entspricht.
// Antwort: Genau richtig. TypeScript findet den passenden Overload (string → string), deshalb ist result exakt vom Typ string.
// 4. Was ist der Vorteil von Overloads gegenüber nur: function processInput(value: string | number): string | number ?
// Antwort: Der Vorteil ist, dass ohne Overloads und somit mit Unions für die Argumenttypen und Rückgabetypen, der Rückgabewert allgemeiner sein kann, z.B. string | value oder User | Project, mit Overloads kennt TypeScript den Zusammenhang der Cases.
// Antwort: Richtig. Nur kleiner Schreibfehler: Du meinst string | number statt string | value.
// Overloads erhalten den Zusammenhang zwischen Eingabe und Ausgabe, z.B. string → string und number → number.
// 5. Warum ist processInput(true) nicht erlaubt, wenn nur Overloads für string und number definiert wurden?
// Antwort: Weil die Implementierung mit allen Overloads kompatibel sein muss und da kein boolean in dieser vorkommt, und somit auch kein Overload für diesen Fall existiert, wirft es einen Fehler.
// Antwort: Fast richtig. Der entscheidende Grund ist: Für Funktionsaufrufe betrachtet TypeScript die Overload Signatures.
// Es gibt keinen Overload, der boolean akzeptiert, deshalb ist processInput(true) nicht erlaubt.
// Die breitere Implementation Signature ist nicht automatisch eine zusätzliche öffentlich erlaubte Aufrufvariante.
// 6. Was bedeuten die zwei Overloads im folgenden Beispiel?
/*
function greet(name: string): string;
function greet(firstName: string, lastName: string): string;
*/
// Antwort: Sie bedeuten, dass man die Implementation Signature greet(firstName: string, lastName?: string): string sowohl mit nur einem String oder mit zwei Strings aufrufen kann und beides funktionieren wird. Die jeweilige Implementation was für beide Cases passiert ist in der Implementation-Signature implementiert
// Antwort: Genau richtig. Die Funktion besitzt zwei erlaubte Aufrufvarianten: einen String oder zwei Strings. Die gemeinsame Implementation verarbeitet anschließend beide Fälle.
//# sourceMappingURL=index.js.map