// app/step/[step]/page.tsx (server component)
import Step1Form from "@/components/screen/step-1";
import Step2Form from "@/components/screen/step-2";
import Step3Form from "@/components/screen/step-3";
import Step4Form from "@/components/screen/step-4";
import Step5Form from "@/components/screen/step-5";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    step: string;
  }>;
};

export default async function StepPage({ params }: PageProps) {
  const stepNumber = parseInt((await params).step);

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 5) {
    redirect("/step/1");
  }

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
