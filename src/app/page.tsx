import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
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
            <div className="flex items-start">
              <div className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Basic Information
                </h3>
                <p className="text-sm text-gray-500">
                  Your name, email, and role
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Schedule Meeting
                </h3>
                <p className="text-sm text-gray-500">Pick a date and time</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Select Services
                </h3>
                <p className="text-sm text-gray-500">
                  Choose services {`you're`} interested in
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                4
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Skills & Interests
                </h3>
                <p className="text-sm text-gray-500">
                  Tell us about your skills
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                5
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Preferences
                </h3>
                <p className="text-sm text-gray-500">
                  Work preferences and terms
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/step/1"
            className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
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
