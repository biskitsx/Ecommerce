import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


export const cloudinaryUploadImg = async (file) => {
    try {
        return new Promise((resolve) => {
            cloudinary.uploader.upload(file, (result) => {
                resolve({
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id
                },
                    {
                        resource_type: "auto"
                    })
            })
        })

    } catch (error) {
        console.error(error)
        next(error)
    }
}

export const cloudinaryDeleteImg = async (file) => {
    try {
        return new Promise((resolve) => {
            cloudinary.uploader.destroy(file, (result) => {
                resolve({
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id
                },
                    {
                        resource_type: "auto"
                    })
            })
        })

    } catch (error) {
        console.error(error)
        next(error)
    }
}

