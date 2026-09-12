"use strict";
// Mit Generic Constraints also extends prüft man nur bzw. legt fest dass ein anderer Typ (der Generic im Objekt/Funktion wie T) dessen Properties sicher beistzen muss, sonst Fehler
// man fügt keine extra Property einem Objekt hinzu, man prüft nur
Object.defineProperty(exports, "__esModule", { value: true });
function getId(item) {
    return item.id;
}
const user01 = {
    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de"
};
const project01 = {
    id: 1,
    title: "TypeScript Generics project",
    framework: "React"
};
// funktioniert, weil user01 und project01 eine id Property haben, wie mit T extends Identifiable festgelegt muss der Typ der für T eingesetzt wird diese Property besitzen also User extends Idenfitifable und Project extends Identifiable
getId(user01);
getId(project01);
function returnItem(item) {
    return item;
}
;
const user02 = returnItem({ id: 2, name: "Anna", email: "anna2@gmx.de" });
const user02Name = user02.name;
console.log(user02Name);
function printLength(value) {
    console.log(value.length);
}
printLength("TypeScript");
printLength([1, 2, 3]);
// geht nicht, weil Variablen vom Typ number also die allgemeine Variable (also nicht von uns erstellt sondern Datentyp) keine length Property hat, string und ein Array schon deswegen geht das obendrüber
printLength(42);
const stringStore = {
    items: [
        {
            id: 1,
            name: "Lukas",
            email: "lukas.werner.2@gmx.de"
        },
        {
            id: 2,
            name: "Anna",
            email: "anna2@gmx.de"
        },
        {
            name: "Jordan",
            email: "jordan3@gmx.de"
        }
    ],
    selectedItem: null,
};
//# sourceMappingURL=index.js.map