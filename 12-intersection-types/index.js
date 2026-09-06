"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const developer01 = {
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    company: "None - Independant",
    yearsExperience: 4,
    framework: "React"
};
const developer02 = {
    name: "Anna",
    email: "anna-dev@gmx.de",
    company: "None - Independant",
    yearsExperience: 2,
    framework: "Angular"
};
const developer03 = {
    name: "Anna",
    email: "anna-dev@gmx.de",
    company: "None - Independant",
    framework: "Angular"
};
const developers = [developer01, developer02];
function printDeveloper(developer) {
    console.log(`Dev Name: ${developer.name}, Company: ${developer.company}, Framework: ${developer.framework}`);
}
printDeveloper(developer01);
printDeveloper(developer02);
printDeveloper(developer03);
//# sourceMappingURL=index.js.map