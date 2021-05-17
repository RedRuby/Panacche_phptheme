(function($) {
    $(function() {

        var url_string = window.location.href;
        console.log('url_str', url_str);
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        var url = ngrokURL + "/api/admin/designer/profile/" + id;

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
                $(".leftPart").empty();
                $(".leftPart").append(response.data.leftPart);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });


        $(".landingPageWrap").on("click", "#approve-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');
            var url = ngrokURL + "/api/admin/designer/profile/approve/" + id;
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $(".container-fluid").addClass('hide');
                    $(".spinner-border").removeClass('hide');
                    $('.alert-danger').addClass('hide');
                    $('.alert-success').addClass('hide');
                },
                success: function(response) {
                    $(".container-fluid").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: $(".alert-success").offset().top
                    }, 2000);

                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                    $(".container-fluid").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: $(".alert-danger").offset().top
                    }, 2000);
                }
            });

        });


        $(".landingPageWrap").on("click", "#reject-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');
            var url = ngrokURL + "/api/admin/designer/profile/reject/" + id;
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $(".container-fluid").addClass('hide');
                    $(".spinner-border").removeClass('hide');
                    $('.alert-danger').addClass('hide');
                    $('.alert-success').addClass('hide');
                },
                success: function(response) {
                    $(".container-fluid").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: $(".alert-success").offset().top
                    }, 2000);

                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                    $(".container-fluid").removeClass('hide');
                    $(".spinner-border").addClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: $(".alert-danger").offset().top
                    }, 2000);
                }
            });

        });
    });
})(jQuery);