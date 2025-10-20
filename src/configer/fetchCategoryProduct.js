import apiinput from "../common";
import { toast } from "react-toastify";

const fetchCategory = async ({ category }) => {
  try {
    const response = await fetch(apiinput.productCategory.url, {
      method: apiinput.productCategory.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    }).catch(() => {
      toast.error("Network error — check your internet connection.");
      return null;
    });


    if (!response) {
      return { success: false, data: [] };
    }


    if (!response.ok) {
      toast.error("Server error — please try again later.");
      return { success: false, data: [] };
    }


    let dataResponse = {};
    try {
      dataResponse = await response.json();
    } catch {
      toast.error("Invalid server response format.");
      return { success: false, data: [] };
    }

    return dataResponse;
  } catch (error) {
    console.error("fetchCategory fatal error:", error);
    toast.error("Unexpected error — check your connection or server.");
    return { success: false, data: [] };
  }
};

export default fetchCategory;
