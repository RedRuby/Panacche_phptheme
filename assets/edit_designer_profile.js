(function($) {
    $(function() {
        console.log("designer edit profile");

        customer = $("input[name=customer]").val();
        console.log('customer', customer);
        var url = ngrokURL + "/api/designer/edit/profile/" + customer;


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
                console.log("response", response);
                $(".spinner-border").addClass('hide');
                $("#loadingDiv").addClass('hide');
                if (response.status == 200) {
                    console.log("id", response.data.id);
                    $.each(response.data, function(key, item) {
                        if (key == 'resume' || key == 'portfolio') {
                            $("#" + key + 'Url').val(item);
                            $("." + key + '-file-name').text(item);
                        } else if (key == 'display_picture') {
                            var display_picture = item;
                            display_picture.replace(" ", "%");
                            if (display_picture != '') {
                                display_picture = ngrokURL + '/uploads/designer/display_picture/' + display_picture;
                                $(".addUserPic").css('background-image', 'url(' + display_picture + ')');

                                console.log("display_picture", display_picture);
                            } else {
                                display_picture = ngrokURL + '/default/user.png';
                                $(".addUserPic").css('background-image', 'url(' + display_picture + ')');
                                console.log("display_picture", display_picture);
                            }
                        } else {
                            $("#" + key).val(item);
                        }
                    });
                } else {
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(response.message));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            },
            error: function(xhr, status, error) {
                $(".spinner-border").addClass('hide');
                $("#loadingDiv").addClass('hide');
                console.log("error");
                $("#shopify-section-toast-message").removeClass('hide');
                console.log('error', JSON.stringify(xhr.responseJSON));
                $('.alert-danger').removeClass('hide');
                $('.alert-danger .text').text(JSON.stringify(response.message));
                $('html, body').animate({
                    scrollTop: "0"
                }, 2000);
            }
        });

        $(".uploadFile").on("click", function() {
            var type = $(this).data('type');
            var fd = new FormData();
            var files = $('#' + type)[0].files[0];
            fd.append(type, files);
            fd.append('type', type);
            var url = ngrokURL + "/api/uploadFile";

            $.ajax({
                url: url,
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log(response.data);
                    if (response != 0) {
                        alert('file uploaded');

                        $("#" + type + "Url").val(response.data.url);

                    } else {
                        alert('file not uploaded');
                        $("#" + type + "Url").val();
                    }
                },
            });
        });


        $("#registration").on("click", function(e) {
            e.preventDefault();

            console.log("designer registration");

            var formData = new FormData($("#RegisterForm")[0]);

            customer = $("input[name=customer]").val();
            console.log('customer', customer);
            formData.append("customer", customer);

            var url = ngrokURL + "/api/designer/edit/profile";

            var phone = $("#phone").val();
            if (phone.includes('+')) {

            } else {
                var phone = '+' + phone;
            }

            console.log("phone", phone);

            formData.append("phone", phone);

            $('#resume').val(null);
            $('#portfolio').val(null);

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
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('#resume').val(null);
                    $("input").removeClass('error');
                    $('#portfolio').val(null);
                },
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    console.log("response", response);
                    $(".container").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $("#result").empty().append(response);
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
                        $("#shopify-section-toast-message").removeClass('hide');
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: "0"
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
                                var flag = false;
                                $.each(jsonResponseErrors, function(key, item) {
                                    if (key == 'resumeUrl' || key == 'portfolioUrl') {
                                        $("input[name=" + key + "]").closest('.form-group').find('.validation_error').text(item);
                                        flag = true;
                                    } else if (key == 'first_name' || key == 'last_name' || key == 'email' || key == 'phone' || key == 'password' || key == 'confirm_password' || key == 'website_url') {
                                        flag = true;
                                        $("input[name=" + key + "]").next("span").text(item);
                                        $("input[name=" + key + "]").addClass('error');
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

        $(".resume-click").on("click", function() {
            $("#resume").trigger("click");
        });

        $(".portfolio-click").on("click", function() {
            $("#portfolio").trigger("click");
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


    });
})(jQuery);