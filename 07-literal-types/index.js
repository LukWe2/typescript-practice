"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let projectStatus;
projectStatus = "planning";
console.log(projectStatus);
projectStatus = "development";
console.log(projectStatus);
//projectStatus = "finished";
console.log(projectStatus);
function printUserRole(role) {
    console.log(role);
}
printUserRole("admin");
printUserRole("user");
//printUserRole("lead");
let rating = 3;
//rating = 6;
// 1. Was ist der Unterschied zwischen: let status: string; und let status: "loading" | "success" | "error";?
// Antwort: Der Unterschied ist, dass die erste Variable jeden String als Wert haben kann, die zweite jedoch Literal Types hat und nur diese genauen Strings in der Variable stehen dürfen
// Antwort: Kleine sprachliche Präzisierung: "loading", "success" und "error" sind jeweils Literal Types. Zusammen bilden sie eine Union aus Literal Types.
// 2. Warum ist das hier ein Fehler?:
/*
let role: "admin" | "user";

role = "developer";
*/
// Antwort: Weil role ein Literal Type ist und nur genau die zwei Strings "admin" oder "user" beinhalten kann und nicht "developer". Wäre der Typ nur string, würde "developer" auch valide sein
// Antwort: Deine Antwort stimmt ebenfalls. Es wurden explizit nur "admin" und "user" zugelassen. "developer" ist zwar ein String, aber nicht Bestandteil dieser Literal Union.
// 3. Was bedeutet hier der Typ: 1 | 2 | 3 | 4 | 5
// Antwort: dieser Typ bedeutet nur die Zahlen von 1 bis 5 da es ein Literal Type ist, wenn der Typ number wäre, könnte jede beliebige Zahl in der Variable stehen
//# sourceMappingURL=index.js.map