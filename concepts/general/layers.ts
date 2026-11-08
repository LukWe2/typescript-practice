// Gegeben:

type LoadingState = {
    status: "loading";
};

type SuccessState = {
    status: "success";
    data: string[];
};

type ErrorState = {
    status: "error";
    message: string;
};

type ApiState =
    | LoadingState
    | SuccessState
    | ErrorState;


const state01: ApiState = {
    status: "success",
    data: ["A", "B"]
};

function handleState(state: ApiState) {

    if (state.status === "success") {
        console.log(state.data);
    }
}


// 1. Was genau ist `ApiState`?
// Ist es ein Runtime-Wert oder ein Typ?
// Was beschreibt `ApiState`?

// Antwort: ApiState ist ein Typ, der als Union mehrere Typen beschreibt, wie ein Wert der diesen ApiState hat aussehen muss. Der Wert muss dann mindestens einer der
// Shapes also was die drei Typen als Properties beschreiben erfüllen, um valide zu sein.

// Antwort: Genau richtig.
// `ApiState` ist ein Union Type auf der Type-Ebene und existiert nur zur Compile Time.
//
// Er beschreibt die Menge der erlaubten Formen eines Werts:
//
// LoadingState
// ODER
// SuccessState
// ODER
// ErrorState.
//
// Ein Wert, dem der Typ `ApiState` zugewiesen wird,
// muss mit mindestens einem dieser Union-Mitglieder kompatibel sein.
//
// Präziser als "valide" wäre hier:
// Der Wert muss für TypeScript typkompatibel mit `ApiState` sein.


// 2. Was genau ist `state01`?
// Existiert `state01` zur Runtime?
// Und existiert `ApiState` zur Runtime ebenfalls noch?

// Antwort: state01 ist ein Objekt vom Typ ApiState, somit muss es eine der Typen die in der Union ApiState erfüllen und weil ApiState Objekttypen beschreibt muss state01
// ebenfalls ein Objekt sein, keine einzelne Variable oder Array etc. ApiState existiert zur Runtime nicht mehr, da Typen nur zur Compile Zeit existieren und nicht mehr zur Runtime.

// Antwort: Grundidee richtig.
// `state01` ist eine Variable, deren Wert ein konkretes Objekt ist.
// Dieser Wert existiert zur Runtime.
//
// TypeScript prüft vor der Runtime:
//
// Passt der Wert von `state01` zu `ApiState`?
//
// `ApiState` selbst existiert zur Runtime nicht mehr.
//
// Kleine Präzisierung:
// `state01` IST natürlich trotzdem eine Variable.
// Die Variable enthält hier einen Objektwert.
//
// Also:
//
// state01
// → Variable auf der Wertebene
//
// {
//     status: "success",
//     data: ["A", "B"]
// }
// → konkreter Objektwert
//
// ApiState
// → Compile-Time-Typ dieses Werts.


// 3. Was prüft TypeScript bereits vor der Runtime bei:
//
// const state01: ApiState = {
//     status: "success",
//     data: ["A", "B"]
// };
//
// Warum ist dieses Objekt mit `ApiState` kompatibel?

// Antwort: Es prüft ob state01 den Typ ApiState erfüllt. Da ApiState aber eine Union aus mehreren Typen ist, muss state01 mindestens einer dieser komplett erfüllen um keinen Fehler zu werfen zur Compile Zeit.
// Da state01 ein Objekt ist und eine Property status mit dem Literal String "success" besitzt, als auch eine Property data was ein String Array ist, und das genau den einen Member von ApiState beschreibt nämlich den
// type SuccessState, erfüllt es den Typ ApiState und wirft keinen Fehler.

// Antwort: Genau richtig.
// TypeScript prüft zur Compile Time,
// ob der Objektwert mit mindestens einem Union-Mitglied kompatibel ist.
//
// Hier:
//
// status: "success"
// data: string[]
//
// entspricht:
//
// type SuccessState = {
//     status: "success";
//     data: string[];
// };
//
// Deshalb ist der Wert mit `SuccessState` und damit auch mit `ApiState` kompatibel.
//
// Nur sprachlich:
// TypeScript "wirft" hier keinen Fehler zur Runtime,
// sondern der Type Checker würde bei einer falschen Zuweisung einen Typfehler melden.


// 4. Hat `state01` zur Runtime gleichzeitig die drei Formen
//
// LoadingState | SuccessState | ErrorState
//
// oder besitzt es zur Runtime nur eine konkrete Objektform?
// Erkläre den Unterschied zwischen dem Typ `ApiState`
// und dem konkreten Wert `state01`.

// Antwort: state01 ist ein Runtime Objekt und hat nur eine Form, nämlich die vom Typ SuccessState, da es nur die Shape dieses Typs erfüllt. Der Typ ApiState beschreibt wie ein Wert wie state01 aussehen muss,
// wenn dieser Wert diesen Typ hat. Der konkrete Wert state01 wird zur Compile Zeit vor der Runtime dann geprüft ob er den Typen ApiState erfüllt.

// Antwort: Genau richtig.
//
// Zur Runtime existiert nur der konkrete Wert:
//
// {
//     status: "success",
//     data: ["A", "B"]
// }
//
// Es gibt dort nicht mehr die TypeScript-Information:
//
// LoadingState | SuccessState | ErrorState.
//
// `ApiState` beschreibt zur Compile Time mehrere mögliche Formen.
// Der konkrete Runtime-Wert besitzt dagegen eine konkrete Struktur,
// die hier der Struktur von `SuccessState` entspricht.
//
// Wichtig:
// Zur Runtime weiß JavaScript nicht mehr:
// "Dieses Objekt ist ein SuccessState."
//
// Es sieht nur die tatsächlichen Properties und Werte des Objekts.


// 5. In:
//
// if (state.status === "success")
//
// was passiert zur Runtime?
// Was wird dabei tatsächlich geprüft?

// Antwort: Zur Runtime wird geprüft ob das übergebene Objekt state eine Property status mit Wert "success" besitzt. Dabei wird tatsächlich geprüft zur Compile Zeit schon, ob state in diesem Fall vom Typ
// SuccessState ist und das state überhaupt eine Property state besitzt und ob man dann theoretisch Stringmethoden auf der Property aufrufen kann.

// Antwort: Der erste Satz ist richtig, danach vermischst du Runtime und Compile Time etwas.
//
// Zur Runtime passiert ausschließlich die echte JavaScript-Prüfung:
//
// state.status === "success"
//
// Das bedeutet:
//
// 1. Der aktuelle Wert der Property `status` wird aus dem konkreten Objekt gelesen.
// 2. Dieser Runtime-Wert wird mit dem String `"success"` verglichen.
//
// Zum Beispiel:
//
// state = {
//     status: "success",
//     data: ["A", "B"]
// }
//
// Dann ist zur Runtime:
//
// state.status
// → "success"
//
// und:
//
// "success" === "success"
// → true.
//
// Deshalb wird der if-Block tatsächlich ausgeführt.
//
// Zur Runtime wird NICHT geprüft:
//
// "Ist state vom TypeScript-Typ SuccessState?"
//
// Denn `SuccessState` existiert zur Runtime überhaupt nicht mehr.
//
// Dass TypeScript innerhalb des if-Blocks `state` als `SuccessState` behandelt,
// ist eine zusätzliche Compile-Time-Analyse desselben Runtime-Codes.


// 6. Was macht TypeScript dagegen zur Compile Time
// mit genau derselben if-Bedingung?
//
// Warum weiß TypeScript innerhalb des if-Blocks,
// dass `state.data` existiert?

// Antwort: Zur Compile Zeit prüft TypeScript ob das übergebene state Objekt tatsächlich vom Typ ApiState ist und weiß innerhalb des if-Blocks dass sate.data existiert, weil über den Diskriminator was die Property status
// ist geprüft wird, ob state vom Typ SuccessState ist.

// Antwort: Fast richtig.
//
// Innerhalb der Funktion weiß TypeScript bereits aufgrund der Funktionssignatur:
//
// state: ApiState
//
// TypeScript analysiert dann zur Compile Time den Runtime-Code-Kontrollfluss:
//
// if (state.status === "success")
//
// und erkennt:
//
// `status` ist die Discriminator-Property der Union.
//
// Wenn dieser Codepfad erreicht wird,
// kann von:
//
// LoadingState | SuccessState | ErrorState
//
// nur noch:
//
// SuccessState
//
// übrig sein.
//
// Deshalb narrowt TypeScript innerhalb des if-Blocks:
//
// state: SuccessState
//
// und weiß dadurch:
//
// state.data: string[]
//
// existiert.
//
// Wichtig:
// TypeScript führt die if-Bedingung dabei nicht wirklich aus.
// Es analysiert nur,
// was diese Runtime-Bedingung für die möglichen Typen bedeutet.


// 7. Angenommen wir schreiben:
//
// const state02: ApiState = {
//     status: "success",
//     message: "Fehler"
// };
//
// Würde TypeScript das akzeptieren?
// Falls nein: Warum nicht?
// Und wann würde dieser Fehler festgestellt werden?

// Antwort: Es würde es nicht akzeptieren, weil state02 als Objekt nicht den Union Typen ApiState erfüllt, denn es erfüllt keinen der drei Typen die als Member der Union angegeben sind. Es hat eine Property status
// mit Wert "success" in Verbindung mit einer weiteren Propert message mit String-Wert "Fehler". Das passt zu keinen der drei Typen in der Union Type ApiState.
// Der Fehler wird schon vor der Runtime, zur Compile Zeit festgestellt werden.

// Antwort: Genau richtig.
//
// Durch:
//
// status: "success"
//
// kommt als passende Union-Variante eigentlich nur `SuccessState` infrage.
//
// `SuccessState` verlangt aber:
//
// data: string[]
//
// und nicht:
//
// message: string.
//
// Das Objekt erfüllt deshalb kein Union-Mitglied vollständig.
//
// TypeScript meldet diesen Typfehler bereits beim Typecheck vor der Runtime.


// 8. Formuliere zum Schluss selbst den Zusammenhang:
//
// ApiState
// → Type-Ebene
//
// state01
// → Wertebene / Runtime
//
// TypeScript-Check
// → Compile Time
//
// if (state.status === "success")
// → Runtime-Code, der zusätzlich von TypeScript zur Compile Time
//   für Narrowing analysiert wird.
//
// Antwort: ApiState ist ein Typ der nur zur Compilezeit existiert. Wenn ein Wert diesen Typ besitzt, muss dieser den Typen erfüllen. state01 besitzt diesen Typen und muss somit schon vor der Runtime diesen Typ
// erfüllen mit seiner konkreten Implementation. Wenn es ein Objekttyp ist, dann die konkreten Propertys mit deren Werten (allgemein oder Literals).

// Antwort: Richtig. Ich würde noch den letzten entscheidenden Teil ergänzen:
//
// `ApiState` existiert auf der Type-Ebene und beschreibt,
// welche Formen ein Wert besitzen darf.
//
// `state01` ist eine Variable auf der Wertebene,
// deren konkreter Objektwert zur Runtime existiert.
//
// Vor der Runtime prüft TypeScript,
// ob dieser konkrete Wert mit seinem angegebenen Typ `ApiState` kompatibel ist.
//
// Zur Runtime existiert `ApiState` nicht mehr.
// Dort existiert nur noch das JavaScript-Objekt.
//
// Runtime-Code wie:
//
// if (state.status === "success")
//
// wird zur Runtime tatsächlich ausgeführt und prüft den konkreten Wert von `state.status`.
//
// TypeScript analysiert denselben Runtime-Code aber zusätzlich bereits zur Compile Time,
// ohne ihn auszuführen,
// und leitet daraus Typinformationen ab:
//
// state: ApiState
//
// → Bedingung status === "success"
//
// → innerhalb dieses Codepfads:
//
// state: SuccessState.
//
// Genau hier sieht man die Verbindung:
//
// Runtime-Code bestimmt später die tatsächliche Code-Ausführung.
//
// TypeScript analysiert vorher den möglichen Runtime-Code-Kontrollfluss
// und nutzt ihn auf der Type-Ebene für Narrowing und Typprüfungen.

// Antwort: