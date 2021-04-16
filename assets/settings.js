(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/settings';
        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
            },
            success: function(response) {
                console.log("hello");
                $(".landingPageWrap .vendors-count").text(response.data.vendors);
                $(".landingPageWrap .disclaimers-count").text(response.data.disclaimer);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
})(jQuery);