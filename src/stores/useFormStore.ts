"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormData } from "@/lib/schema";

interface FormState {
  formData: Partial<FormData>;
  setFormData: <T>(step: keyof FormData, data: T) => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  completeStep: (step: number) => void;
  completedSteps: number[];
  isStepCompleted: (step: number) => boolean;
}

// Initial state
const initialState: Partial<FormData> = {
  fullName: "",
  email: "",
  role: undefined,
  subscribe: false,
  preferredDate: undefined,
  preferredTime: "",
  timezone: "",
  services: [],
  skills: [],
  interestedTopics: "",
  workPreference: undefined,
  homeOfficeReady: false,
  relocationWillingness: false,
  termsAccepted: false,
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: { ...initialState },
      completedSteps: [],

      // Update form data for a specific step
      setFormData: (step, data) => {
        set((state) => ({
          formData: { ...state.formData, [step]: data },
        }));
      },

      // Update multiple form fields at once
      updateFormData: (data) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
        }));
      },

      // Reset form to initial state
      resetForm: () => {
        set({ formData: { ...initialState }, completedSteps: [] });
      },

      // Mark a step as completed
      completeStep: (step) => {
        set((state) => {
          if (state.completedSteps.includes(step)) {
            return state;
          }
          return {
            completedSteps: [...state.completedSteps, step].sort(
              (a, b) => a - b
            ),
          };
        });
      },

      // Check if a step is completed
      isStepCompleted: (step) => {
        return get().completedSteps.includes(step);
      },
    }),
    {
      name: "form-wizard-storage",
    }
  )
);
