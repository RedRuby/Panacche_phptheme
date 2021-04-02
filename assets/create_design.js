(function($) {
    $(function() {
        $(document).ready(function() {
            console.log("dddd");
            $('[data-toggle="tooltip"]').tooltip();
        });

        var url_string = window.location.href;
        console.log('url_str', url_string);
        var url_str = new URL(url_string);
        var id = url_str.searchParams.get("id");
        console.log('id', id);
        if (id != '') {
            var url = ngrokURL + "/api/designer/create-design/" + id;
            $.ajax({
                type: "GET",
                url: url,
                // data: formData,
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
                    $(".landingPageWrap").empty();
                    $(".landingPageWrap").append(response.data.design);
                    verifyInputs();

                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        }



        $("input[name='design_name']").on("change", function(e) {
            var formData = new FormData();
            var design_name = $(this).val();
            formData.append('design_name', design_name);
            console.log("design_name changes");

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

        $(".landingPageWrap").on("click", "#save-room-details-btn", function(e) {
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
                    // $('.ajax-loader').css("visibility", "visible");
                    // loader
                },
                success: function(response) {
                    //$('.ajax-loader').css("visibility", "hidden");
                    console.log("response", response);

                    $("#result").empty().append(response);
                    if (response.status == 201) {

                        console.log(response.data.smart_collection);
                        console.log("my id", response.data.smart_collection.id);
                        window.history.pushState("create design", "id", "/pages/create-design?id=" + response.data.smart_collection.id);
                        $(".room-progress").addClass('greenActive');
                        $(".room-progress").next('span').addClass('greenActiveText');

                        $('#merchandise-section').removeClass('hide');
                        $('#collection_id').val(response.data.smart_collection.id);
                        $('#collection_id_bulk_upload').val(response.data.smart_collection.id);
                        $('#collection_id_submit_design').val(response.data.smart_collection.id);

                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: $(".alert-success").offset().top
                        }, 2000);
                    } else {
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                        $('html, body').animate({
                            scrollTop: $(".alert-danger").offset().top
                        }, 2000);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr.responseText);
                    $(".spinner-border").addClass('hide');
                    $("#loadingDiv").addClass('hide');

                    if (xhr.responseText != "") {

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        var jsonResponseStatus = '';
                        var message = '';
                        $.each(jsonResponseText, function(name, val) {
                            if (name == "errors") {
                                jsonResponseErrors = $.parseJSON(JSON.stringify(val));
                                $.each(jsonResponseErrors, function(key, item) {
                                    $('.alert-danger').removeClass('hide');
                                    $('.alert-danger .text').text(JSON.stringify(jsonResponseErrors));
                                    $('html, body').animate({
                                        scrollTop: $(".alert-danger").offset().top
                                    }, 2000);
                                    $("#" + key).next("span").text(item);
                                    // $("input[name=" + key + "]").addClass('error');
                                });

                            }
                        });
                    }

                    // $('.alert-danger').removeClass('hide');
                    // $('.alert-danger .text').text(JSON.stringify(xhr.responseText.errors));
                    // $('html, body').animate({
                    //     scrollTop: $(".alert-danger").offset().top
                    // }, 2000);
                    // if (xhr.responseJSON.errors) {
                    //     $.each(xhr.responseJSON.errors, function(key, item) {
                    //         console.log("error", key);
                    //         $("#" + key).next("span").text(item);
                    //     });
                    // }
                }
            });
        });





        $(".landingPageWrap #colorPaintTable").on("click", ".addPlus", function() {
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

        $(".landingPageWrap #colorPaintTable").on("click", ".fa-trash", function() {
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


        $(".landingPageWrap").on("change", "#collection_images", function(e) {
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

        $(".landingPageWrap").on("change", "#collection_blue_prints", function(e) {
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

        $(".landingPageWrap .colorPaintTable").on("change", '.addColorImg input', function(e) {
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



        $(".landingPageWrap .carousel-inner").on("click", ".imageClose", function(e) {
            e.preventDefault();
            console.log('image close');
            $(this).closest('.carousel-item').remove();
        });

        $('.landingPageWrap').on("change", "#design_implementation_guide", function() {
            var i = $(this).prev('label').clone();
            var file = $('#design_implementation_guide')[0].files[0].name;
            $(".dig_file_name").text(file);
        });



        $(".landingPageWrap").on("click", "#save-merchandise-section-btn", function(e) {
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
                        $('.alert-success').removeClass('hide');
                        $('.alert-success .text').text(response.message);
                        $(".").addClass('')
                        $(".landingPageWrap .merchandise-progress").addClass('greenActive');
                        $(".landingPageWrap .merchandise-progress").next('span').addClass('greenActiveText');

                    } else {
                        $('.alert-danger').removeClass('hide');
                        $('.alert-danger .text').text(response.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('xhr', xhr)
                        // $('.ajax-loader').css("visibility", "hidden");
                        // $('.toast-header').text("Error");
                        // $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                        // $('.toast').removeClass('hide');
                        // $('.toast').addClass('show');

                    if (xhr.responseText != "") {

                        var jsonResponseText = $.parseJSON(xhr.responseText);
                        var jsonResponseStatus = '';
                        var message = '';
                        $.each(jsonResponseText, function(name, val) {
                            if (name == "errors") {
                                jsonResponseErrors = $.parseJSON(JSON.stringify(val));
                                $.each(jsonResponseErrors, function(key, item) {
                                    $('.alert-danger').removeClass('hide');
                                    $('.alert-danger .text').text(JSON.stringify(jsonResponseErrors));
                                    $('html, body').animate({
                                        scrollTop: $(".alert-danger").offset().top
                                    }, 2000);
                                    $("#" + key).next("span").text(item);
                                    // $("input[name=" + key + "]").addClass('error');
                                });

                            }
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

        $("#room_type").on("change", function(e) {
            verifyInputs();
        });

        $("#room_style").on("change", function(e) {
            verifyInputs();
        });
    });

})(jQuery);

function verifyInputs() {
    console.log("verifyInputs");
    var design_name = $("#design_name").val();
    var design_price = $("#design_price").val();
    var room_budget = $("#room_budget").val();
    var room_type = $('#room_type').find(":selected").val();
    var room_style = $('#room_style').find(":selected").val();

    if (design_name == '' || design_price == '' || room_budget == '' || room_type == '0' || room_style == '0') {
        $("#save-room-details-btn").addClass('disbaleBtn');
    } else {
        $("#save-room-details-btn").removeClass('disbaleBtn');
    }
}



$(document).ready(function() {
    console.log("dddd");
    $('[data-toggle="tooltip"]').tooltip();

    var url_string = window.location.href;
    console.log('url_str', url_str);
    var url_str = new URL(url_string);
    var id = url_str.searchParams.get("id");

    if (id != '') {
        var url = ngrokURL + "/api/designer/create-design/" + id;
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
                $("#content").append(response);

            },
            error: function(xhr, status, error) {
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    }
});