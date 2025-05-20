const path = require('path');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const cron = require('node-cron');
require('dotenv').config();
const fs = require('fs');
const sendEventReminder = require('./reminderEvents');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');



const app = express();
app.use(express.json());
app.use(cors({methods : ["GET", "POST", "DELETE", "PUT"]}));

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params : {
        folder : 'event-images',
        allowed_formats : ["jpg", "png", "jpeg"],
        
    },
});


const upload = multer({storage});


app.post('/api/upload/images', upload.single("image"), async (req, res) => {

    const imageUrl = req.file.path;
    const imageId = req.file.filename;

    res.json({
        url : imageUrl,
        image_id : imageId,
    });
});



app.delete('/api/delete', async (req, res) => {
    
    const { public_id } = req.body;

    try {
        const result = await cloudinary.uploader.destroy(public_id);
        res.json({success : true, response : result});
    }catch(e){
        res.status(500).json({success : false, error : e});
    }
});


cron.schedule('0 9 * * *', async () => {
    console.log("Running every day at 9:00 AM");
    await sendEventReminder();
});
    

app.get('/api/test/reminder', async (req, res) => {
    try{
        await sendEventReminder();
        res.send({success : true});
    }catch(err){
        res.send({success : false, error : err.message});
    }
})


app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000");
});

module.exports = app;