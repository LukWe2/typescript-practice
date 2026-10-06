type User = {

    id: number,
    name: string,
    active: boolean
};

type Project = {

    id: number,
    title: string,
    status: "planned" | "active" | "done"
};


const users: User[] = [
    {
        id: 1,
        name: "Lukas",
        active: true
    },
    {
        id: 2,
        name: "Anna",
        active: true
    },
    {
        id: 3,
        name: "Peter",
        active: false
    }
];

const projects: Project[] = [
    {
        id: 1,
        title: "Mobile App",
        status: "active"
    },
    {
        id: 2,
        title: "Website",
        status: "planned"
    },
    {
        id: 3,
        title: "Migration",
        status: "done"
    }
];


function findById<T extends { id: number }>(data: T[], id: number): T | undefined {

    return data.find((element) => {

        return element.id === id;
    })
};

// soll Array zurückgeben, in dem Element mit ID fehlt -> .filter() weil es aussortieren kann und ein Array zurückgibt
// und: Originalarray soll nicht verändert werden, also .map() nötig! Nur return und neues Array würde zwar neues Array aber Objekte hätten immernoch Referenzen auf originale Objekte!
function removeById<T extends { id: number }>(data: T[], id: number): T[] {

    const elementExists = data.some((element) => {
    return element.id === id;
    });

    if (!elementExists) {
        throw new Error("No element with this id!");
    }

    const filteredArray = data.filter((element) => {

        return element.id !== id;
    });

    // also filtern erst Elemente und packen sie in ein neues Array filteredArray (weil .filter() ein neues Array erstellt), ABER: die Elemente (hier sind es ja Objekte) wurden nur kopiert ins neue Array filteredArray und haben immernoch die gleiche Referenz wie die Elemente im Originalarray
    // deswegen kopieren wir jedes Element nochmal mit ...element in nochmal ein neues Array copiedArrayWithIndependantObjects in .map();
    //Wichtig nur: { ...element } ist wieder nur eine shallow copy. Falls T später verschachtelte Objekte enthält, würden diese inneren Objekte weiterhin dieselben Referenzen behalten.

    const copiedArrayWithIndependantObjects = filteredArray.map((element) => {

        return {

            ...element
        };
    });

    return copiedArrayWithIndependantObjects;
};

/*
Für die eigentliche Aufgabe reicht schon:

function removeById<T extends { id: number }>(
    data: T[],
    id: number
): T[] {

    return data.filter((element) => {
        return element.id !== id;
    });
}

Denn .filter() erzeugt ja ein neues Array, und auch wenn die Objektreferenzen dann gleich sind und eine Veränderung der Elemente wie:

const filteredUsers = users.filter((user) => {
    return user.id !== 2;
});

filteredUsers[0]!.name = "Peter";

zwar auch das Originalarray verändern würde, für removeById() also die Aufgabe an sich ist das mit auch neue Objektreferenzen erzeugen normalerweise unnötig, weil die verbleibenden Objekte gar nicht verändert werden sollen. Man will nur ein Element aus der Liste entferne
-> Aber technisch ist es richtig und wenn die Aufgabe es verlangt hätte wäre es genau richtig.
*/


function updateById<T extends { id: number }>(data: T[], id: number, changeData: Partial<Omit<T, "id">>): T[]{

    const elementExists = data.some((element) => {
    return element.id === id;
    });

    if (!elementExists) {
        throw new Error("No element with this id!");
    }

    const newData = data.map((element) => {

        // wenn id von gerade iteriertem Element mit übergebener ID übereinstimmt, returne für dieses das normale Element (...element) und ersetze danach die Properties die übergeben wurden als changeData -> gibt erst ganzes originales Objekt und dann was verändert werden soll
        if (element.id === id){

            return {
                ...element,
                ...changeData
            }
        };

        return element;
    });

    return newData;
};

// heißt erster Generic ist einfach T, K extends keyof T heißt, K muss einer der Keys von Typ T sein, bei User wäre das "id" | "name" | "active", bei Project "id" | "title" | "status", somit kann das zweite übergebene Argument nur einer der Propertynamen von T sein
// hatte vorher ja property: T[keyof T], das wären aber schon die Typen der Properties von T, weil der Aufruf typ[propertykey] den Typen der Property holt und nicht nur den Propertykeynamen, der nur mit "keyof typ" geholt wird
// deswegen ist der Rückgabetyp auch T[K], K ist ein Propertyname und der Aufruf typ[propertykeyname] holt ja den Typen
// K ist dann ein Key des Typs T also ein Propertykeynamen
// property: keyof T würde auch schon reichen, damit man nur Propertykeynamen von T einsetzen kann, aber beim Rückgabetyp wäre es dann ein Union aus allen Typen dieser Property von T, mit T[K] ist es wirklich genau der Typ der einen Property die übergeben wird, sonst wäre der Rückgabetyp T[keyof T]
// Beispiel: keyof T für User ergibt "id" | "name" | "active", somit würde property: "id" | "name" | "active" passen, man könnte nur diese Propertynamen aufrufen, aber T[keyof T] wäre User[keyof User], was number | string | boolean ergibt und nicht genau den Wert der aufgerufenen Property
// wen wir also getProperty(users, "id"); aufrufen, wollen wir dass der Rückgabewert number ist und nicht number | string | boolean, das geht mit T[keyof T] aber nicht, wir brauchen eine Variable die genau die Property hält und mit der wir genau den Typen dieser Variable erkennen können, das ist K
function getProperty<T, K extends keyof T>(data: T, property: K): T[K] {

    return data[property]
};


function sortByProperty<T, K extends keyof T>(data: T[], property: K): T[] {

    const sortedData = [...data];

    sortedData.sort((a, b) => {

        // bei sortByProperty(users, "id"); ist ja property = "id", wenn aktuell verglichende User a = { id: 2, name: "Anna", active: true } und b = { id: 1, name: "Lukas", active: true } sind, dann wird: const aValue = a[property]; zu const aValue = a["id"]; also aValue = 2;
        // und const bValue = b[property]; wird zu const bValue = b["id"]; also bValue = 1;
        // Bei Zahlen kommt dann dieser Vergleich: return aValue - bValue; und .sort() interessiert sich dabei nur dafür, ob das Ergebnis negativ, positiv oder 0 ist
        // Wenn das Ergebnis negativ ist, dann bedeutet das: a kommt vor b, z.B. 2 vor 5 wenn a 2 ist und b 5
        // Wenn das Ergebnis positiv ist, dann bedeutet das: b kommt vor a, also 2 vor 5 wenn b 2 ist und a 5 ist
        // Wenn das Ergebnis 0 ist, dann bedeutet das: a und b gelten für die Sortierung als gleich
        const aValue = a[property];
        const bValue = b[property];

        if (typeof aValue === "number" && typeof bValue === "number") {

            // wenn Ergebnis negativ ist, dann kommt a vor b, und JavaScript ordnet a vor b an
            // wenn Ergebnis positiv ist, dann kommt b vor a, und JavaScript ordnet b vor a an
            // bei Ergebnis 0 bleibt es einfach in der Reihenfolge
            return aValue - bValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {

            return aValue.localeCompare(bValue);
        }

        throw new Error("Property must contain string or number values");
    });

    return sortedData;
};


function main(): void {

    const userID2 = findById(users, 2);
    console.log(userID2);

    const projectID3 = findById(projects, 3);
    console.log(projectID3);

    const userListWithoutUser2 =
        removeById(users, 2);

    console.log(userListWithoutUser2);


    console.log("Projects before:", projects);

    const updatedProjects = updateById(
        projects,
        2,
        { status: "active" }
    );

    console.log("Updated projects:", updatedProjects);
    console.log("Original projects:", projects);


    const thirdUser = users[2];

    if (thirdUser !== undefined) {

        const nameOfUser3 =
            getProperty(thirdUser, "name");

        console.log(nameOfUser3);
    }


    const secondProject = projects[1];

    if (secondProject !== undefined) {

        const statusOfProject2 =
            getProperty(secondProject, "status");

        console.log(statusOfProject2);
    }


    const sortedUsers =
        sortByProperty(users, "name");

    console.log(sortedUsers);


    const sortedProjects =
        sortByProperty(projects, "title");

    console.log(sortedProjects);
}

main();