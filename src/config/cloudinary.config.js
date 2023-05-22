const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// Configuration 
cloudinary.config({
  cloud_name: "dhfkzoxdl",
  api_key: "867885681221964",
  api_secret: "myL1gCiIjfiG4ryypKvrzgAMXqo"
});


// Upload

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "profiles",
    },
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });
  
  const uploadCloud = multer({
      storage: storage,
      limits: { fileSize: '1000000' }, });
  
  module.exports = uploadCloud;