import type { Course, Student, Enrollment } from "./types.js";

export const students: Student[] = [

    {
        id: 1,
        name: "Anna",
        email: "anna@example.com",
        active: true
    },
    {
        id: 2,
        name: "Lukas",
        email: "lukas@example.com",
        active: true       
    },
    {
        id: 3,
        name: "Sophie",
        email: "sophie@example.com",
        active: false
    },
    {
        id: 4,
        name: "Peter",
        email: "peter@example.com",
        active: true
    }
];

export const courses: Course[] = [

    {
        id: 101,
        title: "TypeScript Fundamentals",
        credits: 5,
        capacity: 2
    },
    {
        id: 102,
        title: "React Basics",
        credits: 6,
        capacity: 3 
    },
    {
        id: 103,
        title: "UX Engineering",
        credits: 4,
        capacity: 2        
    }
];


export const enrollments: Enrollment[] = [
    {
        id: 1,
        studentId: 1,
        courseId: 101,
        status: "enrolled",
        enrolledAt: "2026-10-01"
    },
    {
        id: 2,
        studentId: 2,
        courseId: 101,
        status: "completed",
        enrolledAt: "2026-09-01",
        completedAt: "2026-09-30",
        grade: 1.7
    },
    {
        id: 3,
        studentId: 2,
        courseId: 102,
        status: "enrolled",
        enrolledAt: "2026-10-02"
    },
    {
        id: 4,
        studentId: 4,
        courseId: 103,
        status: "dropped",
        enrolledAt: "2026-09-10",
        droppedAt: "2026-09-20",
        reason: "Schedule conflict"
    },
    {
        id: 5,
        studentId: 1,
        courseId: 103,
        status: "completed",
        enrolledAt: "2026-09-01",
        completedAt: "2026-09-29",
        grade: 2.0
    }
];