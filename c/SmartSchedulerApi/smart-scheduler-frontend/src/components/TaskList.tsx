import React from "react";
import { Task } from "../Task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-2 border rounded"
        >
          <div
            onClick={() => onToggle(task.id)}
            className={`cursor-pointer ${task.isCompleted ? "line-through text-gray-400" : ""}`}
          >
            {task.description}
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
