import { notFound } from "next/navigation";
import { getTaskById } from "@/features/tasks/api/getTaskById";
import { TaskPage } from "@/features/tasks/components/TaskPage";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;
    const task = getTaskById(id);

    if (!task) {
        notFound();
    }

    return <TaskPage key={id} task={task} />;

}