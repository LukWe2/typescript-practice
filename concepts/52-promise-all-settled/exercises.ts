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
// Warte 1500 ms
// und wirf danach:
//
// throw new Error("Task failed");


// 4.
// Verwende successfulTask() und failingTask()
// gemeinsam mit:
//
// Promise.allSettled(...)
//
// Awate das gemeinsame Promise
// und speichere das Ergebnis in:
//
// const results = ...
//
// Gib results vollständig mit console.log() aus.


// 5.
// Greife auf:
//
// results[0]
//
// zu.
//
// Prüfe über:
//
// result.status
//
// ob das Ergebnis fulfilled ist.
//
// Wenn ja:
// gib result.value aus.
//
// Wenn nein:
// gib result.reason aus.


// 6.
// Wiederhole dasselbe für:
//
// results[1]
//
// Beobachte,
// dass TypeScript abhängig vom status
// unterschiedliche Properties erlaubt.


// 7.
// Schreibe drei Funktionen:
//
// getUser()     -> nach 1000 ms "Lukas"
// getProducts() -> nach 2000 ms Error werfen
// getSettings() -> nach 1500 ms "dark"
//
// Führe alle drei mit Promise.allSettled() aus.


// 8.
// Iteriere anschließend mit:
//
// for...of
//
// über alle Resultate.
//
// Wenn:
//
// status === "fulfilled"
//
// gib den value aus.
//
// Wenn:
//
// status === "rejected"
//
// gib den reason aus.


// 9.
// Erkläre direkt darunter in Kommentaren,
// warum trotz des Fehlers von getProducts()
// auch die Ergebnisse von getUser()
// und getSettings() verfügbar sind.


// 10.
// Schreibe zum Vergleich dieselben drei Operationen
// einmal mit Promise.all().
//
// Verwende try/catch.
//
// Erkläre anschließend in Kommentaren,
// was sich gegenüber Promise.allSettled()
// beim Fehlerverhalten verändert.


// 11.
// Erstelle:
//
// async function loadDashboard(): Promise<void>
//
// Simuliere darin drei unabhängige Bereiche:
//
// loadProfile()
// loadStatistics()
// loadRecommendations()
//
// Eine dieser Funktionen soll absichtlich fehlschlagen.
//
// Nutze Promise.allSettled().
//
// Gib für jeden Bereich entweder:
// - die erfolgreichen Daten
// oder
// - eine passende Fehlermeldung
//
// aus.


// 12.
// Erkläre abschließend in Kommentaren:
//
// - was `settled` bedeutet
// - Unterschied fulfilled / rejected
// - Unterschied Promise.all / Promise.allSettled
// - warum Promise.allSettled() nicht beim ersten Fehler abbricht
// - was status/value/reason bedeuten
// - warum status eine Discriminated Union ermöglicht
// - wann Promise.allSettled() praktisch sinnvoll ist