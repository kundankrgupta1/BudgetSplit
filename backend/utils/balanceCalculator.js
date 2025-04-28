const calculateBalances = (expenses, members) => {
    const balances = {};

    members.forEach(member => {
        balances[member._id] = 0;
    });

    expenses.forEach(expense => {
        const { amount, payer, participants } = expense;
        participants.forEach(participant => {
            const share = (amount * participant.percentage) / 100;
            balances[participant.user] -= share;
        });
        balances[payer] += amount;
    });

    return balances;
};

const simplifyDebts = (balances) => {
    const result = [];
    const creditors = [];
    const debtors = [];

    for (let userId in balances) {
        if (balances[userId] > 0) creditors.push({ userId, amount: balances[userId] });
        if (balances[userId] < 0) debtors.push({ userId, amount: -balances[userId] });
    }

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    while (creditors.length && debtors.length) {
        const creditor = creditors[0];
        const debtor = debtors[0];

        const settledAmount = Math.min(creditor.amount, debtor.amount);

        result.push({ from: debtor.userId, to: creditor.userId, amount: settledAmount });

        creditor.amount -= settledAmount;
        debtor.amount -= settledAmount;

        if (creditor.amount === 0) creditors.shift();
        if (debtor.amount === 0) debtors.shift();
    }

    return result;
};

export { calculateBalances, simplifyDebts };
