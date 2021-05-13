(function($) {
    $(function() {
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
                    // var name = "";
                    // var shortFirstName = "";
                    // var shortLastName = "";
                    $.each(response.data, function(key, item) {


                        if (key == 'display_picture') {
                            var display_picture = item;
                            if (display_picture != '') {
                                display_picture = ngrokURL + '/uploads/user/display_picture/' + display_picture;
                                $(".smallUserPro img").attr('src', display_picture);
                                $(".userboxImg img").attr('src', display_picture);

                                console.log("display_picture", display_picture);
                            } else {
                                display_picture = ngrokURL + '/default/user.png';
                                $(".smallUserPro img").attr('src', display_picture);
                                $(".userboxImg img").attr('src', display_picture);
                                console.log("display_picture", display_picture);
                            }
                        }

                        /* if (key == 'first_name') {
                             var title = item;
                             shortFirstName = jQuery.trim(title).substring(0, 10)
                                 .split(" ").slice(0, -1).join(" ") + "...";
                         }
                         if (key == 'last_name') {
                             var title = item;
                             shortLastName = jQuery.trim(title).substring(0, 10)
                                 .split(" ").slice(0, -1).join(" ") + "...";
                         }*/

                    });
                    // name = shortFirstName + " " + shortLastName;
                    // console.log("shortFirstName", shortFirstName);
                    // console.log("shortLastName", shortLastName);
                    // console.log("name", name);
                    // $(".userName").text(name);
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

    });
})(jQuery);