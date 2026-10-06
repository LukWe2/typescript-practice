import { searchIssues, filterIssues, sortIssues, paginate, queryIssues } from "./issueService.js";
import { issues } from "./data.js";

function main(): void {

    const issuesWithMobileInTitle = searchIssues(issues, "mobile");
    console.log("Issues with mobile in title: ", issuesWithMobileInTitle);

    const issuesOpenHighPriority = filterIssues(issues, { status: "open", priority: "high" });
    console.log("Open High Priority Issues: ", issuesOpenHighPriority);

    const issuesAllAssigned = filterIssues(issues, { assignedOnly: true });
    console.log("All assigned issues: ", issuesAllAssigned);

    const issuesSortedByTitleAscending = sortIssues(issues, "title", "asc");
    console.log("Issues sorted by title ascending: ", issuesSortedByTitleAscending);

    const issuesSortedByIdDescending = sortIssues(issues, "id", "desc");
    console.log("Issues sorted by ID descending: ", issuesSortedByIdDescending);

    const paginatedIssuesFromPage2With2ElementsPerPage = paginate(issues, 2, 2);
    console.log("Paginated issues from page 2 with 2 elements per page: ", paginatedIssuesFromPage2With2ElementsPerPage);

    const combinedQuery = queryIssues(issues, { searchTerm: "p", filter: {assignedOnly: true}, sortBy: "id", sortDirection: "asc", page: 1, pageSize: 2 });
    console.log("Combined Query with search, filter, sort and pagination: ", combinedQuery);

    console.log("Current page:", combinedQuery.page);
    console.log("Page size / items per page:", combinedQuery.pageSize);
    console.log("Total matching items:", combinedQuery.totalItems);
    console.log("Total pages:", combinedQuery.totalPages);
    console.log("Items on current page:", combinedQuery.items);
    console.log("Number of items on current page:", combinedQuery.items.length);
};

main();