const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'workshops', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname}`;
    }
  }
});

const upload = multer({ storage });

module.exports = upload;
