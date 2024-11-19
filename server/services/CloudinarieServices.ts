import { v2 as cloudinary } from "cloudinary";
import { Express } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFilesToCloudinary = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  const uploadPromises = files.map((file) =>
    cloudinary.uploader.upload(file.path, {
      upload_preset: process.env.IMG_UPLOAD_PRESET,
    })
  );

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults.map((result: any) => result.secure_url);
};
