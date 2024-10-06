import React, { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";

const Step1 = ({ onNext }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (selectedImage == null) {
      alert("Please upload your National ID");
    } else {
      onNext({ fullName, email, phoneNumber, dateOfBirth, selectedImage });
    }
  };

  return (
    <div className="border border-gray-300 p-5 w-full rounded-lg py-8">
      <div className="flex flex-col space-y-4">
        <h2 className="font-light tracking-widest">Job Application Form</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="grow"
            placeholder="Full Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <BiSolidPhoneCall color="#626973" />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="grow"
            placeholder="Phone Number"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Date of Birth</span>
          </div>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>
        <div className="flex flex-col items-center p-4">
          <label className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            <div className="flex p-6 flex-col items-center">
              <AiOutlineUpload className="text-4xl text-gray-500 mb-2" />
              <span className="text-gray-800 font-bold">
                Upload the front of your National ID
              </span>
            </div>
          </label>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="mt-4 max-w-xs rounded-lg shadow-lg"
            />
          )}
        </div>
        <p className="font-light text-xs text-center">
          Please enter details as they appear on your Government documents.
        </p>
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

export default Step1;
