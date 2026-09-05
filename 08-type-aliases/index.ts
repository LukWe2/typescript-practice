type ProjectStatus = "planning" | "development" | "released";

type Project = {

    projectName: string,
    amountUser: number,
    usedFramework: string
    projectStatus: ProjectStatus
}

let project1: Project = {

    projectName: "TypeScript Project 1",
    amountUser: 30,
    usedFramework: "React",
    projectStatus: "development"
}

let project2: Project = {

    projectName: "TypeScript Project 2",
    amountUser: 5,
    usedFramework: "Angular",
    projectStatus: "planning"
}

/*
let project3: Project = {

    projectName: "TypeScript Project 3",
    amountUser: 0,
    usedFramework: "None",
    projectStatus: "Cancelled"   
}
    */

let projects: Project[] = [

    project1,
    project2
]

console.log(projects);

console.log(project1.projectName);

console.log(project2.projectName);

function printProject(project: Project): void{

    console.log(`Project name: ${project.projectName}, Project status: ${project.projectStatus}`);
}

printProject(project1);

//printProject(project3);


// 1. Was macht: type UserId = string | number; und entsteht dadurch eine neue Variable?
// Antwort: Das erstellt einen type in TypeScript also einen Namen für einen eigenen Typ, der bestimmte Variablennamen und Typen festlegt. Es wird keine neue Variable dadurch erstellt, ein type wird lediglich als Typ einer Variable aufgerufen
// Antwort: Eine kleine Präzisierung: Ein Type Alias legt auch nicht automatisch Variablennamen fest. Er gibt lediglich einer Typdefinition einen Namen.
// Also: type UserId = string | number; bedeutet: UserId ist ab jetzt ein Name für den Typ string | number. UserId selbst ist hier keine Variable sondern ein Type: let userId: UserId = 42; oder let adminId: UserId = "A-123";

// 2. Was bedeutet: let projects: Project[];
// Antwort: Das bedeutet dass projects ein Array ist, das den Typen Project entsprechen muss. Project ist ein Typ, der bestimmte Variablen und deren Typen für Variablen in einem Array festlegt.

// 3. Was ist der Vorteil davon, diesen Typ nicht überall erneut hinzuschreiben, sondern einmal als type Project zu definieren?:
/*
{
    name: string;
    users: number;
}
*/
// Antwort: Der Vorteil ist dass man eben nicht bei jeder Variablen die diese Variablen und Typen haben soll diese Deklaration neu hinschreiben muss, sondern dann als type Product aufrufen kann.
// Antwort: Das bringt vor allem Wiederverwendbarkeit, weniger Duplikation und eine zentrale Stelle für Änderungen.