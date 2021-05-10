var storeProjectProduct = null;
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
            $(document).on("click",'#myTab .nav-item a.nav-link',function(){
                var thiselm = $(this);
                setTimeout(function(){
                    $('#myTab .nav-item a.nav-link').removeClass('active');
                    thiselm.removeClass('showActive').addClass('active');    
                },10)
            });
            $(document).on("change",'.referenceLinkInput',function(){
                var thiselm = $(this);
                var referenceLinkId = thiselm.siblings( ".referenceLinkId" );
                saveRefrenceLink(referenceLinkId,thiselm)
            });
            $(document).on("click",'.addLinkInput a',function(){
                $('#referenceLinkContent').append(addLinkhtml(1));
            });
            $(document).on('change','.productSelectionCheckbox',function () {
                var losest_tr = $(this).closest('.productListMainElm');
                var qty_elm = losest_tr.find('.productSelectionQty');
                var checkbox_checked;
                if($(this).is(':checked')){
                    if(qty_elm.val() == '' || qty_elm.val() == 0){
                        qty_elm.val(1);
                    }
                    checkbox_checked = 1;
                } else {
                    qty_elm.val(0);
                    checkbox_checked = 0;
                }
                saveMyProjectProduct(qty_elm.val(),checkbox_checked,losest_tr);
            });
            $(document).on('change','.productSelectionQty',function () {
                var losest_tr = $(this).closest('.productListMainElm');
                var chkbox_elm = losest_tr.find('.productSelectionCheckbox');
                var checkbox_checked;
                if($(this).val() > 0){
                    chkbox_elm.prop('checked', true);
                    checkbox_checked = 1;
                } else {
                    chkbox_elm.prop('checked', false);
                    checkbox_checked = 0;
                }
                saveMyProjectProduct($(this).val(),checkbox_checked,losest_tr);
            });
            function saveMyProjectProduct(qty_elm,checkbox_checked,losest_tr){
                var product_id = losest_tr.find('.product_id').val();
                var my_product_id = losest_tr.find('.my_product_id');
                var id = url_str.searchParams.get("id");
                var dataval = {
                                qty_elm : qty_elm, 
                                checkbox_checked : checkbox_checked, 
                                myProjectId : id, 
                                product_id : product_id, 
                                my_product_id : my_product_id.val()
                            };
                storeProjectProduct = $.ajax({
                    url: ngrokURL + '/api/page/saveProductToMyProduct',
                    type: "POST",
                    data: dataval,
                    dataType: 'json',
                    beforeSend : function() {
                        if(storeProjectProduct != null) {
                            storeProjectProduct.abort();
                        }
                    },
                    success: function(response) {
                        storeProjectProduct = null;
                        my_product_id.val(response.id);
                    },
                    error: function(xhr, status, error) {
                        console.log("error");
                        console.log('error', JSON.stringify(xhr.responseJSON));
                    }
                });
            }
            $(document).on("click",'.deletLinks',function(){
                var refrenceLink = $(this).siblings( ".referenceLinkInput" );
                var referenceLinkId = $(this).siblings( ".referenceLinkId" );
                refrenceLink.val('');
                if(referenceLinkId){
                    saveRefrenceLink(referenceLinkId,refrenceLink);
                }
                $(this).closest('.position-relative').remove();
            });
            function saveRefrenceLink(referenceLinkId,refrenceLink){
                var id = url_str.searchParams.get("id");
                $.ajax({
                    url: ngrokURL + '/api/page/uploadReferenceLinks',
                    type: "POST",
                    data: {referenceLinkId : referenceLinkId.val(), refrenceLink : refrenceLink.val(), myProjectId : id},
                    dataType: 'json',
                    success: function(response) {
                        referenceLinkId.val(response.id);
                    },
                    error: function(xhr, status, error) {
                        console.log("error");
                        console.log('error', JSON.stringify(xhr.responseJSON));
                    }
                });
            }
            function addLinkhtml(showdelete){
                html = '<p class="linkInputs position-relative">'+
                            '<input type="text" class="form-control pr-5 referenceLinkInput" placeholder="Copy reference links here" value="">'+
                            '<input type="hidden" name="referenceLinkId" class="referenceLinkId" value="">';
                    if(showdelete == 1)
                        html += '<span class="deletLinks text-danger"><i class="fas fa-trash" aria-hidden="true"></i></span>';
                html += '</p>';
                return html;
            }

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
                    $(".landingPageWrapBuyDesigner").empty();
                    $(".landingPageWrapBuyDesigner").append(response.data.design);
                    remainingReflinkCount = 3-$(".referenceLinkInput").length;
                    if(remainingReflinkCount > 0){
                        for(let i=0; i < remainingReflinkCount; i++){
                            $('#referenceLinkContent').append(addLinkhtml(0));
                        }
                    }
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