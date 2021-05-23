(function($) {
    $(function() {
        // console.log("kjjjjjjj");

        var order = 8;
        var orderId = encodeURIComponent(window.btoa(order));
        var url = ngrokURL + '/api/designer/view_order/' + orderId;

        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {

            },
            success: function(response) {
                console.log('success');
                $(".landingPageWrap").empty();
                $(".landingPageWrap").append(response.data.order);
            },
            error: function(xhr, status, error) {
                console.log("error");
                if (xhr.responseJSON.errors) {
                    $.each(xhr.responseJSON.errors, function(key, item) {
                        console.log("error", key);
                        $("input[name=" + key + "]").next("span").text(item);
                    });
                }
            }
        });

    });
})(jQuery);