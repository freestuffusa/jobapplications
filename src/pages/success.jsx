import React from "react";

const ThankYou = () => {
  return (
    <div className="max-w-[1080px] mx-auto min-h-screen flex flex-col justify-center items-center">
      <div className="bg-green-300 p-10 mx-3">
        <h1 className="text-center text-3xl font-black mb-6">
          Thank You For Applying!
        </h1>
        <p className="text-sm">
          We sincerely appreciate your interest in joining our team and taking
          the time to submit your application. We will carefully review your
          submission. Should you be selected for the next stage of the hiring
          process, we will notify you promptly.
        </p>
      </div>
      <footer className="pt-10">
        <p className="text-xs text-center">
          Copyright © 2024 - All rights reserved by World Vision <sup>zw</sup>
        </p>
      </footer>
    </div>
  );
};

export default ThankYou;
