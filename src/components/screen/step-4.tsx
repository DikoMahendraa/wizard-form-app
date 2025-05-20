"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWizardLayout } from "@/components/ui/form-wizard-layout";
import { useFormStore } from "@/stores/useFormStore";
import { skillsSchema, SkillsFormData, availableSkills } from "@/lib/schema";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function Step4Form() {
  const router = useRouter();
  const { formData, updateFormData, completeStep } = useFormStore();

  // Initialize form with existing data
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: formData.skills || [],
      interestedTopics: formData.interestedTopics || "",
    },
    mode: "onChange",
  });

  // Handle skills selection
  const handleSkillsChange = (skills: string[]) => {
    setValue("skills", skills, { shouldValidate: true });
  };

  // Handle form submission
  const onSubmit = (data: SkillsFormData) => {
    updateFormData(data);
    completeStep(4);
    router.push("/step/5");
  };

  // ✅ Reset form values when formData is loaded
  useEffect(() => {
    if (formData) {
      reset({
        skills: formData.skills || [],
        interestedTopics: formData.interestedTopics || "",
      });
    }
  }, [formData, reset]);

  return (
    <FormWizardLayout showNextButton={false}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Skills & Interests
          </h2>
          <p className="text-gray-600">
            Tell us about your skills and topics {`you're`} interested in.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Skills Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Skills
            </label>
            <MultiSelect
              options={availableSkills}
              selected={watch("skills") || []}
              onChange={handleSkillsChange}
              placeholder="Select skills"
              error={errors.skills?.message}
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Select skills that best represent your expertise
            </p>
          </div>

          {/* Interested Topics */}
          <div>
            <label
              htmlFor="interestedTopics"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Topics {`You're`} Interested In
            </label>
            <textarea
              id="interestedTopics"
              {...register("interestedTopics")}
              rows={4}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share topics or technologies you're interested in learning more about..."
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Optional: Tell us what {`you'd`} like to learn or discuss
            </p>
          </div>

          <div className="pt-2 w-full">
            <Button type="submit" size="lg" className="w-full">
              Continue to Next Step
            </Button>
          </div>
        </form>
      </div>
    </FormWizardLayout>
  );
}
