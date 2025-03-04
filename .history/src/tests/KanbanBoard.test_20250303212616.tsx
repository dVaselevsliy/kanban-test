import { render } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";


const mockIssues = [
  { id: 1, title: "Issue 1", state: "open", assignee: null },
  { id: 2, title: "Issue 2", state: "open", assignee: "user" },
  { id: 3, title: "Issue 3", state: "closed", assignee: "user" },
];

describe('KanbanBoard drag-and-drop', () => {
  test("should move issue from toDo to inProgress", async () => {
    render(<KanbanBoard issues={mockIssues} repoUrl="test-repo" />)

    const todoTask = screen.getByText
  })
})