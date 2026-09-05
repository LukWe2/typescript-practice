interface User {

    userName: string;
    mailAdress: string;
    age: number;
};

let user: User = {

    userName: "Lukas",
    mailAdress: "lukas.werner.2@gmx.de",
    age: 24
};

console.log(user);


interface Developer extends User{

    framework: string;
    programminglanguages: string[];
}

let developer01: Developer = {

    userName: "Lukas",
    mailAdress: "lukas.werner.2@gmx.de",
    age: 24,
    framework: "React",
    programminglanguages: ["TypeScript", "JavaScript", "Java", "C#"]
}

function printDeveloper(developer: Developer): void{

    console.log(`Developer name: ${developer.userName}, used framework: ${developer.framework}, programming languages: ${developer.programminglanguages}`);
}

printDeveloper(developer01);

let developers: Developer[] = [
    {
        userName: "Lukas",
        mailAdress: "lukas.werner.2@gmx.de",
        age: 24,
        framework: "React",
        programminglanguages: ["TypeScript", "JavaScript", "Java", "C#"]   
    },
    {
        userName: "Anna",
        mailAdress: "anna02@gmx.de",
        age: 22,
        framework: "Angular",
        programminglanguages: ["TypeScript", "Python", "C++"]        
    },
]
    /*
    {
        // Property 'userName' is missing in type '{ mailAdress: string; age: number; framework: string; programminglanguages: string[]; }' but required in type 'Developer'.
        mailAdress: "anonymous@gmx.de",
        age: 28,
        framework: "None",
        programminglanguages: ["TypeScript"] 
    }
];
*/


// 1. Was beschreibt ein Interface in TypeScript?
// Antwort: Ein Interface beschreibt die erwartete Shape eines Objekts. Jede Variable vom definierten Typ/Interface (z.B. User) müssen die definierten Properties mit den angegebenen Typen 
// (z.B. userName: string;, mailAdress: string;, age: number;) besitzen.
// Antwort: Ein Interface beschreibt die erwartete Shape eines Objekts, also welche Properties existieren und welche Typen diese Properties haben.   


// 2. Was bedeutet: interface Developer extends User
// Antwort: Das bedeutet dass das neue Interface Developer alle Variablen besitzen muss und auch deren Typen entsprechen muss, aber selbst noch eigene, weitere definiert.
// Antwort: Noch etwas präziser: Developer übernimmt alle Properties und Anforderungen von User und fügt zusätzlich eigene Properties hinzu.

// 3. Warum kann ich dafür einen Type Alias verwenden: type Status = "loading" | "success" | "error"; aber nicht einfach ein Interface?
// Antwort: Weil ein Interface besonders auf Objektstrukturen ausgerichtet ist und type Status nur eine einzelne Variable darstellt und keine Struktur besitzt.
// Antwort: Ein interface beschreibt hauptsächlich eine Objektstruktur. Ein type kann dagegen auch beliebige andere Typausdrücke benennen, zum Beispiel Union Types, primitive Typen oder Literal Types.
// Also: type Status = "loading" | "success" | "error"; funktioniert, weil type einer Union einen Namen geben kann.
// Ein Interface hat dagegen eine Struktur wie:
/*
interface User {
    name: string;
}
*/ 
// Deshalb kannst du nicht schreiben: interface Status = "loading" | "success" | "error";

// 4. Was ist für diesen einfachen Fall der wesentliche Unterschied zwischen:
/*
type User = {                   interface User {
    name: string;                    name: string;                 
};                    und       } 
?
*/
// Antwort: Das Interface kann extended werden theoretisch, ein Type kann das nicht. Sonst würden die beiden in diesem Fall das gleiche können und heißen.
// Antwort: Für ein einfaches Objekt können beide nahezu dasselbe ausdrücken. Die Unterschiede werden erst bei Erweiterung, Union Types und anderen fortgeschrittenen Fällen wichtiger.
// Es ist nicht richtig, dass ein Interface erweitert werden kann und ein type nicht. Auch Type Aliases können erweitert bzw. kombiniert werden, nur mit anderer Syntax:
/*
type User = {
    name: string;
};

type Developer = User & {
    framework: string;
};
*/
// Das & nennt man Intersection Type und bedeutet hier ungefähr: Developer muss alles aus User und die zusätzlichen Properties besitzen. Das behandeln wir später noch separat.
// Zusammenfassend: Für diesen einfachen Fall gibt es für die normale Verwendung praktisch keinen großen Unterschied: