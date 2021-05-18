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

        
        $(document).on('click','.changereq6 i',function () {
            let changeRequest = $(this).closest( ".changeRequestTRElm" );
            let change_request_id = changeRequest.find('.change_request_id').val();
            let data = {change_request_id:change_request_id, delete_change_request:1}
            if(change_request_id) {
                $.ajax({
                    url: ngrokURL + '/api/page/saveChangeRequest',
                    type: "POST",
                    data: data,
                    dataType: 'json',
                    success: function(response) {
                        changeRequest.remove();
                        if($('.changeRequestTRElm').length >= 3){
                            $('.addFreeChangebtn').hide();
                            $('.addPaidChangebtn').removeClass('d-none').show();
                        } else {
                            $('.addFreeChangebtn').show();
                            $('.addPaidChangebtn').addClass('d-none');
                        }
                        if($('.changeRequestTRElm').length > 3){
                            $('.submit_design_changes_btn').hide();
                            $('.pay_now_btn').show();
                        } else {
                            $('.pay_now_btn').hide();
                            $('.submit_design_changes_btn').show();
                        }
                    },
                    error: function(xhr, status, error) {
                        console.log("error");
                        console.log('error', JSON.stringify(xhr.responseJSON));
                    }
                });
            } else {
                changeRequest.remove();
                if($('.changeRequestTRElm').length >= 3){
                    $('.addFreeChangebtn').hide();
                    $('.addPaidChangebtn').removeClass('d-none').show();
                } else {
                    $('.addFreeChangebtn').show();
                    $('.addPaidChangebtn').addClass('d-none');
                }
                if($('.changeRequestTRElm').length > 3){
                    $('.submit_design_changes_btn').hide();
                    $('.pay_now_btn').show();
                } else {
                    $('.pay_now_btn').hide();
                    $('.submit_design_changes_btn').show();
                }
            }
        });
        $(document).on("input", ".product_change_req_file", function(e) {
            changeRequestAction($(this))
        });
        $(document).on("change",'.changeRequestTRElm select, .changeRequestTRElm input',function(){
            changeRequestAction($(this))
        });
        function changeRequestAction(thisval){
            let changeRequest = thisval.closest( ".changeRequestTRElm" );
            let change_type = changeRequest.find('.changereq1 select').val();
            var change_item = changeRequest.find('.changereq2 select').val();
            var id = $("#myProjectId").val();
            var data = new FormData();
            data.append("change_type", change_type);
            data.append("change_item", change_item);
            data.append("myProjectId", id);
            let submit = 1;
            if(!change_item){
                submit = 0;
            }
            var change_request_elm;
            if(change_type == 0){
                img_file = changeRequest.find('.product_change_req_file');
                data.append("product_file", img_file[0].files[0]);
                change_reason = changeRequest.find('.changereq3 .change_reason').val();
                change_request_elm = changeRequest.find('.changereq3 .change_request_id');
                data.append("change_request_id", change_request_elm.val());
                data.append("change_reason", change_reason);
                if(!change_reason || !img_file.val()){
                    submit = 0;
                }
            } else {
                brand = changeRequest.find('.changereq3 .brand').val();
                application = changeRequest.find('.changereq4 .application').val();
                change_reason = changeRequest.find('.changereq5 .change_reason').val();
                change_request_elm = changeRequest.find('.changereq5 .change_request_id');
                data.append("brand", brand);
                data.append("application", application);
                data.append("change_reason", change_reason);
                data.append("change_request_id", change_request_elm.val());
                if(!brand || !application || !change_reason){
                    submit = 0;
                }
            }
            if(submit == 1) {
                $.ajax({
                    url: ngrokURL + '/api/page/saveChangeRequest',
                    type: "POST",
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        change_request_elm.val(response.id);
                    },
                    error: function(xhr, status, error) {
                        console.log("error");
                        console.log('error', JSON.stringify(xhr.responseJSON));
                    }
                });
            }
        }
        $(document).on("change",'.color_selc_cls',function(){
            var brand_name = $("#colorPallette_"+this.value).find('.brand_name').html();
            var application_name = $("#colorPallette_"+this.value).find('.application_name').html();
            var changeRequestTRElm = $(this).closest('.changeRequestTRElm');
            changeRequestTRElm.find('.changereq3').find('select .brand_name_option').remove();
            changeRequestTRElm.find('.changereq4').find('select .application_name_option').remove();
            if(brand_name){
                changeRequestTRElm.find('.changereq3').find('select').append('<option selected class="brand_name_option" value="'+brand_name+'">'+brand_name+'</option>');
            }
            if(application_name){
                changeRequestTRElm.find('.changereq4').find('select').append('<option selected class="application_name_option" value="'+application_name+'">'+application_name+'</option>');
            }
        });
        $(document).on("change",'.selectDropdown',function(){
            //selectDropdown
            let changeRequestPElm = $(this).closest('.changeRequestTRElm');
            if(this.value == 0){
                let product_selc = '<select class="custom-select">';
                product_selc += '<option value="">Select Change Item</option>';
                $('.productSelectionCheckbox:checked').each(function() {
                    productelm = $(this).closest('.productListMainElm');
                    productName = productelm.find('.productName').html();
                    product_id = productelm.find('.product_id').val();
                    img = productelm.find('.itenImage img').attr('src');
                    product_selc += '<option value="'+product_id+'" data-thumbnail="'+img+'">'+productName+'</option>';
                });
                product_selc += '</select>';
                html = '<td class="changereq1">'+
                             '<div class="form-group mb-0">'+
                              '<select class="custom-select selectDropdown">'+
                                '<option>Select Change Item</option>'+
                                '<option selected value="0">Shopping List</option>'+
                                '<option value="1">Pain Palette</option>'+
                              '</select>'+
                           '</div>'+
                          '</td>'+
                          '<td class="changereq2">'+product_selc+'</td>'+
                          '<td class="changereq3" colspan="2">'+
                            '<input type="text" class="form-control change_reason" placeholder="Change Reason">'+
                            '<input type="hidden" name="change_request_id" class="change_request_id" value="">'+
                          '</td>'+
                          '<td class="changereq5">'+
                            '<div class="custom-file">'+
                                '<input type="file" class="custom-file-input" id="customFile" name="filename">'+
                                '<i class="fas fa-paperclip"></i>'+
                                '<label class="custom-file-label mb-0" for="customFile"></label>'+
                            '</div>'+
                          '</td>'+
                          '<td class="changereq6 text-center">'+
                              '<i class="fas fa-trash" aria-hidden="true"></i>'+
                          '</td>';
                changeRequestPElm.html(html);
            } else if(this.value == 1) {
                let color_selc = '<select class="custom-select color_selc_cls">';
                color_selc += '<option value="">Select Color</option>';
                $('#in_progress .colorPallette').each(function() {
                    color_id = $(this).find('.color_name').attr('colorId');
                    color_name = $(this).find('.color_name').html();
                    color_selc += '<option value="'+color_id+'">'+color_name+'</option>';
                });
                color_selc += '</select>';
                console.log(color_selc);
                html = '<td class="changereq1">'+
                             '<div class="form-group mb-0">'+
                              '<select class="custom-select selectDropdown">'+
                                '<option value="">Select Change Item</option>'+
                                '<option value="0">Shopping List</option>'+
                                '<option selected value="1">Pain Palette</option>'+
                              '</select>'+
                           '</div>'+
                          '</td>'+
                          '<td class="changereq2">'+color_selc+'</td>'+
                          '<td class="changereq3">'+
                            '<select class="custom-select brand">'+
                                '<option value="">Brand</option>'+
                            '</select>'+
                          '</td>'+
                          '<td class="changereq4">'+
                            '<select class="custom-select application">'+
                                '<option value="">Application</option>'+
                            '</select>'+
                          '</td>'+
                          '<td class="changereq5">'+
                            '<input type="text" class="form-control  change_reason" placeholder="Change Reason">'+
                            '<input type="hidden" name="change_request_id" class="change_request_id" value="">'+
                          '</td>'+
                          '<td class="text-center changereq6">'+
                              '<form class="changeRequestForm">'+
                              '</form>'+
                              '<i class="fas fa-trash" aria-hidden="true"></i>'+
                          '</td>';
                          console.log(changeRequestPElm);
                changeRequestPElm.html(html);
            } else {
                changeRequestPElm.find('.changereq2, .changereq3, .changereq4, .changereq5').html('');
            }
        });
        $(document).on("click",'.addFreeChangebtn',function(){
            let totalReq = $('.changeRequestTRElm').length;
            let html = '';
            if($('.freeChangeHead').length == 0){
                html += '<tr><td colspan="6" class="freeChangeHead">Free change request</td></tr>';
            }
            html += '<tr class="freeChange changeRequestTRElm">'+
                          '<td class="changereq1">'+
                             '<div class="form-group mb-0">'+
                              '<select class="custom-select selectDropdown">'+
                                '<option selected>Select Change Item</option>'+
                                '<option value="0">Shopping List</option>'+
                                '<option value="1">Pain Palette</option>'+
                              '</select>'+
                           '</div>'+
                          '</td>'+
                          '<td class="changereq2">&nbsp;</td>'+
                          '<td class="changereq3">&nbsp;</td>'+
                          '<td class="changereq4">&nbsp;</td>'+
                          '<td class="changereq5">&nbsp;</td>'+
                          '<td class="text-center changereq6">'+
                              '<i class="fas fa-trash" aria-hidden="true"></i>'+
                          '</td>'+
                    '</tr>';
            if($('.freeChangeHead').length == 0){
                html += '<tr class="paidChangeHead">'+
                          '<td colspan="6">'+
                              '<span class="float-left">Paid change request - you paid $100 for this change</span>'+
                              '<span class="float-right">Payment Done</span>'+
                          '</td>'+
                        '</tr>';
            }
            if(totalReq > 0){
                if(totalReq >= 3){
                    $('#changeRequest').append(html);
                } else {
                    $('.changeRequestTRElm').last().after(html);
                }
                totalReq = $('.changeRequestTRElm').length
                if(totalReq >= 3){
                    $('.addFreeChangebtn').hide();
                    $('.addPaidChangebtn').removeClass('d-none').show();
                } else {
                    $('.addFreeChangebtn').show();
                    $('.addPaidChangebtn').addClass('d-none');
                }
                if(totalReq > 3){
                    $('.submit_design_changes_btn').hide();
                    $('.pay_now_btn').show();
                } else {
                    $('.pay_now_btn').hide();
                    $('.submit_design_changes_btn').show();
                }
            } else {
                $('#changeRequest').html(html);
            }
            
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
        $(document).on("click", ".uploadImageCarousel .imageClose", function(e) {
            var url = ngrokURL + "/api/page/uploadDocuments";
            var image_car = $(this).closest('.uploadImageCarousel');
            $.ajax({
                url: url,
                type: 'post',
                data: {id:$(this).attr('image_id')},
                dataType: 'json',
                success: function(response) {
                    console.log(response.data);
                    if (response.success == true) {
                        image_car.remove();
                    } else {
                        alert('file not uploaded');
                        //$("#" + type + "Url").val();
                    }
                },
            });
        });
        
        $(document).on("input", ".file_documents", function(e) {
                    var url = ngrokURL + "/api/page/uploadDocuments";
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: new FormData($('#additional_furniture_file')[0]),
                        contentType: false,
                        processData: false,
                        success: function(response) {
                            console.log(response.data);
                            if (response.success == true) {
                                $("#floorPlanCarousel").append($("#upload_image_default_elm").html());
                                var recentlyadded = $("#floorPlanCarousel .uploadImageCarousel").last();
                                recentlyadded.find('.image_cls').attr('src',response.url)
                                recentlyadded.find('.imageClose').attr('image_id',response.id);
                            } else {
                                alert('file not uploaded');
                                //$("#" + type + "Url").val();
                            }
                        },
                    });
                });
    });
})(jQuery);