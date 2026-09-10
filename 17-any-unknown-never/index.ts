let valueAny: any;

valueAny = "Hello";

valueAny = 24;

valueAny = true;

// TypeScript meldet keinen Fehler im Editor, obwohl valueAny als letztes ein Boolean war, zur Laufzeit also nach Kompilieren aber trotzdem!
valueAny.toUpperCase();

let valueUnknown: unknown;

valueUnknown = "Bye";

valueUnknown = 23;

valueUnknown = false;

// TypeScript meldet beim Aufrufen einer String Funktion einen Fehler, anders als bei any, Zuweisungen gehen aber auch verschiedene Typen wie bei any
//valueUnknown.toUpperCase();

if (typeof valueUnknown === "string"){
    // mit Type Narrowing und sicherstellen dass valueUnknown ein String ist, geht auch die String Methode aufzurufen
    valueUnknown.toUpperCase();
}


function printUnknown(unknownVariable: unknown): void{

    if (typeof unknownVariable === "string"){

        console.log(unknownVariable.toUpperCase());
    } else if (typeof unknownVariable === "number"){

        console.log(unknownVariable * 2);
    } else {

        console.log("Unknown value");
    }
}

printUnknown("Hi");
printUnknown(4);
printUnknown(true);


function throwError(message: string): never{

    throw new Error(message);
}

// 1. Was ist der wichtigste Unterschied zwischen any und unknown?
// Antwort: Bei beiden Typen kann einer Variable fast jeder Typ zugewiesen werden also string, number, boolean usw., der Unterschied ist, dass man mit any auch typspezifische Funktionen wie .toUpperCase() für Strings auf die Variable aufrufen kann,
// mit unknown nicht, mit diesem Typen kann man die Variable zwar zuweisen mit verschiedenen Typen aber keine typspezifischen Methoden auf dieser aufrufen
// Antwort: Bei any kann TypeScript die Typprüfung praktisch nicht mehr sinnvoll durchführen und erlaubt fast jede Verwendung. Bei unknown kann zwar ebenfalls jeder Wert zugewiesen werden, aber bevor man typspezifische Operationen ausführt, muss man den tatsächlichen Typ erst per Type Narrowing feststellen.

// 2. Warum funktioniert das bei any: let value: any = 42; value.toUpperCase();
// Antwort: Weil any sowohl Zuweisungen von Werten verschiedener Typen zulässt als auch Aufrufe von typspezifischen Methoden wie .toUpperCase() für strings, obwohl value vom Typ number ist
// Antwort: Deine Erklärung ist richtig. Wichtig noch: TypeScript lässt den Aufruf zu, obwohl er zur Laufzeit falsch ist. JavaScript versucht dann toUpperCase() auf der Zahl 42 aufzurufen und erzeugt einen Runtime-Fehler.

// 3. Warum funktioniert das nicht direkt bei unknown: let value: unknown = "Hello"; value.toUpperCase(); und was müsste man vorher machen?
// Antwort: Weil mit unknown kann man Variable zwar Werte verschiedener Typen zuweisen aber keine typspezifischen Methoden auf dieser aufrufen, außer man macht Type Narrowing vorher, wie hier checken ob value ein string ist

// 4. Was bedeutet never als Rückgabetyp einer Funktion?
// Antwort: never bedeutet, dass der Rückgabewert niemals auftreten kann, also die Funktion kommt nie zu ihrem Aufrufer zurück, was bei Endlosschleifen oder exhaustive Checks benutzt werden kann
// Antwort: Deine Antwort ist fast richtig. Bei einem Funktionsrückgabetyp würde ich sagen: never bedeutet, dass die Funktion niemals normal zu ihrem Aufrufer zurückkehrt. Zum Beispiel bei throw new Error(...) oder eine Endlosschleife. Bei Exhaustive Checks wird never etwas anders eingesetzt: Dort bedeutet es eher:
// An dieser Stelle darf überhaupt kein möglicher Typ mehr übrig sein.

// 5. Was ist der Unterschied zwischen void und never?
// Antwort: bei Funktionen mit Rückgabewert void läuft die Funktion, sie endet und gibt nur keinen nutzbaren Wert zurück, bei never läuft die Funktion aber kehrt niemals normal zurück