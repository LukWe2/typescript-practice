// Template Literal Types
// → neue String-Typen berechnen.
//
// Key Remapping
// → diese String-Typen als tatsächliche Propertykeys verwenden.

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
// Antwort: Ein Template Literal Type ist ein String Literal Type, der aus anderen Literal Types oder allgemeinen Typen wie string oder number erstellt ist, 
// und diesen bestehenden Literal Type eben in den neuen Literal Type einbaut, oft umgeben von weiteren Strings oder Stringteilen wie Bindestrichen, Doppelpunkte etc.
// Ein solcher Template Literal Type kann so aussehen: type Greeting = `Hello ${Name}`;
// Dieser Template Literal Type wird aus einem String "Hello" und einem anderen Literal Type Name zusammengesetzt, wobei der Name Typ innerhalb ${} steht, was stark an JavaScript Template Strings erinnert,
// was auch vom Einsetzen her das gleiche Prinzp ist, nur dass TLTs nur auf der Typebene existieren und nicht zur Runtime wie JTSs.
// Werte (Variablen, Arrays, Tupel, Objekte) die diesen Typen dann haben, müssen in diesem Fall genau diesen Literal Type als Wert/Value haben, also genau diesen String, da es ein Literal String Type ist
// Wenn der Typ der innerhalb des Template Literal Types eine Literal String Union ist, ist der neue enstehende Typ auch eine Union aus allen möglichen Member der Union, angenommen der Typ Name wäre eine Union
// "Lukas" | "Anna" | "Peter", dann würden der Typ type Greeting = "Hello Lukas" | "Hello Anna" | "Hello Peter" entstehen.
// Außerdem können innerhalb der {} Utility Types wie Capitalize<T> oder Uppercase<T>, Lowercase<T> etc. verwendet werden, um die Literals des eingesetzten Typs zu verändern
// Wenn zwei oder mehr Typen innerhalb eines Template Literal Types eingefügt werden mit ${...}, dann werden alle Kombinationen der Member dieser Typen wenn es Unions sind erstellt, heißt wenn Typ 1 3 Member hat und 
// Typ 2 4 Member hat, wird es insgesamt 12 Union Members im neuen Typen geben. Das kann schnell explodieren und sollte vorsichtig verwendet werden. Es werden auch nur Kombinationen verwendet in der von jedem Typ ein Member
// der Union vorhanden ist, also wenn drei Typen z.B. verwendet werden immer ein Member aus Union 1, ein Member aus Union 2 und ein Member aus Union 3, nicht nur ein Member aus Union 1 und ein Member aus Union 2 oder andere
// Zweierkombinationen, immer so große Kombinationen wie viele Typen eingesetzt werden.  

// Antwort: Sehr gut. Eine kleine Präzisierung:
//
// Ein Template Literal Type muss nicht ausschließlich aus anderen Literal Types aufgebaut sein.
// Innerhalb von ${...} können beispielsweise auch breitere passende Typen wie `string` oder `number` verwendet werden:
//
// type A = `user-${string}`;
// type B = `/users/${number}`;
//
// Das Ergebnis eines Template Literal Types beschreibt aber immer einen String-Typ.
//
// Deine Erklärung zu Union Types und mehreren eingesetzten Unions ist richtig:
// Jede mögliche Kombination wird entsprechend des vorgegebenen Templates gebildet.
//
// Wichtig außerdem:
// Ein Wert besitzt nicht selbst einen „Literal Type als Wert“.
// Präziser:
//
// Der Typ beschreibt, welche String-Werte erlaubt sind.
//
// Beispiel:
//
// type Greeting = "Hello Lukas";
//
// bedeutet:
// Ein Wert vom Typ Greeting darf nur den String "Hello Lukas" besitzen.


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
// Antwort: Das erste ist Runtime Code und existiert eben auch zu Runtime, das zweite ist ein Template Literal Type und existiert nur zur Typzeit und verfällt zur Runtime. Bei beiden wird jedoch die in ${...} spezifizierte Wert
// (beim ersten die name String Variable, beim zweiten der Typ Name) dafür eingesetzt.

// Antwort: Genau richtig.
//
// JavaScript:
//
// `Hello ${name}`
//
// → arbeitet mit einem Runtime-Wert.
// → erzeugt einen tatsächlichen String zur Runtime.
//
// TypeScript:
//
// `Hello ${Name}`
//
// → arbeitet mit einem Typ.
// → erzeugt einen String-Typ zur Compile Time.
//
// Sehr wichtig ist also:
//
// JavaScript Template String
// → Wertebene
//
// Template Literal Type
// → Typebene


// 3. Welcher Typ entsteht hier?
/*
type Event =
    "click"
    | "submit";

type Handler =
    `on${Event}`;
*/
// Antwort: Hier ensteht der Typ type Handler = "onclick" | "onsubmit", da für ${Event} beide Member des Literal String Unions Event eingesetzt werden und wiederum zu einer Literal String Union als Ergebnis werden.

// Antwort: Genau richtig.
//
// Nur der Typname wäre hier entsprechend der Aufgabe:
//
// type Handler =
//     "onclick"
//     | "onsubmit";
//
// Gedanklich:
//
// Event = "click" | "submit"
//
// ↓
//
// `on${"click"}`
// |
// `on${"submit"}`
//
// ↓
//
// "onclick" | "onsubmit"


// 4. Warum entstehen bei folgendem Beispiel vier Literal Types?
/*
type Method =
    "GET" | "POST";

type Resource =
    "users" | "products";

type Operation =
    `${Method} /${Resource}`;
*/
// Antwort: Weil im Template Literal Type Operation beide Typen eingesetzt werden als Variablen, deswegen werden alle Kombinationen aus den vier Member der zwei Unions gebildet, was vier Member im neuen Union Type Operation ergibt.

// Antwort: Richtig.
//
// Etwas präziser:
//
// Method besitzt 2 Union-Mitglieder.
// Resource besitzt 2 Union-Mitglieder.
//
// Für jede Method wird jede Resource eingesetzt:
//
// GET × users
// GET × products
// POST × users
// POST × products
//
// Daher:
//
// 2 × 2 = 4 Kombinationen.
//
// Ergebnis:
//
// "GET /users"
// | "GET /products"
// | "POST /users"
// | "POST /products"


// 5. Welcher Unterschied besteht zwischen:
/*
type A = string;

type B =
    `user-${string}`;

type C =
    `user-${"name" | "email"}`;
*/
// type A ist ein normaler string Type.
// Werte dieses Typs dürfen beliebige Strings sein.
//
// type B ist ein Template Literal Type, der ein String-Muster beschreibt.
// Werte dieses Typs müssen mit "user-" anfangen und dürfen danach
// einen beliebigen String enthalten.
//
// type C ist eine Union aus den beiden String Literal Types
// "user-name" und "user-email".
// Werte dieses Typs dürfen deshalb nur genau einer dieser beiden Strings sein.
//
// Von A über B zu C wird der erlaubte Wertebereich immer stärker eingeschränkt.

// Antwort: Die Grundidee ist genau richtig.
//
// Nur diese Formulierung:
//
// „Werte von Typ B müssen ein Literal Type sein“
//
// würde ich vermeiden.
//
// Ein Wert ist kein Typ.
//
// B beschreibt vielmehr alle String-Werte, die dem Muster:
//
// "user-" + beliebiger String
//
// entsprechen.
//
// Also:
//
// A = string
// → irgendein String
//
// B = `user-${string}`
// → irgendein String mit Präfix "user-"
//
// C = `user-${"name" | "email"}`
// → ausschließlich "user-name" oder "user-email"
//
// Deine Beobachtung ist richtig:
//
// A
// → sehr breit
//
// B
// → eingeschränkter
//
// C
// → noch eingeschränkter


// 6. Was bedeutet `${number}` in folgendem Typ?
/*
type UserRoute =
    `/users/${number}`;
*/
// Entsteht dadurch der Literal Type "/users/number"?
// Antwort: Hier bedeutet, dass Werte die den Typ UserRoute besitzen, dieses Literal String als Wert/Value haben müssen, aber für number muss eine gültige Zahl eingesetzt werden. TypeScript erkennt, wenn es nicht passt und z.B.
// ein String eingesetzt wurde, der keine Zahl ist. Obwohl auch die Zahl dann innerhalb dieses Strings steht, erkennt TypeScript ob es sich um eine Zahl handelt oder nicht.
// Wenn hier  `/users/${string}`; stehen würde, müsste man einen String für diese Stelle einsetzen. Da dies jedoch sowieso in einem String ist, kann man hier auch Zahlen oder boolean einsetzen, es wird trotzdem als String
// gesehen weil es technisch in einem String drin steht, bei number wird es aber erkannt als number oder keine number.

// Antwort: Hier würde ich deine Formulierung noch einmal korrigieren.
//
// `${number}` bedeutet NICHT:
//
// „An dieser Stelle befindet sich tatsächlich ein Wert vom Runtime-Typ number.“
//
// Der gesamte Wert bleibt ein String.
//
// Zum Beispiel:
//
// "/users/123"
//
// ist vollständig ein String.
//
// `${number}` bedeutet:
//
// An dieser Stelle muss eine String-Zeichenfolge stehen,
// die zu einer Zahlendarstellung passt.
//
// Deshalb:
//
// "/users/123"   ✅
// "/users/-5"    ✅
// "/users/2.5"   ✅
//
// "/users/Lukas" ❌
//
// Es entsteht also NICHT:
//
// "/users/number"
//
// sondern ein String-Muster:
//
// `/users/${number}`
//
// Bei:
//
// `user-${string}`
//
// darf der entsprechende Teil beliebiger Text sein.
//
// Deshalb funktioniert auch:
//
// "user-123"
//
// Nicht weil 123 darin ein number-Wert wäre,
// sondern weil "123" innerhalb dieses gesamten Strings einfach Text ist.
//
// Merksatz:
//
// `${string}`
// → beliebiger String-Inhalt.
//
// `${number}`
// → String-Inhalt, der einer Zahlendarstellung entspricht.
//
// Der gesamte Template-Literal-Wert bleibt in beiden Fällen ein String.


// 7. Welcher Typ entsteht hier?
/*
type Event =
    "click"
    | "change"
    | "submit";

type Handler =
    `on${Capitalize<Event>}`;
*/
// Antwort: Hier entsteht der Type "onClick" | "onChange" | "onSubmit", Da für Event jede Member des Union Types Event eingesetzt wird, und zsuätzlich der Utility Type Capitalize<Event> den ersten Buchstaben der Member
// in Uppercase macht, bevor er nach "on" gesetzt wird.

// Antwort: Genau richtig.
//
// Wichtig ist insbesondere deine Reihenfolge:
//
// Event
// → "click" | "change" | "submit"
//
// Capitalize<Event>
// → "Click" | "Change" | "Submit"
//
// danach:
//
// `on${...}`
//
// → "onClick" | "onChange" | "onSubmit"
//
// Deshalb ist das etwas anderes als:
//
// Capitalize<`on${Event}`>
//
// denn das würde:
//
// "Onclick" | "Onchange" | "Onsubmit"
//
// ergeben.


// 8. Was machen diese vier Utility Types grundsätzlich?
/*
Uppercase<T>
Lowercase<T>
Capitalize<T>
Uncapitalize<T>
*/
// Antwort: Alle Buchstaben des String Type T groß machen, alle Buchstaben des String Type T klein machen, den ersten Buchstaben des String Type T groß machen, den ersten Buchstaben des String Type T klein machen, 

// Antwort: Genau richtig.
//
// Uppercase<T>
// → alle Buchstaben entsprechend groß.
//
// Lowercase<T>
// → alle Buchstaben entsprechend klein.
//
// Capitalize<T>
// → ersten Buchstaben entsprechend groß.
//
// Uncapitalize<T>
// → ersten Buchstaben entsprechend klein.
//
// Bei einer Literal Union wird die Operation entsprechend auf die einzelnen String-Literal-Mitglieder angewendet.


// 9. Warum schreibt man bei folgendem generischen Typ
// `T extends string`?
/*
type Handler<T extends string> =
    `on${Capitalize<T>}`;
*/
// Handelt es sich dabei um einen Conditional Type?
// Antwort: Nein es handelt sich nicht um einen Conditional Type, da bei diesen nur diesen aufgrund einer Condition zwischen Typen entschieden wird, das ist immernoch ein Template Literal Type, bei dem ein Literal String 
// Type basierend auf einem bestehenden Typ T angelegt wrid.
// Das T extends string bedeutet hier nur, dass T vom Typ string sein muss, da Capitalize<T> ein String erwartet.

// Antwort: Genau richtig.
//
// `T extends string` ist hier ein Generic Constraint.
//
// Es bedeutet:
//
// T muss mit string kompatibel sein.
//
// Dadurch darf beispielsweise:
//
// Handler<"click">
//
// verwendet werden.
//
// Ein nicht passender Typ wird bereits beim Einsetzen für T abgelehnt.
//
// Es ist KEIN Conditional Type,
// weil die typische Conditional-Type-Struktur fehlt:
//
// T extends U ? X : Y
//
// Hier gibt es kein `? :`.
//
// `extends` wird also in zwei unterschiedlichen Kontexten verwendet:
//
// Generic Constraint:
// T extends string
//
// Conditional Type:
// T extends string ? X : Y


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
// Antwort: Als erster Schritt wird das Objekt events erstellt was ein Array aus Strings ist. Dieses hat ursprünglich den Typ string[]. Durch as const sagt man hier jedoch, dass der Typ des Arrays die Literal Strings sein soll
// d.h. der Typ von events wird zu ["click", "change", "submit"] also ein Literal Type, heißt ein Objekt/Array was diesen Typ hat muss genau diese drei Strings enthalten, nicht mehr oder wenige Elemente oder andere Strings, der Typ
// vom Objekt events ist somit: const events: readonly ["click", "change", "submit"]
// Dann wird der Typ Event angelegt, welcher mit typeof sich den Typ vom Objektarray events holt, aber mit [number] als Typ festlegt, welcher Typ ein einzelnes Element haben kann. Da jedes einzelne Element im events Array
// entweder "click", "change" oder "submit" sein kann, ist typeof events[number] gleich dem Typ "click" | "change" | "submit".
// Dann wird der Typ Handler angelegt, welcher ein Template Literal Type ist, und diesen Event Typ nach "on" setzt und zusätzlich durch den Utility Type Capitalize<T> den ersten Buchstaben der Member des Union Types Event
// groß macht vor dem einsetzen. Dann werden alle Member der Literal Union Event eingesetzt und wiederum als Union Type zurückgegeben und somit ist der type Handler = "onClick" | "onChange" | "onSubmit"

// Antwort: Sehr gut. Nur zwei kleine sprachliche Präzisierungen.
//
// `events` ist ein Array-Wert, kein Objektarray im engeren Sinne.
//
// Ohne `as const` würde TypeScript typischerweise ungefähr:
//
// string[]
//
// inferieren.
//
// Durch:
//
// as const
//
// werden die konkreten Literal-Werte erhalten und das Array wird als readonly Tuple inferiert:
//
// readonly ["click", "change", "submit"]
//
// Dann:
//
// typeof events
//
// → readonly ["click", "change", "submit"]
//
// Anschließend:
//
// typeof events[number]
//
// bedeutet als Indexed Access:
//
// „Welcher Typ kann an einem beliebigen numerischen Index dieses Tuples vorkommen?“
//
// Ergebnis:
//
// "click" | "change" | "submit"
//
// Danach:
//
// Capitalize<Event>
//
// → "Click" | "Change" | "Submit"
//
// und:
//
// `on${Capitalize<Event>}`
//
// → "onClick" | "onChange" | "onSubmit"
//
// Dein Ablauf ist also fachlich richtig.


// 11. Welcher Typ entsteht?
/*
type Environment =
    "dev"
    | "prod";

type Database =
    `${Environment}-database`;
*/
// Antwort: Hier entsteht der Typ type Database = "dev-database" | "prod-database", beide Member der Literal String Union Environment wird in das Template innerhalb des Database Typens eingesetzt und der resultierende Typ
// ist wiederum ein Literal String Union Type.

// Antwort: Genau richtig.
//
// Environment:
//
// "dev" | "prod"
//
// wird eingesetzt in:
//
// `${Environment}-database`
//
// und ergibt:
//
// "dev-database"
// | "prod-database"


// 12. Welcher Typ entsteht hier und warum?
/*
type Entity =
    "user" | "message";

type Action =
    "created" | "deleted";

type Event =
    `${Entity}:${Action}`;
*/
// Antwort: type Event = "user:created" | "user:deleted" | "message:created" | "message:deleted", weil alle Kombinationen der zwei eingesetzten Union Types Entity und Action erstellt und als Member des resultierenden
// Union Types eingesetzt werden

// Antwort: Genau richtig.
//
// Entity besitzt 2 Möglichkeiten.
// Action besitzt 2 Möglichkeiten.
//
// Daher:
//
// 2 × 2 = 4 Kombinationen:
//
// "user:created"
// "user:deleted"
// "message:created"
// "message:deleted"


// 13. Warum kann folgende Kombination bei großen Unions
// problematisch werden?
/*
type Result =
    `${UnionA}-${UnionB}-${UnionC}`;
*/
// Antwort: Da sie für alle Kombinationen der drei Typen wenn diese Unions sind einen Member im resultierenden Union Type Result erstellt was je nach Memberanzahl der drei Unions schnell wachsen kann

// Antwort: Genau richtig.
//
// Wenn beispielsweise:
//
// UnionA → 10 Mitglieder
// UnionB → 10 Mitglieder
// UnionC → 10 Mitglieder
//
// besitzt, können entstehen:
//
// 10 × 10 × 10
// = 1000 Kombinationen.
//
// Deshalb kann die Anzahl der resultierenden String Literal Types sehr schnell wachsen.


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
// Antwort: Der erste Typ ist kein Funktionstyp wie der zweite Typ, er erstellt "nur" eine Literal String Union aus den Propertykeys und dem "get" + erster Buchstabe groß, während der zweite Typ
// Funktionstypen für jede Property anlegt und in einem Objekt speichert.

// Antwort: Die Grundidee ist richtig.
//
// Noch präziser:
//
// Der erste Typ:
//
// type GetterNames =
//     `get${Capitalize<keyof User & string>}`;
//
// erzeugt nur eine Union von String Literal Types:
//
// "getName" | "getAge"
//
// Er erzeugt noch keine Properties.
//
// Der zweite Typ:
//
// {
//     getName: () => string;
//     getAge: () => number;
// }
//
// ist ein Objekt-Typ mit tatsächlichen Propertykeys:
//
// getName
// getAge
//
// deren Value Types Funktionstypen sind.
//
// Genau diese Lücke schließen wir anschließend mit Key Remapping:
//
// Template Literal Types
// → neue String-Typen berechnen.
//
// Key Remapping
// → diese String-Typen als tatsächliche Propertykeys verwenden.


// 15. Warum wird bei:
/*
keyof User & string
*/
// häufig noch `& string` verwendet,
// wenn man den Typ anschließend mit Capitalize<T>
// oder einem Template Literal Type benutzt?
// Antwort: Weil diese Utility Types eben einen String erwarten, keyof aber auch number oder symbol returnen kann, deswegen grenzt man hier nochmal mit dem Intersection Type ein.

// Antwort: Genau richtig.
//
// `keyof T` kann grundsätzlich Propertykey-Typen aus:
//
// string
// number
// symbol
//
// enthalten.
//
// String-Manipulations-Utilities wie:
//
// Capitalize<T>
//
// erwarten aber einen String-Typ.
//
// Durch:
//
// keyof T & string
//
// bleiben nur die Keys übrig,
// die mit string kompatibel sind.
//
// Bei einem konkreten einfachen User-Typ kann `& string` manchmal redundant sein.
// In generischen Typen ist dieses Muster aber sehr nützlich.


// 16. Können Template Literal Types einen String,
// der zur Runtime von einer API kommt,
// tatsächlich validieren?
// Warum bzw. warum nicht?
// Antwort: Nein, da Template Literal Types nur zur Typzeit bestehen und nicht zur Runtime.

// Antwort: Genau richtig.
//
// Template Literal Types verschwinden beim Kompilieren und erzeugen keinen Runtime-Code.
//
// Wenn beispielsweise eine API einen String liefert,
// kann TypeScript nicht anhand eines Template Literal Types zur Runtime prüfen,
// ob dieser String wirklich das gewünschte Muster besitzt.
//
// Dafür wäre eine echte Runtime-Prüfung nötig,
// beispielsweise durch eigenen Validierungscode,
// einen Type Guard oder eine Assertion Function.
//
// Template Literal Type:
// → Compile-Time-Typinformation.
//
// Runtime-Validierung:
// → tatsächlicher JavaScript-Code.