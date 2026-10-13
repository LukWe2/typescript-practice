


























































// 1. Was ist die grundlegende Aufgabe eines Mapped Types?
// Antwort: Die grundlegende Aufgabe ist, durch mehrere Property-Keys eines bestehenden Typen zu gehen/iterieren und für jeden dieser Keys automatisch eine neue Property in einem neuen Typen
// zu erstellen mit diesem Keynamen und einem bestimmten Typ der festgelegt wird in Syntex nach dem :
// Oft benutzt man zum Festlegen der Keys aus denen neue erstellt werden sollen mit keyof BestehenderTyp, kann aber auch Unions benutzen.
// Mit einem Indexed Access Type und einem Mapped Type kann man z.B. einen Typ kopieren  oder einen neuen Typen mit Arrays als Properties aus den eigentlich einfachen Propertytypen machen.
// Der zentrale Mapped-Type Ablauf ist dabei [K in keyof T]: T[K], was für jede Property (bzw. Key davon) K von Typ T eine neue Property erstellt, und durch T[K] (T ist der
// ursprüngliche Typ, K der Key der Property des bestehenden Typen) durch Indexed Access Type den Typ dieser Property aus dem bestehenden Typen holt, weil Typ[Propertykey] das ja
// bekanntlich tut.
// Dieses Verfahren geht mit nur einem bestimmten bestehenden Typ wie der Typ User: type UserFlags = { [K in keyof User]: boolean }, aber auch Generics: type Flags<T> = { [K in keyof T]: boolean }.
// Mit Indexed Access Type wäre es: type UserCopy = { [K in keyof User]: User[K] }, mit Generic also für mehrere Typen: type TypeCopy<T> = { [K in keyof T]: T[K] }
// Besonders spannend sind Generics in Verbindung mit Mapped Types weil man somit Transformationen von Typen für mehrere Typen gleichzeitig implementieren kann
// wie type ArrayValues<T> = [K in keyof T]: T[K][],
// wobei für jede Property bzw. deren Key K in T (durch keyof), eine neue Property im neuen Typ angelegt wird mit demselben Key-Name, aber der Value ist jetzt ein Array
// aus dem ursprünglichen Typ, der Typ der Property des bestehenden Typs wird erstmal mit T[K] geholt und dann mit [] zu einem Array gemacht

// Antwort: Inhaltlich sehr gut. Du beschreibst genau den Kern eines Mapped Types: Eine Menge von Property-Keys wird durchlaufen und daraus wird systematisch ein neuer Typ erzeugt.
// Besonders wichtig ist die Kombination `[K in keyof T]` für die Keys und `T[K]` für den ursprünglichen Property-Typ.
// Zwei kleine Korrekturen:
// 1. Die korrekte Syntax für dein Array-Beispiel braucht geschweifte Klammern:
//    type ArrayValues<T> = { [K in keyof T]: T[K][] };
// 2. Ein generischer Mapped Type transformiert nicht mehrere Typen "gleichzeitig", sondern ist wiederverwendbar und kann mit beliebig vielen unterschiedlichen konkreten Typen instanziiert werden.


// 2. Was passiert Schritt für Schritt bei folgendem Typ?
/*
type Flags<T> = {
    [K in keyof T]: boolean;
};
*/
// Antwort: Hier wird erst ein generischer Typ Flags angelegt, der einen bestehenden Typ T entgegennimmt. Dann wird für jeden Propertykey dieses bestehenden Typs T im neuen Typ Flags
// eine neue Property mit genau diesem Keynamen angelegt. Als Typ wir statt dem Value-Typ im bestehenden Typ T für jede Property boolean gesetzt.

// Antwort: Genau richtig. `keyof T` liefert zunächst die Union aller Keys von T. `K in keyof T` verarbeitet jeden dieser Keys und erzeugt ihn im neuen Typ erneut.
// Der ursprüngliche Property-Typ wird hier bewusst nicht übernommen; jede erzeugte Property bekommt stattdessen `boolean`.


// 3. Was bedeutet `K` in `[K in keyof T]` und welche Werte kann K annehmen?
// Antwort: K ist einfach eine Variable bzw. Platzhalter für den jeweils gerade verarbeiteten Key. (Achtung falsch: Er kann jeden String Wert annehmen, da es nur ein Platzhalter ist) -> kann nur Werte aus keyof T
// also nur Werte die als Propertykeynamen in Typ T existieren.

// Antwort: Der erste Satz ist richtig. K ist eine Type-Variable für den jeweils gerade verarbeiteten Property-Key.
// Wichtig: K kann aber nicht einfach jeden beliebigen String annehmen, sondern jeweils nur einen Key aus `keyof T`.
// Außerdem müssen Property-Keys nicht ausschließlich strings sein: Je nach T kann `keyof T` auch `number`- oder `symbol`-Keys enthalten.
// Beispiel: Bei `keyof User = "id" | "name" | "active"` nimmt K nacheinander genau `"id"`, `"name"` und `"active"` an.


// 4. Was ist der Unterschied zwischen `keyof T` und `T[K]` innerhalb eines Mapped Types?
// Antwort: keyof T holt sich alle Propertykeynamen vom Typ T als Union, während T[K] den Typen des gerade verarbeiteten Keys holt.

// Antwort: Genau richtig. `keyof T` liefert die möglichen Keys als Union. `T[K]` ist anschließend ein Indexed Access Type und liefert den Property-Typ, der hinter dem gerade betrachteten Key K in T liegt.
// Also z.B. K = "name" → T[K] = T["name"] → string.


// 5. Was ist der resultierende Typ?
/*
type User = {
    id: number;
    name: string;
    active: boolean;
};

type Arrays<T> = {
    [K in keyof T]: T[K][];
};

type Result = Arrays<User>;
*/
// Antwort: Der resultierende Typ von Result ist { id: number[], name: string[], active: boolean[] }, da durch den Mapped Type die Keys von User in den neuen Typ Arrays kopiert werden
// und die (Achtung falsch: Values ->sind nicht Values nach dem : sondern der Typ der Property, sind in Typ und nicht in Objekt wo nach dem : der Value also Wert für die Property kommt)
// jeweils der Typ des gerade verarbeiteten/iterierten Keys (durch T[K]) als Array annimmt (wegen des [] nach T[K]).

// Antwort: Genau richtig. Ergebnis ist:
// type Result = {
//     id: number[];
//     name: string[];
//     active: boolean[];
// };
// Präzise formuliert wird nicht der "Value" selbst übernommen, sondern der jeweilige Property-Typ über `T[K]` ermittelt und anschließend durch `[]` in einen Array-Typ umgewandelt.


// 6. Was ist der Unterschied zwischen diesen beiden Schreibweisen?
/*
type A = {
    [key: string]: number;
};

type B<T> = {
    [K in keyof T]: number;
};
*/
// Antwort: Der Unterschied ist, dass beim ersten eine String Index Signature benutzt wird, bei der beliebige String-Keys benutzt werden dürfen also die Keys dynamisch sind,
// aber nicht konkret benannt sind. Ein Mapped Type nimmt einen bestehenden Typ oder eine Union und daraus eine bekannte Menge von Keys und erzeugt für jede davon eine Property in einem neuen Type.

// Antwort: Genau richtig. A beschreibt eine offene Dictionary-Struktur: Beliebige vorhandene String-Keys müssen number-Values besitzen.
// B verwendet dagegen genau die bekannte Key-Menge aus `keyof T` und erzeugt für jeden dieser Keys eine number-Property.
// Das ist der zentrale Unterschied zwischen Index Signature und Mapped Type.


// 7. Warum funktioniert ein Mapped Type auch direkt über eine Literal Union?
/*
type Role = "admin" | "editor" | "viewer";

type RoleFlags = {
    [K in Role]: boolean;
};
*/
// Antwort: Weil auch hier Strings als mehrere Werte definiert sind, aus denen jeweils eine Property gemacht werden kann, genauso wie wenn man durch einen bestehenden Typen geht und aus den 
// bestehenden Properties bzw. deren Key eine neue Property macht.

// Antwort: Im Kern richtig. Präziser: `"admin" | "editor" | "viewer"` ist bereits eine Union gültiger Property-Key-Literals.
// Ein Mapped Type benötigt nicht zwingend `keyof T`; er benötigt eine Menge erlaubter Property-Keys, über die er iterieren kann.
// Deshalb kann `[K in Role]` direkt für jeden Union-Member eine Property erzeugen:
// admin: boolean, editor: boolean und viewer: boolean.


// 8. Was ist der Zusammenhang zwischen Record<K, V> und Mapped Types?
// Antwort: Der Zusammenhang ist, dass Record<K, V> im Grunde ein Mapped Type ist, weil wir ja bei Record<> für jeden Wert des ersten Parameters K (wenn dieser eine Menge von Property Keys ist wie eine Union oder Keys eines komplexen Typs) 
// eine Property anlegen und der Value dieser Property dem Typ V entsprechen muss. Das ist ja das Prinzip eines Mapped Types, dass durch eine Union oder bestehenden Typen gegangen wird 
// und für jeden Wert/Propertykey ein Propertykey im neuen Typ erstellt wird und der Value dieses Propertykeys dem entsprechen muss was nach dem : steht bei z.B. [K in Role]: boolean.

// Antwort: Genau richtig vom Prinzip. `Record<K, V>` kann man sich vereinfacht ungefähr so vorstellen:
// type MyRecord<K extends PropertyKey, V> = {
//     [P in K]: V;
// };
// Für jeden erlaubten Property-Key aus K wird also eine Property erzeugt und jede bekommt den Value-Typ V.
// Kleine Präzisierung: Statt "wenn K komplex ist" würde ich sagen: K muss ein gültiger Property-Key-Typ bzw. eine Union solcher Keys sein, z.B. `"admin" | "editor" | "viewer"`.


// 9. Wie funktioniert folgender selbst geschriebener Utility Type?
/*
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};
*/
// Antwort: Dieser Utility Type nimmt einen Typ T entgegen und legt für jede Propertykey in diesem Typ T (durch keyof T) einen neuen Propertykey mit demselben Namen an, 
// dessen Propertytyp auch der gleiche ist wie im Typ T (durch T[K], was den Typ der Property K des Typs T liefert wegen Typ[Propertykey] = Typ der Property),
// er kopiert also im Grunde die Properties des Typ T aber macht diese durch das ? am Ende alle optional, weswegen der Typ auch MyPartial heißt, weil es eine manuelle Implementation des Utility Type Partial<> ist.
// -> Achtung, in einem Typ ist das, was nach dem : steht kein Value, sondern der Typ der Property! In einem Objekt steht nach dem : der Value, in einem Typ der Typ der Property

// Antwort: Genau richtig. Besonders dein letzter Hinweis ist wichtig: In `[K in keyof T]?: T[K]` steht rechts vom Doppelpunkt kein Runtime-Value, sondern der Typ der neu erzeugten Property.
// `?` macht jede erzeugte Property optional, während `T[K]` ihren ursprünglichen Property-Typ erhält. Das entspricht konzeptionell `Partial<T>`.


// 10. Warum sind Mapped Types besonders praktisch, wenn sich der ursprüngliche Typ später verändert?
// Antwort: Weil dadurch, dass ja für jede Property im bestehenden Typ (also aus dem der Mapped Type entspringt) eine neue Property im neuen Typ angelegt wird dynamisch, wird dieser neue Typ auch dynamisch erweitert/verändert,
// wenn der bestehende Typ aus dem der neue Typ entspringt sich verändert

// Antwort: Genau. Wenn beispielsweise `User` später eine neue Property `email` bekommt, wird ein Typ wie `Flags<User>` automatisch ebenfalls um `email: boolean` erweitert.
// Dadurch vermeidet man doppelte Typdefinitionen und hält voneinander abhängige Typen automatisch synchron.


// 11. Ist das `in` in `[K in keyof T]` dasselbe wie der JavaScript-Operator
// `"property" in object`, den wir beim Type Narrowing verwendet haben?
// Antwort: Nein, hier ist in TypeScript Syntax auf Type-Ebene, das in beim Runtime-Narrowing ist ein JavaScript-Runtime-Operator und ist etwas anderes.

// Antwort: Genau richtig. `[K in keyof T]` existiert ausschließlich im TypeScript-Typsystem und dient zum Iterieren über Property-Keys beim Erzeugen eines Typs.
// `"property" in object` ist dagegen echter JavaScript-Code zur Runtime, der prüft, ob eine Property in einem Objekt bzw. dessen Prototypkette vorhanden ist, und den TypeScript zusätzlich zum Narrowing verwenden kann.