// 1.

type Role =
    "admin"
    | "editor"
    | "viewer";


function getRoleLabel(role: Role): string {

    switch(role) {

        case "admin":
            return "Admin";
        case "editor":
            return "Editor";
        case "viewer":
            return "Viewer";
        default:
            return assertNever(role);
    }
}

function assertNever(role: never): never {

    throw new Error('Unexpected value: $(value)');
}


// 2.

// Fehler wenn man "moderator" ergänzt: Argument of type '"moderator"' is not assignable to parameter of type 'never'.
// -> TypeScript narrowed alle Typen im Union Typ Role, "moderator" ist am Ende übrig und nicht wie gewollt "kein Typ", was der Typ never ist
// somit wird assertNever mit "role: "moderator"" aufgerufen und nicht "role: never", somit wird Fehler geworfen

type Role2 =
    "admin"
    | "editor"
    | "viewer"
    | "moderator";


function getRoleLabel2(role: Role2): string {

    switch(role) {

        case "admin":
            return "Admin";
        case "editor":
            return "Editor";
        case "viewer":
            return "Viewer";
        case "moderator":
            return "Moderator";
        default:
            return assertNever2(role);
    }
}

function assertNever2(role: never): never {

    throw new Error('Unexpected value: $(value)');
}


// 3.

type Shape =
    | {
        kind: "circle";
        radius: number;
    }
    | {
        kind: "square";
        size: number;
    };


    function calculateArea(shape: Shape): number {

        if (shape.kind === "circle"){

            return shape.radius * 2
        }

        if (shape.kind === "square"){

            return shape.size * 2;
        }

        return assertNever(shape);
    }



// 4.

type Shape2 =
    | {
        kind: "circle";
        radius: number;
    }
    | {
        kind: "square";
        size: number;
    }
    | {
        kind: "rectangle";
        width: number;
        height: number;
    }

// Fehler wie oben, TypeScript narrowed die Typen des Union Typs Shape2 in calculateArea2, am Ende bleibt aber nicht never übrig sondern "{kind: "rectangle", width: number, height: number}"
// Argument of type '{ kind: "rectangle"; width: number; height: number; }' is not assignable to parameter of type 'never'.
    function calculateArea2(shape: Shape2): number {

        if (shape.kind === "circle"){

            return shape.radius * 2
        }

        if (shape.kind === "square"){

            return shape.size * 2;
        }

        if (shape.kind === "rectangle"){
            
            return shape.width * shape.height;
        }

        return assertNever(shape);
    }



// 5.

type ApiState<T> =
    | {
        status: "idle";
    }
    | {
        status: "loading";
    }
    | {
        status: "success";
        data: T;
    }
    | {
        status: "error";
        error: string;
    };


function getApiStateText<T>(state: ApiState<T>): string {

    switch(state.status) {

        case "idle":
            return "Idle";
        case "loading":
            return "Loading";
        case "success":
            return "Success";
        case "error":
            return "Error";
        default:
            return assertNever(state);
    }
}


// 6.

type ApiState2<T> =
    | {
        status: "idle";
    }
    | {
        status: "loading";
    }
    | {
        status: "success";
        data: T;
    }
    | {
        status: "error";
        error: string;
    }
    | {
        status: "cancelled";
    };


// Fehler wenn case "cancelled" fehlt: Argument of type '{ status: "cancelled"; }' is not assignable to parameter of type 'never'.
// Das übergebene Argument für assertNever() ist also nicht vom Typ never wie es aber laut "function assertNever(role: never): never { ... }" haben soll,
// sondern "role: "cancelled""

function getApiStateText2<T>(state: ApiState2<T>): string {

    switch(state.status) {

        case "idle":
            return "Idle";
        case "loading":
            return "Loading";
        case "success":
            return "Success";
        case "error":
            return "Error";
        case "cancelled":
            return "Cancelled";
        default:
            return assertNever(state);
    }
}



// 7.

type Action =
    | {
        type: "increment";
    }
    | {
        type: "decrement";
    }
    | {
        type: "set";
        value: number;
    };


function reducer(state: number, action: Action): number {

    switch (action.type){

        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        case "set":
            return action.value;
        default:
            return assertNever(action);
    }
}



// 8.

type ApiState3<T> =
    | {
        status: "idle";
    }
    | {
        status: "loading";
    }
    | {
        status: "success";
        data: T;
    }
    | {
        status: "error";
        error: string;
    }
    | {
        status: "cancelled";
    };


function getApiStateText3<T>(state: ApiState2<T>): string {

    switch(state.status) {

        case "idle":
            return "Idle";
        case "loading":
            return "Loading";
        case "success":
            return "Success";
        case "error":
            return "Error";
        case "cancelled":
            return "Cancelled";
        default:
            const exhaustiveCheck: never = state;
            return exhaustiveCheck;
    }
}



// 9.

// Siehe Verständnisfragen unten









// 1. Was bedeutet Exhaustive Checking
// im Zusammenhang mit Union Types?
// Antwort:
// Exhaustive Checking bedeutet im Zusammenhang mit Union Types, dass geprüft wird, ob alle möglichen Ausprägungen einer endlichen, unterscheidbaren Menge von Typvarianten im Code behandelt wurden.
//
// Zum Beispiel:
// type Role = "admin" | "editor" | "viewer";
//
// Hier gibt es genau drei mögliche Varianten.
//
// Breite primitive Typen wie `string` oder `number` können dagegen
// nicht durch endlich viele einzelne Cases vollständig abgearbeitet werden,
// weil sie sehr viele bzw. unbegrenzt viele mögliche Werte besitzen.
//
// Literal Unions wie:
//
// "admin" | "editor" | "viewer"
//
// oder:
//
// 1 | 2 | 3
//
// funktionieren dagegen problemlos.
//
// Bei einer Discriminated Union aus Objekttypen:
//
// type State =
//     | { status: "loading" }
//     | { status: "success"; data: string }
//     | { status: "error"; message: string };
//
// wird nicht direkt der gesamte Objekttyp verglichen, sondern meistens anhand einer gemeinsamen Discriminator-Property, hier `status`, genarrowed.
//
// In einem switch- oder if-Statement behandelt man die verschiedenen möglichen Varianten.
// TypeScript narrowt dabei den Typ nach und nach.
//
// Wenn wirklich alle möglichen Varianten behandelt wurden, bleibt danach keine mögliche Variante mehr übrig.
//
// Der Resttyp ist dann:
//
// never
//
// Genau das kann man für Exhaustive Checking benutzen.
//
// Zum Beispiel:
//
// default:
//     return assertNever(state);
//
// mit:
//
// function assertNever(value: never): never {
//     throw new Error("Unexpected value");
// }
//
// Der Parameter von `assertNever` verlangt einen Wert vom Typ `never`.
//
// Wenn alle Union-Varianten zuvor behandelt wurden, hat TypeScript `state` im default-Zweig bereits auf `never` genarrowed.
//
// Dann ist:
//
// assertNever(state)
//
// erlaubt.
//
// Wenn dagegen eine Variante vergessen wurde, z.B.:
//
// { status: "empty" }
//
// dann bleibt `state` im default-Zweig noch vom Typ:
//
// EmptyState
//
// und nicht:
//
// never
//
// Somit versucht man sinngemäß:
//
// assertNever(emptyState)
//
// aufzurufen, obwohl die Funktion nur:
//
// value: never
//
// akzeptiert.
//
// Dadurch entsteht bereits zur Compile Time bzw. beim Typecheck ein TypeScript-Fehler.
//
// Der große Vorteil gegenüber einem einfachen:
//
// default:
//     throw new Error(...);
//
// besteht darin, dass ein normaler Runtime-Error keinen Compile-Fehler erzeugt, wenn eine bekannte Union-Variante vergessen wurde.
//
// TypeScript würde dann sagen: "Diese Variante kann eben in den default-Zweig laufen."
//
// Man würde den Fehler deshalb möglicherweise erst zur Runtime bemerken, wenn tatsächlich genau dieser konkrete Wert verwendet wird.
//
// Mit `assertNever()` wird dagegen bereits beim Typecheck geprüft, ob wirklich keine bekannte Union-Variante mehr übrig ist.
//
// Exhaustive Checking hat damit vor allem eine Compile-Time-Aufgabe:
//
// bekannte Union-Varianten vollständig behandeln
// → Narrowing
// → keine Variante übrig
// → Typ wird never.
//
// `assertNever()` enthält häufig zusätzlich:
//
// throw new Error(...)
//
// Das ist eine Runtime-Absicherung.
//
// Der `never`-Parameter sorgt für die Compile-Time-Prüfung.
//
// Der `throw` sorgt dafür, dass zur Runtime ein Fehler entsteht, falls trotz der TypeScript-Prüfung ein unerwarteter Wert dort ankommt, beispielsweise durch ungültige externe Daten.
//
// Wichtig:
//
// Exhaustive Checking validiert externe Daten nicht automatisch.
//
// TypeScript-Typen existieren zur Runtime nicht mehr.
//
// Wenn externe Daten geprüft werden müssen, braucht man zusätzlich Runtime-Validierung, z.B. einen Type Guard oder eine Assertion Function.
//
// Merksatz:
//
// Exhaustive Checking prüft zur Compile Time:
//
// "Habe ich alle bekannten Varianten dieses Union-Typs behandelt?"
//
// `never` ist dabei der Beweis:
//
// "Es kann hier keine bekannte Variante mehr übrig sein."
//
// Der `throw` in `assertNever()` ist zusätzlich die defensive
// Runtime-Absicherung.

// Antwort: Genau richtig. Das ist eine sehr vollständige Beschreibung.
// Wichtig bleibt nur: TypeScript führt die Cases dabei nicht zur Compile Time aus,
// sondern analysiert auf Typebene den möglichen Runtime-Code-Kontrollfluss.
// `never` entsteht dann durch vollständiges Narrowing und wird der Variable nicht aktiv "zugewiesen".


// 2. Warum kann eine Variable nach vollständigem
// Narrowing den Typ never bekommen?
// Antwort: Weil auf Typebene die Ausprägungen des Typ den in einer Runtime Function die übergebene Variable hat jeweils geprüft werden entweder mit einem switch- oder einem if-Statement und wenn alle Member der Union ausgeschlossen wurden,
// ist keine mögliche Ausprägung mehr möglich und es wird never der Variable zugewiesen also wenn alle cases abgedeckt sind.

// Antwort: Die Grundidee stimmt, aber die Formulierung "never wird der Variable zugewiesen" ist wichtig zu korrigieren.
// Wir weisen der Variable nicht aktiv den Typ never zu.
// TypeScript narrowt ihren statischen Typ anhand des Runtime-Code-Kontrollflusses immer weiter.
// Wenn alle möglichen Union-Mitglieder ausgeschlossen bzw. behandelt wurden, bleibt keine mögliche Typvariante mehr übrig.
// Diesen unmöglichen Rest beschreibt TypeScript mit `never`.
// Der Runtime-Wert der Variable wird dabei überhaupt nicht verändert.


// 3. Was bedeutet der Parameter-Typ never hier?
/*
function assertNever(value: never): never {
    throw new Error();
}
*/
// Antwort: Der Parameter Typ heißt, dass die Funktion assertNever(), die ja nur im default-Branch oder nach dem Narrowing an sich aufgerufen wird, typseitig nur mit einem Wert aufgerufen werden können sollte, der eigentlich nicht möglich ist
// also wo der Typ der Variable durch narrowing zu never wurde nachdem alle Ausprägungen vorher genarrowed wurden.

// Antwort: Genau richtig.
// `value: never` bedeutet: Diese Funktion darf auf Typebene nur mit einem Wert aufgerufen werden,
// dessen statischer Typ bereits `never` ist.
// Damit prüfen wir indirekt, ob TypeScript vorher wirklich alle möglichen Varianten weggenarrowed hat.
// Bleibt z.B. noch `"viewer"` übrig, kann `"viewer"` nicht an einen Parameter vom Typ `never` übergeben werden.
// Dadurch entsteht der Compile-Time-Fehler.


// 4. Was bedeutet der Rückgabetyp never
// derselben Funktion?
// Antwort: Der Rückgabetyp never heißt, dass diese Funktion nie normal etwas zurückgeben soll, weil wenn wir in der Funktion sind, sollte die Variable never sein also keinen Typ haben. Wir werfen ja dann innerhalb per Runtime auch einen Fehler,
// aber auf Typebene ruft alleine die Zuweisung von never einen Compilefehler wenn die übergebene Variable nicht never sondern eine übrige Ausprägung hat also ein Typ übrig ist (z.B. type Role = "admin" | "developer" | "viewer", wenn
// nur für die ersten beide eine Implementation als Fall existiert und für die dritte nicht, bleibt Typ "viewer" übrig, was nicht never vom Typ ist und wirft somit Compilefehler)

// Antwort: Der erste Satz ist richtig: Der Rückgabetyp `never` bedeutet, dass die Funktion niemals normal zu ihrem Aufrufer zurückkehrt.
// In diesem Fall liegt das daran, dass sie immer `throw new Error()` ausführt.
//
// Wichtig ist aber die Trennung:
//
// Parameter:
// value: never
// → sorgt für die Exhaustive-Checking-Prüfung zur Compile Time.
//
// Rückgabetyp:
// : never
// → beschreibt, dass die Funktion zur Runtime niemals normal einen Wert zurückgibt.
//
// Der Compile-Fehler bei einer vergessenen Variante entsteht also wegen des PARAMETERS `value: never`,
// nicht wegen des Rückgabetyps `: never`.


// 5. Warum funktioniert folgendes als Exhaustive Check?
/*
default:
    return assertNever(state);
*/
// Antwort: Weil die Ausprägungen des Typs state (entweder dessen Ausprägungen direkt oder eine bestimmte Property wenn es ein Objekttyp ist) geprüft werden in den cases davor, wenn state hier ankommt, heißt es dass vorher kein case gepasst hat
// und somit noch ein Typ übrig ist. Dann wird assertNever() mit state aufgerufen, der vom Typ noch ein übrig gebliebener Typ ist, weil vorher nicht alle Typen weggenarrowed wurden, die Funktion assertNever() erwartet aber ein Argument vom Typ
// never, somit wirft es einen Compile Fehler. D.h. hier wird nichtmal der Body ausgeführt, dieser wird wenn dann zur Runtime ausgeführt wenn diese Prüfung schon passt!

// Antwort: Fast richtig, aber hier müssen wir Compile Time und Runtime sauber trennen.
//
// Auf Typebene analysiert TypeScript:
// Welche Typvarianten könnten den `default`-Zweig erreichen?
//
// Wenn alle Varianten vorher behandelt wurden:
// state: never
// → assertNever(state) ist erlaubt.
//
// Wenn z.B. noch ErrorState übrig ist:
// state: ErrorState
// → ErrorState ist nicht `never`
// → Compile-Time-Fehler.
//
// Zur Runtime gilt dagegen:
// `default` wird nur ausgeführt, wenn tatsächlich kein vorheriger case passt.
// Bei gültigen Daten aus einer vollständig behandelten Union sollte das nicht passieren.
// Der Body von assertNever() ist deshalb nur eine zusätzliche Runtime-Absicherung.


// 6. Angenommen:
//
/*
type State =
    | { status: "loading" }
    | { status: "success"; data: string }
    | { status: "error"; message: string };
*/
//
// Der switch behandelt nur:
// loading
// success
//
// Welchen Typ kann state im default-Zweig
// noch besitzen?
// Antwort: state kann dann im default-Zweig noch den Typ "error" besitzen, was überhaupt erst möglich macht, dass der default Zweig aufgerufen wird, weil noch kein case gepasst hat. Dadurch wird assertNever() mit einer Variable vom Typ
// "error" aufgerufen und nicht never, was zu einem Compiler Fehler führt! 

// Antwort: Fast richtig. `state` besitzt dort nicht den Typ `"error"`.
// `"error"` ist nur der Literal Type der Discriminator-Property `state.status`.
//
// `state` selbst wurde auf den gesamten Objekttyp genarrowed:
//
// {
//     status: "error";
//     message: string;
// }
//
// Wenn wir diesem Typ z.B. den Namen `ErrorState` gegeben hätten, wäre:
//
// state: ErrorState
//
// im default-Zweig.
// Da `ErrorState` nicht `never` ist, entsteht bei `assertNever(state)` ein Compile-Time-Fehler.


// 7. Warum würde TypeScript dann einen Fehler bei
// assertNever(state) melden?
// Antwort: state kann dann im default-Zweig noch den Typ "error" besitzen, was überhaupt erst möglich macht, dass der default Zweig aufgerufen wird, weil noch kein case gepasst hat. Dadurch wird assertNever() mit einer Variable vom Typ
// "error" aufgerufen und nicht never, was zu einem Compiler Fehler führt! D.h. hier wird nichtmal der Body ausgeführt, dieser wird wenn dann zur Runtime ausgeführt wenn diese Prüfung schon passt!

// Antwort: Genau, bis auf dieselbe Präzisierung wie bei Frage 6:
// `state` besitzt den gesamten verbleibenden Objekttyp:
//
// { status: "error"; message: string }
//
// und nicht lediglich `"error"`.
//
// `assertNever()` erwartet:
//
// value: never
//
// tatsächlich wird aber auf Typebene versucht:
//
// assertNever(state)
//             ↑
// { status: "error"; message: string }
//
// Dadurch entsteht bereits beim Typecheck ein Fehler.
// Der Funktionsbody von assertNever() muss dafür überhaupt nicht ausgeführt werden.


// 8. Was passiert,
// wenn alle Union-Mitglieder vollständig behandelt wurden?
// Welchen Typ besitzt die Variable dann
// im unerreichbaren Restpfad?
// Antwort: Dann wurden alle Typen von TypeScript weggenarrowed und die Variable besitzt dann den Typ never. Das ist aber nur theoretisch, da wenn zur Runtime ein case erfolgreich war, das switch-Statement beendet wird wenn returned wird.
// Somit würde man in dieses default nicht mehr kommen. Und wenn man reinkommt, gibt es schon zur Compile Zeit einen Fehler, der Fehler im Body von assertNever() würde also nie ausgeführt werden. Wenn die Typen passen, dann kann der Body
// zur Runtime ausgeführt werden wenn Daten unpassend sind.

// Antwort: Genau richtig.
// Wenn alle laut Typ erlaubten Varianten vollständig behandelt und die jeweiligen Codepfade beendet wurden,
// besitzt die Variable im Restpfad auf Typebene den Typ `never`.
//
// Bei gültigen Runtime-Daten aus dieser Union sollte dieser Restpfad tatsächlich nicht erreichbar sein.
//
// Der `throw` innerhalb von assertNever() kann aber trotzdem als defensive Runtime-Absicherung sinnvoll sein,
// z.B. wenn externe oder anderweitig unsichere Daten trotz der TypeScript-Typen einen ungültigen Wert enthalten.


// 9. Was ist der Unterschied zwischen:
/*
default:
    throw new Error("Unknown");
*/
// und:
/*
default:
    return assertNever(value);
*/
// im Hinblick auf Exhaustive Checking?
// Antwort: In der ersten Version prüfen wir nur ob zur Runtime Code Ausführug kein case passt und werfen einen Error.
// Beim zweiten prüfen wir ob der Typ von value am Ende never ist und somit ob für jede Ausprägung von value zum Runtime Code Kontrollfluss jeder Typ abgedeckt ist.

// Antwort: Genau richtig.
//
// `throw new Error()`:
// → reine Runtime-Absicherung.
// → TypeScript darf bekannte, nicht behandelte Union-Mitglieder einfach in den default-Zweig laufen lassen.
//
// `assertNever(value)`:
// → zusätzliche Compile-Time-Prüfung.
// → TypeScript muss beweisen können, dass `value` im Restpfad bereits `never` ist.
// → bleibt noch eine Union-Variante übrig, entsteht ein Typfehler.
//
// assertNever() enthält zusätzlich meist selbst einen `throw` und bietet damit auch die Runtime-Absicherung.


// 10. Warum ist Exhaustive Checking besonders praktisch
// bei Discriminated Unions?
// Antwort: 

// Antwort: Weil Discriminated Unions aus mehreren klar unterscheidbaren Typvarianten bestehen,
// die eine gemeinsame Discriminator-Property mit unterschiedlichen Literal Types besitzen.
//
// Beispiel:
//
// type State =
//     | { status: "loading" }
//     | { status: "success"; data: string }
//     | { status: "error"; message: string };
//
// Durch:
//
// state.status
//
// kann TypeScript eindeutig feststellen, welche Variante in welchem Zweig möglich ist.
//
// case "loading"
// → LoadingState
//
// case "success"
// → SuccessState
//
// case "error"
// → ErrorState
//
// Dadurch lassen sich die Union-Mitglieder sehr zuverlässig nacheinander narrowen.
// Wenn alle behandelt wurden, bleibt im Restpfad `never` übrig.
// Deshalb eignen sich Discriminated Unions besonders gut für Exhaustive Checking.


// 11. Welche Rolle spielt Narrowing
// beim Exhaustive Checking?
// Antwort:

// Antwort: Narrowing ist die eigentliche Grundlage des Exhaustive Checkings.
//
// TypeScript analysiert auf Typebene den Runtime-Code-Kontrollfluss und reduziert dabei,
// welche Union-Mitglieder in den jeweiligen Codepfaden noch möglich sind.
//
// Zum Beispiel:
//
// "admin" | "editor" | "viewer"
//
// nach Behandlung von "admin":
//
// "editor" | "viewer"
//
// nach Behandlung von "editor":
//
// "viewer"
//
// nach Behandlung von "viewer":
//
// never
//
// Erst weil TypeScript durch Narrowing alle möglichen Varianten ausschließen kann,
// kann am Ende geprüft werden, ob die Variable tatsächlich den Typ `never` besitzt.


// 12. Was würde passieren,
// wenn du einer bestehenden Discriminated Union
// später ein neues Mitglied hinzufügst,
// aber einen switch nicht aktualisierst?
// Antwort:

// Antwort: Dann bleibt die neu hinzugefügte Variante im Rest- bzw. default-Zweig als möglicher Typ übrig.
//
// Beispiel:
//
// type State =
//     | LoadingState
//     | SuccessState
//     | ErrorState
//     | EmptyState;
//
// Wenn der switch weiterhin nur loading, success und error behandelt,
// ist `state` im default-Zweig:
//
// state: EmptyState
//
// und nicht:
//
// state: never
//
// Dadurch ist:
//
// assertNever(state)
//
// nicht mehr erlaubt und TypeScript meldet bereits beim Typecheck einen Fehler.
//
// Genau das ist ein großer Vorteil von Exhaustive Checking:
// Wird eine Union später erweitert, werden Stellen sichtbar,
// an denen die neue Variante im Runtime-Code-Kontrollfluss noch nicht berücksichtigt wurde.


// 13. Welche zwei Aufgaben erfüllt
// eine assertNever-Funktion typischerweise?
//
// 1. Compile Time:
// 2. Runtime:
//
// Antwort:

// Antwort:
// 1. Compile Time:
// Der Parameter `value: never` zwingt TypeScript zu prüfen,
// ob die übergebene Variable durch das vorherige Narrowing tatsächlich bereits den Typ `never` besitzt.
// Ist noch eine Union-Variante übrig, entsteht ein Compile-Time-Typfehler.
//
// 2. Runtime:
// Der Funktionsbody wirft typischerweise einen Error.
// Dadurch existiert zusätzlich eine defensive Runtime-Absicherung,
// falls dieser eigentlich unerreichbare Codepfad trotzdem erreicht wird,
// z.B. durch ungültige externe Daten.
//
// Wichtig:
// Der Parameter `value: never` liefert die Exhaustive-Checking-Prüfung.
// Der `throw` liefert die Runtime-Absicherung.


// 14. Warum ist never hier etwas anderes als
// never in diesem Beispiel?
/*
type OnlyStrings<T> =
    T extends string
        ? T
        : never;
*/
// Antwort:

// Antwort: `never` bedeutet in beiden Fällen grundsätzlich dasselbe:
// Es gibt keinen möglichen Wert dieses Typs.
//
// Der Unterschied liegt darin, WIE `never` entsteht und wofür es benutzt wird.
//
// Beim Exhaustive Checking:
//
// TypeScript analysiert den Runtime-Code-Kontrollfluss.
// Durch vollständiges Narrowing werden alle möglichen Union-Mitglieder ausgeschlossen.
// Wenn nichts mehr übrig bleibt, wird der Typ der Variable im Restpfad zu:
//
// never.
//
// Bei:
//
// type OnlyStrings<T> =
//     T extends string
//         ? T
//         : never;
//
// wird `never` dagegen bewusst als Ergebnis eines Conditional Types verwendet,
// um unerwünschte Typen herauszufiltern.
//
// Beispiel:
//
// OnlyStrings<string | number | boolean>
//
// wird distributiv sinngemäß zu:
//
// string | never | never
//
// und daraus:
//
// string
//
// weil `never` aus einer Union verschwindet.
//
// Also:
//
// Exhaustive Checking:
// → never entsteht durch vollständiges Control-Flow-Narrowing.
//
// Conditional Type:
// → never wird als bewusstes Typergebnis verwendet,
//   um bestimmte Union-Mitglieder zu entfernen.
//
// Die Bedeutung von `never` selbst bleibt aber gleich:
// "Es existiert kein möglicher Wert dieses Typs."