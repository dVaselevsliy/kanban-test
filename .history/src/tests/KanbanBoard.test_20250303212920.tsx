import { render, screen } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import userEvent from "@testing-library/user-event";


const mockIssues = [
  { id: 1, title: "Issue 1", state: "open", assignee: null },
  { id: 2, title: "Issue 2", state: "open", assignee: "user" },
  { id: 3, title: "Issue 3", state: "closed", assignee: "user" },
];

describe('KanbanBoard drag-and-drop', () => {
  test("should move issue from TODO to IN PROGRESS", async () => {
    render(<KanbanBoard issues={mockIssues} repoUrl="test-repo" />)

    const todoTask = screen.getByText('Issue 1')
    const inProgressColumn = screen.getByText('IN PROGRESS')

    await userEvent.dragAndDrop(todoTask, inProgressColumn)

    expect(screen.getByText(""))
  })
})