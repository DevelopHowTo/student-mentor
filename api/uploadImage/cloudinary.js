const cloudinary = require('cloudinary');
const key = require('../config/keys')

cloudinary.config({
    cloud_name: key.cloudinary_cloud_name,
    api_key: key.cloudinary_api_key,
    api_secret: key.cloudinary_api_secret
});