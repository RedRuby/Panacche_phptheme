(function($) {
    $(function() {
        // console.log("kjjjjjjj");
        var url = ngrokURL + '/api/design';

        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {

            },
            success: function(response) {
                console.log('success');
                $(".landingPageWrap").empty();
                $(".landingPageWrap").append(response);

            },
            error: function(xhr, status, error) {
                console.log("error");
                if (xhr.responseJSON.errors) {
                    $.each(xhr.responseJSON.errors, function(key, item) {
                        console.log("error", key);
                        $("input[name=" + key + "]").next("span").text(item);
                    });
                }
            }
        });

        $("#search").on("click", function(e) {
            e.preventDefault() {
                var url = ngrokURL + '/api/design/search';
                $.ajax({
                    type: "GET",
                    url: url,
                    cache: false,
                    processData: false,
                    contentType: false,
                    beforeSend: function() {

                    },
                    success: function(response) {
                        console.log('success');
                        $(".landingPageWrap").empty();
                        $(".landingPageWrap").append(response);

                    },
                    error: function(xhr, status, error) {
                        console.log("error");
                        if (xhr.responseJSON.errors) {
                            $.each(xhr.responseJSON.errors, function(key, item) {
                                console.log("error", key);
                                $("input[name=" + key + "]").next("span").text(item);
                            });
                        }
                    }
                });
            }
        })

    });
})(jQuery);