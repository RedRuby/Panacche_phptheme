(function($) {
    $(function() {
        console.log("designer edit profile");

        customer = $("input[name=customer]").val();
        console.log('customer', customer);
        var url = ngrokURL + "/api/customer/edit/profile/" + customer;


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
                        if (key == 'display_picture') {
                            var display_picture = item;
                            if (display_picture != '') {
                                display_picture = ngrokURL + '/uploads/user/display_picture/' + display_picture;
                                $(".addUserPic").css('background-image', 'url(' + display_picture + ')');

                                console.log("display_picture", display_picture);
                            } else {
                                display_picture = ngrokURL + '/default/user.png';
                                $(".addUserPic").css('background-image', 'url(' + display_picture + ')');
                                console.log("display_picture", display_picture);
                            }
                        } else if (key == 'phone') {
                            var phone = item;
                            if (phone.includes('+')) {
                                phone = phone.replace("+", "");
                                console.log("phone", phone);
                                $("#" + key).val(phone);
                            } else {
                                console.log("phone", phone);
                                $("#" + key).val(phone);
                            }

                        } else if (key == 'how_did_you_hear_about_us') {
                            $("select option[value='" + item + "']").attr("selected", "selected");
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

        $("#registration").on("click", function(e) {
            e.preventDefault();

            console.log("registration click");

            var formData = new FormData($("#RegisterForm")[0]);
            var url = ngrokURL + "/api/customer/edit/profile";

            customer = $("input[name=customer]").val();
            console.log('customer', customer);
            formData.append("customer", customer);

            var phone = $("#phone").val();

            if (phone.includes('+')) {

            } else {
                var phone = '+' + phone;
            }
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
            $("#display_picture").closest('.col-12').find('.validation_error').text('');

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

    });
})(jQuery);