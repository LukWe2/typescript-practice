export {};
// Aufgabe:
//
// 1. Erstelle einen Type User mit:
//    id: number
//    name: string
//    email: string
//
// 2. Erstelle eine Variable apiData vom Typ unknown und speichere darin ein gültiges User-Objekt.
//    Erzeuge daraus mit einer Type Assertion eine Variable assertedUser vom Typ User und gib name und email aus.
//
// 3. Erstelle anschließend badApiData: unknown mit einem Wert, der KEIN gültiger User ist.
//    Behaupte trotzdem mit "as User", dass es sich um einen User handelt.
//    Schreibe in einem Kommentar dazu, warum TypeScript diese Assertion akzeptiert, obwohl sie zur Runtime gefährlich sein kann.
//
// 4. Erstelle eine zweite sichere Variante mit einem Type Guard isUser(value: unknown): value is User.
//    Prüfe die unknown-Daten damit, bevor du sie als User verwendest.
//    Stelle dadurch Type Assertion und echte Runtime-Validierung direkt gegenüber.
//
// 5. Erstelle ein User[] mit mindestens drei Usern und suche mit .find() einen User anhand seiner id.
//    Speichere das Ergebnis zunächst ohne Non-Null Assertion und untersuche den inferierten Typ.
//
// 6. Löse den möglichen undefined-Fall zuerst sicher mit einem if-Check und greife danach auf den Namen zu.
//
// 7. Suche anschließend einen User, von dem du sicher weißt, dass er existiert, und verwende diesmal die Non-Null Assertion !.
//    Greife anschließend ohne zusätzlichen Check auf dessen Properties zu.
//
// 8. Erstelle zum Schluss bewusst ein Beispiel, bei dem .find() keinen User findet, du aber trotzdem ! benutzt.
//    Der gefährliche Property-Zugriff darf auskommentiert bleiben. Erkläre im Kommentar, was zur Runtime passieren würde.
//
// 9. Zeige außerdem anhand eines kleinen Beispiels den Unterschied zwischen:
//    value as string
//    und
//    String(value)
//    und erkläre, welches davon nur TypeScript beeinflusst und welches den Runtime-Wert tatsächlich konvertiert.
//# sourceMappingURL=exercises.js.map