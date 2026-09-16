// Können Promises selbst erstellen mit new Promise((resolve, reject) => {if (success){ resolve(...) } else { reject(...)}});
// resolve und reject sind dabei ... 
function getUser() {
    return new Promise((resolve) => {
        resolve({
            id: 1,
            name: "Lukas"
        });
    });
}
;
// Achtung: die () bei getUser nicht vergessen also getUser(), sonst geht .then() nicht weil man die Funktion garnicht aufruft!
const user01 = getUser().then((user) => {
    console.log(user.name);
    // returnen hier noch user, weil user01 sonst vom Typ Promise<void> ist, wenn man users noch returned dann vom Typ Promise<User> wie gewollt
    return user;
});
function getUsers() {
    return new Promise((resolve) => {
        resolve([
            {
                id: 2,
                name: "Anna"
            },
            {
                id: 3,
                name: "Peter"
            }
        ]);
    });
}
;
const users = getUsers().then((users) => {
    users.map((user) => {
        console.log(user.name);
    });
    // returnen hier noch users, weil users sonst vom Typ Promise<void> ist, wenn man users noch returned dann vom Typ Promise<User[]> wie gewollt
    return users;
});
function getNumber() {
    return new Promise((resolve) => {
        resolve(10);
    });
}
;
const number01 = getNumber().then((number) => {
    console.log(number * 2);
});
// Argument of type 'string' is not assignable to parameter of type 'User | PromiseLike<User>'.
function getWrongUser() {
    return new Promise((resolve) => {
        resolve("Lukas");
    });
}
const user = getUser();
// user ist nicht direkt ein User, sondern ein Promise<User>, deswegen kann man nicht direkt auf die name Property zugreifen und bräuchte noch .then()
user.name;
export {};
//# sourceMappingURL=index.js.map