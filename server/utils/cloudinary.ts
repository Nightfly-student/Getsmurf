import { DeleteApiResponse, UploadApiResponse, v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
    const config = useRuntimeConfig();

    _cloudinary.config({
        cloud_name: config.cloudName,
        api_key: config.cloudApi,
        api_secret: config.cloudApiSecret,
    });

    return _cloudinary;
};

export const uploadAvatarToCloudinary = (image: any) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary().uploader.upload(image, { width: 500, height: 500, crop: "fill", fetch_format: "auto" }, (error: any, data: any) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

export const uploadBannerToCloudinary = (image: any) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary().uploader.upload(image, { fetch_format: "auto" }, (error: any, data: any) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

export const uploadImageToCloudinary = (image: any) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary().uploader.upload(image, { width: 1920, height: 1080, fetch_format: "auto" }, (error: any, data: any) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

export const deleteFromCloudinary = (image: any) => {
    const imageId = image.split('/').pop().split('.')[0]
    return new Promise<DeleteApiResponse>((resolve, reject) => {
        cloudinary().uploader.destroy(imageId, (error: any, data: any) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}