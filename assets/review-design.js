(function($) {
    $(function() {

        console.log("ready!");

        var url_string = window.location.href;
        console.log('url_str', url_str);
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        customer = $("input[name=customer]").val();
        var url = ngrokURL + "/api/admin/review_design/" + id + '/' + customer;


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
                console.log("hello");
                $(".landingPageWrap").append(response.data.design);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });


        $(".landingPageWrap").on("click", "#approve-design-btn", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            var status = "approved";
            var statusUpdateURL = ngrokURL + '/api/admin/design/status/update/' + id + '/' + status;

            $.ajax({
                type: "GET",
                url: statusUpdateURL,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {

                },
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });

        });

        $(".landingPageWrap").on("click", "#reject-design-btn", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            var status = "rejected";
            var statusUpdateURL = ngrokURL + '/api/admin/design/status/update/' + id + '/' + status;

            $.ajax({
                type: "GET",
                url: statusUpdateURL,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {

                },
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    $("#shopify-section-toast-message").removeClass('hide');
                    console.log('error', JSON.stringify(xhr.responseJSON));
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });
        });

        $(".landingPageWrap").on("click", "#reassign-design-btn", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            var status = "reassign";
            var statusUpdateURL = ngrokURL + '/api/admin/design/status/update/' + id + '/' + status;

            $.ajax({
                type: "GET",
                url: statusUpdateURL,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {

                },
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    $("#shopify-section-toast-message").removeClass('hide');
                    console.log('error', JSON.stringify(xhr.responseJSON));
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });
        });

        $(".landingPageWrap").on("click", "#submit-remark-btn", function(e) {
            e.preventDefault();
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk");
            var id = $(this).attr('data');
            var formData = new FormData($(".landingPageWrap #add-remark-form")[0]);
            formData.append('collection_id', id);

            var url = ngrokURL + '/api/admin/design/add/remark';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {},
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    if (response.status == 201) {
                        console.log(response.message);
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
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });

        });

        $(".landingPageWrap").on("click", "#submit-disclaimer-btn", function(e) {
            e.preventDefault();
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk");
            var id = $(this).attr('data');
            var customer_id = $(this).attr('data-customer');


            var formData = new FormData($(".landingPageWrap #disclaimer-form")[0]);
            formData.append('collection_id', id);
            formData.append('customer_id', customer_id);

            var url = ngrokURL + '/api/admin/design/add/disclaimer';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {},
                success: function(response) {
                    $("#shopify-section-toast-message").removeClass('hide');
                    if (response.status == 201) {
                        console.log(response.message);
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
                    $("#shopify-section-toast-message").removeClass('hide');
                    $('.alert-danger').removeClass('hide');
                    $('.alert-danger .text').text(JSON.stringify(xhr.responseJSON));
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                }
            });

        });

    });
})(jQuery);