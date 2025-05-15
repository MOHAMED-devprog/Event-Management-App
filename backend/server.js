const path = require('path');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const fs = require('fs');

const app = express();

const imagesFolder = path.join(__dirname, "images");

app.use(cors({methods : ["GET", "POST", "DELETE", "PUT"]}));
app.use('/images', express.static(imagesFolder));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images/"),
    filename : (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});


app.post('/images', upload.single("image"), (req, res) => {
    res.json({url : `http://localhost:3000/images/${req.file.filename}`});
});

app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(imagesFolder, filename);

    fs.unlink(imagePath, err => {
        if (err)
            return res.status(404).json({message : "file not found", error : err.message});

        return res.json({filename : filename, message : "image deleted"});
    });

});


app.listen(3000, () => {
    console.log("server is running on port : 3000");
});