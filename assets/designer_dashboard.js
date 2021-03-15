(function($) {
    $(function() {
        var id = $("#customer_id").attr('data');

        var url = ngrokURL + "/api/designer/users/" + id;
        var designsUrl = ngrokURL + "/api/designer/designs/" + id;
        var statisticsUrl = ngrokURL + "/api/designer/statistics/" + id;
        var customerUrl = ngrokURL + "/api/get/customer/" + id;

        $.ajax({
            type: "GET",
            url: customerUrl,
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
                $("#create-design-btn").attr('data', response.data.status);
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


        $("#create-design-btn").on("click", function(e) {
            e.preventDefault();
            $status = $(this).attr('data');
            if ($status == 'active') {
                window.location.href = "/pages/create-design";
            } else {
                $('.toast-header').text("Error");
                $('.toast-body').text('Your account is not approved yet to create design, contact Admin!');
                $('.toast').removeClass('hide');
                $('.toast').addClass('show');
            }
        });

        console.log('designer_dashboard.js');




        $("#create-design").on("submit", "#creat", function(e) {
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
        });
    });


})(jQuery);