const path = require('path');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const cron = require('node-cron');
require('dotenv').config();
const fs = require('fs');
const sendEventReminder = require('./reminderEvents');

const app = express();

const imagesFolder = path.join(__dirname, "images");

app.use(cors({methods : ["GET", "POST", "DELETE", "PUT"]}));
app.use('/api/images', express.static(imagesFolder));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images/"),
    filename : (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});


app.post('/api/upload/images', upload.single("image"), (req, res) => {
    res.json({url : `http://localhost:3000/api/images/${req.file.filename}`});
});

app.delete('/api/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(imagesFolder, filename);

    fs.unlink(imagePath, err => {
        if (err)
            return res.status(404).json({message : "file not found", error : err.message});

        return res.json({filename : filename, message : "image deleted"});
    });

});


cron.schedule('0 9 * * *', async () => {
    console.log("Running every day at 9:00 AM");
    await sendEventReminder();
});
    



app.listen(process.env.PORT, () => {
    console.log("server is running on port 3000");
});

module.exports = app;