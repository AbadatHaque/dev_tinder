const mongoose = require("mongoose");
async function main(){
    try{
        await mongoose.connect('mongodb+srv://sksaddam7224:StF26gazYcDzXieU@abalearning07.gj7ml.mongodb.net/div_tinder')
    }catch(err){
        console.error('Failed to connect to db')
    }
}
module.exports = main;
// PORT = 4200
// DB_Name = 'sksaddam7224'
// MONGO_URI = 'mongodb+srv://sksaddam7224:StF26gazYcDzXieU@abalearning07.gj7ml.mongodb.net/'