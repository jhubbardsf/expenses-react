var Expenses = React.createClass({
    getInitialState: function() {
        return { expenses: this.props.data };
    },

    getDefaultProps: function() {
        return { expenses: [] };
    },

    addExpense: function(expense) {
        var expenses = React.addons.update(this.state.expenses, { $push: [expense] })
        this.setState({ expenses: expenses });
    },

    deleteExpense: function(expense) {
        var index = this.state.expenses.indexOf(expense);
        var expenses = React.addons.update(this.state.expenses,
            { $splice: [[index, 1]] });
        this.replaceState({ expenses: expenses});
    },

    updateExpense: function(expense, data) {
        var index = this.state.expenses.indexOf(expense);
        var expenses = React.addons.update(this.state.expenses,
            { $splice: [[index, 1, data]] });
        this.replaceState({ expenses: expenses });
    },

    credits: function() {
        var credits = this.state.expenses.filter(function(val) {
            return val.amount >= 0
        });
        return credits.reduce(function(prev, curr) {
            return prev + parseFloat(curr.amount);
        }, 0)
    },

    debits: function() {
        var debits = this.state.expenses.filter(function(val) {
            return val.amount < 0
        });
        return debits.reduce(function(prev, curr) {
            return prev + parseFloat(curr.amount)
        }, 0)
    },

    balance: function() {
        return this.debits() + this.credits();
    },

    render: function() {
        return(
            <div className='expenses'>
                <h2 className='title'>
                    Expenses
                </h2>
                <div className='row'>
                    <AmountBox type='success' amount={this.credits()} text='Credit' />
                    <AmountBox type='danger' amount={this.debits()} text='Debit' />
                    <AmountBox type='info' amount={this.balance()} text='Balance' />
                </div>
                <ExpenseForm handleNewExpense={this.addExpense} />
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.expenses.map(function(expense) {
                        return <Expense key={expense.id} expense={expense}
                                       handleDeleteExpense={this.deleteExpense}
                                       handleEditExpense={this.updateExpense} />
                    }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
});