var path = require('path');
var cors = require('cors');
var multer = require('multer');
var express = require('express');
var app = express();
app.use(cors());
app.use('/images', express.static(path.join(__dirname, "images")));
var storage = multer.diskStorage({
    destination: function (req, file, cb) { return cb(null, "images/"); },
    filename: function (req, file, cb) { return cb(null, Date.now() + path.extname(file.originalname)); }
});
var upload = multer({ storage: storage });
app.post('/images', upload.single("image"), function (req, res) {
    res.json({ url: "http://localhost:3000/images/".concat(req.file.filename) });
});
app.listen(3000, function () {
    console.log("server is running on port : 3000");
});
