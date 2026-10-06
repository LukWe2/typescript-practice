// Wir haben User- und Project-Daten, verpacken diese aber zusätzlich
// in ein Datenmodell RequestState<T>, damit neben den Daten auch der
// aktuelle Zustand des Requests modelliert wird: idle, loading, success oder error.
//
// Anders als in Aufgabe 4 arbeiten wir nach dem await also nicht direkt nur
// mit User[] bzw. Project[], sondern mit RequestState<User[]> bzw. RequestState<Project[]>.
// Die eigentlichen Daten liegen nur im success-State unter data.

// Also in Aufgabe 7 können wir zwei verschiedene Ebenen awaiten:
//
// await fetchUsers()
// → User[]
//
// await loadUsersState()
// → RequestState<User[]>
//
// loadUsersState() kapselt die geladenen User zusätzlich in einen RequestState,
// damit neben den Daten auch idle/loading/success/error modelliert werden können.


type User = {
    id: number;
    name: string;
    active: boolean;
};

type Project = {
    id: number;
    title: string;
    status: "planned" | "active" | "done";
};

function fetchUsers(): Promise<User[]> {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve([
                {
                    id: 1,
                    name: "Lukas",
                    active: true
                },
                {
                    id: 2,
                    name: "Anna",
                    active: true
                },
                {
                    id: 3,
                    name: "Peter",
                    active: false
                }
            ]);

        }, 500);
    });
}

function fetchProjects(): Promise<Project[]> {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve([
                {
                    id: 1,
                    title: "Mobile App",
                    status: "active"
                },
                {
                    id: 2,
                    title: "Website",
                    status: "planned"
                },
                {
                    id: 3,
                    title: "Migration",
                    status: "done"
                }
            ]);

        }, 700);
    });
}

// Achtung: mit runden Klammern oder ganz ohne wenn OR (die Striche) drin sind
type RequestState<T> = 

    | {

        status: "idle"
    }
    | {

        status: "loading"
    }
    | {
        status: "success",
        data: T
    }
    | {
        status: "error",
        errorMessage: string
    }

// wollen ja dass Funktion mit Generic funktioniert also müssen ihn auch in den <> Klammern vorher definieren mit <T extends unknown[]>, dann können wir T im Argument nutzen
// legen hier fest dass T die Properties von einem Array haben muss mit unknown[], da diese die Property length haben alle, ohne das extends unknown[] bekommt man Fehler: Property 'length' does not exist on type 'T'.
function printRequestState<T extends unknown[]>(requestState: RequestState<T>): void {

    if (requestState.status === "idle"){

        console.log("Noch nicht geladen");
    } else if (requestState.status === "loading"){

        console.log("Daten werden geladen...");
    } else if (requestState.status === "success"){

        console.log("Daten erfolgreich geladen");
        console.log(`Count of loaded data: `, requestState.data.length); 
    } else {

        console.log(`Fehler: ${requestState.errorMessage}`);
    }
};

// // In dieser Übung sind fetchUsers() und fetchProjects() bereits mit
// Promise<User[]> bzw. Promise<Project[]> typisiert.
// Deshalb behandeln wir ihre Ergebnisse als bereits korrekt typisierte Daten
// und führen hier keine zusätzliche Runtime-Validierung durch.
//
// Bei echten externen API-Daten wäre eine Runtime-Validierung trotzdem sinnvoll,
// auch wenn wir ihnen in TypeScript einen Typ geben.
// brauchen auch kein const response = await fetch(url); und danach const data = await response.json(); weil wir keine Daten aus dem Web holen und diese nicht in JSON Format sind, sondern bei fetchUsers() und fetchProjects() schon als User und Project Daten vorliegen
// fetchUsers returned ja ein Promise mit einem User Array also User[], mit await lösen wir dieses auf aber eine async Methode returned immer auch wieder ein Promise, weswegen wir hier wieder ein Promise<RequestState<User[]>> zurückgeben, 
// nach dem const data = await fetchUsers(); ist data aber das echte User[] Array
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!await fetchUsers(); gibt ja ein User[], dieses User Array nutzen wir aber innerhalb dessen was wir returnen, was vom Typ RequestState ist
// RequestState beinhaltet ja ein Generic nämlich das was wir als data zurückgeben nämlich dieses User[] Array, deswegen ist User[] "nur" innerhalb des "ganzen" Rückgabewerts RequestState!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// insgesamt: fetchUsers() → Promise<User[]>, await fetchUsers() → User[], User[] wird als T in RequestState<T> eingesetzt → RequestState<User[]>, async Funktion → Promise<RequestState<User[]>>
async function loadUsersState(): Promise<RequestState<User[]>> {

    try {

        const userData = await fetchUsers();

        // beim Hovern: const data: User[]
        return {

            status: "success",
            data: userData
        }
    } catch(error){

        return {

            status: "error",
            errorMessage: "Unknown error"
        }
    }
};


// geben wieder ein Promise zurück weil es eine async-Funktion ist und diese immer ein Promise zurückgeben und dann wollen wir ein Objekt mit der Datenstruktur die wir in RequestState festgelegt haben zurückgeben, und da wir es hier für Daten vom Typ Project machen, muss das T Project[] sein
async function loadProjectsState(): Promise<RequestState<Project[]>>{

    try {

        const projectData = await fetchProjects();

        return{

            status: "success",
            data: projectData
        };
    } catch(error){

        return {

            status: "error",
            errorMessage: "Unknown Error"
        };
    }
};


function getSuccessfulData<T>(state: RequestState<T>): T | undefined {

    if (state.status === "success"){

        return state.data;
    };

    return undefined;
};


function mapSuccessfulData<T, U>(state: RequestState<T>, callback: (data: T) => U): RequestState<U>  {

    if (state.status === "success"){

        return {
            status: "success",
            data: callback(state.data)
        }
    } else if (state.status === "idle"){

        return {

            status: "idle"
        }
    } else if (state.status === "loading"){

        return{
            status: "loading"
        }
    } else {

        return {

            status: "error",
            errorMessage: state.errorMessage
        };
    }
};

// 7. Dashboard-State

type DashboardState = {

    users: RequestState<User[]>,
    projects: RequestState<Project[]>
};

async function createDashboardState(): Promise<DashboardState> {

    // destructen hier, weil wir mit Promise.all mehrere Promises auflösen, nämlich die aus fetchUsers() und fetchProjects() (diese beide Methoden werden in loadUsersState() und loadProjectsState() aufgerufen), await löst die Promises wieder auf und gibt echte Daten zurück
    const [usersData, projectsData] = await Promise.all([

        // rufen nicht fetchUsers() und fetchProjects() hier auf, sondern loadUsersState() und loadProjectsState(), weil diese Methoden ebenfalls die User und Projects als data zurückgeben und weil wir ja die RequestStates dieser Daten haben wollen
        loadUsersState(),
        loadProjectsState()
    ]);


    return {

        users: usersData,
        projects: projectsData
    }
};


async function main(): Promise<void> {

    const idleState: RequestState<User[]> = {

        status: "idle"
    };

    const loadingState: RequestState<User[]> = {

        status: "loading"
    };

    printRequestState(idleState);
    printRequestState(loadingState);


    // ohne await ist users gleich Promise<User[]>, mit await User[] weil damit das Promise was von fetchUsers() zurückgegeben wird aufgelöst wird
    // das console.log(users) gibt wenn users eben ein Promise ist statt die echten Daten (ohne await), dann gibt es nur "Promise { <pending> }" aus und nicht die Daten wie gedacht, weil es eben noch ein Promise ist und wir nicht gewartet haben auf die chten Daten mit await
    const users = await fetchUsers();
    console.log("Users Data: ", users);

    // auch hier, ohne await ist projects vom Typ const projects: Promise<Project[]>, mit await Project[]
    // auch hier: das console.log(prjoects) gibt wenn users eben ein Promise ist statt die echten Daten (ohne await), dann gibt es nur "Promise { <pending> }" aus und nicht die Daten wie gedacht, weil es eben noch ein Promise ist und wir nicht gewartet haben auf die chten Daten mit await
    const projects = await fetchProjects();
    console.log("Projects Data: ", projects);

    // Bräuchten hier users und projects nicht, weil fetchUsers() und fetchProjects() in loadUsersState() und loadProjectsState() aufgerufen werden, aber für Lern- und Dokumentationszwecke so gelassen, aber das fetchen oben bräuchten wir nicht, sonst werden Daten doppelt geladen

    // auch hier, ohne await ist usersState vom Typ  Promise<RequestState<User[]>>, mit await RequestState<User[]>
    // auch hier: das console.log(usersState) gibt wenn usersState eben ein Promise ist statt die echten Daten (ohne await), dann gibt es nur "Promise { <pending> }" aus und nicht die Daten wie gedacht, weil es eben noch ein Promise ist und wir nicht gewartet haben auf die chten Daten mit await
    const usersState = await loadUsersState();
    console.log("Users Data encapsulated in the Request State:", usersState);

    const projectsState = await loadProjectsState();
    console.log("Projects Data encapsulated in the Request State:", projectsState);

    // geht auch: const successfulUsersData = getSuccessfulData(await loadUsersState());
    const successfulUsersData = getSuccessfulData(usersState);
    console.log("Successful User Data: ", successfulUsersData);

    // geht auch: const successfulProjectsData = getSuccessfulData(await loadProjectsState());
    const successfulProjectsData = getSuccessfulData(projectsState);
    console.log("Successful Project Data: ", successfulProjectsData);

    const usersNames = mapSuccessfulData(usersState, (users) => {

        return users.map((user) => {

            return user.name;
        });
    });
    console.log("User Names: ", usersNames);

    /*
    oder vorher Funktion definieren:

    function getUserNames(users: User[]): string[] {
        return users.map((user) => {
            return user.name;
        });
    }

    und dann aufrufen:

    const usersNames = mapSuccessfulData(
        usersState,
        getUserNames
    );
    */

    // hier werden Daten sogar nochmal geladen, weil loadUsersState() und loadProjectsState() in createDashboardState() nochmal aufgerufen werden
    const dashboardState = await createDashboardState();

    console.log(
        "Dashboard State:",
        dashboardState
    );
};

main();

