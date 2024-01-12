import express from "express";
import multer from "multer";


const router=express.Router()


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: multerStorage });


  router.post('/uploads', upload.single('file'), (req, res) => {
    res.status(200).json({ url: `http://localhost:3000/${req.file.filename}` });
  });


  export default router