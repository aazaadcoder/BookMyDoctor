import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;   // headers name always comes in lowercase
    if (!dtoken) {
        return res.json({success : false, message : "Unautharized Access"});
    }

    const decoded_token = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded_token.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message});
  }
};

export default authDoctor;
