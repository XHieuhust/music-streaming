const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadFile = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: `fadebook`,
    use_filename: true,
  });
  return result;
};
module.exports = { cloudinary };
