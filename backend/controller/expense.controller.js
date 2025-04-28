import expensModel from "../models/expense.model.js";
import groupsModel from "../models/group.model.js";
const addExpense = async (req, res) => {
    const { description, amount, currency, date, payer, participants } = req.body;
    const { groupId } = req.params;

    try {
        const expense = await expensModel.create({
            description,
            amount,
            currency,
            date,
            payer,
            participants,
            groupId
        });

        await groupsModel.findByIdAndUpdate(groupId, { $push: { expenses: expense._id } });

        return res.status(201).json(expense);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getExpenses = async (req, res) => {
    const { groupId } = req.params;

    try {
        const expenses = await expensModel.find({ groupId }).populate('payer', 'name').populate('participants.user', 'name');
        return res.status(200).json(expenses);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export { addExpense, getExpenses };
