const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddiudyz6q",
  api_key: "329585949937736",
  api_secret: "7EbGo_VqXnh8QwjHr6Aap49W4Vg",
});
const uploadFile = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: `fadebook`,
    use_filename: true,
  });
  return result;
};
console.log(cloudinary.config);
module.exports = { cloudinary, uploadFile };
