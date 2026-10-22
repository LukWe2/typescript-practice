// 1.

type IsString<T> =
    T extends string
        ? true
        : false;

// Achtung falsch: hier geht es nicht um Objekte, sondern um Typen!!!
//const string01: IsString<string> = "Hi";

// es wird "nur" ein Typ erstellt und dieser ist nicht string, sondern eben true und ist ein Literal Type, heißt nur dieser Typ kann einem Wert welcher A als Typ hat zugewiesen werden
type A = IsString<string>;

// wieder falsch, Typ A ist true und nicht string!
//const string01: A = "Hi";

const trueValue: A = true;

// Fehler: Type 'false' is not assignable to type 'true'.
//const falseValue: A = false;


// 2.

// ist ein verschachtelter Condition Type, wenn die Bedingung falsch ist, wird nicht direkt ein Typ gesetzt, sondern wiederum eine weitere Bedingung geprüft
type TypeName<T> = 
    T extends string
        ? "string"
        : T extends number
            ? "number"
            : T extends boolean
                ? "boolean"
                : "other"


// 3.

type User = {
    id: number;
    name: string;
}

type Product = {
    title: string;
    price: number;
}

type HasId<T> = 
    T extends { id: number }
        ? true
        : false;

// type HasIdUserTrueType = true -> passt zu Conditional Type
type HasIdUserTrueType = HasId<User>;

// type HasIdProductFalseType = false -> passt zu Conditional Type
type HasIdProductFalseType = HasId<Product>;

const hasIdUserTrueValue: HasIdUserTrueType = true;

// Fehler: Type 'false' is not assignable to type 'true'.
// geht nicht, weil HasIdUserTrueType vom Literal Type true ist, somit können Werte die diesen Typen besitzen nur vom Typ true sein also nur true sein auch der Value.
//const hasIdUserFalseValue: HasIdUserTrueType = false;

const hasIdProcutFalseValue: HasIdProductFalseType = false;

// Fehler: Type 'true' is not assignable to type 'false'.
// geht nicht, weil HasIdProductFalseType vom Literal Type false ist, somit können Werte die diesen Typen besitzen nur vom Typ false sein also nur false sein auch der Value.
//const hasIdProcutTrueValue: HasIdProductFalseType = true;



// 4.

type OnlyStrings<T> = 
    T extends string
        ? T
        : never;

// type OnlyStringTrueType = string -> passt
type OnlyStringTrueType = OnlyStrings<string>;

// type OnlyStringFalseConditionType = never -> passt auch zu unserem Conditional Type
type OnlyStringFalseConditionType = OnlyStrings<number>;


// 5.

// soll prüfen ob Typ T ein Array ist bzw. vom Typ Array ist, prüft man mit extends any[]
type IsArray<T> = 
    T extends any[]
        ? true
        : false;

// type IsArrayStringArray = true
type IsArrayStringArray = IsArray<string[]>;

// type IsArrayNumberArray = true
type IsArrayNumberArray = IsArray<number[]>;

// type isArrayString = false
type isArrayString = IsArray<string>;


// 6.

type ArrayOrSingle<T> =
    T extends any[]
        ? T
        : T[];

// type ArrayOrSingleArray = string[] -> passt zu Conditional Type
type ArrayFromSingle = ArrayOrSingle<string>;

// type ArrayOrSingleNotArray = string[] -> passt zu Conditional Type
type AlreadyArray = ArrayOrSingle<string[]>;



// 7.

// soll prüfen ob Typ T ein Promise ist bzw. vom Typ Promise ist, prüft man mit extends Promise<any>
type IsPromise<T> = 
    T extends Promise<any>
        ? true
        : false;

// type IsPromiseuserPromise = true
type IsPromiseuserPromise = IsPromise<Promise<User>>;

// type IsPromiseStringPromise = true
type IsPromiseStringPromise = IsPromise<Promise<string>>;

// type IsPromiseUserNoPromise = false
type IsPromiseUserNoPromise = IsPromise<User>;

// type IsPromiseNumberNoPromise = false
type IsPromiseNumberNoPromise = IsPromise<number>;



// 8.

type AsyncKind<T> = 
    T extends Promise<any>
        ? "async"
        : "sync";

// type AsyncKindUserPromise = "async"
type AsyncKindUserPromise = AsyncKind<Promise<User>>

// type AsyncKindUserNoPromise = "sync"
type AsyncKindUserNoPromise = AsyncKind<User>;



// 9.

type HasName<T> = 
    T extends { name: string }
        ? true
        : false;


type UserWithName = {

    id: number,
    name: string,
    email: string,
    currentlyLoggedIn: boolean
};

// type HasNameFullfill = true -> zeigt, dass Typ UserWithName den Typ HasName erfüllt und die true Condition ausgeführt wird und HasNameFullfill vom Literal Type true ist, obwohl UserWithName noch
// meh Properties als name hat. Zeigt dass weitere Properties nicht stören und `extends` hier keine exakte Typgleichheitprüft prüft, sondern Typ-Kompatibilität bzw. Zuweisbarkeit 
type HasNameFullfill = HasName<UserWithName>;



// 10.

type WrappedValue<T> =
    T extends string
        ? { 
            kind: "text",
            value: string
        }
        : T extends number
            ? {
                kind: "number",
                value: number
            }
            : {
                kind: "unknown",
                value: T
            };

/*
type WrappedValueString = {
 kind: "text";
 value: string;
}
*/
type WrappedValueString = WrappedValue<string>;

/*
type WrappedValueHelloString = {
 kind: "text";
 value: string; -> weil wenn es ein String ist, wird als Typ für value string gesetzt, nicht der Literal Type, value Property müsste in WrappedValue<T> dafür so sein: value: T;, dann würde für
 // den Fall dass T ein Literal String ist, dieser auch als T eingesetzt werden und somit als Literal Type
}
*/
type WrappedValueHelloString = WrappedValue<"Hello">;

/*
type WrappedValueNumber = {
 kind: "number";
 value: number;
}
*/
type WrappedValueNumber = WrappedValue<number>;

/*
type WrappedValueBoolean = {
 kind: "unknown";
 value: false;
} | {
 kind: "unknown";
 value: true;
}
*/
// hier Spezialfall, boolean kann true oder false sein, somit auch T kann true oder false sein, somit gibt es eine Union von zwei Typen herauskommen, einmal für value: true und einmal für value: false
// Bei boolean entsteht also hier durch distributives Verhalten eine Union, weil boolean effektiv true | false umfasst.
//
// Promise<number> ist dagegen kein Union Type.
// Deshalb wird der Conditional Type hier nicht auf mehrere Union-Member verteilt und T bleibt im letzten Zweig einfach Promise<number>.
type WrappedValueBoolean = WrappedValue<boolean>;

/*
type WrappedValuePromiseNumber = {
 kind: "unknown";
 value: Promise<number>;
}
*/
type WrappedValuePromiseNumber = WrappedValue<Promise<number>>;



// 11.

// siehe Verständnisfragen
































































// 1. Wie ist die allgemeine Syntax eines Conditional Types
// und wie liest man sie sprachlich?
/*
T extends U ? X : Y
*/
// Antwort: Die allgemeine Syntax ist wie bei einem ternären Operator also Bedingungsoperator, sprich Bedingung ? wenn true : wenn false;.
// Man kann die Syntax oben lesen als T kompatibel mit U? Wenn ja/true dann ist der neue Typ gleich X, wenn nein/false dann Typ gleich Y.
// extends bedeutet hier, dass für ein true also dass X dem Typen zugewiesen wird, mindestens U beinhalten muss. Dabei gilt, dass wenn es sich bei U um einen Typ mit Properties handelt also eine Objektstruktur (wie { id: number }),
// dass auch weitere Properties
// enthalten sein dürfen, es muss nur mindestens U erfüllen.

// Antwort: Im Kern richtig. Die allgemeine Syntax ist `T extends U ? X : Y` und bedeutet:
// Ist T mit U kompatibel bzw. ist T U zuweisbar? Wenn ja, ergibt der Conditional Type X, ansonsten Y.
// Die Formulierung „T muss mindestens U beinhalten“ passt besonders gut bei strukturellen Objekttypen wie `{ id: number }`.
// Allgemeiner sollte man von Typ-Kompatibilität/Zuweisbarkeit sprechen, da Conditional Types auch mit primitiven Typen, Arrays, Funktionen, Promises usw. funktionieren.


// 2. Was bedeutet `extends` innerhalb eines Conditional Types?
// Prüft es, ob zwei Typen exakt identisch sind?
// Antwort: extends bedeutet hier, dass T mit U kompatibel sein muss, also T muss den Typen U erfüllen. Dabei stören nicht weitere Properties falls es sich um ein Typ mit Properties handelt also eine Objektstruktur (wie U = { id: number })
// also der Typ T darf weitere Properties erhalten und die Condition des Conditional Type wäre trotzdem true.

// Antwort: Genau richtig. `extends` prüft hier keine exakte Typgleichheit, sondern Typ-Kompatibilität bzw. Zuweisbarkeit.
// Bei strukturellen Objekttypen darf T deshalb zusätzliche Properties besitzen, solange alle von U verlangten Properties mit den richtigen Typen vorhanden sind.


// 3. Welcher Typ entsteht jeweils?
/*
type IsString<T> =
    T extends string
        ? true
        : false;

type A = IsString<string>;
type B = IsString<number>;
*/
// Antwort: Es entsteht der Typ (ACHTUNG FALSCH: string) true für type A, da string für den Generic T eingesetzt wird und somit der Typ "type IsString<string> = string extends string" ist, wobei string den Typen string erfüllt,
// weshalb die Condition true ist und dem Typ A der Literal Type true zugewiesen wird.
// bei type B ist der entstandene Typ widerum (ACHTUNG FALSCH: number) false, weil der Typ wäre "type IsString<number> = number extends string", was false ist, number erfüllt nicht den Typ string und die Condition wird false.

// Antwort: Hier ist eine wichtige Korrektur: A wird NICHT `string` und B wird NICHT `number`.
// Nach dem `?` steht der Typ `true` und nach dem `:` der Typ `false`. Deshalb:
/*
type A = true;
type B = false;
*/
// Für A wird geprüft: `string extends string` → true → nimm den Typ `true`.
// Für B wird geprüft: `number extends string` → false → nimm den Typ `false`.
// Der eingesetzte Typ T wird nur für die Bedingung verwendet. Welcher Typ am Ende entsteht, bestimmen die beiden Zweige nach `?` und `:`.


// 4. Warum ergibt folgendes Beispiel true?
/*
type HasId<T> =
    T extends { id: number }
        ? true
        : false;

type User = {
    id: number;
    name: string;
};

type Result = HasId<User>;
*/
// Antwort: weil für T in HasId User eingesetzt wird und der Typ somit "type HasId<User> = User extends { id: number }" ist, was true ergibt, da User den Typ { id: number } erfüllt, da er diese Property besitzt.
// Deswegen ist der Conditional Type true und das nach dem ? wird zugewiesen, in diesem Fall true.

// Antwort: Genau richtig. `User` besitzt mindestens die von `{ id: number }` verlangte Struktur. Die zusätzliche Property `name` stört nicht.
// Deshalb ist die Bedingung wahr und `Result` wird zum Literal Type `true`.


// 5. Was ist der Sinn von `never` in folgendem Conditional Type?
/*
type OnlyStrings<T> =
    T extends string
        ? T
        : never;
*/
// Antwort: Der Sinn ist, dass wenn die Condition false ist, also dass Typ T nicht den Typ string erfüllt, dass es dann keinen gültigen Typen gibt. Was wird dann aber zurückgegeben oder was passiert? Fehler geworfen=

// Antwort: Der erste Teil ist richtig. Wenn T kein string ist, ergibt der Conditional Type einfach den Typ `never`.
// Es wird dadurch KEIN Runtime-Fehler geworfen und auch keine Exception erzeugt, denn wir befinden uns nur auf der Type-Ebene.
// Beispiel:
/*
type A = OnlyStrings<string>; // string
type B = OnlyStrings<number>; // never
*/
// `never` bedeutet hier: Für diesen Zweig gibt es keinen möglichen gültigen Wert.
// Später wird das besonders nützlich, um Mitglieder aus Union Types herauszufiltern.


// 6. Was passiert bei verschachtelten Conditional Types?
/*
type TypeName<T> =
    T extends string
        ? "string"
        : T extends number
            ? "number"
            : "other";
*/
// Antwort: Bei verschachtelten Typen wird, wenn die true Condition (wie hier ? "string") nicht zutrifft, dass dann die Condition danach widerum geprüft wird (hier : T extends number) usw., d.h. das was bei einer nicht verschachtelten
// Conditional Type der false Pfad wäre, ist eine weitere Condition.

// Antwort: Genau richtig. Der False-Zweig enthält hier einfach einen weiteren Conditional Type.
// Das entspricht gedanklich einem `if / else if / else` auf der Type-Ebene:
// string → "string"
// number → "number"
// alles andere → "other".


// 7. Was ist der Unterschied zwischen einem Conditional Type
// und einem normalen JavaScript-if/else?
// Antwort: Der Unterschied ist, dass ein Conditional Type nur zur Compile Time also zur Typzeit existiert, er wird vor der Runtime also das Programm gestartet wird gelöscht. Er berechnet außerdem Typen also welcher Typ
// abhängig von anderen Typen genutzt/zugewiesen wird.
// Ein if-else Statement verarbeitet Werte zur Runtime.

// Antwort: Genau richtig. Conditional Types entscheiden auf der Type-Ebene zwischen Typen und verschwinden beim Kompilieren.
// Ein JavaScript-if/else prüft dagegen tatsächliche Runtime-Werte und führt abhängig davon echten Programmcode aus.


// 8. Kann ein Conditional Type überprüfen,
// ob Daten von einer API zur Runtime wirklich einem User entsprechen?
// Warum bzw. warum nicht?
// Antwort: Nein kann sie nicht, da der Conditional Type nur zur Typzeit existiert und nicht mehr zur Runtime, aber Daten von einer API kommen erst zur Runtime an und können deswegen nicht damit geprüft werden.

// Antwort: Genau richtig. Für unbekannte API-Daten brauchst du weiterhin echte Runtime-Prüfungen, z.B. einen Type Guard oder eine Assertion Function.
// Ein Conditional Type kann nur bereits vorhandene TypeScript-Typinformationen verarbeiten.


// 9. Welcher Typ entsteht hier?
/*
type ArrayOrSingle<T> =
    T extends any[]
        ? T
        : T[];

type A = ArrayOrSingle<string>;
type B = ArrayOrSingle<number[]>;
*/
// Antwort: Hier entsteht für type A der Typ string[], da für T string eingesetzt wird, somit ist der Typ "type ArrayOrSingle<string> = string extends any[]", und da string kein Array ist und any[] nicht erfüllt,
// wird die falsche Condition übernommen, was T[] ist, also string[], somit wird das für T eingesetzte string zu string[].
// Bei type B ist der Typ "type ArrayOrSingle<number[]> = number[] extends any[]" was true ist, weshalb die true Condition greift, was einfach T ist also das was eingesetzt wurde sozusagen, was number[] ist.

// Antwort: Genau richtig.
// A = string[], weil `string` kein Array ist und deshalb der False-Zweig `T[]` verwendet wird.
// B = number[], weil `number[]` bereits ein Array ist und deshalb der True-Zweig `T` unverändert zurückgegeben wird.


// 10. Was prüft dieser Type?
/*
type IsPromise<T> =
    T extends Promise<any>
        ? true
        : false;
*/
// Antwort: Dieser Typ prüft, ob der Typ T ein Promise ist, da Promises Promise<any> erfüllen.

// Antwort: Genau richtig. Der Conditional Type prüft auf der Type-Ebene, ob T mit `Promise<any>` kompatibel ist.
// `IsPromise<Promise<User>>` ergibt also `true`, während `IsPromise<User>` `false` ergibt.


// 11. Warum sind Conditional Types besonders wichtig
// für fortgeschrittene generische Utility Types?
// Antwort: Da Utility Types Prüfungen für einen Typen durchführen (wie NonNullable<T>) oder Änderungen auf Typen ausüben (wie (ACHTUNG FALSCH: Partial<T>)), und in der Implementierung Conditional Types sind.

// Antwort: Die Grundidee stimmt, aber nicht alle Utility Types verwenden Conditional Types.
// `NonNullable<T>`, `Exclude<T, U>` oder `Extract<T, U>` beruhen beispielsweise auf Conditional Types, weil abhängig von einer Typbedingung Typen behalten oder ausgeschlossen werden.
// `Partial<T>` basiert dagegen hauptsächlich auf einem Mapped Type und dem `?`-Modifier:
// `type MyPartial<T> = { [K in keyof T]?: T[K] }`.
// Conditional Types sind besonders wichtig, wenn ein generischer Typ abhängig davon, was T ist oder erfüllt, unterschiedliche Ergebnistypen erzeugen soll.
