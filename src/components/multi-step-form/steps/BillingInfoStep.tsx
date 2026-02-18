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

  const inputClass =
    "h-11 w-full rounded-md border bg-white px-3 py-2 text-base transition " +
    "border-gray-200 shadow-sm " +
    "placeholder:text-gray-400 " +
    "hover:border-gray-300 hover:shadow " +
    "focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500/20 " +
    "focus:shadow-md";

  const labelClass = "text-sm font-medium text-gray-700";

  const onValid = (values: BillingInfo) => {
    saveBilling(values);
    toast.success("Form Submitted Successfully 🎉", {
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
          <Label htmlFor="cardNumber" className={labelClass}>
            Card Number
          </Label>
          <Input
            id="cardNumber"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            className={`${inputClass} ${
              errors.cardNumber ? "!border-red-400" : ""
            }`}
            {...register("cardNumber")}
          />
          {errors.cardNumber?.message && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Cardholder */}
        <div className="space-y-1 pt-4">
          <Label htmlFor="cardholderName" className={labelClass}>
            Cardholder Name
          </Label>
          <Input
            id="cardholderName"
            placeholder="e.g. Afsaneh Lotfi"
            className={`${inputClass} ${
              errors.cardholderName ? "!border-red-400" : ""
            }`}
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
            <Label htmlFor="expiryDate" className={labelClass}>
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              placeholder="MM/YY"
              className={`${inputClass} ${
                errors.expiryDate ? "!border-red-400" : ""
              }`}
              {...register("expiryDate")}
            />
            {errors.expiryDate?.message && (
              <p className="text-sm text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div className="space-y-1 pt-2">
            <Label htmlFor="cvv" className={labelClass}>
              CVV
            </Label>
            <Input
              id="cvv"
              inputMode="numeric"
              placeholder="123"
              className={`${inputClass} ${errors.cvv ? "!border-red-400" : ""}`}
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

          <Button
            type="submit"
            className="h-11 px-8 bg-linear-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
          >
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
}
