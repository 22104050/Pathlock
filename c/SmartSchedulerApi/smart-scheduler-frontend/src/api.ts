import axios from "axios";
import type { TaskInput } from "./types";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export async function scheduleProject(tasks: TaskInput[]) {
  const res = await api.post(`/api/v1/projects/1/schedule`, { tasks });
  return res.data; // { recommendedOrder: string[] }
}
