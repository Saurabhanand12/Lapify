import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    message : {
        type : String,
        required: [true, 'Feedback message is required'],
    },
    rating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
    },
},{timestamps:true});

const feedback = mongoose.model('feedback',feedbackSchema);

export default feedback;

