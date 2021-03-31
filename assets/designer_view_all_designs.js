(function($) {
    $(function() {
        console.log('designer_view_all_designs');
        var url = ngrokURL + "/api/designer/designs/all";

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
                $(".landingPageWrap .designCards").append(response.data.designCards);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
})(jQuery);