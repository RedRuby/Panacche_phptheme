(function($) {
    $(function() {
        var id = $("#customer_id").attr('data');

        // var url = ngrokURL + "/api/designer/users/" + id;
        // var designsUrl = ngrokURL + "/api/designer/designs/" + id;
        // var statisticsUrl = ngrokURL + "/api/designer/statistics/" + id;
        // var customerUrl = ngrokURL + "/api/get/customer/" + id;
        var dashboardURL = ngrokURL + "/api/designer/dashboard/" + id;

        $.ajax({
            type: "GET",
            url: dashboardURL,
            //dataType:"json",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response) {
                console.log("hello");
                console.log("my customer details", response);
                $(".dataCards").empty();
                $(".dataCards").append(response.data.dataCards);
                $("#create-design-btn").attr('data', response.data.designer.status);
                $(".designCards").empty();
                $(".designCards").append(response.data.designCards);
                //$(".designersApproveCards").append(response);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        /*$.ajax({
            type: "GET",
            url: url,
            //dataType:"json",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response) {
                console.log("hello");
                console.log(response);
                $(".designersApproveCards").empty();
                $(".designersApproveCards").append(response);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });*/


        /*$.ajax({
            type: "GET",
            url: designsUrl,
            //dataType:"json",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response) {
                console.log("hello");
                console.log(response);
                $(".designCards").empty();
                $(".designCards").append(response);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });*/

        /*$.ajax({
            type: "GET",
            url: statisticsUrl,
            //dataType:"json",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response) {
                console.log("hello");
                console.log(response);
                $(".dataCards").empty();
                $(".dataCards").append(response);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });*/


        $(".landingPageWrap").on("click", "#create-design-btn", function(e) {
            e.preventDefault();
            console.log("kkkl");
            var status = $(this).attr('data');
            if (status == 'active') {
                console.log("jhhhhhhhhhhhhhhhhhhhh");
                window.location.href = "/pages/create-design";
            } else {
                console.log("jhjhjhjjh");
                $("#shopify-section-toast-message").removeClass('hide');
                $('.alert-danger').removeClass('hide');
                $('.alert-danger .text').text('Your account is not approved yet to create design, contact Admin!');
                $('html, body').animate({
                    scrollTop: "0"
                }, 2000);
            }
        });

        console.log('designer_dashboard.js');




        /*$("#create-design").on("submit", "#creat", function(e) {
            e.preventDefault();
            console.log("clicked");

            var formData = new FormData($("#create-design")[0]);

            var url = ngrokURL + "/api/design";
            $.ajax({
                type: "POST",
                url: formData,
                cache: false,
                data: data,
                dataType: "json",
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    // loader
                },
                success: function(response) {
                    console.log(response);
                    if (response.status == 200) {
                        $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        });*/


        $(".landingPageWrap").on("click", "#view-design", function(e) {
            e.preventDefault();

            console.log('view design page');
            //return false;
            var id = $(this).attr('data');
            //var designer_id = $(this).attr('data');

            window.location.href = shop + "/pages/designer-view-design?id=" + id;
            return false;

            var url = ngrokURL + "/api/design/" + id;

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
                    console.log(response);
                    //$(".landingPageWrap").empty();
                    $("#myModal .modal-body").empty();
                    $("#myModal .modal-body").append(response);
                    $("#myModal").modal('show');
                    $("body").children().first().before($(".modal"));
                    //$("#myModal").prependTo('body');
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

        });


    });


})(jQuery);