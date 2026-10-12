




























































// 1. Welches Problem löst eine Index Signature und was bedeutet folgende Schreibweise?
/*
type Scores = {
    [username: string]: number;
};
*/
// Antwort: Eine Index Signature löst das Problem, dass man die Property-Namen eines Objekts vorher nicht alle kennt also die Propertykeynamen, 
// aber weiß, welche Typen deren Values haben müssen. Also man weiß z.B. dass die Values aller Propertys eine number sein werden, aber die
// Namen der Keys für die Properties ergeben sich erst oder werden aus einer Datenbank geladen.

// Antwort: Genau richtig. `[username: string]: number` beschreibt ein Objekt mit dynamischen String-Keys, deren Namen zur Typzeit nicht bekannt sein müssen.
// Wenn ein solcher Key vorhanden ist, muss der dazugehörige Value eine `number` sein.


// 2. Welche Teile einer Index Signature beschreiben den Key-Typ und welche den Value-Typ?
/*
[key: string]: number
*/
// Antwort: Bei [key: string]: number beschreibt string den Key-Typ, key ist ein Platzhalter für spätere echte Keynamen und number ist der Typ
// der Values, der immer gleich ist also number sein muss, auch bei expliziten (also nicht dynamischen) Variablen, falls neben dem 
// [key: string]: number noch eine weitere explizite Variable wie id: number drin ist, name: string würde nicht gehen im gleichen Typ!
// Also alle explizit definierten Properties müssen ebenfalls zum Value-Typ der Index Signature 
// passen (Außer man verwendet eine Union oder lagert die dynamischen Properties in ein eigenes verschachteltes Objekt aus).

// Antwort: Richtig. `key` ist dabei nur ein frei wählbarer beschreibender Name für den Index-Parameter; `string` ist der erlaubte Key-Typ und `number` der Value-Typ.
// Weil auch explizit definierte Properties wie `id` oder `name` String-Keys sind, müssen ihre Value-Typen ebenfalls mit `number` kompatibel sein.
// Eine Union erweitert die erlaubten Values auf derselben Ebene; ein verschachteltes Objekt legt dagegen eine neue Ebene an, auf der eine eigene Index Signature gelten kann.


// 3. Was ist der wesentliche Unterschied zwischen einem normalen Objekttyp mit festen Properties
// und einem Objekttyp mit einer String Index Signature?
// Antwort: Bei einem normalen Objekttyp muss man alle Keys also deren Namen schon kennen und festlegen, mit deren Valuetypen. Bei einem Objekttyp mit String Index
// Signature können die Keys bzw. deren Namen dynamisch erstellt werden, müssen aber vom gleichen Typen sein.

// Antwort: Richtig. Beim normalen Objekttyp sind die erlaubten/erforderlichen Property-Namen explizit bekannt. Eine String Index Signature erlaubt dagegen beliebige String-Keys.
// Präziser zum letzten Satz: Die Keys müssen zum angegebenen Key-Typ passen und die dazugehörigen Values müssen alle mit dem angegebenen Value-Typ kompatibel sein.


// 4. Warum verursacht folgende Typdefinition einen Fehler?
/*
type Example = {
    title: string;
    [key: string]: number;
};
*/
// Antwort: Weil die Values der Keys also von title und von den dynamischen Properties die wegen [key: string]: number; möglich sind nicht gleich sind, der Typ des Values
// der expliziten Property title ist string, und der Typ der Values der dynamischen Property/-ies ist vom Type number. Man bräuchte hier einen Union für den Typen
// der dynamischen Properties oder verlagert die Property [key: string]: number in eine verschachtelte Objekt-Property scores also: scores { [key: string]: number }
// title: string ist sozusagen ja sozusagen das gleiche wie key: string und fällt deshalb auch unter diesen dynamischen Key obwohl es eigentlich ein Key und Value ist
// Durch das Union könnte TypeScript wieder richtig erkennen, dass title: string ein explizite Property ist, da es sozusagen unter [title: string]: string | number fällt

// Antwort: Genau richtig. `title` ist selbst ein String-Key und fällt deshalb ebenfalls unter `[key: string]: number`. Die Index Signature verspricht aber, dass hinter jedem String-Key eine `number` steht,
// während `title` ein `string` sein soll. Man kann entweder den Value-Typ der Index Signature erweitern, z.B. auf `string | number`, oder die dynamischen Number-Properties sauber in ein eigenes Objekt wie `scores` auslagern.


// 5. Wie könnte man den Typ aus Frage 4 technisch so verändern,
// dass `title: string` erlaubt wird, und welchen Nachteil hat diese Lösung?
// Antwort: Man könnte eine Union string | number für den Typen der dynamischen Properties benutzen, dann gilt aber allgemein für alle dynamischen Properties dass diese
// vom Typ string | number sind und nicht nur number wie eigentlich beabsichtigt.

// Antwort: Genau. Zum Beispiel `[key: string]: string | number`. Dann ist `title: string` kompatibel.
// Der Nachteil ist, dass nun auch jeder andere dynamische Key einen `string` enthalten darf. Ein Zugriff wie `example[someKey]` liefert entsprechend `string | number`
// (mit `noUncheckedIndexedAccess` gegebenenfalls zusätzlich `undefined`), obwohl man fachlich für die Scores vielleicht eigentlich ausschließlich `number` wollte.


// 6. Was ist der Zusammenhang zwischen diesen beiden Typen?
/*
type A = {
    [key: string]: number;
};

type B = Record<string, number>;
*/
// Antwort: Diese beiden Typen sind fast identisch, da beide beliebige string-Propertykeys und erforderliche number-Values beschreiben, wenn der Key im Record jedoch ein komplexer Typ ist
// dann müssen alle Properties dieses Typs in Record vorhanden sein, bei [key: User]: number nicht.

// Antwort: Der erste Satz ist richtig: Für diesen Anwendungsfall beschreiben beide praktisch dieselbe Dictionary-Struktur: vorhandene String-Keys müssen `number`-Values besitzen.
// Beim zweiten Satz ist eine Korrektur wichtig: Eine Index Signature wie `[key: User]: number` mit einem normalen Objekttyp `User` als Key ist nicht erlaubt.
// Der interessante Unterschied entsteht bei einer festen Key-Union, z.B. `Record<"admin" | "editor", number>`: Dann werden genau diese Keys als erforderliche Properties modelliert.
// Eine normale `[key: string]: number`-Index-Signature beschreibt dagegen dynamische String-Keys und verlangt nicht jeden denkbaren String-Key.


// 7. Was ist der Unterschied zwischen Record<string, number>
// und Record<"admin" | "editor" | "viewer", number>?
// Antwort: Der Unterschied ist, dass beim ersten Typ jeder String als Key genutzt werden kann und beliebig viele, beim zweiten Literal Union müssen und dürfen nur genau diese drei strings
// als Keys benutzt werden, also sie müssen alle drei vorhanden sein und darf nicht mehr Keys haben und nur genau diese Keys.

// Antwort: Im Kern richtig. `Record<string, number>` beschreibt dynamische String-Keys mit `number`-Values und verlangt nicht, dass bestimmte konkrete Strings vorhanden sind.
// `Record<"admin" | "editor" | "viewer", number>` verlangt dagegen mindestens die drei Properties `admin`, `editor` und `viewer`, jeweils mit `number`.
// Bei einem direkt geschriebenen Objektliteral werden zusätzliche unbekannte Keys außerdem durch die Excess-Property-Prüfung beanstandet. Allgemein ist der entscheidende Punkt aber: Die drei Union-Keys sind verpflichtend.


// 8. Warum kann bei aktiviertem noUncheckedIndexedAccess folgender Zugriff
// den Typ number | undefined besitzen?
/*
const score = scores["UnknownUser"];
*/
// Antwort: Weil der Key UnknownUser nicht existieren muss und nicht existieren kann, wodurch der Value zu diesem Key undefined wäre, dann muss man ggf. wieder narrowen.

// Antwort: Richtig, nur sprachlich: Der Key muss nicht existieren bzw. könnte fehlen. Die Index Signature sagt lediglich, dass ein vorhandener Eintrag eine `number` enthält.
// Sie garantiert nicht, dass `"UnknownUser"` tatsächlich vorhanden ist. Deshalb berücksichtigt `noUncheckedIndexedAccess` den möglichen fehlenden Eintrag und ergibt `number | undefined`.


// 9. Warum bedeutet `[key: string]: number` nicht,
// dass wirklich jeder denkbare String-Key im Objekt vorhanden sein muss?
// Antwort: Weil das nicht möglich ist und ein Indexed Signature eben dynamische Objektkeys von einen bestimmten Typ beschreibt und nicht alle möglichen.

// Antwort: Genau. Die Index Signature beschreibt eine Regel für vorhandene Properties: Wenn ein String-Key vorhanden ist, muss sein Value eine `number` sein.
// Sie verlangt nicht, dass jeder theoretisch mögliche String tatsächlich als Property existiert.


// 10. Was bewirkt `readonly` in folgender Index Signature?
/*
type Config = {
    readonly [key: string]: string;
};
*/
// Antwort: Es bewirkt, dass jeder beliebige String als Key gesetzt werden kann von der Property, aber diesen kein neuer Value zugewiesen werden kann außerhalb der Definition.

// Antwort: Richtig. Genauer: Die über die Index Signature beschriebenen Properties dürfen beim Erstellen des Objekts vorhanden sein, aber anschließend kann über diesen Typ keinem Key ein neuer Value zugewiesen werden.
// Zum Beispiel wäre `config["apiUrl"] = "new-url"` nicht erlaubt. `readonly` betrifft also die Values hinter den dynamischen Keys, nicht die Tatsache, dass die Keys Strings sind.