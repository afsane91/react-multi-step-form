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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First name"
              variant={errors.firstName ? "error" : "plain"}
              {...register("firstName")}
            />
            {errors.firstName?.message && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              variant={errors.lastName ? "error" : "plain"}
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="email" variant={errors.email ? "error" : "default"}>
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="afsaneh@example.com"
            variant={errors.email ? "error" : "plain"}
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1 pt-4">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            inputMode="tel"
            placeholder="e.g. 0676 123 4567"
            variant={errors.phone ? "error" : "plain"}
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
