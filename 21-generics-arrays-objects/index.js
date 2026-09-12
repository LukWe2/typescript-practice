"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userStore = {
    items: [
        {
            id: 1,
            name: "Lukas"
        },
        {
            id: 2,
            name: "Anna"
        }
    ],
    selectedItem: {
        id: 1,
        name: "Lukas"
    }
};
const projectStore = {
    items: [
        {
            id: 1,
            title: "TypeScript Project"
        },
        {
            id: 2,
            title: "Python Project"
        }
    ],
    selectedItem: null
};
function getFirstItem(item) {
    // braucht .items hier weil das das Array ist in das wir hinzufügen wollen, nur item[0] geht nicht weil store nur das Objekt ist und nicht das Array
    return item.items[0];
}
console.log(getFirstItem(userStore));
console.log(getFirstItem(projectStore));
function addItem(store, item) {
    // braucht .items hier weil das das Array ist in das wir hinzufügen wollen, nur store.push geht nicht weil store nur das Objekt ist und nicht das Array
    store.items.push(item);
}
addItem(userStore, { id: 3, name: "Peter" });
// geht nicht, weil mit userStore was vom Typ DataStore<User> ist, der Generic T auf User inferriert wird und deshalb das zweite Argument des Function Aufruf auch ein Objekt vom Typ User sein muss, also mit properties id und name und nicht id und title
//addItem(userStore, { id: 3, title: "Java Project" });
console.log(userStore);
// 1. Was bedeutet hier T[]****?
/*
type Collection<T> = {
    items: T[];
};
*/
// Antwort: T[] bedeutet hier, dass items als Property ein Array mit Elementen vom Typ T enthält, das beim Aufruf eines Objekts mit dem Type Collection angegeben wird, also z.B. Collection<string>, dann ist items ein Array mit Elementen von Typ T, bei Collection<number> mit Typ number
// Antwort: Richtig. items: T[] bedeutet: items ist ein Array, dessen Elemente vom Typ T sind.
// 2. Wenn du schreibst: DataStore<User> was bedeutet dann jedes T innerhalb von DataStore<T>?
// Antwort: Es bedeutet dann immer, dass jede Variable und jedes Objekt T vom Typ User sein muss.
// Antwort: Fast richtig, aber nicht jedes T bedeutet zwingend „Objekt vom Typ User“. Es bedeutet allgemeiner: Jedes T innerhalb von DataStore<T> wird durch User ersetzt. Zum Beispiel:
/*
type DataStore<T> = {
    items: T[];
    selectedItem: T | null;
};
*/
// Bei: DataStore<User> wird daraus:
/*
{
    items: User[];
    selectedItem: User | null;
}
*/
// Also: T = User überall in dieser konkreten Verwendung.
//3. Warum kann dieselbe Definition DataStore<T> sowohl für User als auch für Project benutzt werden?
// Antwort: Da DataStore den Generic Type T benutzt, und somit kann für diesen Typen beide Typen eingesetzt werden und somit sind alle in den Properties festgelegten T's User oder Project.
// Antwort: Richtig. Genau das ist der Sinn von Generics: Die Struktur bleibt gleich, aber der konkrete Datentyp ist flexibel. DataStore<User> und DataStore<Project> verwenden denselben Bauplan.
// Aber dann müssen die Strukturen auch passen zwischen dem Generic Type Alias und den zwei normalen Types.
// 4. Was erkennt TypeScript hier für T: getFirstItem(userStore); wenn userStore vom Typ: DataStore<User> ist?
// Antwort: Dann erkennt TypeScript für T User, da das Argument im Methodenkopf von Type User ist und somit kann TypeScript die anderen T's inferrieren.
// Antwort: Deine Antwort ist im Kern richtig. Präziser: Wenn die Funktion so aussieht:
/*
function getFirstItem<T>(
    store: DataStore<T>
): T | undefined
*/
// und userStore vom Typ: DataStore<User> ist, dann vergleicht TypeScript: DataStore<T> mit DataStore<User> und schließt daraus: T = User. Deshalb ist der Rückgabewert: User | undefined
// 5. Warum ist das besser, als UserStore****, ProjectStore****, ProductStore usw. einzeln mit derselben Struktur zu definieren?
//Antwort: Da man so Code spart und eine allgemeine Funktion hat die mit mehreren Typen funktioniert statt nur mit einem spezifischen.
//# sourceMappingURL=index.js.map