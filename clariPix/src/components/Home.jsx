import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageApi } from "../utils/enhancedImageApi";
import DarkToggle from "./DarkToggle"; // import toggle button

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = async (image) => {
    if (!image) return;

    const imageURL = URL.createObjectURL(image);
    setUploadImage(imageURL);
    setLoading(true);

    try {
      const enhancedURL = await enhancedImageApi(image);
      setEnhancedImage(enhancedURL);
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (uploadImage) URL.revokeObjectURL(uploadImage);
    };
  }, [uploadImage]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 text-gray-900 dark:text-white px-4 py-6">
      <DarkToggle />
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          ClariPix
        </h1>
        <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
          Bring clarity to your images with AI enhancement ✨
        </p>
      </header>

      {/* Upload & Preview */}
      <main className="flex flex-col gap-10 max-w-5xl mx-auto w-full">
        <ImageUpload uploadImageHandler={uploadImageHandler} />
        <ImagePreview
          loading={loading}
          uploaded={uploadImage}
          enhanced={enhancedImage}
        />
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        Made with 💙 by ClariPix Team
      </footer>
    </div>
  );
};

export default Home;
