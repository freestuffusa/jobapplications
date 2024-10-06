import React, { useState } from "react";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Head from "next/head";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleLast = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    // Submit formData to backend or handle as needed
    console.log(formData);
  };

  return (
    <div className="">
      <Head>
        <title>Job Application Form</title>
      </Head>
      <main className="max-w-[1080px] mt-2 mx-3 md:mx-auto flex flex-col justify-center items-center">
        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {currentStep === 2 && <Step2 onNext={handleNext} />}
        {currentStep === 3 && <Step3 onNext={handleNext} />}
      </main>
      {currentStep === 4 && <Step4 formData={formData} />}
    </div>
  );
}
