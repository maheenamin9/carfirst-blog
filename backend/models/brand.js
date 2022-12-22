const mongoose = require('mongoose');
const Joi = require('joi');

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    }
})

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
    const schema = Joi.object({
        brand: Joi.string().required()
    })
    return schema.validate(brand);
}

exports.Brand = Brand;
exports.validate = validateBrand;