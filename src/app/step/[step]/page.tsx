import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

type PageProps = {
  params: Promise<{
    step: string;
  }>;
};


const Step1Form = dynamic(() => import("@/components/screen/step-1"));
const Step2Form = dynamic(() => import("@/components/screen/step-2"));
const Step3Form = dynamic(() => import("@/components/screen/step-3"));
const Step4Form = dynamic(() => import("@/components/screen/step-4"));
const Step5Form = dynamic(() => import("@/components/screen/step-5"));

const stepComponents: Record<number, React.ReactNode> = {
  1: <Step1Form />,
  2: <Step2Form />,
  3: <Step3Form />,
  4: <Step4Form />,
  5: <Step5Form />,
};

export default async function StepPage({ params }: PageProps) {
  const stepNumber = parseInt((await params).step);

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 5) {
    redirect("/step/1");
  }

  return stepComponents[stepNumber] || <div>Loading...</div>;
}


// Code Splitting  with loading
// "use client"

// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// import CenteredLoader from "@/components/ui/loader";
// import { useEffect } from "react";

// type PageProps = {

//     step: string;

// };

// const Step1Form = dynamic(() => import("@/components/screen/step-1"), {
//   ssr: false,
//   loading: () => <CenteredLoader label="Loading Step 1..." />,
// });
// const Step2Form = dynamic(() => import("@/components/screen/step-2"), {
//   ssr: false,
//   loading: () => <CenteredLoader label="Loading Step 2..." />,
// });
// const Step3Form = dynamic(() => import("@/components/screen/step-3"), {
//   ssr: false,
//   loading: () => <CenteredLoader label="Loading Step 3..." />,
// });
// const Step4Form = dynamic(() => import("@/components/screen/step-4"), {
//   ssr: false,
//   loading: () => <CenteredLoader label="Loading Step 4..." />,
// });
// const Step5Form = dynamic(() => import("@/components/screen/step-5"), {
//   ssr: false,
//   loading: () => <CenteredLoader label="Loading Step 5..." />,
// });

// const stepComponents: Record<number, React.ReactNode> = {
//   1: <Step1Form />,
//   2: <Step2Form />,
//   3: <Step3Form />,
//   4: <Step4Form />,
//   5: <Step5Form />,
// };

 
// export default function StepPageClient({ step }: PageProps) {
//   const stepNumber = parseInt(step);
//   const router = useRouter();

//   useEffect(() => {
//     if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 5) {
//       router.replace("/step/1");
//     }
//   }, [stepNumber, router]);

//   return stepComponents[stepNumber] || <CenteredLoader />;
// }


