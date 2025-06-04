import axios from "axios";

const baseUrl = "https://techhk.aoscdn.com/api/tasks/visual/scale";
const apiKey = import.meta.env.VITE_API_KEY;

// console.log("API Key:", apiKey); // Debugging line to check if API key is loaded correctly

export const enhancedImageApi = async (image) => {
  try {
    const taskId = await uploadImage(image);
    console.log("image task id: ", taskId);

    const enhancedImageData = await pollEnhancedImage(taskId);
    console.log("Enhanced Image Data: ", enhancedImageData);

    return enhancedImageData.image; // ✅ This is the final URL
  } catch (error) {
    console.log("ERROR in Enhancing image:", error.message);
  }
};

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image_file", image);

  const res = await axios.post(`${baseUrl}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": apiKey,
    },
  });

  console.log("response data:", res.data);

  if (!res?.data?.data?.task_id) {
    throw new Error("error in uploading image || task_id not found");
  }

  return res.data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
  const res = await axios.get(`${baseUrl}/${taskId}`, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });

  if (!res?.data?.data) {
    throw new Error("error in fetching enhancedImage || image not found");
  }

  return res.data.data;
};

const pollEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  const { state } = result;

  if (state === 4) {
    console.log("Processing...");

    if (retries >= 20) {
      throw new Error("Max retries reached. Exiting.");
    }

    console.log("Retrying in 2 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return pollEnhancedImage(taskId, retries + 1);
  }

  console.log("Enhanced Image Data Object:", result);
  return result; // ✅ full object with `.image`, `.state`, etc.
};
