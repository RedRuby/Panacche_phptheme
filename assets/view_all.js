(function($) {
    $(function() {
        console.log('view all js');
        var url_string = window.location.href;
        console.log('url_str', url_str);
        var url_str = new URL(url_string);
        var type = url_str.searchParams.get("type");

        console.log('type', type)
        var url = ngrokURL + "/api/design/view_all/" + type;

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
                //window.history.pushState({ "html": response, "pageTitle": "View Design" }, "", "https://panacchebeta.myshopify.com/pages/view-design");
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });

        $("#content").on("click", ".view-designer-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');

            window.location.href = "https://panacchebeta.myshopify.com/pages/designers-profile?id=" + id;

        });

    });

})(jQuery);