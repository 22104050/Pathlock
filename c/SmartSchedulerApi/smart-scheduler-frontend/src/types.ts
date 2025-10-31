export type TaskInput = {
  title: string;
  estimatedHours: number;
  dueDate: string; // YYYY-MM-DD
  dependencies: string[];
};
