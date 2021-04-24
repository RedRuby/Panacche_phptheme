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

        $("body").on("click", "#save-disclaimer-btn", function(e) {
            e.preventDefault();
            var addDisclaimerUrl = ngrokURL + '/api/admin/add/disclaimer';
            var formData = new FormData($("#save-disclaimer-form")[0]);
            console.log("save form");

            $.ajax({
                type: "POST",
                url: addDisclaimerUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    console.log("response", response.data.disclaimer);
                    $(".landingPageWrap #addVenderPop").modal("hide");
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                    addDisclaimer();

                    //  $(".landingPageWrap .vendor-datalist").empty();
                    //$(".landingPageWrap .vendor-datalist").append(response.data.datalist);
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)


                    if (xhr.responseText != "") {

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        var jsonResponseStatus = '';
                        var message = '';
                        $.each(jsonResponseText, function(name, val) {
                            if (name == "errors") {
                                jsonResponseErrors = $.parseJSON(JSON.stringify(val));
                                $.each(jsonResponseErrors, function(key, item) {
                                    $('.alert-danger').removeClass('hide');
                                    $('.alert-danger .text').text(JSON.stringify(jsonResponseErrors));
                                    $('html, body').animate({
                                        scrollTop: "0"
                                    }, 2000);
                                    $("#" + key).next("span").text(item);
                                    // $("input[name=" + key + "]").addClass('error');
                                });

                            }
                        });
                    }
                }
            });
        });

    });
})(jQuery);