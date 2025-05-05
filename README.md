📄 Project Overview:
BudgetSplit is a shared expense management app.
The goal is to help groups (like roommates, travel groups, event teams) easily track shared expenses, calculate who owes whom, and suggest how to settle with the fewest number of transactions.
✅ No more manual calculations, no more confusion!

✨ Key Features Explained:
1. Authentication & Authorization
Login required: Only logged-in users can create or join groups.

Group-based Access: You can only view and interact inside groups you're a member of.

2. Group & Membership Management
Create Group: Start a new group by giving it a name.

Invite Code: A code is generated, so others can join your group using that.

View Members: See all the people in your group.

3. Expense Entry & Sharing
Log Expenses:

Add expenses by entering amount, description, payer (who paid), participants (who shares the cost).

Split Options:

Equal Split: Everyone pays an equal share.

Custom Split: You can manually set different percentages if needed (e.g., one person pays more).

4. Balance Calculation & Settlement Recommendation
Net Balances:

The system calculates how much each person owes or should receive.

Settle All Screen:

Shows simple instructions to settle debts with minimal transactions.

Example:
➡️ "Alice pays Bob ₹200"
➡️ "Charlie pays Alice ₹100"
(Instead of multiple confusing payments.)

5. History & Data Export
Expense Ledger:

Full list of past expenses with date, description, payer, etc.

Export to CSV:

Users can download group expenses and balances for records.

6. Multi-Currency Support
When logging expenses:

Select the currency (₹, $, €, etc.).

The app will use live exchange rates (mock API or free service) to convert currencies if needed.

Example: If Bob paid in USD and Alice in INR, the system will adjust the amounts correctly.

7. Notifications & Reminders
Users get notified:

When a new expense is added.

When a monthly summary is ready.

Notifications can be in-app or via email.

8. UI/UX (Design)
Color coding:

Green = someone owes you

Red = you owe someone

Interactive Balance Graph:

See a visual representation of group balances.

Mobile-Friendly:

Easy to use on mobile phones.

🔥 In Short:
Module	Feature
Authentication	Sign Up / Log In
Group Management	Create Group, Join Group, View Members
Expense Logging	Add Expense, Split Equally or Custom
Balance	Calculate net owed/receivable
Settlement	Show minimal payments to settle
History	View all expenses
Export	Download CSV
Multi-Currency	Select currencies and auto-convert
Notifications	Alerts for expenses and summaries
UI/UX	Color coding, Graphs, Mobile responsive

🚀 Example Use Case:
You and 4 friends go on a trip.

Create a group: "Goa Trip 2025"

Everyone joins using the invite code.

Whenever someone pays for food, hotel, tickets — log it in the app.

App automatically tells you:

Who spent how much

Who owes whom

How to settle quickly!
