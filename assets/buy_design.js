(function($) {
    $(function() {
        $(window).load(function() {
            //alert("window load occurred!");
            function showHideNextPrevIcon(thisElm,setSrc){
                let closestDiv = thisElm;
                if(closestDiv.prev('.carousel-item').length == 0){
                    $('.gallery-control-prev').hide();
                } else {
                    $('.gallery-control-prev').show();
                }
                if(closestDiv.next('.carousel-item').length == 0){
                    $('.gallery-control-next').hide();
                } else {
                    $('.gallery-control-next').show();
                }
                if(setSrc == 1){
                    $('.designGalleryImgSrc').removeClass('currentImage');
                    closestDiv.find('.designGalleryImgSrc').addClass('currentImage');
                    $("#designGalleryImg").attr("src","").attr("src",closestDiv.find('.designGalleryImgSrc').find('img').attr('src'));
                }
            }
            $(document).on("click",'.designGalleryImgSrc',function(){
                $("#designGalleryImg").attr("src",$(this).find('img').attr('src'));
                $('.designGalleryImgSrc').removeClass('currentImage');
                $(this).addClass('currentImage');
                showHideNextPrevIcon($(this).closest('.carousel-item'),0);
            });
            $(document).on("click",'.gallery-control-prev',function(){
                let currentImageTag = $('.designGalleryImgSrc.currentImage');
                let closestDiv = currentImageTag.closest('.carousel-item').prev('.carousel-item');
                showHideNextPrevIcon(closestDiv,1);
                
            });
            $(document).on("click",'.gallery-control-next',function(){
                let currentImageTag = $('.designGalleryImgSrc.currentImage');
                let closestDiv = currentImageTag.closest('.carousel-item').next('.carousel-item');
                showHideNextPrevIcon(closestDiv,1);
            });
            

            var url_string = window.location.href;
            console.log('url_str', url_str);
            var url_str = new URL(url_string);
            var id = url_str.searchParams.get("id");

            customer = $("input[name=customer]").val();
            console.log('customer', customer);
            //var id = "265380626618";
            var shop = "panacchebeta.myshopify.com	";
            var url = ngrokURL + '/api/pages/view/design/' + id + '/' + shop + '/' + customer;
            
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
                    $(".landingPageWrapBuyDesigner").empty();
                    $(".landingPageWrapBuyDesigner").append(response.data.design);
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