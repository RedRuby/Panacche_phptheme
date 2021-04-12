(function($) {
    $(function() {

        var url = ngrokURL + '/api/new/new_arrival_pending';
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".landingPageWrap").addClass('hide');
                $(".spinner-border").removeClass('hide');
            },
            success: function(response) {
                $(".landingPageWrap").removeClass('hide');
                $(".spinner-border").addClass('hide');
                console.log('response');
                $('.landingPageWrap .append-data').empty();
                $('.landingPageWrap .append-data').append(response.data);
            },
            error: function(xhr, status, error) {
                // $('.new-designers').empty();
                // $('.new-designers').append(xhr.responseText);
                console.log('xhr', xhr.responseText);
            }
        });

        $(".landingPageWrap").on("click", ".view-profile-btn", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            window.location.href = "/pages/designers-profile?id=" + id;
        });

        $(".landingPageWrap").on("click", ".review-design", function(e) {
            e.preventDefault();
            var id = $(this).attr('data');
            window.location.href = "/pages/review-design?id=" + id;
        });


    });

})(jQuery);