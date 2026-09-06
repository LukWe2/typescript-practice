interface Developer {

    name: string,
    age: number,
    framework: string,
    githubUsername?: string,
    yearsExperience?: number
};

const developer01: Developer = {

    name: "Lukas",
    age: 24,
    framework: "React",
    githubUsername: "Lukwe",
    yearsExperience: 4 
};

const developer02: Developer = {

    name: "Lukas",
    age: 24,
    framework: "React",
    yearsExperience: 4   
};

const developer03: Developer = {

    name: "Lukas",
    age: 24,
    framework: "React",
};

/*
const developer04: Developer = {

    name: "Lukas",
    age: 24,
    githubUsername: 123
};
*/


console.log(developer01);
console.log(developer01);
console.log(developer01);

function printGitHubUsername(developer: Developer){

    if (developer.githubUsername){
        console.log(developer.githubUsername);
    } else {
        console.group("No GitHub username");
    }
}

printGitHubUsername(developer01);

printGitHubUsername(developer02);

printGitHubUsername(developer03);


// 1. Was bedeutet das ? hier?: githubUsername?: string;
// Antwort: es bedeutet dass die Variable githubUsername im TypeScript Objekt optional ist, heißt eine Instanz kann diese Variable beinhalten oder auch nicht, und wirft keinen Fehler wie wenn die Variable nicht eine optionale Variable wäre -> ist nicht nur Variable sondern Property
// Antwort: githubUsername ist eine optionale Property. Ein Developer-Objekt darf sie besitzen, muss sie aber nicht besitzen. Wenn sie vorhanden ist, muss ihr Wert ein string sein. Wichtig: Es ist eine Property, nicht eine „optionale Variable“.

// 2. Welchen Typ hat developer.githubUsername effektiv beim Zugriff?
// Antwort: beim Zugriff hat die optionale Variable githubUsername mit developer.githubUsername entweder string oder undefined, also string | undefined, weil githubUsername im Interface als eine optionale Variable deklariert wurde
// Property vorhanden → string, Property nicht vorhanden → undefined

// 3. Warum ist das hier trotzdem falsch?:
/*
interface User {
    age?: number;
}

const user: User = {
    age: "24"
};
*/
//Antwort: Weil ? nur bedeutet: age darf fehlen, es bedeutet nicht: age darf irgendeinen Typ haben, also auch wenn er hier doe Property zugewiesen ist, ist der Typ falsch

// 4. Was ist der Unterschied zwischen: name: string; und name?: string;
// Antwort: bei der ersten Deklaration ist name eine normale Variable und muss somit beim Aufruf/Initialisieren einem Wert udn zwar string zugewiesen werden, beim zweiten nicht da es eine optionale Variable ist
// Außerdem kann bei der zweiten Definition name string und undefined sein, beim ersten nur string vom Typ