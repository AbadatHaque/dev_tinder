const validator = require('validator')
const bcrypt =require('bcrypt');
const saltRounds = 10;
function isStringPassword(password){
    if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong.')
    }
}

// Encrypt password
async function  encriptPassword(password){
   return await bcrypt.hash(password,saltRounds)
}
// match password
async function matchPassword(hash,newPassword){
    const isMatch = await bcrypt.compare(newPassword,hash)
    if(!isMatch){
        throw new Error('User cradiancial wrong')
    }
}

module.exports = {isStringPassword,encriptPassword,matchPassword}