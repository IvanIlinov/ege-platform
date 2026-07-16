import { Task } from "../types/task";
import { TaskSlider } from "./TaskSlider";
import { TaskNav } from "./TaskNav";

export function TaskPage({ task }: { task: Task }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="exam-panel relative overflow-hidden rounded-[32px] p-5 md:p-8">
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

          <div className="flex gap-1.5 shrink-0">
            {String(task.id).padStart(2, "0").split("").map((digit, i) => (
              <span
                key={i}
                className="digit-cell digit-cell--active w-9 h-11 text-lg font-semibold"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {digit}
              </span>
            ))}
          </div>
        </header>

        <TaskSlider task={task} />
      </div>

      <TaskNav />
    </div>
  );
}