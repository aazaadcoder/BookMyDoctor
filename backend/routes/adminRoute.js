import express from 'express'

import upload from '../middlewares/multer'
import addDoctor from '../controllers/adminController';


const adminRouter = express.Router();


adminRouter.post('/add-doctor', upload.single('image'), addDoctor);


export default adminRouter;