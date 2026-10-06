function fetchUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "Lukas",
                    role: "admin",
                    active: true
                },
                {
                    id: 2,
                    name: "Anna",
                    role: "developer",
                    active: true
                },
                {
                    id: 3,
                    name: "Peter",
                    role: "viewer",
                    active: false
                }
            ]);
        }, 500);
    });
}
;
function fetchProjects() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Mobile App",
                    status: "active",
                    memberIds: [1, 2]
                },
                {
                    id: 2,
                    title: "Website Redesign",
                    status: "planned",
                    memberIds: [2]
                },
                {
                    id: 3,
                    title: "Legacy Migration",
                    status: "done",
                    memberIds: [1, 3]
                }
            ]);
        }, 800);
    });
}
;
// Aufgabe 8:
// Struggles: die ganzen count Variablen hier in main() sind Promises wie const countTotalUsers ist Promise<number>, const countActiveUsers ist Promise<User[]> usw. funktioniert das holen und printen trotzdem? -> nein, für alles kommt Promise { <pending> } in der Ausgabe im Terminal
// Lösung: 
async function main() {
    try {
        const dashboardData = await loadDashboardData();
        // dashboardData ist jetzt DashboardData,
        // nicht mehr Promise<DashboardData>
        const dashboardDataSummary = getDashboardSummary(dashboardData);
        console.log("Anzahl aller User:", dashboardDataSummary.totalUsers);
        console.log("Anzahl aktiver User:", dashboardDataSummary.activeUsers);
        console.log("Anzahl aller Projekte:", dashboardDataSummary.totalProjects);
        console.log("Anzahl aktiver Projekte:", dashboardDataSummary.activeProjects);
        console.log("Anzahl abgeschlossener Projekte:", dashboardDataSummary.completedProjects);
        dashboardDataSummary.projectInfoArray.forEach((project) => {
            console.log("Titel:", project.title);
            console.log("Status:", project.status);
            console.log("Mitglieder:", project.memberNames);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        ;
    }
    ;
}
;
main();
// Aufgabe 1
// Argument vom Typ unknown weil externe Daten und Daten als "unzuverlässig" behandelt werden also nicht davon ausgegangen werden kann, dass sie die Shape der Typen User und unten Project erfüllen also von diesem Typen sind
// deswegen Type Guard hier, um sicherzugehen dass sie Shape unserer Typen haben, damit wir sicher mit ihnen später arbeiten können und keine Fehler entstehen zur Laufzeit
function isUser(user) {
    if (typeof user !== "object" || user === null) {
        return false;
    }
    return ("id" in user && typeof user.id === "number" &&
        "name" in user && typeof user.name === "string" &&
        "role" in user && (user.role === "admin" || user.role === "developer" || user.role === "viewer") &&
        "active" in user && typeof user.active === "boolean");
}
;
function isUserArray(users) {
    // ohne Klammern nach isUser also nicht isUser() weil Funtion sonst direkt in Methodenkopf aufgerufen und ausgeführt werden würde bevor users.every() ausgeführt wird, deswegen Funktion nur übergeben
    // users.every(isUser) übergibt die Funktion isUser als Callback, every() ruft sie dann selbst für jedes Element auf: isUser(users[0]), isUser(users[1]), isUser(users[2]) ...
    return Array.isArray(users) && users.every(isUser);
}
function isProject(project) {
    if (typeof project !== "object" || project === null) {
        return false;
    }
    return ("id" in project && typeof project.id === "number" &&
        "title" in project && typeof project.title === "string" &&
        "status" in project && (project.status === "planned" || project.status === "active" || project.status === "done") &&
        // Struggle: memberIds ist kein einzelner number-Wert, sondern number[]. Deshalb reicht typeof project.memberIds === "number" nicht.
        // Lösung: Erst mit Array.isArray() prüfen, ob memberIds ein Array ist, danach mit every() prüfen, ob jedes Element darin ein number ist.
        // also da memberIds als Property ein Array ist, neben Prüfung ob Property überhaupt existiert auch prüfen ob es ein Array ist und ob jedes Element des Arrays vom Typ des Arrays ist also hier vom Typ number
        // darauf achten bei Type Guards!!!
        "memberIds" in project && Array.isArray(project.memberIds) && project.memberIds.every((id) => typeof id === "number"));
}
;
function isProjectArray(projects) {
    return Array.isArray(projects) && projects.every(isProject);
}
// Aufgabe 2
function getActiveUsers(users) {
    const activeUsers = users.filter((user) => {
        return user.active === true;
    });
    return activeUsers;
}
;
// Aufgabe 3
function getProjectsByStatus(projects, status) {
    const filteredStatusProjects = projects.filter((project) => {
        return project.status === status;
    });
    return filteredStatusProjects;
}
;
// Aufgabe 4
// Struggle: bin stuck wie ich durch jeden User in users gehe und prüft ob deren Id in der property memberIds vom Project Objekt ist, weiß eigentlich nur nicht wie ich durch mehrere Ids iteriere und diese mit den User Ids abgleiche weil wenn project nur eine memberId hätte,
// könnte ich einfach durch die users filtern und abgleichen, ob die memberId des projects (also project.memberId) mit der id des aktuell iterierten User (also user.id, somit project.memberId === user.id) übereinstimmt, aber wenn jetzt memberIds zwei Einträge hat,
// wie iteriere ich diese nochmal?
// Lösung: // users mit filter() durchgehen und für jeden User mit project.memberIds.includes(user.id) prüfen, ob seine ID im memberIds-Array enthalten ist. includes() liefert true/false und passt deshalb direkt als Bedingung für filter().
function getProjectMembers(project, users) {
    const usersInProject = users.filter((user) => {
        // .includes() prüft ob Argument (user.id also ID des gerade iterierten user in users Array) in aufgerufenem Array (memberIds von projects Array, project.memberIds erstellt temporär sozusagen ein Array daraus) enthalten ist also ob z.B. in project.memberIds = [2, 3] die user.id was z.B. 2 ist, enthalten ist
        // returned true oder false und kann somit gut mit .filter() kombiniert werden, weil diese ja das jeweilge gerade iterierte Element im Array (hier User Objekt in users Array) in neuem Array lässt und bei false diese auslässt
        return project.memberIds.includes(user.id);
    });
    return usersInProject;
}
;
// Aufgabe 5
// Struggle: struggle gerade damit, die User durch die ids in membersIds in einem project Array zu bekommen also anhand einer property eines Objekts (memeberIds konkrete Zahlen also IDs) die Elemente eines anderen Arrays (die User Objekte) die diese Ausprägungen in einer eigenen Property (in der id Property des Users) haben
// struggle damit, durch die memberIds zu gehen (Schleife habe ich mit project.memberIds.forEach((id) => {...})) udn dann nochmal durch alle User zu gehen und die ID abzugleichen, weil User sind ja User Objekte
// und es bringt nichts vorher die Namen der User in ein seperates Array zu packen weil ich dann keine IDs mehr vergleichen kann weil diese nicht mehr in Array sind (außer durch Dictionary-Zuweisung oder so)
// Zusammenfassung Aufgabe: gehe durch die memberIds des übergebenen Projekts und returne die Namen der User, deren IDs zu den memberIds des übergebenen Projekts passt, also gehe durch die memberIds des Projekts, gleiche mit den User Objekten ab wo ID passt und returne aus diesen
// passenden User Objekten dann deren Namen -> muss also durch mehrere Zahlen iterieren (memberIds), diese mit einer Property der Objekte in einem anderen Array vergleichen und aus passenden Objekten des anderen Arrays eine andere Property wieder returnen
// Lösung: Die schwierige Zuordnung ist bereits in getProjectMembers() gekapselt. Diese Funktion liefert die passenden User als User[]. Anschließend mit map() jedes User-Objekt in user.name umwandeln. Dadurch wird aus User[] ein string[].
function getProjectMemberNames(project, users) {
    const usersInProject = getProjectMembers(project, users);
    const namesOfUsersInProject = usersInProject.map((user) => {
        return user.name;
    });
    return namesOfUsersInProject;
}
;
async function loadDashboardData() {
    try {
        const [usersData, projectsData] = await Promise.all([
            fetchUsers(),
            fetchProjects()
        ]);
        if (!isUserArray(usersData)) {
            throw new Error("Invalid user data");
        }
        if (!isProjectArray(projectsData)) {
            throw new Error("Invalid project data");
        }
        return {
            users: usersData,
            projects: projectsData
        };
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Error loading dashboard data!");
    }
}
;
function getDashboardSummary(data) {
    const activeUsers = getActiveUsers(data.users);
    const activeProjects = getProjectsByStatus(data.projects, "active");
    const completedProjects = getProjectsByStatus(data.projects, "done");
    const projectInfoArray = data.projects.map((project) => {
        return {
            title: project.title,
            status: project.status,
            memberNames: getProjectMemberNames(project, data.users)
        };
    });
    return {
        totalUsers: data.users.length,
        activeUsers: activeUsers.length,
        totalProjects: data.projects.length,
        activeProjects: activeProjects.length,
        completedProjects: completedProjects.length,
        projectInfoArray: projectInfoArray,
    };
}
export {};
//# sourceMappingURL=index.js.map