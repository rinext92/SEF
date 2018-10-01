function loadingStart(){
    $(document).ajaxStart(function() {
        $.mobile.loading( 'show', {
            text: "loading...",
            textonly: false,
            textVisible: true,
            theme: 'a',
            html: ""
        });
    });
}

function loadingEnd(){
    $(document).ajaxStop(function() {
    $.mobile.loading('hide');
    });
}