import multer from "multer";

// using multer for submition of form 

const storage = multer.diskStorage(
    {
        filename : function(req, file, callback){
            callback(null, file.originalname);
        }
    }
)


const upload = multer({storage});

export default upload;
