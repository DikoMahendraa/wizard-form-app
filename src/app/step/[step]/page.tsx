"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Step1Form from "@/components/screen/step-1";
import Step2Form from "@/components/screen/step-2";
import Step3Form from "@/components/screen/step-3";
import Step4Form from "@/components/screen/step-4";
import Step5Form from "@/components/screen/step-5";

type PageProps = {
  params: {
    step: string;
  };
};

export default function StepPage({ params }: PageProps) {
  const router = useRouter();
  const stepNumber = parseInt(params.step);

  // Redirect if step number is invalid
  useEffect(() => {
    if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 5) {
      router.push("/step/1");
    }
  }, [stepNumber, router]);

  // Render appropriate step component
  const renderStepComponent = () => {
    switch (stepNumber) {
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2Form />;
      case 3:
        return <Step3Form />;
      case 4:
        return <Step4Form />;
      case 5:
        return <Step5Form />;
      default:
        return <div>Loading...</div>;
    }
  };

  return renderStepComponent();
}
