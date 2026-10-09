export type Student = {

    id: number,
    name: string,
    email: string,
    active: boolean
};

// capactity beschreibt wie viele Studenten in einem Kurs sein dürfen, wobei abgeschlossene/completed oder abgebrochene/dropped Einschreibungen/Enrollments nicht dazu zählen
export type Course = {

    id: number,
    title: string,
    credits: number,
    capacity: number
};

// hatte erst nur type Enrollment, aber weil es je nach status noch weitere Properties geben soll, ist das hier die Base, dann gibt es spezifische Enrollments die diese Base erweitern und dann den tatsächlichen Base Typen, der einer der spezifischen Typen haben muss
type EnrollmentBase = {

    id: number,
    studentId: number,
    courseId: number,
    // status: "enrolled" | "completed" | "dropped", -> wird herausgenommen, weil das der Discriminator für die Discriminated Unions sind also die spezifischen Typen, die diese Base erweitern und eben den status jeweils einzeln setzen
    enrolledAt: string
};

type EnrollmentEnrolled = EnrollmentBase & {

    status: "enrolled"
};

type EnrollmentCompleted = EnrollmentBase & {

    status: "completed",
    completedAt: string,
    grade: number
};

type EnrollmentDropped = EnrollmentBase & {

    status: "dropped",
    droppedAt: string,
    reason: string
};

export type Enrollment = 

    | EnrollmentEnrolled
    | EnrollmentCompleted
    | EnrollmentDropped
