/*
AUFGABE: Custom Error Class – API Rate Limit

Du entwickelst ein Backend, in dem jeder Nutzer maximal
100 API-Anfragen pro Stunde durchführen darf.

Wird dieses Limit erreicht oder überschritten, soll ein
eigener Fehlertyp ausgelöst werden, der zusätzliche
Informationen über den Nutzer und das Limit enthält.
*/


// AUFGABE 1: Custom Error Class
// Erstelle eine Klasse namens ApiRateLimitError.
// Die Klasse soll von der eingebauten Error-Klasse erben.
//
// Der Konstruktor soll folgende Parameter erhalten:
// - message: string
// - userId: number
// - requestsUsed: number
// - requestsLimit: number
//
// Anforderungen:
// - Die drei zusätzlichen Informationen sollen readonly sein.
// - Der Konstruktor der Elternklasse soll aufgerufen werden.
// - Die Property name soll "ApiRateLimitError" enthalten.


// AUFGABE 2: Fehler auslösen
// Implementiere die folgende Funktion.
// Prüfe, ob requestsUsed >= requestsLimit gilt.
// Falls ja, soll ein ApiRateLimitError ausgelöst werden.
// Andernfalls soll die Funktion normal beendet werden.

function checkApiRateLimit(
    userId: number,
    requestsUsed: number,
    requestsLimit: number
): void {

}


// AUFGABE 3: Fehler behandeln
// Rufe checkApiRateLimit() mit den folgenden Testdaten auf.
//
// Verwende try/catch, um mögliche Fehler abzufangen.
//
// Falls es sich um einen ApiRateLimitError handelt:
// - Gib den Fehlernamen aus.
// - Gib die Fehlermeldung aus.
// - Gib die User-ID aus.
// - Gib die verbrauchten Anfragen aus.
// - Gib das maximale Limit aus.
//
// Bei anderen Fehlern soll "Unbekannter Fehler"
// ausgegeben werden.

const userId = 42;
const requestsUsed = 105;
const requestsLimit = 100;


// ERWARTETE AUSGABE:
//
// Fehlertyp: ApiRateLimitError
// Nachricht: API-Anfragenlimit erreicht
// User ID: 42
// Anfragen: 105
// Limit: 100


// VERSTÄNDNISFRAGEN:

// 1. Was bewirkt extends Error?
// Antwort:
// Antwort:

// 2. Warum verwenden wir super(message) im Konstruktor?
// Antwort:
// Antwort:

// 3. Was bewirkt readonly bei einem Konstruktorparameter?
// Antwort:
// Antwort:

// 4. Warum ist eine eigene Error-Klasse sinnvoller als
//    ein gewöhnlicher Error mit einer Fehlermeldung?
// Antwort:
// Antwort: