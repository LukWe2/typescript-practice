const defaultUser = {

    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    active: true
};
// mit typeof packen wir in den neuen Type User die Shape und derer Typen vom Objekt defaultUser
// also id, name, email, active als Properties in genau dieser Reihenfolge in den Typen User -> die Shape eines Objekt in einen Typen
type User = typeof defaultUser;

// da user02 jetzt den Type User besitzt, muss dieses Objekt die Properties und Shape von diesem Type erfüllen, welcher ja ursprünglich vom Objekt defaultUser kam
const user02: User = {

    id: 2,
    name: "Anna",
    email: "anna2@gmx.de",
    active: false
};

// Property 'active' is missing in type '{ id: number; name: string; email: string; }' but required in type '{ id: number; name: string; email: string; active: boolean; }'.
/*const user03: User = {

    id: 3,
    name: "Peter",
    email: "peterFalse@gmx,de"
};*/

const technologies: string[] = ["Hello", "Welcome", "Bye"];

type Technologies = typeof technologies;

// hier erstellen wir einen neuen Typen aus dem Typen Technologies, welcher vorher durch typeof technologies den Typen string[] bekommen hat, da typeof die Shape und Properties mit ihren Typen in den neuen Typen übernimmmt
// war in diesem Fall der Typ string[], welcher jetzt eben auch dem Typen Technology zugeordnet wurde
// durch den Aufruf mit den eckigen Klammern holen wir uns jetzt noch den Typen der einzelnen Elemente des Arrays (siehe letztes Kapitel), was nur string ist, somit ist der Typ Technology vom Typ string
type Technology = Technologies[number];

const technologyName: Technology = "TypeScript";

// hier erstellen wir einfach direkt den Typen der einzelnen Elemente des technologies Arrays ohne den Zwischenschritt den Typen des Gesamtarrays zu speichern
type TechnologyDirect = typeof technologies[number];

// ist genauso ein string wie mit dem Zwischenschritt
const technologyNameDirect: TechnologyDirect = "JavaScript";

const settings = {
    darkMode: true,
    language: "de",
    notifications: true
};

// mit typeof settings wird erstmal die Shape und die Properties von settings kopiert also darkMode: boolean, language: string und notifications: boolean (nicht die Werte! sondern die Propertienamen und Typen also die gesamte SHAPE!)
// mit keyof werden dann aber die Propertynamen als string als Literal Union festgelegt, also die Propertynamen sind dann die Typen: "darkMode" | "language" | "notifications"
// es werden hier also nicht die Typen wie boolean | string (| boolean) festgelegt als Typen von SettingKey, sondern die tatsächlichen Propertynamen!
type SettingKey = keyof typeof settings;

let settingKey: SettingKey = "darkMode";

settingKey = "language";

settingKey = "notifications";

// Type '"volume"' is not assignable to type '"darkMode" | "language" | "notifications"'.
//settingKey = "volume";


function add(a: number, b: number): number {
    return a + b;
}

// können mit typeof auch die Shape einer Funktion in einem neuen Type speichern also Argumentvariablennamen mit ihren Typen und Rückgabewertnamen mit Typen
type MathOperation = typeof add;
/*
type MathOperation = ()

    a: number,
    b: number,
) => number;
*/

const multiply: MathOperation = function(a, b){

    return a * b;
}

console.log(multiply(3, 4));


// 1. Was ist der Unterschied zwischen: typeof value in normalem JavaScript-Code und: type X = typeof value;?
// Antwort: In JavaScript wird zur Runtime der Typ geprüft und man kann diesen z.B. mit console.log() ausgeben, in TypeScript passiert das kopieren und zuweisen von Typen mit typeof nur im Typsystem und nicht zur Laufzeit, es würde also nicht ausgegeben werden.
// Antwort: Ergänzung: TypeScript den Typ des Wertes nur zur Compile Time. Es wird nichts ausgegeben und der Typ verschwindet beim Kompilieren.

// 2. Was ergibt ungefähr:
/*
const user = {
    id: 1,
    name: "Lukas"
};

type User = typeof user;
*/
// Antwort: das ergibt type User = { id: number, name: string }. Wichtig zu wissen: wenn noch ein keyof vor dem typeof steht also type User = keyof typeof user, dann wäre type User = "id" | "name" und nicht number | string, da keyof einen Literal Union aus den Propertynamen baut und nicht aus den Typen.
// Antwort: Und dein Zusatz ist ebenfalls richtig: type UserKeys = keyof typeof user; ergibt "id" | "name" nicht number | string.

// 3. Was bedeutet: keyof typeof settings ?
// Antwort: Das bedeutet, dass zuert die Shape von settings übernommen wird also wenn es ein Objekt ist die Propertynamen mit Typen, bei Variablen nur der Typ und bei Arrays der Arraytyp, und daraus dann ein Literal Union gebaut wird. Wichtig: bei Objekten wird dann nicht aus den Typen ein Union,
// sondern aus den Propertynamen also nicht string | number sondern "id" | "name".
// Antwort: Eine kleine Präzisierung: keyof erzeugt allgemein eine Union der Key-Typen. Bei normalen benannten Objektproperties sind das meist String-Literal-Typen.

// 4. Was ergibt: typeof technologies[number] wenn technologies ein string[] ist?
// Antwort: Das ergibt dann string, weil der Aufruf mit den eckigen Klammern den Typen der einzelnen Elemente des Arrays zurückgibt, da alle Elemente in einem Array den gleichen Typen haben (außer mit Union, dann können Elemente auch verschiedene Typen annehmen wie string | number aber dann ist das auch der Typ).
// Antwort: Weil typeof technologies zunächst string[] ist und [number] daraus den Elementtyp ausliest. Nur als Ergänzung: Arrays müssen nicht immer nur einen einzelnen Typ haben. Bei: const values: (string | number)[] = ... wäre const values: (string | number)[] = ... 
// und der Typ entsprechend string | number, nicht nur string!
// also mehrere mögliche Typen für Elemente in einem Array sind durchaus möglich

// 5. Was ist der Unterschied zwischen:
/*
type MathOperation =
    (a: number, b: number) => number;
*/
// und: type MathOperation = typeof add; wenn add genau diese Signatur besitzt?
// Antwort: Der Unterschied ist dass man beim ersten die Signatur selbst festlegt und diese ggf. ändern muss, wenn sich das zugehörige Objekt ändert. Wenn man erst das Objekt und dann mit typeof die Shape (Parameternamen + Typen) in einem Type speichert wird der Typ aus diesem Objekt abgeleitet. 
// Aber Achtung: manchmal soll der Typ das Datenmodell aber auch anlegen und der Objekt diesem folgen und nicht andersherum, deswegen abwägen.
// Antwort: Deine Grundidee stimmt. Nur statt „Objekt“ solltest du hier Funktion sagen. TypeScript übernimmt automatisch die Signatur der bereits existierenden Funktion add. Der Vorteil von typeof add: Ändert sich die Signatur von add, ändert sich auch MathOperation automatisch.
// Der Vorteil der manuellen Definition: Manchmal soll der Typ die Vorgabe sein, und mehrere Funktionen sollen diesem Vertrag folgen
