// Aufgabe:
//
// 1. Erstelle einen generischen Conditional Type IsString<T>.
//    Wenn T ein string ist, soll der Literal Type true entstehen,
//    ansonsten false.
//    Teste ihn mit string, number und boolean.
//
// 2. Erstelle einen Conditional Type TypeName<T>.
//    Er soll folgende Typen unterscheiden:
//    string  -> "string"
//    number  -> "number"
//    boolean -> "boolean"
//    alle anderen Typen -> "other"
//    Verwende dafür verschachtelte Conditional Types.
//
// 3. Erstelle:
//    type User = {
//        id: number;
//        name: string;
//    }
//
//    type Product = {
//        title: string;
//        price: number;
//    }
//
//    Erstelle anschließend HasId<T>.
//    Der resultierende Typ soll true sein,
//    wenn T mindestens eine Property id: number besitzt,
//    sonst false.
//    Teste HasId<User> und HasId<Product>.
//
// 4. Erstelle einen Conditional Type OnlyStrings<T>.
//    Wenn T ein string ist, soll T selbst zurückgegeben werden.
//    Andernfalls soll never entstehen.
//    Teste ihn mit string und number.
//
// 5. Erstelle IsArray<T>.
//    Das Ergebnis soll true sein, wenn T ein Array-Typ ist,
//    ansonsten false.
//    Teste string[], number[] und string.
//
// 6. Erstelle ArrayOrSingle<T>.
//    Wenn T bereits ein Array ist, soll T unverändert bleiben.
//    Wenn T kein Array ist, soll aus T ein Array-Typ T[] werden.
//    Teste den Typ mit string und string[].
//
// 7. Erstelle einen Type IsPromise<T>.
//    Er soll true zurückgeben, wenn T ein Promise ist,
//    ansonsten false.
//    Teste ihn mit Promise<User>, Promise<string>, User und number.
//
// 8. Erstelle AsyncKind<T>.
//    Bei einem Promise soll der Literal Type "async" entstehen,
//    ansonsten "sync".
//
//    Teste:
//    AsyncKind<Promise<User>>
//    AsyncKind<User>
//
// 9. Erstelle einen Type HasName<T>,
//    der prüft, ob T mindestens die Struktur:
//    { name: string }
//    erfüllt.
//    Teste ihn mit mehreren Typen,
//    von denen manche zusätzliche Properties besitzen.
//
// 10. Erstelle einen Conditional Type WrappedValue<T>.
//
//     Für string:
//     {
//         kind: "text";
//         value: string;
//     }
//
//     Für number:
//     {
//         kind: "number";
//         value: number;
//     }
//
//     Für alle anderen Typen:
//     {
//         kind: "unknown";
//         value: T;
//     }
//
//     Teste WrappedValue<string>, WrappedValue<number>
//     und WrappedValue<boolean>.
//
// 11. Schreibe abschließend in Kommentaren:
//     - warum `extends` in Conditional Types keine exakte Typgleichheit prüft
//     - warum Conditional Types keine Runtime-Validierung durchführen
//     - was der Unterschied zu einem normalen if/else ist.