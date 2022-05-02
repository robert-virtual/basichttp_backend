const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, uuid() + ext);
  },
});
const upload = multer({
  storage,
});
module.exports = upload;
