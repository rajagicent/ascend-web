"use client";

import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useState} from "react";
import { createPassword } from "@/action/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PasswordUpdate = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreatePassword = async () => {
    console.log("password", password);
    
    setLoading(true);
    try {
      const response = await createPassword({ password });
      console.log("response", response);
      
      if (response.success) {
        Cookies.set("onboarding_complete", "true", { expires: 1/24 }); // 1 hour
        localStorage.removeItem("onboarding_data")
        localStorage.removeItem("onboarding_step")
        Cookies.remove("ascend_token");
        Cookies.remove("survey_uuid")
        router.push("/download");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = password.length > 0 && confirm.length > 0;

  return (
    <div className="min-h-screen flex justify-center items-center  px-3 pd:px-0 py-6">
      <div className="w-full max-w-[393px] h-fit bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-6">
        
        {/* Title + Subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-bold text-[#1E1E1E] tracking-[-0.5px]">
            Build a Strong Password 💪
          </h1>
          <p className="text-[16px] font-medium text-[#989898]">
            Just like your workouts, make it powerful and unique.
          </p>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-[#2A2A2A] tracking-[-0.5px]">
            Password
          </label>

          <div className="flex items-center justify-between px-4 h-[56px] border-2 border-[#E1E1E1] rounded-[10px]">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="flex-1 bg-transparent outline-none text-[16px] font-medium text-[#2A2A2A]"
            />
            <button onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? <Eye size={20} color="gray" /> : <EyeOff size={20} color="gray" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-[#2A2A2A] tracking-[-0.5px]">
            Confirm Password
          </label>

          <div className="flex items-center justify-between px-4 h-[56px] border-2 border-[#E1E1E1] rounded-[10px]">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className="flex-1 bg-transparent outline-none text-[16px] font-medium text-[#2A2A2A]"
            />
            <button onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <Eye size={20} color="gray" /> : <EyeOff size={20} color="gray" />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
        onClick={handleCreatePassword}
          disabled={!isActive}
          className={`w-full h-[48px]  rounded-[10px] flex items-center justify-center transition-all duration-200
          ${
            isActive
              ? "bg-[#1E1E1E] cursor-pointer"
              : "bg-[#DADADA] cursor-not-allowed"
          }`}
        >
          <span className="text-[18px] font-bold text-white">
            Save & submit
          </span>
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdate;