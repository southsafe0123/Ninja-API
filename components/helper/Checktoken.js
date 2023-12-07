const jwt = require('jsonwebtoken');
//doc token tu header cuar api
const checkToken = (req, res, next) => {
    try {//lay token
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            throw new Error('No token provided')
                }else{
                    jwt.verify(token, 'iloveyou', (err, decoded)=>{
                        if(err){
                            throw new Error('Unauthorized here');
                        }else{
                            //luu thong tin duoc giai ma vao doi tuong req
                            req.user = decoded;
                            next();
                        }
                    })
                }
    } catch (error) {
        console.log("checkToken error: ", error);
        return res.status(401).json({ error: "Unauthorized" })
    }
}

module.exports = checkToken;