import { useEffect, useState } from "react";
import Task from "./Issue";
import { IssueType } from "../type/IssueType";

interface TasksState {
  todo: IssueType[];
  inProgress: IssueType[];
  done: IssueType[];
}

const initialTasks: TasksState = {
  todo: [],
  inProgress: [],
  done: [],
};

interface Props {
  issues: IssueType[];
  repoUrl: string;
}

export default function KanbanBoard({ issues, repoUrl }: Props) {
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<{ task: IssueType; column: keyof TasksState } | null>(null);
  const [draggedOverTask, setDraggedOverTask] = useState<IssueType | null>(null);

  // Загружаем данные из localStorage или создаём новые списки задач
  useEffect(() => {
    const storedTasks = localStorage.getItem(`kanban-${repoUrl}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const newTasks: TasksState = {
        todo: issues.filter(issue => issue.state === "open" && !issue.assignee),
        inProgress: issues.filter(issue => issue.state === "open" && issue.assignee),
        done: issues.filter(issue => issue.state === "closed"),
      };
      setTasks(newTasks);
    }
  }, [issues, repoUrl]);

  // Сохраняем `tasks` в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(`kanban-${repoUrl}`, JSON.stringify(tasks));
  }, [tasks, repoUrl]);

  // Начало перетаскивания
  const handleDragStart = (task: IssueType, column: keyof TasksState) => {
    setDraggedTask({ task, column });
  };

  // Наведение на другую задачу
  const handleDragOver = (task: IssueType) => {
    setDraggedOverTask(task);
  };

  // Обработка drop
  const handleDrop = (column: keyof TasksState) => {
    if (!draggedTask) return;

    const { task, column: fromColumn } = draggedTask;

    // Если перетаскиваем в тот же столбец, просто меняем порядок
    if (fromColumn === column) {
      const updatedColumn = [...tasks[column]];
      const fromIndex = updatedColumn.findIndex(t => t.id === task.id);
      const toIndex = draggedOverTask ? updatedColumn.findIndex(t => t.id === draggedOverTask.id) : updatedColumn.length;

      if (fromIndex !== -1) {
        updatedColumn.splice(fromIndex, 1);
        updatedColumn.splice(toIndex, 0, task);
      }

      setTasks({ ...tasks, [column]: updatedColumn });
    } else {
      // Перетаскивание между колонками
      const updatedFromColumn = tasks[fromColumn].filter(t => t.id !== task.id);
      const updatedToColumn = [...tasks[column]];
      const toIndex = draggedOverTask ? updatedToColumn.findIndex(t => t.id === draggedOverTask.id) : updatedToColumn.length;

      updatedToColumn.splice(toIndex, 0, task);

      setTasks({
        ...tasks,
        [fromColumn]: updatedFromColumn,
        [column]: updatedToColumn,
      });
    }

    setDraggedTask(null);
    setDraggedOverTask(null);
  };

  const columns: (keyof TasksState)[] = ["todo", "inProgress", "done"];

  return (
    <div className="kanban-container">
      {columns.map(col => (
        <div
          key={col}
          className="kanban-column"
          onDragOver={e => e.preventDefault()}
          onDrop={() => handleDrop(col)}
        >
          <h2 className="kanban-title">{col.toUpperCase()}</h2>
          {tasks[col].map(task => (
            <Task
              key={task.id}
              issue={task}
              col={col}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
