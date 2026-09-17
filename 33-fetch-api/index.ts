// Wiederholung: await holt den Erfolgswert des Promise, also das was wir in Konzept 31 und 32 selbst implementiert haben in der resolve() Methode, hier wenn wir fetch(...) benutzen ist der Erfolgswert 
// ein Response-Objekt, das dann verfügbar ist wenn zusätzlich noch die erfolgreiche Antwort der HTTP-Anfrage vorliegt (response.ok)
// Also wichtig:
// "Erfolgswert" des fetch-Promises bedeutet nicht automatisch HTTP 200.
// Auch eine Antwort mit z.B. 404 oder 500 kann ein erfolgreich erfülltes fetch-Promise ergeben.
// Deshalb prüft man zusätzlich response.ok.

// statt den Typ selbst festzulegen wie nur string (Promise<string>) oder auch ein Type User ({ id: number, name: string }) (also Promise<User>), wird bei fetch(...) ein Promise vom Typ Response zurückgegeben
// also Promise<Response>, dieses Response Objekt sieht ungefähr so aus:
/*
{
    ok: true,
    status: 200,
    url: "...",
    headers: ...,
    body: ...
}
*/
// also wie in den letzten Konzepten 31 und 32 unser manuelles Promise<User> dieses User Objekt geliefert hat mit der manuell implementierten resolve() Methode:
/*
type User = {
    id: 1,
    name: string
}
*/
// liefert Promise<Response> eben dieses Objekt zurück im Erfolgsfall

// mit await kann dann also einfach dieses "richtige" Response Objekt also der Erfolgswert wie auch in Konzept 31 und 32 aus dem Promise geholt werden
// await löst eben genau diese Promise-Ebene auf: fetch(url) → Promise<Response>, await fetch(url) → Response

// brauchen dann aber noch response.json() weil das Response-Objekt zwar bereits vorhanden ist, der Response-Body aber noch nicht als fertiger JavaScript-Wert gelesen und geparst wurde
// mit .json() lesen/parsen wir den JSON-Response-Body und wandeln ihn in einen normalen JavaScript-Wert, z. B. ein Objekt oder Array, um
// also einfach gesagt: Der Response-Body liegt noch als JSON-Daten vor und muss mit response.json() in einen normalen JavaScript-Wert geparst werden.

// und obwohl zwar das await vor fetch(...) bei const response = await fetch(url); wie erklärt die Promise-Ebene auflöst und response das "richtige" Response Objekt ist, gibt .json() wieder ein Promise<> zurück
// und genau deswegen muss vor dem response.json() nochmal await, nicht weil response nach dem const response = await fetch(url); nur ein Promise<Response> ist, sondern weil response.json() wieder ein Promise<>
// zurückgibt


// 2. Konzept in diesem Konzept: Sicherer TypeGuard bei API- und weiteren externen Daten
// wenn wir wissen welche Daten die API zurückgibt bzw. wie diese aussehen, z.B. liefert die API mit URL: https://jsonplaceholder.typicode.com/users/{userId} so ein Objekt zurück:
/*
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
}
*/
// dann könnten wir so eine Type anlegen um sicherzugehen dass weitere zurückkommende Daten auch so aussehen und dann auch zu unserem weiteren Code passen:
/*
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};
*/
// Problem dabei: TypeScript prüft die API-Daten nicht automatisch zur Laufzeit, also nachdem wir das Objekt extrahiert haben aus dem Promise mit await: const data: User = await response.json();, ist es nicht sicher
// dass die Properties genau diese Typen besitzen
// TypeScript-Typen existieren nur zur Compile Time und werden beim Kompilieren entfernt.
// API-Daten werden dagegen erst zur Runtime geladen, weshalb TypeScript deren tatsächliche Shape
// nicht automatisch überprüfen kann.
// Die externen Daten sind eigentlich vom Typ "unknown" was in anderem Konzept schon gelernt, mit unknown kann man Variable zwar Werte verschiedener Typen zuweisen aber keine typspezifischen Methoden auf dieser aufrufen, außer man macht Type Narrowing vorher
// deswegen macht man in Funktion, die API-Call macht und die Daten verwendet statt nur: 
/* 
const data: unknown = await response.json();

return data;
*/
// noch einen zusätzlichen Check :
/*
const data: unknown = await response.json();

if (!isUser(data)) {
    throw new Error("Invalid user data");
}

return data;
*/
// und zwar mit selbst implementiert isUser Methode:
/*
function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return (
        "id" in value &&
        "name" in value &&
        "username" in value &&
        "email" in value
    );
}
*/
// checkt ob das zurückgegebene Objekt erstmal überhaupt ein Objekt ist und noch ob alle Properties vorhanden sind und nur wenn beides true ist und die Funktion true zurückgibt, dann darf
// TypeScript das zurückgegebene Objekt als vom Typ User behandeln



type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

async function getUser(id: number): Promise<User> {

    try {
        // Senden mit fetch(...) Anfrage an API, diese gibt ein Promise vom Typ Response zurück also Promise<Response>
        // mit await holen wir das "richtige" Reponse Objekt also was in resolve() Funktion von vorimplementierten Response ist, somit ist response vom Typ Response und nicht nur Promise<Response>
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok){

            // await vor fetch(...) nicht vergessen, sonst kommt hier Fehler: "Property 'ok' does not exist on type 'Promise<Response>'.", weil const response dann nur Promise<Response> ist und nicht das Response Objekt!
            throw new Error(`HTTP error: ${response.status}`);
        }

        // await vor fetch(...) oben nicht vergessen, sonst kommt hier Fehler: "Property 'json' does not exist on type 'Promise<Response>'.", weil const response dann nur Promise<Response> ist und nicht das Response Objekt!
        const data = await response.json();

        if (!isUser(data)) {
            throw new Error("Invalid data");
        }

        return data;

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message);
        }

        throw new Error("Error loading data from API!");
    }
}

// könnte theoretisch den const user = await getUser(1); und Konsolenlog außerhalb einer async Funktion wie main() machen, aber nur bei bestimmten Setups vom TypeScript Projekt, deswegen so cleaner!
async function main(): Promise<void> {

    const user = await getUser(1);

    console.log(`User ID: ${user.id}, Name: ${user.name}, Username: ${user.username}, Email: ${user.email}`);
}

// diese Version geht nur für einen User also kann nur in getUser() aufgerufen werden, nicht für getUsers() (für diese Variante siehe Document)
function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return (
        "id" in value &&
        "name" in value &&
        "username" in value &&
        "email" in value
    );
};

// Fragen bei gleicher URL an nur jetzt mit allen users als letzter Teil vom Link anstatt genaue ID
// genauso liefert fetch(...) hier wieder ein Promise<Response> und mit await extrahieren wir wieder das eigentliche Response Objekt, was diesmal alles Users statt nur einen enthält also ein Array von Usern
async function getUsers(): Promise<User[]> {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {

            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch(error) {

        if (error instanceof Error) {
            console.log(error.message);
        }

        throw new Error("Error loading data from API!");
    }
}



// 1. Welchen Typ gibt fetch(...) zurück?
// Antwort: fetch(...) gibt den Typen Promise<Response> zurück. Man müsste mit await die Promise-Ebene auflösen, um direkt das Response Objekt zu verwenden und auf derer Properties Zugriff zu haben.

// Antwort: Genau richtig. fetch(...) liefert Promise<Response>. Mit await fetch(...) wird daraus der Erfolgswert vom Typ Response.


// 2. Was ist nach: const response = await fetch(url); der Typ von response?
// Antwort: Der Typ von response ist Response, da mit await die Promise-Ebene aufgelöst wird und man somit das Response Objekt zurückbekommt und auch auf deren Properties so zugreifen kann.

// Antwort: Genau richtig. response ist danach ein Response-Objekt und kein Promise<Response> mehr.


// 3. Warum müssen wir nach fetch(...) häufig noch response.json() aufrufen?
// Antwort: Weil das Format des Response Objekts bzw. dessen Body in JSON ist, und wir aber die Daten als JavaScript Objekt brauchen, was .json() in das umwandelt.

// Antwort: Fast richtig. Das Response-Objekt selbst ist bereits ein JavaScript-Objekt. Der Response-Body enthält aber die übertragenen Daten noch nicht als fertig geparsten JavaScript-Wert. 
// response.json() liest den Body und parst die JSON-Daten zu einem JavaScript-Wert, z.B. einem Objekt oder Array.


// 4. Warum benutzen wir auch bei response.json() wieder await?
// Antwort: Weil die Methode .json() wiederum auch ein Promise zurückgibt. Also auch wenn wir mit const response = await fetch(...) das Response Objekt direkt bekommen und kein Promise, ist nach dem Aufruf von .json() der Wert wieder ein Promise.

// Antwort: Genau richtig. response.json() ist selbst asynchron und liefert wieder ein Promise. Deshalb brauchen wir ein zweites await, um an die geparsten Daten zu kommen.


// 5. Warum sollte man response.ok prüfen, obwohl der fetch-Aufruf selbst erfolgreich abgeschlossen wurde?
// Antwort: Weil ein HTTP-Fehler wie 404 oder 500 bei fetch() nicht automatisch dazu führt, dass ein catch ausgeführt wird. Weil response.ok ist ungefähr true, wenn wenn der HTTP-Status im erfolgreichen Bereich liegt.

// Antwort: Richtig. fetch() kann auch bei HTTP-Status 404 oder 500 erfolgreich ein Response-Objekt liefern. response.ok zeigt bei Status 200–299 true an. Deshalb prüft man response.ok und wirft bei Bedarf selbst einen Fehler.


// 6. Was ist der Unterschied zwischen diesen beiden Werten?
/*
const response = await fetch(url);
const data = await response.json();
*/
// Antwort: await fetch(url) gibt ein Response Objekt (war vorher falsch Promise<Response> geschrieben von mir) zurück, await response.json() dessen Body als JavaScript Objekt (war vorher im JSON Format und muss somit noch umgewandelt werden).

// Antwort: Hier eine wichtige Korrektur: await fetch(url) ergibt Response, NICHT Promise<Response>. fetch(url) allein wäre Promise<Response>. response ist also das HTTP-Response-Objekt mit z.B. status, ok, headers und body. 
// data ist danach der mit response.json() gelesene und geparste JavaScript-Wert aus dem Response-Body.


// 7. Warum brauchen wir um fetch(...) normalerweise kein eigenes new Promise(...)?
// Antwort: Weil fetch(...) vorimplementiert ist und das schon mit drin ist.

// Antwort: Richtig. fetch(...) ist bereits eine Promise-basierte API und gibt selbst Promise<Response> zurück. Ein zusätzliches new Promise(...) darum wäre normalerweise nur ein unnötiger Wrapper.


// 8. Warum garantiert const data: User = await response.json(); nicht automatisch, dass die API zur Runtime wirklich einen gültigen User geliefert hat?
// Antwort: Weil TypeScript-Typen existieren nur zur Compile Time und werden beim Kompilieren entfernt. API-Daten werden dagegen erst zur Runtime geladen, weshalb TypeScript deren tatsächliche Shape nicht automatisch überprüfen kann.

// Antwort: Genau richtig. Die Annotation User beschreibt nur, was TypeScript zur Compile Time annehmen soll. Sie validiert die zur Runtime eintreffenden API-Daten nicht. Dafür braucht man bei Bedarf Runtime-Validierung, z.B. einen Type Guard.


// 9. Warum wäre unknown für externe API-Daten konzeptionell sicherer als any?
// Antwort: Weil unknown kann man Variable zwar Werte verschiedener Typen zuweisen aber keine typspezifischen Methoden auf dieser aufrufen, außer man macht Type Narrowing vorher.

// Antwort: Genau richtig. any schaltet die Typprüfung weitgehend aus. unknown zwingt dich dagegen, die externen Daten erst zu prüfen bzw. zu narrowen, bevor du Properties oder typspezifische Methoden verwendest.


// 10. Was ist nach: const user = await getUser(1); der Typ von user, wenn getUser(): Promise<User> zurückgibt?
// Antwort: Dann ist user vom Typ User wie gewollt, da das await die Promise-Ebene aufgelöst wird und man somit das User Objekt direkt zurückbekommt (nicht nur den Promise<User> wie ohne await) und auch auf deren Properties so zugreifen kann.

// Antwort: Genau richtig. getUser(1) liefert Promise<User>; await löst diese Promise-Ebene auf, deshalb ist user danach vom Typ User.