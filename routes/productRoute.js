const mongoose = require("mongoose");
const router = require("express").Router();
const product = require("../models/product");

router.post("/", async (req, res) => {
    const productRegister = new product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
    const savedProduct = await productRegister.save();
    return res.send(savedProduct);
});

router.get("/catalogue", async (req, res) => {
    product.find((err, products) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(products);
        }
    });
});

router.get("/catalogue/:id", async (req, res) => {
    try {
        const id = req.params.id
        const productReturn = await product.findOne({ _id: id })
        res.send(productReturn);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productReturn = await product.findOne({ _id: id });

        productReturn.title = req.body.title;
        productReturn.description = req.body.description;
        productReturn.price = req.body.price;
        productReturn.category = req.body.category;

        const updatedProduct = await productReturn.save();

        res.send(updatedProduct);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await product.findOneAndDelete({ _id: id });
        res.send(deletedProduct);
    } catch (err) {
        res.status(400).send(err);
    }
})
module.exports = router;