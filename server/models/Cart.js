const mongoose= require('mongoose');

const cartSchema= new mongoose.Schema({
    userID:{
        type: String,
        required: true,
    },
    products:[{
        product: Object,
        productQuantity: 0,
        productOption: "",
    }],

})

module.exports = mongoose.model('Cart', cartSchema);
