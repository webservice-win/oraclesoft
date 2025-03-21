import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Contextapi } from "../../context/Appcontext";
import Dashboardleftside from "../../components/Dashboard/Dashboardleftside";
import Dashboradheader from "../../components/Dashboard/Dashboardheader";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
const Subheader = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } =
    useContext(Contextapi);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const admin_info = JSON.parse(localStorage.getItem("admin_data"));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    label: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.label.trim()) {
      Swal.fire("Validation Error", "Label is required!", "error");
      return false;
    }
    if (!formData.value.trim()) {
      Swal.fire("Validation Error", "Value is required!", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields before proceeding
    if (!validateForm()) return;

    try {
      // Show progress bar popup
      Swal.fire({
        title: "Submitting...",
        html: "Please wait while your data is being submitted.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Make the API request
      const response = await axios.post(
        `${base_url}/admin/add-accordion`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            Swal.update({
              html: `Submitting... ${percentCompleted}% completed.`,
            });
          },
        }
      );

      // Handle the response
      if (response.status === 200) {
        Swal.close(); // Close progress popup
        Swal.fire("Success", "Data submitted successfully!", "success");
        setFormData({ label: "", value: "" }); // Reset form fields
      } else {
        Swal.close(); // Close progress popup
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.close(); // Close progress popup
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to submit!",
        "error"
      );
    }
  };

  return (
    <section className="w-full h-[100vh] flex font-poppins">
      <section
        className={
          activesidebar
            ? "w-0 h-[100vh] transition-all duration-300 overflow-hidden"
            : "w-0 xl:w-[20%] transition-all duration-300 h-[100vh]"
        }
      >
        <Dashboardleftside />
      </section>
      <section
        className={
          activesidebar
            ? "w-[100%] h-[100vh] overflow-y-auto transition-all duration-300"
            : " transition-all duration-300 w-[100%] overflow-y-auto xl:w-[85%] h-[100vh]"
        }
      >
        <Dashboradheader />
        <section className="w-[100%] m-auto py-[20px] xl:py-[40px] px-[15px]">
          <div className="w-full flex justify-between items-center"></div>
          {/* ------------------new category----------------- */}
          <section className="pt-[15px] pb-[30px] w-full border-[1px] border-[#eee] shadow-sm px-[20px] mt-[20px] rounded-[5px]">
            <div>
              <h2 className="text-[20px] lg:text-[20px] font-[600]">
                Add Accordion
              </h2>
            </div>
            {/* -------------------form---------------------- */}
            <form onSubmit={handleSubmit} className="pt-[15px] lg:pt-[20px]">
              <div className="w-full flex gap-[10px] lg:gap-[30px] mb-[10px]">
                <div className="w-[100%]">
                  <label
                    htmlFor="label"
                    className="text-[15px] font-[500] text-gray-600"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="label"
                    placeholder="Enter Title"
                    value={formData.label}
                    onChange={handleChange}
                    className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[45px] border-[1px] border-[#eee] p-[15px]"
                  />
                </div>
              </div>
              <div className="w-full mt-[20px] flex gap-[10px] lg:gap-[30px] mb-[10px]">
                <div className="w-[100%]">
                  <label
                    htmlFor="value"
                    className="text-[15px] font-[500] text-gray-600"
                  >
                    Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="value"
                    id=""
                    placeholder="Details..."
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full mt-[8px] rounded-[5px] placeholder-gray-500 outline-brand_color text-[14px] h-[150px] border-[1px] border-[#eee] p-[15px]"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end items-center gap-[10px]">
                <button
                  type="submit"
                  className="px-[30px] w-full h-[50px] mt-[15px] text-white text-[14px] gap-[8px] bg-indigo-500 flex justify-center items-center rounded-[5px] cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* -------------------form---------------------- */}
          </section>
          {/* ------------------------new category-------------------- */}
        </section>
      </section>
    </section>
  );
};

export default Subheader;
