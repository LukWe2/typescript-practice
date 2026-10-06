import type { Issue } from "./types.js";

export const issues: Issue[] = [
    {
        id: 1,
        title: "Login button does not work",
        status: "open",
        priority: "high",
        assignee: "Anna"
    },
    {
        id: 2,
        title: "Improve dashboard performance",
        status: "in-progress",
        priority: "medium",
        assignee: "Lukas"
    },
    {
        id: 3,
        title: "Update README",
        status: "closed",
        priority: "low",
        assignee: null
    },
    {
        id: 4,
        title: "Fix mobile navigation",
        status: "open",
        priority: "high",
        assignee: "Lukas"
    },
    {
        id: 5,
        title: "Add project search",
        status: "in-progress",
        priority: "high",
        assignee: "Anna"
    },
    {
        id: 6,
        title: "Refactor settings page",
        status: "closed",
        priority: "medium",
        assignee: null
    }
];