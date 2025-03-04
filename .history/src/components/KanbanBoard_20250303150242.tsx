import { useEffect, useState } from "react";
import Task from "./Issue";
import { IssueType } from "../type/IssueType";
import { Card } from "antd";
import Title from "antd/es/typography/Title";


const initialTasks = {
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
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOverTask, setDraggedOverTask] = useState(null);

  useEffect(() => {
    const storageKey = `kanban-${repoUrl}`
    const storedTasks = localStorage.getItem(storageKey)
    
    if (storedTasks) {
      (JSON.parse(storedTasks))

      const hasDifference = JSON.stringify()
    } else {
      const newTasks = {
        todo: issues.filter(issue => issue.state === 'open' && !issue.assignee),
        inProgress: issues.filter(issue => issue.state === 'open' && issue.assignee),
        done: issues.filter(issue => issue.state === 'closed')
      }
      setTasks(newTasks)
    }
  }, [issues, repoUrl])

  useEffect(() => {
    localStorage.setItem(`kanban-${repoUrl}`, JSON.stringify(tasks))
  }, [tasks, repoUrl])

  const handleDragStart = (task: IssueType, column: string) => {
    setDraggedTask({ task, column });
  };

  const handleDragOver = (task: IssueType) => {
    setDraggedOverTask(task);
  };

  const handleDrop = (column: string) => {
    if (!draggedTask) return;
    
    const { task, column: fromColumn } = draggedTask;
    
    if (fromColumn === column) {
      const updatedColumn = [...tasks[column]];
      const fromIndex = updatedColumn.indexOf(task);
      const toIndex = updatedColumn.indexOf(draggedOverTask);
      
      updatedColumn.splice(fromIndex, 1);
      updatedColumn.splice(toIndex, 0, task);
      
      setTasks({ ...tasks, [column]: updatedColumn });
      /* local storage */
    } else {
      const updatedFromColumn = tasks[fromColumn].filter((t) => t !== task);
      const updatedToColumn = [...tasks[column]];
      const toIndex = draggedOverTask ? updatedToColumn.indexOf(draggedOverTask) : updatedToColumn.length;
      
      updatedToColumn.splice(toIndex, 0, task);
      
      setTasks({
        ...tasks,
        [fromColumn]: updatedFromColumn,
        [column]: updatedToColumn,
      });
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

  const columns = ["todo", "inProgress", "done"];

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
