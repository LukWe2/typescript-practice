let programmingLanguages: string[] = ["TypeScript", "JavaScript", "Java", "Python"];

let experienceDevs: number[] = [2, 4, 5, 1, 12];

let publishedProjects = [true, false, false, true, true];

programmingLanguages.push("C#");

experienceDevs.push(6);

publishedProjects.push(false);


console.log(`${programmingLanguages}, ${experienceDevs}, ${publishedProjects}`);
console.log(programmingLanguages, experienceDevs, publishedProjects);


// 1. Was bedeutet: string[]
// Antwort: ist ein Array aus String Objekten
// Antwort: string[] ist ein Array, dessen Elemente vom Typ string sind -> Denn string bezeichnet in TypeScript hier den primitiven String-Typ und nicht speziell „String-Objekte“

// 2. Welchen Typ erkennt TypeScript hier automatisch?: let salaries = [50000, 60000, 70000];
// Antwort: TypeScript erkennt durch Type Inference automatisch den number[] Typ

/*
Beispiel für ein typisiertes Array aus Objekten in TypeScript

let users: {
    name: string;
    age: number;
}[] = [
    {
        name: "Lukas",
        age: 24
    },
    {
        name: "Anna",
        age: 27
    }
];
*/