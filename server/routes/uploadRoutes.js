const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: "YOUR_NAME",
  api_key: "YOUR_KEY",
  api_secret: "YOUR_SECRET",
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "houses",
  },
});

const upload = multer({ storage });


router.post("/", upload.single("image"), (req, res) => {
  res.json(req.file.path);
});

module.exports = router;