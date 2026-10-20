// 35 – Fetch API Advanced
// Erweitere die bisherigen API-Aufrufe um die HTTP-Methoden POST, PATCH und DELETE und sende bei POST/PATCH JavaScript-Daten mit JSON.stringify(...) als JSON-Request-Body.
// Setze dabei "Content-Type": "application/json", damit der Server weiß, wie der gesendete Body interpretiert werden soll, und prüfe auch hier immer response.ok.
// Erstelle NewPost für neu zu sendende Daten und Post für die vollständige Server-Antwort; verwende für Teil-Updates einen PostUpdate-Typ auf Basis von Partial<NewPost>.
// Implementiere createPost(...): Promise<Post>, updatePost(...): Promise<Post> und deletePost(...): Promise<void>; behandle empfangene JSON-Daten zunächst als unknown und validiere sie mit isPost(), bevor du sie als Post zurückgibst.
// Implementiere außerdem getPost(id): Promise<Post> für GET-Requests und verwende deinen Type Guard auch dort, statt externen Daten einfach zu vertrauen.
// Starte zwei voneinander unabhängige getPost()-Requests gemeinsam mit Promise.all(...), warte mit await auf das erzeugte Sammel-Promise und zerlege das Ergebnis anschließend per Destructuring.
// Verstehe dabei: Die beiden HTTP-Requests und ihre einzelnen Promises bleiben separat; Promise.all() erstellt nur ein zusätzliches Sammel-Promise, das fulfilled wird, wenn alle erfolgreich sind, und rejected wird, sobald eines rejected wird.
// Verwende URLSearchParams für dynamische Query-Parameter wie userId=1, lade damit ein Array von Posts und validiere dieses zunächst als unknown mit einem isPostArray()-Type-Guard.
// Unterscheide abschließend klar zwischen JSON.stringify(value) für JavaScript → JSON beim Senden und response.json() für JSON → JavaScript beim Empfangen.
// hier wieder Typeguard, um zu checken, dass das, was von der API kommt auch unserem Typ Post entspricht, da wir im späteren Code mit den Properties und Typen arbeiten die in Post sind, und sonst Fehler geworfen werden
// wollen ja mit TypeScript ein stark typsiertes Programm, heißt wir checken auch was von außen kommt ob es der "Schablone" von Daten entspricht, nach der wir unser Programm aufbauen/aufgebaut haben
// diese Typeguard Function isPost() checkt ob value von Typ Post ist bzw. dessen Typs Post Shape erfüllt (Anzahl/Namen von Properties und deren Typen passt) und behandelt value dann in diesem Scope (meist if-Block) als vom Typ Post
// (aber nur in diesem Scope, nicht davor oder danach also außerhalb dem, wo wir später isPost() benutzen und checken, TypeScript kann nur da value als vom Typ Post behandeln wo es sich sicher ist und das ist in diesem Scope)
function isPost(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    // prüfen hier wie im letzten Konzept ob alle Properties von Post vorhanden sind und auch ob die Typen der Properties stimmen
    return ("id" in value &&
        typeof value.id === "number" &&
        "title" in value &&
        typeof value.title === "string" &&
        "body" in value &&
        typeof value.body === "string" &&
        "userId" in value &&
        typeof value.userId === "number");
}
;
// Aufgabe 1: POST Method with API
async function createPost(post) {
    try {
        // await nicht vergessen! Sonst bekommt man Promise<Post> und nicht Objekt direkt
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (!isPost(data)) {
            throw new Error("Invalid post data");
        }
        return data;
    }
    catch (error) {
        // Type Narrowing, weil ...
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Error loading data from API!");
    }
}
;
const newPost01 = {
    title: "newPost01",
    body: "This is the first new post",
    userId: 1
};
const returnedPost = await createPost(newPost01);
console.log(returnedPost);
async function updatePost(id, updates) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (!isPost(data)) {
        throw new Error("Invalid post data");
    }
    ;
    return data;
}
;
const updatePost01 = {
    title: "updatePost01",
    body: "This is the first udpate Post!",
    userId: 1
};
updatePost(100, updatePost01);
// Aufgabe 3: DELETE Method with API
async function deletePost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        // braucht keine header oder body, weil id und method DELETE reicht um Post zu identifizieren und zu löschen
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    // braucht hier auch nicht zwingend JSON zurück, könnte sich gesamte posts holen theoretisch
    // deshalb ist hier der Rückgabewert der Funktion auch Promise<void> und nicht Promise<Post> wie bei createPost() und updatePost()
}
;
// Aufgabe 4: Promise.all()
async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (!isPost(data)) {
        throw new Error("Invalid post data");
    }
    // dadurch dass wir durch !isPost vorher ausschließen, dass data irgendetwas anderes sein kann als vom Typ Post, können wir hier return data machen und es gibt kein Fehler, weil data somit vom Typ Post sein muss, was auch zum Rückgabewert passt (aber Rückgabewert ist doch Promise<Post> und nicht Post?)
    return data;
}
;
async function loadData() {
    const [post01, post02] = await Promise.all([
        getPost(1),
        getPost(2)
    ]);
    console.log(`Post 1: ${post01}, Post 2: ${post02}`);
}
;
loadData();
// Aufgabe 5: Query Parameter
const params = new URLSearchParams({
    userId: "1"
});
const url = `https://jsonplaceholder.typicode.com/posts?${params}`;
const responsePostArray = await fetch(url);
if (!responsePostArray.ok) {
    throw new Error(`HTTP error: ${responsePostArray.status}`);
}
const dataPostArray = await responsePostArray.json();
function isPostArray(value) {
    return Array.isArray(value) && value.every(isPost);
}
if (isPostArray(dataPostArray)) {
    console.log(dataPostArray);
}
;
export {};
// 1. Was ist der Unterschied zwischen GET, POST, PATCH und DELETE?
// Antwort: Dies sind alle 4 Methods für ein API Call und machen verchiedene Dinge. Mit GET fragt man mittels HTTP Request Daten an, indem man einen Link zu dieser API in fetch() angibt. Mit POST kann man Daten an die API schicken anstatt sie zu holen,
// man kann z.B. neue Daten zur API hinzufügen. Mit PUT und PATCH kann man Daten in der API updaten, mit PUT erstetzt man eine komplette Resource wie ein User, mit PATCH einzelne Felder einer Resource wie nur den Namen eines Users.
// Mit DELETE löscht man Resourcen aus der API, wie einzelne User. Die URL definiert ob man z.B. alle User holt oder nur einzelne über eine ID.
// Antwort: Richtig. Typischerweise gilt: GET liest Daten, POST erstellt neue Ressourcen, PATCH aktualisiert einzelne Teile und DELETE löscht eine Ressource.
// PUT hast du zusätzlich richtig beschrieben: Es wird typischerweise verwendet, um eine Ressource vollständig zu ersetzen.
// Welche Ressource betroffen ist, wird häufig über die URL bzw. deren Pfad/ID angegeben.
// 2. Warum benutzen wir bei einem POST-Request JSON.stringify(post)?
// Antwort: Obwohl man mit POST Daten verändert oder hinzufügt zur API, aber der Server schickt selbst oft Daten wieder zurück, z.B. das neu erstellte Objekt oder das geupdatete User Array usw.
// Antwort: Deine Antwort beschreibt richtig, dass ein POST-Request auch wieder Response-Daten zurückgeben kann, beantwortet aber nicht JSON.stringify().
// JSON.stringify(post) wandelt den JavaScript-Wert post in einen JSON-String um, damit er als JSON im HTTP-Request-Body übertragen werden kann.
// Beispiel: { title: "Hello" } → '{"title":"Hello"}'.
// Die zurückkommenden Daten sind davon ein separates Thema.
// 3. Was sagt der Header "Content-Type": "application/json" dem Server?
// Antwort: Damit sagt man dem Server, dass der Request Body, der der API gesendet wird, JSON ist. Ohne diesen Header weiß eine API eventuell nicht zuverlässig, wie sie den Body interpretieren soll.
// Antwort: Genau richtig. Er sagt dem Server, dass der gesendete Request-Body als JSON interpretiert werden soll.
// 4. Was bedeutet: type PostUpdate = Partial<NewPost> ?
// Antwort: Das bedeutet, dass der neue Typ PostUpdate alle Properties und deren Typen vom Typ NewPost kopiert, aber alle Properties optional sind, also alle Properties mit ? enden, z.B. { id?: number, name?: string, ...}.
// Dies benutzt man z.B. bei der Methode zum Updaten von Resourcen der API, da man eventuell nur den Namen eines Users ändern möchte, und dann nur { name: "Updated Name"} schicken will statt ein komplettes User Objekt. Dafür wird einfach das Objekt was an die API geschickt wird
// zu dem Partial gemacht, z.B.: async function updatePost(id: number, updates: PostUpdate): Promise<Post> { ... }
// Antwort: Richtig. Alle Properties von NewPost werden übernommen und optional.
// In unserem Beispiel wäre das ungefähr:
/*
type PostUpdate = {
    title?: string;
    body?: string;
    userId?: number;
};
*/
// id und name wären nur enthalten, wenn sie auch ursprünglich in NewPost definiert wären.
// 5. Warum ist PATCH zusammen mit Partial<NewPost> für Updates praktisch?
// Antwort: Da die Properties ja optional sind beim Typen des Objekts für den updated User, kann man nur einzelne Properties angeben und weil PATCH auch das Verändern von einzelnen Feldern einer Resource der API erlaubt, passt das perfekt zusammen.
// Man muss somit nicht einen kompletten User definieren beim Update sondern z.B. nur ein Objekt mit dem name-Property und dieses mit PATCH an die API schicken.
// Antwort: Genau richtig. PATCH soll typischerweise nur bestimmte Felder verändern und Partial<NewPost> erlaubt genau solche Teilobjekte, z.B. { title: "Updated title" }.
// 6. Was passiert bei folgendem Code?
/*
const [post01, post02] = await Promise.all([
    getPost(1),
    getPost(2)
]);
*/
// Antwort: Hier werden zwei Promises bzw. Requests gleichzeitig an die API geschickt, normalerweise stehen diese mit await untereinander, mit Promise.all() kann man aber mehrere Requests gleichzeitig an den Server senden.
// Antwort: Richtig. Beide Promise-basierten Requests werden gestartet, ohne zunächst auf den ersten zu warten.
// Promise.all(...) gibt ein Promise zurück, das erfolgreich erfüllt wird, sobald beide Ergebnisse vorhanden sind.
// Durch Destructuring landet das erste Ergebnis in post01 und das zweite in post02.
// 7. Wann ist Promise.all() sinnvoller als zwei await-Aufrufe direkt hintereinander?
// Antwort: Weil diese dann gleichzeitig geschickt werden und somit schneller verarbeitet sind (ACHTUNG FALSCH: und weil es dann nur ein API Call ist was ebenfalls Resourcen sparen kann).
// Antwort: Richtig ist, dass unabhängige Requests parallel laufen können und dadurch insgesamt schneller fertig sein können.
// Aber: Es ist NICHT nur ein API-Call. getPost(1) und getPost(2) bleiben zwei separate HTTP-Requests.
// Promise.all() wartet lediglich gemeinsam auf beide Promises.
// Es spart also typischerweise Zeit, aber nicht automatisch Netzwerk-Requests.
// 8. Was passiert mit Promise.all(), wenn eines der enthaltenen Promises rejected wird?
// Antwort: Wenn eines der enthaltenen Promises rejected wird, wird das komplette Promise also auch die anderen Promises rejected.
// Antwort: Das von Promise.all(...) zurückgegebene gemeinsame Promise wird rejected, sobald eines der enthaltenen Promises rejected wird.
// Die anderen Promises werden dadurch aber NICHT automatisch rejected oder abgebrochen.
// Bereits laufende Requests können im Hintergrund weiterlaufen; Promise.all() wartet nur nicht mehr erfolgreich auf das Gesamtergebnis.
// 9. Was macht URLSearchParams und warum ist es bei dynamischen Query-Parametern praktisch?
// Antwort: URLSearchParams wandelt ein Objekt mit Properties und Werten direkt in einen Link mit den richtigen Query-Parametern um, 
// das ist weniger fehleranfällig als es selbst manuell zu schreiben und der Link wird direkt aus dem Objekt erstellt also wird eine Änderung direkt übernommen und man muss nicht den Link verändern.
// Antwort: Fast richtig. URLSearchParams baut nicht selbst den kompletten Link.
// Es erzeugt bzw. verwaltet den Query-String aus Key-Value-Paaren und kümmert sich auch um korrektes Encoding.
// Beispiel:
/*
const params = new URLSearchParams({
    userId: "1",
    search: "Type Script"
});

params.toString();
// "userId=1&search=Type+Script"

const url = `https://example.com/posts?${params}`;
*/
// Das ist sauberer und weniger fehleranfällig als Query-Strings manuell zusammenzubauen.
// 10. Was ist die Richtung bei diesen beiden Operationen?
/*
JSON.stringify(value)
response.json()
*/
// Antwort: JSON.stringify(value) wandelt ein JavaScript Objekt in JSON Schreibweise um, z.B. von { id: 1, name: "Lukas"} in { "id" : 1, "name": "Lukas"}. response.json() macht es andersherum, dieser Aufruf wandelt JSON in ein JavaScript Objekt um.
// Antwort: Richtig.
// JSON.stringify(value): JavaScript-Wert → JSON-String für die Übertragung.
// response.json(): JSON-Daten aus dem Response-Body lesen und parsen → JavaScript-Wert.
// Wichtig: response.json() ist asynchron und gibt deshalb ein Promise zurück.
// 11. Warum braucht ein GET-Request normalerweise keinen body, ein POST/PATCH aber häufig schon?
// Antwort: Weil bei POST/PATCH das Objekt erst in JSON umgewandelt werden muss, weil man auch etwas an den Server schickt, bei GET holt man sich nur etwas, und muss eher JSON in JavaScript wieder umwandeln.
// Antwort: Richtig. Bei POST/PATCH müssen häufig die neu anzulegenden bzw. zu ändernden Daten an den Server übertragen werden, deshalb verwendet man einen Request-Body.
// Bei GET werden Informationen normalerweise über URL, Pfad oder Query-Parameter angegeben und die Daten anschließend vom Server zurückgeliefert.
// 12. Was wäre ein typischer Use Case für einen Authorization-Header?
// Antwort: Weiß nicht, vielleicht für APIs mit Login?
// Antwort: Genau, APIs mit Login/Authentifizierung sind ein typischer Use Case.
// Nach einem Login erhält man beispielsweise ein Access Token und sendet es bei geschützten Requests mit:
/*
headers: {
    "Authorization": `Bearer ${token}`
}
*/
// Damit kann der Server prüfen, welcher Benutzer bzw. Client den Request ausführt und ob er dazu berechtigt ist.
//# sourceMappingURL=index.js.map