import { issues } from "./data.js";
// .find() ist hier doch nicht richtig, weil es zwar das erste übereinstimmende Objekt zurückgeben würde,
// aber die Funktion laut Aufgabenstellung ein Issue[] zurückgeben soll und theoretisch mehrere Issues
// den Suchbegriff im title enthalten können. .find() liefert aber nur das erste passende Element zurück.
//
// Außerdem liefert .find() nur Issue | undefined zurück,
// während wir hier alle passenden Issues als neues Array brauchen.
//
// Deswegen nutzt man hier .filter(), weil .filter() jedes Issue prüft und alle Issues,
// bei denen die Bedingung true ist, in ein neues Issue[] übernimmt.
//
// Mit .includes() prüfen wir, ob der normalisierte Suchbegriff irgendwo im normalisierten title vorkommt.
// Durch .toLowerCase() auf beiden Seiten wird die Suche unabhängig von Groß-/Kleinschreibung.
export function searchIssues(issues, searchTerm) {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const foundIssue = issues.filter((issue) => {
        return issue.title.toLowerCase().includes(normalizedSearchTerm);
    });
    return foundIssue;
}
;
export function filterIssues(issues, filterObject) {
    const filteredIssues = issues.filter((issue) => {
        // undefined weil dann garkeine property status im filterObject gibt und dann "passt es auch"
        const matchesStatus = filterObject.status === undefined || issue.status === filterObject.status;
        const matchesPriority = filterObject.priority === undefined || issue.priority === filterObject.priority;
        // Achtung: assignedOnly legt fest, ob nur Issues mit nicht leeren Assignee String zurückgegeben werden oder alle, wenn true dann nur Issues mit Assignees (also String existiert), wenn false dann auch die ohne Assignees (also wenn String nicht existiert also nicht null ist)
        // dachte vorher wenn assignedOnly false ist, dass dieses Issue garnicht returned werden soll aber ist eben nicht so
        // zweiter Denkfehler: wenn bei || der linke Ausdruck true ist, wird der rechte garnicht mehr geprüft, weil ja es ein OR bzw. ODER ist und wenn eines true ist der gesamte Ausdruck true ist
        // wenn im linken Ausdruck assignedOnly false ist, dann ist der linke Ausdruck true (und somit auch der Gesamtausdruck) und somit wird nicht noch geprüft, ob das assignee String null also nicht vorhanden ist, 
        // weil dann Issues mit und ohne dieses Array ja returned werden sollen (wenn Filter vorher natürlich auch stimmen),
        // wenn der Filter an ist also assignedOnly true ist, dann ist der linke Ausdruck false und es wird noch der rechts Audruck geprüft (wenn links true dann direkt Gesamtausdruck true), wenn dann der rechte Ausdruck true ist, und dieser ist nur true, wenn der assignee String vorhanden ist
        const matchesAssignedOnly = filterObject.assignedOnly !== true || issue.assignee != null;
        return matchesStatus && matchesPriority && matchesAssignedOnly;
    });
    return filteredIssues;
}
;
export function sortIssues(issues, sortBy, order) {
    const sortedIssues = [...issues];
    sortedIssues.sort((a, b) => {
        // Zugriff von Wert zu Propertykeyname mit objekt[propertykeyname] -> Wert dafür, z.B. a["id"] -> 1, b["id"] -> 2, wobei a und b die gerade beiden iterierten Objekte aus Issues Array ist also die zwei Issue
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        // wegen sortyBy: "id" | "title" kann aValue und bValue nur Zahlen oder Strings sein, deswegen kann man narrowen und dann die Werte richtig miteinander vergleichen, nur a > b oder b > a hätten die Objektreferenzen verglichen und hätte nicht funktioniert, braucht Werte 
        if (typeof aValue === "number" && typeof bValue === "number") {
            if (order === "asc") {
                return aValue - bValue;
            }
            else { // dann wäre order gleich "desc"
                return bValue - aValue;
            }
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
            /*
            if (order === "asc"){

                return aValue.localeCompare(bValue);
            } else {

                return bValue.localeCompare(aValue);
            }
            */
            // kürzer und eleganter:
            return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        throw new Error("Unsupported property type");
    });
    return sortedIssues;
}
;
// z.B. paginate(issues, 2, 2); -> Fängt bei Seite 2 an und enthält 2 Elemente pro Seite
// muss also Originalarray von Anfangsindex pageNumber nehmen und splitten bis Anfangspage + Elemente pro Seite * Anfangsseitenzahl also z.B. 2 + 3 * 2 wenn wir auf Seite 2 starten und wir 3 issues auf einer Seite haben
export function paginate(data, page, elementsPerPage) {
    if (page <= 0 || elementsPerPage <= 0) {
        throw new Error("Page and pageSize must be greater than 0");
    }
    // Zahl des Elements im Array (z.B. das Issue im Issues Array) an dem wir starten wollen (z.B. wollen auf Seite 2 starten, dann brauchen wir das Element was auf Seite 2 anfängt), ist auf der Seite wo wir starten * wie viele Elemente eine Seite haben soll, z.B. starten auf Seite 2 und jede Seite hat 3 Elemente, dann starten wir bei Element 3, erste Seite hat 2 Elemente weil wird gerundet
    // weil Arrays 0-basiert sind, noch -1 rechnen (wollen auf Seite 2 starten, das ist aber Index 1, weil Seite 1 = Index 0, Seite 2 = Index 1)
    const startIndex = (page - 1) * elementsPerPage;
    // Zahl des Elements im Array an dem wir aufhören, geben ja eine Seite an auf der wir starten und wie viele Elemente eine Seite haben soll und wollen alle Elemente die auf dieser Seite sind zurückgeben
    const endIndex = startIndex + elementsPerPage;
    const itemsOnDesiredPage = data.slice(startIndex, endIndex);
    return {
        items: itemsOnDesiredPage,
        page: page,
        pageSize: elementsPerPage,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / elementsPerPage)
    };
}
;
export function queryIssues(issues, options) {
    // result als Variable für eine Pipeline, result wird in den if-Statements nur verändert wenn das if-Statement true wird, sonst nicht
    // dadurch können if-Statements übersprungen werden und im nächsten wieder befüllt werden, mit einzelnen neuen Variablen in den if-Statements geht das nicht, brauchen eine Variable die den aktuellen Stand immer festhält
    let result = issues;
    if (options.searchTerm !== undefined) {
        result = searchIssues(result, options.searchTerm);
    }
    ;
    if (options.filter !== undefined) {
        result = filterIssues(result, options.filter);
    }
    ;
    if (options.sortBy !== undefined && options.sortDirection !== undefined) {
        result = sortIssues(result, options.sortBy, options.sortDirection);
    }
    return paginate(result, options.page, options.pageSize);
}
;
//# sourceMappingURL=issueService.js.map