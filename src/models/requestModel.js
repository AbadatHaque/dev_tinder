const moongose = require("mongoose");
const Schema = moongose.Schema;

const requestSchema = new Schema({
    senderId:{
        type:Schema.ObjectId,
        require:[true,'Sender Id is require']
    },
    receiverId:{
        type:Schema.ObjectId,
        require:[true,'Receiver Id is require']
    },
    status:{
        type:String,
        enum:{
            values:['intrested','ignored','accepted','rejected'],
            message:"Please send currect status value ."
        }
    }
});
module.exports = moongose.model('request',requestSchema)