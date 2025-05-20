"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { basicInfoSchema, BasicInfoFormData } from "@/lib/schema";
import { Button } from "../ui/button";
import RadioOption from "../ui/radio-option";
import { useEffect } from "react";

const roles = [
  { id: "role-developer", label: "Developer", value: "Developer" },
  { id: "role-designer", label: "Designer", value: "Designer" },
  { id: "role-pm", label: "Project Manager", value: "PM" },
];

export default function Step1Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();

  // Initialize form with existing data
  const methods = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      email: formData.email || "",
      role: formData.role,
      subscribe: formData.subscribe || false,
    },
    mode: "onChange",
  });

  // Handle form submission
  const onSubmit = (data: BasicInfoFormData) => {
    updateFormData(data);
    completeStep(1);
    router.push("/step/2");
  };

  // ✅ Reset form values when formData is loaded
  useEffect(() => {
    if (formData) {
      methods.reset({
        fullName: formData.fullName || "",
        email: formData.email || "",
        role: formData.role,
        subscribe: formData.subscribe || false,
      });
    }
  }, [formData, methods]);

  return (
    <FormWizardLayout showBackButton={false} showNextButton={false}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Personal Information
          </h2>
          <p className="text-gray-600">
            {`Let's`} start with some basic information about you.
          </p>
        </div>

        <FormProvider {...methods}>
          <section className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...methods.register("fullName")}
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
              {methods.formState.errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {methods.formState.errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...methods.register("email")}
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
              {methods.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {methods.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Role
              </label>
              <div className="space-y-2">
                {roles.map((role) => (
                  <RadioOption
                    key={role.id}
                    id={role.id}
                    label={role.label}
                    value={role.value}
                    register={methods.register}
                    name="role"
                  />
                ))}
              </div>
              {methods.formState.errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {methods.formState.errors.role.message}
                </p>
              )}
            </div>

            {/* Subscribe Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="subscribe"
                  type="checkbox"
                  {...methods.register("subscribe")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="subscribe" className="text-gray-700">
                  Subscribe to our newsletter
                </label>
                <p className="text-gray-500">
                  {`We'll`} keep you updated with the latest news and offers.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={methods.handleSubmit(onSubmit)}
                type="submit"
                size="lg"
                className="w-full cursor-pointer"
              >
                Continue to Next Step
              </Button>
            </div>
          </section>
        </FormProvider>
      </div>
    </FormWizardLayout>
  );
}
