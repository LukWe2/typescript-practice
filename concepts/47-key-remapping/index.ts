type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
};


// 1.

// K in keyof ist eine Type Variable für den jeweils gerade verarbeiteten Key aus dem Typ T
// keyof T holt sich die Propertykeynamen des Typs T als Literal String Union, K in keyof T bedeutet dass TypeScript sich jeden Property aus
// keyof T also aus dem Literal Union String nimmt und in Kombination mit T[K] wird dann Typ[Propertykey in ""] zugewiesen, was sich den Typ
// der jeweiligen Property holt, es ist Indexed Access Type 
type Copy<T> = {

    [K in keyof T]: T[K];
}


// 2.

// Verändern durch "as ..." hier die Propertykeys, indem wir ihnen neue Namen geben, mit normalem Mapped Type werden die Propertykeys durch K
// in keyof T kopiert, mit "as ..." können wir diese auch verändern. Gehen trotzdem noch alle Properties des Typs T durch, können jetzt aber
// wie gesagt Propertykeys und Propertytypen (nicht -werte, sind auf Typebene!) verändern
// ACHTUNG: mit K extends "id" ? never : `get${Capitalize<string & K>}` machen wir, dass wie der Aufgabenstellung nach nur für die drei Properties 
// name, email und active im neuen Typ eine Typproperty entsteht, wenn die gerade iterierte Property K "id" ist, wird dieser der Typ never
// zugeteilt und verfällt somit!
// Btw: Kann auch mit Propertyvalues von der aktuell iterierten Property filtern, das ginge mit "[K in keyof T as T[K] extends ... ? ... : ...]: ...
type GetterNames<T> = {

    [K in keyof T as K extends "id" ? never : `get${Capitalize<string & K>}`]: T[K]
};

/*
type UserGetterNames = {
 getName: string;
 getEmail: string;
 getActive: boolean;
}
*/
type UserGetterNames = GetterNames<User>;

// ohne das "K extends "id" ? never : `get${Capitalize<string & K>}`" also nur mit "[K in keyof T as `get${Capitalize<string & K>}`]: T[K]"
// würde Typ so aussehen:
/*
type UserGetterNames = {
 getId: number;
 getName: string;
 getEmail: string;
 getActive: boolean;
}
 was falsch wäre, sollen nur die letzten drei Properties in neuem Typ transformieren
*/



// 3.

// Hier transformieren wir beides, sowohl die Propertykeys ändern wir vom Namen des Typs T und ebenfalls die Propertyvalues, von nur dem
// ursprünglichen Propertytyp (mit T[K]) zu Funktionstypen "() => T[K]""
type GetterFunctionTypes<T> = {

    [K in keyof T as K extends "id" ? never : `get${Capitalize<string & K>}`]: () => T[K]
};

/*
type UserGetterFunctionTypes = {
 getName: () => string;
 getEmail: () => string;
 getActive: () => boolean;
}
*/
type UserGetterFunctionTypes = GetterFunctionTypes<User>;



// 4.

// hier jetzt komplexere Transformation der Propertyvalues, noch eine Propertyvariable value eingefügt und Rückgabetyp
// Kann also alle Arten von Konstrukten erstellen und Variablennamen benutzen, allgemeine Typen wie void und Typen basierend auf dem eingesetzten
// Typ für T und dessen Properties K erstellen (K sind die Properties in "..." also "id", "name", "email", "active")
type Setters<T> = {

    [K in keyof T as K extends "id" ? never : `set${Capitalize<string & K>}`]: (value: T[K]) => void
};

/*
type UserSetterFunctionTypes = {
 setName: (value: string) => void;
 setEmail: (value: string) => void;
 setActive: (value: boolean) => void;
}
*/
type UserSetterFunctionTypes = Setters<User>;


// 5.

// Durch Intersection Types kombinieren wir beide Typen
type Accessors<T> = GetterFunctionTypes<T> & Setters<T>;

/*
type UserAccessors = {
 getName: () => string;
 getEmail: () => string;
 getActive: () => boolean;
} & {
 setName: (value: string) => void;
 setEmail: (value: string) => void;
 setActive: (value: boolean) => void;
}
*/
type UserAccessors = Accessors<User>;


// 6.

// entfernen hier nur Property id, sonst lassen wir den Propertykey (": K") und auch die Propertyvalues (": T[K]") jeweils so wie sie waren
type RemoveId<T> = {

    [K in keyof T as K extends "id" ? never : K]: T[K];
}

/*
type UserRemovedId = {
 name: string;
 email: string;
 active: boolean;
}
*/
type UserRemovedId = RemoveId<User>;


// 7.

// Kopieren erst wieder alle Properties aus Typ T mit "K in keyof T", filtern wieder mit "as ... extends ..." und zwar für alle Keys die in Keys eingesetzt werden als Literal Union 
// Wenn die gerade iterierte Property K ihr Name in Keys vorkommt (also extended), dann diesem Member der eingesetzten Literal Union in Keys den Typ never zuweisen, fällt somit weg,
// sonst einfach den Propertykeynamen übernehmen also K (K ist immernoch eine Literal Union der Propertykeys vom Typ T also hier K = "id" | "name" | "email" | "active")
type MyOmit<T, Keys extends keyof T> = {

    [K in keyof T as K extends Keys ? never : K]: T[K]
}

/*
type UserOmitted = {
 name: string;
 active: boolean;
}
*/
// Properties id und email erfolgreich in neuem Typ entfernt
type UserOmitted = MyOmit<User, "id" | "email">;



// 8.

// hier genau andersherum, die Propertykeynamen vom Typ T, die in Keys als Literal Union Type angegeben sind, werden behalten, andere werden never zugeteilt und entfernt
type MyPick<T, Keys extends keyof T> = {

    [K in keyof T as K extends Keys ? K : never]: T[K]
}

/*
type UserPicked = {
 id: number;
 name: string;
}
*/
type UserPicked = MyPick<User, "id" | "name">;


// 9.

// holen wieder erst alle Propertykeynamen als Literal Union mit "K in keyof T", prüfen diesmal NICHT mit dem Propertykeynamen K sondern mit dem Propertyvaluetyp der Property von Typ T
// mit T[K] extends string, nämlich ob der Propertyvaluetyp vom gerade iterierter Property ein String ist, wenn ja behalten, wenn nicht never zuteilen und entfernen
// Der Propertyvaluetyp des Ergebnistyps bleibt normal wie in Typ T, da es sowieso nur string sein kann (filtern ja vorher)
type StringProperties<T> = {

    [K in keyof T as T[K] extends string ? K : never]: T[K]
};

/*
type UserStringProperties = {
 name: string;
 email: string;
}
*/
type UserStringProperties = StringProperties<User>;



// 10.

type BooleanProperties<T> = {

    [K in keyof T as T[K] extends boolean ? K : never]: T[K]
}

/*
type UserBooleanProperties = {
 active: boolean;
}
*/
type UserBooleanProperties = BooleanProperties<User>;



// 11.

type Service = {
    url: string;
    retries: number;
    connect: () => void;
    disconnect: () => void;
};


type FunctionProperties<T> = {

    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
}

/*
type ServiceFunctionProperties = {
 connect: () => void;
 disconnect: () => void;
}
*/
type ServiceFunctionProperties = FunctionProperties<Service>;


// 12.

type FormData = {
    username: string;
    age: number;
};

type ChangeHandlers<T> = {
    
    // T & string weil Capitalize einen string erwartet, K aber auch eine number oder ein symbol sein könnte
    [K in keyof T as `on${Capitalize<K & string>}Change`]: (value: T[K]) => void;
}

/*
type FormDataChangedHandlers = {
 onUsernameChange: (value: string) => void;
 onAgeChange: (value: number) => void;
}
*/
type FormDataChangedHandlers = ChangeHandlers<FormData>;


// 13.

// Erstellen jetzt ein Objekt vom Typ GetterFunctionTypes<User>, somit braucht dieses Objekt als Properties die Typproperties:
/*
 getName: () => string;
 getEmail: () => string;
 getActive: () => boolean;
 --> ACHTUNG: Das ist nur für Typ User der hier für T eingesetzt wird, die Propertykeytypen (hier Literals) und Propertyvaluetypen (hier Funktionstypen mit bestimmten allgemeinen Typen)
              sind je nach T anders!
*/
const userGetters: GetterFunctionTypes<User> = {

    getName: () => "Lukas",
    getEmail: () => "lukas@example.com",
    getActive: () => true
};



// 14.

// - Key Remapping bedeutet, dass man in TypeScript neben dem Transformieren dem Kopieren der Propertykeynamen eines bestehenden Typs T und dem Transformieren derer Propertyvaluetypen
// auch die Propertykeynamen verändern kann. Durch "as" kann man festlegen, wie die Propertykeynamen verändert werden sollen
// Außerdem kann man durch Key Remapping auch Keys filtern (mit "extends" nach dem "as") und ebenfalls Keys basierend auf Propertyvaluetypen des gerade iterierten Property Liter Union Namens auswählen/filtern
// - Dieses "as" ist jedoch keine Type Assertion, denn es bestimmt hier, welcher Propertykey im neuen Mapped Type erzeugt wird für das Key Remapping. Bei z.B. value as User handelt es sich um eine Type Assertion. Hier wird TypeScript gesagt, dass ein Wert als ein bestimmter Typ behandelt werden soll.
// - Wenn der neue Propertykeyname never wird, wird dieser entfernt, so wie bei einem Conditional Type 
// - Der Unterschied zwischen K extends ... und T[K] extends ... ist, das beim ersten basierend auf dem Propertykeynamen der gerade iterierten Property (bzw. der Member der Literal Union die aus den Propertykeynamen erstellt wird)
// der ursprüngliche eingesetzte Typ T geprüft bzw. gefiltert wird und beim zweiten basierend auf der Value dieser gerade iterierten Property (bzw. der gerade zur Member in der durch keyof erstellten Literal Union passend zur
// Property im ursprünglichen Typ T)
// - Template Literal Types und Key Remapping arbeiten zusammen, indem Template Literal Types zum Erstellen der Propertykeys für die Propertykeynamen im neuen Typ benutzt werden, 
// und Key Remapping diese nur String Literal Types dann als eben die Propertykeynamen in den tatsächlichen Properties des neuen Typs anlegt.
//  Key Remapping erzeugt keinen Runtime-Code, weil es wieder nur im Typsystem existiert und nur beschreibt dass ein Wert dieses Typs solche Properties/Funtionen besitzen müsste.

// Korrigiert:

// - Key Remapping bedeutet, dass man bei einem Mapped Type nicht nur über die ursprünglichen Propertykeys eines Typs T iterieren
//   und deren Propertyvaluetypen verändern kann, sondern zusätzlich bestimmen kann, welche Propertykeys im neu erzeugten Typ entstehen.
//
//   Bei einem normalen Mapped Type:
//
//   [K in keyof T]: T[K]
//
//   wird der aktuell iterierte Propertykey K unverändert als Propertykey des neuen Typs übernommen.
//
//   Mit Key Remapping:
//
//   [K in keyof T as ...]: ...
//
//   kann man dagegen aus dem ursprünglichen Propertykey K einen neuen Propertykey erzeugen oder entscheiden,
//   dass für diesen ursprünglichen Propertykey überhaupt keine Property im neuen Typ entstehen soll.


// - Das `as` innerhalb eines Mapped Types bestimmt den Propertykey, der für das aktuell iterierte K
//   im neu erzeugten Typ verwendet werden soll.
//
//   Beispiel:
//
//   [K in keyof T as `get${Capitalize<string & K>}`]: T[K]
//
//   Wenn K gerade "name" ist:
//
//   K = "name"
//
//   string & K
//   → "name"
//
//   Capitalize<"name">
//   → "Name"
//
//   `get${"Name"}`
//   → "getName"
//
//   Somit wird aus der ursprünglichen Property:
//
//   name: string
//
//   beispielsweise:
//
//   getName: string


// - Dieses `as` ist KEINE Type Assertion.
//
//   Bei:
//
//   value as User
//
//   handelt es sich um eine Type Assertion.
//   Hier wird TypeScript gesagt, dass ein Wert als ein bestimmter Typ behandelt werden soll.
//
//   Bei:
//
//   [K in keyof T as NewKey]
//
//   handelt es sich dagegen um Key Remapping.
//   Das `as` bestimmt hier, welcher Propertykey im neuen Mapped Type erzeugt wird.
//
//   Es handelt sich also um zwei verschiedene TypeScript-Sprachkonstrukte,
//   die lediglich dasselbe Keyword `as` verwenden.


// - Wenn der durch Key Remapping berechnete neue Propertykey `never` ist,
//   wird für das aktuell iterierte K keine Property im neuen Typ erzeugt.
//
//   Beispiel:
//
//   type RemoveId<T> = {
//       [K in keyof T as
//           K extends "id"
//               ? never
//               : K
//       ]: T[K];
//   };
//
//   Wenn:
//
//   K = "id"
//
//   dann:
//
//   K extends "id"
//   → true
//   → never
//
//   Dadurch wird die Property `id` im neuen Typ nicht erzeugt.
//
//   Die Idee erinnert an `never` bei distributiven Conditional Types:
//
//   Dort:
//   Union-Mitglied → never
//   → trägt nichts zur Ergebnis-Union bei.
//
//   Hier:
//   Propertykey → never
//   → Property wird im Mapped Type nicht erzeugt.


// - Der Unterschied zwischen:
//
//   K extends ...
//
//   und:
//
//   T[K] extends ...
//
//   besteht darin, WAS für die Bedingung untersucht wird.
//
//   `K` ist der aktuell iterierte Propertykey.
//
//   Beispiel:
//
//   type User = {
//       name: string;
//       age: number;
//   };
//
//   Während der Iteration kann beispielsweise gelten:
//
//   K = "name"
//
//   Dann ist:
//
//   K
//   → "name"
//
//   und:
//
//   T[K]
//   → T["name"]
//   → string
//
//   Bei:
//
//   K extends "name" ? ...
//
//   wird also der PROPERTYKEY geprüft.
//
//   Die Frage lautet:
//
//   "Ist der aktuell iterierte Propertykey mit 'name' kompatibel?"
//
//   Bei:
//
//   T[K] extends string ? ...
//
//   wird dagegen der PROPERTYVALUETYP dieser Property geprüft.
//
//   Die Frage lautet:
//
//   "Ist der Typ der aktuell iterierten Property mit string kompatibel?"
//
//   Deshalb kann man mit:
//
//   K extends ...
//
//   beispielsweise nach Propertynamen filtern.
//
//   Und mit:
//
//   T[K] extends ...
//
//   beispielsweise Properties anhand ihrer Value Types filtern.


// - Template Literal Types und Key Remapping können miteinander kombiniert werden,
//   um aus bestehenden Propertykeys automatisch neue Propertykeys zu erzeugen.
//
//   Beispiel:
//
//   type Getters<T> = {
//       [K in keyof T as
//           `get${Capitalize<string & K>}`
//       ]: () => T[K];
//   };
//
//   Aus:
//
//   type User = {
//       name: string;
//       age: number;
//   };
//
//   werden dadurch die neuen Propertykeys:
//
//   "getName"
//   "getAge"
//
//   Der Template Literal Type:
//
//   `get${Capitalize<string & K>}`
//
//   berechnet also den neuen String Literal Type für den Propertykey.
//
//   Key Remapping mit `as` verwendet diesen berechneten String Literal Type anschließend
//   tatsächlich als Propertykey des neu erzeugten Mapped Types.
//
//   Gleichzeitig kann auf der rechten Seite:
//
//   () => T[K]
//
//   auch der Propertyvaluetyp transformiert werden.
//
//   Dadurch entsteht:
//
//   {
//       getName: () => string;
//       getAge: () => number;
//   }


// - Key Remapping erzeugt KEINEN Runtime-Code.
//
//   Mapped Types, keyof, Indexed Access Types, Template Literal Types und Key Remapping
//   existieren nur im TypeScript-Typsystem zur Compile Time.
//
//   Beispiel:
//
//   type UserGetters = Getters<User>;
//
//   erzeugt zur Runtime nicht automatisch Funktionen wie:
//
//   getName()
//   getAge()
//
//   Der Typ beschreibt lediglich,
//   welche Properties und Propertyvaluetypen ein Wert besitzen müsste,
//   um diesem Typ zu entsprechen.
//
//   Die tatsächlichen Runtime-Funktionen müssen weiterhin selbst implementiert werden:
//
//   const userGetters: Getters<User> = {
//       getName: () => "Lukas",
//       getAge: () => 25
//   };




















// 1. Wie lautet die allgemeine Syntax für Key Remapping
// innerhalb eines Mapped Types?
/*
[K in keyof T as ...]: ...
*/
// Was bedeuten die einzelnen Teile?
// Antwort: Allgemeine Syntax is [K in keyof T as ...]: T[K], wobei K in keyof T wie bei Mapped Types eine Union von Literal Strings aus den Propertykeys des Typs T erstellt. as ... verändert, anders wie bei normalen Mapped
// Types, bei denen die Propertykeynamen einfach kopiert werden in den neuen Typ, die Namen der iterierten Keys bzw. Member der durch K in keyof T erstellten Union der ursprünglichen Propertykeynamen.
// T[K] setzt dann den Value der iterierten Property des neuen Typs auf den ursprünglichen Typ, hier kann aber auch ein fester Typ oder Conditions oder andere Veränderungen durchgeführt werden, z.B. auch die Transformation
// eines normalen Typs in ein Funktionstyp mit z.B. "() => T[K]"

// Antwort: Grundidee richtig. Zwei Präzisierungen:
//
// `keyof T` erzeugt die Union der Property-Key-Typen von T.
// Diese können grundsätzlich string, number oder symbol sein.
//
// `K in keyof T` bedeutet dann:
// Der Mapped Type verarbeitet nacheinander jeden Key aus dieser Union.
//
// Allgemeines Schema:
//
// [K in keyof T as NewKey]: NewValueType
//
// Dabei:
//
// keyof T
// → Union der ursprünglichen Property-Key-Typen.
//
// K
// → aktuell verarbeiteter Property-Key.
//
// as NewKey
// → berechnet den Property-Key, der im neuen Typ entstehen soll.
//
// : NewValueType
// → bestimmt den Property-Value-Type dieser neuen Property.
//
// `T[K]` ist ein Indexed Access Type und liefert den Value Type
// der ursprünglichen Property mit dem aktuell verarbeiteten Key K.
//
// Wichtig:
// Rechts muss nicht zwingend T[K] stehen.
//
// Zum Beispiel:
//
// [K in keyof T as ...]: boolean
//
// oder:
//
// [K in keyof T as ...]: () => T[K]
//
// sind ebenfalls möglich.



// 2. Was ist der Unterschied zwischen:
/*
[K in keyof T]: T[K]
*/
// und:
/*
[K in keyof T as NewKey]: T[K]
*/
// Antwort: Der Unterschied ist, dass das obere ein normaler Mapped Type ist mit dem man die Propertykeynamen des Typs T einfach kopiert, mit dem zweiten was ein Key Remapping ist kann man diese ebenfalls verändern,
// nämlich mit dem was nach dem "as" steht. In diesem Fall würde das was der Typ NewKey enthält als Propertykeynamen im neuen Type eingefügt werden, dieser könnte z.B. eine Literal Union aus Strings sein, dann würden
// nacheinander für jede Property in T ein Member dieser Union als neuer Key der jeweiligen Property eingefügt werden (Frage: Kann NewKey hier auch nur string oder number oder sogar bool sein oder muss es eine Literal String Union sein?)

// Antwort: Der erste Teil ist richtig:
//
// [K in keyof T]: T[K]
//
// → ursprünglicher Key K wird unverändert übernommen.
//
// [K in keyof T as NewKey]: T[K]
//
// → der neue Property-Key wird durch NewKey bestimmt.
//
// Wichtig ist aber die Korrektur bei einer Union:
//
// Wenn NewKey:
//
// "a" | "b"
//
// ergibt, wird NICHT:
//
// erster ursprünglicher Key → "a"
// zweiter ursprünglicher Key → "b"
//
// zugeordnet.
//
// Stattdessen wird der `as`-Ausdruck für JEDES aktuell verarbeitete K ausgewertet.
//
// Wenn er für ein bestimmtes K:
//
// "a" | "b"
//
// ergibt, können aus genau diesem einen K beide Properties entstehen:
//
// a: ...
// b: ...
//
// Beispiel:
//
// type Test<T> = {
//     [K in keyof T as "a" | "b"]: T[K];
// };
//
// Für jedes K ist der neue Key-Typ "a" | "b".
//
// Da mehrere ursprüngliche Keys dadurch auf dieselben neuen Keys gemappt werden,
// können deren Value Types dort zusammengeführt werden.
//
// Zu deiner Zusatzfrage:
//
// Nach `as` muss ein gültiger Property-Key-Typ entstehen.
//
// Dazu gehören insbesondere:
//
// string
// number
// symbol
// entsprechende Literal Types
// Unions daraus
// never
//
// Also:
//
// as "name"           // ✅
// as "a" | "b"        // ✅
// as string           // ✅
// as number           // ✅
// as symbol           // ✅
// as never            // ✅
//
// boolean dagegen ist KEIN gültiger Property-Key-Typ:
//
// as boolean          // ❌
//
// Property Keys sind in TypeScript grundsätzlich PropertyKey:
//
// string | number | symbol.



// 3. Welche Bedeutung hat `as` hier?
/*
[K in keyof T as `get${...}`]
*/
// Ist dieses `as` eine Type Assertion?
// Antwort: "as" ist hier das Keyword, nach dem festgelegt wird welcher neue Property-Key für die gerade iterierte Property aus dem ursprünglichen Typen T erzeugt wird. Es ist hier keine Type Assertion, sondern legt fest welcher Propertykeyname
// für den gerade iterierten neuen Key benutzt werden soll. Nach as können nromale Typen wie string oder number stehen, was aber nicht immer gut ist, weil man somit beim Erstellen eines Objekt mit diesem Typen die Propertykeynamen anlegen muss und diese dann 
// immer anders sein können. Interessanter ist es wenn nach "as" ein Template Literal Type wie "get${NewType}" oder eine Union.

// Antwort: Genau richtig in der Grundidee.
//
// Dieses `as` ist Key Remapping.
//
// Es bedeutet:
//
// Aus dem aktuell verarbeiteten ursprünglichen Key K
// soll ein neuer Property-Key berechnet werden.
//
// Es ist NICHT dasselbe `as` wie bei:
//
// value as User
//
// Dort:
//
// `as`
// → Type Assertion.
//
// Hier:
//
// [K in keyof T as NewKey]
//
// → Key Remapping.
//
// Auch dein Punkt zu:
//
// as string
//
// ist richtig.
//
// Dann schreibt der Typ keinen konkreten Propertynamen wie:
//
// "getName"
//
// vor, sondern erlaubt grundsätzlich beliebige String-Keys.
//
// Bei einem konkreten Objekt werden dann konkrete String-Propertynamen verwendet.
//
// Für echtes Remapping sind deshalb spezifischere Typen häufig interessanter:
//
// as "name"
//
// as "name" | "age"
//
// as `get${Capitalize<string & K>}`
//
// weil dadurch konkrete neue Property-Key-Typen berechnet werden.



// 4. Was entsteht hier?
/*
type User = {
    name: string;
    age: number;
};

type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};

type Result = Getters<User>;
*/
// Antwort: Hier entsteht type Result = { getName: () => string); getAge: () => number}, weil einmal der Propertykeyname verändert wird zu "get" vorne dran und der erste Buchstabe aller Properties wird im neuen Typ groß gemacht
// und der Rückgabetyp jeder Property wird zu einem Funktionstypen vom gleichen Typ wie die Property selbst wegen T[K]

// Antwort: Inhaltlich richtig.
//
// Genau entsteht:
//
// type Result = {
//     getName: () => string;
//     getAge: () => number;
// };
//
// Nur sprachlich etwas präziser:
//
// Nicht der „Rückgabetyp jeder Property wird zu einem Funktionstyp“.
//
// Sondern:
//
// Der Property-Value-Type wird zu einem Funktionstyp.
//
// Für:
//
// K = "name"
//
// wird:
//
// neuer Key:
// "getName"
//
// Property-Value-Type:
// () => T["name"]
// → () => string
//
// Dabei ist innerhalb des Funktionstyps wiederum:
//
// string
//
// der Rückgabetyp der Funktion.
//
// Also:
//
// Property-Value-Type:
// () => string
//
// Funktion-Rückgabetyp:
// string



// 5. Was passiert bei K = "name"
// in Frage 4 Schritt für Schritt?
// Antwort: der Propertykeyname "name" wird wegen dem Template Literal Type und dem Utility Type Capitalize<T> zu getName, außerdem wird der Value der Propery von string zu einem Funktionstyp des gleichen Typs () => string.

// Antwort: Genau richtig.
//
// Noch einmal vollständig:
//
// K = "name"
//
// string & K
// → "name"
//
// Capitalize<"name">
// → "Name"
//
// `get${"Name"}`
// → "getName"
//
// Das wird durch `as` der neue Property-Key.
//
// Rechts:
//
// T[K]
//
// → T["name"]
// → string
//
// daraus:
//
// () => T[K]
//
// → () => string
//
// Ergebnis:
//
// getName: () => string;



// 6. Warum wird häufig `string & K` verwendet,
// bevor K an Capitalize<T> übergeben wird?
// Antwort: Weil der Utility Type Capitalize<T> ein string erwartet aber K auch vom Typ number oder symbol sein kann, was nicht kompatibel mit dem Utility Type ist.

// Antwort: Genau richtig.
//
// `keyof T` kann grundsätzlich:
//
// string
// number
// symbol
//
// enthalten.
//
// Capitalize<T> erwartet dagegen einen String-Typ.
//
// Deshalb:
//
// string & K
//
// grenzt K auf den Teil ein,
// der mit string kompatibel ist.
//
// Bei:
//
// K = "name"
//
// ergibt:
//
// string & "name"
// → "name"
//
// Bei einem nicht mit string kompatiblen Key bleibt entsprechend kein passender String-Key übrig.



// 7. Was bedeutet `never` in dieser Position?
/*
type RemovePassword<T> = {
    [K in keyof T as
        K extends "password"
            ? never
            : K
    ]: T[K];
};
*/
// Antwort: Hier wird geprüft ob die gerade iterierte Property, bzw. der Member der aus K in keyof T erstellten Union, K gleich "password" ist, wenn ja geht es in den true-Zweig und die Property bekommt im neuen Typ den Typ never, wodurch diese wegfällt.
// Effektiv wird diese also aus dem neuen Typen herausgelöscht/-gelassen.

// Antwort: Fast richtig. Der wichtige Feinschliff:
//
// Nicht die PROPERTY bekommt den Typ never.
//
// Sondern:
//
// Der NEUE PROPERTY-KEY wird `never`.
//
// Der relevante Ausdruck ist:
//
// as K extends "password"
//     ? never
//     : K
//
// Bei:
//
// K = "password"
//
// wird der neue Key:
//
// never.
//
// Ein Mapped Type erzeugt für einen Key `never` keine Property.
//
// Deshalb fällt die gesamte Property weg.
//
// Der Value Type:
//
// T[K]
//
// wird in diesem Fall gar nicht relevant,
// weil überhaupt keine Property erzeugt wird.



// 8. Warum wird die Property `password`
// in Frage 7 vollständig entfernt?
// Antwort: Weil ihr Typ never ist im true-Zweig und somit vom Typ never ist im neuen Typ, und ein Mapped Type erzeugt keine Property mit Key never.

// Antwort: Der zweite Satzteil ist genau richtig.
//
// Nur wieder:
//
// Nicht der Typ der Property wird never,
// sondern ihr berechneter PROPERTY-KEY.
//
// K = "password"
//
// → Conditional Type ergibt never.
//
// → neuer Property-Key = never.
//
// → der Mapped Type erzeugt keine Property.
//
// Deshalb verschwindet:
//
// password: ...
//
// vollständig aus dem resultierenden Objekttyp.



// 9. Was ist der Unterschied zwischen:
/*
K extends "id"
*/
// und:
/*
T[K] extends string
*/
// innerhalb eines Key-Remapping-Mapped-Types?
// Antwort: Beim ersten wird der Propertykeyname gefiltert und beim zweiten der Propertyvaluetyp der gerade iterierten Property, bzw. der Member aus der Literal String Union die K in keyof T erstellt.

// Antwort: Die Grundidee ist richtig.
//
// Präziser:
//
// K extends "id"
//
// prüft den aktuell verarbeiteten PROPERTY-KEY.
//
// Beispiel:
//
// K = "name"
//
// dann wird:
//
// "name" extends "id"
//
// geprüft.
//
// Dagegen:
//
// T[K] extends string
//
// prüft den PROPERTY-VALUE-TYPE,
// der zum aktuell verarbeiteten Key gehört.
//
// Bei:
//
// K = "name"
//
// und:
//
// name: string
//
// ist:
//
// T[K]
// → T["name"]
// → string.
//
// Dann wird:
//
// string extends string
//
// geprüft.
//
// Kurz:
//
// K extends ...
// → Entscheidung anhand des Property-Keys.
//
// T[K] extends ...
// → Entscheidung anhand des Property-Value-Types.



// 10. Was macht folgender Type?
/*
type StringProperties<T> = {
    [K in keyof T as
        T[K] extends string
            ? K
            : never
    ]: T[K];
};
*/
// Antwort: Dieser Typ behält nur Properties aus Typ T im neuen Typ der erstellt wird, dessen Propertyvaluetyp string ist. Also wenn der Valuetyp der gerade iterierten Property (propertykeyname: propertyvaluetyp) ein string ist, wird einfach K also der Propertykeyname
// als Propertykeyname im neuen Typ angelegt, sonst never wodurch für diese iterierte Property im neuen Typ keine Property mehr angelegt wird.

// Antwort: Genau richtig.
//
// Für jede Property wird geprüft:
//
// T[K] extends string
//
// Wenn true:
//
// neuer Key = K
// → Property bleibt erhalten.
//
// Wenn false:
//
// neuer Key = never
// → Property wird nicht erzeugt.
//
// Beispiel:
//
// type User = {
//     name: string;
//     age: number;
//     email: string;
// };
//
// ergibt:
//
// {
//     name: string;
//     email: string;
// }



// 11. Welche TypeScript-Konzepte werden hier kombiniert?
/*
type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};
*/
// Antwort: Einmal K in keyof T also erzeugen einer Literal String Union aus den Propertykeynamen des Typs T, dann Template Literal Strings mit as `get${Capitalize<string & K>, wobei der Propertykeyname im neuen Typ für den gerade iterierten Propertykeyname im 
// erstellten Literal String Union und dann noch Transformation des Propertyvaluetyps mit () => T[K], wobei ein Funktionstyp erstellt wird mit dem Propertyvaluetyp aus dem ursprünglichen Typ T

// Antwort: Inhaltlich richtig. Hier kommen sogar ziemlich viele deiner bisherigen Konzepte zusammen:
//
// 1. Generic:
//
// T
//
// → Platzhalter für den später eingesetzten Typ.
//
// 2. keyof:
//
// keyof T
//
// → Union der Property-Key-Typen.
//
// 3. Mapped Type:
//
// [K in keyof T ...]
//
// → verarbeitet die einzelnen Keys.
//
// 4. Key Remapping:
//
// as ...
//
// → berechnet einen neuen Property-Key.
//
// 5. Intersection Type:
//
// string & K
//
// → beschränkt K auf String-Keys.
//
// 6. String Utility Type:
//
// Capitalize<...>
//
// → verändert den ersten Buchstaben.
//
// 7. Template Literal Type:
//
// `get${...}`
//
// → erzeugt den neuen String Literal Type für den Key.
//
// 8. Indexed Access Type:
//
// T[K]
//
// → liefert den Value Type der ursprünglichen Property.
//
// 9. Function Type:
//
// () => T[K]
//
// → macht daraus einen Funktionstyp.
//
// Insgesamt also:
//
// ursprünglicher Key
// → neuer Key
//
// ursprünglicher Value Type
// → Funktion, die diesen Typ zurückgibt.



// 12. Was ist der Unterschied zwischen:
/*
type Names =
    `get${Capitalize<"name" | "age">}`;
*/
// und:
/*
type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};
*/
// Antwort: Beim ersten Code erstellen wir mittels Template Literal Types nur einen Typen Names als Literal String Union, es gibt hier keine Property mit Key und Value sondern nur eben Strings als Namen
// Beim zweiten Code erstellen wir dann im Typ Getters<T> tatsächlich Properties und erstellen einen Mapped Type der ein Objekttyp erzeugt mit Propertykeys und deren Namen und Propervalues mit deren Typen (hier: Funktionstypen, könnte auch nur string sein).
// Also erstes ist ein Literal String Type, das zweite ein Objekttyp.

// Antwort: Genau richtig.
//
// Erstes Beispiel:
//
// type Names =
//     "getName" | "getAge";
//
// Das ist nur eine Union von String Literal Types.
//
// Es gibt hier noch KEINE Properties.
//
// Zweites Beispiel:
//
// Getters<User>
//
// kann beispielsweise ergeben:
//
// {
//     getName: () => string;
//     getAge: () => number;
// }
//
// Das ist ein Objekttyp,
// genauer ein durch einen Mapped Type erzeugter Objekttyp.
//
// Seine Property-Value-Types sind hier Funktionstypen.
//
// Wichtig:
//
// Template Literal Type alleine
// → erzeugt String-Typen.
//
// Mapped Type + Key Remapping
// → verwendet solche String-Typen als tatsächliche Property-Keys.
//
// Rechte Seite:
// () => T[K]
//
// → bestimmt unabhängig davon den Property-Value-Type.



// 13. Kann ein Key-Remapping-Mapped-Type
// zur Runtime tatsächlich neue Properties oder Funktionen
// an einem Objekt erzeugen?
// Warum bzw. warum nicht?
// Antwort: Nein weil auch Key Remapping nur während der Compile Time existiert und erzeugt keinen Runtime Code. Es erstellt also immernoch nur Typen udn keien echten Funktionen oder Objekte, nur Typen. Auch in einen generischen Typen werden wiederum Typen
// eingesetzt und keine Objekte. Es beschreibt nur: ein Wert dieses Typs müsste solche Properties/Funktionen besitzen. Der echte Wert muss weiterhin implementiert werden.

// Antwort: Genau richtig.
//
// Beispiel:
//
// type UserGetters = Getters<User>;
//
// erzeugt keinen Runtime-Wert.
//
// Es beschreibt nur:
//
// {
//     getName: () => string;
//     getAge: () => number;
// }
//
// Wenn du einen echten Wert möchtest,
// musst du ihn selbst implementieren:
//
// const getters: UserGetters = {
//     getName: () => "Lukas",
//     getAge: () => 25
// };
//
// TypeScript prüft dann,
// ob dieser Runtime-Wert den zuvor berechneten Typ erfüllt.



// 14. Warum ist Key Remapping besonders nützlich,
// wenn mehrere Typen aus einer zentralen Domain-Struktur
// automatisch abgeleitet werden sollen?
// Antwort: Weil aus einer zentralen Typdefinition, die aus der dieser zentralen Domain Struktur erstellt wurde, neue andere Typen abgeleitet werden können, wie Typen für Handler oder Getter oder Setter.

// Antwort: Genau richtig.
//
// Beispiel:
//
// type User = {
//     name: string;
//     age: number;
// };
//
// Diese eine zentrale Struktur kann anschließend als Grundlage dienen für:
//
// Getters<User>
//
// Setters<User>
//
// ChangeHandlers<User>
//
// StringProperties<User>
//
// usw.
//
// Der Vorteil:
//
// Wenn sich der zentrale User-Typ verändert,
// können die abgeleiteten Typen automatisch mit angepasst werden.
//
// Man vermeidet dadurch,
// dieselben Informationen mehrfach manuell zu definieren.
//
// Das ist ein wichtiger Anwendungsfall von fortgeschrittenem TypeScript:
//
// Eine zentrale Domain-Struktur
//        ↓
// Typinformationen automatisch ableiten
//        ↓
// weniger doppelte Definitionen
//        ↓
// stärkere Konsistenz im Code
