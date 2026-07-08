import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    laptop: {
      type: Object,
      required: true,
    },
},{timestamps: true});

const wishlist = mongoose.model('wishlist',wishlistSchema);
export default wishlist;