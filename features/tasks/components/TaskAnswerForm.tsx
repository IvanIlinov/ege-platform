"use client";

import { useState } from "react";

type Props = {
  correctAnswer: string[];
};

export function TaskAnswerForm({ correctAnswer }: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() => setIsRevealed(true)}
        className="bg-black-600 text-white px-4 py-2 rounded"
      >
        Показать ответ
      </button>

      {isRevealed && (
        <span className="font-semibold">{correctAnswer.join(", ")}</span>
      )}
    </div>
  );
}