export type IssueType = {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: { login: string } | null;
  body: string;
  html_url: string;
  num
}