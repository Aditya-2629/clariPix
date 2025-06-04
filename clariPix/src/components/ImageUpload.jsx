import React, { useState } from "react";
import { UploadCloud } from "lucide-react"; // Optional icon

const ImageUpload = ({ uploadImageHandler }) => {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      setErrorMsg("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg("Image size should be less than 5MB.");
      return;
    }

    setErrorMsg("");
    uploadImageHandler(file);
  };

  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`transition-all duration-300 p-[2px] rounded-2xl bg-gradient-to-tr ${
        dragActive
          ? "from-blue-500 to-purple-600"
          : "from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-4 text-blue-600 dark:text-blue-300">
          <UploadCloud className="inline-block w-6 h-6 mr-2" />
          Upload Your Image
        </h2>

        <label
          htmlFor="fileInput"
          className="block cursor-pointer text-center transition-all"
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={onChange}
          />
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium">
            <span className="text-blue-600 dark:text-blue-300 font-semibold">
              Click
            </span>{" "}
            or{" "}
            <span className="text-blue-600 dark:text-blue-300 font-semibold">
              Drag & Drop
            </span>{" "}
            your image here 🚀
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            (JPG or PNG under 5MB)
          </p>
        </label>

        {errorMsg && (
          <p className="text-red-600 mt-4 text-sm font-semibold text-center">
            ⚠ {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
