"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CircleCheckBig, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { path: "/step/1", label: "Basic Info" },
  { path: "/step/2", label: "Schedule" },
  { path: "/step/3", label: "Services" },
  { path: "/step/4", label: "Skills" },
  { path: "/step/5", label: "Preferences" },
  { path: "/review", label: "Review" },
];

export function FormWizardLayout({
  children,
  showBackButton = true,
  showNextButton = true,
  nextDisabled = false,
  onNext,
}: {
  children: ReactNode;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextDisabled?: boolean;
  onNext?: () => void;
}) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  // If we can't find the current step, default to the first step
  const currentStep = currentStepIndex !== -1 ? currentStepIndex : 0;

  // Calculate previous and next paths
  const prevPath = currentStep > 0 ? steps[currentStep - 1].path : null;
  const nextPath =
    currentStep < steps.length - 1 ? steps[currentStep + 1].path : null;

  // Determine if we're on the review page
  const isReviewPage = pathname === "/review";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Form Wizard</h1>
          <div className="text-sm text-gray-500">
            Step {isReviewPage ? steps.length : currentStep + 1} of{" "}
            {steps.length}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-10">
            <ol className="flex items-center w-full">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <li key={step.path} className="flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full",
                          isCompleted
                            ? "bg-blue-600"
                            : isCurrent
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        )}
                      >
                        {isCompleted ? (
                          <CircleCheckBig className="w-5 h-5 text-white" />
                        ) : (
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isCurrent ? "text-white" : "text-gray-500"
                            )}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-xs",
                          isCurrent
                            ? "text-blue-600 font-medium"
                            : isCompleted
                            ? "text-gray-900"
                            : "text-gray-500"
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5",
                          index < currentStep ? "bg-blue-600" : "bg-gray-200"
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">{children}</div>

            {/* Navigation Buttons */}
            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              {showBackButton && prevPath ? (
                <Link
                  href={prevPath}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Link>
              ) : (
                <div />
              )}

              {showNextButton &&
                (nextPath ? (
                  <button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className={cn(
                      "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
                      nextDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className={cn(
                      "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors",
                      nextDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Submit
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
