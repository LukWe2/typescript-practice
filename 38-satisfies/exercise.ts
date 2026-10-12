// Aufgabe:
//
// 1. Erstelle einen Type AppConfig mit:
//    mode: "dark" | "light"
//    retries: number
//    debug: boolean
//
// 2. Erstelle configWithAnnotation mit einer normalen Type Annotation `: AppConfig`
//    und den Werten mode: "dark", retries: 3 und debug: true.
//    Untersuche in VS Code insbesondere den inferierten Typ von configWithAnnotation.mode.
//
// 3. Erstelle dasselbe Objekt erneut als configWithSatisfies,
//    diesmal aber mit `satisfies AppConfig` statt `: AppConfig`.
//    Untersuche wieder den Typ von mode und vergleiche ihn mit Aufgabe 2.
//
// 4. Erstelle auskommentierte fehlerhafte Configs mit:
//    - einem ungültigen mode wie "blue"
//    - retries als string
//    und beobachte, dass satisfies diese Fehler erkennt.
//
// 5. Erstelle die Literal Unions:
//    type Role = "admin" | "editor" | "viewer"
//    type Permission = "read" | "write" | "delete"
//
// 6. Erstelle ein permissions-Objekt, das jeder Role ein Permission[] zuordnet.
//    Verwende `satisfies Record<Role, Permission[]>`, sodass TypeScript prüft,
//    dass alle Rollen vorhanden sind und nur erlaubte Permissions verwendet werden.
//
// 7. Erstelle auskommentierte fehlerhafte Varianten,
//    bei denen eine Rolle fehlt, ein unbekannter Key wie "guest" vorkommt
//    oder eine ungültige Permission wie "publish" verwendet wird.
//
// 8. Erstelle roleLabels mit den Keys admin, editor und viewer.
//    Die Values sollen "Administrator", "Editor" und "Viewer" sein.
//    Kombiniere `as const` mit `satisfies Record<Role, string>`.
//
// 9. Untersuche den Typ von roleLabels.admin und erkläre im Kommentar,
//    warum hier der konkrete Literal Type "Administrator" erhalten bleibt.
//
// 10. Schreibe abschließend in Kommentaren den Unterschied zwischen:
//     const x: SomeType = ...
//     const x = ... as SomeType
//     const x = ... satisfies SomeType
//     und erkläre außerdem, warum satisfies keine Runtime-Validierung externer API-Daten ersetzt.