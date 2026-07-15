import { Task } from "../types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Задание 1. Системы счисления",
    condition: "Переведите число 101101 из двоичной системы счисления в десятичную.",
    videoUrl: undefined,
    correctAnswer: ["45"],
  },
];

export function getTaskById(id: string): Task | undefined {
  return mockTasks.find((task) => task.id === id);
}