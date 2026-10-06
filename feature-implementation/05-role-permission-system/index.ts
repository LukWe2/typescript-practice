const users: User[] = [
    {
        id: 1,
        name: "Lukas",
        role: "admin",
        active: true
    },
    {
        id: 2,
        name: "Anna",
        role: "editor",
        active: true
    },
    {
        id: 3,
        name: "Peter",
        role: "viewer",
        active: false
    },
    {
        id: 4,
        name: "Sophie",
        role: "viewer",
        active: true
    }
];

// Je nach Property role Ausprägung soll diese Ausprägung bestimmte strings besitzen, die benutzt werden dürfen für diese Ausprägung admin, editor oder viewer
// Brauchen also eine Zuordnung: role Ausprägung (ist nur ein literal string) -> Permissions Ausprägung (können mehrere literal strings sein) aber key -> value
// 

type User = {

    id: number,
    name: string,
    role: "admin" | "editor" | "viewer",
    active: boolean
};

// dieser Type ist ohne geschweifte Klammer, weil es keine Werte zu einem Propertynamne zuweist! User dagegen hat Properties mit Name und Werten
// ist ein Literal Union Type und kein Objekttyp
type Permission =
    "users:read"
    | "users:write"
    | "projects:read"
    | "projects:write"
    | "settings:manage";


// User["role"] als erstes Element in Record (das K bei Record<K, V>) sagt, dass nur die Ausprägungen von Property role in User möglich sind also "admin", "editor", "viewer", wenn K string wäre, würde jeder String als Key gehen
// Permission[] als zweites Element in Record (das V bei Record<K, V>) sagt, dass die Ausprägung/Wert von K nur von diesem Typ sein darf bzw. haben muuss, wenn V number wäre, müsste der Wert zu jedem Key eine Zahl sein

// rolePermissions ist kein Typ sondern ein Objekt! Wir restriktieren dieses Objekt und seine Inhalte also Properties mit Werten (hier ist Property admin eben vom Typ Permission[], genauso wie Property id vom Typ number sein kann in einem anderen Objekt oder auch Typ, kann auch ein User Objekt erstellen const user01 = {id: number, name: string})
// Record<User["role"], Permission[]> ist aber ein Typ bzw. beschreibt einen Typen, hätten auch type RolePermissions = {admin: Permission[]; editor: Permission[]; viewer: Permission[];} schreiben können, Vorteil von Record ist aber, dass wenn sich die Werte von role im User Typ sich ändern, der Record-Typ sich automatisch mitverändert
// und man diesen nicht manuell anpassen müsste

// wäre auch möglich gewesen:
/*
type RolePermissions = {
    admin: Permission[];
    editor: Permission[];
    viewer: Permission[];
};

und dann: const rolePermissions: RolePermissions = { ... };
*/
const rolePermissions: Record<User["role"], Permission[]> = {
    admin: [
        "users:read",
        "users:write",
        "projects:read",
        "projects:write",
        "settings:manage"
    ],

    editor: [
        "users:read",
        "projects:read",
        "projects:write"
    ],

    viewer: [
        "users:read",
        "projects:read"
    ]
};


function getPermissionsForRole(role: User["role"]): Permission[] {

    // mit objekt["propertykey"] holt man sich den Wert für diese Property, und weil rolePermissions die Werte zu den drei Propertykeys admin, editor und viewer ein Array von Permissions ist, holt es die Permissions
    const permissionsForUser = rolePermissions[role];

    return permissionsForUser;
};


function hasPermission(user: User, permission: Permission): boolean {

    if (!user.active) {
        return false;
    }

    const userPermissions = getPermissionsForRole(user.role);

    if (userPermissions.includes(permission)){

        return true;
    }

    return false;
};


function getUsersWithPermission(users: User[], permission: Permission): User[] {

    const usersWithPermission = users.filter((user) => {

        return hasPermission(user, permission);
    });

    return usersWithPermission
};


type PermissionSummary = {

    id: number,
    name: string,
    role: User["role"],
    permissions: Permission[]
};


function getPermissionSummary(user: User): PermissionSummary {

    let permissionsUser = getPermissionsForRole(user.role);

    if (user.active === false){
        
        permissionsUser = []
    }

    return {

        id: user.id,
        name: user.name,
        role: user.role,
        permissions: permissionsUser
    }
};


function changeUserRoles(user: User, newRole: User["role"]): User{

    return {

        ...user,
        role: newRole
    }
};


function changeUserRoleInList(users: User[], id: number, newRole: User["role"]): User[] {

    // erst prüfen ob User überhaupt existiert, sonst soll ja Fehler geworfen werden
    const userExists = users.some((user) => {
        return user.id === id;
    });

    if (!userExists) {
        throw new Error("No user with this id!");
    }

    const updatedUsers = users.map((user) => {

        if (user.id === id){

            return {

                ...user,
                role: newRole
            }
        }

        return user;
    });

    return updatedUsers;
};


type PermissionUsage = Record<Permission, number>;

function getPermissionUsage(users: User[]): PermissionUsage {

    const usersReadCount = getUsersWithPermission(users, "users:read").length;

    const usersWriteCount = getUsersWithPermission(users, "users:write").length;

    const projectsReadCount = getUsersWithPermission(users, "projects:read").length;

    const projectsWriteCount = getUsersWithPermission(users, "projects:write").length;

    const settingsManageCount = getUsersWithPermission(users, "settings:manage").length;


    return {

        "users:read": usersReadCount,
        "users:write": usersWriteCount,
        "projects:read": projectsReadCount,
        "projects:write": projectsWriteCount,
        "settings:manage": settingsManageCount
    }
};



function main(): void {

    const allUsersCount = users.length;
    console.log(allUsersCount);


    const allActiveUsers = users.filter((user) => {

        return user.active === true;
    });

    const allActiveUsersCount = allActiveUsers.length;
    console.log(allActiveUsersCount);


    const permissionsOfEditor = getPermissionsForRole("editor");
    console.log(permissionsOfEditor);


    const firstUser = users[0];

    if (firstUser !== undefined) {
        console.log(
            `Hat Lukas permission "settings:manage"? ${hasPermission(firstUser, "settings:manage")}`
        );
    }

    const secondUser = users[1];

    if (secondUser !== undefined)
        console.log(`Hat Anna permission "users:write"?: ${hasPermission(secondUser, "users:write")}`);

    const thirdUser = users[2];

    if(thirdUser !== undefined)
        console.log(`Hat Peter permission "projects:read"?: ${hasPermission(thirdUser, "projects:read")}`);


    const usersWithProjectWrite = getUsersWithPermission(users, "projects:write");
    
    const namesWithProjectWrite = usersWithProjectWrite.map((user) => {

        return user.name;
    });
    console.log(namesWithProjectWrite);


    if (secondUser !== undefined)
    console.log(getPermissionSummary(secondUser));
    
    const fourthUser = users[3];

    console.log("Sophie vor Rollenänderung:", fourthUser);
    
    if (fourthUser !== undefined) {

        const updatedSophie =
            changeUserRoles(fourthUser, "editor");

        console.log("Sophie nach Rollenänderung:", updatedSophie);

        console.log("Original Sophie:", fourthUser);
    }


    console.log(getPermissionUsage(users));


    const updatedUsers = changeUserRoleInList(users, 4, "editor");

    console.log("Updated users:", updatedUsers);
    console.log("Original users:", users);
}


main();