function sayHello(): void {

    console.log("Hallo!");
}

function execute(callback: () => void): void {

    callback();
}


// Arten jetzt sayHello bzw. deren Logik als Callback Funktion in execute aufzurufen:
execute(sayHello);

execute(() => {

    console.log("Hallo!");
});


//-------------------------------------------------------------------------------------------------


function doubleValue(value: number): number {

    return value * 2;
}

const numbers = [2, 4, 7, 1];

numbers.map(doubleValue);

numbers.map((value) => {

    return value * 2;
});




//-------------------------------------------------------------------------------------------------


// Funktion, die später vom Promise als `resolve`-Funktion bereitgestellt wird, wird von uns NICHT selbst geschrieben.
// Wir definieren nur eine Callback-Funktion, die diese Funktion als Parameter bekommt.
// new Promise() setzt dann sozusagen in seiner internen Implementation innerhalb von handlePromise() etwas für die Funktion resolve() ein, so wie wir doubleValue zu .map() übergeben können,
// und .map() dann in seiner internen Implementation für value etwas einsetzt
// Also wir übergeben eine Callback-Funktion, die wiederum eine Funktion als Parameter hat, das ist für .map() nicht so, da übergeben wir eine Funktion, die eine Variable als Parameter hat
// das muss zu der internen Implementation der äußeren Funktion, also der Funktion, der wir die Callback-Funktion übergeben, passen, .map() erwartet als Parameter eine Funktion, die eine Variable als Parameter hat, newe Promise() erwartet
// als Parameter eine Funktion, die wiederum eine Funktion als Parameter hat

function handlePromise(resolve: (value: string) => void): void {

    resolve("Lukas");
}


// Variante mit expliziter Callback-Funktion:
new Promise<string>(handlePromise);


// Variante mit inline Callback-Funktion:
new Promise<string>((resolve) => {

    resolve("Lukas");
});


