import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepItem } from "@/components/ui/step-item";

const steps = [
  {
    number: 1,
    title: "Basic Information",
    description: "Your name, email, and role",
  },
  { number: 2, title: "Schedule Meeting", description: "Pick a date and time" },
  {
    number: 3,
    title: "Select Services",
    description: `Choose services you're interested in`,
  },
  {
    number: 4,
    title: "Skills & Interests",
    description: "Tell us about your skills",
  },
  {
    number: 5,
    title: "Preferences",
    description: "Work preferences and terms",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Multi-Step Form Wizard
          </h1>

          <p className="text-gray-600 mb-8">
            Complete this short application form to get started. Your
            information will be saved at each step.
          </p>

          <div className="space-y-4 mb-8">
            {steps.map((step) => (
              <StepItem
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          <Button className="w-full flex justify-center" size="lg">
            <Link
              className="flex items-center justify-center w-full"
              href="/step/1"
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Your information is securely saved in your browser. You can return
            to complete the form later.
          </p>
        </div>
      </div>
    </div>
  );
}
