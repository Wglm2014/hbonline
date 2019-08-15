const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transferSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    movement_type: {
        type: String,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    budget_line_from: {
        type: Number,
        required: true
    },
    budget_line_to: {
        type: Number,
        required: true
    }
});

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;