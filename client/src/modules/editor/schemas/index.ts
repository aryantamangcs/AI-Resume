import { z } from "zod";

const OptionalString = z.string().trim().optional().or(z.literal(""));

export const generalInformationSchema = z.object({
  title: OptionalString,
  description: OptionalString,
});

export type GeneralInformationValues = z.infer<typeof generalInformationSchema>;
