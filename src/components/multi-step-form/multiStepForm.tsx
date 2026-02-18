import { useState } from "react";
import type {
  StepFormData,
  PersonalInfo,
  ProfessionalInfo,
  BillingInfo,
} from "@/lib/types";

import CardForms from "../ui/cardForms";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ProfessionalInfoStep from "./steps/ProfessionalInfoStep";
import BillingInfoStep from "./steps/BillingInfoStep";
import ProgressSteps from "./ProgressSteps";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setFormData] = useState<Partial<StepFormData>>({});

  const onNext = () => {
    setCurrentStep((s) => s + 1);
  };
  const onBack = () => setCurrentStep((s) => s - 1);

  const savePersonal = (data: PersonalInfo) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const saveProfessional = (data: ProfessionalInfo) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const saveBilling = (data: BillingInfo) => {
    setFormData((prev) => {
      const next = { ...prev, ...data };
      return next;
    });
  };

  return (
    <CardForms>
      <ProgressSteps currentStep={currentStep} />
      {currentStep === 0 && (
        <PersonalInfoStep
          onNext={onNext}
          onBack={onBack}
          savePersonal={savePersonal}
        />
      )}

      {currentStep === 1 && (
        <ProfessionalInfoStep
          onBack={onBack}
          onNext={onNext}
          saveProfessional={saveProfessional}
        />
      )}
      {currentStep === 2 && (
        <BillingInfoStep onBack={onBack} saveBilling={saveBilling} />
      )}
    </CardForms>
  );
}
