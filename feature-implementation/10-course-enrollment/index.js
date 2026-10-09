import { enrollments, students, courses } from "./data.js";
import { completeEnrollment, dropEnrollment, enrollStudent, getCompletedCredits, getCourseSummary, getCurrentlyEnrolledStudents, getEnrollmentsForCourse, getStudentsWithMinimumCredits } from "./enrollmentService.js";
function main() {
    const enrollmentsOfCourse101 = getEnrollmentsForCourse(enrollments, 101);
    console.log("Enrollments of course 101: ", enrollmentsOfCourse101);
    const studentsEnrolledInCourse101 = getCurrentlyEnrolledStudents(students, enrollments, 101);
    console.log("Enrolled students for course 101: ", studentsEnrolledInCourse101);
    const enrollmentsAfterEnrollingPeter = enrollStudent(students, courses, enrollments, 4, 102, 6, "2026-10-09");
    console.log("Enrollment Array after enrolling Peter: ", enrollmentsAfterEnrollingPeter);
    //const enrollmentsAfterEnrollingSophie = enrollStudent(students, courses, enrollments, 3, 103, 7, "2026-10-09"); -> ergibt Fehler: 
    const completeEnrollment1 = completeEnrollment(enrollments, 1, "2026-10-09", 2.3);
    console.log("Enrollment Array after completing enrollment 1: ", completeEnrollment1);
    const dropEnrollment3 = dropEnrollment(enrollments, 3, "2026-10-09", "Too much work.");
    console.log("Enrollment Array after dropping enrollment 3: ", dropEnrollment3);
    const courseSummaryForCourse101 = getCourseSummary(courses, enrollments, 101);
    console.log("Course Summary for course 101: ", courseSummaryForCourse101);
    const completedCreditsOfLukas = getCompletedCredits(courses, enrollments, 2);
    console.log("Completed credits count of Lukas: ", completedCreditsOfLukas);
    const studentsWithAtleast5Credits = getStudentsWithMinimumCredits(students, courses, enrollments, 5);
    console.log("All students with atleast five credits: ", studentsWithAtleast5Credits);
    console.log("Original enrollments: ", enrollments);
}
main();
//# sourceMappingURL=index.js.map