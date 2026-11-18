// 1.

function delay(ms: number): Promise<void> {

    return new Promise<void>((resolve) => {

        setTimeout(() => {

            resolve();
        }, ms)
    })
};


// 2.

async function successfulTask(): Promise<string> {

    await delay(1000);

    return "Success";
}


// 3.

async function failingTask(): Promise<string> {

    await delay(1500);

    throw new Error("Task failed");
}


// 4.

const results = await Promise.allSettled([

    successfulTask(),
    failingTask()
]);


console.log(results);


// 5.

const result1 = results[0];

if (result1.status === "fulfilled"){

    console.log(result1.value);
} else {

    console.log(result1.reason);
}


// 6.

const result2 = results[1];

if (result2.status === "fulfilled"){

    console.log(result2.value);
} else {

    console.log(result2.reason);
}


// 7.

async function getUser(): Promise<string>{

    await delay(1000);

    return "Lukas";
}

async function getProducts(): Promise<void>{

    await delay(2000);

    throw new Error("Error");
}

async function getSettings(): Promise<string>{

    await delay(1500);

    return "dark";
}

const results2 = await Promise.allSettled([

    getUser(),
    getProducts(),
    getSettings()
]);


// 8.

for (const result of results2){

    if (result.status === "fulfilled"){

        console.log("Erfolg:", result.value);
    } else {

        console.log("Fehler:", result.reason);
    }
}


// 9.

// Promise.allSettled() wartet auf alle Promises, bis jedes entweder fulfilled oder rejected ist. Nicht wie Promise-.all(), das als Gesamtpromise rejected ist, wenn ein Promise der als Arguemnte aufgerufene Funktionen und deren Promises rejected ist.
// Für jedes Promise entsteht ein Result-Objekt: fulfilled -> { status: "fulfilled", value: ... } oder rejected  -> { status: "rejected", reason: ... }, somit ist das Ergebnis vom Gesamtpromise von Promise.allSettled() ein Array aus Objekten!
// Deshalb bleiben erfolgreiche Ergebnisse verfügbar, auch wenn andere Promises rejected wurden.


// 10.

try {
    const results3 = await Promise.all([

        getUser(),
        getProducts(),
        getSettings()
    ]);
} catch (error){

    console.log("Error results3");
}

// Beim Fehlverhalten eines Promises der Argumentfunktionen wird das Gesamtpromise als rejected gewertet und man bekommt kein Ergebnistupel zurück das man destructen könnte



// 11.

async function loadDashboard(): Promise<void> {

    async function loadProfile(){

        await delay(1000);

        return "Profile loaded";
    }

    async function loadStatistics(){

        await delay(1000);

        throw new Error("Error Task 11");
    }

    async function loadRecommendations(){

        await delay(1000);

        return "Recommendations loaded";
    }


    const results3 = await Promise.allSettled([

        loadProfile(),
        loadStatistics(),
        loadRecommendations()
    ]);


    for (const result of results3){

        if (result.status === "fulfilled"){

            console.log("Erfolg:", result.value);
        } else {

            console.log("Fehler:", result.reason);
        }
    }

    // könnten wir die Daten von Promise.allSettled() returnen, könnten wir diese außerhalb benutzen.
    // Dann dürfte loadDashboard() nicht Promise<void> zurückgeben,
    // sondern z.B. Promise<[PromiseSettledResult<string>, PromiseSettledResult<never>, PromiseSettledResult<string>]>.
    // Einfacher kann man den Rückgabetyp aber auch von TypeScript inferieren lassen und `return results` schreiben.

    // return results;
}

const resultsDashboard = await loadDashboard();


// 12.

// siehe Verständnisfragen




















































// 1. Was bedeutet bei einem Promise der Begriff `settled`?
//
// Antwort: Settled bedeutet dass ein Promise nicht mehr pending ist sondern fullfilled oder rejected. Im Sinne von Promise.allSettled() heißt es, dass gewartet wird bis alle
// Promises die durch die Funktionsaufrufe die als Argumente übergeben und ausgelöst werden entweder fullfilled oder rejected werden, und dann ein Ergebnisobjekt auch für
// rejected Promises zurückgegeben wird also insgesamt ein Tupel aus diesen. Das ist im Gegensatz zu Promise.all(), bei dem wenn ein Promise der Funktionsaufrufe rejected wird
// dann wird ein Error geworfen und auf die restlichen Promises danach nicht mehr gewartet. Man bekommt dann auch garkein Ergebnistupel mehr das man destructen könnte. Promise.allSettled() gibt
// kein Tupel aus den Ergebnisdaten sondern ein Ergebnisobjekt mit zwei Properties, einmal den status und einmal die Daten wie bei Promise.all().

// Antwort: Inhaltlich richtig. Nur `fulfilled` statt `fullfilled`. `settled` bedeutet allgemein: Das Promise ist nicht mehr `pending`, sondern endgültig `fulfilled` oder `rejected`.
// Bei Promise.allSettled() wird auf alle Promises gewartet, bis jedes settled ist. Danach erhält man für jede Eingabe ein Result-Objekt. Wichtig: Es gibt nicht immer `status + value`,
// sondern bei Erfolg `status + value` und bei Fehler `status + reason`.


// 2. Was ist der wichtigste Unterschied zwischen:
//
// Promise.all(...)
//
// und:
//
// Promise.allSettled(...)?
//
// Antwort: Der wichtigste Unterschied ist, dass Promise.allSettled() nicht abbricht, wenn ein Promise das durch die als Argument angegebenen Funktionen entsteht rejected wird. Also das Gesamtpromise, das Promise.allSettled() returned wird nicht
// insgesamt rejected, wenn die darin enthaltenen Promises rejected werden, sondern es returned ein Tupel aus Ergebnisobjekten mit einer Property die den Status beschreibt und einer die den Ergebniswert beschreibt.

// Antwort: Genau richtig. Präzisierung: Promise.allSettled() wartet auf alle Eingaben und wird danach selbst fulfilled, auch wenn einzelne Eingabe-Promises rejected wurden.
// Die Result-Objekte enthalten entweder `status: "fulfilled"` + `value` oder `status: "rejected"` + `reason`.


// 3. Was passiert bei Promise.allSettled(),
// wenn eines der enthaltenen Promises rejected wird?
//
// Wird dadurch auch das gemeinsame Promise sofort rejected?
//
// Antwort: Dann wird es nur im Ergebnistupel aus Ergebnisobjekten als rejected als Status gesetzt, und die anderen Promises laufen weiter durch, im Gegensatz zu Promise.all(). Das gemeinsame Promise wird dann eben nicht sofort rejected wie bei Promise.all()

// Antwort: Genau richtig. Das einzelne Result-Objekt bekommt `status: "rejected"` und eine `reason`-Property. Promise.allSettled() wartet trotzdem weiter,
// bis auch alle übrigen Promises settled sind. Erst dann wird das gemeinsame Promise fulfilled und liefert alle Result-Objekte zurück.


// 4. Welche zwei grundlegenden Formen kann ein Ergebnis
// von Promise.allSettled() besitzen?
//
// Antwort: Das im gemeinsamen Promise returnte Ergebnisarray kann zwei Status haben: rejected und fullfilled. Die andere Property ist dann der Wert wenn das zugehörige Promise fullfilled wurde.

// Antwort: Fast richtig. Nicht das gesamte Ergebnisarray hat einen der beiden Status, sondern JEDES einzelne Result-Objekt hat eine von zwei Formen:
// `{ status: "fulfilled", value: T }` oder `{ status: "rejected", reason: any }`.
// Also bei fulfilled gibt es `value`, bei rejected gibt es `reason`.


// 5. Was bedeutet:
//
// {
//     status: "fulfilled",
//     value: ...
// }
//
// und was bedeutet:
//
// {
//     status: "rejected",
//     reason: ...
// }
//
// Antwort: Das erste bedeutet dass die als Argument übergebene Funktion und das entstehende Promise daraus fullfilled wurde und dann im Ergebnistupel ein Ergebnisobjekt mit status Property fulfilled bekommen hat. Das zweite bedeutet dass das jeweilige Promise
// rejected wurde.

// Antwort: Richtig. Ergänzung: Beim fulfilled-Fall enthält `value` den aufgelösten Wert des Promises. Beim rejected-Fall enthält `reason` den Grund der Rejection,
// häufig z.B. ein Error-Objekt.


// 6. Warum kann man bei einem Result von Promise.allSettled()
// nicht einfach immer:
//
// result.value
//
// verwenden?
//
// Antwort: Weil man bei Promise.allSettled() nicht direkt destructen kann wie bei Promise.all() weil man Ergebnisobjekte in einem Tupel bekommt wo auch rejected Promises aufgeführt sind, 
// deshalb muss man den Status jedes Objekts im Ergebnistupel prüfen, ob das jeweilige Promise an der  Tupelstelle fullfilled wurde. Erst dann kann man result.value verwenden weil dann erst sicher ist, 
// dass ein value überhaupt existiert und das ist nur so, wenn das Promise fullfilled wurde und nicht rejected wurde.

// Antwort: Genau richtig. Der entscheidende Typgrund ist: `result` ist eine Discriminated Union. Im rejected-Fall existiert die Property `value` gar nicht.
// Deshalb muss über `status` genarrowed werden. Kleine Ergänzung: Man KANN das Ergebnisarray natürlich destructuren, aber die destructurierten Elemente sind dann trotzdem Result-Objekte,
// keine direkt aufgelösten Werte wie bei Promise.all().


// 7. Warum funktioniert folgendes Narrowing?
//
// if (result.status === "fulfilled") {
//     console.log(result.value);
// }
//
// Antwort: Es funktioniert weil Promise.allSettled() ein Tupel aus Ergebnisobjekten zurückgibt als gemeinsames Promise, was die Ergebnisse der als Argument übergebenen Funktionen und deren Promises enthält in Form einer status Property und einer
// value Property, deswegen kann man hier den status prüfen ob dieser fullfilled ist also das zugehörige Promise (nicht das gemeinsame, das einzelne!)  und dann auf den value des Promise zugreifen, in dem der Wert der aus dem Promise folgt gespeichert wird

// Antwort: Grundidee richtig. Der eigentliche Grund für das TypeScript-Narrowing ist aber die Discriminated Union. `status` ist der Discriminator.
// Wenn `result.status === "fulfilled"` gilt, weiß TypeScript, dass `result` die fulfilled-Variante sein muss und deshalb `value` existiert.
// Im rejected-Fall würde dagegen `reason` existieren.


// 8. Welches bereits gelernte TypeScript-Konzept
// steckt hinter den Result-Objekten von Promise.allSettled()?
//
// Antwort: Dahinter steckt eine Discriminated Union, wobei der Diskriminator die status Property ist. D.h. der Typ eines einzelnen allSettled()-Ergebnis (nicht von allen, von einem Promise innerhalb des Gesamtpromise) ist eine Discriminated Union
// aus Objekttypen, die entweder einen status als Literal String "fullfilled" oder "rejected" haben und eine value Property die entweder T als Typ hat oder eine reason wenn rejected mit Typ any.

// Antwort: Genau richtig. Nur zwei Korrekturen: `"fulfilled"` statt `"fullfilled"` und die beiden Varianten haben nicht beide `value`.
// Vereinfacht:
// `{ status: "fulfilled"; value: T } | { status: "rejected"; reason: any }`.


// 9. Angenommen:
//
// getUser()     -> fulfilled
// getProducts() -> rejected
// getSettings() -> fulfilled
//
// Was liefert Promise.allSettled() grundsätzlich zurück?
//
// Antwort: Promise.allSettled() liefert grundsätzlich auch wenn ein Promise rejected wird für jedes Promise ein Ergebnisobjekt, das gesamte Promise von Promise.allSettled() 
// gibt dann ein Tupel aus diesen Ergebnisobjekten mit status- und value- bzw. reason-Property zurück.

// Antwort: Genau richtig. Nach dem await erhält man drei Result-Objekte in derselben Reihenfolge wie die Eingaben:
// fulfilled-Result für User, rejected-Result für Products und fulfilled-Result für Settings.


// 10. Werden die async-Operationen bei Promise.allSettled()
// weiterhin concurrent ausgeführt,
// wenn sie unabhängig voneinander sind?
//
// Antwort: Ja der Unterschied zwischen Promise.allSettled() und Promise.all() ist nciht die Concurrent-Ausführung, sondern was passiert, wenn die einzelnen Promises, die aufgrund der Funktionsaufrufe der Argumente vom Gesamtpromise entstehen, rejected werden. 

// Antwort: Genau richtig. Die Funktionsaufrufe werden weiterhin direkt hintereinander ausgewertet, sodass sich die asynchronen Operationen zeitlich überlappen können.
// Der Unterschied liegt im Umgang mit Rejections und darin, wann das gemeinsame Promise settled wird.


// 11. Wann würdest du eher Promise.all() verwenden
// und wann eher Promise.allSettled()?
//
// Antwort: Promise.allSettled() ist sinnvoll, wenn ein einzelnes rejected Promise nicht den gesamten Vorgang unbrauchbar machen soll und man aus den anderen immernoch den value bekommen soll. Promise.all() ist sinnvoll wenn ein rejected Promise
// die gesamte Operation unterbrechen soll und das Ergebnis nicht nutzbar machen soll.

// Antwort: Genau richtig. Promise.all() ist passend, wenn ALLE Ergebnisse benötigt werden und schon ein Fehler den Gesamtvorgang scheitern lassen soll.
// Promise.allSettled() ist passend, wenn man jedes Einzelergebnis separat auswerten möchte und auch erfolgreiche Ergebnisse trotz anderer Fehler weiterverwenden will.


// 12. Welchen Vorteil hat Promise.allSettled(),
// wenn z.B. mehrere unabhängige Bereiche eines Dashboards
// geladen werden sollen?
//
// Antwort: Dass einige Bereiche trotzdem geladen werden, auch wenn ein Bereich bzw. Element nicht richtig geladen werden konnte.

// Antwort: Genau richtig. Dadurch kann z.B. Profil erfolgreich angezeigt werden, Statistik fehlschlagen und Empfehlungen trotzdem ebenfalls angezeigt werden.
// Man kann jeden Bereich anhand seines eigenen Result-Objekts separat behandeln, statt wegen eines einzelnen Fehlers das gesamte Dashboard als fehlgeschlagen zu behandeln.
