import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { billingInfoSchema, type BillingInfo } from "@/lib/types";
import { toast } from "sonner";

type Props = {
  onBack: () => void;
  saveBilling: (data: BillingInfo) => void;
};

export default function BillingInfoStep({ onBack, saveBilling }: Props) {
  const form = useForm<BillingInfo>({
    resolver: zodResolver(billingInfoSchema),
    mode: "onSubmit",
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onValid = (values: BillingInfo) => {
    saveBilling(values);
    toast.success("Form Submitted Successfully", {
      description: `Thank you ${values.cardholderName}! Your data has been saved successfully.`,
      action: {
        label: "Close",
        onClick: () => console.log("closed"),
      },
    });
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onValid)} className="w-full max-w-3xl">
        {/* header */}
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Billing Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Add your card details to complete setup.
          </p>
        </div>

        {/* Card Number */}
        <div className="space-y-1 pt-2">
          <Label
            htmlFor="cardNumber"
            variant={errors.cardNumber ? "error" : "default"}
          >
            Card Number
          </Label>
          <Input
            id="cardNumber"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            variant={errors.cardNumber ? "error" : "plain"}
            {...register("cardNumber")}
          />
          {errors.cardNumber?.message && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Cardholder */}
        <div className="space-y-1 pt-4">
          <Label
            htmlFor="cardholderName"
            variant={errors.cardNumber ? "error" : "default"}
          >
            Cardholder Name
          </Label>
          <Input
            id="cardholderName"
            placeholder="e.g. Afsaneh Lotfi"
            variant={errors.cardholderName ? "error" : "plain"}
            {...register("cardholderName")}
          />
          {errors.cardholderName?.message && (
            <p className="text-sm text-red-500">
              {errors.cardholderName.message}
            </p>
          )}
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2">
          <div className="space-y-1 pt-2">
            <Label
              htmlFor="expiryDate"
              variant={errors.expiryDate ? "error" : "default"}
            >
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              placeholder="MM/YY"
              variant={errors.expiryDate ? "error" : "plain"}
              {...register("expiryDate")}
            />
            {errors.expiryDate?.message && (
              <p className="text-sm text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div className="space-y-1 pt-2">
            <Label htmlFor="cvv" variant={errors.cvv ? "error" : "default"}>
              CVV
            </Label>
            <Input
              id="cvv"
              inputMode="numeric"
              placeholder="123"
              variant={errors.cvv ? "error" : "plain"}
              {...register("cvv")}
            />
            {errors.cvv?.message && (
              <p className="text-sm text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between pt-8">
          <Button variant="soft" type="button" onClick={onBack}>
            Back
          </Button>

          <Button type="submit" variant="gradient">
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
}
