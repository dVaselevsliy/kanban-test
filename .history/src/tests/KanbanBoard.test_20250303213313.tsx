import { render, screen } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import userEvent from "@testing-library/user-event";
import { IssueType } from "../type/IssueType";


const mockIssues: IssueType[] = [
  { 
    id: 1, 
    title: "Issue 1", 
    state: "open", 
    assignee: null, 
    body: "Description of Issue 1", 
    html_url: "https://github.com/user/repo/issues/1",
    number: 1, 
    created_at: "2024-03-03T12:00:00Z",
    updated_at: "2024-03-03T12:00:00Z"
  },
  { 
    id: 2, 
    title: "Issue 2", 
    state: "open", 
    assignee: "user", 
    body: "Description of Issue 2", 
    html_url: "https://github.com/user/repo/issues/2",
    number: 2, 
    created_at: "2024-03-03T12:00:00Z",
    updated_at: "2024-03-03T12:00:00Z"
  },
  { 
    id: 3, 
    title: "Issue 3", 
    state: "closed", 
    assignee: "user", 
    body: "Description of Issue 3", 
    html_url: "https://github.com/user/repo/issues/3",
    number: 3, 
    created_at: "2024-03-03T12:00:00Z",
    updated_at: "2024-03-03T12:00:00Z"
  },
];

describe('KanbanBoard drag-and-drop', () => {
  test("should move issue from TODO to IN PROGRESS", async () => {
    render(<KanbanBoard issues={mockIssues} repoUrl="test-repo" />)

    const todoTask = screen.getByText('Issue 1')
    const inProgressColumn = screen.getByText('IN PROGRESS')

    await userEvent.dragAndDrop(todoTask, inProgressColumn)

    expect(screen.getByText("Issue 1")).toBeInTheDocument()
  })
})