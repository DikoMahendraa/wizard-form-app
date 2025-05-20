"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { basicInfoSchema, BasicInfoFormData } from "@/lib/schema";

export default function Step1Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();

  // Initialize form with existing data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register("fullName")}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
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
              {...register("email")}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Role
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="role-developer"
                  type="radio"
                  value="Developer"
                  {...register("role")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="role-developer"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Developer
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="role-designer"
                  type="radio"
                  value="Designer"
                  {...register("role")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="role-designer"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Designer
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="role-pm"
                  type="radio"
                  value="PM"
                  {...register("role")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="role-pm"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Project Manager
                </label>
              </div>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Subscribe Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="subscribe"
                type="checkbox"
                {...register("subscribe")}
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
            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue to Next Step
            </button>
          </div>
        </form>
      </div>
    </FormWizardLayout>
  );
}
