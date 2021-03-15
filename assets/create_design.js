(function($) {
    $(function() {
        $(document).ready(function() {
            console.log("dddd");
            $('[data-toggle="tooltip"]').tooltip();
        });


        $("input[name='design_name']").on("change", function(e) {
            var formData = new FormData();
            var design_name = $(this).val();
            formData.append('design_name', design_name);
            console.log("username changes");

            var url = ngrokURL + '/api/verify_design_name';
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("input[name='design_name']").next('span').text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.status == 200) {
                        console.log(response.message);
                        $verifyUsername = true;
                    } else {
                        $verifyUsername = false;
                    }

                },
                error: function(xhr, status, error) {
                    $('.ajax-loader').css("visibility", "hidden");
                    $verifyUsername = false;

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                        });
                    }
                }
            });
        });


        var color_pallette_count = 0;

        $("#save-room-details-btn").on("click", function(e) {
            e.preventDefault();
            console.log("clicked");

            var formData = new FormData($("#create-room-form")[0]);
            console.log('formData', formData);
            //return false;
            var url = ngrokURL + "/api/design";
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                // contentType: 'application/json',
                // Accept: 'application/json',
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                    // loader
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    console.log("response", response);

                    $("#result").empty().append(response);
                    if (response.status == 201) {
                        console.log(response.data.smart_collection);
                        console.log("my id", response.data.smart_collection.id);
                        $('#merchandise-section').removeClass('hide');
                        $('#collection_id').val(response.data.smart_collection.id);
                        $('#collection_id_bulk_upload').val(response.data.smart_collection.id);
                        $('#collection_id_submit_design').val(response.data.smart_collection.id);

                        $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    } else {
                        $('.toast-header').text("Error");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)
                        // console.log('error', xhr.responseJSON.message);
                        // console.log('error', error);
                        // console.log('status', status);
                    $('.ajax-loader').css("visibility", "hidden");
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            //if (key == 'room_style' || key == 'room_type' || key == 'implementation_guide_description') {
                            $("#" + key).next("span").text(item);
                            //} else {
                            //  $("input[name=" + key + "]").next("span").text(item);
                            // }
                        });
                    }
                }
            });
        });





        $("#colorPaintTable").on("click", ".addPlus", function() {
            color_pallette_count = color_pallette_count + 1;
            console.log("you clicked me");
            var html = '<tr>' +
                '<td>' +
                '<div class="col-12 float-left px-0">' +
                '<p class="custom-file addColor addColorImg">' +
                '<input type="file" class="custom-file-input" name="color_img[' + color_pallette_count + ']" id="color_img.' + color_pallette_count + '">' +
                '<span class="validation_error label--error"></span>' +
                '<label class="custom-file-label2 mb-0" for="customFile"></label>' +
                '</p>' +
                '</div>' +
                '</td>' +
                '<td><input type="text" class="form-control" placeholder="" name="color_name[' + color_pallette_count + ']" id="color_name.' + color_pallette_count + '"><span class="validation_error label--error"></span></td>' +
                '<td><input type="text" class="form-control" placeholder="" name="brand[' + color_pallette_count + ']" id="brand.' + color_pallette_count + '"><span class="validation_error label--error"></span></td>' +
                '<td><input type="text" class="form-control" placeholder="" name="finish[' + color_pallette_count + ']" id="finish.' + color_pallette_count + '"><span class="validation_error label--error"></span></td>' +
                '<td><input type="text" class="form-control" placeholder="" name="application[' + color_pallette_count + ']" id="application.' + color_pallette_count + '"><span class="validation_error label--error"></span></td>' +
                '<td><i class="fas fa-save hide mr-2"></i> <i class="fas fa-trash hide"></i><i class="fas fa-plus-circle addPlus"></i></td>' +
                '</tr>';

            $(this).closest('td').find('.fa-save').removeClass('hide');
            $(this).closest('td').find('.fa-trash').removeClass('hide');
            $(this).addClass('hide');
            $(this).closest('tbody').append(html);
        });

        $("#colorPaintTable").on("click", ".fa-trash", function() {
            color_pallette_count = color_pallette_count - 1;
            var child = $(this).closest('tr').nextAll();

            child.each(function() {
                var currentInputs = $(this).find('input');
                console.log("currentInputs", currentInputs);
                currentInputs.each(function() {
                    var name = $(this).attr('name');
                    console.log("name", name);
                    var nameArr = name.split("[");
                    console.log("just name", nameArr[0]);
                    var nextArr = nameArr[1].split("]");
                    var count = nextArr[0];
                    console.log("count", count);
                    var tempCount = parseInt(count);
                    tempCount = tempCount - 1;
                    name = name.replace(count, tempCount);
                    $(this).attr('name', name);
                    $(this).attr('id', nameArr[0] + '.' + tempCount);

                })
            });

            // Removing the current row. 
            $(this).closest('tr').remove();
        });


        $("#collection_images").on("change", function(e) {
            console.log('image changed');
            var total_file = document.getElementById("collection_images").files.length;
            for (var i = 0; i < total_file; i++) {

                //$('#image_preview').append("<img src='" + URL.createObjectURL(e.target.files[i]) + "'><br>");
                var html =
                    '<div class="carousel-item col-md-3 active">' +

                    '<div class="panel panel-default">' +
                    '<div class="panel-thumbnail">' +
                    '<p class="uploadedFile">' +
                    '<img src="' + URL.createObjectURL(e.target.files[i]) + '" title="image 1" class="thumb"/>' +
                    '<span class="imageClose"><i class="fas fa-times-circle"></i></span>' +
                    '</p>' +

                    '</div>' +
                    '</div>' +
                    '</div>';

                $('.carousel-inner.collection_images').append(html);
            }

        });

        $("#collection_blue_prints").on("change", function(e) {
            console.log('image changed');
            var total_file = document.getElementById("collection_blue_prints").files.length;
            for (var i = 0; i < total_file; i++) {

                //$('#image_preview').append("<img src='" + URL.createObjectURL(e.target.files[i]) + "'><br>");
                var html =
                    '<div class="carousel-item col-md-3 active">' +

                    '<div class="panel panel-default">' +
                    '<div class="panel-thumbnail">' +
                    '<p class="uploadedFile">' +
                    '<img src="' + URL.createObjectURL(e.target.files[i]) + '" title="image 1" class="thumb"/>' +
                    '<span class="imageClose"><i class="fas fa-times-circle"></i></span>' +
                    '</p>' +

                    '</div>' +
                    '</div>' +
                    '</div>';

                $('.carousel-inner.collection_blue_prints').append(html);
            }

        });

        $(".colorPaintTable").on("change", '.addColorImg input', function(e) {
            console.log('image changed');
            var id = $(this).attr('id');
            console.log('id', id);

            var total_file = document.getElementById(id).files.length;
            for (var i = 0; i < total_file; i++) {

                //$('#image_preview').append("<img src='" + URL.createObjectURL(e.target.files[i]) + "'><br>");
                var url = URL.createObjectURL(e.target.files[i]);
                console.log('img', url);
                $(this).closest('.addColorImg').css('background-image', 'url(' + url + ')');
            }

        });


        //



        $(".carousel-inner").on("click", ".imageClose", function(e) {
            e.preventDefault();
            console.log('image close');
            $(this).closest('.carousel-item').remove();
        });

        $('#design_implementation_guide').change(function() {
            var i = $(this).prev('label').clone();
            var file = $('#design_implementation_guide')[0].files[0].name;
            $(".dig_file_name").text(file);
        });



        $("#save-merchandise-section-btn").on("click", function(e) {
            var html = '<h1>Hello World</h1>';
            //$(".landingPageWrap #upload-products-sec").append(html);

            //return false;
            e.preventDefault();
            console.log("clicked");

            var formData = new FormData($("#merchandise-section-form")[0]);
            console.log('formData', formData);
            var productUrl = ngrokURL + "/api/design/products";
            $.ajax({
                type: "POST",
                url: productUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    console.log("response", response);
                    //$(this).closest('.addRefWrap').append(response);
                    if (response.status == 201) {
                        $(".landingPageWrap #upload-products-sec").append(response.data);
                        $(".landingPageWrap #submit-new-design-btn").removeClass('hide');
                        $(".landingPageWrap #submit-new-design-cancel-btn").removeClass('hide');

                        // var html =
                        console.log(response.message);
                        $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    } else {
                        $('.toast-header').text("Error");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)
                    $('.ajax-loader').css("visibility", "hidden");
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            //if (key == 'room_style' || key == 'room_type' || key == 'implementation_guide_description') {
                            $("#" + key).next("span").text(item);
                            //} else {
                            //  $("input[name=" + key + "]").next("span").text(item);
                            // }
                        });
                    }
                }
            });
        });


        $(".landingPageWrap").on("change", "#product_images", function(e) {
            console.log('image changed');
            var id = $(this).attr('id');
            console.log('id', id);

            var total_file = document.getElementById(id).files.length;
            for (var i = 0; i < total_file; i++) {

                var url = URL.createObjectURL(e.target.files[i]);
                var html = '<div class="col-6 float-left">' +
                    '<p>' +
                    '<img src="' + url + '"/>'
                '<span class="imageClose"><i class="fas fa-times-circle"></i></span>' +
                '</p>';
                console.log('img', url);
                $(".landingPageWrap #uploadProductImages").append(html);
            }

        });

        $(".landingPageWrap").on("click", "#upload-bulk-btn", function(e) {
            console.log("upload bulk btn");
            $("#csv-bulk-upload").removeClass('hide');
        });

        $(".landingPageWrap").on("change", "#upload_product_csv", function(e) {
            e.preventDefault();
            console.log("upload bulk btn");

            //$("csv-bulk-upload-form");

            var formData = new FormData($("#csv-bulk-upload-form")[0]);
            console.log('formData', formData);
            var bulkUploadUrl = ngrokURL + "/api/design/products/bulk_upload";

            $.ajax({
                type: "POST",
                url: bulkUploadUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    console.log("response", response);
                    //$(this).closest('.addRefWrap').append(response);
                    if (response.status == 201) {
                        $(".landingPageWrap #upload-products-sec").append(response.data);
                        $(".landingPageWrap #submit-new-design-btn").removeClass('hide');
                        $(".landingPageWrap #submit-new-design-cancel-btn").removeClass('hide');
                        console.log(response.message);
                        $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    } else {
                        $('.toast-header').text("Error");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)
                    $('.ajax-loader').css("visibility", "hidden");
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            //if (key == 'room_style' || key == 'room_type' || key == 'implementation_guide_description') {
                            $(".landingPageWrap #" + key).next("span").text(item);
                            //} else {
                            //  $("input[name=" + key + "]").next("span").text(item);
                            // }
                        });
                    }
                }
            });
        });

        $(".landingPageWrap").on("click", "#add-product-view-btn", function(e) {
            e.preventDefault();
            $(".landingPageWrap #add-product-view").removeClass('hide');
            $(".landingPageWrap #save-merchandise-section-btn").removeClass('hide');
            $(".landingPageWrap #save-merchandise-cancel-btn").removeClass('hide');
        });

        $(".landingPageWrap").on("click", "#save-merchandise-cancel-btn", function(e) {
            e.preventDefault();
            $(".landingPageWrap #add-product-view").addClass('hide');
            $(".landingPageWrap #save-merchandise-section-btn").addClass('hide');
            $(".landingPageWrap #save-merchandise-section-btn").addClass('hide');
        });


        $(".landingPageWrap").on("click", "#submit-new-design-btn", function(e) {
            e.preventDefault();
            console.log("submit design");
            var formData = new FormData($("#submit-new-design-form")[0]);
            console.log('formData', formData);
            var submitDesignUrl = ngrokURL + "/api/design/submit";
            $.ajax({
                type: "POST",
                url: submitDesignUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    console.log("response", response);
                    //$(this).closest('.addRefWrap').append(response);
                    if (response.status == 200) {
                        $(".landingPageWrap #staticBackdrop").modal('show');
                    } else {
                        $('.toast-header').text("Error");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)
                    $('.ajax-loader').css("visibility", "hidden");
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');
                }
            });
        });




    });



})(jQuery);