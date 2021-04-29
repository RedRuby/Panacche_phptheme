(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/discount';

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
                $("#discount").val(response.data.discount);
                $('.alert-success').removeClass('hide');
                $('.alert-success .text').text(response.message);
                $('html, body').animate({
                    scrollTop: "0"
                }, 2000);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });


        $("body").on("click", "#update-discount-btn", function(e) {
            e.preventDefault();
            var addVendorUrl = ngrokURL + '/api/admin/discount/update';
            var formData = new FormData($("#update-discount-form")[0]);
            console.log("save form");

            $.ajax({
                type: "POST",
                url: addVendorUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $(".landingPageWrap #addVenderPop").modal("hide");
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                    // updateDiscount();
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        });



    });
})(jQuery);