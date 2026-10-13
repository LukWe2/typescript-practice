export {};
// Aufgabe:
//
// 1. Erstelle einen Type ScoreBoard mit einer String Index Signature.
//    Jeder beliebige Username soll als Property-Key erlaubt sein,
//    der dazugehörige Punktestand muss aber immer eine number sein.
//
// 2. Erstelle ein scoreBoard mit mindestens drei Usern und unterschiedlichen Punkteständen.
//    Greife sowohl über einen festen Key als auch über eine Variable vom Typ string
//    per Bracket Notation auf Punktestände zu.
//
// 3. Erstelle auskommentiert ein fehlerhaftes ScoreBoard,
//    bei dem ein User einen string statt einer number als Punktestand besitzt.
//
// 4. Greife auf einen Username zu, der nicht im Objekt existiert.
//    Untersuche wegen `noUncheckedIndexedAccess` den Typ des Ergebnisses
//    und narrowe den möglichen undefined-Fall, bevor du eine number-spezifische Methode verwendest.
//
// 5. Erstelle einen Type Product mit:
//    id: number
//    name: string
//    price: number
//
//    Erstelle anschließend einen Type ProductDictionary,
//    dessen Keys dynamische string-IDs sind und dessen Values Product-Objekte sein müssen.
//
// 6. Erstelle ein ProductDictionary mit mindestens drei Produkten
//    und greife über eine dynamische ID auf ein Produkt zu.
//    Behandle auch hier einen möglichen undefined-Wert sicher.
//
// 7. Erstelle einen Type MixedDictionary mit einer bekannten Property:
//    title: string
//
//    Ergänze zunächst eine Index Signature `[key: string]: number`
//    und beobachte den entstehenden TypeScript-Fehler.
//    Passe die Index Signature danach so an, dass sowohl title als auch numerische Values erlaubt sind,
//    und erkläre in einem Kommentar, warum die ursprüngliche Variante nicht funktionieren konnte.
//
// 8. Erstelle danach eine sauberere Alternative:
//    type ScoreCollection = {
//        title: string;
//        scores: ...
//    }
//    wobei nur `scores` eine Index Signature für username → number verwendet.
//    Vergleiche im Kommentar, warum diese Struktur präzisere Typen ermöglicht.
//
// 9. Erstelle denselben ScoreBoard-Gedanken zusätzlich einmal mit:
//    Record<string, number>
//    und beschreibe im Kommentar den Zusammenhang zur String Index Signature.
//
// 10. Erstelle:
//     type Role = "admin" | "editor" | "viewer"
//
//     und vergleiche in einem Kommentar:
//     Record<string, number>
//     mit
//     Record<Role, number>
//
//     Erkläre insbesondere, warum bei Record<Role, number> alle drei Role-Keys
//     erforderlich sind, während Record<string, number> nicht jeden denkbaren String-Key verlangt.
//
// 11. Erstelle abschließend eine readonly Index Signature,
//     bei der dynamische String-Keys string-Values besitzen,
//     und teste auskommentiert, dass ein vorhandener Value nicht neu zugewiesen werden kann.
//# sourceMappingURL=exercises.js.map