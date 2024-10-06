import React, { useState } from "react";

const Step2 = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="border border-gray-300 p-5 !w-full rounded-lg py-8">
      <div className="flex flex-col space-y-3">
        <h2 className="font-light tracking-widest mb-4">Job Interest</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Applying for position: </span>
          </div>
          <select className="select select-bordered">
            <option disabled selected>
              Choose Position
            </option>
            <option>Class 2 Driver</option>
            <option>Field Agent</option>
            <option>Health Care Assistant</option>
            <option>General Hand</option>
          </select>
        </label>
        <div className="pt-7">
          <h3 className="text-sm">Type of employment: </h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Full Time</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-green-500"
                checked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Part Time</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-green-500"
                checked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Temporary Contract</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-green-500"
                checked
              />
            </label>
          </div>
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

export default Step2;
