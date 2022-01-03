const express = require("express");
const router = express.Router();
router.use(express.json());

const sellerList = require("../models/seller");

router.get("/", (req, res) => res.send("Seller API"));

router.post("/add", (req, res) => {
    const { seller } = req.body;
    sellerList.push(seller);

    res.json({data : "Seller added!"});
});

router.put("/change/:id", (req, res) => {
    const sellerID = req.params.id;
    const { product } = req.body;
    const seller = sellerList.filter((seller) => seller.SellerID === sellerID);

    if(seller.length > 0){
        sellerList[sellerList.indexOf(seller[0])].ProductIDs = product;
        res.json({data : "Seller's product changed!"});
    }else{
        res.json({data : "Seller not found :(!"});
    }
});

router.delete("/delete/:id", (req, res) => {
    const sellerID = req.params.id;
    const seller = sellerList.filter((seller) => seller.SellerID === sellerID);

    if(seller.length > 0){
        const sellerIndex = sellerList.indexOf(seller[0]);
        sellerList.splice(sellerIndex,1);
        res.json({data : "Seller deleted!"});
    } else {
        res.json({data : "Seller not found :(!"});
    }
});

router.get("/list",(req,res) => {
    res.json({data : sellerList});
});

router.get("/:productName", (req, res) => {
    const productName = req.params.productName;
    const productList = require("../models/product");
    var sellers = [];
    const product = productList.filter((prd) => (prd.Title === productName));

    if(product.length > 0){
        sellers = sellerList.filter((slr) => (slr.SellerID === product[0].SellerID));
    } else{
        sellers = "No product found :(!"
    }

    res.json({data : sellers});
});

module.exports = router;