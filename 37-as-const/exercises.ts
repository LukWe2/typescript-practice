// Aufgabe:
//
// 1. Erstelle zunächst ein normales const-Array roles mit:
//    "admin", "editor", "viewer".
//    Leite mit typeof roles[number] einen Typ RoleWithoutConstAssertion ab und untersuche,
//    welchen Typ TypeScript daraus erzeugt.
//
// 2. Erstelle anschließend rolesWithConstAssertion mit denselben drei Werten,
//    diesmal aber mit `as const`.
//    Leite mit typeof rolesWithConstAssertion[number] einen Typ Role ab und untersuche,
//    wie sich das Ergebnis von RoleWithoutConstAssertion unterscheidet.
//
// 3. Erstelle eine Funktion printRole(role: Role): void.
//    Rufe sie mit allen gültigen Rollen auf und teste auskommentiert eine ungültige Rolle
//    wie "superadmin".
//
// 4. Erstelle ein normales const-Objekt appConfig mit:
//    mode: "dark"
//    retries: 3
//    logging: true
//    Verändere anschließend die Properties und beobachte, welche allgemeinen Typen
//    TypeScript für die Properties inferiert.
//
// 5. Erstelle dasselbe Objekt erneut als strictAppConfig mit `as const`.
//    Untersuche die inferierten Property-Typen und teste auskommentiert,
//    dass Properties wie mode oder retries nicht mehr verändert werden können.
//
// 6. Erstelle ein normales Array coordinates = [10, 20] und vergleiche dessen
//    inferierten Typ mit einem zweiten Array coordinatesAsConst = [10, 20] as const.
//    Untersuche insbesondere den Unterschied zwischen number[] und readonly [10, 20].
//
// 7. Erstelle ein Array apiStatuses mit:
//    "idle", "loading", "success", "error"
//    und verwende `as const`.
//    Leite daraus ausschließlich mit typeof und Indexed Access einen ApiStatus-Typ ab,
//    sodass du die Literal Union nicht noch einmal manuell hinschreiben musst.
//
// 8. Erstelle anschließend eine Funktion setApiStatus(status: ApiStatus): void,
//    teste alle gültigen Statuswerte und einen auskommentierten ungültigen Status.
//
// 9. Schreibe in Kommentaren zusammen, warum `const` alleine bei Arrays und Objekten
//    nicht dasselbe bewirkt wie `as const` und warum `as const` 
// keine Runtime-Unveränderlichkeit garantiert.