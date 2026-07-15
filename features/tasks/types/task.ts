export type Task = {
    id: string;
    title:string;
    condition: string;
    videoUrl?: string;
    correctAnswer: string[]; 
}