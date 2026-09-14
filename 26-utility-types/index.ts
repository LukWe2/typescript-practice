// Mit den Utility Functions Partial<T>, Pick<T, K>, Omit<T, K>, Record<K, V> kann man aus einem bestehenden Typen neue erstellen (Partial, Pick, Omit) oder seperat einen neuen erstellen mit Record

type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
    role: "admin" | "developer" | "user";
};

type UserUpdate = Partial<User>;

// da Partial alle Properties mit ? optional macht, kann man mit neuem Typen UserUpdate Properties vom originalen User Type weglassen
// Wichtig: User selbst bleibt dabei unverändert.
const userUpdate01: UserUpdate = {

    id: 1,
    name: "Lukas",
    active: true,
    role: "admin"
};

const userUpdate02: UserUpdate = {

    id: 2,
    name: "Anna",
    role: "developer"
};

// mit Pick<T, K> erstellt man einen neuen Typen der nur die im zweiten Argument deklarierten Properties enthält (hier: id, name, role) vom originalen Typen (hier: User), die anderen werden nicht übernommen (email, active)
type UserPreview = Pick<User, "id" | "name" | "role">;

const userPick01: UserPreview = {

    id: 3,
    name: "Peter",
    role: "user"
};

// Object literal may only specify known properties, and 'active' does not exist in type 'UserPreview'.
// geht nicht, weil Typ UserPreview durch Pick nicht mehr die Property active enthält wie der originale User Typ
/*const userPick02: UserPreview = {

    id: 4,
    name: "Thomas",
    active: false,
    role: "user",
};*/

// mit omit<T, K> erstellt man einen neuen Typen der die im zweiten Argument deklarierten Properties weglässt (hier: email) vom originalen Typen (hier: User) und sonst die nicht angegebenen beibehält und nicht weglässt (id, name, active, role)
type PublicUser = Omit<User, "email">;

const userPublic01: PublicUser = {

    id: 5,
    name: "Lara",
    active: true,
    role: "user"
};

// Object literal may only specify known properties, and 'email' does not exist in type 'PublicUser'.
// geht nicht, weil Typ PublicUser nicht Property email enthält, weil wir mit Omit diese Property nicht mit in den neuen Type übernommen haben vom originalen Type User
/*const userPublic02: PublicUser = {

    id: 6,
    name: "Christopher",
    email: "christopher-menninger@t-mobile.com",
    active: true,
    role: "user"
};*/

// mit Record <K, V> können wir direkt einen neuen Type mit seinen Properties erstellen, heißt hier geben wir direkt die Propertynamen an und den Type, den die Properties haben können (kann wie hier nur string sein oder auch Union wie string | number)
// könnten Propertynamen im ersten Argument auch mit keyof aus einem anderen Typen extrahieren wenn gewollt, zum Beispiel: type User = { id: number; name: string; active: boolean; };, dann type UserFlags = Record<keyof User, boolean>; keyof User ergibt dann "id" | "name" | "active"
// Also wird UserFlags effektiv zu: type UserFlags = { id: boolean; name: boolean; active: boolean; }; Und dann z.B.: const flags: UserFlags = { id: true, name: false,  active: true };
// Record baut einen Objekttyp aus einer Menge von Keys K und einem Werttyp V. Die Keys können natürlich wiederum aus einem anderen Typ stammen
// z.B. auch mit type Role = User["role"]; type RoleDescriptions = Record<Role, string>;
type RoleDescriptions = Record<"admin" | "developer" | "user", string>;

const roleDescription01: RoleDescriptions = {

    admin: "1",
    developer: "1",
    user: "2"
};



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