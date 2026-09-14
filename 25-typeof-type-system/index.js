"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultUser = {
    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    active: true
};
// da user02 jetzt den Type User besitzt, muss dieses Objekt die Properties und Shape von diesem Type erfüllen, welcher ja ursprünglich vom Objekt defaultUser kam
const user02 = {
    id: 2,
    name: "Anna",
    email: "anna2@gmx.de",
    active: false
};
// Property 'active' is missing in type '{ id: number; name: string; email: string; }' but required in type '{ id: number; name: string; email: string; active: boolean; }'.
const user03 = {
    id: 3,
    name: "Peter",
    email: "peterFalse@gmx,de"
};
const technologies = ["Hello", "Welcome", "Bye"];
const technologyName = "TypeScript";
// ist genauso ein string wie mit dem Zwischenschritt
const technologyNameDirect = "JavaScript";
const settings = {
    darkMode: true,
    language: "de",
    notifications: true
};
let settingKey = "darkMode";
settingKey = "language";
settingKey = "notifications";
// Type '"volume"' is not assignable to type '"darkMode" | "language" | "notifications"'.
settingKey = "volume";
function add(a, b) {
    return a + b;
}
/*
type MathOperation = ()

    a: number,
    b: number,
) => number;
*/
const multiply = function (a, b) {
    return a * b;
};
console.log(multiply(3, 4));
//# sourceMappingURL=index.js.map