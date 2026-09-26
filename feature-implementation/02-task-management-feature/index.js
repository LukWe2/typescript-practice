// hier brauchen wir kein Type Guard für einzelne Objekte und Arrays, weil wir keine externen Daten bekommen die wir erstmal als "unknown" behandeln, die Typen der Daten stehen also schon fest
// const tasks: Task[] = [...] sorgt dafür, dass TypeScript diese lokalen Daten bereits beim Entwickeln/Compilieren gegen Task[] prüft, würden die Tasks dagegen z. B. von: REST API, localStorage, JSON-Datei, Benutzereingabe etc. kommen, könnten wir den tatsächlichen Runtime-Inhalt nicht einfach durch eine TypeScript-Annotation garantieren. Dann wären Runtime-Prüfungen wieder relevant.
// somit müssen Objekte einer der Shapes von TaskToDo | TaskInProgress | TaskDone erfüllen damit sie vom Typ Task[] sind
const tasks = [
    {
        id: 1,
        title: "Login implementieren",
        priority: "high",
        status: "done",
        startedAt: "2026-09-20",
        completedAt: "2026-09-22"
    },
    {
        id: 2,
        title: "Dashboard bauen",
        priority: "high",
        status: "in-progress",
        startedAt: "2026-09-23"
    },
    {
        id: 3,
        title: "Dark Mode hinzufügen",
        priority: "medium",
        status: "todo"
    },
    {
        id: 4,
        title: "README schreiben",
        priority: "low",
        status: "todo"
    }
];
function main() {
    /*
    let count = 0;

    tasks.forEach((task) => {

        count += 1;
    });

    console.log(count);
    */
    // braucht garkeine count Funktion von oben, kann einfach machen:
    console.log("Anzahl aller Tasks:", tasks.length);
    /*
    let countTodoTasks = 0;

    tasks.forEach((task) => {

        if (task.status === "todo"){

            countTodoTasks += 1
        };
    });

    console.log(countTodoTasks);
    */
    // auch für den Count der ToDo-Tasks braucht man keinen Counter, hat ja schon extra getTasksByStatus() implementiert und kann wieder mit .length zugreifen weil es ein Array returned
    const todoTasks = getTasksByStatus(tasks, "todo");
    console.log("Anzahl Todo-Tasks:", todoTasks.length);
    // hat für High-Priority-Tasks auch eine Funktion geschrieben um sie zu holen: getHighPriorityTasks(), kann diese nutzen statt der Schleife
    /*
    tasks.forEach((task) => {

        if (task.priority === "high"){

            console.log(task.title);
        };
    });
    */
    const highPriorityTasks = getHighPriorityTasks(tasks);
    highPriorityTasks.forEach((task) => {
        console.log(task.title);
    });
    //oder:
    /*
    const highPriorityTitles = highPriorityTasks.map((task) => {
        return task.title;
    });

    console.log("High Priority:", highPriorityTitles);
    */
    tasks.forEach((task) => {
        printTaskInfo(task);
    });
    const toDoTask01 = {
        id: 6,
        title: "To Do Task 01",
        priority: "medium",
        status: "todo"
    };
    const newInProgressTask = startTask(toDoTask01, "2026-09-25");
    console.log(newInProgressTask);
    const newDoneTask = completeTask(newInProgressTask, "2026-09-26");
    console.log(newDoneTask);
}
;
main();
// können hier wieder Indexed Access Type benutzen, Task["status"] gibt den Typ von status als Literal Union zurück, hier "todo" | "in-progress" | "done" weil das der Type von status ist, dieser ist zwar nicht explizit gesetzt wie bei priority: "low" | "medium" | "high", ergibt sich aber aus den Werten auf die status gesetzt wird über die Types hinweg
// , wenn wir Task["priority"] gemacht hätten dann wäre der Typ "low" | "medium" | "high", weil typ[property] den Typen zurückgibt, der eben auch ein Literal Union sein kann
function getTasksByStatus(tasks, status) {
    const tasksByStatus = tasks.filter((task) => {
        return task.status === status;
    });
    return tasksByStatus;
}
;
function getHighPriorityTasks(tasks) {
    const tasksHighPriority = tasks.filter((task) => {
        return task.priority === "high";
    });
    return tasksHighPriority;
}
;
function printTaskInfo(task) {
    if (task.status === "todo") {
        console.log(`${task.title} - noch nicht gestartet`);
    }
    else if (task.status === "in-progress") {
        console.log(`${task.title} - gestartet um ${task.startedAt}`);
    }
    else {
        console.log(`${task.title} - abgeschlossen am ${task.completedAt}`);
    }
}
;
function startTask(task, startDate) {
    const newTaskInProgress = {
        ...task,
        status: "in-progress",
        startedAt: startDate
    };
    return newTaskInProgress;
}
;
function completeTask(task, completeDate) {
    const newTaskDone = {
        ...task,
        status: "done",
        completedAt: completeDate
    };
    return newTaskDone;
}
;
export {};
//# sourceMappingURL=index.js.map