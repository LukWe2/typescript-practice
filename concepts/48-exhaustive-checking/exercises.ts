// 1.
// Gegeben:
//
// type Role =
//     "admin"
//     | "editor"
//     | "viewer";
//
// Schreibe eine Funktion:
//
// getRoleLabel(role: Role): string
//
// Verwende switch.
//
// Behandle alle drei Fälle.
//
// Füge anschließend einen Exhaustive Check
// mit einer assertNever-Funktion hinzu.


// 2.
// Ergänze testweise:
//
// "moderator"
//
// zu Role,
// ohne zuerst den switch anzupassen.
//
// Beobachte den TypeScript-Fehler
// bei assertNever.
//
// Ergänze danach den fehlenden case.


// 3.
// Gegeben:
//
// type Shape =
//     | {
//         kind: "circle";
//         radius: number;
//     }
//     | {
//         kind: "square";
//         size: number;
//     };
//
// Schreibe:
//
// calculateArea(shape: Shape): number
//
// Verwende diesmal zwei if-Abfragen
// statt switch.
//
// Füge danach:
//
// return assertNever(shape);
//
// hinzu.


// 4.
// Ergänze:
//
// {
//     kind: "rectangle";
//     width: number;
//     height: number;
// }
//
// und beobachte,
// wie der Exhaustive Check fehlschlägt,
// solange du Rectangle nicht behandelst.


// 5.
// Gegeben:
//
// type ApiState<T> =
//     | {
//         status: "idle";
//     }
//     | {
//         status: "loading";
//     }
//     | {
//         status: "success";
//         data: T;
//     }
//     | {
//         status: "error";
//         error: string;
//     };
//
// Schreibe:
//
// getApiStateText<T>(
//     state: ApiState<T>
// ): string
//
// und behandle jeden Status vollständig.


// 6.
// Ergänze testweise:
//
// {
//     status: "cancelled";
// }
//
// und überprüfe,
// dass der Exhaustive Check den fehlenden Fall erkennt.


// 7.
// Erstelle:
//
// type Action =
//     | {
//         type: "increment";
//     }
//     | {
//         type: "decrement";
//     }
//     | {
//         type: "set";
//         value: number;
//     };
//
// Schreibe einen kleinen Reducer:
//
// reducer(
//     state: number,
//     action: Action
// ): number
//
// Nutze switch + Exhaustive Check.


// 8.
// Verwende bei einer Aufgabe nicht assertNever,
// sondern:
//
// const exhaustiveCheck: never = value;
//
// Erkläre im Kommentar,
// warum diese Zuweisung nur funktioniert,
// wenn wirklich kein Union-Mitglied mehr übrig ist.


// 9.
// Schreibe in Kommentaren:
//
// - was Exhaustive Checking bedeutet
// - warum never dafür geeignet ist
// - welche Rolle Narrowing spielt
// - was passiert, wenn ein neues Union-Mitglied hinzukommt
// - Unterschied zwischen:
//      default: throw ...
//   und einem echten never-Exhaustive-Check
// - warum assertNever sowohl Compile-Time-
//   als auch Runtime-Nutzen haben kann