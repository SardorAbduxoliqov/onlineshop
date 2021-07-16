const Shop = require("../models/shop");

exports.getAddProduct = async (req, res, next) =>{
    res.render("admin/add-product", {
        path: "/admin/add-product"
    });
};

exports.postAddProduct = async (req, res, next) => {
    const name = req.body.name;
    const productWeight = req.body.productWeight;
    const shortDescription = req.body.shortDescription;
    const fullDescription = req.body.fullDescription;
    const oldPrice = req.body.oldPrice;
    const newPrice = req.body.newPrice;
    const image = req.file;
    console.log(image);
    if (!image) {
        res.status(422).redirect("/"); 
    }

    const imageUrl = image.path;

    const product = new Shop({
        name: name,
        productWeight: productWeight,
        shortDescription: shortDescription,
        fullDescription: fullDescription,
        imageUrl: imageUrl,
        oldPrice: oldPrice,
        newPrice: newPrice,
    });
    try { 
    const savedProduct =  await product.save();
    console.log("Created Product");
    res.status(201).redirect("/");
    }
    catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    }
}