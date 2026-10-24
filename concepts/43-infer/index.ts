// 1.

// Hier benutzen wir ein Conditional Type mit infer, dadurch machen wir zwei Schritte:
// Wir prüfen mit extends zuerst, ob der für T eingesetzte Typ (z.B. Promise<string> oder nur string), ein Promise ist und haben für true einen Zweig (der nach ?) und für 
// false einen Zweig (der nach :)
// Da wir nicht wie im letzten Konzept nur prüfen und dann einen Typen neu zuweisen, sondern auch noch infer benutzen, können wir aus dem Typen den wir für T angeben einen Teiltyp sozusagen aus diesem Typ T
// sozusagen extrahieren. Das infer gibt dabei das Muster an bzw. das gesamte Promise<infer U> ist hier das Muster. infer U markiert innerhalb dieses Musters nur die Stelle, deren Typ TypeScript bestimmen soll, 
// d.h. für das was wir "infer X" schreiben, ist der Teil des Muster was abgeglichen wird mit dem Typen was wir für T einsetzen
// Wir können einen inferred Typ nur im true-Zweig benutzen (sonst Fehler Cannot find name 'U'.), dieser heißt hier U. 
// D.h. durch dieses Muster wo "infer X" steht, wird aus dem Typ der für T eingesetzt wird in diesem Fall der Typ innerhalb des Promise extrahiert.
// Hier weisen wir diesen inferred Typ U dann im true-Zweig dem neu erstellten Typen (wie StringPromise oder kann natürlich z.B. PromiseValue<Promise<string>> auch direkt verwenden) zu

type PromiseValue<T> = 
    T extends Promise<infer U>
        ? U
        : T;

// Hier testen wir PromiseValue<T>, indem wir einen neuen Typ erstellen der diesen Conditional Type mit infer benutzt und da wir hiermit für T etwas einsetzen,
// wird der Conditional Type geprüft. In diesem Fall erfüllt T (was Promise<string> ist) die Condition und wir gehen somit in den true-Zweig
// In diesem weisen wir StringPromise dem Typ U zu, dieser wird eben aus Promise<string> inferred, indem mit dem Muster Promise<???> abgeglichen wird, und für ??? (was infer U ist),
// wird logischerweise string inferred.
// type StringPromise = string
type StringPromise = PromiseValue<Promise<string>>

// Auch hier, setzen für T Promise<number> ein, Condition wird true, da "T extends Promise<infer U>" erfüllt ist durch Promise<number> und wir inferren auch hier mit dem Muster
// Promise<infer U> -> Promise<???> wobei number herauskommt, somit ist der Typ, den wir NumberPromise zuweisen, nur number
// type NumberPromise = number
type NumberPromise = PromiseValue<Promise<number>>;

// Hier jetzt Fall, in der Condition nicht zutrifft, setzen für T string ein, dadurch wird "T extends Promise<infer U>" nicht erfüllt, gehen daher in den False-Zweig und weisen
// StringNoPromise den "kompletten" (nicht inferred) Typ zu, nämlich T also einfach string. Hier könnte auch ": never" stehen für den False-Zweig, dann wäre StringNoPromise vom Typ never.
// type StringNoPromise = string
type StringNoPromise = PromiseValue<string>;


// 2.

// Hier jetzt der Fall für ein Array, für den wir auch Typen inferrieren können. Prüfen wie beim Promise ebenfalls erst, ob der für T eingesetzte Typ ein Array ist (durch (infer U)[],
// ohne infer wäre es any[]), und weisen im True-Zweig wieder den inferrierten Typ U zu, wenn die Condition von T nicht erfüllt wird, dann weisen wir Typ never zu
// In diesem Fall inferrieren wir den Typ eines Array-Elements (bzw. aller Array Elemente, kann ein Typ sein aber auch ein Union), auch hier legen wir sozusagen ein Muster fest, nämlich
// (infer U)[] bzw. ???[] und vergleichen dieses mit dem Typ der für T eingesetzt ist (im true-Fall). Da T z.B. wie im ersten Beispiel unten string[]> ist, 
// ist die Condition erfüllt und wir gleichen das Muster ab: string[] -> ???[] ---> string
// Somit ist StringArray vom Typ string, hier haben wir jetzt nicht den inneren Typ wie bei Promise extrahiert, sondern hier den Typen eines Array-Elements/jeden Elements des Arrays wieder mit 
// Muster abgleichen herausgefunden
type ArrayElement<T> = 
    T extends (infer U)[]
        ? U
        : never;

// type StringArray = string
type StringArray = ArrayElement<string[]>;

// type NumberString = number
type NumberString = ArrayElement<number[]>;

/*
type UserArray = {
 id: number;
 name: string;
 active: boolean;
}
*/
// Hier genau gleicher Ablauf, prüfen ob User[] ein Array ist, weil true in den True-Zweig, inferrieren hier auch den Typ eines Elements/jeden Elements des Arrays mit dem Muster
// (infer U)[] bzw. ???[] wobei User herauskommt, der eben genau diese Shape hat und da es ein Custom Type ist wird von VSC die Shape angezeigt aber ist eigentlich type UserArray = User; so wie type StringArray = string
type UserArray = ArrayElement<User[]>;

// Da T hier string ist und kein Array, ist die Condition false und gehen in False-Zweig, weisen Typ dem Typ never zu
// type StringNoArray = never
type StringNoArray = ArrayElement<string>;


// 3.

type User = {

    id: number,
    name: string
    active: boolean
};

type Applicant = {

    id: string,
    name: string
};

type Project = {

    title: string,
    teamSize: number
};

// Inferrieren geht auch für Objektproperties basierend auf T
// Prüfen hier jetzt erst ob der für T eingesetzte Typ eine Propert id besitzt (also nicht wie bei Promise oder Arrays ob T von einem bestimmten Typ ist sondern ob seine Shape
// eine bestimmte Property besitzt), wenn true inferrieren wir diesen Typ mit dem Muster "id: infer I" also "id: ???", bei User ist die id vom Typ number weswegen
// UserWithId auch den Typ number hat, der Typ Applicant hat auch eine Property id die inferred wird, aber bei dieser ist id vom Typ string, weshalb ApplicantWithStringId auch vom
// Typ string ist, d.h. es wird eben inferred also basierend auf dem für T eingesetzten Typ dieser Propertytype extrahiert.
// Bei TypeWithoutId hat der für T einesetzte Typ garkeine Property id weswegen wir direkt in den False-Zweig gehen und dem Typ TypeWithoutId den Typ never zuweisen
type GetIdType<T> =
    T extends { id: infer I }
        ? I
        : never;

// type UserWithId = number
type UserWithNumberId = GetIdType<User>;

// type ApplicantWithStringId = string
type ApplicantWithStringId = GetIdType<Applicant>;

// type TypeWithoutId = never
type TypeWithoutId = GetIdType<Project>;



// 4.

function getUserName(user: User): string {

    return user.name;
}

function getUserId(user: User): number {

    return user.id;
}

function getUserGeneral(user: User): User {

    return user;
}

// Geht auch mit Funktionen, prüfen erst ob T ein Funktionstyp ist ((parameter) => rückgabetyp), Und inferren dann entweder die Parameter (diese werden als Tupel zurückgegeben!)
// oder den Rückgabetyp oder beides
type MyReturnType<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;

// type GetUserNameType = string
type GetUserNameType = MyReturnType<typeof getUserName>;

// type GetUserIdType = number
type GetUserIdType = MyReturnType<typeof getUserId>;

/*
type GetUserType = {
 id: number;
 name: string;
 active: boolean;
}
*/
type GetUserType = MyReturnType<typeof getUserGeneral>;


// 5.

function createUser(name: string, age: number, active: boolean): User | null {

    return null;
}

type MyParameters<T> = 
    T extends (...args: infer P) => any
        ? P
        : never;

// type CreateUsersParameter = [name: string, age: number, active: boolean]
type CreateUsersParameter = MyParameters<typeof createUser>;



// 6.
// Hier inferren wir beides, Parameter und Rückgabetyp und weisen dann dem Typen diese zwei Properties zu (siehe unten)
// Prüfen erst wieder ob T ein Funktionstyp ist ((parameter) => rückgabetyp), und nach dem Muster extrahieren wir wieder die Typen aus T
type FunctionParts<T> = 
    T extends (...args: infer P) => infer R
        ? {
            parameters: P,
            returnType: R
        }
        : never;

/*
type FunctionPartsgetUserNameType = {
 parameters: [user: User];
 returnType: string;
}
*/
type FunctionPartsGetUserNameType = FunctionParts<typeof getUserName>;

/*
type FunctionPartsGetUserIdType = {
 parameters: [user: User];
 returnType: number;
}
*/
type FunctionPartsGetUserIdType = FunctionParts<typeof getUserId>;



// 7.

async function getUser(): Promise<User> {
    return {
        id: 1,
        name: "Lukas",
        active: true
    };
}

// type DirectReturnTypeGetUser = Promise<User>
type DirectReturnTypeGetUser = ReturnType<typeof getUser>;

/*
type InnerPromiseTypeGetUser = {
 id: number;
 name: string;
 active: boolean;
} --> type User
*/ 
type InnerPromiseTypeGetUser = PromiseValue<DirectReturnTypeGetUser>;




// 8.

type InnerPromiseTypeGetUserDirect = PromiseValue<ReturnType<typeof getUser>>;



// 9.

type Product = {

    name: string,
    value: number
};

type PropertyValue<T> = 
    T extends { value: infer I}
        ? I
        : never;

// type ProductValue = number
type ProductValue = PropertyValue<Product>;

// type UserValue = never
type UserValue = PropertyValue<User>;

// müssen nicht immer dem Typen, der aus PropertyValue<T> herauskommt einem seperaten Typen zuweisen, können diesen auch direkt nutzen wie hier
// Sonst hätten wir vielleicht das gemacht: type ValueHolder = { value: number }; und dann type NumberValue = PropertyValue<ValueHolder>;
// type NumberValue = number
type NumberValue = PropertyValue<{ value: number }>;

// type NameStringValue = never
type NameStringValue = PropertyValue<{ name: string }>;



// 10.

// Ein normaler Generic T ist der komplette Typ, der angegeben wird und auf dem basierend die Condition geprüft wird
// infer U ist wiederum dann das Muster, bzw. `infer U` ist nicht selbst das gesamte Muster, es markiert `infer U` innerhalb des extends-Musters eine Position
// das wir festlegen, wenn die Condition true ist und wir einen Teil sozusagen des Typ T als Typ U extrahieren wollen
// infer wird innerhalb eines Conditional Types verwendet, der eben eine Condition basierend auf einem angegebenen Typen (hier immer T) prüft, und wenn diese true ist,
// kann man mit infer X aus diesem Typen T noch Typen extrahieren/erschließen

// Korrigiert:
// Ein normaler Generic T ist hier der vollständige Typ, den wir untersuchen.
// Sein konkreter Typ wird beim Verwenden des generischen Types angegeben
// bzw. kann in anderen Kontexten auch von TypeScript inferiert werden.
//
// Ein Conditional Type prüft, ob T zu einer bestimmten Typstruktur passt.
//
// `infer U` ist nicht selbst das gesamte Muster.
// Stattdessen markiert `infer U` innerhalb des extends-Musters eine Position,
// deren konkreten Typ TypeScript beim Matching bestimmen soll.
//
// Beispiel:
// T = Promise<User>
//
// Muster:
// Promise<infer U>
//
// T passt zum Muster.
// An der mit `infer U` markierten Position steht User.
//
// Deshalb:
// U = User
//
// U steht anschließend im True-Zweig zur Verfügung und kann dort
// z.B. direkt als U, als U[], als Propertytyp usw. weiterverwendet werden.















// 1. Was ist die grundlegende Aufgabe von `infer` innerhalb eines Conditional Types?
// Antwort: Die Aufgabe von infer innerhalb eines Conditional Types ist es, einen Typen aus einem Promise, Array, Tupel oder einer Funktion zu erschließen bzw.
// herauszuziehen. Mit einem Conditional Type können wir nach einer Bedingung (ob ein Typ einen anderen Typen erfüllt mittels extends) einem neuen Typen einen bestimmten Typ der in den Bedingungen festgelegt ist, zuweisen/geben.
// infer kann dabei aus dem Typen, auf dem diese Bedingung basiert, einen inneren Typen herausziehen/erkennen/extrahieren. Das funktioniert für Promises, Arrays, Tupel, Funktionen und Objekte.
// Dabei wird mit infer eine Art Muster festgelegt, für das aus dem für T eingesetzten Typ ein Teiltyp extrahiert wird, man könnte das infer X mit ??? ersetzen und das, was für T darin steht wird dann im true-Zweig der Condition herausgezogen wenn
// der Conditional Type so implementiert ist.
// Beispiel: type PromiseValue<T> = T extends Promise<infer U> ? U : T; -> das infer U setzt das Muster fest, dass wenn T ein Promise ist und die Condition "T extends Promise<infer U>" true ist, weisen wir dem Typen PromiseValue das was 
// für T im Muster infer U stehen würde, was bei PromiseValue<Promise<User>> User wäre, oder wenn die Bedingung falsch ist, dann den Typen T. U ist dabei nicht wie im letzten Konzept ein von uns festgelegter Typ 
// wie User, string oder Promise<Project>, die neben T festgelegt wurden, sondern neben T gibt es noch ein Generic U, der von TypeScript erschlossen wird aus dem Promise/dem Array/dem Tupel/dem Objekt.
// So wird nicht nur wie bei Conditional Types ohne infer geprüft, ob der Typ ein Promise/Array/Tupel/Objekt ist, sondern auch herausgefunden welcher Typ es ist. Somit können wir nicht nur aufgrund der Bedingung
// festlegen welcher Typ mit dem festgelegten Typ für die Generic Variable T ist, sondern dadurch dass TypeScript durch das T auch U weiß, kann der Typ von U erschlossen werden von TypeScript.
// Wenn wir also für T Promise<User> einsetzen, dann ist T = Promise<User> und U gleich User, weil Promise<User> die Condition T extends Promise<infer U> erfüllt, geht es in den true-Zweig und der Typ ist U was gleich User ist
// und wenn wir z.B. string einsetzen für T erfüllt es nicht T extends Promise<infer U> und der Typ wird zu T, in diesem Fall string
// Also zusammengefasst: TypeScript kann auf Basis vom eingesetzten Typ für T, wenn die Condition erfüllt wird, U erschließen, weil dann z.B. Promise<User> für T eingesetzt wird und aus Promise<infer U>, dann U ist erschlossen wird und demnach User ist.
// Das gilt jetzt für diesen Typ z.B.: "type PromiseValue<T> = T extends Promise<infer U> ? U : T;", hier steht U als true-Condition und deshalb ist der Typ, wenn die Bedingung erfüllt ist und T ein Promise ist, U für den Typen eingesetzt.
// Für Arrays, Tupel, Funktionen und Objekten ist es ähnlich, es kann der Arraytyp inferred werden aus dem für T eingesetzten Array (string[] -> string), genauso beim Tupel, bei Funktion können entweder die Parameter oder der Rückgabetyp
// inferred werden je nachdem ob man für die Typen der Parameter oder für den Rückgabetyp "infer X" angibt, und bei Objekten können ebenfalls Propertytypen erschlossen werden, aufgrund von dem was für T eingesetzt wird
// Also wir prüfen für einen übergebenen Typen T durch extends ob eine Datenstruktur eine gewisse Form eines Typen hat, wenn dies stimmt können wir aufgrund was T ist dessen Typ erschließen und wiederum als Typ verwenden

// Antwort: Inhaltlich sehr gut. Eine wichtige Präzisierung:
// `U` ist hier nicht einfach ein zweiter normaler Generic wie bei `type Example<T, U>`.
// `infer U` führt innerhalb des Conditional Types eine neue Type-Variable ein, deren konkreten Typ TypeScript beim Matchen selbst bestimmt.
//
// Der allgemeinste Satz wäre:
// `infer` markiert innerhalb eines Typ-Musters eine Position, deren Typ TypeScript aus dem untersuchten Typ T extrahieren soll.
//
// Deshalb würde ich statt „innerer Typ“ lieber „Teiltyp an einer bestimmten Position“ sagen.
// Promise, Array, Tupel, Funktion und Objekt sind Beispiele, aber keine abschließende Liste.
//
// Beispiel:
// T = Promise<User>
// Muster = Promise<infer U>
// → U = User
//
// T ist der komplette untersuchte Typ.
// U ist ein daraus beim Pattern-Matching erschlossener Teiltyp.



// 2. Was passiert Schritt für Schritt?
/*
type PromiseValue<T> =
    T extends Promise<infer U>
        ? U
        : never;

type Result = PromiseValue<Promise<User>>;
*/
// Antwort: Mit T extends Promise<X> wird erstmal festgelegt, dass die Bedingung darauf prüft, ob der übergebene Typ T ein Promise ist. Dadurch dass innerhalb "infer U" steht (und nicht nur Promise<string> wie in letztem Konzept),
// wird innerhalb T das Muster Promise<???> gesucht, und wenn die Bedingung stimmt und T damit dieses Muster erfüllt, wird der Typ der innerhalb des infer U steht, für U eingesetzt und wenn die Bedingung true ist,
// für PromiseValue der Typ U festgelegt, wenn T die Bedingung nicht erfüllt, dann der Typ never.
// Beim konkreten Aufruf unten ist es daher so, dass für T in PromiseValue "Promise<User>" eingesetzt wird, somit wäre die Prüfung "Promise<User> extends Promise<infer U>".
// Da Promise<User> jetzt das extends erfüllt, weil es ein Promise ist, wird für das infer U dieses Muster Promise<???> innerhalb T gematched, und dabie kommt für ??? User heraus, weswegen U vom Typ User ist und im erfolgreichen Fall hier
// Result zugewiesen wird, somit ist es type Result = User;.
// Durch infer wird nicht nur geprüft ob ein Typ einen anderen erfüllt, und basierend darauf ein Typ zugewiesen, sondern mit einem Muster infer X auch einen festgelegten Teil einer Typstruktur extrahieren, was kommt auf den Datentyp an
// (Promise, Array, Tupel, Funktionen, Objekte), man kann also einen Teil eines Typs sozusagen extrahieren und wiederverwenden, indem man ein Muster mit infer festlegt.

// Antwort: Richtig.
//
// Gedanklich:
// 1. T = Promise<User>
// 2. Match: Promise<User> gegen Promise<infer U>
// 3. Das Muster passt.
// 4. An der mit `infer U` markierten Position steht bei T `User`.
// 5. Deshalb U = User.
// 6. Der True-Zweig ist U.
// 7. Result = User.
//
// Nur technisch wichtig:
// Das Prüfen, ob das Muster passt, und das Inferieren von U gehören zusammen.
// TypeScript prüft also nicht erst völlig unabhängig „ist es ein Promise?“ und inferiert erst danach.
// Als mentales Schrittmodell ist deine Vorgehensweise aber sehr gut.



// 3. Was bedeutet U in `Promise<infer U>`?
// Wer legt fest, welcher konkrete Typ U wird?
// Antwort: U ist in diesem Fall der innere Typ des Promise, der extrahiert wird aufgrund des infer. Man legt sozusagen ein Muster fest, dass das was innerhalb des Promise steht als Typ verwendet werden können soll als U, und wird dann
// typischerweise als einen Typ in der Condition zugewiesen, meist bei der erfolgreichen.

// Antwort: Fast vollständig.
// `U` ist die von `infer` eingeführte Type-Variable für die markierte Position in `Promise<...>`.
// Welcher konkrete Typ U wird, bestimmt TypeScript durch das Matchen des untersuchten Typs T mit dem Muster.
//
// Beispiel:
// T = Promise<User>
// Muster = Promise<infer U>
// → TypeScript bestimmt U = User.
//
// U steht danach im True-Zweig zur Verfügung.
// Es muss dort aber nicht einfach direkt „zurückgegeben“ werden.
// Man könnte z.B. auch `U[]`, `{ value: U }` oder einen weiteren Conditional Type mit U erzeugen.



// 4. Welcher Typ entsteht jeweils?
/*
type ArrayElement<T> =
    T extends (infer U)[]
        ? U
        : never;

type A = ArrayElement<string[]>;
type B = ArrayElement<number[]>;
type C = ArrayElement<string>;
*/
// Antwort: Hier sagen wir beim ersten z.B., wir setzen string[] als T ein, legen das Muster ???[] fest und wollen das was für ??? basierend auf T inferriert wird als U verwenden können. Das ist bei type A eben string,
// da infer U wenn man für T string[] einsetzt nur string ist, nicht z.B. string[], dann müsste es (infer U[])[] sein. -> also type A = string.
// Bei Typ B wäre es analog type B = number, gleiches Vorgehen
// Bei Typ C wäre es type C = never, da für T string eingesetzt wird, und dies das extends (infer U)[] allgemein nicht erfüllt weil es kein Array ist, deshalb geht es in den false-Zweig der Condition und somit zu Typ never.
// Also erst prüfen, wird die Condition überhaupt erfüllt, wenn für T der bestimmte Typ eingesetzt wird, wenn nicht dann direkt in den false-Zweig, wenn ja also true ist, dann schauen was das infer macht (wenn es so wie hier ist,
// dass das U für den erfolgreichen Zweig zugewiesen wird)

// Antwort: A, B und C hast du richtig:
// A = string
// B = number
// C = never
//
// Eine Korrektur aber zu `(infer U[])[]`:
// Diese Syntax ist nicht korrekt.
//
// Wenn T = string[] ist und dein Muster `(infer U)[]` lautet, muss U = string sein,
// weil nur dann gilt:
//
// U[] = string[]
//
// Wenn du z.B. T = string[][] hättest:
//
// ArrayElement<string[][]>
//
// dann wäre:
// U = string[]
//
// weil:
//
// U[] = string[][]
//
// Wenn du bei `string[]` einfach `string[]` als Ergebnis behalten möchtest,
// würdest du nicht den Elementtyp inferieren, sondern z.B. T selbst zurückgeben.



// 5. Was wird bei folgendem Conditional Type inferiert?
/*
type GetReturn<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;
*/
// Antwort: Es wird der Rückgabetyp inferriert, wenn der Typ, der für T eingesetzt wird auch eine Funktion beschreibt, sonst geht es in den false-Zweig und der Typ never wird zugewiesen.
// Wenn die Condition aber true ist also der Typ der für Generic T eingesetzt wird eine Funktion ist, dann wird der Rückgabetyp inferiert, weil wir mit infer R festlegen, dass aus T dieses Muster extrahiert werden soll,
// also dass der Rückgabetyp aus T extrahiert werden soll und weil die Condition dann true ist, wird eben R als Rückgabetyp für den Typ genommen.

// Antwort: Prinzip richtig, aber hier unbedingt „Rückgabetyp“ statt „Rückgabewert“ sagen.
//
// `infer` arbeitet nur auf der Type-Ebene.
//
// Also:
// `(...args: any[]) => infer R`
// inferiert den Rückgabetyp der Funktion.
//
// Beispiel:
// `(id: number) => string`
// → R = string.
//
// Es wird kein tatsächlicher zurückgegebener Runtime-Wert untersucht.



// 6. Warum ergibt folgendes Beispiel number?
/*
function calculate(
    a: number,
    b: number
): number {
    return a + b;
}

type Result =
    GetReturn<typeof calculate>;
*/
// Antwort: Weil wir durch GetReturn<typeof calculate>, was ein Conditional Type mit infer ist, diesen Typ erhalten. typeof calculate ist "(a: number, b: number) => number", somit
// ausgeschrieben "GetReturn<(a: number, b: number) => number>"", dadurch ist in GetReturn das "T extends (...args: any[]) => infer R" allgemein erfüllt und da das Muster ja infer R als Rückgabetyp ist,
// wird im true-Zweig für R der Rückgabetyp von der calculate-Funktion eingesetzt was number ist.

// Antwort: Genau richtig.
// `typeof calculate` liefert auf der Type-Ebene den Funktionstyp:
//
// (a: number, b: number) => number
//
// Dieser passt zum Muster:
//
// (...args: any[]) => infer R
//
// und an der Return-Position steht `number`.
// Also:
// R = number
// Result = number.
//
// Nur das doppelte `"` hinter deinem ausgeschriebenen GetReturn kannst du entfernen.



// 7. Was ist der Unterschied zwischen diesen beiden infer-Positionen?
/*
(...args: infer P) => any

(...args: any[]) => infer R
*/
// Antwort: Die erste Position/Muster extrahiert TypeScript den Typ des Parameters der in T eingesetzen Funktionstypen als P.
// In der zweiten Position/Muster extrahiert TypeScript den Typ des Rückgabewerts der in T eingesetzen Funktionstypen als R.

// Antwort: Zweiter Teil richtig, erster Teil braucht eine wichtige Präzisierung.
//
// `(...args: infer P) => any`
// inferiert nicht nur „den Typ des Parameters“, sondern die gesamte Parameterliste als Tupel.
//
// Beispiel:
//
// (id: number, name: string) => boolean
//
// ergibt:
//
// P = [id: number, name: string]
//
// Dagegen:
//
// (...args: any[]) => infer R
//
// markiert die Return-Position und ergibt:
//
// R = boolean.
//
// Also:
//
// P → Parameter-Tupel
// R → Rückgabetyp



// 8. Warum ergibt MyParameters einer Funktion typischerweise ein Tupel?
// Antwort: Weil Funktionsparameter positionsbezogen sind also Position 0 ist ein Typ und Position 1 könnte ein anderer Typ sein, Position 2 wieder usw.

// Antwort: Genau richtig.
// Eine Funktion kann mehrere Parameter mit unterschiedlichen Typen besitzen:
//
// (name: string, age: number, active: boolean) => User
//
// Deshalb muss TypeScript Reihenfolge und Typ jedes Parameters erhalten:
//
// [name: string, age: number, active: boolean]
//
// Ein Tupel eignet sich genau dafür:
// feste Positionen und jeweils bekannte Typen.



// 9. Was passiert hier Schritt für Schritt?
/*
async function getUser(): Promise<User> {
    // ...
}

type PromiseValue<T> =
    T extends Promise<infer U>
        ? U
        : never;

type Result =
    PromiseValue<
        ReturnType<typeof getUser>
    >;


type ReturnType<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;
*/
// Antwort: typeof getUser ist "() => Promise<User>", somit ist "type Result = PromiseValue<ReturnType<() => Promise<User>>>".
// ReturnType ist ein Utility Type, der den Rückgabetyp einer Funktion liefert, er prüft erst ob das übergebene T eine Funktion ist, was der Fall ist da wir "() => Promise<User>" als Typ übergeben,
// im true-Zweig wird dann R als Typ festgelegt, R wird inferred durch infer R, heißt das Muster durch infer beschreibt dass der Rückgabetyp von der in T übergebenen Funktion als R festgelegt wird, und das ist für den übergebenen Funktionstyp
// typeof getUser (bzw. eben () => Promise<User>), Promise<User>
// Achtung: Es ist eben NICHT nur User, da das Muster sagt: inferriere R, was der Rückgabetyp der Funktion ist, und das ist Promise<User>, nicht nur User
// Damit nur User zurückgegeben wird für R, müsste es so aussehen: T extends (...args: any[]) => Promise<infer R>
// Falls der übergeben Typ in T garkein Funktionstyp ist, wie einfach string oder string[] oder anderer Datentyp, dann würde man in den false-Zweig gehen und als Typ never zurückgeben.
// ACHTUNG: vergessen noch PromiseValue<T> auszuwerten, da kommt dann dass aus Promise<User> was ja ReturnType<T> returned wurde, noch User wird also doch der einzelen Typ aber eben erst nach PromiseValue<T>

// Antwort: Deine Erklärung von `ReturnType` ist richtig, aber danach musst du noch `PromiseValue` auswerten.
//
// Schritt 1:
// typeof getUser
// → () => Promise<User>
//
// Schritt 2:
// ReturnType<typeof getUser>
// → Promise<User>
//
// Wichtig: Hier ist der direkte Rückgabetyp tatsächlich Promise<User>, nicht User.
//
// Schritt 3:
// PromiseValue<Promise<User>>
//
// Promise<User> wird gegen:
//
// Promise<infer U>
//
// gematcht.
//
// → U = User
//
// Schritt 4:
// Der True-Zweig von PromiseValue ist U.
//
// Also:
//
// type Result = User;
//
// Deine Idee:
//
// `T extends (...args: any[]) => Promise<infer R>`
//
// wäre ebenfalls möglich, wäre dann aber ein anderer eigener Utility Type,
// der direkt den aufgelösten Promise-Rückgabetyp einer Funktion extrahiert.



// 10. Was ist der Unterschied zwischen einem normalen Generic `T`
// und einem mit `infer U` eingeführten Typ?
// Antwort: Ein normaler Generic T ist meist der komplette Typ, der vor extends steht und somit basierend auf ihm die Condition geprüft wird
// infer U ist wiederum dann das Muster, das wir festlegen, wenn die Condition true ist und wir einen Teil sozusagen des Typ T als Typ U extrahieren wollen.

// Antwort: Grundidee richtig, mit zwei Präzisierungen:
//
// 1. Ein Generic T steht nicht grundsätzlich „vor extends“.
//    Generics können ganz allgemein an vielen Stellen verwendet werden.
//
// 2. `infer U` ist nicht selbst das ganze Muster.
//    `infer U` markiert eine bestimmte Position INNERHALB eines Musters.
//
// Beispiel:
//
// T extends Promise<infer U>
//
// Das Muster ist:
//
// Promise<...>
//
// Die markierte Position ist:
//
// infer U
//
// Normaler Generic T:
// → sein konkreter Typ kommt von außen bzw. wird beim Verwenden des generischen Typs festgelegt/inferiert.
//
// infer U:
// → U wird beim Matchen innerhalb des Conditional Types von TypeScript bestimmt.
//
// Beispiel:
//
// PromiseValue<Promise<User>>
//
// T = Promise<User>   // kommt von außen
// U = User            // wird aus T heraus inferiert



// 11. Kann `infer` zur Runtime prüfen,
// welchen Typ unbekannte API-Daten tatsächlich haben?
// Antwort: Nein genauso wie Conditional Types existiert infer auch nur zur Typzeit und nicht nur Runtime. Type Guards sind also bei externen Daten wie von APIs trotzdem noch nötig.

// Antwort: Genau richtig.
// Nur ein kleiner Schreibfehler: „nicht zur Runtime“ statt „nicht nur Runtime“.
//
// `infer` arbeitet ausschließlich auf der Type-Ebene.
// Es untersucht vorhandene TypeScript-Typinformationen.
//
// Für echte externe Runtime-Daten:
//
// unknown
// → Runtime-Prüfung
// → Type Guard / Assertion Function
//
// bleibt weiterhin notwendig.



// 12. Was ist der Zusammenhang zwischen:
// ReturnType<T>
// Parameters<T>
// Awaited<T>
// und dem Konzept `infer`?
// Antwort: Diese benutzen alle infer intern.

// Antwort: Richtig.
//
// `ReturnType<T>`
// → inferiert den Rückgabetyp einer Funktion.
//
// `Parameters<T>`
// → inferiert die Parameterliste als Tupel.
//
// `Awaited<T>`
// → ermittelt den Typ, der nach dem Awaiten übrig bleibt; seine Implementierung verwendet ebenfalls Conditional Types und `infer` und behandelt auch verschachtelte Promise-/Thenable-Strukturen.
//
// Du benutzt diese Utility Types also häufig einfach fertig,
// aber `infer` ist einer der Mechanismen, mit denen TypeScript solche Utilities implementieren kann.