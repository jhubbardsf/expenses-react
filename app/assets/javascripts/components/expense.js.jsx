var Expense = React.createClass({
    getInitialState: function() {
        return { edit: false };
    },

    handleToggle: function(e) {
        e.preventDefault();
        this.setState({ edit: !this.state.edit });
    },

    handleDelete: function(e) {
        $.ajax({
            method: 'DELETE',
            url: '/expenses/' + this.props.expense.id,
            dataType: 'JSON',
            success: function() {
                this.props.handleDeleteExpense(this.props.expense)
            }.bind(this)
        });
    },

    handleEdit: function(e) {
        e.preventDefault();
        var data = { description: ReactDOM.findDOMNode(this.refs.description).value,
            date: ReactDOM.findDOMNode(this.refs.date).value,
            amount: ReactDOM.findDOMNode(this.refs.amount).value,
            category: ReactDOM.findDOMNode(this.refs.category).value,
            payee: ReactDOM.findDOMNode(this.refs.payee).value}
        $.ajax({
            method: 'PUT',
            url: '/expenses/' + this.props.expense.id,
            dataType: 'JSON',
            data: { expense: data },
            success: function(data) {
                this.setState({ edit: false });
                this.props.handleEditExpense(this.props.expense, data);
            }.bind(this)
        });
    },

    expenseRow: function() {
        return(
            <tr>
                <td>{this.props.expense.date}</td>
                <td>{this.props.expense.description}</td>
                <td>{this.props.expense.category}</td>
                <td>{this.props.expense.payee}</td>
                <td>{amountFormat(this.props.expense.amount)}</td>
                <td>
                    <a className='btn btn-default expense-action' onClick={this.handleToggle}>
                        Edit
                    </a>
                    <a className='btn btn-danger expense-action' onClick={this.handleDelete}>
                        Delete
                    </a>
                </td>
            </tr>
        );
    },

    expenseForm: function() {
        return(
            <tr>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.expense.date} ref='date'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.expense.description} ref='description'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.expense.category} ref='category'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.expense.payee} ref='payee'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='number' step="0.01"
                           defaultValue={this.props.expense.amount} ref='amount'>
                    </input>
                </td>
                <td>
                    <a className='btn btn-default expense-action' onClick={this.handleEdit}>
                        Update
                    </a>
                    <a className='btn btn-danger expense-action' onClick={this.handleToggle}>
                        Cancel
                    </a>
                </td>
            </tr>
        );
    },

    renderedExpense: function() {
        if (this.state.edit === true) {
            return this.expenseForm();
        } else {
            return this.expenseRow();
        }
    },

    render: function() {
        return this.renderedExpense();
    }
});
