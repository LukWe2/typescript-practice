// ACHTUNG: Immer unterscheiden, was zur Compile Time VOR der Runtime passiert und was erst bei der tatsächlichen Runtime-Ausführung passiert!
//
// TypeScript analysiert zur Compile Time auch den Funktionsbody einer Assertion Function aus Sicht des Typsystems.
//
// Beispiel:
//
// function assertString(
//     value: unknown
// ): asserts value is string {
//
//     if (typeof value !== "string") {
//         throw new Error("Value is not a string");
//     }
//
//     value.toUpperCase(); // ✅
//     value.toFixed(2);    // ❌ Compile-Time-Typfehler
// }
//
// TypeScript analysiert also auch innerhalb des Funktionsbodys:
//
// - welche Typen eine Variable besitzt,
// - ob durch if / typeof usw. genarrowed werden kann,
// - ob Propertyzugriffe und Methoden zum aktuellen Typ passen,
// - ob Zuweisungen typkompatibel sind,
// - welche Codepfade möglich sind.
//
// Im Beispiel:
//
// value startet als:
//
// unknown
//
// Durch:
//
// if (typeof value !== "string") {
//     throw ...
// }
//
// analysiert TypeScript zur Compile Time:
//
// Wenn der Code NACH diesem if noch erreicht wird, kann `value` kein Nicht-String mehr sein.
//
// Deshalb gilt innerhalb des weiteren Funktionsbodys:
//
// value: string
//
// Das ist normales Control-Flow-Narrowing innerhalb der Funktion.
//
// WICHTIG:
//
// Dieses Narrowing innerhalb des Funktionsbodys ist NICHT der Grund, warum beim AUFRUFER später ebenfalls genarrowed wird.
//
// Dafür ist die spezielle Assertion Signature verantwortlich:
//
// asserts value is string
//
// Diese Syntax erkennt TypeScript als Assertion Function.
//
// Sie sagt TypeScript:
//
// "Wenn diese Funktion normal zurückkehrt, dann darf das übergebene Argument danach als string behandelt werden."
//
// Beispiel:
//
// function process(value: unknown) {
//
//     assertString(value);
//
//     // Ab hier behandelt TypeScript value als string:
//
//     value.toUpperCase(); // ✅
// }
//
// Vor dem Aufruf:
//
// value: unknown
//
// Nach einem normal zurückgekehrten:
//
// assertString(value);
//
// gilt für TypeScript:
//
// value: string
//
// Der Grund dafür ist:
//
// asserts value is string
//
// und NICHT, dass TypeScript beim Aufrufer den Funktionsbody analysiert und daraus logisch beweist, dass value wirklich ein String sein muss.
//
// TypeScript vertraut der Assertion Signature.
//
// Deshalb könnte man theoretisch sogar eine falsche Assertion Function schreiben:
//
// function assertString(
//     value: unknown
// ): asserts value is string {
//
//     // Keine Runtime-Prüfung!
// }
//
// Dann:
//
// function process(value: unknown) {
//
//     assertString(value);
//
//     value.toUpperCase(); // ✅ für TypeScript
// }
//
// TypeScript narrowt trotzdem auf string, weil die Assertion Signature sagt:
//
// asserts value is string
//
// Zur Runtime wäre diese Implementierung aber unsicher.
//
// Wenn beispielsweise:
//
// process(42);
//
// aufgerufen wird:
//
// 1. assertString(42) läuft einfach durch.
//
// 2. TypeScript-Typen existieren zur Runtime nicht mehr.
//
// 3. Danach wird tatsächlich versucht:
//
// 42.toUpperCase()
//
// 4. Es entsteht ein Runtime-Fehler.
//
// Deshalb haben Assertion Functions zwei getrennte Aufgabenbereiche:
//
// COMPILE TIME / TYPE-EBENE:
//
// asserts value is string
//
// → spezielles Typversprechen an TypeScript.
//
// → Wenn die Funktion normal zurückkehrt,
//   narrowe das übergebene Argument auf string.
//
// → TypeScript vertraut dieser Aussage.
//
//
// RUNTIME:
//
// if (typeof value !== "string") {
//     throw new Error(...);
// }
//
// → tatsächliche Prüfung des konkreten Runtime-Werts.
//
// → Wenn der Wert kein String ist,
//   wird die weitere Programmausführung an dieser Stelle abgebrochen.
//
// → Wenn die Funktion normal zurückkehrt,
//   soll die Runtime-Wirklichkeit dadurch mit dem Typversprechen
//   `asserts value is string` übereinstimmen.
//
//
// WICHTIGER UNTERSCHIED:
//
// Der Funktionsbody wird von TypeScript zwar zur Compile Time aus Sicht des Typsystems analysiert.
//
// TypeScript prüft aber NICHT logisch:
//
// "Beweist dieser Body wirklich, dass `value` nachher garantiert ein string ist?"
//
// Das Versprechen:
//
// asserts value is string
//
// wird von TypeScript beim Aufrufer grundsätzlich akzeptiert.
//
// Der Entwickler ist dafür verantwortlich, dass die Runtime-Implementierung dieses Versprechen korrekt absichert.
//
//
// Merksatz:
//
// `asserts value is string`
//
// → ist der Grund für das Narrowing beim Aufrufer.
//
// Der Runtime-Check im Funktionsbody:
//
// typeof value !== "string"
//
// → ist dafür verantwortlich, dass dieses Typversprechen zur Runtime tatsächlich stimmt.
//
// TypeScript analysiert den Funktionsbody ebenfalls zur Compile Time, aber dieses interne Narrowing ist NICHT der Grund für das Narrowing beim Aufrufer.


























































// 1. Was ist eine Assertion Function
// und welches Problem löst sie?
// Antwort: Eine Assertion Function prüft für ein übergebenes Argument der Function ob dieses von einem bestimmten Typ ist, also ähnlich wie ein Type Guard.
// Der Unterschied ist, dass eine Assertion Function keinen Boolean zurückgibt, sondern dass wir nichts returnen, und wenn die Funktion durchläuft, dann gilt der Typ den wir in der Syntax festlegen nach dieser
// Assertion Function. Während bei einem Type Guard als Rückgabetyp z.B. "...: value is User { return ( ... )" festgelegt wird, wird bei einer Assertion Function z.B. "...: asserts value is string { ... }"
// geschrieben. Wenn die Funktion dann im Code für einen konkreten Wert wie eine Variable oder ein Objekt genutzt wird, kann TypeScript inferren bzw. narrowen innerhalb der Funktion,
// welcher Typ das übergebene Argument, was ursprünglich als Typ unknown definiert wird (z.B. function assertString(value: unknown): asserts value is String { ... })
// hat. Nach der Ausführung der Funktion mit einem bestimmten Wert als Argument kann TypeScript dann vor der Runtime zur Compiletime inferren, welcher Typ der übergebene Wert hat, in diesem Fall string oder nicht:
/*
function assertString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Value is not a string");
    }
}
--> wenn diese Funktion für einen konkreten Wert implementiert wird wie:
let value: unknown = "Hallo";

assertString(value);

// Ab hier weiß TypeScript: value ist vom Typ string und .toUpperCase() darf aufgerufen werden
value.toUpperCase();
--> dann kann TypeScript zur Compile Zeit, VOR der Runtime schon inferren dass value ein String ist und dass .toUpperCase() aufgerufen werden darf.
Also hier auch wieder die Unterscheidung: was prüft TypeScript schon zur Compile Zeit mit dieser assertString() Funktion wenn sie im Runtime Code implementiert ist, aber eben noch VOR der Ausführung. Das muss man
getrennt zur EIGENTLICHEN Runtime sehen!!!!!!!!!
*/

// Antwort: Grundidee richtig. Wichtig ist nur die Trennung:
// Der Runtime-Check im Body soll tatsächlich prüfen, ob der Wert ein String ist.
// Für das Narrowing BEIM AUFRUFER ist aber die Assertion Signature
// `asserts value is string` verantwortlich.
//
// TypeScript leitet beim Aufrufer nicht aus dem Body ab,
// dass `value` ein String ist.
// Es vertraut der Assertion Signature:
//
// Wenn assertString(value) normal zurückkehrt
// → behandle value danach als string.
//
// Deshalb besser "narrowen" statt "inferren":
//
// vorher: value: unknown
// nach assertString(value): value: string


// 2. Was bedeutet diese Signatur?
/*
function assertString(
    value: unknown
): asserts value is string
*/
// Antwort: Sie bedeutet dass hier eine assert-Function definiert wird. Diese bekommt value als Daten vom Typ unknown und der Rückgabetyp ist die spezielle assert-Syntax, die TypeScript sagt,
// dass nach der Funktion value als string behandelt werden soll. Innerhalb der Funktion also im Body prüft TypeScript zwar auch, aber nicht für die Prüfung von value dass es ein String ist für nach der Funktion
// D.h. es prüft wenn innerhalb des Bodies eine Implementation ist die Typen darin, aber der Body kann aber theoretisch falsch oder leer sein und nach der assert-Function wird value trotzdem als string
// behandelt wenn die Funktion durchläuft und im Body eben keine Typfehler auftreten. Es ist also nicht wie bei exhaustive checking, wo das Argument den Typ never bekommt und typseitig geprüft wird ob das übergebene
// Argument wirklich never ist, sonst Compile Fehler. Hier wird nur zur Runtime innerhalb geprüft wenn ein Fehler geworfen wird, sonst davon ausgegangen dass value String ist. Hier ist wieder eine komplexe Überschneidung
// von Runtime Code und Ablauf + Typprüfung zur Compile Zeit

// Antwort: Sehr gut. Zwei Präzisierungen:
//
// `asserts value is string` nennt man genauer Assertion Signature,
// nicht normalen Rückgabetyp.
//
// Außerdem hängt das Narrowing beim Aufrufer nicht davon ab,
// dass der Body "keine Typfehler" enthält.
// Die Aussage der Assertion Signature ist grundsätzlich:
//
// Wenn die Funktion normal zurückkehrt
// → narrowe das übergebene Argument auf string.
//
// Der Body kann logisch sogar falsch oder leer sein;
// TypeScript vertraut trotzdem dieser Signatur.
//
// Anders als bei assertNever(value: never) wird hier also nicht geprüft,
// ob das Argument beim Aufruf bereits string ist.
// `unknown` darf gerade absichtlich hineingegeben werden.


// 3. Welchen Typ besitzt value hier jeweils?
/*
function test(value: unknown) {

    // Typ hier?

    assertString(value);

    // Typ hier?
}
*/
// Antwort: beim ersten ist der Typ von value unknown, beim zweiten string, aber wichtig: man sagt TypeScript sozusagen dass es value als string behandeln soll, es findet typseitig vor der Compile Zeit keine
// Prüfung auf Typebene statt. Innerhalb des Bodys von assertString() ist wahrscheinlich wie oben eine Runtime Prüfung die eben auch nur zur Runtime Fehler wirft, wenn sie falsch ist oder garnicht existiert
// wird vor der Runtime also zur Compiletime kein Fehler geworfen.

// Antwort: Die Typen sind richtig:
//
// vor assertString(value):
// value: unknown
//
// danach:
// value: string
//
// Nur "es findet keine Prüfung auf Typebene statt" ist zu allgemein.
// TypeScript prüft den Code durchaus typseitig.
//
// Was NICHT geprüft wird, ist:
// "Ist value zur Compile Time wirklich ein String?"
//
// Stattdessen vertraut TypeScript der Assertion Signature.
// Der echte Wert wird erst durch den korrekt implementierten Body zur Runtime geprüft.


// 4. Was ist der Unterschied zwischen:
/*
function isUser(
    value: unknown
): value is User
*/
// und:
/*
function assertUser(
    value: unknown
): asserts value is User
*/
// Antwort: Das erste ist ein Type Guard was wie unten was eine Assertion Function eine Runtime Prüfung ist (wenn auch so implementiert, wenn falsch implementiert dann bei beiden bei beiden gefährlich weil
// es zur Runtime nicht prüft aber vorher zur Compile Time durchlässt fälschlicherweise)
// aber der Unterschied ist, dass bei einem Type Guard ein boolean zurückgegeben wird und basierend darauf entschieden wird, ob der geprüfte Wert als ein bestimmter Typ behandelt werden darf (also
// wie von TypeScript genarrowed wird), bei einer Assertion Function aber wenn die Funktion keinen Fehler wirft und durchläuft (bzw. wie dann genarrowed wird) entscheidet ob der Wert als bestimmter Typ
// behandelt werden kann

// Antwort: Genau richtig.
//
// Type Guard:
//
// value is User
//
// → Funktion liefert boolean.
// → Wenn sie `true` liefert, narrowt TypeScript im entsprechenden Kontrollflusspfad auf User.
//
// Assertion Function:
//
// asserts value is User
//
// → kein boolean für die Verzweigung nötig.
// → Wenn die Funktion normal zurückkehrt, wird danach auf User genarrowed.
//
// In beiden Fällen kann die Runtime-Implementierung falsch geschrieben werden.
// TypeScript vertraut dem expliziten Type Predicate bzw. der Assertion Signature.


// 5. Warum braucht man bei einer Assertion Function
// normalerweise kein if am Aufrufort?
// Antwort: Weil eine Assertion Function nicht wie ein Type Guard keinen Boolean returned, sondern innerhalb der Funktion zur Runtime einen typeof-Check macht und einen Fehler wirft, wenn dieser fehlschlägt.
// Somit hat man auch keinen else-Zweig wenn die Prüfung als falsch ausgeht.

// Antwort: Genau.
// Etwas präziser:
//
// Type Guard:
// if (isUser(value)) { ... }
//
// Assertion Function:
// assertUser(value);
// // danach User
//
// Der ungültige Fall wird innerhalb der Assertion Function typischerweise durch `throw` beendet.
// Deshalb gibt es am Aufrufort keinen normalen true-/false-Zweig.


// 6. Was passiert zur Runtime,
// wenn die Assertion nicht erfüllt ist?
// Antwort: Wenn die Assertion zur Runtime nicht erfüllt wird, wird ein Runtime Fehler geworfen. Das ist nicht zu verwechseln mit einem Compile Fehler, der von TypeScript geworfen wird, wenn
// ein Typ nicht passt. Bei einer Assertion Function sagen wir TypeScript im Grunde, dass er wenn die Funktion zur Runtime (bzw. auch bei der Typzeit Prüfung in der ja der Runtime Code auch eine Rolle spielt)
// durchläuft, dass dann der Wert als bestimmter Typ behandelt wird. Ultimativ führt aber nicht dazu dass die Funktion zur Compile Zeit keinen Fehler wirft, sondern dass wir mit "asserts value is string" TypeScript
// sagen dass value als string behandelt werden soll. Das fehlerfreie Durchlaufen der Funktion spielt auch mit rein weil auch zur Compile Zeit der Runtime Code darin ja geprüft wird und beeinflusst,

// Antwort: Der erste Teil ist richtig:
// Wenn der Runtime-Check fehlschlägt, wird typischerweise ein Error geworfen
// und der weitere Runtime-Kontrollfluss wird dort beendet.
//
// Wichtig:
// Zur Compile Time wird nicht geprüft, ob die Funktion mit einem späteren konkreten Wert "durchlaufen würde".
//
// TypeScript interpretiert `asserts value is string` statisch so:
//
// Wenn dieser Funktionsaufruf normal zurückkehrt,
// dann darf value danach als string behandelt werden.
//
// Ob der konkrete Runtime-Wert tatsächlich durchkommt,
// entscheidet erst die echte Runtime-Ausführung des Funktionsbodys.


// 7. Warum ist eine Assertion Function
// nicht dasselbe wie:
/*
value as User
*/
// Antwort: Weil eine Assertion Function wenn richtig implementiert auch eine Runtime Prüfung beinhaltet, value as User ist nur eine Type Assertion also eine Behauptung dass der Typ als das behandelt werden soll. Obwohl dies auch durch
// asserts value is string nur behauptet wird, haben wir durch den Funktionsbody aber die Chance noch eine Runtime Prüfung einzubauen. Der Body beeinflusst zustätzlich auch ob ein Compile Fehler geworfen wird oder nicht. bei value as User
// wird weder zur Compile-Zeit noch zur Runtime der Typ geprüft.

// Antwort: Grundidee genau richtig.
//
// `value as User`:
// → reine Type Assertion
// → keine Runtime-Prüfung
// → TypeScript wird angewiesen, den Wert entsprechend zu behandeln.
//
// Assertion Function:
// → Assertion Signature ist ebenfalls ein Typversprechen
// → ABER der Body kann und sollte dieses Versprechen durch echte Runtime-Validierung absichern.
//
// Präzisierung:
// Auch bei `value as User` prüft TypeScript gewisse grundsätzliche Kompatibilitätsregeln für Assertions.
// Aber es validiert nicht, ob der echte Runtime-Wert wirklich ein User ist.


// 8. Warum kann folgende Funktion gefährlich sein?
/*
function assertUser(
    value: unknown
): asserts value is User {
    // keine Prüfung
}
*/
// Antwort: Weil wenn man die Assertion Funktion assertUser() jetzt im Runtime Code implementiert (Achtung: wieder Trennung zum Ausführen davon, sind noch auf Typebene = Runtime Code Implementierung), dann geht TypeScript danach trotzdem davon aus, dass value vom Typ
// User ist, und lässt ggf. Funktionsaufrufe oder andere Operationen zu, die dann in der Runtime Code Ausführung (!= Runtime Code Implementierung) später Runtime Fehler werfen.

// Antwort: Genau richtig.
// Das ist ein sehr wichtiger Punkt.
//
// TypeScript sieht:
//
// asserts value is User
//
// und narrowt nach einem normalen Aufruf auf User.
//
// Da der Body aber nichts prüft,
// können Type-Ebene und Runtime-Wirklichkeit auseinanderfallen.
//
// Beispiel:
//
// assertUser(42);
//
// TypeScript danach:
// value: User
//
// Runtime:
// value ist weiterhin 42.
//
// Dadurch können später Runtime-Fehler entstehen.


// 9. Was macht:
/*
function assertDefined<T>(
    value: T
): asserts value is NonNullable<T>
*/
// beispielsweise bei:
//
// string | null | undefined
//
// Antwort: Hier wird der Utility Type NonNullable<T> mit einer Assertion Function kombiniert. Mit dieser Signatur sagt man TypeScript, dass wenn die Funktion normal durchläuft, dass dann value als non nullable also weder
// null noch undefined behandelt werden soll. Im Funktionsbody sollte dann ein wirklicher Check passieren, ob value null oder undefined ist, denn das "asserts value is NonNullable<T> prüft zur Compile Zeit nicht, ob value tatsächlich
// weder null oder undefined ist, sondern geht dann davon aus. Der Runtime Check sollte das dann eben zur Runtime sicherstellen, wenn dieser Runtime Check im Funktionsbody falsch implementiert ist, wird TypeScript trotzdem
// value als non nullable behandeln, heißt der Runtime Check muss richtig implementiert sein!

// Antwort: Genau richtig.
//
// Bei:
//
// T = string | null | undefined
//
// wird:
//
// NonNullable<T>
// → string.
//
// Vorher:
// value: string | null | undefined
//
// nach normalem:
// assertDefined(value)
//
// value: string.
//
// Der Body sollte zur Runtime tatsächlich null und undefined ausschließen.


// 10. Warum ist:
//
// assertDefined(user);
//
// typischerweise sicherer als:
//
// user!
//
// wenn user den Typ User | undefined besitzt?
// Antwort: Weil wenn user z.B. aufgrund einer Array Funktion wie .find() vom Typ User oder undefined also User | undefined ist, dann sagen wir z.B. mit user!.name TypeScript nur, dass es uns vertrauen soll und user nur als Typ User und nicht
// als undefined behandeln soll auf Typebene. Mit einer Assertion Funktion assertDefined(user) bauen wir dagegen eine Runtime Prüfung ein, die zur Runtime prüft, ob user tatsächlich weder undefined noch null ist (wenn richtig implementiert).
// Somit sagen wir nicht nur TypeScript dass es uns glauben soll, sondern prüfen es tatsächlich zur Runtime. Typseitig findet aber immernoch kein Check vor der Runtime also zur Compile Zeit statt, dass user nur vom Typ User ist und nicht
// undefined, heißt zur Runtime können immernoch Fehler geworfen werden.

// Antwort: Genau richtig.
//
// `user!`:
// → reine Behauptung an TypeScript
// → keine Runtime-Prüfung.
//
// `assertDefined(user)`:
// → Assertion Signature narrowt typseitig
// → Body prüft zusätzlich den echten Runtime-Wert.
//
// Deshalb ist die Assertion Function bei korrekter Implementierung sicherer.
//
// Wichtig:
// Dass zur Runtime ein Error geworfen werden kann, ist hier kein Fehler des Konzepts.
// Genau dieser Error verhindert, dass anschließend mit `undefined` weitergearbeitet wird.


// 11. Was bedeutet:
/*
asserts condition
*/
// im Unterschied zu:
/*
asserts value is User
*/
// Antwort: Mit asserts Condition kann dynamisch eine Prüfung beim Aufruf von der assert() Funktion als Argument definiert werden, die dann zur Runtime geprüft wird (und auch typseitig aber eben nur im Funktionsbody, nicht ausschlaggebend dafür,
// dass z.B. name dann als string behandlet wird). D.h. die Condition die als Argument definiert wird, wird dann im Funktionsbody geprüft zur Runtime statt eine feste Prüfung auf einen bestimmten Wert. Es ist eine Art Generic kann man sich vorstellen.

// Antwort: Grundidee richtig, aber `asserts condition` ist KEIN Generic.
//
// Beispiel:
//
// function assert(condition: unknown): asserts condition {
//     if (!condition) {
//         throw new Error();
//     }
// }
//
// Beim Aufruf:
//
// assert(name !== undefined);
//
// sagt die Assertion Signature:
//
// Wenn die Funktion normal zurückkehrt,
// darf TypeScript davon ausgehen,
// dass die übergebene Bedingung wahr ist.
//
// Dadurch kann TypeScript aus:
//
// name !== undefined
//
// ableiten:
//
// name: string.
//
// `asserts value is User` benennt dagegen direkt,
// auf welchen konkreten Typ ein Parameter genarrowed werden soll.


// 12. Was passiert hier?
/*
let name: string | undefined;

assert(name !== undefined);

// Welchen Typ hat name jetzt?
*/
// Antwort: name hat jetzt den Typ string, weil wir mit der assert() Funktion innerhalb implementiert haben, dass wenn die Funktion durchläuft (wie bei assertString() z.B.) dass dann name als diese Condition behandelt werden kann also nicht als undefined.
// In einer assert() Funktion ist also der Unterschied zu einer konkreten z.B. assertString() Funktion, dass man nicht schreibt "asserts name is String", sondern "asserts condition" und condition ist dann dynamisch als Argument definierbar

// Antwort: Genau richtig.
//
// Vorher:
//
// name: string | undefined
//
// Die Bedingung:
//
// name !== undefined
//
// wird an eine Funktion mit:
//
// asserts condition
//
// übergeben.
//
// Wenn `assert(...)` normal zurückkehrt,
// gilt diese Bedingung für TypeScript als wahr.
//
// Dadurch:
//
// name: string.


// 13. Was bedeutet dieser Typ?
/*
[T, ...T[]]
*/
// und warum eignet er sich für assertNonEmpty?
// Antwort: Das ist ein Typ für Arrays und sagt, dass dieses Array nicht leer sein darf also mindestens ein Element haben muss. Dieses Statement "[T, ...T[]]" wird dann als assert genommen also "asserts value is [T, ...T]". Im Funktionsbody sollte trotzdem
// zur Runtime implementiert werden, dass die Länge des übergebenen Arrays nicht 0 ist, damit TypeScript hier nicht nur uns vertraut, sondern wir mit einer richtig implementierten Runtime Prüfung das auch wirklich prüfen, halt erst zur Runtime und nicht zur Compile Time
// bzw. Typzeit. Hier sieht man dass Assertion Function snicht nur einfache Primitive narrowen wie String oder eine einfache Condition, sondern komplexe Typinformationen ausdrücken können.

// Antwort: Genau richtig, nur ein kleiner Syntaxfehler:
//
// richtig:
//
// asserts value is [T, ...T[]]
//
// nicht:
//
// asserts value is [T, ...T]
//
// `[T, ...T[]]` bedeutet:
//
// erstes Element: T
// danach: beliebig viele weitere T
//
// Dadurch ist mindestens ein Element garantiert.
//
// Eine passende Runtime-Prüfung wäre z.B.:
//
// if (value.length === 0) {
//     throw new Error("Array is empty");
// }


// 14. Warum eignen sich Assertion Functions
// besonders für externe Daten wie API-Responses?
// Antwort: Weil externe Daten für TypeScript zunächst nicht vertrauenswürdig sind. Bei einer API-Response weiß TypeScript zur Compile Time nicht, welche konkreten Daten der Server später zur Runtime tatsächlich zurückschickt.
//
// Deshalb ist eine echte Runtime-Prüfung wichtig, um Struktur und Datentypen der erhaltenen Daten zu validieren.
//
// Genau dafür eignen sich Assertion Functions:
// Im Funktionsbody kann eine echte Runtime-Prüfung durchgeführt werden, z.B. mit typeof, "in", Array.isArray() usw.
//
// Gleichzeitig enthält die Assertion Function eine Assertion Signature wie:
//
// asserts value is User
//
// oder:
//
// asserts value is string
//
// Diese sagt TypeScript auf der Type-Ebene:
//
// "Wenn diese Funktion normal zurückkehrt, darf das übergebene Argument danach als dieser Typ behandelt werden."
//
// TypeScript überprüft dabei nicht logisch, ob der Funktionsbody diese Behauptung wirklich korrekt beweist, sondern vertraut der Assertion Signature.
//
// Deshalb ist es Aufgabe des Entwicklers, den Runtime-Check im Funktionsbody korrekt zu implementieren, damit die tatsächlichen Runtime-Daten mit dem behaupteten Typ übereinstimmen.

// Antwort: Genau richtig.
// Das ist genau der typische Nutzen:
//
// externe Runtime-Daten
// → zunächst nicht vertrauen
//
// Runtime-Validierung
// → echten Wert prüfen
//
// Assertion Signature
// → TypeScript danach den geprüften Typ mitteilen.
//
// Besonders sinnvoll ist dabei oft,
// externe Daten zunächst als `unknown` zu behandeln.


// 15. Wann würdest du eher einen Type Guard verwenden
// und wann eher eine Assertion Function?
// Antwort: Einen Type Guard wenn beide Conditions in der Runtime Prüfung relevant sind und man bei false einen else-Zweig implementieren möchte, da beim Type Guard beide Fälle implementierbar sind, eine Assertion Function eher wenn ein falsches Ergebnis
// also wenn der Typ zur Runtime nicht das entspricht was wir wollen (und wir TypeScript mit der Assertion Signature gesagt haben dass es so ist) wenn dies einen Fehler werfen soll. Bei Type Guards wird ja zur Runtime true und false returned, bei
// Assertion Functions nichts, die Funktion läuft durch was TypeScript sagt dass danach auf den spezifizierten Typ genarrowed werden darf, bei Type Guards wenn die Runtime Prüfung true ergibt.

// Antwort: Genau richtig.
//
// Merksatz:
//
// Type Guard
// → Entscheidung
// → true und false sind normale mögliche Fälle.
//
// Assertion Function
// → Voraussetzung erzwingen
// → ungültiger Fall soll den normalen Kontrollfluss abbrechen.
//
// Type Guard:
//
// if (isUser(value)) { ... }
// else { ... }
//
// Assertion Function:
//
// assertUser(value);
// // ab hier User


// 16. Welche zwei Ebenen verbindet eine gute
// Assertion Function?
//
// 1.
// 2.
//
// Antwort: Die Tyypebene zur Compile Zeit und die Runtime Ebene. Es wird beides kombiniert und prüft beides theoretisch ob die Typen passen, nur dass zur Compile Zeit also Typebene wenn die Funktion durch
// Narrowing durchläuft direkt der Wert als bestimmter Typ geprüft wird ohne wirkliche Prüfung auf Typebene, TypeScript vertraut also der Aussage z.B. "asserts value is string" zur Compile Zeit, später können
// trotzdem zur Runtime Fehler auftreten nach der Funktion wenn der Runtime Check im Methodenbody nicht richtig implementiert wurde.

// Antwort: Die beiden Ebenen hast du genau richtig erkannt:
//
// 1. Type-Ebene / Compile Time
//
// Die Assertion Signature:
//
// asserts value is string
//
// sagt TypeScript:
// Wenn die Funktion normal zurückkehrt,
// narrowe das Argument auf string.
//
// TypeScript vertraut dieser Aussage;
// es beweist nicht logisch anhand des Bodys,
// dass der Wert wirklich ein String sein muss.
//
// 2. Runtime-Ebene
//
// Der Funktionsbody prüft den tatsächlichen konkreten Wert:
//
// if (typeof value !== "string") {
//     throw new Error();
// }
//
// Dadurch soll sichergestellt werden,
// dass die Runtime-Wirklichkeit mit dem Typversprechen übereinstimmt.
//
// Eine gute Assertion Function verbindet also:
//
// Compile-Time-Narrowing
// +
// echte Runtime-Validierung.