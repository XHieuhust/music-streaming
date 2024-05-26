const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME | "ddiudyz6q",
  api_key: process.env.CLOUDINARY_API_KEY | "329585949937736",
  api_secret: process.env.CLOUDINARY_API_SECRET | "7EbGo_VqXnh8QwjHr6Aap49W4Vg",
});
const uploadFile = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: `fadebook`,
    use_filename: true,
  });
  return result;
};
module.exports = { cloudinary, uploadFile };
