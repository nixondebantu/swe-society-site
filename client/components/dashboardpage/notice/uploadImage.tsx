"use server";

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Ensure this variable is secure on the server
});

export const upload_img = async (formdata: FormData): Promise<string> => {
    const file = formdata.get("file") as File;
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error: UploadApiErrorResponse | null | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    reject(error);
                } else if (result && result.secure_url) {
                    resolve(result.secure_url); // Return only the file URL
                } else {
                    reject(new Error("Unknown error during Cloudinary upload"));
                }
            }
        ).end(buffer);
    });
};
