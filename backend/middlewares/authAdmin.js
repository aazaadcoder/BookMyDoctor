import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
    try {
        
        const {atoken} = req.headers;

        if(!atoken){
            return res.json({success : false , message : "Not Authorized Login Again no token"});
        }
        
        // decode the token
        const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET );
        
        if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success : false , message : "Not Authorized Login Again"});
        }
        

        next();

    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message});
    }
}

export {authAdmin};