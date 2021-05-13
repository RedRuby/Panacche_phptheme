(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/disclaimer';
        addDisclaimer();

        function addDisclaimer() {
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
                    $(".disclaimer-list").empty();
                    $(".disclaimer-list").append(response.data.disclaimers);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        }

        $(".landingPageWrap").on("click", "#submit-disclaimer-btn", function(e) {
            e.preventDefault();
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk");
            //var id = $(this).attr('data');
            var customer_id = $("input[name=customer]").val();


            var formData = new FormData($(".landingPageWrap #disclaimer-form")[0]);
            //formData.append('collection_id', id);
            formData.append('customer_id', customer_id);

            var url = ngrokURL + '/api/admin/add/disclaimer';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {},
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    if (response.status == 201) {
                        console.log(response.message);
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
                        $(".disclaimer-list").empty();
                        $(".disclaimer-list").append(response.data.disclaimers);
                        $('html, body').animate({
                            scrollTop: "0"
                        }, 2000);
                    } else {
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: "0"
                        }, 2000);
                    }
                },
                error: function(xhr, status, error) {
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });

        });

    });
})(jQuery);