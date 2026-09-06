type User = {

    name: string,
    email: string
};

type WorkInfo = {

    company: string,
    yearsExperience: number
};

type Developer = User & WorkInfo & {
    
    framework: string
};

const developer01: Developer = {

    name: "Lukas",
    email: "lukas.werner.2@gmx.de",
    company: "None - Independant",
    yearsExperience: 4,
    framework: "React"
};

const developer02: Developer = {

    name: "Anna",
    email: "anna-dev@gmx.de",
    company: "None - Independant",
    yearsExperience: 2,
    framework: "Angular"
};

/*
const developer03: Developer = {

    name: "Anna",
    email: "anna-dev@gmx.de",
    company: "None - Independant",
    framework: "Angular"
};
*/


const developers: Developer[] = [developer01, developer02];

function printDeveloper(developer: Developer): void {

    console.log(`Dev Name: ${developer.name}, Company: ${developer.company}, Framework: ${developer.framework}`);
}

printDeveloper(developer01);

printDeveloper(developer02);

//printDeveloper(developer03);

// 1. Was bedeutet das & hier?: type Developer = User & WorkInfo;
// Antwort: Es bedeutet, dass der neue Typ Developer die Properties der beiden Typen User und WorkInfo beinhaltet und dass Objekte vom Typen Developer all diese beinhalten muss

// 2. Was ist der grundlegende Unterschied zwischen: A | B und A & B?
// Antwort: Das erste ist ein Union, heißt es kann A oder B gegeben sein, eins davon reicht. Das zweite nennt man Intersection, bei der A und B gegeben sein müssen, damit es keinen Fehler gibt, z.B. muss ein Objekt dann alle Properties von Typ A und B besitzen, 
// beim Union nur die eines Typen
// Antwort: Deine Antwort ist im Kern richtig. Eine kleine Präzisierung wegen unserer vorherigen Diskussion: A | B bedeutet nicht unbedingt „exklusiv entweder A oder B“, sondern: Der Wert muss zu mindestens einem der beiden Typen passen. 
// Bei Objekt-Typen kann ein Objekt also auch zusätzliche passende Properties besitzen wie nur eins der Properties von Type B, wenn sonst alle Properties von Type A enthalten sind also Typ A erfüllt wurde.
// A & B bedeutet dagegen: Der Wert muss die Anforderungen von beiden Typen gleichzeitig erfüllen.
// Also kurz: A | B → A ODER B muss erfüllt sein, A & B → A UND B müssen erfüllt sein

// 3. Was muss ein Objekt erfüllen, wenn sein Typ lautet: User & WorkInfo & DeveloperInfo
// Antwort: Es muss alle Properties der drei Typen beinhalten.

// 4. Was ist die Ähnlichkeit zwischen: interface Developer extends User und type Developer = User & { framework: string; }; ?
// Antwort: Das erste ist ein extended Interface und sagt dass ein Objekt mit interface User desse und auch die Properties von interface User beinhalten muss. Das zweite ist das gleiche nur für Types und heißt Intersection Types
// Antwort: beide drücken in diesem einfachen Fall praktisch dieselbe Idee aus: Der neue Typ enthält die Eigenschaften von User und zusätzliche Eigenschaften. Der Unterschied ist hauptsächlich die jeweilige TypeScript-Technik: interface → extends, type → &
// Wobei & allgemeiner Typen miteinander kombinieren kann.