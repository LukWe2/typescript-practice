// Aufgabe:
//
// 1. Erstelle einen generischen Type PromiseValue<T>.
//    Wenn T ein Promise ist, soll mit `infer` der innere Typ des Promises
//    herausgezogen und zurückgegeben werden.
//    Wenn T kein Promise ist, soll T selbst zurückgegeben werden.
//
//    Teste:
//    PromiseValue<Promise<string>>
//    PromiseValue<Promise<number>>
//    PromiseValue<string>
//
//
// 2. Erstelle einen Type ArrayElement<T>.
//    Wenn T ein Array ist, soll mit `infer` der Typ eines Array-Elements
//    herausgezogen werden.
//    Wenn T kein Array ist, soll never entstehen.
//
//    Teste:
//    ArrayElement<string[]>
//    ArrayElement<number[]>
//    ArrayElement<User[]>
//    ArrayElement<string>
//
//
// 3. Erstelle:
//    type User = {
//        id: number;
//        name: string;
//        active: boolean;
//    };
//
//    Erstelle danach GetIdType<T>.
//    Wenn T mindestens eine Property `id` besitzt,
//    soll mit `infer` deren Property-Typ herausgezogen werden.
//    Ansonsten soll never entstehen.
//
//    Teste GetIdType<User> und einen Typ ohne id.
//
//
// 4. Erstelle mehrere normale Funktionen mit unterschiedlichen Rückgabetypen,
//    z.B. eine Funktion mit string-Rückgabe,
//    eine mit number-Rückgabe und eine mit User-Rückgabe.
//
//    Implementiere anschließend deinen eigenen generischen:
//    MyReturnType<T>
//
//    Verwende `infer`, um den Rückgabetyp einer Funktion herauszuziehen.
//    Teste den Typ mit `typeof` auf deinen Funktionen.
//
//
// 5. Erstelle eine Funktion:
//
//    function createUser(
//        name: string,
//        age: number,
//        active: boolean
//    ): User
//
//    Implementiere anschließend MyParameters<T>.
//    Der Type soll mit `infer` die Parameter einer Funktion als Tupel herausziehen.
//
//    Untersuche den resultierenden Typ von:
//    MyParameters<typeof createUser>
//
//
// 6. Erstelle einen Type FunctionParts<T>,
//    der gleichzeitig Parameter und Rückgabetyp einer Funktion inferiert.
//
//    Das Resultat soll ungefähr so aufgebaut sein:
//
//    {
//        parameters: ...;
//        returnType: ...;
//    }
//
//    Teste ihn mit mindestens zwei Funktionen.
//
//
// 7. Erstelle eine async-Funktion:
//
//    async function getUser(): Promise<User>
//
//    Leite mit:
//    ReturnType<typeof getUser>
//
//    zunächst deren direkten Rückgabetyp ab.
//
//    Ziehe anschließend mit deinem PromiseValue<T>
//    den inneren User-Typ aus diesem Rückgabetyp heraus.
//
//
// 8. Erzeuge dasselbe Ergebnis aus Aufgabe 7 auch direkt verschachtelt:
//
//    PromiseValue<ReturnType<typeof getUser>>
//
//    Schreibe im Kommentar jeden Zwischenschritt auf:
//    typeof getUser
//    -> ...
//    ReturnType<typeof getUser>
//    -> ...
//    PromiseValue<...>
//    -> ...
//
//
// 9. Erstelle einen Type PropertyValue<T>,
//    der prüft, ob ein Typ eine Property `value` besitzt.
//    Falls ja, soll deren Typ mit `infer` extrahiert werden,
//    ansonsten never.
//
//    Teste:
//    { value: string }
//    { value: number }
//    { name: string }
//
//
// 10. Schreibe abschließend in Kommentaren den Unterschied zwischen:
//     - einem normalen Generic wie T
//     - einem Conditional Type
//     - `infer U`
//
//     und erkläre insbesondere,
//     wer bei einem normalen Generic den konkreten Typ für T festlegt
//     und wer bei `infer U` den Typ von U herausfindet.