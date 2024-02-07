const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.SK_DEV_STRIPE);
const multer = require('multer');
const path = require("path");
const fs = require('fs');





const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8001, () => {
    console.log(`Server is running on port: 8001`)
})

// --------- Setup de stripe

app.post('/api/payment', async (req, res) => {
    try {
        const { amount, currency, stripeToken } = req.body;
        const charge = await stripe.charges.create({
            amount, currency, source: stripeToken, description: 'Paiement de test'
        });

        console.log(charge)
        res.status(200).json({success: true, charge});
    } catch (error) {
        console.error('An error occured', error);
        res.status(500).json({success: false, message: error.message})
    }
});

// --------- Multer

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, 'public/images'));
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.originalname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

app.post('/api/image', upload.single('imageKey'), async  (req, res) => {
    try {
        if (fs.existsSync(path.join(req.file.path))) {
            return res.status(201).json(`File has been uploaded and saved in path: ${req.file.path}`);
        }
    } catch (error) {
        console.error('An error occured', error);
        res.status(500).json({message: error})
    }
});
