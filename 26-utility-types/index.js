// 26 – Utility Types
// Erstelle einen vollständigen User-Typ mit id, name, email, active und role und leite daraus verschiedene neue Typen mit TypeScripts Utility Types ab.
// Verwende Partial<User>, um einen UserUpdate-Typ zu erzeugen, bei dem alle ursprünglichen Properties optional sind und deshalb nur einzelne Änderungen angegeben werden müssen.
// Verwende Pick<User, ...>, um einen UserPreview-Typ zu erstellen, der ausschließlich ausgewählte Properties wie id, name und role besitzt; teste, dass nicht ausgewählte Properties dort nicht erlaubt sind.
// Verwende Omit<User, ...>, um einen PublicUser zu erstellen, bei dem sensible Properties wie email entfernt wurden, während alle anderen Properties erhalten bleiben.
// Verwende Record<K, V>, um einen Objekttyp mit fest vorgegebenen Keys und einem gemeinsamen Value-Typ zu erzeugen, z.B. Beschreibungen für "admin", "developer" und "user".
// Beachte dabei, dass Partial, Pick und Omit neue Typen aus einem bestehenden Typ ableiten und den ursprünglichen User-Typ nicht verändern.
// da Partial alle Properties mit ? optional macht, kann man mit neuem Typen UserUpdate Properties vom originalen User Type weglassen
// Wichtig: User selbst bleibt dabei unverändert.
const userUpdate01 = {
    id: 1,
    name: "Lukas",
    active: true,
    role: "admin"
};
const userUpdate02 = {
    id: 2,
    name: "Anna",
    role: "developer"
};
const userPick01 = {
    id: 3,
    name: "Peter",
    role: "user"
};
const userPublic01 = {
    id: 5,
    name: "Lara",
    active: true,
    role: "user"
};
const roleDescription01 = {
    admin: "1",
    developer: "1",
    user: "2"
};
export {};
// 1. Was macht: Partial<User> mit den Properties von User?
// Antwort: Sie macht alle Properties der User mit ? zu optionalen Properties, heißt man kann Properties in diesem neuen Typen weglassen.
// Antwort: Richtig. Präziser: Partial<User> erstellt einen neuen Typ, in dem alle Properties von User optional sind.
// 2. Was bedeutet: Pick<User, "id" | "name"> ?
// Antwort: Das bedeutet, dass dieser neu erstellte Type die Properties id und name übernimmt, sonst die anderen Properties vom Type User aber nicht übernimmt.
// Antwort: Genau richtig. Es übernimmt nur id und name, alle anderen Properties von User sind im neuen Typ nicht enthalten.
// 3. Was ist der Unterschied zwischen Pick und Omit****?
// Antwort: Der Unterschied ist, dass mit Pick die als Argument als Union deklarierten Properties in einen neuen Typ vom originalen Type übernommen werden und bei Omit werden alle Properites, außer die als zweites Argument angegebenen Properties übernommen.
// 4. Was bedeuten K und V bei: Record<K, V> ?
// Antwort: K sind bei Record die Keys bzw. Properties, die der neu erstellte Typ haben soll und V von welchem Typen diese Keys/Properties sein dürfen, dabei kann man nur einen Typ wie string, aber auch Unions wie string | number oder auch wiederum Typen wie User angeben.
// Antwort: Auch richtig. Noch etwas genauer: K = welche Keys das Objekt haben soll, V = welchen Typ die Werte hinter diesen Keys haben sollen; Zum Beispiel: Record<"admin" | "user", string> ergibt: { admin: string;  user: string; }
// Und ja, V kann auch komplex sein: Record<"admin" | "user", User>, Dann muss hinter jedem Key ein komplettes User-Objekt liegen, z.B.:
/*
type UsersByRole =
    Record<"admin" | "user", User>;

// admin und user sind dann die Properties, aber sie müssen vom Typ User sein was wiederum Properties hat
const users: UsersByRole = {
    admin: {
        id: 1,
        name: "Lukas",
        email: "lukas@example.com",
        active: true
    },

    user: {
        id: 2,
        name: "Anna",
        email: "anna@example.com",
        active: true
    }
};
*/
// 5. Was wäre ungefähr der resultierende Typ von: Record<"loading" | "error", boolean> ?
// Antwort: der resultierende Typ wäre:
/*
type recordType = {
loading: boolean;
error: boolean
};
*/
// 6. Verändert Partial<User> den ursprünglichen Typ User****?
// Antwort: Nein der ursprüngliche Typ User wird nicht verändert, es wird ein neuer Type mit optionalen Properties mit der Shape von User angelegt, z.B. type UserUpdate = Partial<User>;
// Antwort: Nein, genau richtig. User bleibt unverändert; Partial<User> erzeugt nur einen abgeleiteten neuen Typ.
//# sourceMappingURL=index.js.map