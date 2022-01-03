const express = require("express");
const router = express.Router();
router.use(express.json());

const productList = require("../models/product")

router.get("/", (req, res) => res.send("Product API"));

router.post("/add", (req, res) => {
    const { product } = req.body;
    productList.push(product);

    res.json({data : "Product added!"});
});

router.put("/change/:id", (req,res) => {
    const productID = req.params.id;
    const category = req.body.Category;
    const product = productList.filter((Product) => Product.ProductID === productID);    
    
    if(product.length > 0){        
        productList[productList.indexOf(product[0])].Category = category;
        res.json({data : `Product's category changed!`}) ;
    } else {
        res.json({data : `Product not found:(!`});
    }
});

router.delete("/delete/:id", (req, res) => {
    const productID = req.params.id;
    const product = productList.filter((Product) => Product.ProductID === productID);

    if(product.length > 0){
        const productIndex = productList.indexOf(product[0]);
        productList.splice(productIndex,1);
        res.json({data : `Product deleted!`});
    } else {
        res.json({data : `Product not found:(!`});
    }
});

router.get("/list",(req,res) => {
    res.json({data : productList});
});

router.get("/company/:id", (req, res) => {
    const companyID = req.params.id;
    const products = productList.filter((prd) => (prd.CompanyID === companyID));    
    
    res.json({data : products});
});

router.get("/seller/:id", (req, res) => {
    const sellerID = req.params.id;
    const products = productList.filter((prd) => (prd.SellerID === sellerID));    
    
    res.json({data : products});
});

module.exports = router;