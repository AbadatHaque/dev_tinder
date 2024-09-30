const validator = require('validator')
const bcrypt =require('bcrypt');
const saltRounds = 10;
function singUpValidation(req){
    const {password} = req;
    if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong.')
    }
}

// Encrypt password
async function  passwordValidation(password){
   return await bcrypt.hash(password,saltRounds)
}
// match password
async function matchPassword(hash,newPassword){
    const isMatch = await bcrypt.compare(newPassword,hash)
    if(!isMatch){
        throw new Error('User cradiancial wrong')
    }
}

module.exports = {singUpValidation,passwordValidation,matchPassword}