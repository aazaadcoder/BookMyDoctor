import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        
        if(!token){
            return res.json({success : false, message : "Unautharized Access"})
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message});
    }
    
}


export {userAuth}