(function($) {
    $(function() {
        console.log("admin dashboard js");
        //var id = $("#customer_id").attr('data');
        var url = ngrokURL + "/api/admin/designers";
        var designsUrl = ngrokURL + "/api/admin/designs";
        var statisticsUrl = ngrokURL + "/api/admin/statistics";
        // var customerUrl = ngrokURL + "/api/get/customer/" + id;
        // $("#myModal").modal('show');


        // $.ajax({
        //     type: "GET",
        //     url: customerUrl,
        //     //dataType:"json",
        //     cache: false,
        //     processData: false,
        //     contentType: false,
        //     beforeSend: function() {
        //         $(".validation_error").text('');
        //         // loader
        //     },
        //     success: function(response) {
        //         console.log("hello");
        //         console.log("my customer details", response);
        //         //$(".designersApproveCards").empty();
        //         //$(".designersApproveCards").append(response);
        //     },
        //     error: function(xhr, status, error) {
        //         console.log("error");
        //         console.log('error', JSON.stringify(xhr.responseJSON));
        //     }
        // });


        $.ajax({
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
        });


        $.ajax({
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
        });

        $.ajax({
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
        });

        $(".landingPageWrap").on("click", "#view-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');
            //alert("view profile" + id);
            var url = ngrokURL + "/api/customer/" + id;

            $.ajax({
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

        $(".landingPageWrap #myModal").on("click", "#designer-profile-approve-btn", function(e) {
            var id = $(this).attr('data'); //assign id attr

            var url = ngrokURL + '/api/designer/profile/approve/' + id + '/' + shop
            console.log('approve api');


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
        });


        $(".landingPageWrap #myModal").on("click", "#designer-profile-reject-btn", function(e) {
            var id = $(this).attr('data'); //assign id attr
            var url = ngrokURL + '/api/designer/profile/reject/' + id
            console.log('approve api');


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
        });


    });





})(jQuery);