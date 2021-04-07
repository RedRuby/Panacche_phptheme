$(document).ready(function() {
    console.log("ready!");

    var url_string = window.location.href;
    console.log('url_str', url_str);
    var url_str = new URL(url_string);
    var id = url_str.searchParams.get("id");
    var url = ngrokURL + "/api/designer/design/" + id;

    console.log('url', url);

    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function() {
            $(".validation_error").text('');
            // loader
        },
        success: function(response) {
            //console.log("hello");
            $("#content").append(response.data.design);
        },
        error: function(xhr, status, error) {
            console.log("error");
            console.log('error', JSON.stringify(xhr.responseJSON));
        }
    });
})(jQuery);