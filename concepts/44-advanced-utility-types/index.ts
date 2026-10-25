type User = {
    id: number;
    name: string;
    active: boolean;
};

type Product = {
    id: number;
    title: string;
    price: number;
};



// 1.

function getName(id: number): string {

    return "Name";
};


function getId(user: User): number {

    return user.id;
}

function getUserNames(users: User[], product: Product): string[] {

    return ["product1 - name1", "product 2 - name2", "product3 - name3"];
}

// type GetNameType = string
type GetNameType = ReturnType<typeof getName>;


// type GetIdType = number
type GetIdType = ReturnType<typeof getId>;

// type GetUserNamesTypes = string[]
type GetUserNamesTypes = ReturnType<typeof getUserNames>;


// 2.

type GetNameParameterTypes = Parameters<typeof getName>;

type GetIdParameterTypes = Parameters<typeof getId>;

type GetUserNamesParameterTypes = Parameters<typeof getUserNames>;

// type GetUserNamesFirstParameterType = User[]
// Mit [0] greifen wir auf den ersten Typ des Parameter-Tuples zu.
// Da der erste Parameter `users: User[]` ist,
// entsteht der Typ User[].
type GetUserNamesFirstParameterType = Parameters<typeof getUserNames>[0];

// type GetUserNamesSeperateParameterType = User[] | Product
// durch [number] nach dem holen der Parametertypen holen wir den Typen, der jedes einzelne Element des Arrays haben kann, und da wir zwei Parameter von unterschiedlichen Typen haben, ist es ein Union
// aus den Typen die ein Arrayelement annehmen kann, was hier entweder User[] oder Product ist
type GetUserNamesSeperateParameterType = Parameters<typeof getUserNames>[number];



// 3.

async function getUser(id: number): Promise<User> {
    return {
        id,
        name: "Lukas",
        active: true
    };
}

/*
type GetUserType = (id: number) => Promise<User>
*/
// hier entsteht logischerweise der Funktionstyp in Form von "(parameter) => rückgabetyp", weil wir mit typeof getUser diese holen
type GetUserType = typeof getUser;

// type GetUserTypeReturn = Promise<User>
// hier entsteht der Typ Promise<User>, weil wir mit ReturnType, was Conditional Types und infer nutzt, den Rückgabetyp der Funktion holen
type GetUserTypeReturn = ReturnType<typeof getUser>;

/*
type GetUserTypeAwaited = {
 id: number;
 name: string;
 active: boolean;
}
*/
// ist Typ User, VSC zeigt nur Shape an, Awaited holt den Typ innerhalb eines Promise, auch wenn verschachtelt also kann mehrere Ebenen tief gehen,
// deshalb funktioniert hier auch ReturnType<typeof getUser>, holt eigentlich nur Promise<User> wie oben schon, aber Awaited holt noch den inneren
// Typ aus dem Promise
type GetUserTypeAwaited = Awaited<ReturnType<typeof getUser>>;




// 4.

async function getUsers(activeOnly: boolean, limit: number): Promise<User[]> {

    return [];
}

// Parameter-Tuple:
// typeof nicht vergessen, brachen Funktionstyp von getUsers für Utility Type Parameters<T>!
type GetUsersParameterTuples = Parameters<typeof getUsers>;

// Direkter Rückgabetyp:
// type GetUsersDirectReturnType = Promise<User[]>
type GetUsersDirectReturnType = ReturnType<typeof getUsers>;

// Aufgelöster Rückgabetyp:
// type GetUsersResolvedReturnType = User[]
type GetUsersResolvedReturnType = Awaited<ReturnType<typeof getUsers>>;
// oder so:
// gibt auch type GetUsersResolvedReturnTypeDiff = User[]
type GetUsersResolvedReturnTypeDiff = Awaited<GetUsersDirectReturnType>;

// Typ eines einzelnen Elements aus dem aufgelösten Typ:
/*
type GetUsersSeperateElement = {
 id: number;
 name: string;
 active: boolean;
} --> = Typ User
*/
type GetUsersSeperateElement = Awaited<ReturnType<typeof getUsers>>[number];
//oder so:
type GetUsersSeperateElementTwo = Awaited<GetUsersDirectReturnType>[number];
// oder so:
type GetUsersSeperateElementThree = GetUsersResolvedReturnTypeDiff[number];


// 5.

type UserDraft = {
    id?: number;
    name?: string;
    active?: boolean;
};

/*
type UserDraftRequired = {
 id: number;
 name: string;
 active: boolean;
}
--> alle ? sind entfernt, somit die Properties nicht mehr optional sondern erforderlich
*/
type UserDraftRequired = Required<UserDraft>;


// 6.

/*
type UserReadonly = {
 readonly id: number;
 readonly name: string;
 readonly active: boolean;
}
--> bei jeder Property wurde vor dem Key ein readonly hinzugefügt, somit sind Properties nurnoch lesbar und nicht veränderbar nach der Inisialisierung
// des Typen
*/
type UserReadonly = Readonly<User>;

// Initialiserung geht natürlich noch, aber Veränderung der hier gesetzten Properties nicht
const user01: UserReadonly = {

    id: 2,
    name: "Anna",
    active: true
}

// Fehler: Cannot assign to 'name' because it is a read-only property.
// Da user01 vom Typ UserReadonly und darin alle Properties readonly sind, kann man diese hier nach der Initialisierung nicht mehr verändern
// Also die Mutation aller Properties wird von TypeScript verhindert, da alle readonly sind
//user01.name = "Peter";

// Achtung: Readonly<T> ist kein Runtime-Schutz.
// Es verhindert Mutationen nur durch das TypeScript-Typsystem.
//
// Für tatsächliches Runtime-Verhalten wäre z.B.
// Object.freeze(...) relevant.
//
// Type Guards haben eine andere Aufgabe:
// Sie prüfen bzw. narrowen Runtime-Werte.


// 7.

type Status =
    | "idle"
    | "loading"
    | "success"
    | "error";

// Exclude und Extract haben zwei Argumente, einmal der Typ der als Basis für Operation gedacht ist und die Elemente, die nicht mehr im neuen Typ sein sollen (Exclude)
// oder die nur im neuen Typ sein sollen (Extract)
// type StatusExclude = "success" | "error"
// --> "idle" und "loading" wurden entfernt im neuen Typ StatusExclude, da sie hier als zweites Argument als Union angegeben wurden
type StatusExclude = Exclude<Status, "idle" | "loading">;

// type StatusExtract = "success" | "error"
// --> "idle" und "loading" wurden entfernt/nicht beibehalten im neuen Typ StatusExtract, da hier als zweites Argument 
// als Union nur "success" und "error" angegeben wurden und nur diese dann in den neuen Typ gepackt werden 
type StatusExtract = Extract<Status, "success" | "error">;


// 8.

type ApiValue =
    string
    | number
    | null
    | undefined;

type ApiValueNonNullable = NonNullable<ApiValue>;


// 9.

// bei false-Zweig T als resultierenden Typ nehmen, weil es T ja Union ist, und jeder Member einzeln geprüft wird und T somit der aktuell
// geprüfte Member ist, und wird ja dann auch als Union und als Member returned, deswegen nicht U als Typ returnen sondern T
type MyExclude<T, U> = 
    T extends U
        ? never
        : T

// auch hier bei true-Zweig T als resultierenden Typ nehmen aus gleichem Grund
type MyExtract<T, U> = 
    T extends U
        ? T
        : never

// auch hier T als resultierenden Typ nehmen, hier gibt es sowieso nur T und kein U
type MyNonNullable<T> = 
    T extends null | undefined 
        ? never
        : T


// 10.

class UserService {
    constructor(public baseUrl: string) {}
}

// Achtung: typeof nicht vergessen! Braucht Klassentyp mit Konstruktor
type UserServiceInstance = InstanceType<typeof UserService>;

const userService01: UserServiceInstance = new UserService("https:yes.com");



// 11.

async function fetchProducts(): Promise<Product[]> {

    return [];
}

// Promise<Product[]>:
// type FetchProductsPromiseProduct = Promise<Product[]>
type FetchProductsPromiseProduct = ReturnType<typeof fetchProducts>;

// Product[]:
// type FetchProductsProductArray = Product[]
type FetchProductsProductArray = Awaited<ReturnType<typeof fetchProducts>>;
// oders so:
type FetchProductsProductArrayTwo = Awaited<FetchProductsPromiseProduct>;

// Product:
/*
type FetchProductsProductTwo = {
 id: number;
 title: string;
 price: number;
} --> Product
*/
type FetchProductsProduct = Awaited<ReturnType<typeof fetchProducts>>[number];
// oder so:
/*
type FetchProductsProductTwo = {
 id: number;
 title: string;
 price: number;
} --> Product
*/
type FetchProductsProductTwo = Awaited<FetchProductsPromiseProduct>[number];



// 12.

/*
Mapped Types:
- Required<T>
- Readonly<T>

Conditional Types:
- Exclude<T, U>
- Extract<T, U>
- ReturnType<T>
- Parameters<T>
- Awaited<T>
- InstanceType<T>

Conditional Types mit infer:
- ReturnType<T>
- Parameters<T>
- Awaited<T>
- InstanceType<T>

Distributive Conditional Types:
- Exclude<T, U>
- Extract<T, U>
*/
// Unterschied zwischen ReturnType und Awaited: ReturnType gibt als Typ den Rückgabetyp einer Funktion/eines Funktionstypen zurück, auch 
// wenn dieser ein Promise ist, dann eben als Typ genau diesen Rückgabetyp Promise<...>, Awaited löst wenn der Funktionsrückgabetyp ein
// Promise ist den inneren Typ innerhalb des Promises zurück. Man braucht aber das ReturnType<T> innerhalb des Awaited<T>, also
// Awaited<typeof getUser> bringt nicht User also den inneren Typ des Rückgabetyps automatisch zurück, wenn der Rückgabetyp ein Promise<User> ist. Man bräuchte also Awaited<ReturnType<typeof getUser>>
// um User zu bekommen, nur mit Awaited<typeof getUser> würde man nur (id: number) => Promise<User> bekommen, da es nicht den Return Type bringt sondern nur den Funktionstyp
// mit diesem Aufruf. Außerdem löst Awaited<T> auch verschachtelte Promises bis auf den innersten Typ auf.
// Unterschied zwischen Exclude und Extract: Exclude<T, U> entfernt aus T alle Union-Mitglieder, die zu U kompatibel sind. Extract<T, U> behält 
// aus T nur die Union-Mitglieder, die zu U kompatibel sind.



















































// 1. Was gibt ReturnType<T> zurück und welchen Typ
// erwartet es grundsätzlich als T?
// Antwort: ReturnType<T> gibt den Typ des Rückgabewerts einer Funktion zurück und erwartet als T einen Funktionstyp (sowas wie "(parameter) => rückgabetyp").

// Antwort: Genau richtig.
// Noch etwas präziser würde ich „Rückgabetyp“ statt „Typ des Rückgabewerts“ sagen:
//
// ReturnType<T>
// → erwartet einen Funktionstyp T
// → liefert dessen Rückgabetyp.
//
// Beispiel:
//
// type Fn = (id: number) => string;
//
// ReturnType<Fn>
// → string
//
// Bei einer echten Funktion verwenden wir meist:
//
// ReturnType<typeof getName>
//
// weil `typeof getName` auf der Type-Ebene den Funktionstyp liefert.



// 2. Welcher Typ entsteht jeweils?
/*
function getName(id: number): string {
    return "Lukas";
}

type A = typeof getName;
type B = ReturnType<typeof getName>;
type C = Parameters<typeof getName>;
*/
// Antwort: Für A entsteht der Typ "(id: number) => string", da typeof Funktion einfach den Funktionstyp zurückgibt welcher die Form "(parameter) => rückgabewerttyp" hat.
// Für Typ B entsteht der Typ string, weil Return<T> innerhalb mit infer arbeitet und ungefähr die Condition so aussieht: "T extends (...args: any[]) => infer R", aufgrund des infer R wird an dieser Position
// innerhalb des gesamten Musters, mit dem wir den Typen der für T eingesetzt wurde vergleichen, dann U eingesetzt, was für den erfolgreichen Fall returned wird (... ? R : T).
// Für Typ C würde ein Tupel herauskommen, da mit Parameters<T> auch mit infer (diesmal wäre die Condition "T extends (...args: infer P") => any") die Typen der Parameter returned werden, in diesem Fall da wir nur
// ein Parameter haben als [id: number], wenn wir noch z.B. age: number hätten als Parameter, wäre der Typ [id: number, age: number].

// Antwort: Die entstandenen Typen sind richtig:
//
// type A = (id: number) => string;
// type B = string;
// type C = [id: number];
//
// Bei B nur eine kleine Korrektur:
// Du hast zuerst korrekt `infer R` geschrieben, danach aber von U gesprochen.
// Hier heißt die inferierte Type-Variable R.
//
// Vereinfacht:
//
// T extends (...args: any[]) => infer R
//     ? R
//     : ...
//
// Bei:
//
// T = (id: number) => string
//
// wird:
//
// R = string.
//
// Bei `Parameters<T>` wird dagegen mit:
//
// (...args: infer P) => ...
//
// die gesamte Parameterliste als Tuple inferiert:
//
// P = [id: number].
//
// Bei zwei Parametern:
//
// (id: number, age: number) => string
//
// wäre:
//
// P = [id: number, age: number].



// 3. Warum ergibt ReturnType einer async-Funktion
// normalerweise Promise<T> und nicht direkt T?
// Antwort: Da ReturnType den tatsächlichen Rückgabewert eines Funktionstypen zurückgibt (wenn Condition innerhalb Conditional Type true, da ReturnType<T> intern  ein Conditional Type mit infer ist), was
// bei einer async-Funktion die immer ein Promise returned eben ein Promise eines Typen ist wie Promise<string> oder Promise<User>, und nicht der Typ der entpackten Daten innerhalb des Promise, dafür müsste
// man Awaited<T> nehmen.

// Antwort: Inhaltlich richtig.
// Wieder nur die sprachliche Präzisierung:
// ReturnType liefert den Rückgabetyp, nicht den tatsächlichen Runtime-Rückgabewert.
//
// Bei:
//
// async function getUser(): Promise<User>
//
// ist der Funktionstyp:
//
// () => Promise<User>
//
// Deshalb:
//
// ReturnType<typeof getUser>
// → Promise<User>
//
// ReturnType interessiert sich nur für die Return-Position der Funktion.
// Es „entpackt“ ein Promise nicht.
//
// Dafür brauchen wir anschließend:
//
// Awaited<Promise<User>>
// → User
//
// beziehungsweise kombiniert:
//
// Awaited<ReturnType<typeof getUser>>
// → User



// 4. Was macht Awaited<T> grundsätzlich?
// Welcher Typ entsteht jeweils?
/*
type A = Awaited<Promise<string>>;
type B = Awaited<string>;
type C = Awaited<Promise<Promise<number>>>;
*/
// Antwort: Awaited<T> benutzt ebenfalls Conditional Type mit infer, und extrahiert aus einem Typen T den Typen, der awaited wird. D.h. Awaited<T> returned tatsächlich den entpackten Typen innerhalb eines Promise,
// was immer von einer async-Methode returned wird, anstatt wie ReturnType<T> nur den Promise. Außerdem entpackt Awaited<T> auch den inneren Typ von verschachtelten Promises, kann also auch rekursiv bei
// z.B. Promise<Promise<User>> den Typen User auflösen. Eine selbst implementierte PromiseValue<T> Methode returned meist auch nur eine Ebene außer diese ist auch rekursiv implementiert.

// Antwort: Grundidee richtig.
//
// Die Ergebnisse sind:
//
// type A = string;
// type B = string;
// type C = number;
//
// Wichtig ist:
// Awaited<T> bildet auf der Type-Ebene ungefähr das Verhalten von `await` nach.
//
// Deshalb funktioniert auch:
//
// Awaited<string>
// → string
//
// obwohl string gar kein Promise ist.
//
// Bei einem Promise:
//
// Awaited<Promise<string>>
// → string
//
// und verschachtelte Promise-/Thenable-Strukturen werden rekursiv aufgelöst.
//
// Dein Vergleich mit unserem einfachen:
//
// type PromiseValue<T> =
//     T extends Promise<infer U>
//         ? U
//         : T;
//
// ist richtig:
// Unser einfacher Typ entfernt zunächst nur eine Ebene.
// `Awaited<T>` ist umfassender und bildet das echte Await-Verhalten genauer nach.



// 5. Was passiert Schritt für Schritt?
/*
async function getUser(): Promise<User> {
    // ...
}

type Result =
    Awaited<
        ReturnType<typeof getUser>
    >;
*/
// Antwort: Zuerst holt ReturnType<typeof getUser> den Rückgabetyp der Funktion getUser(), was Promise<User> ist da es eine async-Funktion ist die immer ein Promise des jeweiligen Typs, hier User, returned.
// Dann arbeitet Awaited<T> mit diesem Typen innerhalb also ist dann Awaited<Promise<User>> und holt den innereren Typ des Promises also User. Also ist "type Result = User".

// Antwort: Genau richtig.
//
// Vollständig:
//
// typeof getUser
// → () => Promise<User>
//
// ReturnType<typeof getUser>
// → Promise<User>
//
// Awaited<Promise<User>>
// → User
//
// Also:
//
// type Result = User;
//
// Hier sieht man sehr schön die unterschiedlichen Aufgaben:
//
// ReturnType
// → Funktion → Rückgabetyp
//
// Awaited
// → Promise-/awaitbarer Typ → aufgelöster Typ



// 6. Warum gibt Parameters<T> ein Tuple zurück
// und kein gewöhnliches Array?
// Antwort: Weil die Parameter einer Funktion als Tupel returned werden, da sie intern positionsbasiert sind also Index 0: Parameter 1, Index 1: Parameter 2 usw.

// Antwort: Genau richtig.
// Zusätzlich muss TypeScript nicht nur die Reihenfolge, sondern auch den jeweiligen Typ jeder Position behalten.
//
// Zum Beispiel:
//
// (name: string, age: number, active: boolean) => User
//
// ergibt:
//
// [name: string, age: number, active: boolean]
//
// Ein normales Array:
//
// (string | number | boolean)[]
//
// wäre zu ungenau, weil dabei verloren ginge,
// welcher Typ an welcher Parameterposition erwartet wird.
//
// Ein Tuple erhält:
//
// Position 0 → string
// Position 1 → number
// Position 2 → boolean



// 7. Was macht Required<T>?
// Entfernt es automatisch jedes `undefined` aus Property-Typen?
// Antwort: Required<T> arbeitet intern mit Mapped Types und entfernt für alle Properties eines Types das optionale ?, also danach sind alle Properties des Typ erforderlich (macht intern [K in keyof T]-?: T[K];).
// Nein es entfernt nicht automatisch jedes undefined aus den Property-Typen, da undefined ausdrücklich Bestandteil der Value Types sind und Required<T> nur die Optional-Modifiers der Propertykeys entfernt.

// Antwort: Genau richtig.
//
// Vereinfacht:
//
// type MyRequired<T> = {
//     [K in keyof T]-?: T[K];
// };
//
// `-?` entfernt den Optional-Modifier.
//
// Wichtig:
//
// type Example = {
//     name?: string;
//     age: number | undefined;
// };
//
// Required<Example>
//
// ergibt unter deinem `exactOptionalPropertyTypes`-Setup sinngemäß:
//
// {
//     name: string;
//     age: number | undefined;
// }
//
// `age` bleibt `number | undefined`, weil undefined ausdrücklich Bestandteil des Property-Value-Types ist.
//
// Required<T> verändert also die Optionalität der Property,
// nicht beliebige `undefined`-Bestandteile im Value Type.



// 8. Was macht Readonly<T>
// und handelt es sich dabei um einen Runtime-Schutz?
// Antwort: Readonly<T> arbeitet intern ebenfalls mit Mapped Types und wendet auf jede Property eines Types etwas an, nämlich stellt mit "readonly [K in keyof T]: T[K];" vor jeden Propertykey readonly,
// somit sind alle Properties nurnoch lesbar und nicht veränderbar nach der Initialisierung.
// Ist kein Runtime Schutz, brauchen noch Type Guards.

// Antwort: Der erste Teil ist richtig:
//
// type MyReadonly<T> = {
//     readonly [K in keyof T]: T[K];
// };
//
// Dadurch werden alle Properties auf der Type-Ebene readonly.
//
// Es fehlt aber noch der zweite wichtige Teil der Frage:
//
// Nein, Readonly<T> ist KEIN Runtime-Schutz.
//
// `readonly` ist eine TypeScript-Compile-Time-Regel.
// Die Typinformationen verschwinden beim Kompilieren.
//
// Es ist also nicht dasselbe wie ein Runtime-Mechanismus wie z.B. `Object.freeze()`.
//
// Merksatz:
//
// Readonly<T>
// → TypeScript-Typschutz zur Compile Time
//
// Object.freeze(...)
// → Runtime-Verhalten



// 9. Welcher Typ entsteht?
/*
type Status =
    "loading" | "success" | "error";

type Result =
    Exclude<Status, "loading">;
*/
// Antwort: Der Typ type Result = "success" | "error" entsteht, weil Exclude<T> mit Conditional Types (ohne infer) arbeitet. Es benutzt jetzt explizit zwei Generics T und U (nicht U wie bei infer sondern
// explizit zweites Generic U) und Distributive Conditional Types was erst im nächsten Konzept kommt. Exclude<T, U> entfernt im angegebenen Typ T die in U angegebenen Values im Union des Typen T.

// Antwort: Genau richtig in der Grundidee.
//
// Ergebnis:
//
// type Result = "success" | "error";
//
// Und sehr gut erkannt:
// Das U in:
//
// Exclude<T, U>
//
// ist ein normal deklarierter zweiter Generic Type Parameter.
//
// Das ist etwas anderes als:
//
// infer U
//
// bei dem TypeScript U während des Pattern-Matchings bestimmt.
//
// Vereinfacht ist Exclude:
//
// type MyExclude<T, U> =
//     T extends U
//         ? never
//         : T;
//
// Bei Union Types wird dieser Conditional Type distributiv auf die einzelnen Union-Member angewendet.
//
// Sprachlich würde ich statt „Values entfernen“ besser sagen:
//
// → Union-Mitglieder / Typen entfernen.
//
// Denn wir arbeiten weiterhin auf der Type-Ebene.



// 10. Was ist der konzeptionelle Unterschied zwischen:
/*
Exclude<T, U>
Extract<T, U>
*/
// Antwort: Exclude<T, U> entfernt bestimmte Values U für den angegebenen Typen T, Extract<T, U> lässt die Values von Typ T, die in U spezifiziert sind, stehen sozusagen und entfernt alle anderen.

// Antwort: Genau richtig, wieder nur besser „Union-Mitglieder“ statt „Values“.
//
// Exclude<T, U>
// → entfernt aus T alle Union-Mitglieder, die zu U kompatibel sind.
//
// Extract<T, U>
// → behält aus T nur die Union-Mitglieder, die zu U kompatibel sind.
//
// Vereinfacht:
//
// type MyExclude<T, U> =
//     T extends U
//         ? never
//         : T;
//
// type MyExtract<T, U> =
//     T extends U
//         ? T
//         : never;
//
// Also:
//
// Exclude
// → Treffer entfernen
//
// Extract
// → Treffer behalten



// 11. Warum ergibt folgendes Beispiel string?
/*
type Value =
    string | null | undefined;

type Result =
    NonNullable<Value>;
*/
// Antwort: Weil der Utility Type NonNullable<T> null und undefined aus dem Union für den Typen T entfernt. Arbeitet intern auch mit einem einfachen Conditional Type,
// und hat die Condition "T extends null | undefined" also prüft ob der angegebene Typ T null oder undefined als Value hat und entfernt diese

// Antwort: Das Ergebnis `string` ist richtig, aber hier ist eine wichtige Korrektur.
//
// Zunächst das Verhalten:
//
// type Value = string | null | undefined;
//
// NonNullable<Value>
// → string
//
// Für unser Conditional-Type-Lernmodell kann man sich NonNullable konzeptionell so vorstellen:
//
// type MyNonNullable<T> =
//     T extends null | undefined
//         ? never
//         : T;
//
// Und GENAU dieses Beispiel wäre ein distributiver Conditional Type,
// weil T links von `extends` direkt als Type Parameter steht.
//
// Gedanklich:
//
// string
// → bleibt string
//
// null
// → never
//
// undefined
// → never
//
// zusammen:
//
// string | never | never
// → string
//
// Deine Formulierung „nicht Distributive Conditional Type“ wäre daher für diese selbstgebaute Variante falsch.
//
// Noch eine fortgeschrittene Feinheit:
// Die konkrete eingebaute Definition von `NonNullable<T>` in modernen TypeScript-Versionen muss nicht exakt diese Conditional-Type-Implementierung verwenden.
// Für das Verständnis des Filterverhaltens ist `T extends null | undefined ? never : T` aber weiterhin ein sehr gutes konzeptionelles Modell.
//
// Wichtig ist also:
// NonNullable<T> entfernt null und undefined aus dem Typ T.



// 12. Was macht InstanceType<T>
// und warum schreibt man bei einer Klasse typischerweise:
/*
InstanceType<typeof MyClass>
*/
// statt einfach:
// InstanceType<MyClass>
// Antwort: InstanceType<T> liefert den Typ einer Instanz einer Klasse, wenn wir also eine Klasse MyClass haben, holt InstanceTyp<T> als Typ MyClass. Man schreibt mit typeof statt ohne,
// da T einen Konstruktor-Typ erwartet, und der Wert MyClass ist zur Runtime die Klasse bzw. Konstruktorfunktion, da wir aber den Konstruktor-Typ auf der Type-Ebene brauchen, nehmen wir typeof MyClass.
// Dann kann InstanceType daraus bestimmen, welcher Instanztyp bei new MyClass entsteht?

// Antwort: Genau richtig.
//
// Bei einer Klasse existieren zwei relevante Seiten:
//
// MyClass
// → Instanztyp
//
// typeof MyClass
// → Typ des Klassen-/Konstruktorwertes
//
// InstanceType<T> erwartet einen Konstruktor-Typ.
//
// Deshalb:
//
// InstanceType<typeof MyClass>
//
// `typeof MyClass` beschreibt auf der Type-Ebene den Konstruktor.
// InstanceType kann daraus den Typ bestimmen, der durch:
//
// new MyClass(...)
//
// entsteht.
//
// Ergebnis:
//
// InstanceType<typeof MyClass>
// → MyClass
//
// Vereinfacht kann man sich den Mechanismus ungefähr so vorstellen:
//
// T extends new (...args: any[]) => infer R
//     ? R
//     : never;
//
// Hier wird R an der Position des erzeugten Instanztyps inferiert.



// 13. Ordne die Utility Types grob den Mechanismen zu:
//
// Required<T>
// Readonly<T>
// ReturnType<T>
// Parameters<T>
// Awaited<T>
// Exclude<T, U>
// Extract<T, U>
// NonNullable<T>
// InstanceType<T>
//
// Mapped Types:
// Conditional Types:
// infer:
// Antwort:
// Mapped Types: Required<T> (geht durch jede Property eines Typs und entfernt das ? also optionale -> mapped etwas für jede Property des Typs), Readonly<T> (mappt für jede Property ein readonly davor
// somit nurnoch lesbar, nicht mehr veränderbar nach der Initialisierung)
// Conditional Types: Exclude<T, U> (Distributive Conditional Type), Extract<T, U> (Distributive Conditional Type), NonNullable<T>
// infer: ReturnType<T>, Parameters<T>, Awaited<T>, InstanceType<T>

// Antwort: Fast richtig. Wichtig ist, dass sich die Kategorien überschneiden können.
//
// Mapped Types:
//
// Required<T>
// Readonly<T>
//
// Conditional Types:
//
// ReturnType<T>
// Parameters<T>
// Awaited<T>
// Exclude<T, U>
// Extract<T, U>
// InstanceType<T>
//
// `infer` innerhalb von Conditional Types:
//
// ReturnType<T>
// Parameters<T>
// Awaited<T>
// InstanceType<T>
//
// Distributive Conditional Types:
//
// Exclude<T, U>
// Extract<T, U>
//
// Bei NonNullable<T>:
// Konzeptionell können wir das Filterverhalten mit einem distributiven Conditional Type erklären:
//
// T extends null | undefined ? never : T
//
// Die konkrete eingebaute moderne TypeScript-Definition kann jedoch anders implementiert sein.
//
// Der wichtige Punkt ist:
// `infer` ist nicht eine Alternative zu Conditional Types.
//
// Vielmehr:
//
// Conditional Type
//     ↓
// kann innerhalb seines extends-Musters
// `infer` benutzen.
//
// Zum Beispiel:
//
// T extends (...args: any[]) => infer R
//     ? R
//     : never;
//
// Das ist gleichzeitig:
//
// Conditional Type
// +
// infer



// 14. Welcher Typ entsteht in jedem Schritt?
/*
async function fetchUsers(): Promise<User[]> {
    // ...
}

type A = typeof fetchUsers;
type B = ReturnType<typeof fetchUsers>;
type C = Awaited<B>;
type D = C[number];
*/
// Antwort: type A = () => Promise<User[]>, type B = Promise<User[]>, type C = User[], type D = User
// Erklärungen für A bis C -> vergleiche Aufgabe 2, 3 und 4, Erklärung type D: Da type C das User[] Array als Typ enthält, kann man mit dem Indexed Acces [number] danach den Typen holen der ein Element des Arrays hat,
// was in diesem Fall User ist, weil es ein User[] Array ist und jedes Element demnach vom Typ User ist. Achtung: Wenn das Array z.B. strings und numbers enthalten kann, wäre der Typ der mit [number] geholt werden würde
// gleich string | number, nicht nur string oder number

// Antwort: Vollständig richtig.
//
// Schritt für Schritt:
//
// type A = typeof fetchUsers;
//
// A:
// () => Promise<User[]>
//
// Dann:
//
// type B = ReturnType<typeof fetchUsers>;
//
// B:
// Promise<User[]>
//
// Dann:
//
// type C = Awaited<B>;
//
// C:
// User[]
//
// Dann:
//
// type D = C[number];
//
// D:
// User
//
// Sehr gut ist auch deine Ergänzung zu Indexed Access:
//
// type Values = (string | number)[];
// type Element = Values[number];
//
// ergibt:
//
// string | number
//
// `[number]` bedeutet bei einem Array-Typ:
// Gib mir den Typ, der an einem beliebigen numerischen Index vorkommen kann.
