// 1.

type AppConfig = {

    mode: "dark" | "light",
    retries: number,
    debug: boolean
};

// 2.

const configWithAnnotation : AppConfig = {

    // Typ von mode: (property) mode innerhalb des Objekts: "dark" | "light"
    mode: "dark",
    retries: 3,
    debug: true
};

// Typ von configWithSatisfies.mode außerhalb: (property) mode: "dark" | "light"
configWithAnnotation.mode;

// 3.

const configWithSatisfies = {

    // Typ von mode: (property) mode innerhalb des Objekts: "dark" | "light"
    mode: "dark",
    retries: 3,
    debug: true
} satisfies AppConfig;

// Typ von configWithSatisfies.mode außerhalb: (property) mode: "dark"
configWithSatisfies.mode;

// Fehler: Type '"blue"' is not assignable to type '"dark"'.
// satisfies erkennt also diesen Fehler, dass mode nicht zum Typ AppConfig passt, obwohl configWithSatisfies den Typen AppConfig eben nicht expilizit zugewiesen ist
//configWithSatisfies.mode = "blue";
// auch hier Fehler: type 'string' is not assignable to type 'number'.
//configWithSatisfies.retries = "4";

// 5.

type Role = "admin" | "editor" | "viewer";
type Permission = "read" | "write" | "delete";

// 6.

const permissions = {

    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"]
} satisfies Record<Role, Permission[]>
// `satisfies Record<Role, Permission[]>` bedeutet hier:
// Alle möglichen Werte aus `Role` müssen als Property-Keys vorhanden sein.
//
// Die Values dieser Properties müssen jeweils `Permission[]` sein.
// Das heißt: Die Array-Elemente dürfen nur Werte aus der Union `Permission` enthalten.
//
// -> Beim ersten Parameter `Role` müssen alle möglichen Union-Werte als Keys vorhanden sein.
// -> Beim zweiten Parameter `Permission[]` wird nur festgelegt, welchen Typ jeder Value haben muss.
//    Es müssen also nicht alle möglichen `Permission`-Werte in jedem Array vorkommen.

// ginge auch, aber dann wäre der Typ wieder expliziert vorgeschrieben:
/*
const permissions: Record<Role, Permission[]> = {

    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"]
}
    Frage: aber was ist der Unterschied zwischen den beiden, wie sähen die Typen der Properties aus einmal mit dem satisfies und einmal
    wenn man konkret den Typen zuteilt?

-> Unterschied:
 Bei `satisfies Record<Role, Permission[]>` wird nur geprüft, ob `permissions` zu diesem Typ passt.
 Der konkrete Typ des Objekts wird trotzdem aus dem Objekt selbst inferiert.

 Bei `const permissions: Record<Role, Permission[]> = ...` wird der Typ der Variable dagegen
 ausdrücklich auf `Record<Role, Permission[]>` festgelegt.

 Dadurch kennt TypeScript bei der Typzuweisung nur noch:

 {
   admin: Permission[];
   editor: Permission[];
   viewer: Permission[];
 }

 Bei `satisfies` bleiben die konkreteren inferierten Typen der Properties erhalten.
 TypeScript weiß also genauer, welche Werte tatsächlich in den einzelnen Arrays vorkommen,
 während gleichzeitig geprüft wird, dass alles mit `Record<Role, Permission[]>` kompatibel ist.
*/

// 7.

// Fehler: Property 'viewer' is missing in type '{ admin: ("read" | "write" | "delete")[]; editor: ("read" | "write")[]; }' 
// but required in type 'Record<Role, Permission[]>'
// weil: Rolle viewer fehlt
/*
const permissionsWrong: Record<Role, Permission[]> = {

    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
}
    */

// Fehler: Object literal may only specify known properties, and 'guest' does not exist in type 'Record<Role, Permission[]>'.
// weil: guest ist ein unbekannter Key
/*
const permissionsWrong: Record<Role, Permission[]> = {

    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    guest: ["read"]
}
*/

// Fehler: Type '"publish"' is not assignable to type 'Permission'.
// weil: "publish" ist eine ungültige Permission
/*
const permissionsWrong: Record<Role, Permission[]> = {

    admin: ["read", "write", "delete"],
    editor: ["read", "write", "publish"],
    viewer: ["read"]
}
*/


// 8. + 9.


const roleLabelsWithType: Record<Role, string> = {

    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
};

// Typ von roleLabelsWithType.admin: (property) admin: string
roleLabelsWithType.admin;


const roleLabelsWithAsConst = {

    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
} as const;

// Typ von roleLabelsWithAsConst.admin: (property) admin: "Administrator"
roleLabelsWithAsConst.admin;


const roleLabelsWithSatisfies = {

    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
} satisfies Record<Role, string>;

// Typ von roleLabelsWithSatisfies.admin: (property) admin: string
roleLabelsWithSatisfies.admin;


const roleLabelsWitTypeAndAsConst: Record<Role, string> = {

    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
} as const;

// Typ von roleLabelsWitTypeAndAsConst.admin: (property) admin: string
roleLabelsWitTypeAndAsConst.admin;



const roleLabelsAsConstAndSatisfies = {

    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
} as const satisfies Record<Role, string>;

// Typ von roleLabelsAsConstAndSatisfies.admin: (property) admin: "Administrator"
roleLabelsAsConstAndSatisfies.admin;


// 10.

// bei const x: SomeType = ... prüft TypeScript zur Typzeit ob der Typ des Werts/die Typen der Werte stimmen 
// und x wird als dieser Typ SomeType behandelt

// bei const x = ... as SomeType ist es eine Type Assertion.
// Man weist TypeScript an, den Ausdruck als SomeType zu behandeln.
// Es findet dadurch keine Runtime-Validierung statt und TypeScript prüft nicht wie bei `satisfies`,
// ob das konkrete Objekt vollständig die gewünschte Struktur beweist.

// bei const x = ... satisfies SomeType prüft TypeScript zur Typzeit ob Wert zu Typ passt (oder Werte zu Typen bei Objekten und Arrays),
// aber die Typen der Werte vom Typ werden nicht für das Objekt oder Array übernommen, sondern nur geprüft, die Typen der Werte werden immernoch
// inferiert















// 1. Was ist die Hauptaufgabe des `satisfies`-Operators?
// Antwort: Prüfen ob eine Variable, ein Objekt oder ein Array/Tuple einen bestimmten Typen erfüllt, kann also pro Property oder Element
// prüfen ob dieses dem Typen entspricht, weist aber dem Objekt oder Array nicht dem Typen explizit zu sondern checkt nur, dadurch werden
// die Typen der Properties oder Elemente nicht auf die des Typen gesetzt, sondern können je nach Kontext trotzdem enger inferiert werden.

// Antwort: ✅ Genau. Kleine Präzisierung: `satisfies` prüft den gesamten Ausdruck auf Kompatibilität mit dem Zieltyp. Der Zieltyp kann dabei auch 
// Kontext für die Inferenz liefern, aber der resultierende Typ wird nicht einfach auf den Zieltyp festgelegt.


// 2. Was ist der Unterschied zwischen diesen beiden Schreibweisen?
/*
const config: AppConfig = {
    mode: "dark",
    retries: 3,
    debug: true
};

const config = {
    mode: "dark",
    retries: 3,
    debug: true
} satisfies AppConfig;
*/
// Antwort: Der Unterschied ist, dass beim ersten der Typ AppConfig explizit auf das config Objekt zugewiesen wird, und dadurch dessen Properties
// die Typen bekommen, die im AppConfig Typ für diese festgelegt sind. Im zweiten Beispiel hat config keinen expliziten Typen zugewiesen, sondern
// es steht am Ende satisfies AppConfig, wodurch trotzdem geprüft wird, ob config dem Typen entspricht also die Keys und Values der Properties passen, 
// aber die Typen der Properties werden nicht auf die des Typen AppConfig gesetzt, sondern werden mit dem verfügbaren Kontext inferiert. 

// Antwort: ✅ Richtig. Beim ersten Beispiel ist der Variablentyp ausdrücklich `AppConfig`. Beim zweiten dient `AppConfig` als Prüf- und Kontexttyp, 
// während der konkrete Typ des Objekt-Literals erhalten bzw. daraus inferiert wird.


// 3. Warum kann `satisfies` bei Literal Types präzisere Type Inference erhalten
// als eine normale Type Annotation?
// Antwort: Wenn bei einem Objekt eine Property einen Literal Type besitzt (z.B. weil im Typ der verglichen werden soll ein Union Literal für eine Property benutzt wird),
// dann kann mit satisfies dieses Literal erhalten bleiben, da satisfies eben nur prüft ob es dem Typ entspricht, nicht aber dieses Union Literal
// als Typ auf diese Property anwendet wie es bei einer expliziten Typzuweisung wäre. Bei einer expliziten Typzuweisung wäre die Property im Objekt dann 
// z.B. auch vom Typ "dark" | "light" weil im Typ AppConfig die Property das vorschreibt, sondern nur "dark", wenn im Objekt selbst dieser Value für die
// Property zugewiesen wurde.

// Antwort: ✅ Inhaltlich richtig. Nur der letzte Satz hat einen kleinen Formulierungsfehler: Bei der Typannotation wäre 
// `config.mode` z. B. `"dark" | "light"`, bei `satisfies` kann der konkrete Typ `"dark"` erhalten bleiben, sofern die Inferenz ihn so bestimmt.


// 4. Was ist der wesentliche Unterschied zwischen `as SomeType` und `satisfies SomeType`?
// Antwort: as ist nur eine Assertion und prüft nicht zur Typzeit ob die Aufrufe möglich sind, dadurch können Properties mit falschen Werten (vom Typ her)
// verändert werden oder Methoden auf Variablen/Properties aufgerufen werden, die nicht passen. satisfies führt so eine Prüfung zur Typzeit durch.

// Antwort: ⚠️ Grundidee richtig, aber etwas präziser: `as SomeType` sagt TypeScript sinngemäß „Behandle diesen Ausdruck als `SomeType`“. 
// TypeScript führt dabei keine normale Kompatibilitätsprüfung wie bei `satisfies` durch; völlig unvereinbare Assertions können allerdings trotzdem abgelehnt werden. 
// `satisfies SomeType` prüft dagegen ausdrücklich, ob der Ausdruck zu `SomeType` kompatibel ist, ohne seinen resultierenden Typ einfach zu `SomeType` zu machen.


// 5. Was prüft folgender Ausdruck?
/*
const permissions = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"]
} satisfies Record<Role, Permission[]>;
*/
// Antwort: Er prüft, dass permissions wie nach Record<> festgelegt alle Werte von Role als Keys hat und alle Values zu diesen Keys vom Typ Permission[] sind

// Antwort: ✅ Genau. Zusätzlich bedeutet `Permission[]`, dass die Elemente der jeweiligen Arrays nur gültige `Permission`-Werte sein dürfen. 
// Es müssen aber nicht alle möglichen Permissions in jedem Array vorkommen.


// 6. Warum kann folgende Kombination praktisch sein?
/*
const roleLabels = {
    admin: "Administrator",
    editor: "Editor",
    viewer: "Viewer"
} as const satisfies Record<Role, string>;
*/
// Antwort: Weil somit geprüft wird dass roleLabels den Typ Record<Role, string> entspricht und die Properties sicher als Literals inferriert werden (je nach Kontext
// ist das schon nur mit satisfies und ohne as const so, kommt aber darauf an) und readonly sind

// Antwort: ✅ Richtig. `as const` sorgt hier zuverlässig für die sehr engen Literal-Typen `"Administrator"`, `"Editor"` und `"Viewer"` 
// und macht die Properties `readonly`; `satisfies` prüft gleichzeitig die Struktur gegen `Record<Role, string>`.


// 7. Welche Aufgabe übernimmt `as const` und welche Aufgabe übernimmt `satisfies`
// in diesem Ausdruck?
// Antwort: as const macht, dass die Properties als Literals inferiert werden und satisfies dass es dem Typen Record<Role, string> entspricht, somit übernimmt satisfies eine
// Prüfung, was as const nicht macht, und as const beeinflusst nur die Inferierung

// Antwort: ✅ Genau. Ergänzung: `as const` macht bei Objekten die Properties außerdem `readonly` und bei Arrays aus passenden Array-Literalen readonly Tuples. 
// `satisfies` übernimmt die Typ-Kompatibilitätsprüfung und kann zusätzlich Kontext für die Inferenz liefern.


// 8. Führt `satisfies` eine Prüfung zur Runtime durch?
// Antwort: Nein, das verschwindet zur Runtime und dient nur bei der Entwicklung direkt zu Sicherheit.

// Antwort: ✅ Genau. `satisfies` existiert nur im TypeScript-Typsystem und erzeugt keine Runtime-Prüfung im JavaScript.


// 9. Warum ersetzt `satisfies User` keinen Type Guard für Daten,
// die mit response.json() von einer externen API gekommen sind?
// Antwort: Da sie eben keine Runtime Prüfung durchführt und nicht garantieren kann, dass zur Runtime der Typ passt, ist nur zum Entwickeln. Externe Daten werden erst
// zur Runtime extrahiert und benutzt und es kann nicht garantiert werden, dass sie zur Typzeit so aussieht wie "vorgestellt".

// Antwort: ✅ Genau. Externe Daten können zur Runtime beliebig aussehen. Deshalb brauchst du dort echte Runtime-Validierung, 
// z. B. einen Type Guard oder eine Validierungsbibliothek.