(function($) {
    $(function() {
        var id = $("#customer_id").attr('data');
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
                $('.alert-danger .text').text('Kindly wait until your application is under review.');
                $('html, body').animate({
                    scrollTop: "0"
                }, 2000);
            }
        });

        console.log('designer_dashboard.js');

        $(".landingPageWrap").on("click", "#view-design", function(e) {
            e.preventDefault();

            console.log('view design page');
            var id = $(this).attr('data');

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


    });


})(jQuery);