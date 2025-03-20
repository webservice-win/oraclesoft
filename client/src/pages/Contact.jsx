import React, { useEffect } from "react";
import Header from "../components/Header";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
const Contact = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section>
      <section className="w-full  h-[70vh] ">
        <Header />
        <div className="hero w-full relative font-rubik bg-main_section h-[50vh] flex justify-center gap-[100px] items-center  px-[20px] md:px-[30px] lg:px-[60px] xl:px-[100px] py-[20px] overflow-hidden">
          <div className="overlaw absolute top-0 left-0 w-full h-full ">
            <img
              src="https://www.tawk.to/wp-content/uploads/2023/04/ATF-Background-Graphic.png"
              alt=""
            />
          </div>
          {/* --------------animation---------------- */}
          <div className="absolute w-4 h-4 bg-white rounded-full animate-bubble left-10 bottom-10"></div>
          <div className="absolute w-6 h-6 bg-white rounded-full animate-bubble left-20 bottom-20 delay-200"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full animate-bubble left-30 bottom-5 delay-500"></div>
          <div className="absolute w-5 h-5 bg-white rounded-full animate-bubble left-40 bottom-15 delay-1000"></div>
          {/* -------------hero section------------ */}
          <div className="hero w-full flex justify-center items-center z-[1]">
            <div className="text-center w-[90%] lg:w-[90%]  font-noto-sans">
              <h1 className="text-[20px] lg:text-[40px] font-bold mb-[10px] text-white">
                আমাদের সাথে যোগাযোগ করুন হুটস এপস অথবা লাইভ চ্যাট এ
              </h1>
              <p className="text-[16px]  lg:text-[18px] text-neutral-200">
                যেহেতু আমরা রিমোটলি কাজ করি এবং আমরা বেটিং সাইট নিয়ে কাজ করি যার
                ফলে সরাসরি অফিসিয়াল ডিল করা সম্ভব হয় না তাই আপনাকে আমাদের হুটস
                এপস যোগাযোগ এর মাধ্যমে বেটিং সাইট ডেভেলপমেন্ট করে নিতে হবে 
              </p>
            </div>
          </div>
          {/* ------------hero section------------ */}
        </div>
        {/* --------------------------section--------------- */}
        {/* -------------contact-form--------------- */}
        <div className="flex flex-col lg:flex-row  font-rubik px-[20px] md:px-[30px] gap-[20px] lg:px-[50px] xl:px-[100px] py-[80px] bg-[url('https://demo.rstheme.com/html/flixta/assets/images/bg/contact-bg-01.png')]  bg-no-repeat bg-cover">
          <div className="w-full lg:w-1/2 lg:p-10">
            <h3 className="text-blue-600 text-[22px] font-semibold ">
              STAY CONNECTED
            </h3>
            <h1 className="text-[35px] font-bold mt-4">Let's Work Together!</h1>
            <div className="mt-8">
              <div className="flex items-center mb-6 gap-[25px]">
                <div className="w-[60px] h-[60px] p-[7px] rounded-full bg-indigo-200">
                  <div className="w-full h-full rounded-full flex justify-center items-center bg-[#5777FF]">
                    <FaPhoneAlt className="text-white text-[20px] " />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Phone</h4>
                  <p className="text-lg font-semibold">
                    +33756757364 (Whats App)
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6 gap-[25px]">
                <div className="w-[60px] h-[60px] p-[7px] rounded-full bg-indigo-200">
                  <div className="w-full h-full rounded-full flex justify-center items-center bg-[#5777FF]">
                    <FaEnvelope className="text-white text-[20px] " />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Email</h4>
                  <p className="text-lg font-semibold">
                    {import.meta.env.VITE_SITE_NAME === "oraclescript"
                      ? "support@oraclescript.org"
                      : "support@webservice.win"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[25px]">
                <div className="w-[60px] h-[60px] p-[7px] rounded-full bg-indigo-200">
                  <div className="w-full h-full rounded-full flex justify-center items-center bg-[#5777FF]">
                    <FaMapMarkerAlt className="text-white text-[20px] " />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Address</h4>
                  <p className="text-lg font-semibold">
                    {import.meta.env.VITE_SITE_NAME === "oraclescript"
                      ? "PROTASHA Complex House #22/D Road -1 Block #D App #AC-4 (Floor 4th) Bosundhara Dhaka 1229 Dhaka, Bangladesh"
                      : "SkyCasino Level 1 Genting Highlands, Malaysia"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:p-10">
            <form className="bg-white p-8 shadow-md rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 border-[1px] border-[#eee] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <select className="p-3 border rounded-md text-neutral-400 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option className="text-neutral-400">Choose Service</option>
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                </select>
              </div>
              <textarea
                rows="5"
                placeholder="Write Your Message"
                className="mt-4 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <section>
          <Footer />
        </section>
        {/* --------------------------section--------------- */}
      </section>
    </section>
  );
};

export default Contact;
