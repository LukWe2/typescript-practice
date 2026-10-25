
type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
};


// 1.

// K in keyof ist eine Type Variable für den jeweils gerade verarbeiteten Key aus dem Typ T
// keyof T holt sich die Propertykeynamen des Typs T als Literal String Union, K in keyof T bedeutet dass TypeScript sich jeden Property aus
// keyof T also aus dem Literal Union String nimmt und in Kombination mit T[K] wird dann Typ[Propertykey in ""] zugewiesen, was sich den Typ
// der jeweiligen Property holt, es ist Indexed Access Type 
type Copy<T> = {

    [K in keyof T]: T[K];
}


// 2.

type GetterNames<T> = {

    [K in keyof T]
}


























































// 1. Wie lautet die allgemeine Syntax für Key Remapping
// innerhalb eines Mapped Types?
/*
[K in keyof T as ...]: ...
*/
// Was bedeuten die einzelnen Teile?
// Antwort:
// Antwort:


// 2. Was ist der Unterschied zwischen:
/*
[K in keyof T]: T[K]
*/
// und:
/*
[K in keyof T as NewKey]: T[K]
*/
// Antwort:
// Antwort:


// 3. Welche Bedeutung hat `as` hier?
/*
[K in keyof T as `get${...}`]
*/
// Ist dieses `as` eine Type Assertion?
// Antwort:
// Antwort:


// 4. Was entsteht hier?
/*
type User = {
    name: string;
    age: number;
};

type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};

type Result = Getters<User>;
*/
// Antwort:
// Antwort:


// 5. Was passiert bei K = "name"
// in Frage 4 Schritt für Schritt?
// Antwort:
// Antwort:


// 6. Warum wird häufig `string & K` verwendet,
// bevor K an Capitalize<T> übergeben wird?
// Antwort:
// Antwort:


// 7. Was bedeutet `never` in dieser Position?
/*
type RemovePassword<T> = {
    [K in keyof T as
        K extends "password"
            ? never
            : K
    ]: T[K];
};
*/
// Antwort:
// Antwort:


// 8. Warum wird die Property `password`
// in Frage 7 vollständig entfernt?
// Antwort:
// Antwort:


// 9. Was ist der Unterschied zwischen:
/*
K extends "id"
*/
// und:
/*
T[K] extends string
*/
// innerhalb eines Key-Remapping-Mapped-Types?
// Antwort:
// Antwort:


// 10. Was macht folgender Type?
/*
type StringProperties<T> = {
    [K in keyof T as
        T[K] extends string
            ? K
            : never
    ]: T[K];
};
*/
// Antwort:
// Antwort:


// 11. Welche TypeScript-Konzepte werden hier kombiniert?
/*
type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};
*/
// Antwort:
// Antwort:


// 12. Was ist der Unterschied zwischen:
/*
type Names =
    `get${Capitalize<"name" | "age">}`;
*/
// und:
/*
type Getters<T> = {
    [K in keyof T as
        `get${Capitalize<string & K>}`
    ]: () => T[K];
};
*/
// Antwort:
// Antwort:


// 13. Kann ein Key-Remapping-Mapped-Type
// zur Runtime tatsächlich neue Properties oder Funktionen
// an einem Objekt erzeugen?
// Warum bzw. warum nicht?
// Antwort:
// Antwort:


// 14. Warum ist Key Remapping besonders nützlich,
// wenn mehrere Typen aus einer zentralen Domain-Struktur
// automatisch abgeleitet werden sollen?
// Antwort:
// Antwort: