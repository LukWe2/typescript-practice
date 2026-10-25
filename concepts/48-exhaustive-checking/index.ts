
















































// 1. Was bedeutet Exhaustive Checking
// im Zusammenhang mit Union Types?
// Antwort:
// Antwort:


// 2. Warum kann eine Variable nach vollständigem
// Narrowing den Typ never bekommen?
// Antwort:
// Antwort:


// 3. Was bedeutet der Parameter-Typ never hier?
/*
function assertNever(value: never): never {
    throw new Error();
}
*/
// Antwort:
// Antwort:


// 4. Was bedeutet der Rückgabetyp never
// derselben Funktion?
// Antwort:
// Antwort:


// 5. Warum funktioniert folgendes als Exhaustive Check?
/*
default:
    return assertNever(state);
*/
// Antwort:
// Antwort:


// 6. Angenommen:
//
/*
type State =
    | { status: "loading" }
    | { status: "success"; data: string }
    | { status: "error"; message: string };
*/
//
// Der switch behandelt nur:
// loading
// success
//
// Welchen Typ kann state im default-Zweig
// noch besitzen?
// Antwort:
// Antwort:


// 7. Warum würde TypeScript dann einen Fehler bei
// assertNever(state) melden?
// Antwort:
// Antwort:


// 8. Was passiert,
// wenn alle Union-Mitglieder vollständig behandelt wurden?
// Welchen Typ besitzt die Variable dann
// im unerreichbaren Restpfad?
// Antwort:
// Antwort:


// 9. Was ist der Unterschied zwischen:
/*
default:
    throw new Error("Unknown");
*/
// und:
/*
default:
    return assertNever(value);
*/
// im Hinblick auf Exhaustive Checking?
// Antwort:
// Antwort:


// 10. Warum ist Exhaustive Checking besonders praktisch
// bei Discriminated Unions?
// Antwort:
// Antwort:


// 11. Welche Rolle spielt Narrowing
// beim Exhaustive Checking?
// Antwort:
// Antwort:


// 12. Was würde passieren,
// wenn du einer bestehenden Discriminated Union
// später ein neues Mitglied hinzufügst,
// aber einen switch nicht aktualisierst?
// Antwort:
// Antwort:


// 13. Welche zwei Aufgaben erfüllt
// eine assertNever-Funktion typischerweise?
//
// 1. Compile Time:
// 2. Runtime:
//
// Antwort:
// Antwort:


// 14. Warum ist never hier etwas anderes als
// never in diesem Beispiel?
/*
type OnlyStrings<T> =
    T extends string
        ? T
        : never;
*/
// Antwort:
// Antwort: