const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: String },
            quantity: { type: Number }
        }
    ],
    total: { type: Number },
    orderBy: [
        {
            name: { type: String },
            phone: { type: Number },
            address: { type: String }
        }
    ]
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);