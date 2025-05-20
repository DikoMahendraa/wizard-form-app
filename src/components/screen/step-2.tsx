"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import {
  scheduleMeetingSchema,
  ScheduleMeetingFormData,
  timezones,
} from "@/lib/schema";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Step2Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();

  // Initialize form with existing data
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleMeetingFormData>({
    resolver: zodResolver(scheduleMeetingSchema),
    defaultValues: {
      preferredDate: formData.preferredDate || undefined,
      preferredTime: formData.preferredTime || "",
      timezone: formData.timezone || "",
    },
    mode: "onChange",
  });

  // Handle form submission
  const onSubmit = (data: ScheduleMeetingFormData) => {
    updateFormData(data);
    completeStep(2);
    router.push("/step/3");
  };

  // Time options
  const timeOptions = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  return (
    <FormWizardLayout showNextButton={false}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Schedule a Meeting
          </h2>
          <p className="text-gray-600">
            Select your preferred date and time for our initial consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <Controller
              name="preferredDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between rounded-md border ${
                        errors.preferredDate
                          ? "border-red-300"
                          : "border-gray-300"
                      } bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-gray-500">Select a date</span>
                      )}
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.preferredDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.preferredDate.message}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label
              htmlFor="preferredTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Time
            </label>
            <Controller
              name="preferredTime"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between rounded-md border ${
                        errors.preferredTime
                          ? "border-red-300"
                          : "border-gray-300"
                      } bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      {field.value ? (
                        field.value
                      ) : (
                        <span className="text-gray-500">Select a time</span>
                      )}
                      <Clock className="h-5 w-5 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-0" align="start">
                    <div className="max-h-60 overflow-auto p-1">
                      {timeOptions.map((time) => (
                        <div
                          key={time}
                          className={`px-4 py-2 cursor-pointer rounded-md ${
                            field.value === time
                              ? "bg-blue-100 text-blue-900"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            field.onChange(time);
                          }}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.preferredTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.preferredTime.message}
              </p>
            )}
          </div>

          {/* Timezone Selection */}
          <div>
            <label
              htmlFor="timezone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Timezone
            </label>
            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="timezone"
                  className={`w-full rounded-md border ${
                    errors.timezone ? "border-red-300" : "border-gray-300"
                  } shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a timezone</option>
                  {timezones.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.timezone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.timezone.message}
              </p>
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
    </FormWizardLayout>
  );
}
