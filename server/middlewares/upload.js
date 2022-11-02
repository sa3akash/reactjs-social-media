import multer from "multer";
import express from "express";

const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name)
    }
});


const upload = multer({storage:storage})


router.post("/post/image",upload.single("file"), async (req,res,next)=>{
    try{
        res.json("image upload successfull")
    }catch(err){
        next(err)
    }
})




export default router;