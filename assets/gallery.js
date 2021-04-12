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
                $(".landingPageWrap").append(response.data.designs);

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


        // document.querySelector('.landingPageWrap #room-style-datalist').addEventListener('.landingPageWrap #room-style-datalist', event => {
        //     const value = event.target.value;
        //     const opt = [].find.call(event.target.list.options, o => o.value === value);

        //     if (opt) {
        //         event.target.value = opt.textContent;
        //     }
        // });

        $("#search").on("click", function(e) {
            e.preventDefault();
            var url = ngrokURL + '/api/design/search';
            $.ajax({
                type: "POST",
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

        });

        $(".landingPageWrap").on("click", ".view-designer-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');

            window.location.href = "https://panacchebeta.myshopify.com/pages/designers-profile?id=" + id;

        });

    });
})(jQuery);