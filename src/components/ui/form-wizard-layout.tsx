"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CircleCheckBig, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";

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
            <ol className="flex w-full justify-between items-center relative">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <li
                    key={step.path}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {/* Circle */}
                    <div
                      className={cn(
                        "z-20 flex items-center relative justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                        isCompleted
                          ? "bg-primary border-primary text-white"
                          : isCurrent
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      )}
                    >
                      {isCompleted ? (
                        <CircleCheckBig className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                      {/* Label */}
                      <span
                        className={cn(
                          "text-xs absolute top-9 min-w-[5rem] text-center",
                          isCurrent
                            ? "text-primary font-medium block"
                            : "text-gray-500 sm:block hidden"
                        )}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Divider Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-4 left-1/2 w-full h-0.5 z-10">
                        <div
                          className={cn(
                            "w-full h-full",
                            index < currentStep ? "bg-primary" : "bg-gray-200"
                          )}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname} // ensures new animation when step changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8"
              >
                {children}
              </motion.div>
            </AnimatePresence>

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
                  <Button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className={cn(
                      nextDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={onNext}
                    disabled={nextDisabled}
                    className={cn(
                      "bg-primary",
                      nextDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Submit
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
