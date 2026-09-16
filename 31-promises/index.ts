// Können Promises selbst erstellen mit:
// new Promise((resolve, reject) => {
//     if (success) {
//         resolve(...);
//     } else {
//         reject(...);
//     }
// });

// new Promise() erwartet dabei eine Funktion als Argument, die executor Funktion, z.B. new Promise(function(resolve) {...}); oder new Promise(function(resolve, reject) {...})
// Den Generic <User> kann TypeScript manchmal aus dem umgebenden Kontext ableiten,
// z.B. wenn die Funktion wie getUser() bereits Promise<User> als Rückgabetyp vorgibt.
// Direkt und eindeutig ist aber: new Promise<User>(...).
// bei beiden Varianten oben wird einfach eine Function erstellt, entweder nur mit Argument resolve (new Promise(function(resolve)) oder mit zwei Argumenten resolve und reject (new Promise(function(resolve, reject)) 
// aber es ist immer nur eine Funktion die an Promise übergeben wird

// in resolve() wird dann einfach geschrieben was im Erfolgsfall des Promise als Wert zurückgegeben werden soll, in getUser() z.B. ein User Objekt, in getUsers() ein bestimmtes Array und in getNumber() einfach nur eine Zahl
// Wichtig:
// resolve und reject definieren wir nicht selbst.
// JavaScript stellt diese beiden Funktionen beim Ausführen des Promise-Executors bereit. Also einfach callen und hineinschreiben was definiert werden soll, ist eigentlich wie wenn man einfach ein normales User Objekt, Array oder eine number erstellt,
// nur dass es eben wegen dem Promise nachträglich passieren kann. Ist eigentlich das gleiche wie const user01: User = { id: 1, name: "Lukas"} oder const users: User[] = [{ id: 2, name: "Anna"}, { id: 3,name: "Peter"}] oder const number01: number = 10;

// also im Body dieser executor-Funktion wird dann implementiert was bei einem resolve also Erfolg passiert und was bei einem Fehlschlag also reject, einfach wie gesagt mit resolve(Inhalt), reject(Inhalt)
// könnte theoretisch der executor-Funktion die man dem Promise übergibt btw. auch einen Namen geben, wenn man nicht Arrow Function Schreibweise benutzt sondern ausgeschriebene:
// new Promise(function executor(resolve, reject) {...});

// Promise heißt einfach dass die Daten nicht direkt verfügbar sind, wird bei API Calls, Datenbankzugriffen etc. benutzt weil es manchmal lädt, deswegen ist der Typ von getUser() z.B. nicht einfach User sondern Promise<User>, aber Typ User wird einfach
// genauso benutzt nur weil es ein Promise ist und dieser Promise ist vom Typ User

// die ganzen Functions die wir hier haben wie getUser(), getUsers() und getNumber() returnen einen Promise, und nicht direkt die Daten
// deswegen würde es nicht klappen direkt mit const user01 = getUser(); user01.name auf den Namen des Users zuzugreifen, weil user01 vom Typ Promise<User> wäre und nicht vom Typ User
// deswegen braucht man das .then noch, welches das erfolgreiche (nur das erfolgreiche!) Objekt aus resolve() bekommt (im Beispiel von user01 ist das user was in Callback Funktion benutzt wird also .then((user) =>) 
// das was in resolve steht, in diesem Fall das Objekt { id: 1, name: "Lukas"}) und ist in user bei .then((user))
// Aber Achtung: .then() returned wieder ein Promise, aber innerhalb des .then() in user01 ist es trotzdem schon ein echter User dieses user Objekt, und deshalb könenn wir da die name Property von user schon ausgeben
// Also: innerhalb des .then() liegen die Daten schon vor, aber außerhalb, sozusagen nach diesem .then() ist es wieder ein Promise weil .then() ein Promise returned
// wir schreiben ja "return user;" am Ende vom .then(), damit geben wir dieses "echte" User Objekt zurück und .then() packt es automatisch wieder in ein Promise, d.h. nach dieser Methode ist es wieder nicht mehr normal zugreifbar

// Wiederholung weil wichtig: das was in new Promise(executor-Funktion) in resolve() implementiert wird, wird dann im .then() als Argument mitgegeben wenn Promise erfolgreich ist
// Also beim Beispiel von getUsers(): im Promise legen wir executor Funktion fest mit resolve (von JavaScript vorgegeben/programmiert) und Array vom Typ User darin mit zwei Elementen die User sind
// dieses Array also was wir in resolve Methode schreiben, wird dann im .then(user) als das Argument "user" weitergegeben
// oder bei getNumber() ist im resolve einfach die Zahl 10 und wird als number dann im .then(number) verarbeitet (bei Erfolg!)
// also: const number01 = getNumber().then(("das was in resolve steht als Objekt") => {


type User = {

    id: number,
    name: string
};

function getUser(): Promise<User> {

    return new Promise((resolve) => {

        resolve(
            {
                id: 1,
                name: "Lukas"
            }
        );
    })
};

// Achtung: die () bei getUser nicht vergessen also getUser(), sonst geht .then() nicht weil man die Funktion garnicht aufruft!
const user01 = getUser().then((user) => {

    console.log(user.name);

    // returnen hier noch user, weil user01 sonst vom Typ Promise<void> ist, wenn man users noch returned dann vom Typ Promise<User> wie gewollt
    // und Achtung: man sieht .then() gibt wieder ein Promise zurück, also user01 ist auch noch nicht genau die Daten sondern wieder ein Promise, müsste nochmal mit .then() jetzt die Daten extrahieren!
    return user;
})


function getUsers(): Promise<User[]> {

    return new Promise((resolve) => {

        resolve(
            [
                {
                    id: 2,
                    name: "Anna"
                },
                {
                    id: 3,
                    name: "Peter"
                }
            ]
        )
    });
};

const users = getUsers().then((users) => {

    users.map((user) => {

        console.log(user.name)
    });

    // returnen hier noch users, weil users sonst vom Typ Promise<void> ist, wenn man users noch returned dann vom Typ Promise<User[]> wie gewollt
    return users;
});


function getNumber(): Promise<number> {

    return new Promise((resolve) => {

        resolve(10);
    });
};

const number01 = getNumber().then((number) => {

    console.log(number * 2);
})

// Argument of type 'string' is not assignable to parameter of type 'User | PromiseLike<User>'.
/*function getWrongUser(): Promise<User> {
    return new Promise((resolve) => {
        resolve("Lukas");
    });
}*/


const user = getUser();

// user ist nicht direkt ein User, sondern ein Promise<User>, deswegen kann man nicht direkt auf die name Property zugreifen und bräuchte noch .then()
//user.name;



// 1. Was bedeutet: Promise<string> ?
// Antwort: Das bedeutet, dass der Wert des Objekt was dieses Promise als Typ hat nicht sofort verfügbar ist sondern zeitversetzt/asynchron, was bei API-Calls, Datenbankaufrufe und anderen externen Aufrufen der Fall sein kann. 
// Deswegen kann man nicht nur den Typ string benutzen, sondern ein Promise.

// Antwort: Richtig. Promise<string> bedeutet: Das Promise wird bei erfolgreichem Abschluss später einen string als Erfolgswert liefern. Das Promise selbst ist nicht string, sondern eine asynchrone Hülle um den später verfügbaren string.


// 2. Was ist der Unterschied zwischen User und Promise<User> ?
// Antwort: Der Unterschied ist, dass User als Typ Daten direkt zur Verfügung stellt und ein Promise vom Typ User diese asynchron bereitstellt. Mit einem Promise muss mit resolve und reject für den Erfolgsfall und Fehlerfall 
// zwei Cases implementiert werden und die tatsächlichen Daten mit .then(Erfolgswert) extrahiert werden.

// Antwort: Im Kern richtig. User bedeutet: Der User-Wert ist direkt verfügbar. Promise<User> bedeutet: Der User wird später asynchron geliefert.
// Wichtig: Man muss nicht immer selbst resolve und reject implementieren. Viele APIs wie fetch() liefern bereits fertige Promises. resolve/reject braucht man hauptsächlich, wenn man selbst ein Promise mit new Promise(...) erstellt.
// .then(...) ist eine Möglichkeit, an den erfolgreichen Wert zu kommen.


// 3. Was macht resolve innerhalb eines Promises?
// Antwort: resolve ist eine Funktion die von JavaScript vorimplementiert ist und den Erfolgswert des Promis beinhaltet, der dann an .then(Erfolgswert) als Argument gegeben wird.

// Antwort: Fast richtig. resolve "beinhaltet" den Erfolgswert nicht, sondern ist eine von JavaScript bereitgestellte Funktion.
// Mit resolve(value) wird das Promise erfolgreich erfüllt und value wird zum Erfolgswert des Promises.
// Dieser Erfolgswert wird später an den Callback von .then(...) übergeben.


// 4. Warum ist das hier ein Fehler: const user = getUser(); user.name; wenn getUser() einen Promise<User> zurückgibt?
// Antwort: Das ist ein Fehler weil getUser() ein Promise vom Typ User returned aber kein Objekt mit Typ User. user ist also kein Objekt vom Typ User sondern ein Promise, weshalb auch nicht auf die Property name zugegriffen werden kann.

// Antwort: Genau richtig. user ist hier Promise<User> und nicht User. Deshalb existiert die Property name auf user selbst nicht.


// 5. Welchen Typ hat user innerhalb dieses Callbacks: getUser().then((user) => { ... }) ?
// Antwort: user hat den Typ User, da getUser ein Promise vom Typ User zurückgibt und in der resolve() Methode in getUser ein Objekt mit den Properties von User implementiert ist, was an .then(Erfolgswert) als Erfolgswert gegeben wird.

// Antwort: Richtig. Weil getUser() ein Promise<User> liefert, kennt TypeScript den Erfolgswert in .then(...) als User. Deshalb ist der Callback-Parameter user vom Typ User.


// 6. Warum muss bei Promise<User[]> resolve(...) ein Array aus gültigen User-Objekten bekommen?
// Antwort: resolve() muss immer einen Wert des Promise<Typ> Typen bekommen, weil es ja die Funktion, die den Promise returned mit diesem Typen typisiert ist, also weil z.B. function getUser(): Promise<User> { ... } 
// mit Promise<User> typisiert ist, muss in der resolve() Methode ein Wert von Typ User sein.

// Antwort: Richtig. Bei Promise<User[]> ist der Generic T = User[]. Deshalb erwartet resolve(...) einen Wert, der zu User[] passt.
// Also ein Array, dessen Elemente jeweils die User-Shape erfüllen.


// 7. Was ist der grundlegende Unterschied zwischen resolve und reject?
// Antwort: resolve beinhaltet den Wert im Fall eines erfolgreichen Promises, reject der einen fehlerhaften.

// Antwort: Richtig, präziser: resolve(value) markiert das Promise als erfolgreich erfüllt und setzt den Erfolgswert. reject(reason) markiert das Promise als fehlgeschlagen/rejected und übergibt den Fehlergrund.


// 8. Was passiert ungefähr bei folgendem Promise-Chaining?
/*
getName()
    .then((name) => {
        return name.toUpperCase();
    })
    .then((upperName) => {
        console.log(upperName);
    });
*/
// Antwort: hier wird name, also der Erfolgswert der in getName() welcher ein Promise von Typ string also Promise<string> zurückgibt, in then verarbeitet als String, getName() hat also ein Promise zurückgegeben mit einem String als Erfolgswert 
// was hier als name benutzt wird (Bezeichner frei wählbar), .toUpperCase() ist hier aufrufbar, weil innerhalb des .then name tatsächlich ein string ist, es wird aber als nächstes noch ein .then() aufgerufen weil nach dem .then-Block der Wert darin wieder als ein Promise ist zurückgegeben wird, 
// und im zweiten .then() wird dann das Ergebnis von name.toUpperCase() (was jetzt das resolve dieses Promises ist) wieder als Argument upperName genommen und ausgegeben.

// Antwort: Sehr gut verstanden. Präziser: getName() liefert Promise<string>. Im ersten .then(...) ist name deshalb ein string.
// Der Callback gibt mit return name.toUpperCase() einen string zurück. .then(...) verpackt diesen Rückgabewert automatisch in ein neues Promise<string>.
// Der zweite .then(...) bekommt dann dessen Erfolgswert als upperName, also den bereits großgeschriebenen String.