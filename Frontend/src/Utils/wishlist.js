import { toast } from "sonner";
import axios from "axios";

export const addwishlist = async (laptop) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v2/wishlist/add",
        laptop ,
      { withCredentials: true }
    );

    if (res.data.success) {
      toast.success("Added to wishlist");
      return res.data;
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v2/wishlist/get', { withCredentials: true });
      
      return res.data.wishlistdata;

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch wishlist");
    }
  }

  /// Remove wishlist
export const removeWishlist = async (id) => {
  
  try {
    const res = await axios.delete(`http://localhost:8000/api/v2/wishlist/remove/${id}`,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
    }

    return res.data;

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to remove wishlist");
  }
};