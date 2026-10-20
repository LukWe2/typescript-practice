// Aufgabe:
//
// 1. Erstelle einen Type User mit:
//    readonly id: number
//    name: string
//    email?: string
//    readonly createdAt: string
//
// 2. Erstelle einen generischen Mapped Type Mutable<T>,
//    der alle vorhandenen readonly-Modifier entfernt.
//    Erzeuge MutableUser = Mutable<User> und erstelle ein Objekt dieses Typs.
//    Verändere anschließend id und createdAt, um zu zeigen,
//    dass diese Properties im neuen Typ nicht mehr readonly sind.
//
// 3. Erstelle einen generischen Mapped Type RequiredProperties<T>,
//    der mit `-?` alle optionalen Properties erforderlich macht.
//    Erzeuge RequiredUser und teste auskommentiert ein Objekt,
//    bei dem email fehlt.
//
// 4. Erstelle einen generischen Typ MutableRequired<T>,
//    der gleichzeitig readonly UND optional entfernt.
//    Nutze dafür `-readonly` und `-?` in einem einzigen Mapped Type.
//
// 5. Erstelle einen Type Settings mit:
//    readonly theme?: string
//    readonly language?: string
//    readonly fontSize?: number
//
//    Leite daraus mit MutableRequired<Settings> einen EditableSettings-Typ ab.
//    Erstelle ein vollständiges Objekt und verändere anschließend dessen Properties.
//
// 6. Erstelle selbst:
//    MyPartial<T>
//    MyReadonly<T>
//    MyRequired<T>
//    und vergleiche in Kommentaren,
//    welche Modifier jeweils hinzugefügt oder entfernt werden.
//
// 7. Erstelle:
//    type UserWithUndefined = {
//        name: string;
//        email: string | undefined;
//    }
//
//    Wende deinen RequiredProperties<T>-Typ darauf an.
//    Untersuche und erkläre, warum `email` weiterhin `string | undefined` ist,
//    obwohl `-?` verwendet wurde.
//
// 8. Erstelle zusätzlich:
//    type OptionalUser = {
//        name: string;
//        email?: string;
//    }
//
//    Wende ebenfalls RequiredProperties<OptionalUser> darauf an.
//    Vergleiche das Ergebnis mit Aufgabe 7 und erkläre den Unterschied zwischen:
//    email?: string
//    und
//    email: string | undefined
//
// 9. Erstelle einen Type EditableDraft<T>,
//    der:
//    - readonly entfernt
//    - alle Properties optional macht
//    - die ursprünglichen Property-Typen über T[K] erhält.
//
//    Teste ihn mit User.
//
// 10. Schreibe abschließend in Kommentaren,
//     was in folgendem Typ jeweils die Aufgabe von
//     -readonly, K in keyof T, -? und T[K] ist:
//
//     type Transform<T> = {
//         -readonly [K in keyof T]-?: T[K];
//     };