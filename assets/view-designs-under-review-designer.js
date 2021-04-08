(function($) {
    $(function() {

        var url_string = window.location.href;
        console.log('url_str', url_str);
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        var url = ngrokURL + "/api/designer/view_design_under_review/" + id;

        //var url = ngrokURL + "/api/design/" + id;
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
                $(".landingPageWrap").empty();
                $(".landingPageWrap").append(response.data.design);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

    });

})(jQuery);