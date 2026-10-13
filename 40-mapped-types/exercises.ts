// Aufgabe:
//
// 1. Erstelle einen Type User mit:
//    id: number
//    name: string
//    email: string
//    active: boolean
//
// 2. Erstelle ohne Utility Types einen Mapped Type UserFlags,
//    der exakt dieselben Property-Keys wie User besitzt,
//    aber für jede Property boolean als Value-Typ verwendet.
//    Erstelle anschließend ein gültiges Objekt vom Typ UserFlags.
//
// 3. Erstelle danach eine generische Variante:
//    type Flags<T> = ...
//    Sie soll für jeden beliebigen Objekttyp alle vorhandenen Keys übernehmen
//    und deren Value-Typ jeweils in boolean umwandeln.
//
// 4. Erstelle zusätzlich einen Type Product mit:
//    id: number
//    title: string
//    price: number
//    available: boolean
//
//    Erzeuge mit Flags<Product> einen ProductFlags-Typ und erstelle ein passendes Objekt.
//    Prüfe dadurch, dass derselbe Mapped Type mit unterschiedlichen Ausgangstypen funktioniert.
//
// 5. Erstelle einen generischen Mapped Type Copy<T>,
//    der sowohl die Keys als auch die ursprünglichen Value-Typen eines Typs übernimmt.
//    Verwende dabei `keyof T` und `T[K]`.
//    Leite damit einen CopiedUser-Typ ab.
//
// 6. Erstelle einen generischen Mapped Type ArrayValues<T>,
//    der alle ursprünglichen Properties übernimmt,
//    aber aus jedem ursprünglichen Value-Typ ein Array dieses Typs macht.
//
//    Aus:
//    {
//        id: number;
//        name: string;
//        active: boolean;
//    }
//
//    soll ungefähr werden:
//    {
//        id: number[];
//        name: string[];
//        active: boolean[];
//    }
//
// 7. Erstelle einen Type RegistrationForm mit:
//    username: string
//    email: string
//    password: string
//    age: number
//
//    Erstelle daraus über einen generischen Mapped Type FormErrors<T>
//    einen Typ, bei dem für jedes Formularfeld ein boolean gespeichert wird.
//    Erstelle anschließend ein konkretes Objekt dieses Fehler-Typs.
//
// 8. Erstelle:
//    type Role = "admin" | "editor" | "viewer"
//
//    und daraus direkt mit einem Mapped Type:
//    type RolePermissions = ...
//
//    sodass der resultierende Typ ungefähr:
//    {
//        admin: boolean;
//        editor: boolean;
//        viewer: boolean;
//    }
//    entspricht.
//    Verwende dafür direkt `[K in Role]` statt `keyof`.
//
// 9. Erstelle denselben RolePermissions-Typ zusätzlich mit Record<Role, boolean>
//    und beschreibe im Kommentar den Zusammenhang zwischen Record<> und einem Mapped Type.
//
// 10. Implementiere deinen eigenen Utility Type:
//     type MyPartial<T> = ...
//
//     Dieser soll alle Keys von T übernehmen,
//     die ursprünglichen Value-Typen mit T[K] behalten
//     und alle Properties optional machen.
//     Teste MyPartial<User> mit einem Objekt, das nur `name` enthält.
//
// 11. Erstelle außerdem:
//     type MyReadonly<T> = ...
//
//     sodass alle Properties des ursprünglichen Typs readonly werden.
//     Erstelle damit einen User und teste auskommentiert,
//     dass eine Property anschließend nicht neu zugewiesen werden kann.
//
// 12. Schreibe abschließend in Kommentaren den Unterschied zwischen:
//
//     [key: string]: number
//
//     und
//
//     [K in keyof T]: number
//
//     Erkläre insbesondere, warum die erste Schreibweise dynamische Keys erlaubt,
//     während die zweite über eine konkrete bekannte Key-Menge iteriert.