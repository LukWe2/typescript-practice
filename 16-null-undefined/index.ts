type User = {

    id: number,
    name: string,
    // email darf fehlen und ist beim Zugriff string | undefined also string oder undefined
    email?: string
}

// Erst ist sie bewusst leer (selectedUser = null;) und später kann ein User darin liegen: selectedUser = user01;
let selectedUser: User | null = null;

console.log(selectedUser);

const user01: User = {

    id: 1,
    name: "Lukas",
    email: "lukas.werner.2@gmx.de"
};

selectedUser = user01;

console.log(selectedUser);


function printSelectedUser(user: User | null): void{

    if (user !== null){

        console.log(user.name);
    } else {

        console.log("No user selected");
    }

    console.log(user?.email?.toUpperCase());
};

const user02: User = {

    id: 2,
    name: "Anna",
    email: "anna2@gmx.de"
};

const user03: User = {

    id: 3,
    name: "Peter"
};

const displayEmail02 = user02.email ?? "No email";

console.log(displayEmail02);

const displayEmail03 = user03.email ?? "No email"

console.log(displayEmail03);

// Fehler bewusst testen:

let username: string = "Lukas";
// Fehler: null ist in TypeScript ein eigener Typ und kein string.
// Damit username sowohl einen string als auch null enthalten darf,
// müsste man einen Union Type verwenden, also: string | null.
//username = null;

function printName(name: string | null): void {
    // Fehler: name ist ein Union Type und kann entweder string oder null sein.
    // Bevor toUpperCase() verwendet werden kann, muss man per Type Narrowing
    // sicherstellen, dass name tatsächlich ein string und nicht null ist.
    //console.log(name.toUpperCase());
}


// 1. Was ist der grundlegende Unterschied zwischen null und undefined?
// Antwort: undefined bedeutet typischerweise, dass für diesen Wert aktuell nichts festgelegt ist z.B. weil ein Wert noch nicht zugewiesen wurde, null bedeutet eher, dass bewusst festgelegt wurde, dass kein Wert vorhanden ist, z.B. wenn eine Variable bewusst null sein soll
// Antwort: undefined bedeutet typischerweise, dass ein Wert noch nicht gesetzt bzw. nicht vorhanden ist; null wird eher bewusst gesetzt, um „kein Wert“ auszudrücken.

// 2. Was bedeutet: let user: User | null; ?
// Antwort: Es bedeutet, dass die Variable user sowohl vom Type User sein kann mit seinen Properties, oder null da es ein Union Type ist
// Antwort: User | null ist ein Union Type und bedeutet, dass die Variable entweder ein gültiges User-Objekt oder null enthalten darf.

// 3. Warum ist das hier gefährlich bzw. nicht erlaubt?:
/*
function printName(name: string | null): void {
    console.log(name.toUpperCase());
}
*/
// Antwort: Das wirft einen Fehler, weil die .toUpperCase() Methode nur für string aufrufbar ist, der Parameter name aber neben string auch null sein kann und die Methode dafür nicht existiert bzw. aufrufbar ist
// Antwort: name kann string oder null sein. Deshalb kann TypeScript nicht garantieren, dass toUpperCase() existiert. Du müsstest vorher narrowen

// 4. Was macht: user.email?.toUpperCase() ?
// Antwort: Es ruft die Methode .toUpperCase() auf die Property email die Objektinstanz user auf, wenn die Instanz diese optionale Property besitzt, wenn sie email nicht hat,(falsch siehe unten: wird diese Zeile nicht ausgeführt)
// Antwort: Statt „die Zeile wird nicht ausgeführt“ besser: Falls email nicht null oder undefined ist, wird toUpperCase() aufgerufen. Falls email fehlt, ergibt der gesamte Ausdruck einfach undefined

// 5. Was macht: user.email ?? "No email" ?
// Antwort: Das checkt ob user.email null oder undefined ist und wenn ja, dann wird der String für diese Variable gesetzt, es checkt nur null und defined, || würde für alle falsy Werte also "", 0, false, null und undefined den String benutzen

// 6. Was ist der wichtige Unterschied zwischen ?? und ||?
// ?? prüft nur null und undefined, || prüft alle falsy Werte also auch "", 0, false, null und undefined

