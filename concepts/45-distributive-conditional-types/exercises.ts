// 1.
// Erstelle einen Conditional Type IsString<T>.
//
// string → true
// alles andere → false
//
// Teste:
//
// IsString<string>
// IsString<number>
// IsString<string | number>
//
// Schreibe als Kommentar dazu,
// warum beim letzten Typ eine Union der Ergebnisse entsteht.


// 2.
// Erstelle:
//
// type OnlyStrings<T> = ...
//
// Er soll aus einer Union nur String-Typen behalten.
//
// Teste:
//
// OnlyStrings<string | number | boolean>
//
// und:
//
// OnlyStrings<"admin" | 5 | "user" | false>


// 3.
// Erstelle selbst:
//
// type MyExclude<T, U> = ...
//
// Teste mit:
//
// type Status =
//     "idle"
//     | "loading"
//     | "success"
//     | "error";
//
// Entferne:
// "idle" | "loading"


// 4.
// Erstelle:
//
// type MyExtract<T, U> = ...
//
// Behalte aus Status nur:
//
// "success" | "error"


// 5.
// Erstelle konzeptionell:
//
// type MyNonNullable<T> = ...
//
// Teste:
//
// string | number | null | undefined
//
// Ergebnis:
// string | number


// 6.
// Erstelle:
//
// type ToArray<T> = ...
//
// sodass ein Union Type distributiv verarbeitet wird.
//
// Teste:
//
// ToArray<string | number>
//
// Erwartetes Ergebnis:
//
// string[] | number[]
//
// Erkläre im Kommentar,
// warum das NICHT dasselbe ist wie:
//
// (string | number)[]


// 7.
// Erstelle zwei Types:
//
// type Distributive<T> = ...
// type NonDistributive<T> = ...
//
// Beide sollen testen,
// ob T ein string ist.
//
// Beim ersten:
// T extends string
//
// Beim zweiten:
// [T] extends [string]
//
// Teste beide mit:
//
// string | number
//
// Erkläre den Unterschied.


// 8.
// Erstelle:
//
// type AllStrings<T> = ...
//
// Der Type soll nur true ergeben,
// wenn die gesamte Union mit string kompatibel ist.
//
// Teste:
//
// AllStrings<"admin" | "user">
//
// und:
//
// AllStrings<"admin" | 5>


// 9.
// Gegeben:
//
// type User = {
//     type: "user";
//     name: string;
// };
//
// type Product = {
//     type: "product";
//     price: number;
// };
//
// type Entity = User | Product;
//
// Erstelle:
//
// type Wrapped<T> = ...
//
// sodass daraus entsteht:
//
// { data: User }
// |
// { data: Product }
//
// NICHT:
//
// { data: User | Product }


// 10.
// Erstelle:
//
// type ElementType<T> = ...
//
// mit infer.
//
// Teste:
//
// ElementType<string[] | number[] | User[]>
//
// Erwartetes Ergebnis:
//
// string | number | User
//
// Erkläre,
// wie hier Distribution und infer zusammenarbeiten.


// 11.
// Erstelle:
//
// type PromiseValue<T> = ...
//
// Teste:
//
// PromiseValue<
//     Promise<User>
//     |
//     Promise<Product>
// >
//
// Erwartetes Ergebnis:
//
// User | Product


// 12.
// Schreibe abschließend in Kommentaren:
//
// - wann ein Conditional Type distributiv wird
// - was mit jedem Union-Member passiert
// - warum `never` zum Filtern geeignet ist
// - wie man Distribution mit `[T] extends [U]` verhindert
// - Unterschied zwischen:
//
//   string[] | number[]
//
//   und:
//
//   (string | number)[]