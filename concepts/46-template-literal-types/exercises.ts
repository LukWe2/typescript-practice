// 1.
// Erstelle:
//
// type Name = "Lukas";
//
// Erzeuge daraus mit einem Template Literal Type:
//
// type Greeting = "Hello Lukas"
//
// Erstelle anschließend einen Wert vom Typ Greeting.
// Teste auch einen ungültigen String und kommentiere ihn aus.


// 2.
// Gegeben:
//
// type Role =
//     "admin"
//     | "editor"
//     | "viewer";
//
// Erzeuge daraus:
//
// "role-admin"
// | "role-editor"
// | "role-viewer"
//
// Verwende dafür einen Template Literal Type.


// 3.
// Gegeben:
//
// type Event =
//     "click"
//     | "change"
//     | "submit";
//
// Erzeuge zuerst:
//
// "onclick"
// | "onchange"
// | "onsubmit"
//
// Erzeuge danach mit Capitalize<T>:
//
// "onClick"
// | "onChange"
// | "onSubmit"
//
// Vergleiche beide Ergebnisse in Kommentaren.


// 4.
// Gegeben:
//
// type Method =
//     "GET"
//     | "POST";
//
// type Resource =
//     "users"
//     | "products";
//
// Erzeuge daraus alle gültigen Kombinationen:
//
// "GET /users"
// "GET /products"
// "POST /users"
// "POST /products"
//
// Schreibe als Kommentar dazu,
// warum aus 2 Union-Mitgliedern × 2 Union-Mitgliedern
// insgesamt 4 Literal Types entstehen.


// 5.
// Erstelle:
//
// type UserRoute = `/users/${number}`;
//
// Erstelle mehrere gültige Werte:
//
// "/users/1"
// "/users/25"
// "/users/999"
//
// Teste auch ungültige Werte wie:
//
// "/products/1"
// "/users/test"
//
// und kommentiere sie aus.


// 6.
// Erstelle:
//
// type UserProperty = `user-${string}`;
//
// Teste mehrere gültige Werte.
//
// Erkläre anschließend in einem Kommentar den Unterschied zwischen:
//
// `user-${string}`
//
// und:
//
// `user-${"name" | "email"}`


// 7.
// Gegeben:
//
// type Environment =
//     "dev"
//     | "test"
//     | "prod";
//
// Erzeuge:
//
// "dev-database"
// | "test-database"
// | "prod-database"
//
// Verwende einen Template Literal Type.


// 8.
// Gegeben:
//
// type Entity =
//     "user"
//     | "message";
//
// type Action =
//     "created"
//     | "updated"
//     | "deleted";
//
// Erzeuge daraus alle Eventnamen:
//
// "user:created"
// "user:updated"
// "user:deleted"
// "message:created"
// "message:updated"
// "message:deleted"
//
// Erkläre im Kommentar,
// warum hier 2 × 3 = 6 Literal Types entstehen.


// 9.
// Erstelle einen generischen Type:
//
// type HandlerName<T extends string> = ...
//
// sodass:
//
// HandlerName<"click">
// → "onClick"
//
// HandlerName<"click" | "submit">
// → "onClick" | "onSubmit"
//
// Verwende Capitalize<T>.


// 10.
// Gegeben:
//
// type User = {
//     name: string;
//     age: number;
//     active: boolean;
// };
//
// Leite zunächst:
//
// keyof User
//
// als eigenen Type ab.
//
// Erzeuge daraus anschließend:
//
// "getName"
// | "getAge"
// | "getActive"
//
// Nutze:
//
// keyof
// string intersection
// Capitalize
// Template Literal Types
//
// Noch KEINE Getter-Properties bauen.
// Es sollen nur die String Literal Types entstehen.


// 11.
// Gegeben:
//
// const events = [
//     "click",
//     "change",
//     "submit"
// ] as const;
//
// Leite zuerst aus dem Array:
//
// "click" | "change" | "submit"
//
// ausschließlich über:
//
// typeof
// [number]
//
// ab.
//
// Erzeuge daraus anschließend:
//
// "onClick"
// | "onChange"
// | "onSubmit"
//
// Verwende zusätzlich:
// Capitalize
// Template Literal Types.


// 12.
// Erstelle:
//
// type Resource =
//     "users"
//     | "products";
//
// Erzeuge:
//
// type CollectionRoute
//
// mit:
//
// "/api/users"
// | "/api/products"
//
// und:
//
// type DetailRoute
//
// sodass z.B. folgende Strings erlaubt sind:
//
// "/api/users/1"
// "/api/users/500"
// "/api/products/25"
//
// Verwende `${number}`.


// 13.
// Gegeben:
//
// type First = "a" | "b";
// type Second = "1" | "2";
// type Third = "x" | "y";
//
// Erzeuge:
//
// `${First}-${Second}-${Third}`
//
// Schreibe alle resultierenden Literal Types als Kommentar auf.
//
// Erkläre außerdem,
// warum genau 8 Kombinationen entstehen.


// 14.
// Teste die String Utility Types:
//
// Uppercase<T>
// Lowercase<T>
// Capitalize<T>
// Uncapitalize<T>
//
// jeweils mit mindestens einer Literal Union.
//
// Beispiel:
//
// type Method = "get" | "post";
//
// Leite daraus:
//
// "GET" | "POST"
//
// ab.


// 15.
// Schreibe abschließend in Kommentaren:
//
// - was ein Template Literal Type ist
// - Unterschied zu einem JavaScript Template String
// - was passiert, wenn innerhalb `${...}` eine Union steht
// - was passiert, wenn mehrere Union Types kombiniert werden
// - Unterschied zwischen `${string}` und einer konkreten Literal Union
// - warum `T extends string` bei generischen Template Literal Types
//   häufig als Generic Constraint verwendet wird
// - warum Template Literal Types keine Runtime-Validierung durchführen