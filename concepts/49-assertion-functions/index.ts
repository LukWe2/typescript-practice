


























































// 1. Was ist eine Assertion Function
// und welches Problem löst sie?
// Antwort:
// Antwort:


// 2. Was bedeutet diese Signatur?
/*
function assertString(
    value: unknown
): asserts value is string
*/
// Antwort:
// Antwort:


// 3. Welchen Typ besitzt value hier jeweils?
/*
function test(value: unknown) {

    // Typ hier?

    assertString(value);

    // Typ hier?
}
*/
// Antwort:
// Antwort:


// 4. Was ist der Unterschied zwischen:
/*
function isUser(
    value: unknown
): value is User
*/
// und:
/*
function assertUser(
    value: unknown
): asserts value is User
*/
// Antwort:
// Antwort:


// 5. Warum braucht man bei einer Assertion Function
// normalerweise kein if am Aufrufort?
// Antwort:
// Antwort:


// 6. Was passiert zur Runtime,
// wenn die Assertion nicht erfüllt ist?
// Antwort:
// Antwort:


// 7. Warum ist eine Assertion Function
// nicht dasselbe wie:
/*
value as User
*/
// Antwort:
// Antwort:


// 8. Warum kann folgende Funktion gefährlich sein?
/*
function assertUser(
    value: unknown
): asserts value is User {
    // keine Prüfung
}
*/
// Antwort:
// Antwort:


// 9. Was macht:
/*
function assertDefined<T>(
    value: T
): asserts value is NonNullable<T>
*/
// beispielsweise bei:
//
// string | null | undefined
//
// Antwort:
// Antwort:


// 10. Warum ist:
//
// assertDefined(user);
//
// typischerweise sicherer als:
//
// user!
//
// wenn user den Typ User | undefined besitzt?
// Antwort:
// Antwort:


// 11. Was bedeutet:
/*
asserts condition
*/
// im Unterschied zu:
/*
asserts value is User
*/
// Antwort:
// Antwort:


// 12. Was passiert hier?
/*
let name: string | undefined;

assert(name !== undefined);

// Welchen Typ hat name jetzt?
*/
// Antwort:
// Antwort:


// 13. Was bedeutet dieser Typ?
/*
[T, ...T[]]
*/
// und warum eignet er sich für assertNonEmpty?
// Antwort:
// Antwort:


// 14. Warum eignen sich Assertion Functions
// besonders für externe Daten wie API-Responses?
// Antwort:
// Antwort:


// 15. Wann würdest du eher einen Type Guard verwenden
// und wann eher eine Assertion Function?
// Antwort:
// Antwort:


// 16. Welche zwei Ebenen verbindet eine gute
// Assertion Function?
//
// 1.
// 2.
//
// Antwort:
// Antwort: