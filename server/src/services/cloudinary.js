const {
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const handleUpload = async (path, file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {folder:path, public_id: file.name});
		return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
	handleUpload
};