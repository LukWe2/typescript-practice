// 1.
// Verwende wieder:
//
// function delay(
//     ms: number
// ): Promise<void>
//
// Das Promise soll nach `ms` Millisekunden
// fulfilled werden.


// 2.
// Schreibe:
//
// async function successfulTask(): Promise<string>
//
// Warte 1000 ms
// und gib danach:
//
// "Success"
//
// zurück.


// 3.
// Schreibe:
//
// async function failingTask(): Promise<string>
//
// Warte 1000 ms
// und wirf danach:
//
// new Error("Task failed");


// 4.
// Rufe failingTask() mit await
// innerhalb eines try/catch-Blocks auf.
//
// Narrowe `error` im catch
// mit:
//
// error instanceof Error
//
// und gib anschließend error.message aus.


// 5.
// Schreibe:
//
// async function loadData(): Promise<string>
//
// Rufe darin failingTask() auf.
//
// Fange den Fehler innerhalb von loadData()
// zunächst mit try/catch ab,
// gib eine Meldung aus
// und wirf den Fehler anschließend mit:
//
// throw error;
//
// erneut nach außen.


// 6.
// Rufe loadData() in einer weiteren
// async-Funktion auf.
//
// Fange dort den weitergeworfenen Fehler
// erneut mit try/catch ab.
//
// Erkläre in Kommentaren,
// wie der Fehler durch die Ebenen weitergegeben wurde.


// 7.
// Erstelle:
//
// class ApiError extends Error
//
// mit zusätzlicher Property:
//
// statusCode: number
//
// Der Konstruktor soll erhalten:
//
// message: string
// statusCode: number


// 8.
// Schreibe:
//
// async function getUser(): Promise<string>
//
// Warte kurz
// und wirf danach:
//
// new ApiError(
//     "User not found",
//     404
// );


// 9.
// Rufe getUser() innerhalb try/catch auf.
//
// Prüfe:
//
// error instanceof ApiError
//
// und gib dann:
//
// error.message
// error.statusCode
//
// aus.


// 10.
// Erstelle zusätzlich:
//
// class ValidationError extends Error
//
// Schreibe eine Funktion,
// die entweder ApiError
// oder ValidationError werfen kann.
//
// Behandle beide Fehlertypen
// mit mehreren instanceof-Prüfungen.


// 11.
// Verwende:
//
// Promise.all([
//     successfulTask(),
//     failingTask()
// ])
//
// innerhalb von try/catch.
//
// Erkläre in Kommentaren,
// warum der catch-Block ausgeführt wird.


// 12.
// Verwende Promise.any()
// mit mehreren fehlschlagenden Tasks.
//
// Prüfe im catch:
//
// error instanceof AggregateError
//
// und gib:
//
// error.errors
//
// aus.


// 13.
// Schreibe abschließend in Kommentaren:
//
// - was bei rejected Promise + await passiert
// - Aufgabe von try/catch
// - warum catch-error als unknown behandelt werden sollte
// - Unterschied instanceof vs as
// - was throw innerhalb einer async-Funktion bewirkt
// - was rethrow bedeutet
// - warum eigene Error-Klassen sinnvoll sind
// - wie TypeScript durch instanceof narrowt