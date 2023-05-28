var multer = require("multer");
var fs = require("fs");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(process.env.UPLOAD_DIR,__dirname,"process.env.UPLOAD_DIR")
    console.log(file)
    if (file.fieldname === "image") {
      if (!fs.existsSync(process.env.UPLOAD_DIR)) {
        fs.mkdirSync(process.env.UPLOAD_DIR);
      }
      cb(null, `./${process.env.UPLOAD_DIR}`);
    } else {
      let path = "";
      return path;
    }
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: multerStorage });
module.exports = upload;
