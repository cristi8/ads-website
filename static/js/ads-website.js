
// make js posts include the xsrf token

function initAjax() {
    $.ajaxSetup({ 
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                 }
             }
         }
         return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     } 
    });
}

// JS for the Publish page
function initPublishPage() {
    var setStatusMessage = function(level, htmlMsg) {
        $('#post-ad-form-message').hide();
        $('#post-ad-form-message').removeClass('alert-success');
        $('#post-ad-form-message').removeClass('alert-error');
        $('#post-ad-form-message').addClass('alert-' + level);
        $('#post-ad-form-message').html(htmlMsg);
        $('#post-ad-form-message').show();
        
    }

    $("#publish-ad-button").click(function() {
        var btn = $(this);
        btn.button('loading');
        
        $('#post-ad-form .help-inline').text('');
        $('#post-ad-form .control-group').removeClass('error');
        
        var postUrl = $('#post-ad-form').attr('action');
        var adCategoryId = $('#category-field').val();
        var adTitle = $('#title-field').val();
        var adMessage = $('#message-field').val();
        
        var posting = $.post(postUrl, { 'category': adCategoryId, 'title': adTitle, 'message': adMessage } );
        posting.done(function(data) {
            if (data.indexOf('SUCCESS ') == 0) {
                var adId = data.substr('SUCCESS '.length);
                setStatusMessage('success', 'Successfully <a href="/details/' + adId + '">published</a> the ad.');
            } else if(data.indexOf('ERROR ') == 0) {
                var errors = data.split('|');
                for (var i = 1; i < errors.length; i++) {
                    if (errors[i] == '')
                        continue;
                    var errorParts = errors[i].split('!');
                    var spanElement = $('#' + errorParts[0] + '-input-message');
                    spanElement.parent().parent().addClass('error');
                    spanElement.text(errorParts[1]);
                    setStatusMessage('error', "The ad was not published.");
                }
            } else {
                setStatusMessage("error", "Unknown server response: " + data);
            }
            btn.button('reset');
        });
        posting.fail(function(data) {
            setStatusMessage("error", "Error: " + data.statusText);
            btn.button('reset');
        });
    });
}

$(function() {
    initAjax();
    initPublishPage();
    
});

