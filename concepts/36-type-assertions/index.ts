// 1.

type User = {

    id: number,
    name: string,
    email: string
};

// 2.

const apiData: unknown = {

    id: 1,
    name: "Lukas",
    email: "lukas@example.com"
};

// sagen hier mit der Type Assertion nach dem eigentlich vom Typ unknown Objekt apiData, dass TypeScript dieses als vom Typ
// User behandeln darf 
const assertedUser = apiData as User;

// ohne den Typ Asstertion nach apiData Objekt was ja eigentlich vom Typ unknown ist, kam dieser Fehler für assertedUser:
// 'assertedUser' is of type 'unknown'.
console.log(assertedUser.name);
console.log(assertedUser.email);

const badApiData: unknown = {

    id: "2",
    title: "Wrong Property name/key for User Type and id has wrong type and email Property is missing completely"
};

// 3.

// Typ von wronglyAssertedUser ist: const wronglyAssertedUser: User, obwohl das Objekt badApiData nicht dem Typ User entspricht, das ist wegen dem
// Type Assertion badApiData as User, dadurch wird wronglyAssertedUser als User Objekt behandelt obwohl es keins ist
const wronglyAssertedUser = badApiData as User;

console.log(wronglyAssertedUser.name);
console.log(wronglyAssertedUser.email);

// 4.

function isUser(value: unknown): value is User {

    if (typeof value !== "object" || value === null){

        return false;
    }

    return (

        "id" in value && typeof value.id === "number"
        && "name" in value && typeof value.name === "string"
        && "email" in value && typeof value.email === "string"
    )
};

const unknownData = apiData;

if (isUser(unknownData)){

    console.log(unknownData.name);
    console.log(unknownData.email);
}


// 5.

const user01: User = {

    id: 1,
    name: "Lukas",
    email: "lukas@example.com"
};

const user02: User = {

    id: 2,
    name: "Anna",
    email: "anna@example.com"   
};

const user03: User = {

    id: 3,
    name: "Peter",
    email: "peter@example.com"   
};

const userArray: User[] = [user01, user02, user03];

const user01FindNoNonNullAssertion = userArray.find((user) => user.id === 1);
// Typ von user01Find ohne Non-Null Assertion: const user01FindNoNonNullAssertion: User | undefined

// 6.

if (user01FindNoNonNullAssertion !== undefined){

    // Typ innerhalb dieses if-Statements: const user01FindNoNonNullAssertion: User (vgl. mit außerhalb: const user01FindNoNonNullAssertion: User | undefined)
    user01FindNoNonNullAssertion.name;
}


// 7.

// mit Non-Null Assertion sagen wir hier TypeScript dass davon ausgegangen werden soll, dass das was rechts nach user01FindWithNonNullAssertion,
// also der gesuchte User, nicht null oder undefined sein kann
const user01FindWithNonNullAssertion = userArray.find((user) => user.id === 1)!;
// Typ von user01Find mit Non-Null Assertion: const user01FindWithNonNullAssertion: User

user01FindWithNonNullAssertion.name;

// 8.

// suchen jetzt nach einem User mit id = 4 der garnicht existiert, da aber Non-Null Assertion hinter dem Audruck steht, geht TypeScript davon aus
// dass es nicht null oder undefined ist, aber nonExistentUserFindWithNonNullAssertion ist hier eigentlich undefined weil er nicht gefunden werden kann

//const nonExistentUserFindWithNonNullAssertion = userArray.find((user) => user.id === 4)!;

// trotz dessen dass der User nicht existiert und nonExistentUserFindWithNonNullAssertion undefined ist, kann man hier noch auf den Namen ohne Fehler zugreifen
// zur Laufzeit/Runtime würde es hier zum Fehler kommen im Programm

//nonExistentUserFindWithNonNullAssertion.name;


// 9.

const value: unknown = 25;

// TypeScript glaubt hier: valueTypeAssertion: string, obwohl 25 ja eine number ist
const valueTypeAssertion = value as string;

// in TypeScript hier ist der Typ von valueTypeAssertion: const valueTypeAssertion: string wegen der Type Assertion value as string
// in der Ausgabe ist aber typeof valueTypeAssertion gleich number, was zeigt dass diese Type Assertion die Variable nur zur Typzeit zu einem string macht und zur Runtime in JavaScript eine number ist
console.log(valueTypeAssertion);
console.log(typeof valueTypeAssertion);


const valueDirectConversion = String(value);

// hier wird value tatsächlich zu einem String umgewandelt und ist auch zur Laufzeit noch ein string was console.log(typeof valueDirectConversion); beweist
console.log(valueDirectConversion);
console.log(typeof valueDirectConversion);



// 1. Was macht eine Type Assertion wie const username = value as string, und was macht sie ausdrücklich NICHT?
// Antwort: Sie sagt TypeScript dass die Variable als string behandelt werden soll und keinen Fehler werfen soll, aber sie setzt nicht zur Runtime die Variable auf ein string, nur zur Typzeit.

// Antwort: Richtig. Genauer: `as string` weist TypeScript an, den Wert statisch als `string` zu behandeln. Die Assertion führt keine Runtime-Prüfung und keine Konvertierung durch. Der tatsächliche JavaScript-Wert bleibt unverändert.


// 2. Was ist der entscheidende Unterschied zwischen einem Type Guard und einer Type Assertion?
// Antwort: Der Type Guard prüft zur Runtime also Laufzeit ob eine Variable von einem bestimmten Typ (einfach oder komplex also string oder User) ist, eine Type Assertion sagt eben nur zur Typzeit dass diese Variable als bestimmter Typ behandelt werden darf

// Antwort: Richtig. Kleine Präzisierung: Bei komplexen TypeScript-Typen wie `User` kann die Runtime nicht direkt prüfen „ist das ein User?“, weil `type User` zur Runtime nicht mehr existiert. 
// Der Type Guard prüft stattdessen echte Runtime-Eigenschaften wie `typeof value === "object"`, vorhandene Properties und deren Typen und teilt TypeScript über `value is User` das Ergebnis mit. Eine Type Assertion führt überhaupt keinen solchen Check durch.


// 3. Warum kann folgender Code zur Runtime fehlschlagen, obwohl TypeScript keinen Fehler anzeigen muss?
/*
const value: unknown = 42;
const username = value as string;
console.log(username.toUpperCase());
*/
// Antwort: Weil wir mit value as string sagen dass value zur Typzeit als string behandelt werden darf, aber das gilt nicht zur Runtime, dort ist value eine number und wirft Fehler wenn eine string-Methode darauf aufgerufen wird wie .toUpperCase().

// Antwort: Genau richtig. `as string` verändert die `42` nicht. TypeScript erlaubt deshalb `.toUpperCase()`, aber zur Runtime wird effektiv versucht, `42.toUpperCase()` auszuführen, was zu einem Fehler führt.


// 4. Was ist der Unterschied zwischen diesen beiden Ausdrücken?
/*
value as string
String(value)
*/
// Antwort: Das erste ist eine Type Assertion, das untere eine Type Conversion, bei der value wirklich zu einem string umgewandelt wird zur Runtime/Laufzeit, beim oberen nur zur Typzeit als ein string behandelt wird aber zur Runtime wieder sein richtiger Typ ist.

// Antwort: Genau richtig. `value as string` beeinflusst nur TypeScripts statische Sicht auf den Wert. `String(value)` führt dagegen echten JavaScript-Code zur Runtime aus und erzeugt tatsächlich einen String. 
// Bei `value = 25` bleibt `value as string` zur Runtime die Zahl `25`, während `String(value)` den String `"25"` erzeugt.


// 5. Welchen Typ hat user normalerweise nach folgendem Code und warum?
/*
const user = users.find((user) => user.id === 1);
*/
// Antwort: User hat den Typ User | undefined, weil der User auch nicht existieren kann. Wenn es nur User sein soll, kann man eine Non-Null Assertion machen, die sagt dass es ein User ist und nicht null oder undefined, 
// aber zur Laufzeit kann user dann trotzdem undefined sein wenn er nicht existiert.

// Antwort: Genau richtig. `.find()` kann kein passendes Element finden und gibt dann `undefined` zurück, deshalb `User | undefined`. Mit `!` wird `undefined` nur aus dem statischen Typ entfernt; der Runtime-Wert wird dadurch nicht verändert. 
// Sicherer ist normalerweise ein echter Check, wenn das Vorhandensein nicht garantiert ist.


// 6. Was bedeutet die Non-Null Assertion in folgendem Code?
/*
const user = users.find((user) => user.id === 1)!;
*/
// Antwort: Sie bedeutet dass user als User behandelt werden darf von TypeScript und zur Laufzeit aber trotzdem undefined sein kann.

// Antwort: Richtig. Das `!` sagt TypeScript konkret: „Entferne `null` und `undefined` aus dem Typ dieses Ausdrucks.“ Aus `User | undefined` wird hier deshalb `User`. Es wird aber nicht geprüft, ob tatsächlich ein User gefunden wurde.


// 7. Warum kann ! gefährlich sein, obwohl TypeScript danach den möglichen null-/undefined-Fall nicht mehr bemängelt?
// Antwort: Weil zur Laufzeit die Variable, Objekt oder Array trotzdem undefined oder null sein kann und nur zur Typzeit der Typ ist der es vor dem Ausrufezeichen ist.

// Antwort: Inhaltlich richtig. Präziser: `!` entfernt `null` und `undefined` nur aus TypeScripts statischem Typ. Es verändert oder überprüft den tatsächlichen Runtime-Wert nicht. 
// Wenn der Wert entgegen unserer Behauptung doch `undefined` oder `null` ist, kann ein anschließender Property- oder Methodenaufruf zur Runtime fehlschlagen.


// 8. Was ist der Unterschied zwischen user! und !user?
// Antwort: user! ist eine Non-Null Assertion, !user ist ein Logical NOT also kehrt von true auf false.

// Antwort: Fast vollständig richtig. `user!` ist die TypeScript Non-Null Assertion und entfernt statisch `null`/`undefined`. `!user` ist JavaScripts Logical-NOT-Operator: Er betrachtet `user` nach Truthy/Falsy-Regeln und gibt den entgegengesetzten Boolean zurück. 
// Er funktioniert also nicht nur mit `true` und `false`, z.B. ergibt `!0` ebenfalls `true` und `!"Lukas"` ergibt `false`.


// 9. Wann würdest du einen echten Check bzw. Type Guard gegenüber as oder ! bevorzugen?
// Antwort: Echten Check wenn sicher zur Laufzeit geprüft werden soll, as wenn man aus dem externen Kontext sicher sagen kann dass der Typ von as ... ist und ! wenn man garantieren kann, dass der Wert nicht null oder undefined ist

// Antwort: Genau richtig. Einen Runtime-Check bzw. Type Guard sollte man bevorzugen, wenn der Wert tatsächlich unsicher ist, besonders bei externen Daten. `as` ist sinnvoll, 
// wenn man aus einem verlässlichen Kontext mehr über den Typ weiß als TypeScript. `!` sollte man nur verwenden, wenn wirklich garantiert ist, dass der Wert nicht `null` oder `undefined` sein kann.