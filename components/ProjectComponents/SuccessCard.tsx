"use client";

import Image from "next/image";

const SuccessCard = () => {
  return (
    <div className="flex items-center justify-center mx-4 md:mx-0 min-h-screen ">
      {/* Card */}
      <div className="relative px-4 shadow py-20 bg-white rounded-[20px] flex flex-col items-center justify-start pt-10">

        {/* Success Icon Circle */}
       <div>
        <Image src="/ciricle.svg" alt="Success Icon" width={64} height={64} />
       </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-[3px] mt-6 text-center px-4">
          <h2 className="text-[25.5px] font-bold leading-[30px] tracking-[-0.01em]">
            Congratulations
          </h2>
          <p className="text-[15px] leading-[16px] tracking-[-0.01em] text-gray-700">
            Your Premium plan has been successfully activated.
          </p>
        </div>

        {/* Button */}
        <button  className="bg-[#E9074B] rounded-md text-white px-[28px] mt-8 py-[10px]">
          Set Your Password
        </button>
      </div>
    </div>
  );
};

export default SuccessCard;