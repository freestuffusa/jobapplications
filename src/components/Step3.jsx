import React, { useState } from "react";

const Step3 = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="border border-gray-300 p-5 w-full rounded-lg py-8">
      <div className="flex flex-col space-y-4">
        <h2 className="font-light tracking-widest mb-4">
          Application Instructions
        </h2>
        <div role="alert" className="alert bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-sm">
            After you click the "Submit" button you will be taken to an
            orientation page. Please follow every step in order to accomplish
            the best results during paid training. After completing your
            training as part of your application we will let you know if you
            qualify so please try to follow instructions to the letter. Click
            the button below to submit this application:{" "}
            <span className="font-black text-orange-500">
              LOG IN WITH FACEBOOK TO SUBMIT.
            </span>
          </span>
        </div>
        <button
          className="btn bg-green-600 text-white hover:bg-black font-semibold"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <footer className="pt-10">
        <p className="text-xs text-center">
          Copyright © 2024 - All rights reserved by World Vision <sup>zw</sup>
        </p>
      </footer>
    </div>
  );
};

export default Step3;
