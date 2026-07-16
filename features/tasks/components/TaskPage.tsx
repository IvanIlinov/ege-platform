import { Task } from "../types/task";
import { TaskAnswerForm } from "./TaskAnswerForm";
import { TaskCondition } from "./TaskCondition";
import { TaskNav } from "./TaskNav";
import { TaskVideo } from "./TaskVideo";

export function TaskPage({task} : {task : Task}) {
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
            <TaskVideo videoUrl={task.videoUrl} />
            <TaskNav/>
        </main>
    )
}