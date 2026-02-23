import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { ProfessionalInfoSchema, type ProfessionalInfo } from "@/lib/types";

const experienceOptions = ["0-2", "3-5", "6-10", "10+"] as const;

type Props = {
  onBack: () => void;
  onNext: () => void;
  saveProfessional: (data: ProfessionalInfo) => void;
};

export default function ProfessionalInfoStep({
  onBack,
  onNext,
  saveProfessional,
}: Props) {
  const form = useForm<ProfessionalInfo>({
    resolver: zodResolver(ProfessionalInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      company: "",
      position: "",
      experience: undefined,
      industry: "",
    },
  });

  const onSubmit = (values: ProfessionalInfo) => {
    saveProfessional(values);
    onNext();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Professional Details
          </h2>
          <p className="text-sm text-muted-foreground">
            Tell us a bit about your work background.
          </p>
        </div>

        {/* Company */}
        <div className="space-y-1 pt-5">
          <Label
            htmlFor="company"
            variant={errors.company ? "error" : "default"}
          >
            Company
          </Label>

          <Input
            id="company"
            placeholder="Microsoft"
            variant={errors.company ? "error" : "plain"}
            {...register("company")}
          />
          {errors.company?.message && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        {/* Position */}
        <div className="space-y-1 pt-4">
          <Label
            htmlFor="position"
            variant={errors.position ? "error" : "default"}
          >
            Position
          </Label>
          <Input
            id="position"
            placeholder="e.g. Frontend Developer"
            variant={errors.position ? "error" : "plain"}
            {...register("position")}
          />
          {errors.position?.message && (
            <p className="text-sm text-red-500">{errors.position.message}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="space-y-1 pt-4">
          <Label variant={errors.experience ? "error" : "default"}>
            Years of Experience
          </Label>

          <Controller
            control={control}
            name="experience"
            render={({ field }) => (
              <Select value={field.value as any} onValueChange={field.onChange}>
                <SelectTrigger
                  variant={errors.experience ? "error" : "soft"}
                  className="w-full"
                >
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  {experienceOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.experience?.message && (
            <p className="text-sm text-red-500">{errors.experience.message}</p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-1 pt-4">
          <Label
            htmlFor="industry"
            variant={errors.industry ? "error" : "default"}
          >
            Industry
          </Label>
          <Input
            id="industry"
            placeholder="e.g. E-commerce"
            variant={errors.industry ? "error" : "plain"}
            {...register("industry")}
          />
          {errors.industry?.message && (
            <p className="text-sm text-red-500">{errors.industry.message}</p>
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
}
