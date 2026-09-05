let projectId: number | string = 1;

console.log(projectId);

projectId = "2";

console.log(projectId);


function printUserId(user_id: string | number): void{

    console.log(user_id);
}

printUserId(3);
printUserId("4");

let projectData: (string | number)[] = [
    "TypeScript project",
    4,
    "React",
    3
];

projectData.push("Hello");
projectData.push(10);

//projectData.push(true);
//projectId = false;


// 1. Was bedeutet das | hier?: let id: string | number;
// Antwort: Das bedeutet, dass die Variable id sowohl den Typ string als auch number annehmen kann

// 2. Warum funktioniert das hier nicht?:
/*
let id = 10;

id = "abc";
*/
// Antwort: Das funktioniert nicht, weil durch Type Inference TypeScript den Typen der Variable id schon auf number gesetzt hat und somit ein string nicht zuweisbar ist

// 3. Was bedeutet:
/*
(string | number)[]
*/
// Antwort: Das legt ein Array fest, dessen Elemente sowohl Strings oder Numbers sein dürfen. Nicht „ein String-Array oder ein Number-Array“, sondern ein gemeinsames Array mit beiden erlaubten Elementtypen.