import { z } from "zod";

// Basic Info Schema (Step 1)
export const basicInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["Developer", "Designer", "PM"], {
    required_error: "Please select a role",
  }),
  subscribe: z.boolean().optional(),
});

// Schedule Meeting Schema (Step 2)
export const scheduleMeetingSchema = z.object({
  preferredDate: z.date({
    required_error: "Please select a date",
  }),
  preferredTime: z.string().min(1, { message: "Please select a time" }),
  timezone: z.string().min(1, { message: "Please select a timezone" }),
});

// Services Schema (Step 3)
export const serviceSchema = z.object({
  services: z
    .array(z.string())
    .min(1, { message: "Please select at least one service" }),
});

// Skills Schema (Step 4)
export const skillsSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, { message: "Please select at least one skill" }),
  interestedTopics: z.string().optional(),
});

// Preferences Schema (Step 5)
export const preferencesSchema = z.object({
  workPreference: z.enum(["Remote", "Hybrid", "On-site"], {
    required_error: "Please select a work preference",
  }),
  homeOfficeReady: z.boolean().optional(),
  relocationWillingness: z.boolean().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to continue",
  }),
});

// Service categories for the UI
export const serviceCategories = {
  development: {
    label: "Development",
    options: [
      "Web Development",
      "Mobile Development",
      "Backend Development",
      "Frontend Development",
      "Full Stack Development",
    ],
  },
  design: {
    label: "Design",
    options: [
      "UI Design",
      "UX Design",
      "Graphic Design",
      "Logo Design",
      "Brand Identity",
    ],
  },
  marketing: {
    label: "Marketing",
    options: [
      "SEO Optimization",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "PPC Advertising",
    ],
  },
  consulting: {
    label: "Consulting",
    options: [
      "Business Strategy",
      "Product Strategy",
      "Market Research",
      "Competitive Analysis",
      "Digital Transformation",
    ],
  },
};

// Form schema combining all steps
export const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...scheduleMeetingSchema.shape,
  ...serviceSchema.shape,
  ...skillsSchema.shape,
  ...preferencesSchema.shape,
});

// Type inference
export type FormData = z.infer<typeof formSchema>;
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type ScheduleMeetingFormData = z.infer<typeof scheduleMeetingSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;

// Available skills for the multi-select
export const availableSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML/CSS",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "SQL",
  "NoSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "UI Design",
  "UX Design",
  "Product Management",
  "Agile",
  "Scrum",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Blockchain",
  "AR/VR",
];

// Timezones
export const timezones = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
];
