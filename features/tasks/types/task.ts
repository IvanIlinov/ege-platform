export type TaskItem = {
  id: string;
  condition: string;
  correctAnswer: string[];
};

export type Task = {
    id: string;
    title:string;
    videoUrl?: string;
    tasks: TaskItem[];
}