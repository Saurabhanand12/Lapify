import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true
    },
    activity_type : {
        type : String,
        enum : ["recommendation","prediction","comparison"],
        required : true,
    },
    data: {
        type: Object,
        required: true
    }
    
},{timestamps:true});

const history = mongoose.model('history',historySchema);
export default history;