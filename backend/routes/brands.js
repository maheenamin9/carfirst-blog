const express = require('express');
const router = express.Router();
const { Brand, validate } = require('../models/brand');

router.get('/', async (req, res) => {
    const brands = await Brand.find();
    res.send(brands);
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const brand = new Brand({
        brand: req.body.brand
    })
    await brand.save();
    res.send(brand);
})

module.exports = router;