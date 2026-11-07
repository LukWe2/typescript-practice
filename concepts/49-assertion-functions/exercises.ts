// 1.
// Schreibe:
//
// function assertString(
//     value: unknown
// ): asserts value is string
//
// Prüfe zur Runtime,
// ob value wirklich string ist.
//
// Wenn nicht:
// throw Error.
//
// Verwende die Funktion anschließend mit
// einem Wert vom Typ unknown und rufe danach
// eine String-Methode auf.


// 2.
// Schreibe einen normalen Type Guard:
//
// isNumber(value: unknown): value is number
//
// und danach eine Assertion Function:
//
// assertNumber(value: unknown): asserts value is number
//
// Vergleiche in Kommentaren,
// wie beide verwendet werden.


// 3.
// Gegeben:
//
// type User = {
//     id: number;
//     name: string;
// };
//
// Schreibe:
//
// assertUser(
//     value: unknown
// ): asserts value is User
//
// Prüfe mindestens:
// - object
// - nicht null
// - id vorhanden und number
// - name vorhanden und string


// 4.
// Verwende:
//
// const data: unknown = ...
//
// Rufe assertUser(data) auf.
//
// Greife danach direkt auf:
//
// data.id
// data.name
//
// zu.
//
// Erkläre im Kommentar,
// warum das vor dem Assertion-Aufruf nicht möglich wäre.


// 5.
// Schreibe:
//
// function assertDefined<T>(
//     value: T
// ): asserts value is NonNullable<T>
//
// Prüfe auf null und undefined.
//
// Teste:
//
// string | undefined
// User | null
// number | null | undefined


// 6.
// Gegeben:
//
// const users: User[] = ...
//
// const user = users.find(...);
//
// user ist:
//
// User | undefined
//
// Verwende assertDefined(user)
// und greife danach ohne:
// ?. oder !
// auf user.name zu.


// 7.
// Vergleiche:
//
// user!.name
//
// mit:
//
// assertDefined(user);
// user.name;
//
// Erkläre,
// warum die zweite Variante Runtime-Sicherheit
// bieten kann und die erste nicht.


// 8.
// Schreibe eine allgemeine Assertion Function:
//
// function assert(
//     condition: unknown
// ): asserts condition
//
// Wenn condition falsy ist:
// throw.
//
// Teste sie mit:
//
// let name: string | undefined;
//
// assert(name !== undefined);
//
// Danach soll TypeScript name als string behandeln.


// 9.
// Gegeben:
//
// type Config = {
//     apiUrl?: string;
// };
//
// Schreibe:
//
// assertHasApiUrl(config)
//
// sodass danach gilt:
//
// config.apiUrl: string
//
// Nutze eine Assertion Signature
// mit Intersection Type.


// 10.
// Schreibe:
//
// function assertNonEmpty<T>(
//     values: T[]
// ): asserts values is [T, ...T[]]
//
// Prüfe,
// ob values.length === 0.
//
// Erkläre,
// was [T, ...T[]] bedeutet.


// 11.
// Simuliere einen API-Flow:
//
// async function getUser(): Promise<User>
//
// - hole oder simuliere zunächst unknown-Daten
// - verwende assertUser
// - gib danach den geprüften User zurück
//
// Erkläre die Kette:
//
// unknown
// → Runtime Check
// → Assertion
// → User


// 12.
// Erstelle absichtlich eine SCHLECHTE Assertion:
//
// function badAssertUser(
//     value: unknown
// ): asserts value is User
//
// die nicht ausreichend prüft.
//
// Kommentiere sie danach wieder aus.
//
// Erkläre,
// warum TypeScript der Assertion Signature vertraut
// und warum das gefährlich ist.


// 13.
// Schreibe abschließend in Kommentaren:
//
// - was eine Assertion Function ist
// - Bedeutung von `asserts value is Type`
// - Unterschied zu einem Type Guard
// - Unterschied zu `as Type`
// - warum throw typischerweise nötig ist
// - warum Assertion Functions Runtime-Checks
//   mit Compile-Time-Narrowing verbinden
// - wann Type Guards sinnvoller sind
// - wann Assertion Functions sinnvoller sind