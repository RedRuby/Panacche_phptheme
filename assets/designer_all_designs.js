(function($) {
    $(function() {
        console.log('designer_view_all_designs');
        customer = $("input[name=customer]").val();
        console.log('customer', customer);
        var url = ngrokURL + "/api/designer/designs/all/" + customer;


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
                $(".landingPageWrap").append(response.data.designCards);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        $(".landingPageWrap").on("click", "#view-under-review-design", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            window.location.href = "/pages/view-designs-under-review?id=" + id;
        });
    });
})(jQuery);