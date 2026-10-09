// soll alle enrollments für diesen Kurs als Array zurückgeben -> ein enrollment ist eine Einschreibung eines Studenten in einen Kurs, heißt ein enrollment hat eine Studenten-Id (keinene Studentennamen, erst über studentId kommt man  zum passenden Student-Objekt und damit zum Namen!), eine Kurs-ID usw.
// jedes enrollment hat eine property courseId, die angibt in welchem Kurs dieses enrollment ist, jeder Kurs hat eine id, die den Kurs spezifiziert
// heißt muss die courseId von enrollment auf die id vom gesuchten Kurs mappen, dessen id hier als courseId angegeben ist -> Achtung verwirrend: die property von Enrollment heißt courseId und die übergebene Variable für die id des Course Objekts heißt hier auch courseId
// also id von Kurs ist hier courseId ebenfalls -> verwirrend!
// heißt muss schauen, welcher Kurs liegt vor und durch enrollments iterieren und mit courseId der enrollments vergleichen
export function getEnrollmentsForCourse(enrollments, courseId) {
    const enrollmentsForCourse = enrollments.filter((enrollment) => {
        return enrollment.courseId === courseId;
    });
    return enrollmentsForCourse;
}
;
// soll alle die Studenten Objekte zurückgeben (nicht Enrollment oder so), die gerade im mit courseId übergebenem Kurs eingeschrieben sind, und gerade den status "enrolled" haben, andere NICHT
// komme über die übergebene courseId im Methodenkopf auf die enrollments für diesen Kurs und über die enrollments dann auf die Studenten und dann noch prüfen ob diese "enrolled" sind
export function getCurrentlyEnrolledStudents(students, enrollments, courseId) {
    // kann vorher implementierte Methode nutzen um erstmal die enrollments für den übergebenen Kurs zu bekommen, da ich nur über diese an die Studenten komme die im Kurs sind, kann nicht direkt vom Kurs zu eingeschriebene Studenten kommen weil
    // Studenten keine property haben, die beschreibt in welche Kurse sie drin sind, das geht nur über die Enrollments
    const enrollmentsForCourse = getEnrollmentsForCourse(enrollments, courseId);
    // struggle jetzt damit, nachdem ich die enrollments für den Kurs habe, jetzt die Students mit den ids zu bekommen, die in enrollments als studentId eingetragen ist und zu den id in den students mit Typ Student passt
    // also wie war es nochmal das hatten wir in einer anderen Aufgabe wenn ich keine doppelte Schleife will aber trotzdem prüfen will, ob ein Wert für eine Property in einem Typ mit dem Wert einer Property in einem anderen Typen übereinstimmt?
    const enrolledStudents = students.filter((student) => {
        return enrollmentsForCourse.some((enrollment) => {
            return (enrollment.studentId === student.id &&
                enrollment.status === "enrolled"
            // enrollment.courseId === courseId; muss ich nicht mehr prüfen, weil ich mir schon alle enrollments für den Kurs geholt habe mit getEnrollmentsForCourse(), indem das geprüft und zurückgegeben wird
            );
        });
    });
    return enrolledStudents;
}
;
export function enrollStudent(students, courses, enrollments, studentId, courseId, newEnrollmentId, enrolledAt) {
    // wie in letzter Aufgabe: .find() returned das erste Element auf das Bedingung zutrifft, hier für das die übergebene studentId zur id eines Studenten passt, .find() returned außerdem nur ein Studenten Objekt und nicht wie .filter() ein Array aus allen passenden Studenten Objekten
    const desiredStudent = students.find((student) => student.id === studentId);
    const desiredCourse = courses.find((course) => course.id === courseId);
    // zähle wie viele Enrollments es für den angefragten Kurs gibt, wenn diese Zahl größer oder gleich ist als capacity kann nicht noch ein enrollment für Kurs gemacht werden also kein Student mehr in Kurs eingeschrieben werden (Einschreibung von Student wird ja über enrollments gesteuert)
    let enrollmentCountInCourse = 0;
    for (const enrollment of enrollments) {
        if (enrollment.courseId === courseId && enrollment.status === "enrolled") {
            enrollmentCountInCourse += 1;
        }
    }
    //ginge auch:
    /*
    let enrollmentCountInCourse = getEnrollmentsForCourse(enrollments, courseId).length; ->muss dann aber noch nur die enrollments mit status "enrolled" nehmen:
    
    const enrollmentCountInCourse = getEnrollmentsForCourse(enrollments, courseId)
            .filter((enrollment) => {
                return enrollment.status === "enrolled";
            })
            .length;

                const enrollmentCountInCourse = getEnrollmentsForCourse(enrollments, courseId).filter((enrollment) => { return enrollment.status === "enrolled";}).length;
    */
    const currentlyEnrolledStudentsForCourse = getCurrentlyEnrolledStudents(students, enrollments, courseId);
    if (desiredStudent !== undefined && desiredStudent.active === true && desiredCourse !== undefined && desiredCourse.capacity > enrollmentCountInCourse && !currentlyEnrolledStudentsForCourse.includes(desiredStudent)) {
        const newEnrollmentsArray = [...enrollments];
        const newEnrollment = {
            id: newEnrollmentId,
            studentId: desiredStudent.id,
            courseId: courseId,
            status: "enrolled",
            enrolledAt: enrolledAt
        };
        newEnrollmentsArray.push(newEnrollment);
        return newEnrollmentsArray;
        //oder einfach direkt:
        /*
        return [
            ...enrollments,
            newEnrollment
        ];
        */
    }
    else {
        throw new Error("Student existiert nicht oder ist nicht aktiv, oder Kurs existiert nicht oder hat keine Kapazität mehr!");
    }
}
;
// wollen jetzt ein bestehendes enrollment Objekt aus dem enrollments Array verändern und mit dem alten austauschen (die ursprünglichen aber auch in neues Array), statt dem Array einfach ein neues enrollment Objekt einzufügen wie bei enrollStudent(), da wollten wir ja nur ein neues enrollment Objekt in das enrollments Array einfügen
export function completeEnrollment(enrollments, enrollmentId, completedAt, grade) {
    const desiredEnrollment = enrollments.find((enrollment) => enrollment.id === enrollmentId);
    if (desiredEnrollment === undefined || desiredEnrollment?.status !== "enrolled") {
        throw new Error("Kein enrollment zu dieser id gefunden oder ausgewählts enrollment ist nicht von Status \"enrolled\"");
    }
    // erst enrollment verändern also auf completed setzen
    const completedEnrollment = {
        // mit Spread Operator ... wird bisheriges Objekt kopiert in neues Objekt completedEnrollment
        ...desiredEnrollment,
        // erst status auf completed verändern/setzen von "enrolled" auf "completed"
        status: "completed",
        // dann neue zusätzliche Properties setzen, die ein enrollment vom Typ EnrollmentCompleted verlangt
        completedAt: completedAt,
        grade: grade
    };
    const arrayWithCompletedEnrollment = enrollments.map((enrollment) => {
        if (enrollment.id === enrollmentId) {
            return completedEnrollment;
        }
        return enrollment;
    });
    return arrayWithCompletedEnrollment;
}
;
// wollen auch hier ein enrollement Objekt im enrollements Array verändern und mit altem austauchen (die ursprünglichen aber auch in neues Array), aber nur ein enrollement das als Status "enrolled" hat, darf gedroppt werden also auf Status "dropped" umgestellt werden
// Ziel ist also wieder das zu veränderte enrollment Objekt erst zu finden, dann den status zu verändern und die zusätzlichen Properties hinzufügen (müssen auch welche verändert werden, hier glaube ich nicht aber wie würde man das machen, kann man Properties entfernen?)
export function dropEnrollment(enrollments, enrollmentId, droppedAt, reason) {
    const desiredEnrollment = enrollments.find((enrollment) => enrollment.id === enrollmentId);
    if (desiredEnrollment !== undefined && desiredEnrollment.status === "enrolled") {
        const nowDroppedEnrollment = {
            ...desiredEnrollment,
            status: "dropped",
            droppedAt: droppedAt,
            reason: reason
        };
        const arrayWithNowDroppedEnrollment = enrollments.map((enrollment) => {
            if (enrollment.id === enrollmentId) {
                return nowDroppedEnrollment;
            }
            return enrollment;
        });
        // ohne das explizite Typzuweisen: const nowDroppedEnrollment: Enrollment gibt es hier einen Fehler dass der Typ nicht passt, weil ...
        return arrayWithNowDroppedEnrollment;
    }
    else {
        throw new Error("Kein enrollment zu dieser id gefunden oder ausgewählts enrollment ist nicht von Status \"enrolled\"");
    }
}
;
export function getCourseSummary(courses, enrollments, courseId) {
    const desiredCourse = courses.find((course) => course.id === courseId);
    if (desiredCourse !== undefined) {
        const courseCurrentlyEnrolled = getEnrollmentsForCourse(enrollments, courseId).filter((enrollment) => {
            return enrollment.status === "enrolled";
        });
        const completedEnrollmentsCountForCourse = getEnrollmentsForCourse(enrollments, courseId).filter((enrollment) => {
            return enrollment.status === "completed";
        });
        const droppedEnrollmentsCountForCourse = getEnrollmentsForCourse(enrollments, courseId).filter((enrollment) => {
            return enrollment.status === "dropped";
        });
        return {
            courseId: desiredCourse?.id,
            courseTitle: desiredCourse?.title,
            capacity: desiredCourse?.capacity,
            currentlyEnrolled: courseCurrentlyEnrolled.length,
            completedCount: completedEnrollmentsCountForCourse.length,
            droppedCount: droppedEnrollmentsCountForCourse.length,
            availableSeats: desiredCourse?.capacity - courseCurrentlyEnrolled.length
        };
    }
    else {
        throw new Error("No course with this id!");
    }
}
;
// muss für den Studenten seine enrollments holen, dann prüfen welche davon abgeschlossen sind und dann die Credits, die aber widerum nur in den Kursen stehen zusammenzählen, brauche also erst die Enrollments für einen Studenten, und dann die Credits für den jeweiligen Kurs
export function getCompletedCredits(courses, enrollments, studentId) {
    // hole mir erst die enrollments für den Studenten mit der übergebenen studentId
    const completedAndEnrollmentsForStudent = enrollments.filter((enrollment) => enrollment.studentId === studentId).filter((enrollment) => enrollment.status === "completed");
    // jetzt die Kurse für diese enrollments holen also die Kurse durchgehen und die id nehmen und mit den courseIds der enrollments für den Studenten (enrollmentsForStudent) vergleichen und diese zurückgeben aber nicht doppelt
    const coursesForEnrollmentsOfTheStudent = courses.filter((course) => {
        // Über enrollment bekommt man dessen verbundenen Kurs mit courseId, nicht nur mit id von enrollment wie vorher hier implementiert war, id bei course stimmt aber (nur id bei enrollment war falsch, sollte courseId sein, beides existiert aber courseId identifiziert den Kurs über das Enrollment, id ist bei enrollment nur id des enrollment)
        return completedAndEnrollmentsForStudent.some((enrollment) => enrollment.courseId === course.id);
    });
    let creditCountForCourses = 0;
    // Kurse sind ja schon abgeschlossen druch completedAndEnrollmentsForStudent, deswegen muss hier nicht nochmal prüfen
    for (const course of coursesForEnrollmentsOfTheStudent) {
        // muss hier die credits des Kurses addieren und nicht nur +1 wie vorher, so würde man nur die abgeschlossenen Kurse also die Anzahl dieser holen aber nicht die Creditanzahl
        creditCountForCourses += course.credits;
    }
    ;
    return creditCountForCourses;
}
;
export function getStudentsWithMinimumCredits(students, courses, enrollments, minimumCredits) {
    // gehe durch alle Studenten durch und berechne in .filter() Methode die Credits für den gerade iterierten Student und returne diesen nur, wenn eben dieser die Mindestanzahl an Credits hat
    const studentsWithMinimumCredits = students.filter((student) => {
        const creditsOfStudent = getCompletedCredits(courses, enrollments, student.id);
        if (creditsOfStudent >= minimumCredits) {
            return student;
        }
    });
    return studentsWithMinimumCredits;
}
//# sourceMappingURL=enrollmentService.js.map