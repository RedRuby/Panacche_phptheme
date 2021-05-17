(function($) {
    $(function() {
        $(window).load(function() {
            //alert("window load occurred!");

            var url_string = window.location.href;
            console.log('url_str', url_str);
            var url_str = new URL(url_string);
            var id = url_str.searchParams.get("id");

            customer = $("input[name=customer]").val();
            console.log('customer', customer);
            //var id = "265380626618";
            var shop = "panacchebeta.myshopify.com	";
            var url = ngrokURL + '/api/pages/view/design/' + id + '/' + customer + '/' + shop;

            //console.log("customer_id", customer_id);
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {

                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    console.log("hello");
                    console.log(response.data.design);
                    $(".landingPageWrap").empty();
                    $(".landingPageWrap").append(response.data.design);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        });




        $(".landingPageWrap").on("click", ".view-image-popup", function(e) {
            e.preventDefault();
            console.log("kkk");
            var src = $(this).attr('href');
            console.log("src", src);
            $(".popup-img").attr('src', src);
            $("#galleryPop").modal('show');
            $("#galleryPop").prependTo("body");
        });

        $(".landingPageWrap").on("click", "#buy-design-btn", function(e) {
            e.preventDefault();
            var id = parseInt($(this).attr('data'));
            $.ajax({
                type: "POST",
                url: '/cart/clear.js',
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                complete: function(response) {
                    console.log("done ..........");
                    $.ajax({
                        type: "POST",
                        url: '/cart/add.js',
                        data: {

                            "quantity": 1,
                            "id": id,

                        },
                        dataType: 'json',
                        cache: false,

                        beforeSend: function() {
                            $("#shopify-section-toast-message").removeClass('hide');
                        },
                        success: function(response) {
                            window.location.href = "/checkout";
                        },
                        error: function(xhr, status, error) {
                            console.log("error");
                            console.log('error', JSON.stringify(xhr.responseJSON));
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

            // console.log("buy design");
            // var id = parseInt($(this).attr('data'));
            // console.log('id', id);
            // jQuery.post('/cart/clear.js', {});

            // jQuery.post('/cart/add.js', {
            //     quantity: 1,
            //     id: id,
            // }).then(function() {
            //     console.log('done nnn');
            //     window.location.href = "/checkout/";
            // });

        });



    });
})(jQuery);