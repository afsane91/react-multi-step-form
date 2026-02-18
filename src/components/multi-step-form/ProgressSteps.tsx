import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Personal", "Professional", "Billing"];

type Props = { currentStep: number };

export default function ProgressSteps({ currentStep }: Props) {
  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-3 items-start">
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;

          return (
            <div key={step} className="relative flex flex-col items-center">
              {/* left segment */}
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute top-4.5 left-0 h-0.75 w-1/2 rounded-full bg-gray-200",
                    (done || active) &&
                      "bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500",
                  )}
                />
              )}

              {/* right segment */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4.5 right-0 h-0.75 w-1/2 rounded-full bg-gray-200",
                    done &&
                      "bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500",
                  )}
                />
              )}

              {/* circle */}
              <div
                className={cn(
                  "z-10 h-10 w-10 rounded-full border flex items-center justify-center text-sm font-semibold transition-all",
                  "bg-white border-gray-300 text-gray-400",
                  done &&
                    "border-transparent text-white bg-linear-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-md",
                  active &&
                    "border-transparent text-white bg-linear-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-md ring-4 ring-purple-500/15",
                )}
              >
                {done ? <Check size={16} /> : index + 1}
              </div>

              {/* label */}
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  (done || active) && "text-gray-900",
                  !done && !active && "text-gray-400",
                )}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
