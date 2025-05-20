"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { preferencesSchema, PreferencesFormData } from "@/lib/schema";
import { Button } from "../ui/button";

export default function Step5Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();

  // Initialize form with existing data
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      workPreference: formData.workPreference,
      homeOfficeReady: formData.homeOfficeReady || false,
      relocationWillingness: formData.relocationWillingness || false,
      termsAccepted: formData.termsAccepted || false,
    },
    mode: "onChange",
  });

  // Watch work preference for conditional fields
  const workPreference = watch("workPreference");

  // Clean up conditional fields when work preference changes
  useEffect(() => {
    if (workPreference === "Remote") {
      setValue("relocationWillingness", false);
    } else if (workPreference === "On-site") {
      setValue("homeOfficeReady", false);
    } else {
      setValue("homeOfficeReady", false);
      setValue("relocationWillingness", false);
    }
  }, [workPreference, setValue]);

  // Handle form submission
  const onSubmit = (data: PreferencesFormData) => {
    updateFormData(data);
    completeStep(5);
    router.push("/review");
  };

  // ✅ Reset form values when formData is loaded
  useEffect(() => {
    if (formData) {
      reset({
        workPreference: formData.workPreference,
        homeOfficeReady: formData.homeOfficeReady || false,
        relocationWillingness: formData.relocationWillingness || false,
        termsAccepted: formData.termsAccepted || false,
      });
    }
  }, [formData, reset]);

  return (
    <FormWizardLayout showNextButton={false}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Preferences</h2>
          <p className="text-gray-600">
            Almost there! Let us know your work preferences and accept our
            terms.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Work Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Preference
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="preference-remote"
                  type="radio"
                  value="Remote"
                  {...register("workPreference")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="preference-remote"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Remote
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="preference-hybrid"
                  type="radio"
                  value="Hybrid"
                  {...register("workPreference")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="preference-hybrid"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Hybrid
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="preference-onsite"
                  type="radio"
                  value="On-site"
                  {...register("workPreference")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="preference-onsite"
                  className="ml-3 block text-sm text-gray-700"
                >
                  On-site
                </label>
              </div>
            </div>

            {errors.workPreference && (
              <p className="mt-1 text-sm text-red-600">
                {errors.workPreference.message}
              </p>
            )}
          </div>

          {/* Conditional Fields */}
          {workPreference === "Remote" && (
            <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="homeOfficeReady"
                    type="checkbox"
                    {...register("homeOfficeReady")}
                    className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 cursor-pointer text-sm">
                  <label
                    htmlFor="homeOfficeReady"
                    className="font-medium text-gray-700"
                  >
                    Home Office Ready
                  </label>
                  <p className="text-gray-500">
                    I have a dedicated workspace at home with appropriate
                    equipment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {workPreference === "On-site" && (
            <div className="bg-amber-50 rounded-md p-4 border border-amber-100">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="relocationWillingness"
                    type="checkbox"
                    {...register("relocationWillingness")}
                    className="h-4 cursor-pointer w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="relocationWillingness"
                    className="font-medium cursor-pointer text-gray-700"
                  >
                    Willing to Relocate
                  </label>
                  <p className="text-gray-500">
                    I am open to relocating for the right opportunity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms Acceptance */}
          <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  {...register("termsAccepted")}
                  className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsAccepted"
                  className="font-medium cursor-pointer text-gray-700"
                >
                  Terms and Conditions
                </label>
                <p className="text-gray-500">
                  I agree to the terms of service and privacy policy. I consent
                  to the processing of my data as described.
                </p>
              </div>
            </div>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-600">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">
              Continue to Review
            </Button>
          </div>
        </form>
      </div>
    </FormWizardLayout>
  );
}
