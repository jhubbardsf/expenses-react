var FlashMessages = React.createClass({
    getInitialState: function() {
        return {
            messages: this.props.messages,
            status: this.props.status
        };
    },

    messages: function (messageArray, status) {
        this.replaceState({messages: messageArray, status: status});
    },

    render: function() {
        return (
            <div className='flash_messages_component'>
                {this.state.messages.map(function(message, index) {
                    return (
                        <div key={index} className={this._flash_class(this.state.status)}>
                            {message}
                        </div>
                    );
                }.bind(this))}
            </div>
        )
    },

    _flash_class: function(level) {
        var _result = '';
        if (level == '200') {
            // this.clearMessages;
        } else if (level == '422') {
            _result = 'alert alert-danger';
        } else {
            _result = 'alert alert-danger';
        }
        return _result;
    }

});

function handleFlashMessagesHeader(node, xhr) {
    var _message_array = new Array();
    var _raw_messages = xhr.responseJSON;
    if (_raw_messages && xhr.status != 200) {
        // var _json_messages = JSON.parse(_raw_messages);
        count = 0;
        for (var key in _raw_messages) {
            _message_array[count] = new Array();
            _message_array[count][0] = key;
            _message_array[count][1] = _raw_messages[key];
            count += 1;
        }
    } else {
        _raw_messages = [''];
    }
    node.messages(_raw_messages, xhr.status);
}

$(document).ready(function() {
    var dummy = new Array();
    var flashDiv = ReactDOM.render(<FlashMessages messages={dummy} status='0' />, $('#flash_messages')[0]);

    $(document).ajaxComplete(function(event, xhr, settings) {
        // $('#flash_messages').html('');
        handleFlashMessagesHeader(flashDiv, xhr);
    });
});