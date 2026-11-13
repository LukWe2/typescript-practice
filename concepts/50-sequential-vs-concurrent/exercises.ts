// 1.
// Schreibe eine Hilfsfunktion:
//
// function delay(
//     ms: number
// ): Promise<void>
//
// Sie soll ein Promise zurückgeben,
// das erst nach `ms` Millisekunden erfüllt wird.
//
// Nutze dafür:
//
// new Promise(...)
// setTimeout(...)


// 2.
// Schreibe:
//
// async function getUser(): Promise<string>
//
// Die Funktion soll:
//
// - zuerst 2000 ms warten
// - danach "Lukas" zurückgeben
//
// Nutze dafür deine delay()-Funktion.


// 3.
// Schreibe:
//
// async function getProducts(): Promise<string[]>
//
// Die Funktion soll:
//
// - zuerst 3000 ms warten
// - danach ein Array mit mindestens zwei Produktnamen zurückgeben.


// 4.
// Schreibe:
//
// async function loadSequential(): Promise<void>
//
// Rufe darin zuerst getUser() auf
// und awarte das Ergebnis direkt.
//
// Erst DANACH soll getProducts() aufgerufen
// und ebenfalls direkt awaited werden.
//
// Gib anschließend user und products aus.
//
// Miss zusätzlich die Laufzeit mit:
//
// console.time("sequential");
//
// und:
//
// console.timeEnd("sequential");
//
// Erwartung:
// ungefähr 5 Sekunden.


// 5.
// Erkläre direkt unter loadSequential()
// in Kommentaren,
// warum die beiden Operationen hier
// sequenziell ausgeführt werden.


// 6.
// Schreibe:
//
// async function loadConcurrent(): Promise<void>
//
// Starte zuerst getUser(),
// aber awarte das Ergebnis noch NICHT.
//
// Speichere das Promise in:
//
// const userPromise = ...
//
// Starte danach getProducts(),
// ebenfalls ohne direkt await zu verwenden.
//
// Speichere das Promise in:
//
// const productsPromise = ...
//
// Erst danach sollst du:
//
// userPromise
// productsPromise
//
// jeweils awaiten.
//
// Gib anschließend user und products aus.
//
// Miss wieder die Laufzeit mit:
//
// console.time("concurrent");
//
// und:
//
// console.timeEnd("concurrent");
//
// Erwartung:
// ungefähr 3 Sekunden.
//
// Noch KEIN Promise.all() verwenden.


// 7.
// Erkläre direkt unter loadConcurrent()
// in Kommentaren:
//
// - warum beide Operationen hier früher gestartet werden
// - warum die gesamte Laufzeit ungefähr nur
//   der langsamsten Operation entspricht
// - warum die beiden `await` trotzdem noch
//   nacheinander im Code stehen können.


// 8.
// Schreibe eine weitere Funktion:
//
// async function getSettings(): Promise<string>
//
// Sie soll 1000 ms warten
// und danach zum Beispiel:
//
// "dark"
//
// zurückgeben.


// 9.
// Schreibe:
//
// async function loadThreeSequential(): Promise<void>
//
// Lade:
//
// getUser()
// getProducts()
// getSettings()
//
// bewusst vollständig sequenziell.
//
// Miss die Laufzeit.
//
// Überlege vorher in einem Kommentar,
// welche ungefähre Laufzeit du erwartest.


// 10.
// Schreibe:
//
// async function loadThreeConcurrent(): Promise<void>
//
// Starte zuerst alle drei Operationen,
// ohne direkt await zu verwenden.
//
// Speichere ihre Promises.
//
// Awate erst danach die drei Promises.
//
// Miss die Laufzeit.
//
// Überlege vorher in einem Kommentar,
// welche ungefähre Laufzeit du erwartest.
//
// Noch KEIN Promise.all() verwenden.


// 11.
// Schreibe:
//
// async function getUserId(): Promise<number>
//
// Die Funktion soll nach 1500 ms
// die Zahl 5 zurückgeben.
//
// Schreibe danach:
//
// async function getPostsForUser(
//     userId: number
// ): Promise<string[]>
//
// Sie soll nach 2000 ms
// ein Array mit Posts zurückgeben.


// 12.
// Schreibe:
//
// async function loadUserPosts(): Promise<void>
//
// Lade zuerst die userId über getUserId().
//
// Verwende diese ID danach als Argument für:
//
// getPostsForUser(userId)
//
// Erkläre in Kommentaren,
// warum diese beiden Operationen NICHT sinnvoll
// gleichzeitig gestartet werden können.


// 13.
// Schreibe abschließend in Kommentaren:
//
// - was sequenzielle Async-Ausführung bedeutet
// - was concurrent gestartete Async-Ausführung bedeutet
// - wodurch eine Async-Operation tatsächlich gestartet wird
// - welche Rolle `await` dabei spielt
// - warum zwei aufeinanderfolgende `await`s
//   nicht automatisch bedeuten,
//   dass die Operationen vorher gleichzeitig gestartet wurden
// - wann sequenzielle Ausführung notwendig ist
// - wann concurrent Ausführung sinnvoll ist
// - warum Datenabhängigkeiten dabei entscheidend sind