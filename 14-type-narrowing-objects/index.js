"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const developer01 = {
    name: "Lukas",
    framework: "React",
    programmingLanguages: ["TypeScript", "JavaScript", "C#"]
};
const designer01 = {
    name: "Anna",
    designTool: "Figma",
    yearsExperience: 4
};
function describePerson(person) {
    if ("framework" in person) {
        console.log(`Name: ${person.name}, Framework: ${person.framework}`);
        //console.log(`Design Tool (not correct, just for test): ${person.designTool}`);
    }
    else {
        console.log(`Name: ${person.name}, Design Tool: ${person.designTool}`);
    }
}
;
describePerson(developer01);
describePerson(designer01);
class Car {
    drive() {
        console.log("Car is driving!");
    }
}
;
class Bike {
    ride() {
        console.log("Bike is riding!");
    }
}
;
function moveVehicle(vehicle) {
    if (vehicle instanceof Car) {
        vehicle.drive();
    }
    else {
        vehicle.ride();
    }
}
;
const car01 = new Car();
const bike01 = new Bike();
moveVehicle(car01);
moveVehicle(bike01);
// 1. Was prüft dieser Ausdruck?: "framework" in person
// Antwort: Dieser Ausdruck prüft, ob das Objekt person die Property framework besitzt, und somit von einem bestimmten Typen ist. Mit "in" kann man mit Type Narrowing für Objekte festlegen, was für einen bestimmten Typen passiert, wenn ein Objekt mehrere Typen haben kann
// Antwort: Deine Antwort stimmt: Es wird zur Laufzeit geprüft, ob das Objekt eine Property namens framework besitzt. TypeScript nutzt diese Information anschließend zum Narrowing. Wichtig dabei: in prüft zunächst die Property, nicht direkt „den TypeScript-Typ“. Dass TypeScript daraus auf Developer schließen kann, liegt daran, dass in deiner Union nur Developer diese Property besitzt.
// 2. Warum eignet sich eine Property, die beide Union-Typen besitzen, normalerweise nicht gut zum Narrowing?
// Antwort: Weil gemeinsame Properties nicht beim Unterscheiden helfen, TypeScript kann dann nicht unterscheiden, ob das Objekt von welchem Typen das Objekt ist, was eigentlich der Sinn von Type Narrowing ist
// Antwort: Richtig. Bei: "name" in person könnte person weiterhin: Developer | Designer sein, weil beide name besitzen. Damit wurde nichts sinnvoll eingegrenzt.
// 3. Was prüft: vehicle instanceof Car
// Antwort: Das prüft of vehicle die properties von der Klasse Car besitzt und somit von Typ Car ist
// Antwort: Richtig: Es wird geprüft, ob vehicle eine Instanz von Car ist bzw. ob Car.prototype in seiner Prototype Chain vorkommt. TypeScript kann es dadurch auf Car narrowen.
// 4. Warum kann man ein interface User nicht einfach mit value instanceof User prüfen?
// Antwort: Da ein interface nur im TypeScript-Typsystem und nicht mehr zur Laufzeit existiert da TypeScript nach dem Auführen in JavaScript umgewandelt wird, man sollte mit in prüfen. Eine Klasse hingegen existiert auch im JavaScript-Code zur Laufzeit weshalb man Klassen mit instanceof prüfen kann.
// Antwort: Auch richtig. Ein: interface User { ... } existiert nur während der TypeScript-Typprüfung und verschwindet beim Kompilieren. Zur Laufzeit gibt es also keinen Wert User, gegen den JavaScript mit instanceof prüfen könnte.
// Eine Klasse: class User { ... } existiert dagegen zur Laufzeit weiterhin.
//# sourceMappingURL=index.js.map