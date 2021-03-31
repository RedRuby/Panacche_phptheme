(function($) {
    $(function() {
        console.log('designer_in_progress_designs.js');
        var url = ngrokURL + "/api/designer/designs/inprogress";

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


    });
})(jQuery);