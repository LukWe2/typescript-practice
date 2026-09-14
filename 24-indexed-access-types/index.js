"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let value; // "id" | "name" | "email" | "active"
value = "Hello";
value = 42;
value = true;
// number 42 geht weil number Type zulässig ist, Objekt mit Property als number nicht weil es ein Objekt ist und Array auch nicht weil es nicht in UserValues gespeichert ist
//value = { value: 42};
//value = [2, 3, 4];
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
// wollten hier jetzt dem neuen Typen Wrong den Type einer Property wiederum vom Type User zuordnen, geht aber nicht weil age keine Property von User ist, type Right = User["active"] würde z.B. gehen dann wäre Right vom Typ boolean
//type Wrong = User["age"];
// geht nicht weil wir NameType den Type von Property name gegeben haben mit User["name"], müsste also const wrongName: NameType = "Hello" z.B. sein
//const wrongName: NameType = 42;
// 1. Was ergibt: User["name"] wenn name: string ist?
// Antwort: Dann ergibt dieser Ausdruck string, da man mit dieser Syntax den Typen der in der eckigen Klammer als String angegebenen Property holt, aus dem angegebenen Typen User.
// 2. Was bedeutet allgemein: T[K] ?
// Antwort: Dies bedeutet, dass man sich den Typen der Property K innerhalb des Typen T holt. Bei User wäre ein Aufruf wie oben z.B. User["name"], wobei User das T ist und K somit "name".
// Antwort: Richtig. Allgemein bedeutet es: Hole aus dem Typ T den Typ der Property bzw. Position K. Zum Beispiel: User["name"] // string oder User["id"]   // number
// 3. Warum ist der Rückgabetyp bei getProperty(user, "name") genauer als einfach: string | number | boolean ?
// Antwort: Weil man mit "name" nur genau den einen Typen dieser Property innerhalb des Typen vom Objekt user, also wahrscheinlich User, holt und nicht die Typen aller Properties.
// Antwort: Genau. Weil K für diesen Aufruf konkret "name" ist. Deshalb kann TypeScript: T[K] zu User["name"] auflösen und erhält exakt string, nicht die Union aller möglichen Property-Typen.
// 4. Was ergibt: User[keyof User] ?
// Antwort: keyof erzeugt aus den Properties in ein Literal Union aus Strings also z.B. "id" | "name" | "email" | "active". Da dieser Ausdruck nun in der eckigen Klammer nach User steht also User["id" | "name" | "email" | "active"], holt man sich mit diesem Ausdruck die Typen dieser Property Namen auch als Literal Union, 
// in diesem Fall number | string | string | boolean, bzw. number | string | boolean, weil id: number, name: string, email: string, active: boolean.
// Antwort: Auch richtig. Nur eine sprachliche Präzisierung: keyof „wandelt“ die Properties nicht wirklich in Strings um, sondern erzeugt aus den Property-Keys eine Union ihrer Key-Typen. Bei deinem normalen Objekt keyof User ergibt "id" | "name" | "email" | "active", dann ist User[keyof User] gleich number | string | boolean.
// 5. Was bedeutet: UserArray[number] wenn UserArray ein User[] ist?
// Antwort: Dies bedeutet dass man sich den Typ der Elemente im Array UserArray holt, das number hier als Index ist keine Zahl und kein direkter Positionszugriff innerhalb des Arrays, sondern holt sich den Typen der Elemente (sie sind alle gleich, aber warum?), wie wenn man dieses Array mit irgendeinem gültigen numerischen Index ausliest
// Antwort: Wenn type UserArray = User[]; dann bedeutet User[] bereits: Jeder erlaubte Array-Eintrag hat den Typ User. Also weil es ein Array aus Usern ist (welche Typen User haben alle) konzeptionell Index 0 → User, Index 1 → User, usw. 
// Deshalb bedeutet: UserArray[number]: Welchen Typ erhalte ich, wenn ich UserArray mit irgendeinem numerischen Index auslese? Antwort: User Das number ist hier also ein Typ für alle möglichen numerischen Array-Indizes, nicht eine konkrete Position. 
// Vergleich mit einem Tuple: 
/*
type Tuple = [string, number, boolean];

type First = Tuple[0];  // string
type Second = Tuple[1]; // number
*/
// Beim Tuple können verschiedene Positionen unterschiedliche Typen haben. Beim normalen Array: User[] haben dagegen alle Elemente denselben Elementtyp User. Daher: UserArray[number] // User
// Eine kleine Feinheit: Beim echten Laufzeit-Zugriff auf ein Array kann ein Index natürlich außerhalb des Arrays liegen und undefined liefern. Aber der Indexed Access Type UserArray[number] beschreibt zunächst den deklarierten Elementtyp des Arrays: User.
//# sourceMappingURL=index.js.map