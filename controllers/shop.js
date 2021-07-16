const Shop = require("../models/shop");

exports.getMainIndex = async (req, res, next) => {
    const product = await Shop.find();
    if (!product){
        res.redirect("/");
    }
     res.render("shop/index", {
        path: "/",
        product: product,
        pageTitle: "Big Store"
    });
};

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Shop.findById(prodId);
        console.log("product olindi", product);
        res.render("shop/product-detail", {
            product: product,
            pageTitle: product.name,
            path: "/product"
        });
    }
    catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    }
};