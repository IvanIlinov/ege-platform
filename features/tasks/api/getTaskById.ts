import { Task } from "../types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Задание 1",
    videoUrl: undefined,
    tasks: [
      {
        id: "1",
        condition: "Переведите число 101101 из двоичной системы счисления в десятичную.",
        correctAnswer: ["45"],
      },
      {
        id: "2",
        condition: "Переведите число 255 из десятичной системы счисления в двоичную.",
        correctAnswer: ["11111111"],
      },
      {
        id: "3",
        condition: "Переведите число FF из шестнадцатеричной системы счисления в десятичную.",
        correctAnswer: ["255"],
      },
    ],
  },
  {
    id: "2",
    title: "Задание 2",
    videoUrl: undefined,
    tasks: [
      {
        id: "1",
        condition: "Сколько бит в одном байте?",
        correctAnswer: ["8"],
      },
      {
        id: "2",
        condition: "Сколько байт в одном килобайте?",
        correctAnswer: ["1024"],
      },
    ],
  },
];

const TOTAL_TASKS = 27;

function createPlaceholder(id: string): Task {
  return {
    id,
    title: `Задание ${id}`,
    videoUrl: undefined,
    tasks: [
      {
        id: "1",
        condition: "Задача появится позже.",
        correctAnswer: [""],
      },
    ],
  };
}

export function getTaskById(id: string): Task | undefined {
  const found = mockTasks.find((task) => task.id === id);
  if (found) return found;

  const numericId = Number(id);
  if (numericId >= 1 && numericId <= TOTAL_TASKS) {
    return createPlaceholder(id);
  }

  return undefined;
}