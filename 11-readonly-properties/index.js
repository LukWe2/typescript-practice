"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const project01 = {
    id: 1,
    name: "TypeScript project",
    framework: "React",
    status: "development",
    description: "This is a TypeScript Project"
};
project01.name = "JavaScript project";
project01.status = "planning";
project01.description = "This is now a JavaScript Project";
// Cannot assign to 'id' because it is a read-only property.
//project01.id = 2;
let technologies = ["TypeScript", "Git", "Java"];
// Property 'push' does not exist on type 'readonly string[]'.
//technologies.push("Node.js");
// 1. Was schützt readonly bei: readonly id: number;
// Antwort: Es schützt die Veränderung der Property id nach dem Initialiseren, project01.id = 2; würde also nicht funktionieren und einen Fehler geben
// Antwort: Deine Antwort ist richtig: id darf beim Erstellen gesetzt werden, danach aber nicht mehr neu zugewiesen werden.
// 2. Was ist der Unterschied zwischen const und readonly?
// Antwort: const schützt ein Objekt davor dass es nochmal komplett neu neu zugewiesen wird, Properties können immernoch verändert werden. Mit readonly schützt man direkt Properties, dass diese nicht neu zugewiesen oder verändert werden können
// Antwort: Auch richtig. Der entscheidende Unterschied: const schützt die Variable, aber nicht automatisch ihre Properties
// Dagegen schützt: readonly gezielt diese Property
// 3. Warum funktioniert das:
/*
const user = {
    name: "Lukas"
};

user.name = "Anna";
*/
// Antwort: Weil man hier eine Property verändert was auch mit einem const-Objekt möglich ist und nicht das ganze Objekt neu zuweist, was nicht gehen würde
// Antwort: Richtig beantwortet. Du weist user kein komplett neues Objekt zu, sondern veränderst nur den Inhalt des bestehenden Objekts.
// 4. Was bedeutet: readonly string[]?
// Antwort: Das bedeutet, dass dieses string Array nicht verändert werden darf, also nichts in dieses Array z.B. mit push() eingefügt oder mit [index] ein Element des Arrays verändert werden darf
// Antwort: Auch richtig. Es ist ein Array aus Strings, das über diese Referenz nicht verändert werden darf, aber lesen geht
// Eine kleine sprachliche Präzisierung zu deiner Antwort bei Frage 4: Nicht „es darf nichts in diesem Array verändert werden“ im Sinne tief verschachtelter Objekte, sondern erstmal: 
// Die Array-Struktur bzw. seine Elemente können über dieses readonly Array nicht neu gesetzt, hinzugefügt oder entfernt werden. Später sehen wir noch, dass readonly nicht automatisch tief verschachtelte Daten unveränderlich macht.
//# sourceMappingURL=index.js.map