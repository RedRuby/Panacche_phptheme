(function($) {
    $(function() {
        var custId = ShopifyAnalytics.meta.page.customerId;
        var orderId = 8;

        var url = ngrokURL + "/api/order-placed?id=" + custId + "&orderId=" + orderId;
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
                console.log(response);
                $(".leftPart").empty();

                if (response.success == true) {
                    $(".leftPart").append(response.data.order_placed);
                } else {
                    alert(response.error);
                    window.location.href = "/pages/my-projects";
                }

            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });

    $(document).on("click", ".rateReviewStore", function() {
        var custId = ShopifyAnalytics.meta.page.customerId;
        alert(custId);
        var rating = $("#starsInput").val();
        var review = $("#review_text").val();
        var designer_id = $("#designer_id").val();
        var my_project_collection_id = $("#my_project_collection_id").val();
        var orderId = 8;

        var url = ngrokURL + "/api/rate-review-order";
        console.log('url', url);

        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            dataType: 'json',
            data: {
                "id": custId,
                "orderId": orderId,
                "rating": rating,
                "designer_id": designer_id,
                "my_project_collection_id": my_project_collection_id,
                "review": review
            },
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response) {
                console.log(response);
                $("#review_text").attr("disabled", "disabled");
                $(".submitRatings").hide();
                $(".savedRatings").show();
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
})(jQuery);