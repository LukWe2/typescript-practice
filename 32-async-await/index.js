// 32 – async / await
// Schreibe async-Funktionen, die Promise-Werte mit await auflösen, sodass innerhalb der Funktion mit den tatsächlichen Ergebnissen statt mit Promise<T> gearbeitet werden kann.
// Verwende z.B. getUser(): Promise<User>, warte mit const user = await getUser() darauf und verarbeite anschließend normale User-Properties.
// Erstelle auch eine weitere async-Funktion, die aus einem geladenen User z.B. nur dessen Namen ermittelt und Promise<string> zurückgibt.
// Verwende try/catch für mögliche Fehler beim await; behandle den catch-Wert zunächst als unbekannt und narrowe ihn mit error instanceof Error, bevor auf error.message zugegriffen wird.
// Teste außerdem, dass ein return in einer async-Funktion automatisch in ein erfülltes Promise verpackt wird und ein throw dazu führt, dass das zurückgegebene Promise rejected wird.
// Unterscheide dabei zwischen sequenziellen await-Aufrufen und dem eigentlichen Promise, das eine async-Funktion immer an ihren Aufrufer zurückgibt.
function getUser(success) {
    return new Promise((resolve, reject) => {
        if (success === true) {
            resolve({
                id: 1,
                name: "Lukas"
            });
        }
        ;
        if (success === false) {
            reject(new Error("Could not load user!"));
        }
    });
}
;
async function main() {
    try {
        // bei Hover über user: "const user: User"
        const user = await getUser(true);
        const name = await getUserName();
        console.log(`User name: ${user.name} and seperate name: ${name}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}
;
main();
async function getUserName() {
    try {
        const user = await getUser(true);
        return user.name;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Could not get User Name");
        // throw new Error returned immer einen fehlgeschlagenen Promise, sonst gibt es einen Fehler weil nicht string returned wurde, wenn aber Promise fehlgeschlagen ist, ist Methode auch zu Ende und man braucht kein return
        //return "";  
    }
}
;
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
export {};
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
//# sourceMappingURL=index.js.map