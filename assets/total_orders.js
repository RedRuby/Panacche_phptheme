(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/total/orders';
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
                $("#myTabContent").append(response.data.orders);
            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });


        $(".searchInput").on("keyup", function(e) {
            e.preventDefault();
            var searchText = $("input[name=search]").val();
            console.log('search text ', searchText);
            // return false;
            url = ngrokURL + '/api/admin/search/orders/' + searchText;
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {

                },
                success: function(response) {
                    console.log("hello");
                    $("#myTabContent").empty();
                    $("#myTabContent").append(response.data.orders);
                    console.log(response.data.vendors);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

        });

    });
})(jQuery);