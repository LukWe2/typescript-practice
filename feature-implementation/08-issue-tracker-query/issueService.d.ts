import type { Issue } from "./types.js";
export declare function searchIssues(issues: Issue[], searchTerm: string): Issue[];
type IssueFilters = {
    status?: Issue["status"];
    priority?: Issue["priority"];
    assignedOnly?: boolean;
};
export declare function filterIssues(issues: Issue[], filterObject: IssueFilters): Issue[];
export declare function sortIssues(issues: Issue[], sortBy: "id" | "title", order: "asc" | "desc"): Issue[];
type Pagination<T> = {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};
export declare function paginate<T>(data: T[], page: number, elementsPerPage: number): Pagination<T>;
type QueryOptions = {
    searchTerm?: string;
    filter?: IssueFilters;
    sortBy?: "id" | "title";
    sortDirection?: "desc" | "asc";
    page: number;
    pageSize: number;
};
export declare function queryIssues(issues: Issue[], options: QueryOptions): Pagination<Issue>;
export {};
//# sourceMappingURL=issueService.d.ts.map