import feedbackmodel from "../Models/feedback.model.js";

//// ADD feedback 
export const addfeedback = async (req ,res) =>{
    try {
        const {message,rating} = req.body;

        if( !message || !rating){
            return res.status(400).json({
                message:"All fields are required ",
                success : false,
            });
        }

        const feedbackdata = await feedbackmodel.create({

            message,
            rating,
        });

        return res.status(201).json({
            message: "Feedback submitted successfully ",
            success : true,
            feedbackdata,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message,success:false});
    }
}

///// Get all feedback 
export const getfeedback = async (req ,res ) =>{
    try {

        const allfeedback = await feedbackmodel.find().sort({createdAt : -1});

        res.status(200).json({
            success:true,
            allfeedback,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message,success : false});
    }
}

///// Delete Feedback 
export const deletefeedback = async (req,res) =>{
    try {

        const {id} = req.params;

        const feedbackbt = await feedbackmodel.findById(id);

        if(!feedbackbt){
            return res.status(404).json({message: "Feedback Not Found ",success : false});
        }

        await feedbackbt.deleteOne();

        res.status(200).json({
            message:"Feedback deleted successfully",
            success : true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message,success: false});
    }
}