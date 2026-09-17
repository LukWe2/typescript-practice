// haben immernoch getUser() Methode, in der Promise von uns manuell erstellt wird und die von JavaScript vorimplementierte resolve() und reject() Methode implementiert wird mit dem Erfolgswert des Promises
// jetzt der Unterschied: in letztem Konzept haben wir diesen Erfolgswert dann mit getUsers().then((users) => { geholt, users war hier dieser Wert der in resolve implementiert wurde (der Erfolswert), in reject einfach wenn es fehlgeschlagen ist
// innerhalb von .then() wurde dann das vorher zurückgegebene Promise in den Wert, den das Promise hat also z.B. String bei Promise<string> oder User bei Promise<User> umgewandelt, aber .this() returned am Ende wieder ein Promise, also nur innerhalb des .then ist es 
// wirklich dieser "wahre" Wert ohne Promise

// mit async und await kann man Schreibweise vereinfachen: async vor die Methode, die die Erfolgs- und Fehlschlagwerte verarbeiten und die ein Promise<> zurückgibt
// Und am wichtigsten: das was vorher vor das .then() kam also die Funktion die vorher ein Promise returned hat (wie getUsers() oder .then()), wird jetzt in ein Objekt direkt gespeichert also statt getUsers().then((users) => ... jetzt: const users = await getUsers()
// await wird jetzt vor der Funktion geschrieben die den Promise liefert, da await den Erfolgswert aus diesem Promise holt, so wie .then() es vorher gemacht hat, jetzt nur lesbarer
// also await vorher um den Erfolgsfall zu bekommen aus der Funktion die den Promise liefert und danach steht, und das in einem try{} Block, und im catch (error){} Block dann noch den Fehlerfall abfangen
// also pragmatisch gesagt: das was vorher als Argument in .then() stand wie .then(users), wird jetzt als Objekt vorher geschrieben also const users = ... , und das was vor dem .then() stand also die Funktion die den Promise erst liefert wird danach geschrieben
// und mit await, da await den Erfolgsfall des Promise zurückliefert, dazu noch im try-Block und danach noch ein catch-Block für den Fehlschlagfall

// hat in diesem File: 
// 1. eine Funktion getUser, die einen manuellen Promise erstellt und mit resolve() und reject() zurückgibt also Implementatione für den Erfolgsfall und den Fehlschlagfall des Promise
// 2. hat eine async Funktion main() und eine async Funktion getUserName(), die beide einen anderen Promise (async function main(): Promise<void>, async function getUserName(): Promise<string>) zurückgeben als die getUser() Funktion die für den Promise benutzt werden
// weil: sie holen sie das User Objekt aus getUser() (ist dort in resolve() Methode implementiert, das { id: 1, name: "Lukas"} ist das User Objekt) 
// mit await getUser(success), machen mit diesem User Objekt was in ihrem Body und returnen wegen async dann selbst wieder ein Promise, da eine async Methode immer auch selbst wieder ein Promise returned

// -> haben getUser(success) Funktion, die einen Promise<User> returned mit resolve() und reject(), die die Daten die beim Erfolgsfall und beim Fehlschlag zurückgegeben werden (im Erfolgsfall eben genau das Objekt in resolve was dann der returnte User ist für Promise<User>)
// -> in den async Funktionen wird die getUser(success) Methode aufgerufen mit await innerhalb eines try-Blocks, denn await liefert den Erfolgsfall des Promise von getUser() also Promise<User>, wenn also erfolgreich wird den async Funktionen der {id: 1, name: "Lukas"}
// als User gegeben, const user = await getUser(true); ist also im Erfolgsfall dann const user = { id: 1, name: "Lukas"};!!
// -> innerhalb der async Funktionen kann man damit machen was man will, man hat dann diesen User mit id: 1 und name: "Lukas", in async function main() wird damit einfach der name aus diesem User Objekt genommen und geprintet, in async function getUserName() wird auch der
// name des User bzw. die Property genommen und auch geprintet, hätte noch diese Funktion schreiben können:
/*
async function processUserID(): Promise<number> {

    try {

        const user = await getUser(true); // erst wieder User holen aus getUser()

        const userId = user.id; // geht innerhalb dieser Funktion weil wir jetzt aus dem Promise<User> (was mit await getUser() geholt wurde) den Erfolgsfall haben was eben der User im resolve() von getUser() stand

        return user.id + 1; // kann damit jetzt machen was man will
    } catch (error) {
     
        if (error instanceof Error){

            console.log(error.message);
        }

        // throw new Error returned immer einen fehlgeschlagenen Promise, sonst gibt es einen Fehler weil nicht number returned wurde, wenn aber Promise fehlgeschlagen ist, ist Methode auch zu Ende und man braucht kein return
        throw new Error("Could not get User ID!");
    }
}
*/
// ABER WICHTIG: processUserID() returned jetzt wieder ein Promise automatisch (wie .then() im letzten Konzept), deswegen müssen die async-Funktionen auch wieder einen Promise<> zurückgeben (wie Promise<void> für async function main(): Promise<void>
// oder Promise<string> für async function getUserName(): Promise<string>)!


// Zusammengefasst:
// - await liefert den Erfolgsfall (also das resolve()) des Promises (der aufgerufenen Funktion, hier getUser())
// hier: bei const user = await getUser(true): getUser() implementiert in sich ein Promise vom Typ User, im Erfolgsfall (das was in resolve() implementiert ist) wird ein Objekt { id: 1, name: "Lukas"} was vom Typ User ist, in const user gepackt
// - Genau dieses „Promise auflösen mit await → mit normalem Wert arbeiten → async-Funktion verpackt Rückgabe wieder in Promise“ ist der zentrale Mechanismus.
// -> await holt sich Erfolgsfall (das was in resolve() vom Promise steht), diesen "normalen" Wert kann man dann in dieser Methode verwenden, async Funktion returned aber wieder selbst ein Promise
// aber siehe: Bei const user = await getUser(true); ist user vom Typ User, heißt man kann jetzt im Code diesen Wert normal nutzen, bei const userPromise = getUser(true); ist userPromise nur ein Promise<User>
// verwirrend: 



type User = {

    id: number,
    name: string
};

function getUser(success: boolean): Promise<User> {

    return new Promise<User>((resolve, reject) => {

        if (success === true){

            resolve(
                {
                    id: 1,
                    name: "Lukas"
                }
            )
        };

        if (success === false){

            reject(new Error("Could not load user!"));
        }
    });
};


async function main(): Promise<void> {

    try {

        // bei Hover über user: "const user: User"
        const user = await getUser(true);

        const name = await getUserName();

        console.log(`User name: ${user.name} and seperate name: ${name}`);

    } catch (error){

        if (error instanceof Error){

            console.log(error.message);
        }
    }
};

main();


async function getUserName(): Promise<string> {

    try {

        const user = await getUser(true);

        return user.name;

    } catch (error) {

        if (error instanceof Error){

            console.log(error.message);
        }

        throw new Error("Could not get User Name");
        // throw new Error returned immer einen fehlgeschlagenen Promise, sonst gibt es einen Fehler weil nicht string returned wurde, wenn aber Promise fehlgeschlagen ist, ist Methode auch zu Ende und man braucht kein return
        //return "";  
    }
};

// ACHTUNG: Ohne ein Setup, das Top-Level await erlaubt wie das Projekt gerade, würden diese await-Aufrufe außerhalb einer async-Funktion nicht funktionieren:
// Dann müsstest du sie in eine async-Funktion packen wie main() oben.

// dieser Aufruf hier liefert nur ein Promise<User>, weil das await fehlt, das den Erfolgsfall (das User Objekt { id: 1, name: "Lukas"} aus der resolve() Methode im Promise) holt, somit kann man auch nicht auf die name Property des Objekts zugreifen
const userPromise = getUser(true);
// Property 'name' does not exist on type 'Promise<User>'. Did you forget to use 'await'?
//userPromise.name;

// hier kann man auf die name Property zugreifen, weil await genutzt wurde, was tatsächlich das User Objekt (den Erfolgswert der in der resolve() Methode in new Promise implementiert ist) returned
const user = await getUser(true);

user.name;


// genauso hier:
// bei Hover über namePromise: "const namePromise: Promise<string>"
const namePromise = getUserName();

// bei Hover über namePromise: "const name: string", also auch hier holt await den Erfolgswert des Promises, in diesem Fall das was im try steht also user.name
const name = await getUserName();



// 1. Was bewirkt das Schlüsselwort async vor einer Funktion?
// Antwort: async bewirkt, dass die Funktion asynchron sein kann, also dass sie auf ein Promise innerhalb der Funktion warten kann und dann mit await dessen Erfolgswert innerhalb eines try-Blocks erhalten kann, oder den Fehler innerhalb des catch-Blocks auffangen kann.
// async Funktionen gibt immer ebenfalls ein Promise zurück, also der Typ der Rückgabe muss Promise<> sein.

// Antwort: Richtig. async sorgt vor allem dafür, dass die Funktion immer ein Promise zurückgibt und dass innerhalb der Funktion await verwendet werden kann. try/catch ist dabei optional, aber sinnvoll, wenn rejected Promises behandelt werden sollen.


// 2. Welchen Rückgabetyp hat diese Funktion automatisch: async function getName() { return "Lukas"; } ?
// Antwort: Diese Funktion hat automatisch den Rückgabewert Promise<string>, da sie zwar den String "Lukas" mit return schreibt, aber eine async-Funktion gibt immer ein Promise<> zurück.
// Antwort: Genau richtig. Der normale Rückgabewert "Lukas" wird von der async-Funktion automatisch als erfolgreicher Wert eines Promise<string> behandelt.


// 3. Was macht await bei einem Promise<User>?
// Antwort: await holt den Erfolgswert aus einem Promise, also wenn await getUser() aufgerufen wird, und getUser innerhalb einen new Promise definiert, dann wird das was in der resolve() Methode innerhalb des new Promise steht returned im Erfolgsfall.

// Antwort: Richtig. Präziser: await wartet auf Promise<User> und liefert bei erfolgreicher Erfüllung dessen User-Erfolgswert. Bei einem selbst erstellten Promise ist das der Wert, mit dem resolve(...) aufgerufen wurde.


// 4. Warum ist user innerhalb von const user = await getUser(); vom Typ User und nicht Promise<User>?
// Antwort: Weil mit await der Erfolgsfall des Promise in getUser() geholt wird, was in diesem Fall ein User Objekt (Objekt vom Typ User) geholt wird. Wenn man await weglassen würde, wäre user nur das Promise<User> und man könnte nicht direkt auf Properties zugreifen.

// Antwort: Genau richtig. getUser() liefert Promise<User>; await löst diese Promise-Ebene auf, deshalb ist user danach vom Typ User.


// 5. Was passiert bei await, wenn das Promise rejected wird und der Aufruf innerhalb eines try-Blocks steht?
// Antwort: Dann geht die async Funktion in den catch(error) Block, in dem normalerweise der Error geloggt wird in der Konsole und mit trow new Error ("...") der Promise als fehlgeschlagen zurückgegeben wird.

// Antwort: Fast richtig. Bei einem Reject springt die Ausführung direkt in catch. Dort kann der Fehler behandelt werden. Man muss nicht zwingend erneut throw verwenden. 
// Wenn man aber throw new Error(...) oder throw error verwendet, wird das Promise der async-Funktion ebenfalls rejected.


// 6. Warum sollte error in einem catch-Block vor error.message häufig erst mit error instanceof Error genarrowt werden?
// Antwort: Weil JavaScript theoretisch alles als Error werfen kann, also ein String mit trow new Error ("There is an error!") oder nur throw "Error" oder sogar throw 42;. Ein catch-Wert kann also als unknown behandelt werden, wollen aber dass TypeScript weiß dass es von
// Typ Error ist, deswegen machen wir Type Narrwoing mit if (error instanceof Error) { ... }.

// Antwort: Richtig. Kleine Präzisierung: throw new Error(...) wirft ein echtes Error-Objekt, throw "Error" einen string und throw 42 eine number. Deshalb kann error zunächst unknown sein. Mit error instanceof Error weiß TypeScript sicher, dass error.message existiert.


// 7. Was ist der Unterschied zwischen diesen beiden Variablen?
/*
const namePromise = getUserName();
const name = await getUserName();
*/
// Antwort: namePromise ist nur der Promise, Promise<string> weil name wahrscheinlich ein string ist, und name mit await den Erfolgswert des Promise<string> holt, was in diesem Fall user.name ist, weil im try-Block user.name returned wird was somit der Erfolgsfall
// von async function getUserName(): Promise<string> ist. Wir nutzen function getUser(success: boolean): Promise<User>, die den User zurückgibt, aber diese ist ja erstens keine async Funktion, und zweitens nutzen wir ja garnicht den Erfolgsfall davon also das resolve().
// Hatte den Denkfehler, dass der erfüllte Promise in async function getUserName(): Promise<string> das User Objekt ist, aber dieses ist ja der erfüllte Promise von function getUser(success: boolean): Promise<User>. Ist es dann ein verschachtelter Promise? Aber getUser()
// hat ja kein async?

// Antwort: Sehr wichtiger Punkt: Es ist hier kein verschachtelter Promise. getUser() liefert Promise<User>. Durch const user = await getUser(true) wird daraus innerhalb von getUserName() ein normaler User. 
// Danach return user.name; liefert einen string. Weil getUserName() async ist, wird genau dieser string zum Erfolgswert eines neuen Promise<string>. Deshalb ist getUserName() außen Promise<string> und await getUserName() ergibt string. 
// Ob getUser() selbst mit async geschrieben ist oder manuell new Promise(...) returned, spielt dafür keine Rolle: Entscheidend ist nur, dass getUser() Promise<User> zurückgibt.


// 8. Warum ist der Rückgabetyp von async function getUserName(): Promise<string> ein Promise<string>, obwohl innerhalb der Funktion return user.name; einen normalen string zurückgibt?
// Antwort: Weil die Funktion async ist und eine async Funktion immer ein Promise zurückgibt. Mit await kann man aber den Erfolgsfall, also dann auf den tatsächlich returnten Wert user.name zugreifen.

// Antwort: Genau richtig. Innerhalb der async-Funktion wird ein string returned; nach außen wird daraus automatisch ein Promise<string>. Mit await getUserName() bekommt man anschließend wieder den string-Erfolgswert.