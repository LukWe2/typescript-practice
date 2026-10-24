// 1.
// Erstelle drei Funktionen mit unterschiedlichen Parametern
// und Rückgabetypen.
//
// Leite jeweils mit ReturnType<typeof ...>
// den Rückgabetyp ab.


// 2.
// Leite für dieselben Funktionen mit Parameters<typeof ...>
// deren Parameter-Tuple ab.
//
// Untersuche außerdem bei mindestens einer Funktion:
// Parameters<typeof fn>[0]
// Parameters<typeof fn>[number]


// 3.
// Erstelle:
//
// async function getUser(id: number): Promise<User>
//
// Leite ab:
//
// a) typeof getUser
// b) ReturnType<typeof getUser>
// c) Awaited<ReturnType<typeof getUser>>
//
// Schreibe jeweils als Kommentar dazu,
// welcher Typ entsteht.


// 4.
// Erstelle:
//
// async function getUsers(
//     activeOnly: boolean,
//     limit: number
// ): Promise<User[]>
//
// Leite daraus nur über Utility Types / Indexed Access ab:
//
// a) Parameter-Tuple
// b) direkten Rückgabetyp
// c) aufgelösten Rückgabetyp
// d) Typ eines einzelnen Users aus dem aufgelösten User[]


// 5.
// Erstelle:
//
// type UserDraft = {
//     id?: number;
//     name?: string;
//     active?: boolean;
// };
//
// Erzeuge mit Required<T> einen Typ,
// bei dem alle Properties erforderlich sind.


// 6.
// Erzeuge aus User mit Readonly<T>
// einen vollständig readonly User.
//
// Erstelle einen Wert dieses Types und teste,
// welche Mutation TypeScript verhindert.


// 7.
// Gegeben:
//
// type Status =
//     | "idle"
//     | "loading"
//     | "success"
//     | "error";
//
// Erzeuge mit Exclude:
// einen Typ ohne "idle" und "loading".
//
// Erzeuge mit Extract:
// einen Typ, der nur "success" und "error" enthält.


// 8.
// Gegeben:
//
// type ApiValue =
//     string
//     | number
//     | null
//     | undefined;
//
// Entferne mit NonNullable<T>
// null und undefined.


// 9.
// Erstelle selbst:
//
// type MyExclude<T, U> = ...
// type MyExtract<T, U> = ...
// type MyNonNullable<T> = ...
//
// Verwende dafür Conditional Types.
// Vergleiche die Ergebnisse mit den eingebauten Utility Types.


// 10.
// Erstelle eine Klasse:
//
// class UserService {
//     constructor(public baseUrl: string) {}
// }
//
// Erzeuge mit InstanceType<typeof UserService>
// den Typ einer UserService-Instanz.
//
// Erstelle anschließend eine Variable dieses Types.


// 11.
// Erstelle:
//
// async function fetchProducts(): Promise<Product[]>
//
// Leite ausschließlich aus der Funktion folgende Typen ab:
//
// - Promise<Product[]>
// - Product[]
// - Product
//
// Nutze dafür:
// ReturnType
// Awaited
// Indexed Access


// 12.
// Schreibe abschließend in Kommentaren:
//
// - welche Utility Types hauptsächlich auf Mapped Types beruhen
// - welche stark mit Conditional Types zusammenhängen
// - welche `infer` verwenden können
// - Unterschied zwischen ReturnType und Awaited
// - Unterschied zwischen Exclude und Extract