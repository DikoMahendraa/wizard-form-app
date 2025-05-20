"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { serviceSchema, ServiceFormData } from "@/lib/schema";
import { ServiceSelectorModal } from "@/components/ui/service-selector-modal";
import { Plus, X } from "lucide-react";

export default function Step3Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize form with existing data
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      services: formData.services || [],
    },
    mode: "onChange",
  });

  // Watch services for displaying selected services
  const selectedServices = watch("services");

  // Open service selector modal
  const openServiceSelector = () => {
    setIsModalOpen(true);
  };

  // Handle service selection from modal
  const handleServicesSelected = (services: string[]) => {
    setValue("services", services, { shouldValidate: true });
  };

  // Remove a service
  const removeService = (service: string) => {
    const newServices = selectedServices.filter((s) => s !== service);
    setValue("services", newServices, { shouldValidate: true });
  };

  // Handle form submission
  const onSubmit = (data: ServiceFormData) => {
    updateFormData(data);
    completeStep(3);
    router.push("/step/4");
  };

  return (
    <FormWizardLayout showNextButton={false}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Select Services
          </h2>
          <p className="text-gray-600">
            Choose the services {`you're`} interested in. You can select
            multiple options.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Selection */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Services
              </label>
              <span className="text-sm text-gray-500">
                {selectedServices.length} selected
              </span>
            </div>

            <button
              type="button"
              onClick={openServiceSelector}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              {selectedServices.length > 0
                ? "Change Selected Services"
                : "Select Services"}
            </button>

            {errors.services && (
              <p className="mt-1 text-sm text-red-600">
                {errors.services.message}
              </p>
            )}

            {/* Display selected services */}
            {selectedServices.length > 0 && (
              <div className="mt-4 bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Selected Services
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("services", [], { shouldValidate: true })
                    }
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                    >
                      {service}
                      <X
                        className="h-3.5 w-3.5 cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => removeService(service)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
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

      {/* Service Selector Modal */}
      <ServiceSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedServices={selectedServices}
        onSave={handleServicesSelected}
      />
    </FormWizardLayout>
  );
}
