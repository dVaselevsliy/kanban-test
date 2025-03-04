import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
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
    comments: "2",
    user: { login: "user1" } 
  },
  { 
    id: 2, 
    title: "Issue 2", 
    state: "open", 
    assignee: { login: "user" },  // Должен быть объект
    body: "Description of Issue 2", 
    html_url: "https://github.com/user/repo/issues/2",
    number: 2, 
    created_at: "2024-03-03T12:00:00Z",
    comments: "5",
    user: { login: "user2" } 
  },
  { 
    id: 3, 
    title: "Issue 3", 
    state: "closed", 
    assignee: { login: "user" },  // Должен быть объект
    body: "Description of Issue 3", 
    html_url: "https://github.com/user/repo/issues/3",
    number: 3, 
    created_at: "2024-03-03T12:00:00Z",
    comments: "1",
    user: { login: "user3" } 
  },
];

describe('KanbanBoard drag-and-drop', () => {
  test("should move issue from TODO to IN PROGRESS", async () => {
    render(<KanbanBoard issues={mockIssues} repoUrl="test-repo" />)

    const todoTask = screen.getByText('Issue 1')
    const inProgressColumn = screen.getByText((content) => 
      content
    )

    fireEvent.dragStart(todoTask);
    fireEvent.dragOver(inProgressColumn);
    fireEvent.drop(inProgressColumn);

    expect(screen.getByText("Issue 1")).toBeInTheDocument()
  })
})