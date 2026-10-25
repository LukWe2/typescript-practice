// Verwende für mehrere Aufgaben:
//
// type User = {
//     id: number;
//     name: string;
//     email: string;
//     active: boolean;
// };


// 1.
// Erstelle zunächst einen normalen Mapped Type:
//
// type Copy<T> = ...
//
// der alle Keys und Value Types unverändert übernimmt.
//
// Erkläre im Kommentar,
// was K in keyof T und T[K] jeweils bedeuten.


// 2.
// Erstelle:
//
// type GetterNames<T> = ...
//
// mit Key Remapping,
// sodass aus:
//
// name
// email
// active
//
// die Keys:
//
// getName
// getEmail
// getActive
//
// entstehen.
//
// Die Value Types sollen zunächst noch die ursprünglichen
// Value Types sein.
//
// Beispiel:
//
// getName: string


// 3.
// Ändere den Type aus Aufgabe 2 so,
// dass echte Getter-Funktionstypen entstehen:
//
// getName: () => string
// getEmail: () => string
// getActive: () => boolean


// 4.
// Erstelle:
//
// type Setters<T> = ...
//
// sodass aus:
//
// name: string
//
// entsteht:
//
// setName: (value: string) => void
//
// und entsprechend für alle anderen Properties.


// 5.
// Kombiniere deine Getter und Setter
// mit einem Intersection Type:
//
// type Accessors<T> = ...
//
// Untersuche den resultierenden Typ für User.


// 6.
// Erstelle:
//
// type RemoveId<T> = ...
//
// Benutze Key Remapping und `never`,
// sodass die Property `id` entfernt wird.
//
// Teste mit User.


// 7.
// Erstelle einen generischen:
//
// type MyOmit<T, Keys> = ...
//
// Der Type soll alle Properties entfernen,
// deren Keys in Keys vorkommen.
//
// Teste:
//
// MyOmit<User, "id" | "email">


// 8.
// Erstelle das Gegenteil:
//
// type MyPick<T, Keys> = ...
//
// sodass nur die angegebenen Keys erhalten bleiben.
//
// Teste:
//
// MyPick<User, "id" | "name">


// 9.
// Erstelle:
//
// type StringProperties<T> = ...
//
// Behalte nur Properties,
// deren VALUE TYPE mit string kompatibel ist.
//
// Bei User soll ungefähr entstehen:
//
// {
//     name: string;
//     email: string;
// }


// 10.
// Erstelle:
//
// type BooleanProperties<T> = ...
//
// Behalte ausschließlich Properties,
// deren Value Type boolean ist.


// 11.
// Gegeben:
//
// type Service = {
//     url: string;
//     retries: number;
//     connect: () => void;
//     disconnect: () => void;
// };
//
// Erstelle:
//
// type FunctionProperties<T> = ...
//
// sodass nur:
//
// connect
// disconnect
//
// erhalten bleiben.


// 12.
// Erstelle:
//
// type ChangeHandlers<T> = ...
//
// sodass aus:
//
// type FormData = {
//     username: string;
//     age: number;
// };
//
// entsteht:
//
// {
//     onUsernameChange:
//         (value: string) => void;
//
//     onAgeChange:
//         (value: number) => void;
// }


// 13.
// Erstelle einen Wert,
// der tatsächlich deinen Getter-Type erfüllt.
//
// Beispiel:
//
// const userGetters: Getters<User> = {
//     ...
// };
//
// Zeige damit:
// Der Mapped Type erzeugt nur den Typ,
// die Funktionen zur Runtime musst du selbst implementieren.


// 14.
// Schreibe abschließend in Kommentaren:
//
// - was Key Remapping bedeutet
// - welche Aufgabe `as` innerhalb eines Mapped Types hat
// - warum dieses `as` keine Type Assertion ist
// - was passiert, wenn der neue Key `never` wird
// - Unterschied zwischen:
//      K extends ...
//   und:
//      T[K] extends ...
// - wie Template Literal Types und Key Remapping zusammenarbeiten
// - warum Key Remapping keinen Runtime-Code erzeugt