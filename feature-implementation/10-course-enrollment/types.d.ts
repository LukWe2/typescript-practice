export type Student = {
    id: number;
    name: string;
    email: string;
    active: boolean;
};
export type Course = {
    id: number;
    title: string;
    credits: number;
    capacity: number;
};
type EnrollmentBase = {
    id: number;
    studentId: number;
    courseId: number;
    enrolledAt: string;
};
type EnrollmentEnrolled = EnrollmentBase & {
    status: "enrolled";
};
type EnrollmentCompleted = EnrollmentBase & {
    status: "completed";
    completedAt: string;
    grade: number;
};
type EnrollmentDropped = EnrollmentBase & {
    status: "dropped";
    droppedAt: string;
    reason: string;
};
export type Enrollment = EnrollmentEnrolled | EnrollmentCompleted | EnrollmentDropped;
export {};
//# sourceMappingURL=types.d.ts.map