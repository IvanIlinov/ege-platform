import { ReactNode, HTMLAttributes } from "react";

type ExamPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Тёмная панель с радиальным отсветом --signal (.exam-panel).
 * Раньше жила только внутри TaskPage — теперь общий блок style-core,
 * пригодится для любой "главной карточки" страницы.
 */
export function ExamPanel({ children, className = "", ...rest }: ExamPanelProps) {
  return (
    <div className={`exam-panel relative overflow-hidden ${className}`} {...rest}>
      {children}
    </div>
  );
}
