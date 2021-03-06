var ExpenseForm = React.createClass({
    getInitialState: function() {
        var now = moment().format('YYYY-MM-DD');
        return {
            description: '',
            date: now,
            amount: '',
            payee: '',
            category: ''
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        $.post('/expenses/',
            { expense: this.state },
            function(data) {
                this.props.handleNewExpense(data);
                this.setState(this.getInitialState());
            }.bind(this),
            'JSON'
        );
    },
    handleChange: function(e) {
        var name = e.target.name;
        var obj = {};
        obj[name] = e.target.value;
        this.setState(obj);
    },
    valid: function() {
        return (this.state.description && this.state.date && this.state.amount && this.state.payee && this.state.category);
    },
    render: function() {
        return(
            <form className='form-inline new-expense' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <DatePicker type='text' className='form-control' name='date' dateFormat='yy-mm-dd'
                                defaultValue={this.state.date} onChange={this.handleChange} />
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control'
                           placeholder='Description' name='description'
                           value={this.state.description} onChange={this.handleChange}>
                    </input>
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control'
                           placeholder='Category' name='category'
                           value={this.state.category} onChange={this.handleChange}>
                    </input>
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control'
                           placeholder='Payee' name='payee'
                           value={this.state.payee} onChange={this.handleChange}>
                    </input>
                </div>
                <div className='form-group'>
                    <input type='number' className='form-control'
                           placeholder='Amount' name='amount' step="0.01"
                           value={this.state.amount} onChange={this.handleChange}>
                    </input>
                </div>
                <div className='form-group'>
                    <input type='submit' className='btn btn-primary'
                           disabled={!this.valid()}>
                    </input>
                </div>
            </form>
        );
    }
});