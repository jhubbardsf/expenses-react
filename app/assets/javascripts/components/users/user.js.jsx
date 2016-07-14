var User = React.createClass({
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
            url: '/users/' + this.props.user.id,
            dataType: 'JSON',
            success: function() {
                this.props.handleDeleteUser(this.props.user)
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
            url: '/users/' + this.props.user.id,
            dataType: 'JSON',
            data: { user: data },
            success: function(data) {
                this.setState({ edit: false });
                this.props.handleEditUser(this.props.user, data);
            }.bind(this)
        });
    },

    userRow: function() {
        return(
            <tr>
                <td>{this.props.user.date}</td>
                <td>{this.props.user.description}</td>
                <td>{this.props.user.category}</td>
                <td>{this.props.user.payee}</td>
                <td>{amountFormat(this.props.user.amount)}</td>
                <td>
                    <a className='btn btn-default user-action' onClick={this.handleToggle}>
                        Edit
                    </a>
                    <a className='btn btn-danger user-action' onClick={this.handleDelete}>
                        Delete
                    </a>
                </td>
            </tr>
        );
    },

    userForm: function() {
        return(
            <tr>
                <td>
                    <DatePicker type='text' className='form-control' ref='date' dateFormat='yy-mm-dd'
                                defaultValue={this.props.user.date} />
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.user.description} ref='description'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.user.category} ref='category'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='text'
                           defaultValue={this.props.user.payee} ref='payee'>
                    </input>
                </td>
                <td>
                    <input className='form-control' type='number' step="0.01"
                           defaultValue={this.props.user.amount} ref='amount'>
                    </input>
                </td>
                <td>
                    <a className='btn btn-default user-action' onClick={this.handleEdit}>
                        Update
                    </a>
                    <a className='btn btn-danger user-action' onClick={this.handleToggle}>
                        Cancel
                    </a>
                </td>
            </tr>
        );
    },

    renderedUser: function() {
        if (this.state.edit === true) {
            return this.userForm();
        } else {
            return this.userRow();
        }
    },

    render: function() {
        return this.renderedUser();
    }
});