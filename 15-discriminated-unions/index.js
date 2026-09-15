const loadingObject = {
    status: "loading"
};
const successObject = {
    status: "success",
    data: ["data01", "data02", "data03"]
};
const errorObject = {
    status: "error",
    message: "There is an error in the program!"
};
/*
// Type '{ status: "success"; }' is not assignable to type 'ApiState'. Property 'data' is missing in type '{ status: "success"; }' but required in type 'SuccessState'.
const invalidState: ApiState = {
    status: "success"
};
*/
function handleApiState(state) {
    switch (state.status) {
        case ("loading"):
            console.log("Loading...");
            /*
            // Property 'data' does not exist on type 'LoadingState'. -> erkennt Type LoadingState und dass es nicht SuccessState ist wegen state.status = "loading"
            console.log(`Status data (incorrect here just for test): ${state.data}`);
            */
            break;
        case ("success"):
            console.log(`Data: ${state.data}`);
            break;
        case ("error"):
            console.log(`Error message: ${state.message}`);
            break;
    }
}
;
handleApiState(loadingObject);
handleApiState(successObject);
handleApiState(errorObject);
export {};
// 1. Was ist der Discriminator bei:
/*
type Result =
    | { status: "success"; data: string }
    | { status: "error"; message: string };
*/
// Antwort: Der Discriminator ist hier status, da diese Property später in Zweigen abgefragt wird und entscheidet von welchem Typ die Variable oder das Objekt ist
// Antwort: Noch präziser: status ist die gemeinsame Property aller Union-Mitglieder, deren unterschiedliche Literal-Werte TypeScript zur Unterscheidung verwendet.
// 2. Warum weiß TypeScript hier, dass result.data existiert?:
/*
if (result.status === "success") {
    console.log(result.data);
}
*/
// Antwort: Weil wir mit result.status gleich "success" checken, ob das gecallete Objekt diesen Discriminator also die Property mit diesem Wert besitzt, und TypeScript weiß durch unsere Definition, dass das Objekt dann auch result.data besitzt
// 3. Was ist der Vorteil einer Discriminated Union gegenüber:
/*
type State = {
    status: "loading" | "success" | "error";
    data?: string[];
    message?: string;
};
*/
// Antwort: Der Vorteil ist dass durch so ein ein großes Objekt mit optionalen Properties unsinnige Kombinationen erstellen könnte wie ein Ladestatus der auch eine Error Message hat, was keinen Sinn ergibt. Au0erdem ist eine Discriminated Union viel leserlicher.
// Antwort: Eine Discriminated Union modelliert dagegen direkt: loading → nur Loading-Daten, success → muss data besitzen, error → muss message besitzen
// 4. Was muss die gemeinsame Discriminator-Property besitzen, damit TypeScript die Varianten gut unterscheiden kann?
// Antwort: Sie müssen unterschiedliche Literal Types besitzen also Werte innerhalb der gemeinsamen Discriminator-Property, sie sollten natürlich nicht gleich sein sonst ist der Sinn dieser Vergleichs-Property hinfällig
//# sourceMappingURL=index.js.map