// 1.

const roles = ["admin", "editor", "viewer"];

// Typ von RoleWithoutConstAssertion ohne Const Assertion (also as const): type RoleWithoutConstAssertion = string
type RoleWithoutConstAssertion = typeof roles[number];

// 2.

// Typ von rolesWithConstAssertion mit Const Assertion as const: const rolesWithConstAssertion: readonly ["admin", "editor", "viewer"]
const rolesWithConstAssertion = ["admin", "editor", "viewer"] as const;

// ohne das [number] ist Role gleich type Role = readonly ["admin", "editor", "viewer"], wir wollen aber dass ein Objekt/Wert vom Typ Role nicht das gesamte Tupel mit genau diesen drei Werten sein muss
// sondern nur einer der drei Werte, das erreicht man mit dem [number], also insgesamt:
type Role = typeof rolesWithConstAssertion[number];

// 3. 

function printRole(role: Role): void {

    console.log("Rolle: ", role);
};

// ohne das [number] oben nach rolesWithConstAssertion im Role Typ Deklaration kommt dieser Fehler: Argument of type 'string' is not assignable to parameter of type 'readonly ["admin", "editor", "viewer"]'.
// weil eben ein Objekt/Wert dieses Typs das gesamte Tupel sein muss wenn der Typ so deklariert wurde: type Role = typeof rolesWithConstAssertion;
// mit type Role = typeof rolesWithConstAssertion[number]; muss es eben nur einer dieser Strings sein und so gehen diese Aufrufe:
printRole("admin");
printRole("editor");
printRole("viewer");

// Argument of type '"superadmin"' is not assignable to parameter of type
// '"admin" | "editor" | "viewer"'.
//printRole("superadmin");

// 4. 

// TypeScript inferiert hierfür Typ: const appConfig: { mode: string; retries: number; logging: boolean; }
// also mode als string und nicht als "dark", obwohl wir diese Property warscheinlich als Literal haben wollen
// und das trotz dessen, dass appConfig const ist, weil dies verhindert ja nur die neue Zuweisung des Objekts, nicht aber die Veränderung der Properties
const appConfig = {

    mode: "dark",
    retries: 3,
    logging: true
};

// dieser Veränderungen sind trotz des const vor appConfig möglich:
appConfig.mode = "light";
appConfig.retries = 5;
appConfig.logging = false;

// 5.

// Typ mit Const Assertion as const: const strictAppConfig: { readonly mode: "dark"; readonly retries: 3; readonly logging: true;}
// also die Properties sind erstens readonly und zweitens ist mode jetzt das Literal "dark" vom Typ und nicht mehr string wie ohne
const strictAppConfig = {

    mode: "dark",
    retries: 3,
    logging: true
} as const;


// Kann Properties mode und retries nicht verändern, weil sie durch as const readonly sind: Cannot assign to 'mode' because it is a read-only property.
// Cannot assign to 'retries' because it is a read-only property.
//strictAppConfig.mode = "light";
//strictAppConfig.retries = 5;


// 6. 

// Typ von coordinates Array ohne as const: const coordinates: number[] 
// -> irgendein Array von numbers wenn man einen Typ daraus ableiten würde, z.B. type CoordinatesFree = typeof coordinates
const coordinates = [10, 20];

// Typ von coordinatesAsConst Array mit as const: const coordinatesAsConst: readonly [10, 20] 
// -> also genau dieses Tupel wenn man aus coordinatesAsConst einen Typen ableiten würde, z.B. type CoordinatesFixed = typeof coordinatesAsConst
const coordinatesAsConst = [10, 20] as const;

// 7.

const apiStatuses = ["idle", "loading", "success", "error"] as const;

// Typ ApiStatuses ist dann: type ApiStatuses = "idle" | "loading" | "success" | "error"
// also auch anders als oben beschrieben wenn wir nur type CoordinatesFixed = typeof coordinatesAsConst ohne das "[number]" machen, kann wird genau diese
// Abfolge von Werten als TYP erwartet, mit diesem Indexed Access wird der Typ zu einem Union Type also kann nur einer dieser Werte annehmen, muss nicht alle
type ApiStatuses = typeof apiStatuses[number];

// 8.

function setApiStatus(status: ApiStatuses): void {

    console.log("Set status: ", status);
};

setApiStatus("idle");
setApiStatus("loading");
setApiStatus("success");
setApiStatus("error");

// Fehler bei ungültigem Statuswert: Argument of type '"launched"' is not assignable to parameter of type '"idle" | "loading" | "success" | "error"'.
//setApiStatus("launched");

// const alleine reicht bei Arrays und Objekten nicht aus, um deren Inhalte als Literal Types zu behalten,
// weil die Properties bzw. Array-Inhalte trotz const noch verändert werden können.
// as const sorgt zur Typzeit dafür, dass die konkreten Literal Types erhalten bleiben und die Struktur readonly wird.
//
// as const garantiert aber keine Runtime-Unveränderlichkeit.
// Beim Kompilieren wird `as const` entfernt und JavaScript kennt diese TypeScript-readonly-Regel nicht.
// Das Objekt bzw. Array wird dadurch zur Runtime nicht automatisch mit Object.freeze() eingefroren.





// 1. Was ist der Unterschied zwischen der Type Inference bei let status = "loading" und const status = "loading"?
// Antwort: Bei einer let-Variable wird der allgemeine Typ oft von TypeScript inferiert wie bei let status = "loading" wird status als "string" inferiert. 
// Da beim const der string sowieso nicht neu zugewiesen werden kann wird const status als Literal Type "loading" inferiert.

// Antwort: Richtig. Bei `let status = "loading"` führt TypeScript Literal Widening durch und inferiert `string`, weil später auch `"success"` oder andere Strings 
// zugewiesen werden könnten. Bei `const status = "loading"` kann die Variable nicht neu zugewiesen werden, 
// deshalb kann TypeScript den spezifischen Literal Type `"loading"` behalten.


// 2. Warum inferiert TypeScript bei folgendem Objekt mode normalerweise als string und nicht als Literal Type "dark"?
/*
const config = {
    mode: "dark"
};
*/
// Antwort: Weil mode trotz des const immmernoch verändert werden kann und jeden String annehmen kann. Das const verhindert hier nur, 
// dass das Objekt nicht neu zugewiesen werden kann.
// wenn man möchte, dass der Literal "dark" inferiert wird, muss man noch ein "as const" ans Ende nach der Klammer stellen, 
// dann inferiert TypeScript die Properties als Read only und die Strings als Literals.

// Antwort: Genau richtig. `const` schützt nur die Variable `config` vor einer Neuzuweisung auf ein anderes Objekt. `config.mode` selbst ist weiterhin veränderbar, 
// weshalb TypeScript `mode` zu `string` widened. Mit `as const` wird dagegen `mode` als Literal Type `"dark"` inferiert und die Property wird `readonly`.


// 3. Was verändert `as const` bei folgendem Objekt?
/*
const config = {
    mode: "dark",
    retries: 3
} as const;
*/
// Antwort: Es verändert dass mode von TypeScript nicht als string sondern als Literal "dark" inferiert wird, außerdem werden die Properties alle readonly.

// Antwort: Richtig. Zusätzlich wird auch `retries` nicht als allgemeines `number`, sondern als Literal Type `3` inferiert. 
// Der Typ ist also ungefähr `{ readonly mode: "dark"; readonly retries: 3 }`. Das betrifft das TypeScript-Typsystem und verändert die Runtime-Werte nicht.


// 4. Was ist der Unterschied zwischen diesen beiden Arrays?
/*
const roles1 = ["admin", "editor", "viewer"];

const roles2 = ["admin", "editor", "viewer"] as const;
*/
// Antwort: Beim ersten Array ist der Typ des Arrays string[], jedes Element kann also jeden beliebigen String annehmen. Beim zweiten Array ist der Type
// readonly ["admin", "editor", "viewer"], weil as const die Literals als Typen in ein Tupel nimmt. 
// Dann muss aber ein Array der einen aus diesem Array abgeleiteten Typ hat genau diese drei Literals
// besitzen. Wenn man möchte, dass es ein Union Type aus den drei strings ist also "admin" | "editor" |"viewer", dann muss bei der Typableitung aus dem Objekt als
// typeof roles2[number] erstellt werden.

// Antwort: Richtig. `roles1` wird als `string[]` inferiert, `roles2` dagegen als `readonly ["admin", "editor", "viewer"]`. 
// Wenn du `type Roles = typeof roles2` schreibst, beschreibt `Roles` genau dieses gesamte readonly Tupel mit fester Länge, 
// Reihenfolge und Literal Types. Mit `type Role = typeof roles2[number]` bekommst du dagegen den Typ EINES beliebigen Elements: `"admin" | "editor" | "viewer"`.


// 5. Welcher Typ entsteht hier und warum?
/*
const roles = ["admin", "editor", "viewer"] as const;

type Role = typeof roles[number];
*/
// Antwort: Der Type Role ist "admin" | "editor" |"viewer", da erst durch as const TypeScript den Typ von roles nicht als string[] (wie ohne das as const) inferiert,
// sondern als Literal Tupel. Durch das typeof wäre der Typ Role dann dieses Literal Tupel also ein Objekt was von diesem Typ wäre, müsste genau diese drei Strings enthalten,
// da aber noch [number] hintendran steht, wird der Typ einem Union Type also jedes Element im Array kann einen der drei Strings sein, 
// anstatt nur drei Strings und genau diese drei wie ohne das [number].

// Antwort: Das Ergebnis `"admin" | "editor" | "viewer"` ist richtig. Kleine Präzisierung: `typeof roles` ergibt 
// den Typ des gesamten Tupels `readonly ["admin", "editor", "viewer"]`. `[number]` „wandelt“ diesen Typ nicht einfach in eine Union um, 
// sondern ist ein Indexed Access Type: Er fragt nach dem Typ, der an irgendeinem numerischen Index des Tupels vorkommen kann. Da Index 0 `"admin"`, 
// Index 1 `"editor"` und Index 2 `"viewer"` enthält, entsteht daraus die Union `"admin" | "editor" | "viewer"`. `Role` beschreibt danach einen einzelnen Wert, kein Array.


// 6. Warum ist die Kombination aus `as const`, `typeof` und `[number]` praktisch,
// wenn Runtime-Werte und ein dazu passender Literal-Union-Type benötigt werden?
// Antwort: Weil es eben genau das erstellt, as const lässt TypeScript den Literal Type inferrieren, typeof lässt einen Typ daraus ableiten und [number] wandelt den Literal Type
// zu einem Union Type um.

// Antwort: Im Kern richtig. Präziser: `as const` erhält die einzelnen Literal Types und macht aus dem Array ein readonly Tupel, `typeof` holt dessen inferierten 
// Typ auf die Type-Ebene und `[number]` liest den Typ eines beliebigen numerischen Elements aus. Dadurch entsteht die Union aller möglichen Elementtypen. 
// Der große Vorteil ist, dass Runtime-Liste und Type nicht doppelt gepflegt werden müssen.


// 7. Was ist der Unterschied zwischen `const` und `as const` bei einem Objekt?
// Antwort: const sagt nur dass das Objekt nicht neu zugewiesen werden darf, as const wandelt die Properties des Objekts in readonly und Literal Types um.

// Antwort: Genau. Etwas präziser formuliert: `const` verhindert die Neuzuweisung der Variable, die Properties des Objekts bleiben aber grundsätzlich veränderbar. 
// `as const` beeinflusst zusätzlich die Type Inference: Die Properties werden als `readonly` und ihre Werte möglichst als konkrete Literal Types inferiert.


// 8. Bedeutet `as const`, dass das Objekt mit Object.freeze() zur Runtime eingefroren wird?
// Antwort: Nein as const verschwindet zur Runtime wieder und bewirkt keine Typisierung zur Runtime wie Object.freeze().

// Antwort: Die erste Hälfte ist genau richtig: `as const` wird beim Kompilieren entfernt und friert zur Runtime nichts ein. Kleine Korrektur: 
// `Object.freeze()` ist keine „Typisierung zur Runtime“, sondern eine echte JavaScript-Runtime-Operation, die ein Objekt gegen bestimmte Änderungen einfriert. 
// `as const` dagegen ist nur eine TypeScript-Regel zur Compile Time.


// 9. Was ist der inferierte Typ der beiden Variablen ungefähr?
/*
const coordinates1 = [10, 20];

const coordinates2 = [10, 20] as const;
*/
// Antwort: coordinates1 ist vom Typ number[] und corrdiantes2 ist [10, 20] also als Literal Type. Wie bei Strings führt das as const dazu dass TypeScript die Elemente als
// Literal Types interpretiert.

// Antwort: Richtig. Ganz genau ist `coordinates1` ungefähr `number[]`, während `coordinates2` als `readonly [10, 20]` inferiert wird. 
// Es ist also nicht nur ein Tupel mit den Literal Types `10` und `20`, sondern zusätzlich `readonly`.