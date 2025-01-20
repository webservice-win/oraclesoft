import React, { useState,useEffect} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import login_img from "../assets/login.png";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
const Login = () => {
    const pathname=useLocation();
      useEffect(()=>{
        window.scrollTo(0,0)
  },[pathname])
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
   const base_url="https://admin-api.oraclesoft.org";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validation
    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Check The Information",
        text: "Please enter your information.",
      });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }else if(!email=="" || !password==""){
            axios.post(`${base_url}/auth/login`,{email,password})
            .then((res)=>{
              if(res.data.success==true){
                Swal.fire({
        icon: "success",
        title: "Successful",
        text: `${res.data.message}`,
      });

                setTimeout(() => {
                  if(res.data.admin_data.role=="user"){
                    navigate('/user-dashboard')
                    localStorage.setItem('user_token', res.data.jwtToken);
                    localStorage.setItem('user_data',JSON.stringify(res.data.admin_data));
                  }else if(res.data.admin_data.role=="admin"){
                    navigate('/dashboard')
                    localStorage.setItem('token', res.data.jwtToken);
                    localStorage.setItem('admin_data',JSON.stringify(res.data.admin_data));
                  }
                }, 1000)
              }else{
                           Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: `${res.data.message}`,
      });
              }
            }).catch((err)=>{
              console.log(err)
            })
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <section>
      <div className="font-poppins">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-[#eee] rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              {/* Go Back Button */}
              <div className="mb-4">
                <button
                  className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-blue-600 transition"
                  onClick={handleGoBack}
                >
                  <AiOutlineArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
  <div className="mb-8">
    <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
  </div>
  {/* Email Field */}
  <div>
    <label className="text-gray-800 text-sm mb-2 block">Email</label>
    <div className="relative flex items-center">
      <input
        name="email"
        type="text"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
        placeholder="Enter email"
      />
    </div>
  </div>
  {/* Password Field */}
  <div>
    <label className="text-gray-800 text-sm mb-2 block">Password</label>
    <div className="relative flex items-center">
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleInputChange}
        className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-[5px] outline-blue-600"
        placeholder="Enter password"
      />
      <div
        className="absolute right-4 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />
        ) : (
          <AiOutlineEye className="text-gray-500 w-5 h-5" />
        )}
      </div>
    </div>
  </div>
  {/* Sign In Button */}
  <div className="!mt-8">
    <button
      type="submit"
      className="w-full shadow-md py-[12px] px-4 text-sm tracking-wide rounded-lg text-white bg-btncolor1 focus:outline-none"
    >
      Sign in
    </button>
  </div>
  {/* Links */}
  <div className="flex justify-between mt-4 text-sm">
    {/* <a
      href="/forgot-password"
      className="text-blue-600 hover:underline"
    >
      Forgot Password?
    </a> */}
    <NavLink
      to="/registration"
      className="text-blue-600 hover:underline"
    >
      Do not have an acocunt? Register
    </NavLink>
  </div>
</form>

            </div>
            <div className="max-md:mt-8 lg:block hidden">
              <img src={login_img} className="w-full block" alt="Dining Experience" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
