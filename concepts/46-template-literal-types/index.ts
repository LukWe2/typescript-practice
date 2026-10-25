//1.

type Name = "Lukas";

// erzeugt hier wie ein JavaScript Template String (nur als Typ) einen Typ (type Greeting) aus einem String kombiniert mit den Ausprägungen eines anderen Typens (type Name)
// type Greeting = "Hello Lukas"
type Greeting = `Hello ${Name}`;

const greeting: Greeting = "Hello Lukas";

// Fehler: Type '"Hello Anna"' is not assignable to type '"Hello Lukas"'.
//const wrongGreeting: Greeting = "Hello Anna";


// 2.

type Role =
    "admin"
    | "editor"
    | "viewer";


// Wenn der Typ, den man im Template Literal Type als Template nimmt eine Literal Union ist, erstellt TypeScript für jede Ausprägung einen Typen, wie hier:
// type RoleTemplateLiteral = "role-admin" | "role-editor" | "role-viewer" 
type RoleTemplateLiteral = `role-${Role}`;



// 3.

type Event =
    "click"
    | "change"
    | "submit";

// erstellen erst wieder mit einem Tempalte Literal Type für jeden Member des Literal Union Types Event wiederum einen Typ innerhalb eines neuen Union Literal Types
// type EventTemplateLiteral = "onclick" | "onchange" | "onsubmit"
type EventTemplateLiteral = `on${Event}`;

// Erstellen jetzt mit gleichem Verfahren noch eine Version mit Uppercase des ersten Buchstabens nach "on", das geht jetzt nur nochmal so, wenn man type EventTemplateLiteralCaptitalized = Capitalize<EventTemplateLiteral>; macht,
// wird der erste Buchstaben des gesamten Literals uppercase, nicht erst der nach "on"
// type EventTemplateLiteralCaptitalizedTwo = "onClick" | "onChange" | "onSubmit"
type EventTemplateLiteralCaptitalizedTwo = `on${Capitalize<Event>}`;


// 4.

type Method =
    "GET"
    | "POST";

type Resource =
    "users"
    | "products";

// Wenn zwei Typen oder mehr angegeben werden, wird jede Kombination dieser als Member eines Literal Union Types angelegt
// type APIOperations = "GET /users" | "GET /products" | "POST /users" | "POST /products"
type APIOperations = `${Method} /${Resource}`; 


// 5.

// Die in den Template Literal Type eingesetzten Typen müssen nicht nur Typen sein die Literal Unions sind, können auch allgemeine Typen sein, dann sind alle gültigen Werte dafür auch möglich (string, number und boolean gehen, einfach irgendeinen Objekt Typ aber nicht)
type UserRoute = `/users/${number}`;

// const user01: `/users/${number}`
const user01: UserRoute = 
    "/users/1";

// const user25: `/users/${number}`
const user25: UserRoute = 
    "/users/25";

// const user999: `/users/${number}`
const user999: UserRoute = 
    "/users/999";

// Ungültige Werte, die von Literal Type abweichen, sowohl vom Template als auch vom String Teil davor/danach, gehen nicht
// Fehler: Type '"/products/1"' is not assignable to type '`/users/${number}`'.
/*const product01: UserRoute = 
    "/products/1";
*/

// ${number} beschreibt an dieser Stelle eine String-Repräsentation, die zum number-Muster passt. "test" erfüllt dieses Muster nicht
// Type '"/users/test"' is not assignable to type '`/users/${number}`'.
/*const test01: UserRoute = 
    "/users/test";
*/


// 6.

type UserProperty = `user-${string}`;

// "user-2" ist insgesamt ein String und "2" befindet sich im ${string}-Teil, daher passt er
// const user02: `user-${string}`
const user02: UserProperty =
    `user-2`;

const userLukas: UserProperty =
    `user-lukas`;

const userPeter: UserProperty = 
    "user-Peter";


// Der Unterschied zwischen `user-${string}` und `user-${"name" | "email"}` als Template Literal Type ist, dass beim ersten alle Strings valide sind und einen Typen erstellen können,
// da die zweite Version ein Literal Union ist, gehen für den neuen Typen daraus nur user-name und user-email also nur die Member der Union


// 7.

type Environment =
    "dev"
    | "test"
    | "prod";

// type EnvironmentTemplateLiteral = "dev-database" | "test-database" | "prod-database"
type EnvironmentTemplateLiteral = 
    `${Environment}-database`;


// 8.

type Entity =
    "user"
    | "message";

type Action =
    "created"
    | "updated"
    | "deleted";

// type EntityActionCombinations = "user:created" | "user:updated" | "user:deleted" | "message:created" | "message:updated" | "message:deleted"
type EntityActionCombinations = 
    `${Entity}:${Action}`;

// auch hier wie in Aufgabe 4 werden alle Kombinationen der Member der beiden Typen erstellt, folgend dem Template das angegeben ist, hier mit : zwischendrin


// 9.

// Dieser generische Template Literal Type wendet das Template an und innerhalb der geschweiften Klammer, in der der Typ steht den man in das Template einbauen will, wird noch der Utility Type
// aufgerufen, der für das was als T angegeben ist, den ersten Buchstaben noch uppercase macht, aber nur dafür, nicht für "on" wie man sieht
type HandlerName<T extends string> = 
    `on${Capitalize<T>}`;

// type HandlerNameClickCapitalized = "onClick"
type HandlerNameClickCapitalized = HandlerName<"click">;

// type HandlerNameClickSubmitCapitalized = "onClick" | "onSubmit"
type HandlerNameClickSubmitCapitalized = HandlerName<"click" | "submit">;


// 10.

type User = {
    name: string;
    age: number;
    active: boolean;
};

// keyof holt sie die Propertykeys als Literal Unions und werden hier als Union in Typ gepackt
// benutzen hier noch String-Intersection, weil keyof T in generischem Code auch number oder symbol enthalten kann
type UserKeys = keyof User & string;

// type UserKeysGetTypes = "getName" | "getAge" | "getActive"
type UserKeysGetTypes = 
    `get${Capitalize<UserKeys>}`;


// 11.

const events = [
    "click",
    "change",
    "submit"
] as const;

// type EventsTypes = "click" | "change" | "submit"
// ohne das [number] wäre es: type EventsTypes = readonly ["click", "change", "submit"], dann würde aber der Fehler für EventsTypeOn kommen: Type 'readonly ["click", "change", "submit"]' does not satisfy the constraint 'string'.
// -> Durch `as const` wird das Array als readonly Tuple inferiert
// und die Elemente werden nicht zu `string` widened,
// sondern behalten ihre Literal Types:
// readonly ["click", "change", "submit"]
type EventsTypes = typeof events[number];

// type EventsTypeOn = "onClick" | "onSubmit" | "onChange"
type EventsTypeOn = 
    `on${Capitalize<EventsTypes>}`;



// 12.

type ResourceTwo =
    "users"
    | "products";

// type CollectionRoute = "/api/users" | "/api/products"
type CollectionRoute =
    `/api/${ResourceTwo}`;

// type DetailRoute = `/api/users/${number}` | `/api/products/${number}`
// hier jetzt zwei Sachen verbunden, einmal ein Template mit einem Literal Union Type (${ResourceTwo}) und einmal mit einem allgemeinen Typ für ein Template (${number})
type DetailRoute = 
    `/api/${ResourceTwo}/${number}`


// 13.

type First = "a" | "b";
type Second = "1" | "2";
type Third = "x" | "y";

// type FirstSecondThirdCombination = "a-1-x" | "a-1-y" | "a-2-x" | "a-2-y" | "b-1-x" | "b-1-y" | "b-2-x" | "b-2-y"
type FirstSecondThirdCombination = `${First}-${Second}-${Third}`;

// Wenn mehrere Literal Types als Templates angegeben sind, werden alle Kombinationen dieser angelegt, jedoch nur dass immer ein Member des Unions vertreten sind, hier bei drei Types keine Kombination nur aus zwei Typen z.B. sondern alle drei


// 14.

type MethodTwo = "get" | "post";

// type MethodTwoUppercase = "GET" | "POST"
type MethodTwoUppercase = Uppercase<MethodTwo>;

// type MethodTwoLowercase = "get" | "post"
type MethodTwoLowercase = Lowercase<MethodTwoUppercase>;

// type MethodTwoCapitalize = "Get" | "Post"
type MethodTwoCapitalize = Capitalize<MethodTwo>;

// type MethodTwoUncapitalized = "get" | "post"
type  MethodTwoUncapitalized = Uncapitalize<MethodTwoCapitalize>;



// 15.

// Ein Template Literal Type ist, wenn ein neuer Typ aus einem bestehenden Typ und zusätzlichen Strings bzw. Zeichen wie "-" oder ":" z.B. darum herum erstellt wird.
// Der Unterschied zu einem JavaScript Template String ist, dass nicht wie diese zur Runtime existieren, sondern Template Literal Types nur zur Typprüfzeit.
// Wenn innerhalb `${...}` eine Union steht, wird der neu erstellte Typ auch zu einer Literal Union aus allen Union Members des eingefügten Union Types
// Wenn mehrere Union Types kombiniert werden, werden alle Kombinationen aus diesen Unions als neue Typen innerhalb einer Union erstellt, z:B.:
/*
type First = "a" | "b";
type Second = "1" | "2";
type Third = "x" | "y";

// type FirstSecondThirdCombination = "a-1-x" | "a-1-y" | "a-2-x" | "a-2-y" | "b-1-x" | "b-1-y" | "b-2-x" | "b-2-y"
type FirstSecondThirdCombination = `${First}-${Second}-${Third}`;
*/
// Der Unterschied zwischen `${string}` und einer konkreten Literal Union ist, dass beim ersten alle Strings verwendet werden können und es den neuen Typen erfüllt, beim zweiten aber nur die Members
// der eingefügten Literal Union.
// `T extends string` bei generischen Template Literal Types häufig als Generic Constraint verwendet wird, weil Utility Types wie Capitalize<T> einen string erwarten.
// Template Literal Types führen keine Runtime-Validierung durch, weil sie nur zur Typzeit existieren und nicht zur Runtime.

















// 1. Was ist ein Template Literal Type
// und auf welcher Ebene existiert er?
// Antwort:
// Antwort:


// 2. Was ist der Unterschied zwischen:
/*
const name = "Lukas";
const greeting = `Hello ${name}`;
*/
// und:
/*
type Name = "Lukas";
type Greeting = `Hello ${Name}`;
*/
// Antwort:
// Antwort:


// 3. Welcher Typ entsteht hier?
/*
type Event =
    "click"
    | "submit";

type Handler =
    `on${Event}`;
*/
// Antwort:
// Antwort:


// 4. Warum entstehen bei folgendem Beispiel vier Literal Types?
/*
type Method =
    "GET" | "POST";

type Resource =
    "users" | "products";

type Operation =
    `${Method} /${Resource}`;
*/
// Antwort:
// Antwort:


// 5. Welcher Unterschied besteht zwischen:
/*
type A = string;

type B =
    `user-${string}`;

type C =
    `user-${"name" | "email"}`;
*/
// Antwort:
// Antwort:


// 6. Was bedeutet `${number}` in folgendem Typ?
/*
type UserRoute =
    `/users/${number}`;
*/
// Entsteht dadurch der Literal Type "/users/number"?
// Antwort:
// Antwort:


// 7. Welcher Typ entsteht hier?
/*
type Event =
    "click"
    | "change"
    | "submit";

type Handler =
    `on${Capitalize<Event>}`;
*/
// Antwort:
// Antwort:


// 8. Was machen diese vier Utility Types grundsätzlich?
/*
Uppercase<T>
Lowercase<T>
Capitalize<T>
Uncapitalize<T>
*/
// Antwort:
// Antwort:


// 9. Warum schreibt man bei folgendem generischen Typ
// `T extends string`?
/*
type Handler<T extends string> =
    `on${Capitalize<T>}`;
*/
// Handelt es sich dabei um einen Conditional Type?
// Antwort:
// Antwort:


// 10. Was passiert hier Schritt für Schritt?
/*
const events = [
    "click",
    "change",
    "submit"
] as const;

type Event =
    typeof events[number];

type Handler =
    `on${Capitalize<Event>}`;
*/
// Antwort:
// Antwort:


// 11. Welcher Typ entsteht?
/*
type Environment =
    "dev"
    | "prod";

type Database =
    `${Environment}-database`;
*/
// Antwort:
// Antwort:


// 12. Welcher Typ entsteht hier und warum?
/*
type Entity =
    "user" | "message";

type Action =
    "created" | "deleted";

type Event =
    `${Entity}:${Action}`;
*/
// Antwort:
// Antwort:


// 13. Warum kann folgende Kombination bei großen Unions
// problematisch werden?
/*
type Result =
    `${UnionA}-${UnionB}-${UnionC}`;
*/
// Antwort:
// Antwort:


// 14. Was ist der Unterschied zwischen:
/*
type GetterNames =
    `get${Capitalize<keyof User & string>}`;
*/
// und einem Typ wie:
/*
{
    getName: () => string;
    getAge: () => number;
}
*/
// Antwort:
// Antwort:


// 15. Warum wird bei:
/*
keyof User & string
*/
// häufig noch `& string` verwendet,
// wenn man den Typ anschließend mit Capitalize<T>
// oder einem Template Literal Type benutzt?
// Antwort:
// Antwort:


// 16. Können Template Literal Types einen String,
// der zur Runtime von einer API kommt,
// tatsächlich validieren?
// Warum bzw. warum nicht?
// Antwort:
// Antwort: