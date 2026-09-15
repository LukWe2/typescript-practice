let userKey;
// geht weil User eine Property namens id hat, kann sie jetzt als String zuweisen, weil keyof User deren Properties als Literal Union also "id" | "name" | "email" | "active" festlegt und "id" darunter ist, deswegen ist die Zuweisung valide
userKey = "id";
// auch das geht weil Type User eine Property namens name hat und hat diese mit Typ Userkey (was keyof von User ist), die Properties als String jetzt als gültige Werte
// ist für Finden von Wert einer bestimmten Property innerhalb eines Objekts nützlich, sonst kann man als Key jeden beliebigen String angeben wie "banana", so gehen aber nur als Keys strings die auch als Property im Objekt vorhanden sind
// key darf also nur ein Property-Name sein, der wirklich in User existiert, sonst würde man einfach key: string nehmen, aber da hier jeder String (und nicht nur valide keys was eben die Property Namen sind) eingesetzt werden kann, kann es zu Fehlern kommen,
// die durch keyof nicht mehr passieren, weil nur valide Keys nämlich die Property Namen möglich sind
// wie in einem Objekt was Typ User benutzt "id", "email" und "active"
userKey = "name";
//userKey = "age";
const user01 = {
    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    active: true
};
const user02 = {
    id: 2,
    name: "Anna",
    email: "anna2@gmx.de",
    active: false
};
// zweites Argument heißt: key muss ein String einer Property von User sein also "id", "name", "email", "active"
// Achtung: haben noch keinen konkreten Rückgabetypen ausgewählt, das kommt im nächsten Konzept: Indexed Access Types – Property-Typen mit T[K] auslesen
function printUserProperty(user, key) {
    console.log(user[key]);
}
printUserProperty(user01, "name");
// Achtung: hier mit user02 aufgerufen, holt sich dann Wert/Value der Email mittels "email"-Key was vorher aus den Properties mit keyof festgelegt wurde (die Properites als Key zu den Values)
printUserProperty(user02, "email");
printUserProperty(user01, "active");
// Achtung: bei Generics heißt extends dass es ein Generic Constraint ist, heißt K muss einer der Typen von dem was nach extends steht sein, und da hier keyof T steht, würde es wenn T gleich User ist, eines der drei
// Properties als String sein also "id", "name", "email", "active", keyof T = "id" | "name" |"email" | "active" -> function getProperty<User, "id" | "name" |"email" | "active">(object: User, key: "id" | "name" |"email" | "active")
// Achtung: haben noch keinen konkreten Rückgabetypen ausgewählt, das kommt im nächsten Konzept: Indexed Access Types – Property-Typen mit T[K] auslesen
function getProperty(object, key) {
    return object[key];
}
;
console.log(getProperty(user01, "name"));
console.log(getProperty(user02, "email"));
// zeigt dass aufgrund der Generic Function es nicht nur mit User sondern auch anderen Typen geht wie einem Project:
const project = {
    title: "TypeScript Practice",
    framework: "React",
    released: true
};
console.log(getProperty(project, "title"));
export {};
// Argument of type '"email"' is not assignable to parameter of type '"title" | "framework" | "released"'.
// jetzt ist K bzw. die Keys die Properties von project als keys, also function getProperty<project (nicht Typ aber TypeScript inferriert die Properties aus dem Objekt project), "title" | "framework" |"released">(object: User, key: "title" | "framework" |"released")
//getProperty(project, "email");
// 1. Was ergibt: keyof User, wenn User ist:
/*
type User = {
    id: number;
    name: string;
    active: boolean;
};
*/
// Antwort: keyof User ergibt die Property Namen als Strings in einem Literal Union also nur diese Strings sind valide keys, was praktisch ist denn sonst könnte jeder String versucht werden als Key benutzt zu werden, was aber zu Fehlern führt, TypeScript muss wissen, ob key wirklich gültig ist.
// Also eine Union aus den erlaubten Property-Namen.
//2. Bezieht sich keyof auf die Property-Namen oder deren Werte?
// Antwort: keyof bezieht sich nur auf die Property-Namen, nicht auf deren Werte. Das macht auch Sinn, weil ein Key zu einem Wert zeigt und nicht andersherum.
// 3. Was bedeutet: K extends keyof T ?
// Antwort: Das bedeutet, dass K ein beliebiger Typ sein kann, aber er muss mindestens eine der Properties von keyof T haben. 
// ACHTUNG FALSCH WEIL K KEIN OBJEKT IST: (Also muss K als Properties die Property Namen von T als Property haben. Für den User Type im Beispiel müsste K also die Property "id", "name", "email" und "active" haben.) Da dies Strings sind muss auch K ein String sein, es würde kein Sinn machen wenn K eine number ist aber diese strings als Property haben müsste.
// Antwort: Hier ist dein Verständnis noch nicht ganz richtig. K extends keyof T bedeutet nicht: K muss die Properties von keyof T besitzen, sondern K muss einer der gültigen Keys von T sein. Mit dem Type User von oben ist keyof User gleich "id" | "name" | "email" | "active"
// Also darf K zum Beispiel sein: K = "name" oder K = "id" oder K = "active", K ist also ein Key, NICHT ein Objekt mit allen Keys.
// 4. Was ist bei: getProperty(user, "name"); ungefähr T und was ist K?
// Antwort: T ist wahrscheinlich der User Typ der im Beispiel angelegt wrude also:
/*
type User = {

id: number,
name: string,
email: string,
active: boolean
};
*/
// und K wäre dann EINE dieser Propertys als Strings, die vorher mit keyof T (bzw. User) festgelegt wurden. In diesem Beispiel wären die Keys also K dann entweder "id", "name", "email" oder "active", da es ein Union erstellt von "id" | "name" | "email" | "active".
// Aber K ist nicht die komplette Union aller User-Keys. Das ist später sehr wichtig, weil TypeScript dadurch sogar herausfinden kann, welchen Typ die konkrete Property besitzt.
// 5. Warum ist: getProperty(user, "age"); nicht erlaubt, wenn age nicht im User-Typ existiert?
// Antwort: Weil vorher mit keyof die Properties vom User Type als Keys festgelegt wurden und age keine Property von User war.
//# sourceMappingURL=index.js.map