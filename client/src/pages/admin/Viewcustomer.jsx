import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Contextapi } from '../../context/Appcontext';
import Dashboardleftside from '../../components/Dashboard/Dashboardleftside';
import Dashboradheader from '../../components/Dashboard/Dashboardheader';
import { IoIosArrowForward } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { LuSaveAll } from "react-icons/lu";
import axios from 'axios';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaCreditCard, FaWallet, FaUniversity, FaExchangeAlt } from "react-icons/fa";

const DashboardCard = ({ title, amount, icon, bgColor }) => {
  return (
    <div className={`flex flex-col w-full  p-4 py-[30px] rounded-lg ${bgColor} text-white shadow-md`}>      
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold">{amount} USD</div>
    </div>
  );
};

const Viewcustomer = () => {
  const navigate = useNavigate();
  const { activesidebar, setactivesidebar, activetopbar, setactivetopbar } = useContext(Contextapi);
  const [showmodal, setmodal] = useState(false);
  const [customer_data, set_customer] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const {id}=useParams();
  // ------------email and password copy button------------------
  const [emailCopyStatus, setEmailCopyStatus] = useState('');
  const [passwordCopyStatus, setPasswordCopyStatus] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(customer_data.email)
      .then(() => setEmailCopyStatus('Copied!'))
      .catch(() => setEmailCopyStatus('Failed to copy'));
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(customer_data.password)
      .then(() => setPasswordCopyStatus('Copied!'))
      .catch(() => setPasswordCopyStatus('Failed to copy'));
  };

  const uploadpost = () => {
    setmodal(true);
  };

  const handlesidebar = () => {
    setactivesidebar(!activesidebar);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setactivetopbar(true);
      } else {
        setactivetopbar(false);
      }
    });
  }, []);

  const customer_info = () => {
    axios
      .get(`${base_url}/admin/customer-details/${id}`)
      .then((res) => {
        if (res.data.success) {
          set_customer(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.name);
      });
  };

  useEffect(() => {
    customer_info();
  }, []);
// ----------------handle-user-login-------------------
const handleuserlogin = () => { 
      axios.post(`${base_url}/admin/find-user-by-email`, { email: customer_data.email})
      .then((res) => {
        if (res.data.success) { 
          localStorage.setItem("token", res.data.jwtToken);
          localStorage.setItem("user_data", JSON.stringify(res.data.admin_data));
          console.log(res.data)
          navigate("/user-dashboard");
        } else {
          console.log(res.data.message);
        }
}).catch((err)=>{
  console.log(err)
})
}
  return (
    <section className='w-full h-[100vh] flex font-poppins'>
      <section className={activesidebar ? 'w-0 h-[100vh] transition-all duration-300 overflow-hidden' : 'w-0 md:w-[20%] transition-all duration-300 h-[100vh]'}>
        <Dashboardleftside />
      </section>
      <section className={activesidebar ? 'w-[100%] h-[100vh] overflow-y-auto transition-all duration-300' : 'transition-all duration-300 w-[100%] overflow-y-auto md:w-[85%] h-[100vh]'}>
        <Dashboradheader />
        <section className='w-[100%] m-auto py-[20px] xl:py-[40px] px-[30px]'>
          <section>
          <div className="p-6 w-full">
<div className='flex justify-between items-center mb-[20px]'>
<h2 className="text-lg font-semibold mb-4">User Detail - {customer_data.name}</h2>
<button className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"onClick={handleuserlogin}>🔓 Login as User</button>

</div>
      <div className="flex gap-4 w-full">
        <DashboardCard title="Balance" amount="$0.50" icon={<FaCreditCard />} bgColor="bg-blue-800" />
        <DashboardCard title="Deposits" amount="$0.00" icon={<FaWallet />} bgColor="bg-green-600" />
        <DashboardCard title="Withdrawals" amount="$0.00" icon={<FaUniversity />} bgColor="bg-orange-600" />
        <DashboardCard title="Transactions" amount="1" icon={<FaExchangeAlt />} bgColor="bg-blue-900" />
      </div>
    </div>
          </section>
  <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] m-auto">
      <div key={customer_data._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{customer_data.name}</h2>
        <div className="space-y-2">
          <p className="text-[17px] text-gray-600">
            <span className="font-semibold">Email:</span> {customer_data.email}
            <button
              onClick={handleCopyEmail}
              className="ml-2 text-blue-500 hover:text-blue-700 transition-all"
            >
              {emailCopyStatus === 'Copied!' ? (
                <FaCheck className="text-green-500" />
              ) : (
                <MdOutlineContentCopy className="text-blue-500 hover:text-blue-700" />
              )}
            </button>
            {emailCopyStatus && <span className="text-sm text-green-500 ml-2">{emailCopyStatus}</span>}
          </p>
          <p className="text-[17px] text-gray-600">
            <span className="font-semibold">Password:</span> {customer_data.password}
            <button
              onClick={handleCopyPassword}
              className="ml-2 text-purple-500 hover:text-purple-700 transition-all"
            >
              {passwordCopyStatus === 'Copied!' ? (
                <FaCheck className="text-green-500" />
              ) : (
                <MdOutlineContentCopy className="text-purple-500 hover:text-purple-700" />
              )}
            </button>
            {passwordCopyStatus && <span className="text-sm text-green-500 ml-2">{passwordCopyStatus}</span>}
          </p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">WhatsApp:</span> {customer_data.whatsapp}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Telegram:</span> {customer_data.telegram}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Role:</span> {customer_data.role}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Deposit Balance:</span> ${customer_data.deposit_balance}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Due Balance:</span> ${customer_data.due_balance}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Total Orders:</span> {customer_data.total_order}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Paid Amount:</span> ${customer_data.paid_amount}</p>
          <p className="text-[17px] text-gray-600"><span className="font-semibold">Joined:</span> {customer_data.createdAt?.slice(0,10)}</p>
        </div>
      </div>
  </div>
</section>
      </section>
    </section>
  );
};

export default Viewcustomer;