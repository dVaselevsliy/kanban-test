import { IssueType } from "../type/IssueType";

const mockIssues: IssueType[] = [
  { id: 1, title: "Issue 1", state: "open", assignee: null },
  { id: 2, title: "Issue 2", state: "open", assignee: "user" },
  { id: 3, title: "Issue 3", state: "closed", assignee: "user" },
]