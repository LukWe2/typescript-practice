// 1.

function delay(ms: number): Promise<void> {

    return new Promise<void>((resolve) => {

        setTimeout(() => {

            resolve();
        }, ms);
    })
};


// 2.

async function slowTask(): Promise<string> {

    await delay(3000);

    return "slow";
}


// 3.

async function fastTask(): Promise<string> {

    await delay(1000);

    return "fast";
}


// 4.

const resultRace = await Promise.race([

    slowTask(),
    fastTask()
]);

// ich erwarte nach 1 Sekunde das Ergebnis "fast", weil .race() auf das erste settled Promise egal ob fulfilled oder rejected returned wird also dessen Wert in das Gesamt-
// promise von Promise.race() und in die Ergebnisvariable gepackt wird.

// Verbesserung: Das gemeinsame Promise von Promise.race() übernimmt den Zustand und gegebenenfalls wenn es fulfilled ist den Ergebniswert des ersten settled Promises.


// 5.

async function fastFailingTask(): Promise<string> {

    await delay(500);

    throw new Error("Manual error thrown");
}

try {

    const resultRace2 = await Promise.race([

        fastFailingTask(),
        slowTask()
    ]);
} catch (error){

    console.log("Error was thrown!");
}

// Promise.race() wird trotzdem rejected, obwohl slowTask() später erfolgreich wäre, weil das Gesamtpromise von Promise.race() den Wert des ersten settled Promise bekommt
// egal ob fulfilled oder rejected.

// Verbesserung: Bei einem rejected Promise bekommt das gemeinsame Promise nicht dessen „Wert“, sondern übernimmt den Zustand rejected und den Rejection-Grund / Error, slowTask() läuft trotzdem weiter.



// 6.

try {

    const resultAny = await Promise.any([

        fastFailingTask(),
        slowTask()
    ]);
} catch (error){

    console.log("Error was thrown!");
}

// Das Verhalten unterscheidet sich von Promise.race(), weil Promise.any() das erste fulfilled Promise bekommt bzw. dessen Wert, und nicht das erste settled.
// Es ignoriert dabei erstmal rejected Promises, und schaut ob noch ein Promise fulfilled wird, wenn ja wird dieses returned und das Gesamtpromise von Promise.any() ist auch
// fullfilled, wenn nein dann wird ein AggregateError geworfen.


// 7.

async function fastFailingTask1(): Promise<string> {

    await delay(1000);

    throw new Error("Manual error thrown");
}

async function fastFailingTask2(): Promise<string> {

    await delay(2000);

    throw new Error("Manual error thrown");
}

async function fastFailingTask3(): Promise<string> {

    await delay(200);

    throw new Error("Manual error thrown");
}


try {

    const resultAny2 = await Promise.any([

        fastFailingTask1(),
        fastFailingTask2(),
        fastFailingTask3()
    ]);
} catch (error){

    if (error instanceof AggregateError) {
        console.log(error.errors);
    }

    console.log("Error was thrown!");
}





// 8.

async function serverA(): Promise<string> {

    await delay(200);

    throw new Error("Manual error thrown");
}

async function serverB(): Promise<string> {

    await delay(2000);

    return "serverB successfull!";
}

async function serverC(): Promise<string> {

    await delay(3000);

    return "serverC successfull!";
}


try {

    const resultAny3 = await Promise.any([

        serverA(),
        serverB(),
        serverC()
    ]);
} catch (error){

    console.log("Error was thrown!");
}


// 9.

async function getUser(): Promise<{ id: number; name: string }> {

    await delay(5000);

    return (

        {
            id: 1,
            name: "Lukas"
        }
    )
}

async function getFallbackName(): Promise<string> {

    return "Luke";
}

const result = await Promise.race([

    getUser(),
    getFallbackName()
]);

// TypeScript inferriert für result den Typ:
/*
const result: string | {
 id: number;
 name: string;
}
*/

if (typeof(result) === "string"){

    result.toUpperCase();
} else {

    result.id.toFixed();
}


// Hier nochmal wichtig: Das ist ein normaler Union Type, keine Discriminated Union


// 10.

async function timeout(): Promise<never> {

    await delay(2000);

    throw new Error("Timeout");
}

// await nicht vergessen!
try {
    const resultRace3 = await Promise.race([
        slowTask(),
        timeout()
    ]);

    console.log(resultRace3);

} catch (error) {
    console.log("Timeout");
}

// Für Timeout wird Promise.race() verwendet, weil der ERSTE settled Promise returned wird also dessen Wert, entweder fulfilled oder rejected. Wenn die asynchrone
// Operation also erfolgreich ist, wird dieses returned und das Gesamtpromise ebenfalls fulfilled, wenn nach einer bestimmten Zeit es nicht erfüllt wird, wird das Gesamtpromise
// rejected. Der Vorteil ist also, dass das erste Promise was settled wird returned wird und das andere damit für diese Operation keine Relevanz mehr hat, es kann aber weiterlaufen.


























































// 1. Was bedeutet Promise.race() grundsätzlich?
// Welches Promise entscheidet über das gemeinsame Promise?
//
// Antwort: Promise.race() bedeutet, dass die async-Funktionen innerhalb genauso wie bei Promise.all() oder Promise.allSettled() gestartet werden und direkt das Promise an Promise.race()
// übergeben. Promise.race() awaited diese dann also wartet auf deren Ergebnisse. Bei .race() ist das Konzept, dass es das erste Promise, was settled wurde zurückgibt.
// Und das erste Promise was settled wird, entscheidet dann über das gemeinsame Promise von Promise.race(). Das Gesamtpromise wird also entweder fulfilled oder rejected, je nachdem ob das ERSTE
// Promise was ein Ergebnis zurückgibt fulfilled oder rejected ist. Wichtig: Wenn das Gesamtpromise fulfilled oder rejected und hier die Promise
// Methode abgebrochen wird also das Gesamtpromise schon der Status steht, können die Einzelpromises darin noch fertig laufen und danach noch awaited werden, wenn vorher eine Referenz darauf erstellt wurde.

// Antwort: Grundidee richtig. Zwei Präzisierungen: Promise.race() „awaited“ die Einzelpromises nicht im Sinne von intern geschriebenem `await`, sondern erzeugt ein gemeinsames Promise,
// das auf den Zustand der Eingabe-Promises reagiert. Außerdem wird nicht das erste Promise-Objekt selbst zurückgegeben. Das gemeinsame Promise übernimmt den Zustand und Wert/Fehler des ERSTEN settled Promises.
// Wird dieses zuerst fulfilled, wird das gemeinsame Promise fulfilled; wird es zuerst rejected, wird das gemeinsame Promise rejected. Die übrigen Promises laufen trotzdem weiter.


// 2. Was bedeutet Promise.any() grundsätzlich?
//
// Antwort: Promise.any() bedeutet jetzt, dass das erste Promise was fulfilled wird zurückgegeben wird bzw. dann das Gesamtpromise fulfilled. Rejected Promises werden erstmal ignoriert.
// Wenn aber alle Promises rejected wird und kein einziges fufilled, ist das gemeinsame Promise von Promise.any() auch rejected, sobald das erste erfolgreiche fulfilled wurde, ist das Gesamtpromise
// fulfilled. Wichtig: Wenn das Gesamtpromise fulfilled oder rejected und hier die Promise
// Methode abgebrochen wird also das Gesamtpromise schon der Status steht, können die Einzelpromises darin noch fertig laufen und danach noch awaited werden, wenn vorher eine Referenz darauf erstellt wurde.

// Antwort: Richtig. Präziser: Nicht das erste fulfilled Promise-Objekt wird zurückgegeben, sondern das gemeinsame Promise von Promise.any() wird mit dessen ERGEBNISWERT fulfilled.
// Einzelne Rejections beeinflussen das gemeinsame Promise zunächst nicht. Erst wenn ALLE Eingabe-Promises rejected sind, rejected auch das gemeinsame Promise mit einem AggregateError.
// Auch hier werden die anderen bereits gestarteten Promises nicht automatisch abgebrochen.


// 3. Was ist der entscheidende Unterschied zwischen:
//
// Promise.race()
//
// und:
//
// Promise.any()?
//
// Antwort: siehe Erklärungen 1. und 2.: Promise.race() -> erstes Promise was entweder fulfilled oder rejected wird entscheidet über Gesamtpromise, Promise.any() -> wenn ein Promise fulfilled wird
// ist ab diesem Zeitpunkt das Gesamtpromise fulfilled, wenn alle rejected wurden dann ist Gesamtpromise auch rejected bzw. ein AggregateError wird geworfen zur Runtime. 
// Wichtig: Wenn das Gesamtpromise fulfilled oder rejected und hier die Promise Methode abgebrochen wird also das Gesamtpromise schon der Status steht, 
// können die Einzelpromises darin noch fertig laufen und danach noch awaited werden, wenn vorher eine Referenz darauf erstellt wurde.

// Antwort: Genau richtig. `race()` interessiert sich für das erste SETTLED Promise, also Erfolg ODER Fehler. `any()` interessiert sich nur für das erste FULFILLED Promise.
// Sprachlich besser nicht „die Promise-Methode wird abgebrochen“, sondern: Das gemeinsame Promise ist ab diesem Zeitpunkt settled. Die anderen Eingabe-Promises können unabhängig davon weiterlaufen.


// 4. Angenommen:
//
// taskA -> rejected nach 1 Sekunde
// taskB -> fulfilled nach 2 Sekunden
// taskC -> fulfilled nach 3 Sekunden
//
// Was passiert bei Promise.race()?
//
// Antwort: Bei Promise.race() wäre das Gesamtpromise nach 1 Sekunde rejected, weil taskA settled wurde, und zwar rejected. Die anderen zwei Promises würden aber nicht abgebrochen werden sondern
// laufen weiter, weil ein gemeinsames Promise nicht automatisch die laufenden asynchronen Vorgänge kontrolliert.

// Antwort: Genau richtig. Nach 1 Sekunde entscheidet taskA das Rennen. Das gemeinsame Promise von Promise.race() wird rejected. taskB und taskC laufen trotzdem weiter und können später noch fulfilled werden.


// 5. Was passiert bei denselben drei Promises
// bei Promise.any()?
//
// Antwort: Bei Promise.any() wäre das Gesamtpromise nach 2 Sekunden fulfilled, weil rejected Promises und somit taskA erstmal ignoriert wird, und erst alle abgewartet werden ob ein Promise fulfilled wird
// Das ist hier beim zweiten der Fall und das Gesamtpromise wird ebenfalls fulfilled. Wenn keins fulfilled sondern alle rejected worden wären, wäre das Gesamtpromise anch 3 (oder 6? 
// werden sie hier nacheinander awaited?) Sekunden
// rejected worden, .any() wartet alle Promises ab ob eins fulfilled wird. Die anderen zwei Promises würden aber nicht abgebrochen werden sondern
// laufen weiter, weil ein gemeinsames Promise nicht automatisch die laufenden asynchronen Vorgänge kontrolliert.

// Antwort: Richtig bis auf die Zeitfrage: Die Promises werden NICHT nacheinander awaited, sondern alle direkt gestartet und können concurrent laufen.
// Bei den Zeiten 1s, 2s und 3s wäre Promise.any() nach 2 Sekunden fulfilled, weil taskB das erste erfolgreiche Promise ist.
// Wenn alle drei rejected würden und ihre Endzeiten 1s, 2s und 3s wären, würde Promise.any() nach ungefähr 3 Sekunden rejected – nicht nach 6 Sekunden.
// Es muss nur warten, bis feststeht, dass wirklich kein Promise mehr erfolgreich werden kann, also bis auch das letzte noch offene Promise rejected ist.


// 6. Was passiert bei Promise.any(),
// wenn ALLE enthaltenen Promises rejected werden?
//
// Antwort: Dann ist auch das Gesamtpromise rejected. Aber es werden erst alle Promises auf ein fulfilled geprüft und vorher rejected Promises ignoriert. Wenn alle Promises rejected werden wird ein AggregateError geworfen.

// Antwort: Genau richtig. Das gemeinsame Promise von Promise.any() bleibt solange pending, wie noch mindestens ein Eingabe-Promise erfolgreich werden könnte.
// Sind schließlich alle rejected, wird das gemeinsame Promise mit einem AggregateError rejected.


// 7. Was ist ein AggregateError
// im Zusammenhang mit Promise.any()?
//
// Antwort: Ein AggregateError ist ein Error, der mehrere Fehler zusammenfassen kann und geworfen wird zur Runtime, wenn keine der Promises in Promise.any() fulfilled werden sondern alle rejected.

// Antwort: Genau richtig. Der AggregateError bündelt die Rejection-Gründe der fehlgeschlagenen Promises. Er besitzt dafür u.a. eine `errors`-Property,
// in der die einzelnen Fehler/Rejection-Gründe gesammelt werden können.


// 8. Werden die anderen bereits gestarteten Promises
// automatisch abgebrochen,
// sobald Promise.race() oder Promise.any() entschieden ist?
//
// Antwort: Nein, wenn das Gesamtpromise fulfilled oder rejected und hier die Promise Methode abgebrochen wird also das Gesamtpromise schon der Status steht, 
// können die Einzelpromises darin noch fertig laufen und danach noch awaited werden, wenn vorher eine Referenz darauf erstellt wurde

// Antwort: Genau richtig. Wieder nur sprachlich: Nicht die Methode wird „abgebrochen“, sondern das gemeinsame Promise ist bereits settled.
// Die anderen Promises laufen weiter. Wenn man vorher z.B. `const p = someTask();` gespeichert hat, kann man dieses Promise später sogar noch separat awaiten.


// 9. Welchen Typ hat `result` ungefähr?
//
// getUser(): Promise<User>
// getName(): Promise<string>
//
// const result = await Promise.race([
//     getUser(),
//     getName()
// ]);
//
// Antwort: Hier hat result den Typ "User | string", weil bei .race() der erste settled Promise returned wird an Promise.race() und somit könnte es der Wert des einen Typs sein oder des anderen, deswegen Discriminated Union.
// TypeScript weiß nicht, welcher Promise zuerst gesettled wird.

// Antwort: Der Typ `User | string` ist richtig. Es ist aber KEINE Discriminated Union, sondern einfach ein normaler Union Type.
// Eine Discriminated Union bräuchte typischerweise mehrere Objekttypen mit einer gemeinsamen Literal-Property wie `status` oder `kind`.
// TypeScript weiß hier einfach nicht, welches Promise zuerst fulfilled wird; bei einem Reject würde `await` ohnehin einen Fehler werfen statt einen Wert zu liefern.


// 10. Welchen Typ hat `result` bei:
//
// const result = await Promise.any([
//     getUser(),
//     getName()
// ]);
//
// Antwort: Hier hat result auch den Typ "User | string", weil bei .any() den ersten fulfilled Promise returned wird an Promise.any() und somit könnte es der Wert des einen Typs sein oder des anderen, deswegen Discriminated Union.
// TypeScript weiß nicht, welcher Promise zuerst gesettled wird.

// Antwort: `User | string` ist wieder richtig, aber ebenfalls nur ein normaler Union Type. Außerdem interessiert Promise.any() nicht, welches Promise zuerst settled,
// sondern welches zuerst FULFILLED wird. Rejected Promises liefern keinen Ergebniswert für `result`.


// 11. Warum eignet sich Promise.race()
// grundsätzlich für Timeout-Patterns?
//
// Antwort: Weil der erste settled Promise returned wird, also entweder fulfilled oder rejected und nicht auf alle Promises gewartet wird. Bei einem erfolgreichen Datenabruf wäre es fulfilled, bei einem zu langen Warten und Timeout wäre es rejected.
// Somit wird der erste Status direkt returned.

// Antwort: Genau. Typisch lässt man z.B. einen Datenabruf gegen ein Timeout-Promise „antreten“. Wird der Datenabruf zuerst fulfilled, gewinnt dessen Wert.
// Wird das Timeout-Promise zuerst rejected, wird auch das gemeinsame Promise von race() rejected. Die andere Operation wird dadurch allerdings noch nicht automatisch gecancelt.


// 12. Warum eignet sich Promise.any(),
// wenn mehrere unabhängige Quellen
// dieselben Daten liefern können?
//
// Antwort: Weil sichergestellt wird dass der erste fulfilled Promise zurückgegeben wird wenn der Datenabruf funktioniert und wenn keiner erfolgreich war rejected wird. Rejected Promises werden vorerst ignoriert,
// somit bekommt man die erste erfolgreiche Promise und nicht auch den ersten rejected Promise wie bei .race()

// Antwort: Genau richtig. Man bekommt den Wert der ersten erfolgreichen Quelle. Schnell fehlschlagende Quellen verhindern damit nicht, dass eine etwas langsamere erfolgreiche Quelle noch gewinnen kann.


// 13. Ordne zu:
//
// Promise.all()
// Promise.allSettled()
// Promise.race()
// Promise.any()
//
// - erstes settled
// - erstes fulfilled
// - alle fulfilled
// - alle settled
//
// Antwort: Promise.all() -> alle fulfilled (alle erfolgreich), Promise.allSettled() -> alle settled (alle behandelt), Promise.race() -> erstes settled, Promise.any() -> erstes fulfilled

// Antwort: Genau richtig.
// Promise.all()        -> alle fulfilled
// Promise.allSettled() -> alle settled
// Promise.race()       -> erstes settled
// Promise.any()        -> erstes fulfilled