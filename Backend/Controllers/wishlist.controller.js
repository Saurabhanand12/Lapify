import wishlistmodel from '../Models/wishlist.model.js';
import axios from "axios";

//// Add to Wishlist 
export const addtowishlist = async (req, res) => {
  try {
    const laptop = req.body;

    const exists = await wishlistmodel.findOne({
      user: req.id,
      "laptop.Company": laptop.Company,
      "laptop.Cpu": laptop.Cpu,
      "laptop.Ram": laptop.Ram,
      "laptop.Memory": laptop.Memory,
      "laptop.Price": laptop.Price,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Laptop already in wishlist",
      });
    }

    const wishlist = await wishlistmodel.create({
      user: req.id,
      laptop,
    });

    return res.status(201).json({
      success: true,
      wishlist,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// Get wishlish 
export const getwishlist = async (req, res) => {
  try {
    const wishlistdata = await wishlistmodel.find({
      user: req.id,
    });

    res.status(200).json({
      success: true,
      wishlistdata,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//// Remove item in wishlist
export const removewishlist = async (req , res )=>{
    try {
       const wishlistdt = await wishlistmodel.findById(req.params.id);

       if(!wishlistdt){
            return res.status(404).json({
                message : "Item is not found",
                success:false,
            });
       }

       //Ownership check
       if(wishlistdt.user.toString() !==  req.id.toString()){
        return res.status(401).json({success:false,message:"Unauthorized"});
       }

       await wishlistdt.deleteOne();

       res.status(200).json({
        success:true,
        message:"Item is Removed from Wishlist"
       });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message,success:false});
    }
}
