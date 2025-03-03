import { useCallback, useEffect, useState } from "react";
import Task from "./Issue";
import { IssueType } from "../type/IssueType";
import { Card } from "antd";
import Title from "antd/es/typography/Title";


const initialTasks: {
  todo: IssueType[],
  inProgress: IssueType[],
  done: IssueType[],
} = {
  todo: [],
  inProgress: [],
  done: [],
};

interface Props {
  issues: IssueType[],
  repoUrl: string
}

export default function KanbanBoard({ issues, repoUrl }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState<{task: IssueType, column: string} | null>(null);
  const [draggedOverTask, setDraggedOverTask] = useState<IssueType | null>(null);

  const updateTaskFromIssues = useCallback(() => {
    const newTasks = {
      todo: issues.filter(issue => issue.state === 'open' && !issue.assignee),
      inProgress: issues.filter(issue => issue.state === 'open' && issue.assignee),
      done: issues.filter(issue => issue.state === 'closed')
    }

    setTasks(newTasks)
    localStorage.setItem(`kanban-${repoUrl}`, JSON.stringify(newTasks))
  }, [issues, repoUrl])

  useEffect(() => {
    const storageKey = `kanban-${repoUrl}`;
  const storedTasks = localStorage.getItem(storageKey);

  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
    } catch (error) {
      console.error("localStorage error:", error);
      updateTaskFromIssues();
    }
  } else {
    updateTaskFromIssues();
  }
  }, [repoUrl, updateTaskFromIssues])

  const handleDragStart = (task: IssueType, column: string) => {
    setDraggedTask({ task, column });
  };

  const handleDragOver = (task: IssueType) => {
    setDraggedOverTask(task);
  };

  const handleDrop = (column: keyof typeof tasks) => {
    if (!draggedTask) return;
    
    const { task, column: fromColumn } = draggedTask;
    
    if (fromColumn === column) {
      const updatedColumn = [...tasks[column]];
      const fromIndex = updatedColumn.findIndex(t => t.id === task.id);
      const toIndex = draggedOverTask ? updatedColumn.findIndex((t) => t.id === draggedOverTask.id) : updatedColumn.length
      
      updatedColumn.splice(fromIndex, 1);
      updatedColumn.splice(toIndex, 0, task);
      
      const newTasks = { ...tasks, [column]: updatedColumn }
      setTasks(newTasks);
      localStorage.setItem(`kanban-${repoUrl}`, JSON.stringify(newTasks))
      /* local storage */
    } else {
      const updatedFromColumn = tasks[fromColumn as keyof typeof tasks].filter((t) => t !== task);
      const updatedToColumn = [...tasks[column]];
      const toIndex = draggedOverTask ? updatedToColumn.findIndex((t) => t.id === draggedOverTask.id) : updatedToColumn.length
      
      updatedToColumn.splice(toIndex, 0, task);

      const newTasks = {
        ...tasks,
        [fromColumn]: updatedFromColumn,
        [column]: updatedToColumn,
      }
      
      setTasks(newTasks);
      localStorage.setItem(`kanban-${repoUrl}`, JSON.stringify(newTasks))

      /* local storage - tasks for each repo
        {
          repo1URl: [
          ...
          ],
          repo2URl: [
          ...
          ],
        }
      */
    }
    
    setDraggedTask(null);
    setDraggedOverTask(null);
  };

  const columns: Array<keyof ty> = ["todo", "inProgress", "done"];

  return <div className="kanban-container">
      {columns.map((col) => (
        <Card
          key={col}
          className="kanban-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col)}
        >
          <Title level={4} className="kanban-title">{col.toUpperCase()}</Title>
          {tasks[col].map((task) => (
            <Task
              key={task.id}
              issue={task}
              col={col}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
            />
          ))}
        </Card>
      ))}
    </div>
}
