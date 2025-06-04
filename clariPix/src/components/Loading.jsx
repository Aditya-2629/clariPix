import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full min-h-[100px]">
      <div className="relative w-24 h-24">
        {/* Outer rotating dashed circle */}
        <div className="absolute inset-0 rounded-full border-4 border-red-500 border-dashed animate-spin"></div>
        {/* Inner solid circle pulse */}
        <div className="absolute inset-6 rounded-full bg-red-500 animate-pulse"></div>
      </div>
      <span className="mt-6 text-red-600 font-semibold text-lg tracking-wide">
        Loading..!
      </span>
    </div>
  );
};

export default Loading;
