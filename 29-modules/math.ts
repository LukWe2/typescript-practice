// wenn man bei den Funktionen hier export weglässt, kommt dieser Fehler in index.ts beim Import, hier für die add-Funktion:
// Module '"./math.js"' declares 'add' locally, but it is not exported.

export function add(number01: number, number02: number): number {

    return number01 + number02;
}

export function multiply(number01: number, number02: number): number {

    return number01 * number02;
}

