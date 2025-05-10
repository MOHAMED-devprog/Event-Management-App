const path = require('path');
const cors = require('cors');
const multer = require('multer');
const express = require('express');

const app = express();

app.use(cors());
app.use('/images', express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images/"),
    filename : (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});


app.post('/images', upload.single("image"), (req, res) => {
    res.json({url : `http://localhost:3000/images/${req.file.filename}`});
});

app.listen(3000, () => {
    console.log("server is running on port : 3000");
})