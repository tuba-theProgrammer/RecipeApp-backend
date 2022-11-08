const path = require('path')
const multer = require('multer')


const multerMiddleWareStorage = multer.diskStorage({
    destination: (req, res, callBack) => {
        callBack(null, 'public/src')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, callBack) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', ' video/mp4'];
    if (allowedFileTypes.includes(file.mimetype)) {
        callBack(null, true)
    } else {
        callBack(null, false)
    }
}

const upload = multer({
    storage: multerMiddleWareStorage,
    limits: {
        fileSize: 1000000000 // 1000000000 Bytes = 1000 MB 
    },
    fileFilter: fileFilter,
})


module.exports = {upload}