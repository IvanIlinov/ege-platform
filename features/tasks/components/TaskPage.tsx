import { Task } from "../types/task";
import { TaskSlider } from "./TaskSlider";
import { ExamPanel } from "@/shared/ui/ExamPanel";
import { DigitStrip } from "@/shared/ui/DigitStrip";

export function TaskPage({ task }: { task: Task }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <ExamPanel className="task-transition p-5 md:p-8">
        {/* Заголовки */}
        <header className="relative flex items-start justify-between mb-6 gap-4">
          <div>
            <p
              className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-2"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Задание ЕГЭ · Информатика
            </p>
            <h1
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-unbounded)" }}
            >
              {task.title}
            </h1>
          </div>

          <DigitStrip value={task.id} length={2} />
        </header>

        {/* Основа */}
        <TaskSlider key={task.id} task={task} />
      </ExamPanel>
      {/* Навигация была тут TaskNav*/}
    </div>
  );
}
