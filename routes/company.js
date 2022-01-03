const express = require("express");
const router = express.Router();
router.use(express.json());

const companyList = require("../models/company");

router.get("/", (req, res) => res.send("Company API"));

router.post("/add", (req, res) => {
    const { company } = req.body;
    companyList.push(company);

    res.json({data : "Company added!"});
});

router.put("/change/:id", (req, res) => {
    const companyID = req.params.id;
    const { product } = req.body;
    const company = companyList.filter((company) => company.CompanyID === companyID);

    if(company.length > 0){
        companyList[companyList.indexOf(company[0])].ProductIDs = product;
        res.json({data : "Company's product changed!"});
    } else {
        res.json({data : "Company not found :(!"});
    }
});

router.delete("/delete/:id", (req, res) => {
    const companyID = req.params.id;
    const company = companyList.filter((company) => company.CompanyID === companyID);

    if(company.length > 0){
        var companyIndex = companyList.indexOf(company[0]);
        companyList.splice(companyIndex,1);
        res.json({data : "Company deleted!"});
    } else {
        res.json({data : "Company not found:(!"});
    }
});

router.get("/list",(req,res) => {
    res.json({data : companyList});
});

router.get("/:productName", (req,res) => {
    const productName = req.params.productName;
    const productList = require("../models/product")
    var companies = [];
    const product = productList.filter((prd) => (prd.Title === productName));
    
    if(product.length > 0){
        companies = companyList.filter((cmp) => (cmp.CompanyID === product[0].CompanyID));
    } else {
        companies = "No product found :(!"
    }
    res.json({data : companies});
});

module.exports = router;