import React, { ReactNode } from "react";
interface QuestionAccordingProps {
  title: ReactNode;
  children: ReactNode;
  isActive: boolean;
  onToggle: () => void;
}
const DoctorAccording = ({
  title,
  children,
  isActive,
  onToggle,
}: QuestionAccordingProps) => {
  return (
    <div className="my-1">
      <div
        className="flex justify-between border-b  pb-1 p-1 cursor-pointer"
        onClick={onToggle}
      >
        <h3>{title}</h3>
        <button>
          <svg
            className="ml-8  shrink-0"
            width="16"
            height="16"
            xmlns="https://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                isActive && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                isActive && "!rotate-180"
              }`}
            />
          </svg>
        </button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out p-1 pt-2 ${
          isActive
            ? "grid-rows-[1fr] opacity-100 "
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default DoctorAccording;
