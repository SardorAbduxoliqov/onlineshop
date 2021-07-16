const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g) + '-' + file.originalname);
    }
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("imageUrl"))

app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/fonts', express.static(__dirname + 'public/fonts'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));    

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", adminRoute);
app.use(shopRoute);

const errorController = require("./controllers/error");
app.get('/500', errorController.get500);
app.use(errorController.get404);

const MONGO_URL = "mongodb://localhost/onlineshop"
app.use((error, req, res, next) =>{
    res.status(500).render('500', {
        pageTitle: "Error!"
    });
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("ulandi")
        })
    })
    .catch(err => {
        console.log(err);
    });