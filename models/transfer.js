const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transferSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    transfer_type: {
        type: String,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    date_transfer: { type: Date, default: Date.now },
    type_budgetline: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetLine" },
    type_budgetline_related: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetLine" },

});

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;