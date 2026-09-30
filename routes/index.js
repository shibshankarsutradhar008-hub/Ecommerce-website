const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

// Home
router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");

    res.render("index", {
        error,
        success,
        loggedin: false
    });
});

// Shop
router.get("/shop", isLoggedIn, async (req, res) => {
    try {
        let products = await productModel.find();
        let success = req.flash("success");

        res.render("shop", {
            products,
            success
        });
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

// Add to cart
router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({
            email: req.user.email
        });

        if (!user) {
            return res.redirect("/shop");
        }

        user.cart.push(req.params.id);
        await user.save();

        req.flash("success", "Added to cart");
        res.redirect("/shop");

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

// Cart
router.get("/cart", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel
            .findOne({ email: req.user.email })
            .populate("cart");

        if (!user) {
            return res.redirect("/shop");
        }

        // Empty cart
        if (!user.cart || user.cart.length === 0) {
            return res.render("cart", {
                user,
                bill: 0
            });
        }

        // Calculate bill
        let bill = 0;

        user.cart.forEach((product) => {
            if (product) {
                let price = Number(product.price) || 0;
                let discount = Number(product.discount) || 0;

                bill += price - discount;
            }
        });

        bill += 20; // delivery charge

        res.render("cart", {
            user,
            bill
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

// Logout
router.get("/logout", isLoggedIn, (req, res) => {
    res.redirect("/");
});

module.exports = router;