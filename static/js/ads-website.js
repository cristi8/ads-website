
function markFocusedMenuItem() {
    docurl = window.location.href;
    $('#header-menu a').each(function() {
        if (this.href == docurl)
            $(this).parent().addClass('focused');
    });
}

