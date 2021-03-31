(function($) {
    $(function() {
        console.log("jquery");
        $verifyUsername = false;
        $verifyEmail = false;
        $verifyPhone = false;
        $verifyZip = false;

        /*$("input[name='username']").on("change", function(e) {
            var formData = new FormData();
            var username = $(this).val();
            formData.append('username', username);
            console.log("username changes");

            var url = ngrokURL + '/api/verify_username';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("input[name='username']").next('span').text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                        $verifyUsername = true;
                    } else {
                        $verifyUsername = false;
                    }

                },
                error: function(xhr, status, error) {
                    $('.ajax-loader').css("visibility", "hidden");
                    $verifyUsername = false;

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                        });
                    }
                }
            });
        });

*/
        $("input[name='email']").on("change", function(e) {
            var formData = new FormData();
            var email = $(this).val();
            formData.append('email', email);
            console.log("email changes");

            var url = ngrokURL + '/api/verify_email';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("input[name='email']").next('span').text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                        $verifyEmail = true;
                    } else {
                        $verifyEmail = false;
                    }
                },
                error: function(xhr, status, error) {
                    $('.ajax-loader').css("visibility", "hidden");
                    $verifyEmail = false;
                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                        });
                    }
                }
            });
        });


        $("input[name='phone']").on("change", function(e) {
            var formData = new FormData();
            var phone = $(this).val();
            formData.append('phone', phone);
            console.log("phone changes");

            var url = ngrokURL + '/api/verify_phone';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("input[name='phone']").next('span').text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                        $verifyPhone = true;
                    } else {
                        $verifyPhone = false;
                    }
                },
                error: function(xhr, status, error) {
                    $('.ajax-loader').css("visibility", "hidden");
                    $verifyPhone = false;
                    if (xhr.responseText != "") {

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        var jsonResponseStatus = '';
                        var message = '';
                        $.each(jsonResponseText, function(name, val) {
                            if (name == "errors") {
                                jsonResponseErrors = $.parseJSON(JSON.stringify(val));
                                $.each(jsonResponseErrors, function(key, item) {
                                    $("input[name=" + key + "]").next("span").text(item);
                                    $("input[name=" + key + "]").addClass('error');
                                });
                            }
                        });

                        //   alert(message);
                    }
                    // if (xhr.responseJSON.errors) {
                    //     $.each(xhr.responseJSON.errors, function(key, item) {
                    //         console.log("error", key);
                    //         $("input[name=" + key + "]").next("span").text(item);
                    //     });
                    // }
                }
            });
        });


        /*   $("input[name='zip']").on("change", function(e) {
            var formData = new FormData();
            var zip = $(this).val();
            formData.append('zip', zip);
            console.log("zip changes");

            var url = ngrokURL + '/api/verify_zip';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("input[name='zip']").next('span').text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                    }

                },
                error: function(xhr, status, error) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                        });
                    }
                }
            });
        });

*/
        $("#registration").on("click", function(e) {
            e.preventDefault();

            console.log("designer registration");

            var formData = new FormData($("#RegisterForm")[0]);
            var url = ngrokURL + "/api/designer";

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
                    $("input.form-control").removeClass('error');
                    $(".container").addClass('hide');
                    $(".spinner-border").removeClass('hide');
                    $('.alert-danger').addClass('hide');
                    $('.alert-success').addClass('hide');
                },
                success: function(response) {
                    console.log("response", response);
                    $(".container").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $("#result").empty().append(response);
                    if (response.status == 201) {
                        console.log(response.message);
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: $(".alert-success").offset().top
                        }, 2000);
                        setTimeout(
                            function() {
                                window.location.href = "/account";
                            }, 5000);
                    } else {
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: $(".alert-danger").offset().top
                        }, 2000);
                    }
                },
                error: function(xhr, status, error) {
                    $(".spinner-border").addClass('hide');
                    $(".container").removeClass('hide');
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
                                        scrollTop: $(".alert-danger").offset().top
                                    }, 2000);

                                    if (key == 'resume' || key == 'portfolio') {
                                        $("input[name=" + key + "]").closest('.form-group').find('.validation_error').text(item);
                                    }
                                    $("input[name=" + key + "]").next("span").text(item);
                                    $("input[name=" + key + "]").addClass('error');


                                });
                            }
                        });
                    }
                }
            });
        });

        $("input[name=display_picture]").on("change", function(e) {
            console.log("pic change");
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();

                reader.onload = function() {
                    $(".addUserPic").css("background-image", 'url(' + reader.result + ')');
                }

                reader.readAsDataURL(file);
            }
        });

        $('#first_name').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The first name field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');

            }
        });

        $('#last_name').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The last name field is required.');

            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');

            }
        });


        $('#email').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The email field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');

            }
        });

        $(window).load(function() {
            var phones = [{ "mask": "(###) ###-####" }, { "mask": "(###) ###-##############" }];
            $("#phone").inputmask({
                mask: phones,
                greedy: false,
                definitions: { '#': { validator: "[0-9]", cardinality: 1 } }
            });
        });

        $('#phone').keypress(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('Contact number field is required.');
            } else {
                var phoneRegex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

                if (phoneRegex.test(val)) {
                    var formattedPhoneNumber =
                        val.replace(phoneRegex, "($1) $2-$3");
                    $(this).val(formattedPhoneNumber);
                } else {
                    //$(this).addClass('error');
                    //$(this).next('span').text('Contact number must be valid.');
                    // Invalid phone number
                }

                $(this).removeClass('error');
                $(this).next('span').text('');
            }
        });

        $('#phone').blur(function() {
            var phoneRegex = /^(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([0-9]{3})\s*\)|([0-9]{3}))\s*(?:[.-]\s*)?([0-9]{3})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('password field is required.');

            } else {
                if (phoneRegex.test(val)) {
                    $(this).removeClass('error');
                    $(this).next('span').text('');
                } else {
                    $(this).addClass('error');
                    $(this).next('span').text('Contact number format is invalid');
                }

            }
        });


        $('#password').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('password field is required.');

            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');
            }
        });

        $('#confirm_password').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('confirm password field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');
            }
        });

        $('#website_url').blur(function() {
            var val = $(this).val();
            var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

            if (val == "") {
                //$(this).addClass('error');
                //$(this).next('span').text('The confirm password field is required.');
            } else {
                if (urlRegex.test(val)) {
                    $(this).removeClass('error');
                    $(this).next('span').text('');
                } else {
                    $(this).addClass('error');
                    $(this).next('span').text('The website url field format is invalid');
                }
            }
        });

        $('#resume').change(function() {
            //var i = $(this).prev('label').clone();
            var file = $('#resume')[0].files[0].name;
            $(".resume-file-name").text(file);
        });

        $('#portfolio').change(function() {
            //var i = $(this).prev('label').clone();
            var file = $('#portfolio')[0].files[0].name;
            $(".portfolio-file-name").text(file);
        });

    });

})(jQuery);