// 1.

function delay(ms: number): Promise<void> {

    return new Promise<void>((resolve) => {

        setTimeout(() => {

            resolve();
        }, ms)
    });
};


// 2.

async function successfulTask(): Promise<string> {

    await delay(1000);

    return "Success";
};


// 3.

// failingTask() behandelt den Error den es werfen kann (bzw. hier explizit tut) nicht selbst, weshalb der Error an eine Ebene weiter oben gegeben wird, nämlich an den try/catch Block in der Funktion, die auf dieses Promise awaited
// hier später failingTaskResult
// Verbesserung: failingTask() gibt ein rejected Promise nach außen. Wenn eine äußere Funktion dieses Promise awaitet, wird dessen Rejection dort wie ein throw behandelt.

async function failingTask(): Promise<string> {

    await delay(1000);

    throw new Error("Task failed");
}


// 4.

// hier wird auf failingTask() awaited, und weil failingTask() selbst nicht den Fehler behandelt, wird er an die Funktion in der dieser try/catch Block stehen würde weitergegeben, er muss also hier im catch den Error behandeln
// oder er wird wieder eine Ebene weiter nach oben gegeben bis es keine mehr gibt, dann wird auch das Promise der letzten Ebene rejected und der Fehler wird ausgegeben final

// dieser Block behandelt aber den Fehler von failingTask(), und weil ein Fehler praktisch dann als behandelt gilt, wenn er in einem catch landet und man ihn danach nicht wieder wirft, würde der Fehler in der Ebene drüber
// nicht mehr aufkommen. Da im catch kein neues throw steht, ist der Fehler hier endgültig behandelt und würde in einer Funktion in der Ebene drüber nicht mehr geworfen werden.

try {
    // failingTask() kann ein rejected Promise zurückgeben.
    // Durch `await` wird diese Rejection an dieser Stelle wie ein geworfener Fehler behandelt.
    // Deshalb steht der Aufruf im try-Block, damit der Fehler im catch abgefangen und behandelt werden kann.
    const failingTaskResult = await failingTask();

} catch(error){

    if (error instanceof Error){

        console.log(error.message);
    }
};


// 5.

async function loadData(): Promise<string> {

    try {

        const failingTaskResult = await failingTask();

        return failingTaskResult;
    
    } catch (error){

        console.log("Error thrown");
        
        // Der Fehler wird kurz innerhalb von loadData() gefangen, beispielsweise geloggt, aber anschließend wieder weitergeworfen
        throw error;
    }
};


// 6.

async function additionalAsyncFunction(): Promise<void> {

    try {

        const loadDataResult = await loadData();

    } catch(error) {

        // die eine äußere Funktion additionalAsyncFunction() awaited jetzt das Promise von loadData(), dessen Rejection wird hier wie ein throw behandelt und mit catch aufgefangen
        if (error instanceof Error){

            // weil hier nicht nochmal throw error ist, endet die Fehlerkette hier
            console.log("Von loadData() weitergeworfener Error hier geworfen");
        }
    }
};



// 7.

class ApiError extends Error {

    public statusCode: number;

    constructor(

        message: string,
        statusCode: number
    ) {

        super(message);

        this.statusCode = statusCode;
    }

}


// 8.

async function getUser(): Promise<string> {

    await delay(1000);

    throw new ApiError(
        "User not found",
        404
    )
};


// 9.

try {

    const userResult = await getUser();

} catch(error){

    if (error instanceof ApiError){

        console.log(`Message: ${error.message}`);
        console.log(`Status Code: ${error.statusCode}`);
    }
};


// 10.

class ValidationError extends Error {

    public code: number;
    public reason: string;

    constructor(

        message: string,
        code: number,
        reason: string
    ){

       super(message);

       this.code = code;
       this.reason = reason;
    }
};

try {

    // getUser() wirft immer new ApiError(...) (siehe Implementation)
    // Deshalb kann dieser Zweig aktuell niemals erreicht werden: else if (error instanceof ValidationError)
    // Damit wirklich beide Fälle getestet werden, bräuchte man beispielsweise noch eine Funktion, die einen ValidationError werfen kann
    const userResult = await getUser();

} catch (error) {

    if (error instanceof ApiError) {
        console.log("API Error");

    } else if (error instanceof ValidationError) {
        console.log("Validierungsfehler");
    }
}


// 11.

try {

    const result = await Promise.all([

        successfulTask(),
        failingTask()
    ]);
} catch (error){

    // Compile Fehler: var error: unknown -> muss narrowen ob error wirklich Typ Error ist und somit eine message-Property besitzt
    //console.log(error.message);

    if (error instanceof Error){

        console.log(error.message);
    }
}

// der catch-Block wird ausgeführt, weil Promise.all() wenn eines der inneren Promises rejected wird dessen Zustand annimmt und einen Error wirft.
// Verbesserung: Sobald eines der Eingabe-Promises rejected wird, wird auch das gemeinsame Promise von Promise.all() rejected und übernimmt dessen Rejection-Grund


// 12.


async function failingTask2(): Promise<string> {

    await delay(2000);

    throw new Error("Task failed 2");
}

try {

    const result = await Promise.any([

        failingTask(),
        failingTask2()
    ]);
} catch (error){

    if (error instanceof AggregateError){

        // gibt alle Errors aus, die durch AggregateError gesammelt wurden? Also alle, die in Promise.any() rejected wurden? Sind ja dann alle, weil Promise.any() den Zustand und Wert des ersten fulfilled Promise annimmt
        // oder wenn keine fulfilled und somit alle rejected sind ein Aggregate Error wirft
        // -> error.errors enthält die Rejection-Gründe der Eingabe-Promises, die fehlgeschlagen sind
        // Und wichtig: Die Reihenfolge in errors folgt grundsätzlich der Reihenfolge der Eingabe-Promises, nicht zwingend der zeitlichen Reihenfolge ihrer Rejections
        // Verbesserung: Wenn ein Promise fulfilled wird, wird das gemeinsame Promise von Promise.any() mit dessen Wert fulfilled. Nur wenn alle rejected werden, wird das gemeinsame Promise mit einem AggregateError rejected
        console.log(error.errors);
    }
}


// 13.

// siehe Verständnisfragen



























































// 1. Was passiert bei:
//
// const result = await failingTask();
//
// wenn failingTask() ein rejected Promise zurückgibt?
//
// Antwort: Dann wird ein Error geworfen zur Runtime, weshalb man try/catch verwenden sollte. Wichtig zu wissen ist, dass die Variable error, die man catcht, oft unknown und nicht vom Typ Error sein muss,
// und dieses Objekt error nicht unbedingt eine message-Property haben muss,
// die man dann printen kann. Deshalb sollte man mit "error instanceof Error" narrowen in diesem Fall, bzw. mit mehreren Error Arten/Klassen weil JavaScript theoretisch alles werfen kann. Praktisch ist auch eigene Errorklassen
// zu schreiben, die man dann werfen und ihr Properties befüllen kann, und später im try/catch dann narrowen kann.

// Antwort: Genau richtig. Präzise: Wird das Promise von failingTask() rejected, verhält sich `await` an dieser Stelle so, als würde dort der Rejection-Grund geworfen.
// Deshalb wird `result` nicht erfolgreich initialisiert und der Kontrollfluss springt – falls vorhanden – in den passenden catch-Block.
// Der catch-Wert wird sinnvollerweise als `unknown` behandelt, weil JavaScript nicht nur Error-Instanzen werfen kann.


// 2. Was ist die Aufgabe von try/catch
// bei async/await-Code?
//
// Antwort: Die Aufgabe von try/catch bei async/await Code ist, den spezifischen Fehler aufzufangen, der bei einem rejected Gesamtpromise von Promise.all(), Promise.allSettled(), Promise.race(), Promise.any() usw.
// geworfen wird (je nachdem wann das passiert bei den verschiedenen Promise-Funktionen). 

// Antwort: Grundidee richtig, aber try/catch ist allgemeiner. Es fängt geworfene Fehler innerhalb des try-Blocks auf – dazu gehören auch Rejections von Promises, die mit `await` awaited werden.
// Es ist also nicht nur für Promise.all/race/any gedacht. Wichtig: Promise.allSettled() rejected normalerweise NICHT nur deshalb, weil eines seiner Eingabe-Promises rejected wurde.
// Bei Promise.all(), race() oder any() kann das gemeinsame Promise dagegen je nach Verhalten rejected werden und das `await` wirft dann in den catch-Block.


// 3. Warum ist `error` in einem catch-Block
// typischerweise nicht automatisch sicher vom Typ Error?
//
// Antwort: Weil in JavaScript theoretisch alles geworfen werden kann, nicht nur Instanzen von der Klasse Error, die wir mit catch auffangen.

// Antwort: Genau richtig. Es kann z.B. `throw new Error(...)`, aber auch `throw "Fehler"`, `throw 42` oder `throw { ... }` vorkommen.
// Deshalb kann TypeScript nicht einfach voraussetzen, dass Properties wie `message` existieren.


// 4. Warum funktioniert:
//
// if (error instanceof Error) {
//     console.log(error.message);
// }
//
// und was passiert dabei zur Runtime
// und zur Compile Time?
//
// Antwort: Es funktioniert weil wir hier die Errorklasse narrowen, ob error eine Instanz der Klasse Error ist. Zur Compile Time narrowed TypeScript nach diesem if-Statement die Variable error auf vom Typ Error oder nicht.
// Zur Runtime wird hier tatsächlich gecheckt ob error eine Instanz von Klasse Error ist, was besser ist eine Type Assertion zu machen, die TypeScript nur sagt dass error vom Typ Error ist und nichts zur Runtime prüft.

// Antwort: Genau das Prinzip. Zur Runtime prüft JavaScript tatsächlich `error instanceof Error`.
// Zur Compile Time analysiert TypeScript diesen möglichen Runtime-Kontrollfluss und narrowt `error` INNERHALB des if-Zweigs von `unknown` auf `Error`.
// Deshalb ist dort `error.message` erlaubt. Wichtig: Nicht die Klasse selbst wird genarrowed, sondern die Variable `error`.


// 5. Was ist der Unterschied zwischen:
//
// error as Error
//
// und:
//
// error instanceof Error
//
// Antwort: Das erste ist eine Type Assertion und sagt TypeScript dass error als vom Typ Error behandeln soll, lässt es aber nicht narrowen wie beim zweiten, außerdem wird dann nicht zur Runtime geprüft ob error vom Typ Error ist,
// weil das "as Error" nur in TypeScript zur Typzeit existiert und nicht mehr zur Runtime.

// Antwort: Richtig. `error as Error` ist eine reine Type Assertion: Du behauptest gegenüber TypeScript, dass der Wert als Error behandelt werden soll.
// Es findet keine Runtime-Prüfung statt. `error instanceof Error` ist dagegen echter Runtime-Code und TypeScript nutzt das Ergebnis zusätzlich für Control-Flow-Narrowing.
// Kleine Präzisierung: Bei `as Error` spricht man eher von einer Typbehauptung als von Narrowing.


// 6. Was passiert bei:
//
// throw error;
//
// innerhalb eines catch-Blocks?
//
// Antwort: Dann wird der Error nach außen propagiert also weitergeworfen, das Promise wird immernoch rejected.

// Antwort: Genau richtig. Das nennt man häufig Rethrow. Wird der Fehler aus einer async-Funktion heraus weitergeworfen, bleibt bzw. wird das Promise dieser async-Funktion rejected.
// Ein äußerer Aufrufer kann diese Rejection wiederum mit await + try/catch behandeln.


// 7. Was passiert mit dem Promise einer async-Funktion,
// wenn innerhalb dieser Funktion ein Error geworfen wird?
//
// Antwort: Dann wird das Promise rejected.

// Antwort: Genau richtig. Wird der Error nicht innerhalb der async-Funktion abgefangen und normal behandelt, beendet sich die async-Funktion mit einem rejected Promise.
// Der geworfene Wert wird dabei zum Rejection-Grund dieses Promises.


// 8. Warum können eigene Error-Klassen
// wie ApiError sinnvoll sein?
//
// Antwort: Weil man dann eigene Properties für den Error erstellen kann wie eine message, einen statusCode etc., die man dann beim Werfen setzen kann. Bei einer vorimplementierten Error-Klasse hat man nicht so viel
// Flexibilität bei deren Instanzen.

// Antwort: Grundidee richtig. Die eingebaute Error-Klasse besitzt bereits z.B. `message`, `name` und typischerweise `stack`.
// Eigene Error-Klassen sind vor allem sinnvoll, um DOMÄNENSPEZIFISCHE Informationen hinzuzufügen, z.B. `statusCode`, `endpoint`, `fieldName` usw.
// Zusätzlich kann man später mit `instanceof ApiError` gezielt zwischen verschiedenen Fehlerarten unterscheiden.


// 9. Was macht:
//
// error instanceof ApiError
//
// für TypeScript?
//
// Antwort: Es narrowed den Typ der Variable error auf den Typ ApiError.

// Antwort: Genau richtig – innerhalb des True-Zweigs. Zur Runtime wird tatsächlich geprüft, ob `error` eine Instanz von ApiError ist.
// Zur Compile Time nutzt TypeScript diese Prüfung und narrowt `error` dort auf ApiError.


// 10. Was passiert bei:
//
// await Promise.all(...)
//
// wenn eines der enthaltenen Promises rejected wird
// und der Aufruf in try/catch steht?
//
// Antwort: Dann wird das Gesamtpromise von Promise.all() rejected (die anderen Promises innerhalb können noch weiterlaufen) rejected und await wirft einen Fehler was vom catch aufgefangen wird und der Code darin wird ausgeführt.

// Antwort: Genau richtig. Sobald eines der Eingabe-Promises rejected wird, wird auch das gemeinsame Promise von Promise.all() rejected.
// Das `await` behandelt diese Rejection wie einen geworfenen Fehler, wodurch der normale try-Ablauf verlassen und der catch-Block ausgeführt wird.
// Bereits gestartete andere Promises werden dadurch nicht automatisch abgebrochen.


// 11. Was ist der Zusammenhang zwischen:
//
// Promise rejection
//
// und:
//
// throw / catch
//
// bei Verwendung von await?
//
// Antwort: try/catch ist kein Promise-spezifisches Feature, es behandelt allgemein geworfene Fehler.
// Bei await wird eine Promise-Rejection nur so behandelt, als würde an dieser Stelle ein Fehler geworfen.

// Antwort: Genau richtig. Das ist einer der zentralen Zusammenhänge:
// rejected Promise + await -> verhält sich im Kontrollfluss wie `throw`.
// Deshalb kann dieselbe try/catch-Struktur sowohl normal geworfene Fehler als auch awaited Promise-Rejections behandeln.


// 12. Warum sollte man unbekannte Fehler
// nicht einfach blind mit `as Error` behandeln?
//
// Antwort: Weil JavaScrpt alles werfen kann als Error, und diese Instanz nicht unbedingt von der Klasse Error sein muss, deren Objekte z.B. eine Property error.message hat.

// Antwort: Genau. JavaScript kann jeden beliebigen Wert werfen. `as Error` prüft diesen Wert nicht, sondern zwingt TypeScript nur dazu, ihn als Error zu behandeln.
// Wenn tatsächlich z.B. ein String geworfen wurde, kann Code wie `error.message` zur Runtime falsch sein.
// Deshalb ist eine echte Prüfung wie `error instanceof Error` sicherer.