(function($) {
    $(function() {
        var url_string = window.location.href;
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        console.log('id', id);

        var url = ngrokURL + "/api/pages/view-designer/" + id;

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
                console.log("hello");
                $(".landingPageWrap .ourDesigner ").empty();
                $(".landingPageWrap .ourDesigner ").append(response.data.designer);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

    });

})(jQuery);