import React from "react";
import CompareImage from "react-compare-image";
import Loading from "./Loading";
import { ImageOff } from "lucide-react"; // Optional icon

const ImagePreview = ({ uploaded, enhanced, loading }) => {
  if (!uploaded) {
    return (
      <div className="flex flex-col justify-center items-center h-80 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-inner border border-dashed border-gray-300 dark:border-gray-600">
        <ImageOff className="w-10 h-10 mb-2" />
        <p className="font-medium">No image selected</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4">
          Original Image
        </h2>
        <img
          src={uploaded}
          alt="Original"
          className="w-full object-contain h-96 bg-gray-50 dark:bg-gray-800"
        />
        <div className="flex justify-center my-6">
          <Loading />
        </div>
      </div>
    );
  }

  if (uploaded && enhanced) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <CompareImage
          leftImage={uploaded}
          rightImage={enhanced}
          leftImageLabel="Original"
          rightImageLabel="Enhanced"
          sliderLineWidth={2}
          sliderLineColor="#3b82f6"
          handleSize={40}
        />

        <div className="flex justify-center mt-8">
          <a
            href={enhanced}
            download="claripix-enhanced.jpg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow transition duration-300"
          >
            ⬇ Download Enhanced Image
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-80 bg-gray-200 text-gray-600 rounded-lg">
      No Enhanced Image
    </div>
  );
};

export default ImagePreview;
