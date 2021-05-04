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

        $(".landingPageWrap").on("click", "#remove-design-btn", function(e) {
            e.preventDefault();
            console.log("modal button click");
            var id = $(this).data('id');
            var designerId = $(this).data('designer');

            $("#confirm-remove-design-modal").css('display', 'block');
            $("#confirm-remove-design-modal").modal('show').on('hide', function() {
                $('#confirm-remove-design-modal').modal('hide');
                $('#confirm-remove-design-modal').modal('close');
            });

            $("#confirm-remove-design-modal").prependTo("body");


            $("body").on("click", "#remove-design-yes-btn", function(e) {
                e.preventDefault();
                console.log("remove design");
                var removeDesignUrl = ngrokURL + '/api/design/remove/' + id + '/' +
                    designerId;
                console.log('remove design api');
                $.ajax({
                    type: "GET",
                    url: removeDesignUrl,
                    //  data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                    beforeSend: function() {
                        $("#shopify-section-toast-message").removeClass('hide');
                    },
                    success: function(response) {
                        $(".spinner-border").removeClass('hide');
                        $("#loadingDiv").removeClass('hide');
                        if (response.status == 200) {
                            $("#shopify-section-toast-message").removeClass('hide');
                            $('.alert-success').removeClass('hide');
                            $('.alert-success .text').text(response.message);
                            $('html, body').animate({
                                scrollTop: "0"
                            }, 2000);
                        } else {
                            $("#shopify-section-toast-message").removeClass('hide');
                            $('.alert-success').removeClass('hide');
                            $('.alert-success .text').text(JSON.stringify(xhr.responseJSON.errors));
                            $('html, body').animate({
                                scrollTop: "0"
                            }, 2000);
                        }


                    },
                    error: function(xhr, status, error) {
                        console.log('xhr', xhr);
                        $("#shopify-section-toast-message").removeClass('hide');
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(JSON.stringify(xhr.responseJSON.errors));
                        $('html, body').animate({
                            scrollTop: "0"
                        }, 2000);

                    }
                });
            });
        });

    });

})(jQuery);