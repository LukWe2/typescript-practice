// 1. Der Aufruf einer async-Funktion startet deren Ausführung.
//    Dabei werden die asynchronen Operationen innerhalb der Funktion dann gestartet,
//    sobald der Programmablauf ihre jeweilige Zeile erreicht.

// 2. Eine async-Funktion gibt nach außen immer ein Promise<T> zurück.
//    Ein Promise<T> steht für das Ergebnis T dieser asynchronen Operation.
//    Wichtig: Das Ergebnis muss nicht zwingend noch fehlen – das Promise kann auch schon fulfilled sein.

// 3. Eine Funktion wie fetch() gibt direkt ein Promise<Response> zurück.
//    Mit await warten wir auf dieses Promise und bekommen danach den aufgelösten Wert:
//    Promise<T> -> await -> T.

// 4. Wenn getUser() intern selbst Promises awaited, wartet getUser() intern auf diese Teilschritte.
//    Nach außen gibt getUser() trotzdem ein eigenes Promise<User> zurück.

// 5. Erst wenn getUser() intern alle nötigen Schritte abgeschlossen und `return user` erreicht hat,
//    wird das äußere Promise<User> von getUser() fulfilled.

// 6. Deshalb:
//    const userPromise = getUser();
//    // getUser läuft bereits, userPromise ist Promise<User>
//
//    const user = await userPromise;
//    // wartet falls nötig auf das Gesamtergebnis von getUser()
//    // danach ist user vom Typ User

// 7. Das Ergebnis, das getUser() letztlich liefert, bestimmen wir selbst mit `return`.
//    In unserem Beispiel ist das der extern geladene und verarbeitete User.

// 8. `await` pausiert nur die aktuelle async-Funktion an dieser Stelle.
//    Es blockiert nicht das gesamte JavaScript-Programm.



























































// 1. Was ist der entscheidende Unterschied zwischen:
//
// const user = await getUser();
// const products = await getProducts();
//
// und:
//
// const userPromise = getUser();
// const productsPromise = getProducts();
//
// const user = await userPromise;
// const products = await productsPromise;
//
// Antwort: Der Unterschied ist, dass im ersten Beispiel bei den ersten beiden Aufrufen der Promise bzw. die asynchrone Arbeit gestartet wird (getUser() und getProducts() sind wiederum async Funktionen die Promises zurückgeben und fullfilled werden) 
// wie nur mit const userPromise = getUser(); im zweiten Beispiel, also es wird direkt ein Promise<T> zurückgegeben, aber der Unterschied ist, dass beim ersten Beispiel direkt awaited wird, 
// also es wird auf das fullfillen des Promises gewartet. Das Problem dabei ist, dass die äußere async-Funktion, in der diese beiden await Aufrufe stehen, dadurch pausiert wird und anderer Code 
// (schon gestartete Promises schon) nicht läuft. D.h. das zweite Promise was mit getProducts() erstellt und verarbeitet wird, wird durch das await in const user = await getUser(); nicht ausgeführt und wartet unnötigerweise.
// Im zweiten Beispiel werden erst beide Promises der async-Funktionen getUser() und getProducts() gestartet, heißt intern können jetzt die wiederum in diesen Funktionen erstellen Promises schon laufen und erfüllt werden
// und die zweite muss nicht auf die erste warten. Erst dann wird erst auf die Erfüllung des userPromise gewartet (also dass innerhalb der getUser() async-Funktion wiederum alle Promises erfüllt und das Ergebnis der Funktion
// returned wurde), wenn dieses erfüllt ist, wird erst die nächste Zeile const products = await productsPromise; ausgeführt und auf das erfüllte Promise gewartet.

// Antwort: Im Kern richtig. Eine wichtige Korrektur: Beim ersten Beispiel läuft nicht „schon gestartete asynchrone Arbeit“ nicht weiter – bereits gestartete Promises bzw. deren Arbeit laufen weiter.
// Das Problem ist vielmehr, dass getProducts() wegen des ersten await noch GAR NICHT aufgerufen und damit auch noch nicht gestartet wurde. Im zweiten Beispiel werden getUser() und getProducts()
// beide zuerst aufgerufen, sodass sich ihre asynchrone Arbeit zeitlich überlappen kann. Erst danach wird awaited. Wenn productsPromise beim zweiten await bereits fulfilled ist, muss dort praktisch nicht mehr gewartet werden.


// 2. Startet `await` selbst eine asynchrone Operation?
// Falls nein: Was startet die asynchrone Operation normalerweise?
//
// Antwort: Nein await startet NICHT die asynchrone Operation, sondern das Callen der async-Funktion. Also z.B. startet const userPromise = getUser(); die asynchrone Operation für getUser() also die Implementation innerhalb von
// getUser() wird ausgeführt, wenn innerhalb derer noch weiter async-Funktionen gecalled werden, werden diese Promises erstellt und fullfilled, bevor dann das Ergebnis für getUser() bereit ist und mit await aufgelöst werden kann.
// Das await wartet nach dem Starten des Promise<T> auf das Ergebnis davon was dann vom Typ T ist. Wenn beide Zeilen jedoch kombiniert werden wie "const user = await getUser();"" statt seperat "const userPromise = getUser();"
// und dann "const user = await userPromise;", dann passiert beides also erst wird durch den Call von getUser() die asynchrone Arbeit gestartet und mit await auf dessen Ergebnis gewartet.

// Antwort: Richtig. Präzisierung: Der Aufruf getUser() startet die Ausführung von getUser() und liefert Promise<User>. Darin können weitere asynchrone Operationen gestartet werden.
// Diese müssen aber nur dann fertig sein, bevor getUser() sein Gesamtergebnis liefert, wenn getUser() tatsächlich auf sie wartet bzw. sein Ergebnis von ihnen abhängt. `await` selbst startet nichts,
// sondern nimmt ein Promise und wartet – falls nötig – auf dessen Fulfillment. `await getUser()` kombiniert also „getUser() starten“ und „direkt auf dessen Promise warten“ in einer Zeile.


// 3. Angenommen:
//
// getUser() dauert 2 Sekunden
// getProducts() dauert 3 Sekunden
//
// Wie lange dauert ungefähr:
//
// const user = await getUser();
// const products = await getProducts();
//
// und warum?
//
// Antwort: Es würde ca. 5 Sekunden dauern, da die Auführung der asynchronen Arbeit und das Erfüllen der dadurch entstehenden Promises nicht synchron bzw. concurrent passieren. Da wir die asynchrone Arbeit mit 
// getUser() starten und direkt awaiten, pausiert die async-Funktion in der diese beiden Calls wiederum stehen und die Zeile const products = await getProducts(); kann nicht gestartet werden. Besser wäre es, wenn die
// Daten nicht voneinander abhängig sind, erst beide asynchrone Arbeiten starten zu lassen mit getUser() und getProducts() ohne await jeweils, und nach den beiden Calls dann nacheinander zu awaiten.

// Antwort: Richtig. Ungefähr 5 Sekunden, weil getUser() zuerst gestartet und sofort awaited wird. Dadurch pausiert die äußere async-Funktion und erreicht den Aufruf getProducts() erst nach ungefähr 2 Sekunden.
// Dann startet getProducts() und dauert weitere ungefähr 3 Sekunden. Wichtig wäre sprachlich: Die beiden Operationen laufen hier nicht concurrent, sondern sequenziell.


// 4. Wie lange dauert ungefähr:
//
// const userPromise = getUser();
// const productsPromise = getProducts();
//
// const user = await userPromise;
// const products = await productsPromise;
//
// bei denselben Zeiten und warum?
//
// Antwort: Hier wurde jetzt der Fall umgesetzt, dass erst beide asynchrone Arbeiten starten weil diese parallel laufen können (wenn nicht voneinander abhängen) mit getUser() und getProducts() ohne await
// und dann nacheinander auf das Ergebnis der Promises, die vorher direkt zurückgegeben wurden, gewartet werden.

// Antwort: Richtig. Die Gesamtdauer beträgt ungefähr 3 Sekunden. getUser() und getProducts() werden direkt hintereinander gestartet und ihre asynchrone Arbeit kann sich zeitlich überlappen.
// Nach ungefähr 2 Sekunden ist userPromise erfüllt. Währenddessen lief productsPromise aber schon ebenfalls ungefähr 2 Sekunden und braucht nur noch ungefähr 1 Sekunde. Insgesamt bestimmt daher ungefähr
// die langsamste unabhängige Operation die Dauer. Präziser als „parallel“ ist bei solchen asynchronen Vorgängen häufig „concurrent“.


// 5. Warum bedeutet `async` nicht automatisch,
// dass mehrere asynchrone Operationen innerhalb
// einer Funktion gleichzeitig laufen?
//
// Antwort: Weil async erstmal nur heißt, dass die Funktion einen Promise zurückgibt und dass man darin await verwenden darf um innerhalb der Funktionen auf weitere asynchrone Operationen warten kann und Promises auflösen kan
// (Achtung: Verschachtelung mit mehreren Ebenen, die äußere asyn-Funktion wartet wenn innerhalb dessen wieder mit await auf Erfüllung von Promises gewartet wird und geht erst weiter wenn ein Ergebnis returned wird)

// Antwort: Grundidee richtig. `async` allein bestimmt nicht, wann mehrere Operationen gestartet werden. Entscheidend ist der Kontrollfluss. Bei `await getUser(); await getProducts();` wird die äußere async-Funktion
// schon nach dem Start von getUser() pausiert und erreicht getProducts() erst später. Werden dagegen erst beide Funktionen ohne await aufgerufen, können beide bereits laufen, bevor die äußere Funktion beim ersten await pausiert.


// 6. Welche Typen haben `userPromise` und `user` hier?
//
// async function getUser(): Promise<User> {
//     // ...
// }
//
// const userPromise = getUser();
// const user = await userPromise;
//
// Antwort: userPromise hat hier den Wert Promise<User>, weil wir die asynchrone Arbeit starten, was einen Promise<T> zurückgibt direkt, und erst mit await dieses Promise also das zukünftige Ergebnis der asynchronen Operation
// (also eine Operation die nicht direkt fertig ist bzw. während welcher anderer Code ausgeführt werden kann) auflösen und den eigentlichen Wert vom Typ User bekommen.

// Antwort: Richtig vom Prinzip. Präziser: userPromise hat den TYP `Promise<User>` und user hat nach dem await den Typ `User`. Das Promise repräsentiert das asynchrone Ergebnis.
// Es muss zu diesem Zeitpunkt nicht zwingend noch pending sein – es könnte auch bereits fulfilled sein. `await` liefert in beiden Fällen den aufgelösten Wert vom Typ User.


// 7. Warum ist folgende Ausführung zwingend sequenziell?
//
// const user = await getUser();
// const posts = await getPostsForUser(user.id);
//
// Antwort: Weil das await dazu führt, dass auf das Erfüllen des Promise, was getUser() erstellt, gewartet wird und die äußere async-Funktion pausiert wird.

// Antwort: Richtig, aber der entscheidende Grund für die NOTWENDIGKEIT der sequenziellen Ausführung ist die Datenabhängigkeit: getPostsForUser() benötigt `user.id`.
// Diese ID ist erst verfügbar, nachdem das Promise von getUser() fulfilled und durch await zu einem User aufgelöst wurde. Deshalb kann getPostsForUser(user.id) vorher noch nicht sinnvoll gestartet werden.


// 8. Angenommen diese drei Funktionen benötigen
// keine Ergebnisse voneinander:
//
// getUser()
// getProducts()
// getSettings()
//
// Können sie gleichzeitig/concurrent gestartet werden?
// Warum?
//
// Antwort: Ja können sie, da die asynchrone Arbeit der drei Funktionen concurrent passieren kann, aber nur wenn sie nicht voneinander abhängig sind bzw. deren Daten, weil sonst nur das Promise und nicht die eigentlichen
// Daten zum Zeitpunkt des Aufrufs der anderen Funktion verfügbar ist, was zu Fehlern führt. Das Callen der async-Funktionen startet die asynchrone Arbeit also das direkte Zurückgeben eines Promise und das eventuell
// spätere Erfüllen wenn der Vorgang dauert. 

// Antwort: Richtig. Wenn keine Funktion ein Ergebnis einer anderen benötigt, können alle drei zunächst aufgerufen werden. Dadurch erhält man drei Promises und die zugrunde liegenden asynchronen Vorgänge können sich zeitlich überlappen.
// Bei einer Datenabhängigkeit müsste dagegen zuerst das benötigte Promise awaited werden, damit der konkrete Wert T – beispielsweise eine user.id – für den nächsten Aufruf verfügbar ist.


// 9. Was passiert bei:
//
// const userPromise = getUser();
// const productsPromise = getProducts();
//
// const user = await userPromise;
// const products = await productsPromise;
//
// wenn productsPromise bereits fulfilled ist,
// bevor `await productsPromise` erreicht wird?
//
// Antwort: Dann ist products trotzdem vom Typ Promise<Products> und der Promise ist erst aufgelöst, wenn await aufgerufen wird.

// Antwort: Hier ist eine wichtige Korrektur: `productsPromise` bleibt zwar ein `Promise<Products>` und ist bereits FULFILLED, aber `products` ist nach `await productsPromise` vom Typ `Products`, nicht Promise<Products>.
// Das Promise wird außerdem nicht erst durch `await` fulfilled. Es kann bereits vorher fulfilled werden. `await` beobachtet hier nur das bereits fertige Promise und liefert dessen gespeichertes Ergebnis praktisch direkt.


// 10. Was ist wichtiger für die Entscheidung,
// ob Async-Operationen sequenziell oder concurrent
// ausgeführt werden sollen:
//
// - dass die Funktionen `async` sind
// oder
// - ob eine Datenabhängigkeit zwischen ihnen besteht?
//
// Begründe.
//
// Antwort: Dass die Datenabhängigkeit zwischen ihnen besteht. Das führt zu Fehler, während ob die Funktionen async sind sowieso erfüllt sein muss.

// Antwort: Der erste Satz ist richtig: Entscheidend ist die Datenabhängigkeit. Benötigt Operation B das Ergebnis von A, muss A zunächst ausreichend weit abgeschlossen sein.
// Benötigt B nichts von A, können beide häufig concurrent gestartet werden. Kleine Korrektur: Das `async`-Keyword selbst ist dafür nicht entscheidend. Auch eine normale Funktion kann ein Promise zurückgeben.
// Entscheidend ist, dass wir mit asynchronen Ergebnissen/Promises arbeiten und ob die Operationen voneinander abhängig sind.


// 11. Was bedeutet in diesem Zusammenhang:
//
// "Promise erzeugen/starten"
//
// im Unterschied zu:
//
// "Promise awaiten"?
//
// Antwort: Der Unterschied ist dass Promise erzeugen/starten mit dem Call der async-Funktion startet und direkt einen Promise<T> vom Typ T zurückgibt, während Promise awaiten dann die tatsächlichen Daten auflöst also
// dann hat man Daten vom Typ T. Wichtig zu wissen ist aber, dass die asynchrone Arbeit in der gecallten async-Funktion schon fertig sein kann und trotzdem noch vom Typ Promise<T> ist, und dann erst mit await die eigentlichen
// Daten vom Typ T zur Verfügung stehen, oder wenn die asynchrone Arbeit zum Callen von await noch nicht fertig ist, dass dann an dieser Stelle darauf gewartet wird.

// Antwort: Sehr gut, nur eine Formulierung korrigieren: Der Aufruf gibt ein `Promise<T>` zurück – nicht „ein Promise<T> vom Typ T“. Das Promise selbst hat den Typ `Promise<T>`.
// Die asynchrone Arbeit kann anschließend schon fertig werden, ohne dass wir das Promise bereits awaited haben. Dann ist das Promise fulfilled. Beim späteren `await` bekommen wir T direkt.
// Ist es noch pending, pausiert die aktuelle async-Funktion beim await so lange, bis das Promise fulfilled wird.


// 12. Warum kann folgende Variante unnötig langsam sein,
// wenn beide Operationen unabhängig voneinander sind?
//
// const user = await getUser();
// const settings = await getSettings();
//
// Antwort: Weil bei beiden die asynchrone Arbeit gestartet und direkt awaited wird, statt erst beide zu starten und dann nacheinander zu awaiten. Deshalb muss erst das Promise des ersten Call fullfilled sein 
// bevor die asynchrone Arbeit des zweiten überhaupt gestartet wird, was synchron gehen würde.

// Antwort: Richtig bis auf das letzte Wort: Es würde nicht „synchron“, sondern CONCURRENT gehen. In der gezeigten Variante startet getUser(), danach pausiert die äußere Funktion beim await.
// Erst wenn getUser() fertig ist, wird getSettings() überhaupt aufgerufen. Sind beide unabhängig, kann man zuerst `const userPromise = getUser();` und `const settingsPromise = getSettings();` ausführen
// und erst danach beide Promises awaiten. Dadurch kann sich ihre asynchrone Arbeit zeitlich überlappen.