// 1.
// Verwende wieder deine delay()-Funktion:
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
// async function slowTask(): Promise<string>
//
// Warte 3000 ms
// und gib danach:
//
// "slow"
//
// zurück.


// 3.
// Schreibe:
//
// async function fastTask(): Promise<string>
//
// Warte 1000 ms
// und gib danach:
//
// "fast"
//
// zurück.


// 4.
// Führe slowTask() und fastTask()
// gemeinsam mit Promise.race() aus.
//
// Awate das gemeinsame Promise.
//
// Gib das Ergebnis aus.
//
// Schreibe vorher in einen Kommentar,
// welches Ergebnis du erwartest und warum.


// 5.
// Schreibe:
//
// async function fastFailingTask(): Promise<string>
//
// Warte 500 ms
// und wirf danach einen Error.
//
// Führe:
//
// fastFailingTask()
// slowTask()
//
// gemeinsam mit Promise.race() aus.
//
// Verwende try/catch.
//
// Erkläre anschließend in Kommentaren,
// warum Promise.race() rejected wird,
// obwohl slowTask() später erfolgreich wäre.


// 6.
// Verwende jetzt dieselben beiden Funktionen:
//
// fastFailingTask()
// slowTask()
//
// mit Promise.any().
//
// Gib das Ergebnis aus.
//
// Erkläre,
// warum sich das Verhalten von Promise.race()
// unterscheidet.


// 7.
// Schreibe drei Funktionen:
//
// failingTask1()
// failingTask2()
// failingTask3()
//
// Alle drei sollen nach unterschiedlichen Zeiten
// einen Error werfen.
//
// Verwende Promise.any() mit allen drei.
//
// Fange den Fehler mit try/catch ab.
//
// Prüfe,
// welcher Error-Typ entsteht.


// 8.
// Schreibe:
//
// async function serverA(): Promise<string>
// async function serverB(): Promise<string>
// async function serverC(): Promise<string>
//
// serverA soll schnell fehlschlagen.
// serverB soll nach 2000 ms erfolgreich sein.
// serverC soll nach 3000 ms erfolgreich sein.
//
// Verwende Promise.any(),
// um die erste erfolgreiche Server-Antwort zu bekommen.


// 9.
// Schreibe:
//
// async function getUser(): Promise<{ id: number; name: string }>
//
// und:
//
// async function getFallbackName(): Promise<string>
//
// Verwende beide in Promise.race().
//
// Speichere das Ergebnis in:
//
// const result = ...
//
// Untersuche in VS Code,
// welchen Typ TypeScript für `result` inferiert.
//
// Narrowe anschließend den Union Type sinnvoll,
// bevor du mit dem Wert arbeitest.


// 10.
// Erstelle eine Funktion:
//
// async function timeout(): Promise<never>
//
// Warte 2000 ms
// und wirf danach:
//
// new Error("Timeout")
//
// Verwende anschließend:
//
// Promise.race([
//     slowTask(),
//     timeout()
// ])
//
// Beobachte,
// welches Promise gewinnt.
//
// Wir bauen daraus im späteren Timeout-Konzept
// noch ein richtiges wiederverwendbares Pattern.


// 11.
// Erkläre abschließend in Kommentaren:
//
// - was Promise.race() macht
// - was Promise.any() macht
// - Unterschied settled vs fulfilled
// - was bei einem frühen Reject passiert
// - was passiert, wenn bei Promise.any() alle rejecten
// - warum die übrigen Operationen nicht automatisch gecancelt werden
// - typische Anwendungsfälle für race()
// - typische Anwendungsfälle für any()