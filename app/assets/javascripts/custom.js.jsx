$(document).ready(function() {
    var dummy = new Array();
    var flashDiv = React.render(<FlashMessages messages={dummy} />, $('#flash_messages')[0]);

    $(document).ajaxComplete(function(event, xhr, settings) {
        alert('t');
        handleFlashMessagesHeader(flashDiv, xhr);
    });
});