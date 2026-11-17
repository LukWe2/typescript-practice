// 1.

function delay(ms: number): Promise<void> {

    return new Promise<void>((resolve) => {

        setTimeout(() => {resolve()}, ms);
    });
}

// 2.

async function getUser(): Promise<string> {

    await delay(2000);

    return "Lukas";
}

// 3.

async function getProducts(): Promise<string[]> {

    await delay(3000);

    return ["Product Name 1", "Product Name 2"];
}

// 4.

async function getSettings(): Promise<string> {

    await delay(1000);

    return "dark";
}

// 5.

async function loadWithPromiseAll(): Promise<void> {

    // ich erwarte, dass die Gesamtoperation beider Promises ca. 3 Sekunden dauert, also so lange wie die längste einzelne der beiden
    // Grund: Nicht Promise.all() selbst führt die Funktionen aus. Beim Auswerten des Arrays werden getUser() und getProducts() aufgerufen und erzeugen/starten ihre Promises. Diese Promises bekommt dann Promise.all().
    // Dadurch sind die concurrent und laufen gleichezeitig.

    console.time()

    // await vor Promise.all() nicht vergessen, sonst returned man nur Promise<[string, string[]]> und nicht Werte von den tatsächlichen Typen
    const [user, products] = await Promise.all([

        getUser(),
        getProducts()
    ]);

    console.timeEnd()
};



// 6.

async function loadWithPromiseAll2(): Promise<void> {

    // ich erwarte, dass die Gesamtoperation beider Promises ca. 3 Sekunden dauert, also so lange wie die längste einzelne der beiden
    // Grund: durch das Ausführen der Argumente in Promise.all() werden beide Promises direkt zurückgegeben und die Funktionen ausgeführt.
    // Dadurch sind die concurrent und laufen gleichezeitig.

    console.time()

    // await vor Promise.all() nicht vergessen, sonst returned man nur Promise<[string, string[]]> und nicht Werte von den tatsächlichen Typen
    const [user, products, settings] = await Promise.all([

        getUser(),
        getProducts(),
        getSettings()
    ]);

    // user hat den Typ string, products den Typ string[], settings den Typ string

    console.timeEnd()
};



// 7.

async function getUserId(): Promise<number> {

    await delay(1500);

    return 5;
}

async function getPostsForUser(userId: number): Promise<string[]> {

    await delay(2000);

    return ["Post 1", "Post 2", "Post 3"];
}


// 8.

async function getSettingsForUser(userId: number): Promise<string> {

    await delay(1000);

    return "dark";
}


// 9.

async function loadUserData(): Promise<void> {

    const userId = await getUserId();

    const [posts, settings] = await Promise.all([

        getPostsForUser(userId),
        getSettingsForUser(userId)
    ])
};

// getUserId() muss zuerst awaited werden, weil getPostsForUser() und getSettingsForUser() eine echte userId vom Typ number benötigen und nicht Promise<number>



// 10.

async function successfulTask(): Promise<string> {

    await delay(1000);

    return "Success";
};

async function failingTask(): Promise<string> {

    await delay(1500);

    throw new Error("Error");
};

try {

    const [success, fail] = await Promise.all([

        successfulTask(),
        failingTask()
    ]);
} catch (error){

    console.log("Mindestens ein Promise ist fehlgeschlagen!");
}


// 11.

// siehe Verständnisfragen


// 12.

async function firstTask(): Promise<string>{

    await delay(3000);

    return "first";
};

async function secondTask(): Promise<string>{

    await delay(1000);

    return "second";
};

async function thirdTask(): Promise<string>{

    await delay(2000);

    return "third";
};

const result = await Promise.all([

    firstTask(),
    secondTask(),
    thirdTask()
]);

console.log(result);

// Die Ergebnisreihenfolge ist trotzdem: "first", "second", "third", obwohl secondTask() zuerst fertig wird, weil die Reihenfolge der Ergebnisse
// von der der Argumente in Promise.all() abhängt und nicht davon, welcher Promise zuerst fullfilled wird.


// 13.

// siehe Verständnisfragen


























































// 1. Was macht Promise.all() grundsätzlich mit mehreren Promises,
// die ihm übergeben werden?
//
// Antwort: Promise.all() bekommt mehrere Promises und startet die asynchrone Arbeit aller dieser Promises. Es ruft also die async Funktionen auf bzw. die Funktionsaufrufe passieren bereits beim Erzeugen des Arguments für Promise.all()
// Alle übergebenen Operationen starten also direkt hintereinander. Das ist also wie wenn wir ohne await die async Funktionen starten und concurrent laufen lassen.
// sozusagen und bekommt dann direkt das Promise vom Typ das in der übergebenen Funktion benutzt wird. Es muss dabei keine async Funktion sein, sondern kann
// auch ein Promise.resolve(...) sein. Es kann auch einfach ein Wert von Promise sein, dann werden diese aber direkt als fullfilled gesehen. 
// Also Promise.all() bekommt ein Tupel oder Array aus den Promises die übergeben werden bzw. die Promises die aus den übergebenen Funktionen oder Aurufen folgen
// Promise.all() selbst gibt wieder ein Promise zurück, und zwar ein "gesammeltes". Das Ergebnis dieses Promises (was vom Typ her ein Tupel aus den Typen der Promises ist wie
// Promise<[User, Product[]]>) ist dann wiederum ein Tupel aus den Ergebnissen der Promises mit z.B. den Typen [User,Product[]].
// Mit Destructuring kann man dann die Ergebnisse (Werte, Arrays, Objekte usw.) aus dem Tupel in einzelnen Variablen speichern.

// Antwort: Sehr gut, aber eine wichtige Präzisierung: Promise.all() selbst startet nicht aktiv die async-Funktionen. Beim Auswerten des Arguments werden zuerst `getUser()` und `getProducts()`
// aufgerufen; dadurch starten diese Funktionen und liefern ihre Promises. Erst diese bereits erzeugten Promises werden an Promise.all() übergeben. Promise.all() fasst sie dann zu einem gemeinsamen Promise zusammen,
// das fulfilled wird, wenn alle Eingaben erfolgreich fulfilled sind. Normale Werte sind ebenfalls erlaubt und werden sinngemäß wie bereits erfüllte Promises behandelt.


// 2. Welchen Typ hat `resultPromise` ungefähr?
//
// const resultPromise = Promise.all([
//     getUser(),
//     getProducts()
// ]);
//
// Angenommen:
//
// getUser(): Promise<User>
// getProducts(): Promise<Product[]>
//
// Antwort: resultPromise hat den Typ Promise<[User, Product[]]>, weil Promise.all() an sich wieder ein Promise zurückgibt, aber auf die Ergebnisse der Promises die ihm übergeben werden awaited.
// Es ist also nicht so, dass Promise.all() Promises der aufgerufenen async-Funktionen oder direkt definieren Promises.resolve() zurückgibt, sondern er startet die Funktionen, bekommt direkt die Promises
// der im Parameter definierten Funktionen oder Werte und awaited diese noch. Deshalb ist der Typ ein Tupel aus den "tatsächlichen" Typen der Ergebnisse, aber wiederum in einem Tupel weil
// Promise.all() eben selbst wieder ein Promise returned. Wir awaiten hier ja nicht DIREKT vor Promise.all(), weshalb das Ergebnis eben noch ein Promise ist (siehe für Version mit await nächste Frage)

// Antwort: Der Typ `Promise<[User, Product[]]>` ist richtig. Sprachlich würde ich aber nicht sagen, dass Promise.all() die einzelnen Promises intern mit `await` awaited.
// Promise.all() erstellt ein neues Promise, dessen Zustand von den übergebenen Promises abhängt. Sind alle fulfilled, wird dieses gemeinsame Promise mit `[User, Product[]]` fulfilled.
// Da vor Promise.all() hier selbst kein `await` steht, bleibt `resultPromise` zunächst vom Typ `Promise<[User, Product[]]>`.


// 3. Welchen Typ haben `user` und `products` hier?
//
// const [user, products] = await Promise.all([
//     getUser(),
//     getProducts()
// ]);
//
// Antwort: Hier haben user und products die Typen User und Product[] also die "tatsächlichen" Typen nicht in einem Promise wie bei der letzten Frage. Das ist so, weil wir hier auch das Promise.all() awaiten und destructuren.
// Deswegen ist der Typ der zwei Ergebnisvariablen/-werte hier die Typen der async Funktion in deren Promises.

// Antwort: Genau richtig. Promise.all(...) hat zunächst ungefähr `Promise<[User, Product[]]>`. Durch `await` wird daraus `[User, Product[]]`.
// Das Array-/Tuple-Destructuring weist Position 0 `user: User` und Position 1 `products: Product[]` zu.


// 4. Warum dauert folgende Ausführung bei:
//
// getUser()     -> 2 Sekunden
// getProducts() -> 3 Sekunden
//
// ungefähr nur 3 Sekunden?
//
// const [user, products] = await Promise.all([
//     getUser(),
//     getProducts()
// ]);
//
// Antwort: Weil Promise.all() beide async-Funktionen gleichzeitig startet, ohne nacheinander auf diese zu awaiten also aufs Ergebnis zu warten und deshalb die andere durch ein Pausieren des Ablaufs stoppt.
// Somit dauert die gesamte Operation aus zwei Funktionen ca. so lange wie die längste was 3 Sekunden in diesem Fall ist.

// Antwort: Die Laufzeit von ungefähr 3 Sekunden stimmt. Präzisierung: Beim Auswerten des Arrays werden `getUser()` und `getProducts()` direkt hintereinander aufgerufen und dadurch beide gestartet.
// Erst anschließend wird das gemeinsame Promise von Promise.all() awaited. Deshalb können sich die beiden asynchronen Vorgänge zeitlich überlappen. Nach 2 Sekunden ist User fertig,
// nach 3 Sekunden Products; damit sind nach ungefähr 3 Sekunden alle benötigten Ergebnisse vorhanden.


// 5. Was ist der Unterschied zwischen:
//
// const userPromise = getUser();
// const productsPromise = getProducts();
//
// const user = await userPromise;
// const products = await productsPromise;
//
// und:
//
// const [user, products] = await Promise.all([
//     getUser(),
//     getProducts()
// ]);
//
// Antwort: Hier gibt es theoretisch keinen Unterschied, beide Codebeispiele machen das gleiche: starten erst beide async-Funktionen gleichzeitig also diese sind concurrent, awaiten dann das erste Ergebnis während die zweite 
// aber weiterlaufen kann und awaited wenn die erste fullfilled ist die zweite.

// Antwort: Für den erfolgreichen Fall und die Laufzeit ist das Grundprinzip sehr ähnlich: Beide Operationen werden zuerst gestartet und können concurrent laufen.
// Promise.all() bündelt die Promises aber zu EINEM gemeinsamen Promise und hat ein klar definiertes gemeinsames Fehlerverhalten: Sobald eines rejected wird, rejected auch Promise.all().
// Die Varianten sind deshalb vom Concurrent-Prinzip ähnlich, aber nicht in jeder Hinsicht vollständig identisch.


// 6. In welcher Reihenfolge stehen die Ergebnisse von Promise.all(),
// wenn das zweite Promise früher fulfilled wird als das erste?
//
// Promise.all([
//     getUser(),
//     getProducts()
// ]);
//
// Antwort: Die Reihenfolge bleibt trotzdem bestehen, also das Ergebnis von Promise.all() wenn es awaited wird (es wird dann übrigens das gesamte Promise awaited nicht die einzelnen wenn vor Promise.all() await steht),
// ist dann user und dann products[].

// Antwort: Genau richtig. Die Ergebnisreihenfolge richtet sich nach der Reihenfolge der Eingaben und NICHT danach, welches Promise zuerst fulfilled wurde.
// Also Position 0 bleibt das Ergebnis von getUser(), Position 1 bleibt das Ergebnis von getProducts().


// 7. Was passiert mit Promise.all(),
// wenn eines der enthaltenen Promises rejected wird?
//
// Antwort: Wenn eines der enthaltenen Promises rejected wird, wird das gesamte Promise was Promise.all() zurückgibt rejected und nicht nur einzelne darin!

// Antwort: Genau richtig. Sobald eines der enthaltenen Promises rejected wird, wird auch das gemeinsame Promise von Promise.all() rejected – mit dem Rejection-Grund/Fehler dieses Promises.
// Bei `await Promise.all(...)` führt diese Rejection dazu, dass an dieser Stelle ein Fehler geworfen wird, den man z.B. mit try/catch behandeln kann.


// 8. Werden die anderen bereits gestarteten Promises automatisch
// abgebrochen, wenn eines innerhalb von Promise.all() rejected wird?
//
// Antwort: Nein, wenn eines rejected wird, bedeutet das nicht automatisch, dass die anderen bereits gestarteten Operationen abgebrochen werden. 
// Wenn etwa drei Requests gestartet wurden, können die anderen Requests trotzdem noch weiterlaufen

// Antwort: Genau richtig. Promise.all() markiert nur sein eigenes gemeinsames Promise als rejected. Es besitzt keinen allgemeinen Mechanismus, um die anderen bereits gestarteten Vorgänge automatisch zu canceln.
// Ein bereits gestarteter Request kann also weiterlaufen. Für echtes Abbrechen braucht man je nach API einen eigenen Cancellation-Mechanismus, z.B. später AbortController.


// 9. Warum funktioniert folgendes nicht sinnvoll?
//
// const [user, posts] = await Promise.all([
//     getUser(),
//     getPostsForUser(user.id)
// ]);
//
// Antwort: Weil die async-Funktion getPostsForUser() als Parameter user.id hat, was von der async-Funktion getUser() kommt bzw. erst bereitgestellt wird ein Objekt user, was aber erst passiert wenn das Promise von getUser()
// fullfilled ist. Da Promise.all() aber alle als im Parameter-Array angegebenen async-Funktionen gleichzeitig startet, ist das Ergebnis von getUser() noch nicht da, weswegen es in getPostsForUser() auch nicht sinnvoll direkt
// verwendet werden kann/sollte.

// Antwort: Inhaltlich richtig. Hier kommt sogar schon ein TypeScript-/Compile-Time-Problem hinzu: `user` wird erst durch das Destructuring NACH dem await angelegt und kann innerhalb desselben Initialisierungsausdrucks
// noch gar nicht für `user.id` verwendet werden. Grundsätzlich ist die Ursache die Datenabhängigkeit: Erst muss `const user = await getUser()` abgeschlossen sein, damit ein konkreter User und dessen `user.id` existiert.
// Erst danach kann `getPostsForUser(user.id)` gestartet werden.


// 10. Wie könnte man vorgehen, wenn zuerst ein User geladen werden muss,
// danach aber Posts und Settings unabhängig voneinander anhand der user.id
// geladen werden können?
//
// Antwort: Man könnte erst getUser() starten und darauf awaiten, sodass das Ergebnis user schon bereitgestellt ist und anschließend getPostsForUser() starten oder mit Promise.all() danach mehrere auf einmal (hier wird dann
// auch direkt awaited).

// Antwort: Genau. Zuerst sequenziell: `const user = await getUser();`. Danach steht `user.id` zur Verfügung.
// Anschließend können die voneinander unabhängigen Operationen gemeinsam also concurrent gestartet werden, z.B.
// `const [posts, settings] = await Promise.all([getPostsForUser(user.id), getSettingsForUser(user.id)]);`.
// Das ergibt also: zuerst notwendige Abhängigkeit sequenziell, danach unabhängige Arbeit concurrent.


// 11. Was ist das gemeinsame Promise,
// das Promise.all() zurückgibt?
//
// Was bedeutet es, wenn dieses Promise:
// - pending
// - fulfilled
// - rejected
//
// ist?
//
// Antwort: Das gemeinsame Promise was Promise.all() zurückgibt, ist ein Promise was als Typ ein Promise<> und darin ein Tupel aus den Typen der Promises die in Promise.all() von den aufgerufenen Funktionen zurückgegeben werden.
// Wenn dieses gemeinsame Promise rejected wird, dann wird Promise.all(...) mit genau diesem Fehler von dem Promise was rejected wurde rejected.

// Antwort: Der erste Teil ist richtig, aber die drei Zustände fehlen noch vollständig:
// `pending` bedeutet: Noch sind nicht alle benötigten Promises erfolgreich abgeschlossen und bisher hat auch keines die Gesamtauswertung endgültig rejecten lassen.
// `fulfilled` bedeutet: ALLE Eingaben sind erfolgreich fulfilled; das Ergebnis ist das Tuple/Array ihrer aufgelösten Werte in ursprünglicher Reihenfolge.
// `rejected` bedeutet: Mindestens eines der benötigten Promises ist rejected; das gemeinsame Promise ist deshalb ebenfalls rejected.


// 12. Warum ist Promise.all() besonders praktisch,
// wenn mehrere unabhängige API-Requests gleichzeitig gestartet werden können?
//
// Antwort: Weil es eine schnelle Schreibweise ist, um mehrere async-Funktionen concurrent zu starten bzw. braucht nicht unbedingt Funktionen und auf diese auch zu awaiten. Es returned dann wiederum ein Promise bestehend aus einem
// Tupel aus den Ergebnissen, das man dann destructuren kann in einzelne Werte.

// Antwort: Richtig vom Prinzip. Wieder nur die Präzisierung: Promise.all() selbst startet nicht zwingend die Operationen; die Funktionsaufrufe innerhalb seines Arguments erzeugen/starten die Promises.
// Promise.all() bündelt diese unabhängigen Promises anschließend zu einem gemeinsamen Promise. Dadurch kann man mit einem einzigen await auf alle warten und die Ergebnisse bequem per Destructuring erhalten.
// Besonders praktisch ist das, wenn alle Ergebnisse benötigt werden und ein Fehler eines einzelnen Requests den gesamten Vorgang als fehlgeschlagen gelten lassen soll.