(function($) {
    $(function() {

        console.log("llllllllll");
        $("#forgot-password-submit-btn").on("click", function(e) {
            e.preventDefault();
            var email = $("input[name=email]").val();
            var formData = new FormData($("#forgot-password-form")[0]);

            var url = ngrokURL + '/api/forgot/password';


            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    console.log(response);
                    if (response.status == 201) {
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
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
                                    $("input[name=" + key + "]").next("span").text(item);
                                    $("input[name=" + key + "]").addClass('error');
                                });

                            }
                        });

                    }
                }
            });
        });
    });
})(jQuery);