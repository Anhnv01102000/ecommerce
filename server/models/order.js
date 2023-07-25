const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: "Product" },
            count: { type: Number }
        }
    ],
    status: {
        type: String,
        default: "Process",
        enum: ["Cancel", "Process", "Success"],
    },
    total: { type: Number },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);