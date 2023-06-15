import cloudinary from 'cloudinary'

// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.CLOUD_API_KEY, 
//     api_secret: process.env.CLOUD_API_SECRET 
// });

cloudinary.config({ 
    cloud_name: 'dpbro2ayv', 
    api_key: '698997354456696', 
    api_secret: 'ei9Ir1UF4mKpVvohcAe6NAj36gY' 
});


export const cloudinaryUploadImg = async (file) => {
    try {
        return new Promise ((resolve) => {
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
        
    } catch(error) {
        console.error(error)
        next(error)
    }
}

export const cloudinaryDeleteImg = async (file) => {
    try {
        return new Promise ((resolve) => {
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
        
    } catch(error) {
        console.error(error)
        next(error)
    }
}

