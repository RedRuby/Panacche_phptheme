(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/total/designers';
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
                $("#myTabContent").empty();
                $("#myTabContent").append(response.data.designers);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
})(jQuery);