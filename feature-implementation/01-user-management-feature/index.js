const apiData = [
    {
        id: 1,
        name: "Lukas",
        email: "lukas@example.com",
        role: "admin",
        active: true
    },
    {
        id: 2,
        name: "Anna",
        email: "anna@example.com",
        role: "developer",
        active: true
    },
    {
        id: 3,
        name: "Peter",
        email: "peter@example.com",
        role: "viewer",
        active: false
    }
];
function main() {
    if (!isUsersInArray(apiData)) {
        throw new Error("Invalid user data");
    }
    // Ab hier ist apiData ein User[] und jedes vorhandene
    // Element des Arrays entspricht dem Typ User.
    console.log("Anzahl aller User:", apiData.length);
    const activeUsers = getActiveUsers(apiData);
    console.log("Anzahl aktiver User:", activeUsers.length);
    const adminUsers = getUserByRole(apiData, "admin");
    const adminNames = adminUsers.map((user) => {
        return user.name;
    });
    console.log("Admins:", adminNames);
    // ACHTUNG FALSCH: ohne Typeguard kommt Fehler:
    // "Argument of type 'User | undefined' is not assignable to parameter of type 'User'.
    // Type 'undefined' is not assignable to type 'User'."
    // für das apiData[1] in updateUser(apiData[1], { name: "Christop", active: false })
    // KORREKTUR:
    // Es lag nicht daran, dass apiData[1] noch kein geprüfter User wäre.
    // Durch isUsersInArray(apiData) weiß TypeScript bereits, dass apiData ein User[] ist und die im Array vorhandenen Objekte vom Typ User sind.
    // Wegen "noUncheckedIndexedAccess": true kann ein Array-Zugriff wie apiData[1]
    // aber trotzdem User | undefined ergeben, weil TypeScript nicht garantiert,
    // dass an Index 1 tatsächlich ein Element existiert.
    // Deswegen anstatt den User nochmal mit isUser(apiData[1]) zu prüfen,
    // zuerst das Element in einer Variable speichern und nur prüfen, ob es nicht undefined ist.
    // Ist es nicht undefined, weiß TypeScript automatisch, dass es sich um einen User handelt.
    const secondUser = apiData[1];
    if (secondUser !== undefined) {
        console.log(secondUser);
        const updatedSecondUser = updateUser(secondUser, {
            name: "Christop",
            active: false
        });
        console.log("Updated:", updatedSecondUser);
    }
    // Achtung:
    // Wir nehmen hier nur den zweiten User, kopieren ihn, verändern ihn
    // und speichern den neuen User in updatedSecondUser.
    // Das Originalarray apiData wird dadurch nicht verändert.
    // Dafür müssten wir z. B. mit .map() ein neues Array erzeugen
    // und den entsprechenden User ersetzen.
    // ACHTUNG FALSCH: ohne Typeguard kommt auch hier wieder Fehler:
    // "Argument of type 'User | undefined' is not assignable to parameter of type 'User'."
    // KORREKTUR:
    // Auch hier ist das Problem nicht, dass apiData[0] kein User wäre.
    // apiData ist bereits als User[] narrowed.
    // Das Problem ist nur, dass der Indexzugriff wegen noUncheckedIndexedAccess
    // möglicherweise undefined zurückgeben könnte.
    const firstUser = apiData[0];
    if (firstUser !== undefined) {
        const valueOfEmailPropertyFirstUser = getUserProperty(firstUser, "email");
        console.log("E-Mail:", valueOfEmailPropertyFirstUser);
    }
    // Absichtlicher TypeScript-Fehler 1:
    //getUserByRole(apiData, "superadmin");
    // Fehler, weil "superadmin" nicht zu User["role"] gehört.
    // Absichtlicher TypeScript-Fehler 2:
    //if (secondUser !== undefined) {
    //    updateUser(secondUser, { id: 999 });
    //}
    // Fehler, weil updateUser() durch Omit<Partial<User>, "id">
    // keine Änderung der id erlaubt.
}
main();
// 1. Prüfe zur Laufzeit, ob apiData wirklich eine gültige Liste von Usern enthält. Sind die Daten ungültig, soll ein Fehler ausgelöst werden.
// - brauche erstmal eine Funktion die prüft ob jeder User in apiData Array überhaupt ein User ist, dann kann ich diese für alle Elemente (die User sind) iterieren und prüfen ob jedes einzelne Element ein legitimer User nach unserem Typ ist
function isUser(user) {
    if (typeof user != "object" || user == null) {
        return false;
    }
    return ("id" in user && typeof user.id === "number" &&
        "name" in user && typeof user.name === "string" &&
        "email" in user && typeof user.email === "string" &&
        "role" in user && (user.role === "admin" || user.role === "developer" || user.role === "viewer") &&
        "active" in user && typeof user.active === "boolean");
}
;
function isUsersInArray(userArray) {
    // hatte vorher fälschlicherweise: if (Array.isArray(apiData) && userArray.every(isUser)), da kam dieser Fehler für das userArray.every(isUser): 'userArray' is of type 'unknown', als dann apiData mit userArray augetauscht wurde, war der rechte Fehler auch weg, warum?: 
    if (Array.isArray(userArray) && userArray.every(isUser)) {
        return true;
    }
    return false;
}
;
function getActiveUsers(userArray) {
    const activeUsers = userArray.filter((user) => {
        return user.active === true;
    });
    return activeUsers;
}
;
function getUserByRole(userArray, role) {
    const filteredUsers = userArray.filter((user) => {
        return user.role === role;
    });
    return filteredUsers;
}
;
function updateUser(user, changedUser) {
    const updatedUser = {
        ...user,
        ...changedUser
    };
    return updatedUser;
}
;
// User[K] ist ein Indexed Access Type, also dieser Ausdruck Typ[Key/Property] liefert einen Typ zurück, wie hier bei User["email"] string, bei User[id] gleich number, weil die Keys als Strings aufgerufen
// werden aber trotzdem "id" dann eine number liefert also obwohl "id" als Argument ein String ist wird dann eine number gefunden, 
// ausschlaggebend ist also das was im String steht und nicht dass es ein String ist in den [], so ist einfach der definierte Aufruf
// keyof User ergibt "id" | "name" | "email" | "role" | "active" also ein Literal Union der Keys/Properties von User, K extends heißt nur dass K einer dieser Werte sein muss
// also K muss "id" oder "name" oder "email" oder "role" oder "active" sein, somit geht nur User["id"], User["name"], User["email"], User["role"], User["active"] als Rückgabewert also
// string, number, "admin" , "developer" , "viewer", boolean
// mit K extends keyof User legt man also direkt fest, dass das zweite Argument also den Propertykey ("id" | "name" | "email" | "role" | "active") nur einer von diesen sein kann und man nur diese als Argument übergeben kann
// Rückgabewert wird dann noch mit User[K] abgesichert, das liefert ja die Typen der Keys/Properties und user[property] liefert dann den Wert zum Key/Property weil object["property"] gleich Wert gibt,
// bei Typen gibt typ["property"] aber den Typ der Property zurück, nicht den Wert (gibt ja noch keine Werte bei Typen) -> Wichtig: die Keys/Properties in den eckigen Klammern müssen aufgrund der Syntax von
// Indexed Access Types als Strings übergeben werden und bei dem Objekt-Property-Zugriff auch (das heißt nicht Indexed Access Type, nur beim Type nicht beim Objekt da ist es ein einfacher Zugriff), 
// deswegen passt keyof Type perfekt, weil es die Keys/Property Namen als Literal Union aus Strings zurückgibt!
function getUserProperty(user, property) {
    // beim Aufruf oben wäre das dann firstUser["email"], was wieder zwar als String aufgerufen wird der Key aber dann der Wert für die email-Property geholt wird
    return user[property];
}
export {};
//# sourceMappingURL=index.js.map