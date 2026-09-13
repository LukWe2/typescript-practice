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
// funktioniert, weil user01 und project01 eine id Property haben, wie mit T extends Identifiable festgelegt, muss der Typ der für T eingesetzt wird diese Property besitzen und User und Project erfüllt das (explizit würde da stehen User extends Identifiable bzw. Project extends Identifiable was erfüllt wird durch die id Property)
// Achtung: hier im Zusammenhang mit Generics heißt extends nicht bei Interfaces dass Properties erweitert werden sondern dass sei geprüft werden!
getId(user01);
getId(project01);
// heißt: das Objekt was mit returnItem(Objekt) aufgerufen wird, ist dann von Typ T aber muss Identifiable erfüllen also eine property id: number haben, was unten bei user02 der Fall ist, hier erstellen wir direkt ein Objekt was von der Shape wie Typ User ist, ist aber explizit nicht mit Type User typisiert sondern hat nur Shape
// hätten auch das Objekt user02 als Typ User definieren können: const user02: User = {id: 2, name: "Anna", email: "anna2@gmx.de"} und dann returnItem(user02)
function returnItem(item) {
    return item;
}
;
// zeigt einen wichtigen Vorteil von Generics: T wird nicht einfach zu Identifiable. TypeScript inferiert die komplette Shape: { id: number; name: string; email: string;}
// Der Constraint sagt nur: Diese Shape muss mindestens id: number enthalten. Deshalb bleibt name erhalten.
const user02 = returnItem({ id: 2, name: "Anna", email: "anna2@gmx.de" });
const user02Name = user02.name;
console.log(user02Name);
function printLength(value) {
    console.log(value.length);
}
printLength("TypeScript");
printLength([1, 2, 3]);
const userStore = {
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
        /*
        {
            name: "Jordan",
            email: "jordan3@gmx.de"
        }
            */
    ],
    selectedItem: null,
};
// 1. Was bedeutet: <T extends { id: number }> ?
// Antwort: Es bedeutet, dass der Generic gilt also die Varibale, das Objekt, Array oder die Function kann generell jeden Typen annehmen, da hier jedoch extends und dann die Property id vom Typ number festgelegt wird, muss worauf dieser Typ angewandt wird neben T die Property id mit Typ number enthalten, sonst gibt es einen Fehler.
// Antwort: Richtig. Präziser: T ist ein generischer Typ, aber er ist eingeschränkt: Jeder konkrete Typ, der für T eingesetzt wird, muss mindestens eine Property id: number besitzen. Also nicht „jeder Typ ist erlaubt“, sondern nur Typen, die diese Mindestanforderung erfüllen.
//2. Bedeutet der Constraint, dass T nur aus id: number bestehen darf?
// Antwort: Nein, es bedeutet nur, dass worauf der Generic angewandt wird neben, dass dieser vom Typ T sein muss, auch die Property id: number enthalten muss
// Antwort: Nein, genau richtig. T darf beliebig viele weitere Properties besitzen: {  id: number; name: string; email: string; }
//3. Warum kann TypeScript innerhalb dieser Funktion sicher auf item.id zugreifen?
/*
function getId<T extends Identifiable>(item: T): number {
    return item.id;
}
*/
// Antwort: Weil mit extends Identifiable festgelegt wird, dass das Objekt was mit der Funktion aufgerufen wird, die Properties vom Typ Identifiable beinhalten muss, und dieser Typ schreibt eine Property von id vom Typ number vor und dies muss erfüllt werden vom aufgerufenen Objekt.
// Antwort: Richtig. Durch: T extends Identifiable garantiert TypeScript, dass jedes mögliche T mindestens die Shape von Identifiable erfüllt. Wenn: 
/*
type Identifiable = {
    id: number;
};
*/
// dann existiert item.id garantiert.
// 4. Warum bleibt bei function returnItem<T extends Identifiable>(item: T): T die komplette konkrete Shape von T erhalten?
// Antwort: Sie bleibt erhalten, da TypeScript aufgrund des Typs, der mit T hier definiert wird für das aufgerufenen Objekt in item bzw. T, die Properties und somit die Shape von T inferieren also erkennen kann. Sie gibt dann eben T also die gesamten Properties zurück und nicht nur Identifiable z.B., 
// wie es ohne Generic der Fall wäre, wenn man Identifiable als Rückgabetyp angibt alleine.
// Antwort: Sehr gut erklärt. Der entscheidende Punkt ist: (item: T): T. Die Funktion gibt denselben konkreten Typ T zurück, den TypeScript beim Aufruf inferiert hat. Also:
/*
returnItem({
    id: 1,
    name: "Anna",
    email: "..."
});
*/
// führt ungefähr zu:
/*
T = {
    id: number;
    name: string;
    email: string;
}
*/
// Deshalb bleiben name und email im Rückgabetyp bekannt. Der Constraint prüft nur die Mindestanforderung.
// 5. Warum funktionieren sowohl string als auch Arrays bei: <T extends { length: number }> ?
// Antwort: Weil der Datentyp string als auch ein Array die property length haben automatisch "von Haus aus". Bei number würde es nicht funktionieren, weil dieser primitive Datentyp eben diese Property length nicht hat
// Antwort: Auch richtig. Beide besitzen strukturell: length: number Deshalb erfüllen sie: T extends { length: number }. Ein number dagegen nicht.
//# sourceMappingURL=index.js.map