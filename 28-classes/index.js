;
class User {
    id;
    name;
    email;
    role;
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
    getEmail() {
        return this.email;
    }
    ;
    printUser() {
        console.log(`Name: ${this.name}, Rolle: ${this.role}`);
    }
}
;
class Admin extends User {
    permissions;
    constructor(id, name, email, role, permissions) {
        super(id, name, email, role);
        this.permissions = permissions;
    }
    printAdminRole() {
        console.log(`$Role: ${this.role}`);
    }
}
const user01 = new User(1, "Lukas", "lukas.werner.2@gmx.de", "developer");
// Achtung: nicht console.log(user01.getEmail), dann wird Funktion nicht aufgerufen und [Function: getEmail] geprintet!
console.log(user01.getEmail());
user01.printUser;
const admin01 = new Admin(1, "Anna", "anna2@gmx.de", "admin", ["read", "write", "change"]);
admin01.printAdminRole();
export {};
// Property 'email' is private and only accessible within class 'User'.
// Könnte sie mit setUserMail() Funktion ändern ohne email auf public zu setzen, ist ein Setter
// Ein wichtiger Punkt zu deinem Kommentar bei email: Ein Getter oder Setter macht die Property nicht public. email bleibt private. Du stellst lediglich einen kontrollierten öffentlichen Zugriff bereit.
//user01.email = "lukas.werner@gmx.de";
// Property 'role' is protected and only accessible within class 'User' and its subclasses.
//user01.role = "senior";
// Cannot assign to 'id' because it is a read-only property.
//user01.id = 5
// 1. Was macht der constructor einer Klasse und wann wird er ausgeführt?
// Antwort: Ein Konstruktor erstellt ein neues Objekt einer Klasse und gibt diesem Startwerte, wenn er ausgeführt wird. Wenn eine Klasse also die Instanz-/Objektvariablen id: number, name: string und email: string hat, dann setzt der Konstruktor diese Instanzvariablen für das Objekt am Start.
// Antwort: Fast richtig. Genauer: Das new erzeugt die neue Instanz und dabei wird automatisch der constructor ausgeführt.
// Der constructor initialisiert diese neue Instanz, z.B. indem er Startwerte in this.id, this.name usw. schreibt (je nachdem ob und was für Variablen im Konstruktor übergeben wird und ob diese mit this.variable an die Instanz-Properties gekopplet werden).
// wenn constructor so ist: constructor(id: number, name: string, email: string, role: string) { this.id = id; this.name = name; this.email = email; this.role = role }, dann werden beim Aufruf die als Argument übergebenen Variablen in die lokalen Variablen des Objekt eingesetzt:
// const user01 = new User( 1, "Lukas", "lukas.werner.2@gmx.de", "developer"); -> für Objektvariablen (die die in der Klassendefinition ganz oben stehen): id = 1; name  = "Lukas"; email = "lukas.werner.2@gmx.de"; role  = "developer"
// wenn aber im Konstruktor keine Argumente gegeben werden und trotzdem die lokalen Variablen gesetzt werden, hat jede Instanz diese Werte und sie werden nicht beim Erstellen des Objekt als Argumente übergeben:
// constructor() { this.id = 1; this.name = "Lukas"; this.email = "lukas.werner.2@gmx.de"; this.role = "developer"; }, dann stehen diese Werte zwar genauso in den lokalen Variablen, aber hier immer, mit Argumenten im Konstruktor kann man diese frei setzen
// Der constructor wird also bei new User(...) automatisch ausgeführt.
// 2. Was bedeutet this innerhalb einer Klasse?
// Antwort: this bedeutet diese Instanz der Klasse also dieses Objekt, es ist eine Referenz oder ein Zeiger auf das aktuelle Objekt, in dessen Methode oder Konstruktor man sich gerade befindet.
// Antwort: Richtig. this referenziert die aktuelle Instanz, auf der der constructor oder die Methode gerade ausgeführt wird.
// Bei user01.printUser() bezieht sich this auf user01, bei user02.printUser() auf user02.
// 3. Was ist der Unterschied zwischen public, private und protected?
// Antwort: Public bedeutet dass auf diese Variable/Methode von überall zugegriffen werden und verändert werden darf, auch außerhalb der Klasse in der diese definiert ist. Private heißt dass nur innerhalb der Klasse darauf zugegriffen werden darf, nicht von außerhalb.
// Protected heißt, dass nur innerhalb der eigenen Klasse oder von Kindklassen also Unterklassen (z.B. bei Ergbung mit extended)
// Antwort: Richtig. Präziser:
// public = Zugriff innerhalb und außerhalb der Klasse erlaubt.
// private = Zugriff nur innerhalb der Klasse selbst.
// protected = Zugriff innerhalb der Klasse selbst und innerhalb von Unterklassen erlaubt, aber nicht von außen.
// Wichtig: public bedeutet nicht automatisch "veränderbar", denn z.B. public readonly id wäre öffentlich lesbar, aber trotzdem nicht neu zuweisbar.
// 4. Warum funktioniert user.email nicht, wenn email als private deklariert wurde?
// Antwort: Weil sie dann nicht in der eigenen Klasse verwendet wird die Variable email und durch private externe Zugriffe verboten sind und Fehler wirft, man müsste innerhalb der Klasse mit this.email zugreifen also auf die Definition von Objekten, da user aber ein Objekt also eine Instanz
// in einer anderen Klasse ist, geht der Zugriff nicht.
// Antwort: Der Kern stimmt, aber "in einer anderen Klasse" ist nicht nötig.
// user.email ist ein Zugriff von außerhalb der Klasse User und private verbietet genau diesen Zugriff.
// Innerhalb einer Methode der Klasse User darf dagegen auf this.email zugegriffen werden.
// Deshalb stellt man bei Bedarf z.B. getEmail() oder setEmail() bereit.
// 5. Was macht super(name) in einer Klasse, die eine andere Klasse mit extends erweitert?
// Antwort: super(name) setzt in einer anderen Klasse, die von einer bestimmten Klasse erbt mit extends, den Konstruktor der Elternklasse bzw. ruft diesen auf und setzt die Werte.
// Antwort: Richtig. super(...) ruft den constructor der Elternklasse auf und übergibt ihm die entsprechenden Argumente.
// Dadurch kann die Elternklasse ihre geerbten Properties initialisieren.
// In einem constructor einer Unterklasse muss super(...) außerdem aufgerufen werden, bevor man this benutzen kann.
// 6. Was ist der Unterschied zwischen extends und implements?
// Antwort: Mit extends erbt eine Klasse von einer anderen und übernimmt dessen Verhalten und die Properties der Elternklasse. Mit implements implementiert eine Klasse ein Interface und verpflichtet sich, dessen Shape also Properties zu erfüllen (was ist der Unterschied?)
// Antwort: Genau. Der entscheidende Unterschied:
// extends = echte Vererbung. Die Unterklasse übernimmt vorhandene Properties und Methoden inklusive deren Implementierung.
// implements = nur ein TypeScript-Vertrag. Das Interface gibt vor, welche Struktur vorhanden sein muss, liefert aber keine fertige Implementierung.
//
// Beispiel:
// class Admin extends User
// → Admin übernimmt z.B. vorhandene Methoden von User.
//
// class User implements Identifiable
// → User muss die Anforderungen von Identifiable erfüllen, bekommt dadurch aber keinen Code von Identifiable.
// 7. Warum kann eine TypeScript-Klasse sowohl als Typ benutzt als auch mit instanceof geprüft werden?
// Antwort: Da die Klasse sowohl als Typ verwendet werden kann als auch als Klasse einen Konstruktor hat und dieser für ein beliebiges Objekt mit instanceof geprüft werden kann, ob es von dieser Klasse ist.
// Antwort: Richtig. Eine class existiert in TypeScript auf zwei Ebenen:
// 1. als Typ zur Compile Time, z.B. const user: User
// 2. als echter JavaScript-Wert/Konstruktor zur Runtime.
// Deshalb kann JavaScript mit user instanceof User prüfen, ob User.prototype in der Prototype Chain der Instanz liegt.
// type und interface verschwinden dagegen beim Kompilieren und können deshalb nicht mit instanceof geprüft werden.
// 8. Was bedeutet folgendes Interface für eine Klasse, die es implementiert?
/*
interface Identifiable {
    readonly id: number;
}
*/
// Antwort: Es bedeutet für die Klasse, dass die Klasse eine Instanzvariable readonly id: number haben muss um die Shape zu erfüllen.
// Antwort: Fast richtig. Die Klasse muss eine kompatible Property id: number bereitstellen, damit sie Identifiable erfüllt.
// Über einen Wert vom Typ Identifiable darf id nicht verändert werden.
// Wenn die Klasse selbst die Unveränderlichkeit ebenfalls ausdrücklich erzwingen soll, sollte man dort ebenfalls readonly id: number deklarieren.
//# sourceMappingURL=index.js.map