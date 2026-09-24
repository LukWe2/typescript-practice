type User = {

    id: number,
    name: string,
    email: string,
    role: "admin" | "developer" | "viewer",
    active: boolean
};

const apiData: unknown = [
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


function main(): void {

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

        const valueOfEmailPropertyFirstUser =
            getUserProperty(firstUser, "email");

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


function isUser(user: unknown): user is User {

    if (typeof user != "object" || user == null){

        return false;
    }

    return(
        "id" in user && typeof user.id === "number" &&
        "name" in user && typeof user.name === "string" &&
        "email" in user && typeof user.email === "string" &&
        "role" in user && ( user.role === "admin" || user.role === "developer" || user.role === "viewer" ) &&
        "active" in user && typeof user.active === "boolean"
    )
};


function isUsersInArray(userArray: unknown): userArray is User[] {

    // hatte vorher fälschlicherweise: if (Array.isArray(apiData) && userArray.every(isUser)), da kam dieser Fehler für das userArray.every(isUser): 'userArray' is of type 'unknown', als dann apiData mit userArray augetauscht wurde, war der rechte Fehler auch weg, warum?: 
    if (Array.isArray(userArray) && userArray.every(isUser)){
        return true;
    }

    return false;
};


function getActiveUsers(userArray: User[]): User[] {

    const activeUsers = userArray.filter((user) => {

        return user.active === true;
    })

    return activeUsers;
};


function getUserByRole(userArray: User[], role: User["role"]): User[]{

    const filteredUsers = userArray.filter((user) => {

        return user.role === role;
    });

    return filteredUsers;
};



function updateUser(user: User, changedUser: Omit<Partial<User>, "id">) : User {

    const updatedUser = {

        ...user,
        ...changedUser
    }

    return updatedUser;
};

function getUserProperty<K extends keyof User>(user: User, property: K): User[K] {

    return user[property];
}