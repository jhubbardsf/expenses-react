var Users = React.createClass({
    getInitialState: function() {
        return { users: this.props.data };
    },

    getDefaultProps: function() {
        return { users: [] };
    },

    addUser: function(user) {
        var users = React.addons.update(this.state.users, { $push: [user] })
        this.setState({ users: users });
    },

    deleteUser: function(user) {
        var index = this.state.users.indexOf(user);
        var users = React.addons.update(this.state.users,
            { $splice: [[index, 1]] });
        this.replaceState({ users: users});
    },

    updateUser: function(user, data) {
        var index = this.state.users.indexOf(user);
        var users = React.addons.update(this.state.users,
            { $splice: [[index, 1, data]] });
        this.replaceState({ users: users });
    },

    credits: function() {
        var credits = this.state.users.filter(function(val) {
            return val.amount >= 0
        });
        return credits.reduce(function(prev, curr) {
            return prev + parseFloat(curr.amount);
        }, 0)
    },

    debits: function() {
        var debits = this.state.users.filter(function(val) {
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
            <div className='users'>
                <h2 className='title'>
                    Users
                </h2>
                <div className='row'>
                    <AmountBox type='success' amount={this.credits()} text='Credit' />
                    <AmountBox type='danger' amount={this.debits()} text='Debit' />
                    <AmountBox type='info' amount={this.balance()} text='Balance' />
                </div>
                <UserForm handleNewUser={this.addUser} />
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
                    {this.state.users.map(function(user) {
                        return <User key={user.id} user={user}
                                       handleDeleteUser={this.deleteUser}
                                       handleEditUser={this.updateUser} />
                    }.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
});