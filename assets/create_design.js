(function($) {
    $(function() {
        $(document).on("load", function() {
            $('[data-toggle="tooltip"]').tooltip();
        });




        // $("#create-design").on("click", function(e){
        //     e.preventDefault();
        //     $status = $(this).attr('data');
        //     if($status == 'active'){
        //         window.location.href="/pages/create-design";
        //     }else{
        //         $('.toast-header').text("Error");
        //         $('.toast-body').text('Your account is not approved yet to create design, contact Admin!');
        //         $('.toast').removeClass('hide');
        //         $('.toast').addClass('show');
        //     }
        // });

        $(".submit-design-btn").on("click", function(e) {
            e.preventDefault();
            console.log("clicked");

            var formData = new FormData($("#create-design-form")[0]);

            var url = ngrokURL + "/api/design";
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                dataType: "json",
                processData: false,
                contentType: false,
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
                    console.log('error', xhr.responseJSON.message);
                    console.log('error', error);
                    console.log('status', status);
                    $('.ajax-loader').css("visibility", "hidden");
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');

                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                            if (key == 'room_style' || key == 'room_type') {
                                $("#" + key).next("span").text(item);
                            }
                        });
                    }
                }
            });
        });
    });


    //   var data =[];

    //     var url = ngrokURL + "api/design/add/products";
    //         $.ajax({
    //             type: "POST",
    //             url: url,
    //             data:data,
    //             dataType:"json",
    //             cache : false,
    //             processData : false,
    //             contentType:false,
    //             success: function(response){
    //                 console.log("response", response);
    //             },error: function(xhr, status, error) 
    //             {
    //                 console.log('error', xhr.responseText);
    //             }
    //           });

})(jQuery);