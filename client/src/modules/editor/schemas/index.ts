import { z } from "zod";

const OptionalString = z.string().trim().optional().or(z.literal(""));

export const generalInformationSchema = z.object({
  title: OptionalString,
  description: OptionalString,
});

export const personalInformationSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "Image must be less than 4 MB",
    ),
  first_name: OptionalString,
  last_name: OptionalString,
  job_title: OptionalString,
  city: OptionalString,
  country: OptionalString,
  email: OptionalString,
  phone: OptionalString,
  github: OptionalString,
  linkedin: OptionalString,
});

export const workExperienceSchema = z.object({
  work_experiences: z
    .array(
      z.object({
        position: OptionalString,
        company: OptionalString,
        start_date: OptionalString,
        end_date: OptionalString,
        description: OptionalString,
      }),
    )
    .optional(),
});
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: OptionalString,
        school: OptionalString,
        start_date: OptionalString,
        end_date: OptionalString,
      }),
    )
    .optional(),
});
export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: OptionalString,
        description: OptionalString,
      }),
    )
    .optional(),
});

export const skillsSchema = z.object({
  skills: z.array(z.string().optional()).optional(),
});
export const summarySchema = z.object({
  summary: z.string().optional(),
});

export const resumeSchema = z.object({
  ...generalInformationSchema.shape,
  ...personalInformationSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  ...projectSchema.shape,
});

export type GeneralInformationValues = z.infer<typeof generalInformationSchema>;
export type PersonalInformationValues = z.infer<
  typeof personalInformationSchema
>;
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
export type EducationValues = z.infer<typeof educationSchema>;
export type SkillsValues = z.infer<typeof skillsSchema>;
export type SummaryValue = z.infer<typeof summarySchema>;
export type projectValues = z.infer<typeof projectSchema>;
export type ResumeValues = z.infer<typeof resumeSchema>;
