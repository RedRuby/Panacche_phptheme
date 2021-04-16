(function($) {
    $(function() {
        console.log("admin dashboard js");
        var url = ngrokURL + "/api/admin/designers";
        var designsUrl = ngrokURL + "/api/admin/designs";
        var statisticsUrl = ngrokURL + "/api/admin/statistics";


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
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
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
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".validation_error").text('');
            },
            success: function(response) {
                console.log("hello");
                console.log(response);
                $(".newArrivalCard").empty();
                $(".newArrivalCard").append(response);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        $(".landingPageWrap").on("click", "#view-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');
            var url = ngrokURL + "/api/customer/" + id;

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
                    console.log("hello");
                    console.log(response);
                    $("#myModal .modal-body").empty();
                    $("#myModal .modal-body").append(response);
                    $("#myModal").modal('show');
                    $("body").children().first().before($(".modal"));
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

        });

        $(".landingPageWrap #myModal").on("click", "#designer-profile-approve-btn", function(e) {
            var id = $(this).attr('data');

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


        $(".landingPageWrap").on("click", "#view-design", function(e) {
            e.preventDefault();

            console.log('view design page');


            //return false;
            var id = $(this).attr('data');
            window.location.href = "https://panacchebeta.myshopify.com/pages/view-design?id=" + id;
            return false;
            //alert("view profile" + id);
            var url = ngrokURL + "/api/admin/design/" + id;

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
                    //console.log(response);

                    //$("#content").empty();
                    $("#content").append(response);

                    //document.title = response.pageTitle;
                    window.history.pushState({ "html": response, "pageTitle": "View Design" }, "", "https://panacchebeta.myshopify.com/pages/view-design");
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

        });

    });
})(jQuery);