// 1.

type IsString<T> = 
    T extends string
        ? true
        : false

// type IsStringString = true
// Die Condition "T extends string" prüft hier "string extends string", weil T für IsString<T> als string eingesetzt wurde (IsString<string>),
// diese ist true und gehen somit in "? true"-Zweig, somit finaler Typ type IsStringString = true;
type IsStringString = IsString<string>;

// type IsStringNumber = false
type IsStringNumber = IsString<number>;

// type IsStringStringNumber = boolean
// Hier wird der Typ boolean, weil für die Union string | number die Members string und number einzeln für die Condition
// "T extends string" geprüft werden und auch als Union wieder returned werden.
// Somit erste Prüfung: "string extends string" -> true -> somit in "? true"-Zweig -> Typ: string
// Zweite Prüfung: "number extends string" -> false -> somit in ": false"-Zweig -> Typ: false
// Finaler als Union zusammengesetzter Typ (weil T auch eine Union war): type IsStringStringNumber = true | false -> boolean
type IsStringStringNumber = IsString<string | number>;


// 2.

// Dieser Conditional Type behält aus einer Union nur String-Typen, weil wir für jedes T wenn es eine Union ist prüfen,
// ob der jeweilige Union-Member T ein string ist, wenn ja returnen wir im "? T"-Zweig für true das was für T gerade geprüft wird
// Achtung: Wir teilen hier gezielt T zu und nicht nur string, damit Literals wie unten im Beispiel erhalten bleiben, denn T
// wenn es eine Union ist kann entweder den allgemeinen Typ string (wie beim ersten Beispiel unten) oder auch Literal Strings (wie im zweiten unten)
// enthalten und wenn man statt T hier string zuteilt im true-Zweig, wird für diese nur string genommen und nicht "admin" oder "user"
// Der finale Typ mit "? string" wäre dann type OnlyStringsTypesAndLiterals = string, weil komplett ausgeschrieben wäre er
// type OnlyStringsTypesAndLiterals = string | never | string | never, never fällt weg und string wird nur einmal geschrieben, deswegen 
// nur type OnlyStringsTypesAndLiterals = string
type OnlyStrings<T> = 
    T extends string
        ? T
        : never

// type OnlyStringsJustTypes = string
type OnlyStringsJustTypes = OnlyStrings<string | number | boolean>;

// type OnlyStringsTypesAndLiterals = "admin" | "user"
type OnlyStringsTypesAndLiterals = OnlyStrings<"admin" | 5 | "user" | false>;


// 3.

// Dieser Conditional Type ist ein Distributive Conditional Type, weil er die Union, die für T eingesetzt wird (hier Status)
// einzeln jeden Member der Union also jeden Literal String prüft, ob dieser U, also der Typ der für den zweiten Generic angegeben wird,
// erfüllt. 
// Wenn ja, wird als Typ für diesen Member never zurückgegeben in den finalen Ergebnistyp, der auch als Union erstellt wird.
// Wenn der Union-Member nicht U erfüllt, wird der Member als Typ zurückgegeben, also behalten.
// Im finalen Ergebnisteil fallen dann alle Member für die never zugeteilt wurden weg und die die erfüllt haben deren Wert als Literal Type.
type MyExclude<T, U> = 
    T extends U
        ? never
        : T

type Status =
    "idle"
    | "loading"
    | "success"
    | "error";

// type StatusExcludeIdleAndLoading = "success" | "error"
// geben als T den Literal Union Type Status an, für U den Literal Union Type "idle" | "loading"
// Somit wird für "idle" und "loading" einzeln geprüft ob diese die Condition "T extends U" erfüllen also z.B. ""idle" extends "idle" | "loading"", das wäre true, heißt
// im Ergebnistyp bekommt dieser Member den Typ never und fällt somit final weg. Für den Member "success" wäre die Condition ""success" extends "idle" | "loading""
// false, somit wird für diesen Member dieses Literal (wegen dem "? T"-Zweig) auch in den finalen Ergebnistyp eingefügt.
// Der finale Typ wäre somit type StatusExcludeIdleAndLoading = never | never | "success" | "error", da die never wegfallen dann final type StatusExcludeIdleAndLoading = "success" | "error"
type StatusExcludeIdleAndLoading = MyExclude<Status, "idle" | "loading">;


// 4.

// Dieser Conditional Type ist ein Distributive Conditional Type, weil er die Union, die für T eingesetzt wird (hier Status)
// einzeln jeden Member der Union also jeden Literal String prüft, ob dieser U, also der Typ der für den zweiten Generic angegeben wird,
// erfüllt. 
// Wenn ja, wird als Typ für diesen Member wird der Member als Typ zurückgegeben, also behalten und in den finalen Ergebnistyp als genau diesen Typen eingefügt, der auch als Union erstellt wird.
// Wenn der Union-Member nicht U erfüllt, wird der Typ für diesen Member als never zurückgegeben.
// Im finalen Ergebnisteil fallen dann alle Member für die never zugeteilt wurden weg und die die erfüllt haben deren Wert als Literal Type.
type MyExtract<T, U> =
    T extends U
        ? T
        : never

// type StatusExtractSuccessAndError = "success" | "error"
// geben als T den Literal Union Type Status an, für U den Literal Union Type "success" | "error"
// Somit wird für "success" und "error" einzeln geprüft ob diese die Condition "T extends U" erfüllen.
// Für den ersten Member, "success" ist die Condition "T extends U" also ""success" extends "success" | "error"" true, somit wird für diesen T, also genau dieser Member als Literal Type eingefügt
// in den finalen Ergebnistyp.
// Für den zweiten Member "error" ist die Condtion auch true und wird als weiterer Member in die Union des Ergebnistyps eingefügt.
// Für die ersten und zweiten Member, ist die Condition false, somit wird never für die Typen zurückgegeben und fallen weg.
// Der finale Typ wäre somit type StatusExtractSuccessAndError = never | never | "success" | "error", da die never wegfallen dann final type StatusExtractSuccessAndError = "success" | "error"
type StatusExtractSuccessAndError = MyExtract<Status, "success" | "error">



// 5.

type MyNonNullable<T> = 
    T extends null | undefined
        ? never
        : T

// type NonNullableExample = string | number
// Hier wird der jeweilige Member T immer mit null | undefined geprüft, also wenn es einer der beiden ist, dann true (für diese Member wird dann Typ never in Ergebnistyp-Union eigefügt), 
// wenn keiner der beiden, dann false (und Member wird in Ergebnistyp-Union eingefügt)
type NonNullableExample = MyNonNullable<string | number | null | undefined>;


// 6.

// nimmt hier als Typ für Condition unknown, da fast alle Typen diese Prüfung in true gehen, da man die Daten eher transformieren will, als prüfen
// Wenn true, wird daher dann ein Array-Typ (kein Array-Bbjekt, sondern -Typ!) aus dem Typ der gerade aus dem Union T dran ist erstellt
// Achtung: ist nicht dasselbe wie wenn der Ergebnistyp gleich (string | number)[] wäre (dafür müsste T gleich [T] sein und für T eingesetzt auch [string | number] sein),
// da dann nicht zwei Arrays mit entweder Elementen nur vom Typ string oder nur vom Typ number herausgekommen wäre, sondern ein Array mit Elementen vom Typ ODER string
type ToArray<T> = 
    T extends unknown
        ? T[]
        : never

// type ToArrayStringNumber = string[] | number[]
type ToArrayStringNumber = ToArray<string | number>;


// 7.

type Distributive<T> =
    T extends string
        ? 





















































// 1. Was bedeutet „distributiv“ bei einem Conditional Type?
// Antwort: Distributiv bedeutet bei einem Conditional Type, dass wenn der Typ, der für den Conditional Type geprüft wird (T vor extends) ein Union Type ist also verschiedene Types haben kann,
// dass dann die einzelnen Union-Mitglieder also Typen einzeln durch den Conditional Type gehen.
// Also für jeden Typ der Union wird die Condition geprüft und auch das Ergebnis kann dann nicht nur ein Typ sein, wie bei einem "normalen" Conditional Type, sondern auch eine Union aus mehreren Typen.

// Antwort: Genau richtig.
// Wenn T als nackter Type Parameter links von `extends` steht:
//
// T extends U ? X : Y
//
// und für T eine Union eingesetzt wird:
//
// A | B | C
//
// wird der Conditional Type gedanklich einzeln auf:
//
// A
// B
// C
//
// angewendet.
//
// Die einzelnen Ergebnisse werden anschließend wieder zu einer Union zusammengesetzt.
//
// Kleine Präzisierung:
// Das Endergebnis MUSS nicht zwingend mehrere Union-Mitglieder enthalten.
// Mehrere Ergebnisse können identisch sein, `never` kann wegfallen oder die Union kann sich anderweitig vereinfachen.
//
// Zum Beispiel:
//
// true | false
//
// wird als:
//
// boolean
//
// dargestellt.



// 2. Welcher Typ entsteht hier und warum?
/*
type IsString<T> =
    T extends string
        ? true
        : false;

type Result =
    IsString<string | number>;
*/
// Antwort: Hier ist type Result = boolean, weil die Condition für beide Typen der Union, die für T eingesetzt wird, also string und number geprüft wird.
// Die Prüfung ist für string true und liefert somit true als Typ, für number ist die Condition false und gehen in den false-Zweig und somit wird der Typ false.
// Das Ergebnis eines Distributive Conditional Type kann wiederum wieder eine Union sein (außer ein Condition-Zweig returned never und es fällt weg), somit wäre das Ergebnis hier true | false was aber von TypeScript als boolean
// zurückgegeben wird, was auch Sinn macht denn genau das beschreibt einen Boolean, kann entweder true oder false sein.
// Wenn der Distributive Conditional Type so aussehen würde:
/*
type IsString<T> =
    T extends string
        ? string
        : never;
*/
// Dann wäre type Result = string, weil die Prüfung für den ersten Typ der Union string ist true, somit wird Typ string returned (wegen ? string), für number ist "T extends string" (also "number extends string") false und never wird returned.
// Der resultierende Typ wäre somit string | never, das never fällt aber weg und der finale resultierende Typ ist string.

// Antwort: Genau richtig.
//
// Beim ersten Beispiel:
//
// string
// → true
//
// number
// → false
//
// ergibt:
//
// true | false
//
// und TypeScript vereinfacht das zu:
//
// boolean.
//
// Beim zweiten Beispiel:
//
// string
// → string
//
// number
// → never
//
// ergibt:
//
// string | never
//
// und `never` trägt kein mögliches Union-Mitglied bei.
//
// Deshalb:
//
// type Result = string;



// 3. Was passiert gedanklich mit dieser Union?
/*
type OnlyStrings<T> =
    T extends string
        ? T
        : never;

type Result =
    OnlyStrings<
        string | number | boolean
    >;
*/
// Antwort: Wir prüfen für jeden Typen der Union string | number | boolean einzeln die Condition T extends string und entscheiden einzeln was returned wird, das Ergebnis dieser einzelnen Prüfungen werden wieder als Union zurückgegeben.
// Erste Prüfung: "T extends string" -> "string extends string" -> true -> string wird returned, weil "? T"-Zweig greift und somit "? string"
// Zweite Prüfung: "T extends string" -> "number extends string" -> false -> never wird returned, weil ": never"-Zweig greift und somit ": never"
// Dritte Prüfung: "T extends string" -> "boolean extends string" -> false -> never wird returned, weil ": never"-Zweig greift und somit ": never"
// Insgesamt ist der resultierende Typ zusammengesetzt als Union: string | never | never, die never fallen weg, also resultierende String ist nur string

// Antwort: Genau richtig.
//
// Gedanklich:
//
// OnlyStrings<string>
// → string
//
// OnlyStrings<number>
// → never
//
// OnlyStrings<boolean>
// → never
//
// Zusammengesetzt:
//
// string | never | never
//
// vereinfacht zu:
//
// string.
//
// Genau dadurch kann man mit distributiven Conditional Types Union Types filtern.



// 4. Warum eignet sich `never` besonders gut,
// um Union-Mitglieder herauszufiltern?
// Antwort: Weil wenn einer der für die Unions des geprüften Typens T in never resultiert, fällt dieser Typ im Ergebnistyp was auch ein Union sein kann bei Distributive Conditional Types, weg. Somit werden nur bestehende Typen
// in den Ergebnistyp aufgenommen.

// Antwort: Genau richtig.
//
// `never` repräsentiert keinen möglichen Wert und trägt deshalb zu einer Union kein tatsächliches Mitglied bei.
//
// Zum Beispiel:
//
// string | never | number
//
// vereinfacht sich zu:
//
// string | number.
//
// Deshalb kann ein Conditional Type unerwünschte Union-Mitglieder einfach in `never` transformieren.
//
// Die übrigen Union-Mitglieder bleiben erhalten.



// 5. Wie funktioniert dieser Type?
/*
type MyExclude<T, U> =
    T extends U
        ? never
        : T;
*/
// Antwort: Man gibt für T einen Typen an, oft ein Union mit Literal Types wie type Status = "idle" | "loading" | "success" | "error", und für U ebenfalls Literal Type oder Unions aus diesen.
// Erst wird wie bei Conditional Types üblich geprüft wegen extends, ob Typ T den Typ U erfüllt, und da T oft eine Union ist, für die einzelnen Bestandteile nacheinander eben wie Distributive Conditional Types es machen.
// Wenn die Condition true ist, also Typ T den Typ U enthält, dann wird für dieses Mitglied der Union der Typ never returned und fällt somit im Ergebnistyp weg. Wenn T U nicht enthält, geht es in den false-Zweig und 
// es wird T returned, also das Union-Mitglied, das gerade geprüft wird. Somit werden Typen bzw. Literals, die als U angegeben sind, entfernt da sie never vom Typ her werden, und die die nicht angegeben sind, bleiben im Ergebnistyp erhalten.
// Wichtig: U ist eine Union und wird auch mit der kompletten Union geprüft, z.B. "idle" | "loading", nicht wie T, das als Union deren einzelne Mitglieder geprüft werden.

// Antwort: Sehr gut, insbesondere dein letzter Satz zu U ist wichtig.
//
// Eine Formulierung solltest du aber ändern:
//
// Nicht:
// „T enthält U“
//
// sondern:
// „das aktuell geprüfte Union-Mitglied von T ist mit U kompatibel / U zuweisbar“.
//
// Beispiel:
//
// type Status =
//     "idle"
//     | "loading"
//     | "success"
//     | "error";
//
// type Result =
//     MyExclude<Status, "idle" | "loading">;
//
// Distribution geschieht über T:
//
// "idle" extends "idle" | "loading"
// → true
// → never
//
// "loading" extends "idle" | "loading"
// → true
// → never
//
// "success" extends "idle" | "loading"
// → false
// → "success"
//
// "error" extends "idle" | "loading"
// → false
// → "error"
//
// Ergebnis:
//
// "success" | "error"
//
// Und genau richtig:
// U wird hier nicht ebenfalls automatisch auf dieselbe Weise zerlegt.
// Das aktuelle T-Mitglied wird gegen den gesamten Typ U geprüft.



// 6. Was ist der Unterschied zwischen MyExclude und MyExtract?
/*
type MyExclude<T, U> =
    T extends U ? never : T;

type MyExtract<T, U> =
    T extends U ? T : never;
*/
// Antwort: MyExtract returned die Typen aus dem Typen T (kann einzelnder oder Union sein) als Union als finalen Ergebnistyp, die zum angegebenen Typ U (kann einzelner oder Union sein) passen, während
// MyExlude nur die Typen returned, die aus dem Typen T nicht zum angegebenen Typen U passen

// Antwort: Genau richtig.
//
// MyExclude<T, U>
// → passende Mitglieder werden zu `never`
// → nicht passende Mitglieder bleiben erhalten.
//
// MyExtract<T, U>
// → passende Mitglieder bleiben erhalten
// → nicht passende Mitglieder werden zu `never`.
//
// Kurz:
//
// Exclude
// → Treffer entfernen.
//
// Extract
// → Treffer behalten.



// 7. Warum ergibt das folgende Beispiel string?
/*
type MyNonNullable<T> =
    T extends null | undefined
        ? never
        : T;

type Result =
    MyNonNullable<
        string | null | undefined
    >;
*/
// Antwort: Es ergibt string, weil T ja das Union string | null | undefined ist, und somit einzeln die Mitglieder geprüft werden. Dann wird für jedes mit null | undefined abgeglichen und mit dieser Condition entschieden ob es in den
// true- oder false-Zweig geht. Für string geht es in den false also wird T returned, somit string. Für null und undefined einzeln werden jeweils never returned. Der resultierende Typ ist somit zusammengesetzt wieder als Union
// string | never | never, never fällt weg somit nur type Result = string

// Antwort: Genau richtig.
//
// Distribution:
//
// string extends null | undefined
// → false
// → string
//
// null extends null | undefined
// → true
// → never
//
// undefined extends null | undefined
// → true
// → never
//
// Zusammengesetzt:
//
// string | never | never
//
// ergibt:
//
// string.
//
// Genau dieses Beispiel erklärt jetzt vollständig deine frühere Frage,
// warum nicht die gesamte Union:
//
// string | null | undefined
//
// auf einmal gegen:
//
// null | undefined
//
// geprüft wird.



// 8. Was ist der Unterschied zwischen:
 /*
T extends string ? X : Y

und

[T] extends [string] ? X : Y
*/
// Antwort: Der Unterschied ist, dass mit dem "nackten" T in der ersten Version, wenn es sich dabei um eine Union handelt, die einzelnen Member der Union einzeln geprüft werden. Wenn T also "string | number | boolean" ist,
// dann wird nicht "(string | number | boolean) extends string" geprüft, sondern "string extends string", "number extends string" und "boolean extends string" einzeln geprüft.
// Bei der zweiten Version mit dem entschlossenen Ausdruck wird der komplette Ausdruckt in der Condition geprüft wird. Also wenn T eine Union ist, dann wird sie als Union geprüft. Wenn T "string | number | boolean" ist,
// dann wird "(string | number | boolean) extends string" geprüft und nicht die Member einzeln wie beim "nackten" T

// Antwort: Genau richtig.
//
// Nur sprachlich:
// Statt „entschlossener Ausdruck“ meinst du vermutlich den „eingeklammerten/eingepackten Typ“.
//
// Distributiv:
//
// T extends string ? X : Y
//
// Bei:
//
// T = string | number | boolean
//
// wird einzeln geprüft:
//
// string extends string
// number extends string
// boolean extends string
//
// Nicht-distributiv:
//
// [T] extends [string] ? X : Y
//
// wird als Ganzes geprüft:
//
// [string | number | boolean]
// extends
// [string]
//
// Dadurch wird die Union nicht auf ihre einzelnen Mitglieder verteilt.



// 9. Welcher Typ entsteht jeweils?
/*
type Dist<T> =
    T extends string
        ? true
        : false;

type NonDist<T> =
    [T] extends [string]
        ? true
        : false;

type A =
    Dist<string | number>;

type B =
    NonDist<string | number>;
*/
// Antwort: type A = boolean (Erklärung siehe Frage 2), type B = false, weil die Condition "[string | number] extends [string]" ist, somit passt der Vergleich nicht und ist false
// und wäre true wenn T als gesamtes zu [string] passt, also die Members der Union in [T] alle Strings wären wie type C = NonDist<"admin" | "user">, bei type C = NonDist<"admin" | 5> wäre es false, bei type C = NonDist<"admin" | "user | "5">
// oder type C = NonDist<"admin"> wieder true weil alles strings.

// Antwort: A und B sind richtig:
//
// type A = boolean;
// type B = false;
//
// Eine wichtige Präzisierung zum letzten Satz:
//
// B wäre NICHT nur dann true, wenn beide Seiten exakt:
//
// [string | number]
//
// wären.
//
// `extends` prüft weiterhin Kompatibilität, keine exakte Gleichheit.
//
// Zum Beispiel:
//
// type C = NonDist<"admin" | "user">;
//
// prüft:
//
// ["admin" | "user"] extends [string]
//
// und das ist true,
// weil die gesamte Union:
//
// "admin" | "user"
//
// mit string kompatibel ist.
//
// Dagegen:
//
// [string | number] extends [string]
//
// ist false,
// weil `number` nicht mit string kompatibel ist.



// 10. Warum sind diese beiden Typen nicht gleich?
/*
string[] | number[]

(string | number)[]
*/
// Antwort: Weil der erste Typ entweder ein string Array oder ein number Array ist und der zweite Typ ein Array aus entweder string oder number Elementen vom Typ her.
// Das erste beschreibt zwei Arrays, der zweite nur eins.

// Antwort: Die Grundidee ist richtig.
//
// Etwas präziser:
//
// string[] | number[]
//
// ist eine Union aus zwei möglichen Array-TYPEN:
//
// entweder:
// string[]
//
// oder:
// number[]
//
// Das Array muss also insgesamt zu einem dieser beiden Typen passen.
//
// Dagegen:
//
// (string | number)[]
//
// ist EIN Array-Typ,
// dessen einzelne Elemente jeweils string ODER number sein dürfen.
//
// Deshalb:
//
// const a: string[] | number[] = ["A", "B"];
// const b: string[] | number[] = [1, 2];
//
// aber ein gemischtes Array passt nicht einfach zu einem reinen string[] oder number[].
//
// Bei:
//
// const c: (string | number)[] = ["A", 1, "B", 2];
//
// ist die Mischung ausdrücklich erlaubt.
//
// Deshalb besser nicht sagen:
// „Das erste beschreibt zwei Arrays“.
//
// Sondern:
// „Das erste ist eine Union aus zwei möglichen Array-Typen.“



// 11. Was passiert hier?
/*
type Element<T> =
    T extends (infer U)[]
        ? U
        : never;

type Result =
    Element<
        string[] | number[]
    >;
*/
// Antwort: Hier wird noch infer genutzt in Kombination mit Distributive Conditional Type, somit wird für jedes Member der Union geprüft und der Typ des Arrays extrahiert aufgrund es Muster und der Position (infer U).
// Somit ist U der einzelne Typ string oder number. In diesem Fall gehen wir für beide Member also string[] und number[] in den true-Zweig weil geprüft wird ob jeweils ein Array ist was auf beide zutrifft. Somit wäre der 
// resultierende Typ string | number. In den never Zweig gehen wir hier nicht und das Ergebnis wird wie eben bei Distributie Conditional Types als Union wieder zurückgegeben.

// Antwort: Genau richtig.
//
// Schrittweise:
//
// T = string[] | number[]
//
// Weil T distributiv verarbeitet wird:
//
// Element<string[]>
// |
// Element<number[]>
//
// Erster Fall:
//
// string[] extends (infer U)[]
// → true
// → U = string
// → string
//
// Zweiter Fall:
//
// number[] extends (infer U)[]
// → true
// → U = number
// → number
//
// Zusammengesetzt:
//
// string | number.
//
// Hier sieht man sehr schön:
//
// Distribution
// → verarbeitet jedes Union-Mitglied einzeln.
//
// infer
// → extrahiert innerhalb jedes dieser Mitglieder den Elementtyp.



// 12. Welche zwei Mechanismen arbeiten
// in Frage 11 zusammen?
// Antwort: Distributive Conditional Type und infer

// Antwort: Genau richtig.
//
// 1. Distributive Conditional Types
// → string[] und number[] werden einzeln verarbeitet.
//
// 2. infer
// → aus jedem Array-Typ wird der Elementtyp an der markierten Position extrahiert.
//
// Ergebnis:
//
// string | number.



// 13. Wann möchtest du Distribution bewusst verhindern?
// Antwort: Wenn bewusst eine union als ganzer Typ auf Erfüllung geprüft werden soll.

// Antwort: Genau richtig.
//
// Wenn die Frage nicht lautet:
//
// „Wie soll jedes Union-Mitglied einzeln behandelt werden?“
//
// sondern:
//
// „Erfüllt die gesamte Union gemeinsam diese Bedingung?“
//
// möchtest du Distribution verhindern.
//
// Beispiel:
//
// type AllStrings<T> =
//     [T] extends [string]
//         ? true
//         : false;
//
// AllStrings<"admin" | "user">
// → true
//
// weil die gesamte Union mit string kompatibel ist.
//
// AllStrings<"admin" | number>
// → false
//
// weil die gesamte Union nicht vollständig mit string kompatibel ist.
//
// Dafür wird T z.B. in ein Tuple gepackt:
//
// [T] extends [U]
//
// sodass T nicht mehr nackt links von `extends` steht.