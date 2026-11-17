// 1.
// Verwende wieder deine delay()-Funktion:
//
// function delay(
//     ms: number
// ): Promise<void>
//
// Implementiere sie so,
// dass das Promise nach `ms` Millisekunden
// mit resolve() fulfilled wird.


// 2.
// Schreibe:
//
// async function getUser(): Promise<string>
//
// Warte darin 2000 ms
// und gib danach "Lukas" zurück.


// 3.
// Schreibe:
//
// async function getProducts(): Promise<string[]>
//
// Warte darin 3000 ms
// und gib danach mindestens zwei Produktnamen zurück.


// 4.
// Schreibe:
//
// async function getSettings(): Promise<string>
//
// Warte darin 1000 ms
// und gib danach "dark" zurück.


// 5.
// Schreibe:
//
// async function loadWithPromiseAll(): Promise<void>
//
// Lade getUser() und getProducts()
// gemeinsam mit Promise.all().
//
// Nutze direkt Array-Destructuring:
//
// const [user, products] = ...
//
// Gib beide Ergebnisse aus.
//
// Miss die Laufzeit mit console.time()
// und console.timeEnd().
//
// Überlege vorher in einem Kommentar,
// welche ungefähre Laufzeit du erwartest.


// 6.
// Erweitere das Beispiel:
//
// Lade:
//
// getUser()
// getProducts()
// getSettings()
//
// gemeinsam über Promise.all().
//
// Destructure alle drei Ergebnisse.
//
// Kommentiere,
// welchen Typ jede der drei Variablen besitzt.


// 7.
// Schreibe:
//
// async function getUserId(): Promise<number>
//
// Warte 1500 ms
// und gib danach die Zahl 5 zurück.
//
// Schreibe außerdem:
//
// async function getPostsForUser(
//     userId: number
// ): Promise<string[]>
//
// Warte 2000 ms
// und gib danach mehrere Posts zurück.


// 8.
// Schreibe:
//
// async function getSettingsForUser(
//     userId: number
// ): Promise<string>
//
// Warte 1000 ms
// und gib danach z.B. "dark" zurück.


// 9.
// Schreibe:
//
// async function loadUserData(): Promise<void>
//
// Lade ZUERST die userId.
//
// Starte danach:
//
// getPostsForUser(userId)
// getSettingsForUser(userId)
//
// gemeinsam mit Promise.all().
//
// Erkläre in Kommentaren,
// warum getUserId() zuerst sequenziell awaited werden muss,
// Posts und Settings danach aber concurrent laufen können.


// 10.
// Schreibe:
//
// async function successfulTask(): Promise<string>
//
// Die Funktion soll nach 1000 ms
// "Success" zurückgeben.
//
// Schreibe außerdem:
//
// async function failingTask(): Promise<string>
//
// Die Funktion soll nach 1500 ms
// einen Error werfen.
//
// Nutze beide Funktionen gemeinsam in Promise.all().
//
// Fange den Fehler mit try/catch ab.


// 11.
// Erkläre direkt unter Aufgabe 10 in Kommentaren:
//
// - was mit dem Promise von Promise.all() passiert,
//   wenn failingTask() rejected wird
// - ob successfulTask() dadurch automatisch abgebrochen wird
// - warum Promise.all() kein Array mit teilweise undefined
//   zurückgibt.


// 12.
// Erstelle drei Funktionen mit unterschiedlichen Wartezeiten:
//
// firstTask()  -> 3000 ms -> "first"
// secondTask() -> 1000 ms -> "second"
// thirdTask()  -> 2000 ms -> "third"
//
// Lade alle drei mit Promise.all().
//
// Gib das Ergebnisarray aus.
//
// Erkläre in Kommentaren,
// warum die Ergebnisreihenfolge trotzdem:
//
// "first", "second", "third"
//
// ist, obwohl secondTask() zuerst fertig wird.


// 13.
// Schreibe abschließend in Kommentaren:
//
// - was Promise.all() zurückgibt
// - wann dieses Promise fulfilled wird
// - wann es rejected wird
// - warum die enthaltenen Promises concurrent laufen können
// - warum die Ergebnisreihenfolge erhalten bleibt
// - wie Array-Destructuring damit zusammenhängt
// - wann Promise.all() sinnvoll ist
// - wann Datenabhängigkeiten dagegen sequenzielle awaits erfordern