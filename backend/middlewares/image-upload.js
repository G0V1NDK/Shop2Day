const multer = require("multer");
const uuid = require("uuid").v4;

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
