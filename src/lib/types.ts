
import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});


export const ProfessionalInfoSchema = z.object({
    company : z.string().min(1,'Company is required'),
    position : z.string().min(1,'Position is required'),
    experience: z.enum(['0-2','3-5','6-10','10+']),
    industry : z.string().min(1,'Industry is required'),

 })

 export const billingInfoSchema = z.object({
    cardNumber : z.string()
    .min(16,'Card number must be 16 digits')
    .max(16,'Card number must be 16 digits'),
   cardholderName: z
    .string()
    .min(2, "Cardholder name is required"),
    expiryDate : z.string()
    .min(4,'Invalid Expiry date'),
    cvv : z.string()
    .min(3,'Invalid Cvv')
 })

 export type PersonalInfo = z.infer<typeof personalInfoSchema>
 export type ProfessionalInfo = z.infer<typeof ProfessionalInfoSchema>
 export type BillingInfo = z.infer<typeof billingInfoSchema>
 export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo

 export interface formSteps{
    id:string;
    name:string;
    icon:React.ComponentType<{className?:string}>
 }
