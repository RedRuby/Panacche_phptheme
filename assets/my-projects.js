(function($) {
    $(function() {
        var custId = ShopifyAnalytics.meta.page.customerId;

        var url = ngrokURL + "/api/my-projects?id=" + custId;
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
                console.log(response.data);
                $(".leftPart").empty();
                $(".leftPart").append(response.data.my_projects);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
})(jQuery);