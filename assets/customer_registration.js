(function($) {
    $(function() {

        $(window).on("load", function(e) {
            $("#shopify-section-toast-message").addClass('hide');
        });
        console.log("customer registration");
        $verifyUsername = false;
        $verifyEmail = false;
        $verifyPhone = false;
        $verifyZip = false;



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
                    console.log("response", response);
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                        $verifyEmail = true;
                    } else {
                        $verifyEmail = false;
                    }
                },
                error: function(xhr, status, error) {
                    console.log("error", xhr.responseText);
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
                    }
                }
            });
        });


        $("#registration").on("click", function(e) {
            e.preventDefault();

            console.log("registration click");

            var formData = new FormData($("#RegisterForm")[0]);
            var url = ngrokURL + "/api/customer";
            var phone = $("#phone").val();
            var phone = '+' + phone;
            formData.append("phone", phone);

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
                    $('.alert-danger').addClass('hide');
                    $('.alert-success').addClass('hide');
                },
                success: function(response) {
                    console.log("response", response);
                    $(".spinner-border").addClass('hide');
                    $("#result").empty().append(response);
                    $("#shopify-section-toast-message").removeClass('hide');
                    if (response.status == 201) {
                        console.log(response.message);
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: "0"
                        }, 2000);
                        setTimeout(
                            function() {
                                window.location.href = "/account";
                            }, 5000);
                    } else {
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: "0"
                        }, 2000);
                    }
                },
                error: function(xhr, status, error) {
                    $(".spinner-border").addClass('hide');
                    if (xhr.responseText != "") {

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        var jsonResponseStatus = '';
                        var message = '';
                        var flag = false;
                        $.each(jsonResponseText, function(name, val) {
                            if (name == "errors") {
                                jsonResponseErrors = $.parseJSON(JSON.stringify(val));
                                $.each(jsonResponseErrors, function(key, item) {
                                    if (key == 'first_name' || key == 'last_name' || key == 'email' || key == 'phone' || key == 'password' || key == 'confirm_password' || key == 'how_did_you_hear_about_us') {
                                        flag = true;
                                        if (key == 'how_did_you_hear_about_us') {
                                            $("#" + key).next("span").text(item);
                                            $("#" + key).addClass('error');
                                        } else {
                                            $("input[name=" + key + "]").next("span").text(item);
                                            $("input[name=" + key + "]").addClass('error');
                                        }
                                    }

                                    if (flag == false) {
                                        $("#shopify-section-toast-message").removeClass('hide');
                                        $('.alert-danger').removeClass('hide');
                                        $('.alert-danger .text').text(JSON.stringify(jsonResponseText.errors));
                                        $('html, body').animate({
                                            scrollTop: "0"
                                        }, 2000);
                                    }

                                });

                            }
                        });

                    }
                }
            });
        });

        $("input[name=display_picture]").on("change", function(e) {
            console.log("pic change");
            $("#display_picture").next('span.validation_error').text('');

            var file = $('#display_picture')[0].files[0].name;
            var myfile = e.target.files[0];
            //  var file = e.target.files[0];

            const size = $('#display_picture')[0].files[0].size;
            // Check if any file is selected.

            var ext = file.split('.').pop();
            if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif" || ext == "png") {

            } else {
                $('#display_picture').val("");
                $("#display_picture").closest('.col-12').find('.validation_error').text('Please select valid image extension');
            }


            const fileSize = Math.round((size / 1024));
            // The size of the file.
            if (fileSize >= 1025) {
                //alert("size large");
                $('#display_picture').val("");
                $("#display_picture").closest('.col-12').find('.validation_error').text('File too Big, please select a file less than 1mb');

            } else {

                if (myfile) {
                    var reader = new FileReader();

                    reader.onload = function() {
                        $(".addUserPic").css("background-image", 'url(' + reader.result + ')');
                    }

                    reader.readAsDataURL(myfile);
                }
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
            var val = $(this).val();;
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The email field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');

            }
        });

        // $(window).load(function() {
        //     var phones = [{ "mask": "(###) ###-####" }, { "mask": "(###) ###-##############" }];
        //     $("#phone").inputmask({
        //         mask: phones,
        //         greedy: false,
        //         definitions: { '#': { validator: "[0-9]", cardinality: 1 } }
        //     });
        // });

        $('#phone').keypress(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('Contact number field is required.');
            } else {
                // var phoneRegex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

                // if (phoneRegex.test(val)) {
                //     var formattedPhoneNumber =
                //         val.replace(phoneRegex, "($1) $2-$3");
                //     $(this).val(formattedPhoneNumber);
                // } else {
                //$(this).addClass('error');
                //$(this).next('span').text('Contact number must be valid.');

                // Invalid phone number
            }

            //$(this).removeClass('error');
            //$(this).next('span').text('');

        });

        $('#phone').blur(function() {
            //  var phoneRegex = /^(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([0-9]{3})\s*\)|([0-9]{3}))\s*(?:[.-]\s*)?([0-9]{3})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('password field is required.');

            } else {
                // if (phoneRegex.test(val)) {
                //     $(this).removeClass('error');
                //     $(this).next('span').text('');
                // } else {
                //     $(this).addClass('error');
                //     $(this).next('span').text('Contact number format is invalid');
                // }

            }
        });

        $('#password').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The password field is required.');

            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');
            }
        });

        $('#confirm_password').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The confirm password field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');
            }
        });

        $('#how_did_you_hear_about_us').blur(function() {
            var val = $(this).val();
            if (val == "") {
                $(this).addClass('error');
                $(this).next('span').text('The how did you hear about us field is required.');
            } else {
                $(this).removeClass('error');
                $(this).next('span').text('');

            }
        });



    });

})(jQuery);