


























































// 1. Was bedeutet Promise.race() grundsätzlich?
// Welches Promise entscheidet über das gemeinsame Promise?
//
// Antwort:
// Antwort:


// 2. Was bedeutet Promise.any() grundsätzlich?
//
// Antwort:
// Antwort:


// 3. Was ist der entscheidende Unterschied zwischen:
//
// Promise.race()
//
// und:
//
// Promise.any()?
//
// Antwort:
// Antwort:


// 4. Angenommen:
//
// taskA -> rejected nach 1 Sekunde
// taskB -> fulfilled nach 2 Sekunden
// taskC -> fulfilled nach 3 Sekunden
//
// Was passiert bei Promise.race()?
//
// Antwort:
// Antwort:


// 5. Was passiert bei denselben drei Promises
// bei Promise.any()?
//
// Antwort:
// Antwort:


// 6. Was passiert bei Promise.any(),
// wenn ALLE enthaltenen Promises rejected werden?
//
// Antwort:
// Antwort:


// 7. Was ist ein AggregateError
// im Zusammenhang mit Promise.any()?
//
// Antwort:
// Antwort:


// 8. Werden die anderen bereits gestarteten Promises
// automatisch abgebrochen,
// sobald Promise.race() oder Promise.any() entschieden ist?
//
// Antwort:
// Antwort:


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
// Antwort:
// Antwort:


// 10. Welchen Typ hat `result` bei:
//
// const result = await Promise.any([
//     getUser(),
//     getName()
// ]);
//
// Antwort:
// Antwort:


// 11. Warum eignet sich Promise.race()
// grundsätzlich für Timeout-Patterns?
//
// Antwort:
// Antwort:


// 12. Warum eignet sich Promise.any(),
// wenn mehrere unabhängige Quellen
// dieselben Daten liefern können?
//
// Antwort:
// Antwort:


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
// Antwort:
// Antwort: