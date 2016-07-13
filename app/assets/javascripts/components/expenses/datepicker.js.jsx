var DatePicker = React.createClass({
    _destroyDatePicker: function() {
        var element = ReactDOM.findDOMNode(this);;
        $(element).datepicker('destroy');
    },
    _initDatePicker: function() {
        var element = ReactDOM.findDOMNode(this);;
        $(element).datepicker(this.props);
    },
    componentDidMount: function() {
        this._initDatePicker();
    },

    componentWillReceiveProps: function(props) {
        this._destroyDatePicker();
    },

    componentDidUpdate: function() {
        this._initDatePicker();
    },

    componentWillUnmount: function() {
        this._destroyDatePicker();
    },

    render: function() {
        return <input type="text" {...this.props}/>
    }
});