"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let value; // "id" | "name" | "email" | "active"
value = "Hello";
value = 42;
value = true;
// number 42 geht weil number Type zulässig ist, Objekt mit Property als number nicht weil es ein Objekt ist und Array auch nicht weil es nicht in UserValues gespeichert ist
value = { value: 42 };
value = [2, 3, 4];
// T[K] bedeutet: Gib mir den Typ der Property K innerhalb von T
// also bei Aufruf unten mit const name = getProperty(user01, "name"); ->  function getProperty<User, "id" | "name" | "email" | "active">(object: User, key: "id" | "name" | "email" | "active"): User["name"] (also string){
// user01 ist von Typ User, somit ist T vom Typ User, K ist einer der Properties von T als Strings, weil keyof die Properties von T als strings zurückgibt und extends festlegt dass K ein Typ davon sein muss, was es mit "name" ist
// also T ist User, K ist "name" im ersten Aufruf unten, beim zweiten ist T gleich User, K aber "id"
function getProperty(object, key) {
    return object[key];
}
const user01 = {
    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    active: true
};
// bei Hover: const name: string
const name = getProperty(user01, "name");
// bei Hover: const id: number
const id = getProperty(user01, "id");
// bei Hover: const active: boolean
const active = getProperty(user01, "active");
// wenn man Objekt leer lässt also nichts in geschweifte Klammern schreibt kommt: Type '{}' is missing the following properties from type 'User': id, name, email, active
// braucht also die gleiche Shape wie User
const anotherUser = {
    id: 2,
    name: "Anna",
    email: "anna2@gmx.de",
    active: false
};
// geht nicht weil wir NameType den Type von Property name gegeben haben mit User["name"], müsste also const wrongName: NameType = "Hello" z.B. sein
const wrongName = 42;
//# sourceMappingURL=index.js.map