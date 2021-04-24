(function($) {
    $(function() {

        var url = ngrokURL + "/api/pages/our/designers";

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
                $(".landingPageWrap .designCards").empty();
                $(".landingPageWrap .designCards").append(response.data.designers);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        // $(".landingPageWrap").on("click", "#view-designer-profile-btn", function(e) {
        //     e.preventDefault();

        //     var id = $(this).attr('data');

        //     window.location.href = shop + "/pages/view-our-designer-profile?id=" + id;

        // });

    });

})(jQuery);