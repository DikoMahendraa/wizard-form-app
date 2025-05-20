"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { serviceCategories } from "@/lib/schema";
import { format } from "date-fns";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const router = useRouter();
  const { formData, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submit form data (simulated)
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after submission (optional)
    // resetForm();
  };

  // Navigate to a specific step for editing
  const navigateToStep = (step: number) => {
    router.push(`/step/${step}`);
  };

  // Group services by category for display
  const groupedServices = Object.entries(serviceCategories).reduce(
    (acc, [, category]) => {
      const categoryServices =
        formData.services?.filter((service) =>
          category.options.includes(service)
        ) || [];

      if (categoryServices.length > 0) {
        acc[category.label] = categoryServices;
      }

      return acc;
    },
    {} as Record<string, string[]>
  );

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-200 mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for completing the form. {`We've`} received your
              information and will be in touch soon.
            </p>
            <Button
              onClick={() => {
                resetForm();
                router.push("/");
              }}
              className="border border-primary bg-primary/40 hover:bg-primary/80 text-primary"
              size="lg"
              variant="outline"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormWizardLayout
      showNextButton={true}
      nextDisabled={isSubmitting}
      onNext={handleSubmit}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Review Your Information
          </h2>
          <p className="text-gray-600">
            Please review all the information {`you've`} provided before
            submitting. You can go back to any step to make changes.
          </p>
        </div>

        {/* Step 1: Basic Info */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Basic Information</h3>
            <button
              onClick={() => navigateToStep(1)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{formData.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Newsletter</p>
              <p className="font-medium">{formData.subscribe ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        {/* Step 2: Schedule Meeting */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Meeting Schedule</h3>
            <button
              onClick={() => navigateToStep(2)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Preferred Date</p>
              <p className="font-medium">
                {formData.preferredDate
                  ? format(formData.preferredDate, "dd-mm-yyyy")
                  : "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Preferred Time</p>
              <p className="font-medium">
                {formData.preferredTime || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Timezone</p>
              <p className="font-medium">{formData.timezone || "Not set"}</p>
            </div>
          </div>
        </div>

        {/* Step 3: Selected Services */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Selected Services</h3>
            <button
              onClick={() => navigateToStep(3)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>

          {Object.keys(groupedServices).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedServices).map(([category, services]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service}
                        className="inline-block px-2 py-1 rounded-md bg-primary/30 text-black text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No services selected</p>
          )}
        </div>

        {/* Step 4: Skills & Interests */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Skills & Interests</h3>
            <button
              onClick={() => navigateToStep(4)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Skills</p>
              {formData.skills && formData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 rounded-md bg-primary/30 text-black text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills selected</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Interested Topics</p>
              <p className="font-medium">
                {formData.interestedTopics || "None provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: Preferences */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Preferences</h3>
            <button
              onClick={() => navigateToStep(5)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Work Preference</p>
              <p className="font-medium">{formData.workPreference}</p>
            </div>

            {formData.workPreference === "Remote" && (
              <div>
                <p className="text-sm text-gray-500">Home Office Ready</p>
                <p className="font-medium">
                  {formData.homeOfficeReady ? "Yes" : "No"}
                </p>
              </div>
            )}

            {formData.workPreference === "On-site" && (
              <div>
                <p className="text-sm text-gray-500">Willing to Relocate</p>
                <p className="font-medium">
                  {formData.relocationWillingness ? "Yes" : "No"}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500">Terms Accepted</p>
              <p className="font-medium">
                {formData.termsAccepted ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button (handled by layout) */}
        {isSubmitting && (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
            <span className="text-gray-700">
              Submitting your application...
            </span>
          </div>
        )}
      </div>
    </FormWizardLayout>
  );
}
