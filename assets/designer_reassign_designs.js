(function($) {
    $(function() {
        console.log('designer_in_progress_designs.js');
        var url = ngrokURL + "/api/designer/designs/reassign";

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
                $(".designCards").empty();
                $(".designCards").append(response.data.designCards);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        $(".landingPageWrap").on("click", "#view-draft-design", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            window.location.href = "/pages/create-design?id=" + id;
        });



    });
})(jQuery);