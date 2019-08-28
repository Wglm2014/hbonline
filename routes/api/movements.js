const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Movement = require("../../models/movement");
const BudgetLine = require("../../models/budgetline");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");
router.get("/", auth, async (req, res) => {
    let movement = {};
    try {
        if (req.id) {
            movement = await Movement.find({ type_budgetline: req.id });
        } else { movement = await Movement.find({}); }

        if (!movement) {
            return res.status(400).json({ msg: "No movements for this budget line" })
        }
        res.json(movement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", [auth,
    [check("description", "Please describe the movement").not().isEmpty(),
    check("amount", "Enter an amount").isFloat({ gt: 0.0 }),
    check("date_movement", "Enter date of movement").not().isEmpty()]], async (req, res) => {
        const amountSpent = req.body.amount + req.body.amount_spent;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const movementFields = {
            type_budgetline: req.body.id,
            description: req.body.description,
            movement_type: req.body.movement_type,
            amount: req.body.amount,
            date_movement: req.body.date_movement
        };

        try {
            const movement = new Movement(movementFields);
            await movement.save();

            const budgetLine = await BudgetLine.update({ type_budgeline: req.id }, { $set: { amount_spent: amountSpent } });

            res.json(movement);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    });
module.exports = router;