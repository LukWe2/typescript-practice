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
// Antwort: Bei einer let-Variable wird der allgemeine Typ oft von TypeScript inferiert wie bei let status = "loading" wird status als "string" inferiert. Da beim const der string sowieso nicht neu zugewiesen werden kann wird const status als Literal Type "loading" inferiert.
// Antwort:


// 2. Warum inferiert TypeScript bei folgendem Objekt mode normalerweise als string und nicht als Literal Type "dark"?
/*
const config = {
    mode: "dark"
};
*/
// Antwort:
// Antwort:


// 3. Was verändert `as const` bei folgendem Objekt?
/*
const config = {
    mode: "dark",
    retries: 3
} as const;
*/
// Antwort:
// Antwort:


// 4. Was ist der Unterschied zwischen diesen beiden Arrays?
/*
const roles1 = ["admin", "editor", "viewer"];

const roles2 = ["admin", "editor", "viewer"] as const;
*/
// Antwort:
// Antwort:


// 5. Welcher Typ entsteht hier und warum?
/*
const roles = ["admin", "editor", "viewer"] as const;

type Role = typeof roles[number];
*/
// Antwort:
// Antwort:


// 6. Warum ist die Kombination aus `as const`, `typeof` und `[number]` praktisch,
// wenn Runtime-Werte und ein dazu passender Literal-Union-Type benötigt werden?
// Antwort:
// Antwort:


// 7. Was ist der Unterschied zwischen `const` und `as const` bei einem Objekt?
// Antwort:
// Antwort:


// 8. Bedeutet `as const`, dass das Objekt mit Object.freeze() zur Runtime eingefroren wird?
// Antwort:
// Antwort:


// 9. Was ist der inferierte Typ der beiden Variablen ungefähr?
/*
const coordinates1 = [10, 20];

const coordinates2 = [10, 20] as const;
*/
// Antwort:
// Antwort: