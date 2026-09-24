// 34 – Type Guards / Type Predicates
// Behandle externe bzw. unbekannte Daten zunächst als unknown und erstelle einen eigenen Type Guard isUser(value: unknown): value is User.
// Prüfe zur Runtime zuerst, ob der Wert wirklich ein nicht-null Objekt ist, und kontrolliere danach sowohl das Vorhandensein aller erforderlichen Properties als auch deren tatsächliche Runtime-Typen.
// Teste den Guard mit gültigen User-Daten, ungültigen Objekten und komplett anderen unknown-Werten; greife erst nach erfolgreichem Guard sicher auf User-Properties zu.
// Erstelle anschließend isUserArray(value: unknown): value is User[], das zuerst Array.isArray(...) verwendet und danach mit every(isUser) jedes Element validiert.
// Erstelle zusätzlich einen eigenen Type Predicate für eine Union wie Developer | Designer und narrowe damit gezielt auf Developer.
// Zeige außerdem bewusst mit einem unsicheren Guard wie isUserUnsafe(), dass TypeScript einem selbst geschriebenen value is User vertraut, obwohl die Implementierung theoretisch falsch sein kann.
// Verstehe dadurch den Unterschied zwischen einem echten Runtime-Check per Type Guard und einer bloßen Type Assertion mit as, die keinerlei Daten validiert.


// in letztem Konzept gelernt, dass bei externen Daten nicht garantieren können zur Laufzeit, dass Daten die z.B. von API kommen wirklich von dem Typ sind den wir wollen, auch wenn wir einen Typen definieren
// haben also z.B. 
/*
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};
*/
// als Typ definiert den die externen Daten haben sollen
// Problem: Typprüfung existiert nur beim Kompilieren, nicht zur Runtime, aber Daten von API kommen nach Starten des Programms also zur Runtime
// deswegen bringt es nichts data als User festzulegen im Typraum also vor dem Kompilieren, in der TypeScript nur existiert: const data: User = await response.json();
// stattdessen machen wir data unknown: const data: unknown = await response.json();
// das bedeutet, dass wir noch nicht sicher sind, welcher Typ die Daten sind also welche Properties sie haben und ob diese den richtigen Typen haben
// kann wenn data vom Typ unknown ist nicht auf deren Properties zugreifen, also z.B. data.name geht nicht, und auch typspezifische Methoden wie .toUpperCase() für Strings gehen nicht solange nicht sicher ist dass es wirklich ein String ist
// um sicherzustellen zur Runtime welcher Typ data ist, macht man einen Typeguard und Narrowing
// für primitive Typen wie string ist es einfach: vorher prüfen if (typeof value === "string"){ console.log(value.toUpperCase()); }
// bei Objekten braucht man einen eigenen Typeguard:
/*
function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    return (
        "id" in value &&
        typeof value.id === "number" &&
        "name" in value &&
        typeof value.name === "string"
    );
}
*/
// damit prüfen wir, ob der Wert der von der API kommt wirklich ein User ist
// als erstes prüfen wir, ob value überhaupt ein Object ist und ob es nicht null ist -> if (typeof value !== "object" || value === null)
// dann noch ob die Properties id und name in übergebenem Objekt value drin ist -> "id" in value, "name" in value
// und zusätzlich noch, ob Property id vom Typ number ist und ob Property name vom Typ string ist -> typeof value.id === "number", typeof value.name === "string"
// und hier prüfen wir logischerweise nur ob das übergebene Objekt dies zwei Properties id und number hat (plus Typen), wenn Objekt noch mehr hat muss man diese noch aufführen
// wenn wir nur zwei Properties checken aber fünf in Objekt haben, dann wird die Funktion trotzdem true wenn wir nur zwei checken, was zu Fehlern führen kann wenn von den anderen drei welche nicht passen
// aber wir im weiteren Code damit arbeiten

// neu ist das: value is User, das ist ein Type Predicate
// bedeutet für TypeScript: wenn diese Funktion true zurückgibt, darf value anschließend IM IF STATEMENT (nur darin!) als User behandelt werden
// wird also als Rückgabewert definiert von der Funktion, wird dann dem Argument als Typ zugewiesen: function isUser(value: unknown): value is User {...}
// ABER WICHTIG: nur in diesem if-Statement also innerhalb des if ist data dann vom Typ User, es wird nicht ab dort permanent data als Typ User zugewiesen
// Beispiel:
/*
const data: unknown = {
    id: 1,
    name: "Lukas"
};

if (isUser(data)) {
    console.log(data.name);
}
*/
// innerhalb des if also in dieser Zeile ist data vom Typ User: console.log(data.name);
// sonst also vorher und nachher nicht

// Das ist auch ein Typeguard:
/* 
function isDeveloper(person: Developer | Designer): person is Developer {

    return "framework" in person;
}
*/
// Auch hier als Rückgabewert kein einzelner Wert sondern person is Developer, also dass der übergebene Wert als Typ Developer benutzt werden kann im if-Statement wenn diese Typeguard-Funktion true zurückgibt
// Wird dann so verwendet:
/*
function printPerson(person: Developer | Designer): void {

    if (isDeveloper(person)) {
         console.log(person.framework);
    } else {
    
        console.log(person.designTool);
    }
}
*/
// hier prüfen wir jetzt erst ob die als Argument in diese Funktion übergebene person ein Developer ist mit unserer Typeguard-Funktion, wenn ja ist im if-Block person vom Typ Developer und die Property framework
// kann benutzt werden, wenn der Typeguard false zurückgibt inferred TypeScript dass person vom Typ Designer sein muss, weil wir oben im Argument festgelegt haben, dass person nur einer dieser zwei Typen sein darf
// dann können wir auf die designTool Property zugreifen


type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
};

// hier unsere Typeguard-Funktion die checkt ob Properties vorhanden sind mit "in value" und ob Properties richtigen Typen haben mit typeof value.x === "y"
// value is User als Rückgabewert sagt, wenn die gesamte Funktion isUser true zurückgibt (also alle Checks im return true sind und vorher der if-Block nicht false zurückgibt), dann darf value als User gesehen werden
// (aber nur innerhalb des if-Blocks mit dem Check, nicht vorher oder nachher also außerhalb, diese "Zuordnung" zum User Typ ist nur innerhalb der Bedingung gültig!)
function isUser(value: unknown): value is User {

    if (typeof value !== "object" || value === null){
        
        return false;
    }

    return (

        "id" in value &&
        typeof value.id === "number" &&

        "name" in value && 
        typeof value.name === "string" &&

        "email" in value &&
        typeof value.email === "string" &&

        "active" in value &&
        typeof value.email === "boolean"
    )
};

// Erstellen von Objekten vom Typ unknown um Typeguard-Funktion zu testen (solche Daten könnten von API zurückgegeben werden solche Objekte)
const value01: unknown = {

    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    active: true
}

// ist Objekt und hat alle Properties aber Property id hat falschen Typen, string statt number
const value02: unknown = {

    id: "2",
    name: "Anna",
    email: "anna2@gmx.de",
    active: false
}

// ist kein Objekt
const value03: unknown = "I am not an object!";

if (isUser(value01)){

    console.log(value01.name);
};

if (isUser(value02)){

    console.log(value02.id);
};

if (isUser(value03)){

    console.log(value03.active);
};


function isUserArray(value: unknown): value is User[] {

    if (Array.isArray(value) && value.every(isUser)){

        return true;
    }

    return false;

    // oder kürzer einfach nur ; return Array.isArray(value) && value.every(isUser
}

const validUsers: unknown = [
    {
        id: 1,
        name: "Lukas",
        email: "lukas@example.com",
        active: true
    },
    {
        id: 2,
        name: "Anna",
        email: "anna@example.com",
        active: false
    }
];

const invalidUsers: unknown = [
    {
        id: "1",
        name: "Lukas",
        email: "lukas@example.com",
        active: true
    },
    {
        id: 2,
        name: "Anna",
        email: "anna@example.com",
        active: false
    }
];

if (isUserArray(validUsers)){

    console.log(validUsers);
}

if (isUserArray(invalidUsers)){

    console.log(invalidUsers);
}



const data: unknown = {
    id: 1,
    name: "Lukas",
    email: "lukas@example.com",
    active: true
};

// vor dem Guard geht nicht:
// Fehler: 'data' is of type 'unknown'. -> kann wenn Objekt unknown nicht auf Properties zugreifen
//data.name;

// mit bzw. innerhalb des Guards funktioniert es:
if (isUser(data)) {
    console.log(data.name);
};



type Developer = {
    name: string;
    framework: string;
};

type Designer = {
    name: string;
    designTool: string;
};

// hier Typeguard für Union Type für Argument, also wenn übergebenes Objekt als Argument mehr als ein Typ annehmen darf, nicht wie bei isUser() bei der Objekt erst unknown ist und dann nur ein Typ annehmen kann
function isDeveloper(person: Developer | Designer): person is Developer {

    return "framework" in person;
}

const dev01 = {

    name: "Lukas",
    framework: "React"
};

const designer01 = {

    name: "Anna",
    designTool: "Figma"
};

function printTechnologyOfPerson(person: Developer | Designer): void {

    if (isDeveloper(person)){

        console.log(`Developers name and framework: ${person.name}, ${person.framework}`);
    // beim else inferred TypeScript dass person von Typ Designer sein muss, weil person nur diese zwei Typen sein kann laut Union Type für Argument person
    } else {

        console.log(`Designers name and framework: ${person.name}, ${person.designTool}`);
    }
};

printTechnologyOfPerson(dev01);
printTechnologyOfPerson(designer01);


// Achtung: das ist ein falscher Typeguard, der zwar eine Prüfung durchführt aber für alles true zurückgibt
// zeigt: Type Predicate also diese Typeguard Funktion muss ebenfalls richtig implementiert sein um Zweck zu erfüllen:

function isUserUnsafe(value: unknown): value is User {
    return true;
}

const dataWrong: unknown = 42;

if (isUserUnsafe(dataWrong)){

    console.log("This should not be printed, 42 is not a User but is treated as one!");
}



// 1. Was ist ein Type Guard in TypeScript?
// Antwort: Ein Type Guard ist entweder ein Key Word oder eine selbst implementierte Funktion, die checkt ob ein Wert also eine Variable, Objekt, Array etc. von einem bestimmten Typ ist, um mit dieser sicher
// weiterarbeiten zu können. Wichtig: Bei if-Statements gilt die Prüfung und somit auch der von TypeScript zugewiesene Typ für diesen Wert nur in dem if-Block, danach oder davor also außerhalb ist er wieder z.B. unkown oder any, 
// falls nicht explizit ein Typ wie string, User etc. zugewiesen wurde wie es bei zurückgegebenen API Daten z.B. der Fall ist

// Antwort: Im Kern richtig. Ein Type Guard ist eine Runtime-Prüfung bzw. Bedingung, aus deren Ergebnis TypeScript den Typ eines Wertes enger bestimmen kann. Beispiele sind typeof, in, instanceof, Array.isArray() oder 
// eine selbst definierte Funktion mit einem Type Predicate wie value is User.
// Wichtig: Das Narrowing gilt dort, wo TypeScript durch den Kontrollfluss sicher weiß, dass die Bedingung erfüllt ist. Das ist oft der if-Block, kann aber z.B. nach einem frühen return/throw auch danach weiter gelten. 
// Der ursprüngliche Typ wird dabei nicht dauerhaft verändert.


// 2. Was bedeutet der Rückgabetyp: value is User ?
// Antwort: Das bedeutet, dass wenn diese Typeguard Funktion true zurückgibt, dass value dann als User behandelt werden kann innerhalb des benutzten Scopes also z.B. ein if-Statement.

// Antwort: Genau richtig. value is User ist ein Type Predicate. Wenn die Funktion true zurückgibt, darf TypeScript value im entsprechend genarrowten Kontrollfluss als User behandeln.


// 3. Warum reicht bei externen Daten oft nicht nur: "id" in value ?
// Antwort: Weil das nur prüft, ob die Property vorhanden ist im Objekt, nicht aber, ob der Typ dieser property auch stimmt. Man müsste zusätzlich noch (typeof object.id === "string") z.B. durchführen.

// Antwort: Genau richtig. "id" in value prüft nur, ob die Property existiert. Zusätzlich muss geprüft werden, ob ihr Wert den erwarteten Typ besitzt, z.B. typeof value.id === "number", wenn User.id als number definiert ist.


// 4. Was ist nach folgendem Check innerhalb des if-Blocks der Typ von data?
/*
const data: unknown = ...;

if (isUser(data)) {
    // Typ von data?
}
*/
// Antwort: der Typ von data wäre User, da wir mit der Type Guard Funktion isUser prüfen, ob data vom Typ User ist also ob es die Properties vom Typ User enthält und ob die Typen derer auch passen, somit würde data
// die Shape vom Typ User erfüllen und NUR innerhalb des if-Blocks wird dann data als vom Typ User behandelt, der Typ wird nicht permanent dem Objekt zugewiesen

// Antwort: Genau richtig. Vor dem Check ist data unknown, innerhalb des erfolgreichen Narrowings ist data User. Die Runtime-Daten selbst werden dadurch nicht verändert; nur TypeScripts statisches Wissen über data wird präziser.


// 5. Was macht Array.isArray(value) innerhalb eines Array-Type-Guards?
// Antwort: Dieser Check prüft, ob das übergebene Objekt value überhaupt ein Array ist, returned true wenn ja, false wenn es von einem anderen Typ ist.

// Antwort: Richtig. Array.isArray(value) prüft zur Runtime, ob value tatsächlich ein Array ist. Bei true kann TypeScript value anschließend als Array behandeln.


// 6. Was macht value.every(isUser) bei einem Array?
// Antwort: every() geht durch alle Elemente eines Arrays und gibt NUR true zurück wenn ALLE Elemente also jedes die als Argument übergebene Bedingung erfüllt

// Antwort: Genau richtig. every(isUser) ruft isUser für jedes Array-Element auf und liefert nur dann true, wenn jedes einzelne Element den Check besteht.


// 7. Warum kann man isUser(...) auch für API-Daten verwenden, obwohl der Type User selbst zur Runtime nicht mehr existiert?
// Antwort: Weiß ich nicht, schätze weil isUser ja nur die Shape (alle Properties da + alle Types davon richtig?) prüft und diese die Shape vom Typ User erfüllen muss, egal ob User noch existiert oder nicht kann man die Shapes der beiden noch vergleichen.

// Antwort: Deine Vermutung geht in die richtige Richtung. isUser() prüft zur Runtime keine TypeScript-Definition namens User, sondern echte JavaScript-Eigenschaften und Werte: 
// Existiert id? Ist id eine number? Existiert name? Ist name ein string? Diese Runtime-Prüfungen existieren weiterhin im JavaScript. Der Rückgabetyp value is User verbindet anschließend das true-Ergebnis 
// dieser echten Prüfungen mit dem nur zur Compile Time existierenden TypeScript-Typ User.


// 8. Was ist der Unterschied zwischen einem Type Guard wie isUser(data) und einer Type Assertion wie data as User?
// Antwort: Ein Type Guard ist ein echte Prüfung zur Runtime die Fehler wirft und eine Type Assertion mit as ist nur eine Zuweisung, sagt nur dass data als User behandelt werden soll während ein Type Guard für
// den if-Block sicherstellt, dass es sich um ein Objekt vom Typ User handelt, was für API-Daten sicherer ist also solch eine Runtime-Validierung

// Antwort: Fast richtig. Ein Type Guard führt tatsächlich Runtime-Prüfungen aus, muss aber nicht selbst einen Fehler werfen; isUser(data) gibt typischerweise nur true oder false zurück. 
// Eine Type Assertion wie data as User führt überhaupt keine Runtime-Prüfung durch und ist auch keine Zuweisung: Sie sagt nur dem TypeScript-Compiler "Behandle diesen Wert als User". 
// Für unbekannte externe Daten ist ein korrekt implementierter Type Guard deshalb deutlich sicherer.


// 9. Warum ist diese Funktion gefährlich?
/*
function isUser(value: unknown): value is User {
    return true;
}
*/
// Antwort: Weil TypeScript einer Typeguard Funktion vertraut und dann davon ausgeht dass value ein User ist, aber dieser Typeguard behandelt alles was geprüft wird als User, auch wenn value eine number wie 42 wäre.

// Antwort: Genau richtig. TypeScript vertraut dem Type Predicate. Wenn die Implementierung immer true zurückgibt, kann TypeScript fälschlicherweise beliebige Runtime-Werte als User behandeln und dadurch echte Laufzeitfehler ermöglichen.


// 10. Was ist der Unterschied zwischen isUser(...) und isUserArray(...)?
// Antwort: isUser() prüft nur für einen User ob es vom Typ User ist also deren Properties und deren Typen passen also die Shape, isUserArray prüft für jedes Element im Array, 
// ob isUser() für dieses einzelne Element also User Objekt im Array von User Objekten true ist

// Antwort: Genau richtig. isUser prüft einen einzelnen unbekannten Wert auf die User-Shape. isUserArray prüft zuerst, ob der Wert überhaupt ein Array ist, und anschließend mit every(isUser), ob jedes einzelne Element ein gültiger User ist.