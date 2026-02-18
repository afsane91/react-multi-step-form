import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PersonalInfo } from "@/lib/types";
import { personalInfoSchema } from "@/lib/types";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onNext: () => void;
  onBack: () => void;
  savePersonal: (data: PersonalInfo) => void;
};

const PersonalInfoStep = ({ onNext, savePersonal }: Props) => {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      Phone: "",
    } as any,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: PersonalInfo) => {
    savePersonal(values);
    onNext();
  };

  // same style as other steps
  const inputClass =
    "h-11 w-full rounded-md border bg-white px-3 py-2 text-base transition " +
    "border-gray-200 shadow-sm " +
    "placeholder:text-gray-400 " +
    "hover:border-gray-300 hover:shadow " +
    "focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500/20 " +
    "focus:shadow-md";
  const labelClass = "text-sm font-medium text-gray-700";

  function onBack(_event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Personal Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Please enter your basic details to continue.
          </p>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-5">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={labelClass}>
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              className={`${inputClass} ${
                errors.firstName ? "border-red-400!" : ""
              }`}
              {...register("firstName")}
            />
            {errors.firstName?.message && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className={labelClass}>
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last name"
              className={`${inputClass} ${
                errors.lastName ? "border-red-400!" : ""
              }`}
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="email" className={labelClass}>
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="afsaneh@example.com"
            className={`${inputClass} ${errors.email ? "border-red-400!" : ""}`}
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1 pt-4">
          <Label htmlFor="phone" className={labelClass}>
            Phone number
          </Label>
          <Input
            id="phone"
            inputMode="tel"
            placeholder="e.g. 0676 123 4567"
            className={`${inputClass} ${errors.phone ? "!border-red-400" : ""}`}
            {...register("phone" as any)}
          />
          {errors.phone?.message && (
            <p className="text-sm text-red-500">
              {errors.phone.message as any}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-8 pb-3">
          <Button variant="soft" type="button" onClick={onBack}>
            Back
          </Button>

          <Button type="submit" variant="gradient">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
