(function($) {
    $(function() {

        var url_string = window.location.href;
        console.log('url_str', url_str);
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        console.log(".............");

        $("#reset-password-btn").on("click", function(e) {
            e.preventDefault();

            var formData = new FormData($("#reset-password-form")[0]);

            var url = ngrokURL + '/api/reset/password';
            formData.append('id', id);

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
                    if (response.status == 200) {
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