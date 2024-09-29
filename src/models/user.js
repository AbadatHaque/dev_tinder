const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        alias:'n',
        trim:true,
        maxLength:20,
        minLength:3
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        minLength:8,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        enum:['male','female', 'Transgender']
    },
    age:{
        type:Number,
        alias:'n',
        min:18,
        max:100,
        set:(v)=> Math.floor(v),
        validate:{
            validator:(v)=>{
                return v != 24
            },
            message:(v)=> '24 age is not allow'
        }

    }
},{
    timestamps:true,
    virtuals:{
        nameAge:{
            get(){
                return this.name + this.age
            }
        }
    }
})

module.exports = mongoose.model('user', userSchema)
const axl = new mongoose.model('user', userSchema)({
    age:78,
    name: 'abadat'
  });
  console.log(axl.n)