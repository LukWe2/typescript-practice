import type { Student, Enrollment, Course } from "./types.js";
export declare function getEnrollmentsForCourse(enrollments: Enrollment[], courseId: number): Enrollment[];
export declare function getCurrentlyEnrolledStudents(students: Student[], enrollments: Enrollment[], courseId: number): Student[];
export declare function enrollStudent(students: Student[], courses: Course[], enrollments: Enrollment[], studentId: number, courseId: number, newEnrollmentId: number, enrolledAt: string): Enrollment[];
export declare function completeEnrollment(enrollments: Enrollment[], enrollmentId: number, completedAt: string, grade: number): Enrollment[];
export declare function dropEnrollment(enrollments: Enrollment[], enrollmentId: number, droppedAt: string, reason: string): Enrollment[];
type CourseSummary = {
    courseId: number;
    courseTitle: string;
    capacity: number;
    currentlyEnrolled: number;
    completedCount: number;
    droppedCount: number;
    availableSeats: number;
};
export declare function getCourseSummary(courses: Course[], enrollments: Enrollment[], courseId: number): CourseSummary;
export declare function getCompletedCredits(courses: Course[], enrollments: Enrollment[], studentId: number): number;
export declare function getStudentsWithMinimumCredits(students: Student[], courses: Course[], enrollments: Enrollment[], minimumCredits: number): Student[];
export {};
//# sourceMappingURL=enrollmentService.d.ts.map