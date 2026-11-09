


























































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

// Antwort:


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

// Antwort:


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

// Antwort:


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

// Antwort:


// 5. Warum braucht man bei einer Assertion Function
// normalerweise kein if am Aufrufort?
// Antwort: Weil eine Assertion Function nicht wie ein Type Guard keinen Boolean returned, sondern innerhalb der Funktion zur Runtime einen typeof-Check macht und einen Fehler wirft, wenn dieser fehlschlägt.
// Somit hat man auch keinen else-Zweig wenn die Prüfung als falsch ausgeht.

// Antwort:


// 6. Was passiert zur Runtime,
// wenn die Assertion nicht erfüllt ist?
// Antwort: Wenn die Assertion zur Runtime nicht erfüllt wird, wird ein Runtime Fehler geworfen. Das ist nicht zu verwechseln mit einem Compile Fehler, der von TypeScript geworfen wird, wenn
// ein Typ nicht passt. Bei einer Assertion Function sagen wir TypeScript im Grunde, dass er wenn die Funktion zur Runtime (bzw. auch bei der Typzeit Prüfung in der ja der Runtime Code auch eine Rolle spielt)
// durchläuft, dass dann der Wert als bestimmter Typ behandelt wird. Ultimativ führt aber nicht dazu dass die Funktion zur Compile Zeit keinen Fehler wirft, sondern dass wir mit "asserts value is string" TypeScript
// sagen dass value als string behandelt werden soll. Das fehlerfreie Durchlaufen der Funktion spielt auch mit rein weil auch zur Compile Zeit der Runtime Code darin ja geprüft wird und beeinflusst,

// Antwort:


// 7. Warum ist eine Assertion Function
// nicht dasselbe wie:
/*
value as User
*/
// Antwort: Weil eine Assertion Function wenn richtig implementiert auch eine Runtime Prüfung beinhaltet, value as User ist nur eine Type Assertion also eine Behauptung dass der Typ als das behandelt werden soll. Obwohl dies auch durch
// asserts value is string nur behauptet wird, haben wir durch den Funktionsbody aber die Chance noch eine Runtime Prüfung einzubauen. Der Body beeinflusst zustätzlich auch ob ein Compile Fehler geworfen wird oder nicht. bei value as User
// wird weder zur Compile-Zeit noch zur Runtime der Typ geprüft.

// Antwort:


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

// Antwort:


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
// Antwort:

// Antwort:


// 10. Warum ist:
//
// assertDefined(user);
//
// typischerweise sicherer als:
//
// user!
//
// wenn user den Typ User | undefined besitzt?
// Antwort:

// Antwort:


// 11. Was bedeutet:
/*
asserts condition
*/
// im Unterschied zu:
/*
asserts value is User
*/
// Antwort:

// Antwort:


// 12. Was passiert hier?
/*
let name: string | undefined;

assert(name !== undefined);

// Welchen Typ hat name jetzt?
*/
// Antwort:

// Antwort:


// 13. Was bedeutet dieser Typ?
/*
[T, ...T[]]
*/
// und warum eignet er sich für assertNonEmpty?
// Antwort:

// Antwort:


// 14. Warum eignen sich Assertion Functions
// besonders für externe Daten wie API-Responses?
// Antwort:

// Antwort:


// 15. Wann würdest du eher einen Type Guard verwenden
// und wann eher eine Assertion Function?
// Antwort:

// Antwort:


// 16. Welche zwei Ebenen verbindet eine gute
// Assertion Function?
//
// 1.
// 2.
//
// Antwort: Die Tyypebene zur Compile Zeit und die Runtime Ebene. Es wird beides kombiniert und prüft beides theoretisch ob die Typen passen, nur dass zur Compile Zeit also Typebene wenn die Funktion durch
// Narrowing durchläuft direkt der Wert als bestimmter Typ geprüft wird ohne wirkliche Prüfung auf Typebene, TypeScript vertraut also der Aussage z.B. "asserts value is string" zur Compile Zeit, später können
// trotzdem zur Runtime Fehler auftreten nach der Funktion wenn der Runtime Check im Methodenbody nicht richtig implementiert wurde.

// Antwort: