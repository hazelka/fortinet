const multer = require('multer');
const fs = require('fs');
const { verifyToken } = require("../middlewares");
const controller = require("../controllers/api.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./uploads/${req.userId}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/files", verifyToken, controller.getFiles);

  app.get("/api/download/:fileId", verifyToken, controller.download);

  app.post("/api/upload", 
    verifyToken, 
    upload.array('files'), 
    controller.upload
  );
};