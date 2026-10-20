// 1.

type User = {

    readonly id: number,
    name: string,
    email?: string,
    readonly createdAt: string
};

// 2.

// -readonly entfernt readonly von allen Properties.
// [K in keyof T] durchläuft alle Property-Keys von T.
// T[K] übernimmt jeweils den ursprünglichen Property-Typ.
//
// Andere Modifier wie optional (?) bleiben erhalten.
// Deshalb bleibt z.B. email?: string weiterhin optional.
type Mutable<T> = {

    -readonly [K in keyof T]: T[K];
};

type MutableUser = Mutable<User>;

const user01: MutableUser = {

    id: 1,
    name: "Lukas",
    email: "lukas@example.com",
    createdAt: "2026-10-20"
};

// da user01 vom Typ MutableUser (was Mutable<User> ist), ist die Property id nicht mehr readonly und kann verändert werden. Wenn user01 vom Typ User wäre, ginge das nicht weil die id Property
// bei diesem Typ readonly ist
// btw.: email ist immernoch optional also email?, weil -readonly eben nur das readonly entfernt, nicht aber die optionalen Properties wie mit -? 
user01.id = 2;

user01.createdAt = "2026-10-19";


// 3.

// -? entfernt für alle Properties des Typs T, aus dem der Mapped Type erstellt wird das ? also optional von allen Properties
// dadurch werden Properites die im Originaltyp (wie bei User die email Property), nicht mehr optional und müssen existieren
type RequiredProperties<T> = {

    [K in keyof T]-?: T[K]
}

type RequiredUser = RequiredProperties<User>;

// Fehler: Property 'email' is missing in type '{ id: number; name: string; createdAt: string; }' but required in type 'RequiredProperties<User>'.
// da user02 vom Typ RequiredUser ist und dieser Typ aus dem Originaltyp User einen Mapped Type mit Modifier macht, der das ? durch -? entfernt, muss email in Objekten mit diesem Typ existieren
/*
const user02: RequiredUser = {

    id: 2,
    name: "Anna",
    createdAt: "2026-10-20"
}
*/

const user02: RequiredUser = {

    id: 2,
    name: "Anna",
    email: "anna@example.com",
    createdAt: "2026-10-20"
}


// 4.

type MutableRequired<T> = {

    -readonly [K in keyof T]-?: T[K]
}



// 5.

type Settings = {

    readonly theme?: string,
    readonly language?: string,
    readonly fontSize?: number
}

/*
const settings01: Settings = {

    theme: "dark",
    language: "german",
    fontSize: 12
}

// Fehler: Cannot assign to 'theme' because it is a read-only property.
settings01.theme = "bright";
*/

type EditableSettings = MutableRequired<Settings>;

// Fehler: Property 'fontSize' is missing in type '{ theme: string; language: string; }' but required in type 'MutableRequired<Settings>'.
/*
const settings01: EditableSettings = {

    theme: "dark",
    language: "german",
};
*/

const settings01: EditableSettings = {

    theme: "dark",
    language: "german",
    fontSize: 12
};

settings01.theme = "bright";
settings01.language = "english";
settings01.fontSize = 10;


// 6.

type MyPartial<T> = {

    [K in keyof T]?: T[K];
};

type MyReadonly<T> = {

    readonly [K in keyof T]: T[K];
};

type MyRequired<T> = {

    [K in keyof T]-?: T[K];
};

// im Typ MyPartial<T> machen wir durch das ? alle Properties des Objekts, der diesen Mapped Type hat, optional
// im Typ MyReadonly<T> machen wir durch das readonly vor der dynamischen Property Erstellung alle Properties des Objekts, der diesen Mapped Type hat, readonly also nach der Initialisierung kann der Wert dafür nicht mehr geändert werden
// im Typ MyRequired<T> entfernen wir durch das -? vor der dynamischen Property Erstellung alle Properties des Objekts, der diesen Mapped Type hat, alle ? von Properties, also alle die vorher optional waren sind jetzt erforderlich und nicht mehr optional



// 7.

/*
    email?: string
    → Property darf komplett fehlen

    email: string | undefined
    → Property muss vorhanden sein,
    Value darf aber undefined sein
*/

type UserWithUndefined = {
    name: string;
    email: string | undefined;
};

const usersWithUndefined01: RequiredProperties<UserWithUndefined> = {

    name: "Lukas",
    // Type von Property email: (property) email: string | undefined
    email: "lukas@example.com"
};

// email ist immernoch string | undefined, obwohl wir durch RequiredProperties<T> die Optionalität (also ?) der Properties von T (hier UserWithUndefined) entfernen
// und genau hier ist der Fehler: email ist nicht optional, ist nicht email?: string
// Es gibt garkein ? bzw. optionale Property, die entfernt werden könnte, email: string | undefined ist etwas anderes als email?: string, hier darf die Property komplett fehlen, beim ersten nur entweder string oder undefined sein,
// das ist etwas anderes.


// 8.

type OptionalUser = {
    name: string;
    email?: string;
}

const usersWithUndefined02: RequiredProperties<OptionalUser> = {

    name: "Lukas",
    // Typ von Property email: (property) email: string
    email: "lukas@example.com"
}

// jetzt ist email hier vom Typ string, weil sie vorher in OptionalUser vom Typ email? war also optional, und hier tatsächlich mit -? in RequiredProperties die Optionalität der Property entfernt wurde.
// Im TYP UserWithUndefined gibt es garkein ? bzw. optionale Property email, die entfernt werden könnte, email: string | undefined ist etwas anderes als email?: string, hier darf die Property komplett fehlen, beim ersten nur entweder string oder undefined sein,
// das ist etwas anderes.

// 9.

type EditableDraft<T> = {

    -readonly [K in keyof T]?: T[K];
}

// würde so aussehen:
/*
type EditableUserDraft = {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: string;
};
*/

// benutzen jetzt hier wie in Aufgabe 7 und 8 den Typ direkt, in den Aufgaben davor haben wir den konkreten Typ aus dem Generic nochmal in 
// einen Typen gepackt, z.B. hier: type RequiredUser = RequiredProperties<User>; oder hier: type EditableSettings = MutableRequired<Settings>;
const user03: EditableDraft<User> = {

    id: 3,
    name: "Sandra",
    email: "sandra@example.com",
    createdAt: "2026-10-20"
};

// diese sonst readonly Properties von User sind jetzt veränderbar
user03.id = 5;
user03.createdAt = "2026-10-19";

// außerdem: jetzt sind alle Properties in user03 und alle anderen Objekte, die den Typen EditableDraft<T> haben, optional also müssen nicht im Objekt existieren



// 10.

// -readonly legt fest dass die Properties im neuen (aus dem Originaltyp erstellten) Mapped Type alle verändert werden dürfen, also entfernt alle das readonly von allen Properties,
// [K in keyof T] erstellt die Property K aus dem gerade iterierten Propertykey von Typ T, -? legt fest dass keine Property im neuen Mapped Type optional ist also entfernt bisherige ?, 
// T[K] legt den Typ der gerade im Originaltyp iterierten Property fest, nämlich auf den ursprünglichen Typ im Originaltyp, da Originaltyp[property1] = Typ von Property1, Originaltyp[property12] = Typ von Property2, etc.












// 1. Was ist ein Mapped Type Modifier und welche Modifier haben wir hier kennengelernt?
// Antwort: Ein Mapped Type Modifier erlaubt es, bei der Erstellung eines Mapped Types (also aus den Properties eines Typen einen neuen Typen
// mit jeweils neuen Propertywerttypen oder aus den Propertywerttypen des Originaltypen) die Eigenschaften der Properties des erstellten Mapped Types festzulegen und zu ändern.
// Wir haben readonly, -readonly, ? und -? kennengelernt also nicht veränderbar also nicht veränderbar, wieder veränderbar sozusagen, optional und wieder nicht optional also erforderlich.
// Mapped Type Modifier sind hilfreich, wenn man einen Mapped Type aus einem bestehenden Typen macht, aber ebenfalls die Eigenschaften der Properties verändern möchte. Wenn der Originaltyp
// z.B. eine Property hat, die readonly ist, und man erzeugt ein Mapped Type daraus, ist auch diese Property im neu erstellten Mapped Type readonly. Mit -readonly kann man machen, dass keine der
// Properties im neuen Mapped Type readonly ist, Achtung: da ist ein - (Minus)
// Denn ein einfacher Mapped Type behält über keyof T bestehende Modifier normalerweise bei, sofern man sie nicht ausdrücklich verändert. 
// Mapped Type Modifiers verändern nur die Art der Property, nicht etwas den Typ des Propertywertes, also welche Typen die Properties im Mapped Type dann haben, werden von Mapped Type Modifiers nicht beeinflusst/verändert.

// Antwort: Richtig. Mapped Type Modifiers verändern Eigenschaften der erzeugten Properties: `readonly` fügt Readonly hinzu, `-readonly` entfernt es, `?` macht Properties optional und `-?` entfernt die Optionalität.
// Bei einem homomorphen Mapped Type wie `[K in keyof T]: T[K]` werden vorhandene Modifier normalerweise übernommen, wenn du sie nicht ausdrücklich veränderst.
// Die Modifier verändern dabei nicht direkt den mit `T[K]` festgelegten Property-Typ. Kleine Feinheit: Optionalität beeinflusst natürlich, ob eine Property fehlen darf und kann sich dadurch auch auf den Typ beim Lesen einer Property auswirken.


// 2. Was macht `-readonly` in folgendem Typ?
/*
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
*/
// Antwort: -readonly macht, dass in einem neu erstellten Typ aus diesem Mapped Type Mutable<T> wie type MutableUser = Mutable<User>, dann sind Properties, die im Originaltyp User readonly waren,
// im neu erstellten Typ MutableUser nicht mehr readonly sondern eben veränderbar/mutable.

// Antwort: Genau richtig. `-readonly` entfernt den `readonly`-Modifier von allen über den Mapped Type erzeugten Properties. Bereits veränderbare Properties bleiben einfach veränderbar.


// 3. Was macht `-?` in folgendem Typ?
/*
type RequiredProperties<T> = {
    [K in keyof T]-?: T[K];
};
*/
// Antwort: -? macht, dass in einem neu erstellten Typ aus diesem Mapped Type RequiredProperties<T> wie type RequiredUser = RequiredProperties<User>, dann sind Properties, die im Originaltyp User optinal mit ? waren,
// im neu erstellten Typ RequiredUser nicht mehr optional sondern eben erforderlich/required.

// Antwort: Genau richtig. `-?` entfernt den Optional-Modifier von den erzeugten Properties. Eine Property wie `email?: string` wird dadurch zu einer erforderlichen Property.


// 4. Was entsteht ungefähr aus folgendem Code?
/*
type Settings = {
    readonly theme?: string;
    readonly fontSize?: number;
};

type MutableRequired<T> = {
    -readonly [K in keyof T]-?: T[K];
};

type Result = MutableRequired<Settings>;
*/
// Antwort: Aus diesem Code folgt ein Typ Result, der so aussieht:
/*
type Result = {

    theme: string;
    fontSize: number;
}
*/
// weil die Mapped Type Modifier -readonly und -?, die hier drin sind: -readonly [K in keyof T]-?: T[K] alle readonly und ? aus dem Mapped Type der ja aus dem Originaltyp erstellt wird, entfernt werden also die Properties haben diese
// Eigenschaften nicht mehr. Außerdem werden als Typen einfach die ursprünglichen Propertywerttypen übernommen wegen T[K].

// Antwort: Genau richtig. Das Ergebnis ist ungefähr `{ theme: string; fontSize: number }`.
// `-readonly` entfernt die Readonly-Modifier, `-?` entfernt die Optional-Modifier und `T[K]` übernimmt die ursprünglichen Property-Typen.


// 5. Was ist der Unterschied zwischen `?` und `-?` in einem Mapped Type?
// Antwort: Der Unterschied ist, dass ? die aus dem Originaltyp kopierten Properties alle optional macht also dann müssen diese Properties in einem Objekt, was von diesem Mapped Type ist später, nicht existieren, können aber.
// -? ist genau das Gegenteil, es macht dass die Properties im neuen Mapped Type erforderlich/required sind, auch wenn sie vorher im Originaltyp optional waren.

// Antwort: Genau richtig. `?` fügt den Optional-Modifier hinzu, `-?` entfernt ihn. Das `-` bedeutet bei Mapped Type Modifiers also sinngemäß: „Entferne diesen Modifier“.


// 6. Was ist der Unterschied zwischen `readonly` und `-readonly`?
// Antwort: Der Unterschied ist, dass readonly die aus dem Originaltyp kopierten Properties alle nicht veränderbar macht also dann können diese Properties in einem Objekt, was von diesem Mapped Type ist später, nicht verändert werden.
// -readonly ist genau das Gegenteil, es macht dass die Properties im neuen Mapped Type veränderbar/mutable sind, auch wenn sie vorher im Originaltyp readonly waren.

// Antwort: Richtig. Präziser: `readonly` verhindert über diesen TypeScript-Typ die Neuzuweisung der betreffenden Properties, während `-readonly` diesen Schutz entfernt.
// Das ist eine Compile-Time-Regel und keine automatische Runtime-Unveränderlichkeit oder tiefe Immutability des gesamten Wertes.


// 7. Warum bleibt bei folgendem Ausgangstyp `undefined` erhalten,
// obwohl `-?` verwendet wird?
/*
type User = {
    email: string | undefined;
};

type RequiredUser = {
    [K in keyof User]-?: User[K];
};
*/
// Antwort: Weil es garkein ? bzw. optionale Property gibt, die entfernt werden könnte, email: string | undefined ist etwas anderes als email?: string, hier darf die Property komplett fehlen, beim ersten nur entweder string oder undefined sein,
// das ist etwas anderes.

// Antwort: Genau richtig. `email` ist hier bereits eine erforderliche Property. Nur ihr Value-Typ ist `string | undefined`.
// `-?` entfernt ausschließlich einen vorhandenen Optional-Modifier und entfernt nicht `undefined` aus einem Union Type. Deshalb bleibt `email: string | undefined`.


// 8. Was ist der Unterschied zwischen diesen beiden Properties?
/*
email?: string;

email: string | undefined;
*/
// Antwort: Bei email?: string, hier darf die Property komplett fehlen, bei email: string | undefined nur entweder string oder undefined sein, das ist etwas anderes.

// Antwort: Genau richtig. Bei `email?: string` darf die komplette Property fehlen. Bei `email: string | undefined` muss die Property vorhanden sein, ihr Wert darf aber entweder ein `string` oder `undefined` sein.
// Dieser Unterschied ist bei deiner aktivierten Option `exactOptionalPropertyTypes` besonders relevant.


// 9. Welche Aufgabe haben die einzelnen Bestandteile?
/*
type Transform<T> = {
    -readonly [K in keyof T]-?: T[K];
};
*/
// Antwort: -readonly legt fest dass die Properties im neuen (aus dem Originaltyp erstellten) Mapped Type alle verändert werden dürfen, also entfernt alle das readonly von allen Properties,
// [K in keyof T] erstellt die Property K aus dem gerade iterierten Propertykey von Typ T, -? legt fest dass keine Property im neuen Mapped Type optional ist also entfernt bisherige ?, 
// T[K] legt den Typ der gerade im Originaltyp iterierten Property fest, nämlich auf den ursprünglichen Typ im Originaltyp, da Originaltyp[property1] = Typ von Property1, Originaltyp[property12] = Typ von Property2, etc.

// Antwort: Genau richtig.
// `keyof T` erzeugt die Union der Keys von T.
// `K in keyof T` verarbeitet jeden dieser Keys und erzeugt die entsprechende Property.
// `-readonly` entfernt Readonly.
// `-?` entfernt Optionalität.
// `T[K]` liest per Indexed Access den ursprünglichen Property-Typ hinter dem gerade betrachteten Key K aus.


// 10. Welche eingebauten Utility Types entsprechen ungefähr diesen Mapped Types?
/*
type A<T> = {
    [K in keyof T]?: T[K];
};

type B<T> = {
    readonly [K in keyof T]: T[K];
};

type C<T> = {
    [K in keyof T]-?: T[K];
};
*/
// Antwort: A entspricht dem Utility Type Partial<T>, da es jede Property aus Typ T nimmt, im neuen Mapped Type A dafür eine optionale Property anlegt, 
// B entspricht ReadOnly<T>, weil es jede Property aus Typ T nimmt, im neuen Mapped Type B dafür eine readonly Property anlegt
// und C entspricht Required<T>, weil es jede Property aus Typ T nimmt, im neuen Mapped Type B dafür eine Property anlegt und falls vorhanden das ? also die Optionalität der Property entfernt, heißt alle Properties müssen vorhanden sein
// im Objekt das von diesem neuen Mapped Type C<T> ist, wenn also type User = { id: number, name?: string } ist, führt type RequiredUser = Required<User> zu: type RequiredUser = { id:: number, name: string }.

// Antwort: Inhaltlich richtig.
// A entspricht ungefähr `Partial<T>`.
// B entspricht `Readonly<T>` – wichtig: der Utility Type heißt `Readonly` und nicht `ReadOnly`.
// C entspricht `Required<T>`.
// Bei deinem Beispiel würde `Required<User>` aus `name?: string` eine erforderliche Property `name: string` machen. Nur ein kleiner Tippfehler: `id: number` statt `id:: number`.


// 11. Führt ein Mapped Type Modifier irgendeine Runtime-Veränderung
// oder Runtime-Validierung eines Objekts durch?
// Antwort: Nein, der Mapped Type selbst validiert zur Runtime nichts. Er beschreibt nur einen neuen Compile-Time-Typ. Die tatsächliche Runtime-Validierung muss man weiterhin selbst durchführen.

// Antwort: Genau richtig. Mapped Types und ihre Modifier existieren nur im TypeScript-Typsystem und werden beim Kompilieren entfernt. Sie verändern oder validieren das tatsächliche JavaScript-Objekt zur Runtime nicht.



// Der zentrale Unterschied, der jetzt sitzen sollte, ist:
/*
type Transform<T> = {
    -readonly [K in keyof T]-?: T[K];
};

K in keyof T
→ Welche Properties entstehen?

T[K]
→ Welchen Typ bekommt ihr Wert?

-readonly
→ Darf die Property neu zugewiesen werden?

-?
→ Muss die Property vorhanden sein?
*/