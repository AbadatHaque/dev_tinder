
const jwt = require("jsonwebtoken")
async function tokenValidation(req,res,next){
    try{
        const cookies = req.cookies;
        if(!cookies.token){
            throw new Error("Token is not valid")
        }
        const decode = jwt.verify(cookies.token, 'privateKey123');
        next()
    }catch(err){
        res.status(400).send(err.message || err)
    }
}
module.exports={tokenValidation}