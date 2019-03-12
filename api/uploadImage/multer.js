const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if (!(file.mimetype.match(/jpe|jpeg|png|gif$i/) || file.mimetype.match(/mp4|mkv|mpeg/))) {
            cb(new Error('File is not supported'), false)
            return
        }

        cb(null, true)
    }
})