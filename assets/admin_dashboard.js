(function($){
    $(function(){  
        console.log("admin dashboard js");
       var url = ngrokURL+"/api/admin/dashboard";
      // $("#myModal").modal('show');


    $.ajax({
        type: "GET",
        url: url,
        //dataType:"json",
        cache : false,
        processData : false,
        contentType:false,
        beforeSend: function() {
            $(".validation_error").text('');
            // loader
        },
        success: function(response){
            console.log("hello");
            console.log(response);
            $(".landingPageWrap").empty();
            $(".landingPageWrap").append(response);
        },
        error: function(xhr, status, error){
            console.log("error");
            console.log('error', JSON.stringify(xhr.responseJSON));
        }
    });

    $(".landingPageWrap").on("click", "#view-profile-btn", function(e){
        e.preventDefault();

        var id = $(this).attr('data');
        //alert("view profile" + id);
        var url = ngrokURL+"/api/customer/"+id;

        $.ajax({
            type: "GET",
            url: url,
            //dataType:"json",
            cache : false,
            processData : false,
            contentType:false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response){
                console.log("hello");
                console.log(response);
                //$(".landingPageWrap").empty();
                $("#myModal .modal-body").append(response);
                $("#myModal").modal('toggle');
                $("body").children().first().before($(".modal"));
                

                //$("#myModal").prependTo('body');
            },
            error: function(xhr, status, error){
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
      
    });

    $(".landingPageWrap #myModal").on("click", "#approve-profile-btn", function(e){
        var id = "" ; //assign id attr
        var url = ngrokURL+'/api/designer/approval/'+id
        $.ajax({
            type: "GET",
            url: url,
            cache : false,
            processData : false,
            contentType:false,
            beforeSend: function() {
                $(".validation_error").text('');
                // loader
            },
            success: function(response){
                console.log(response);
                if(response.status == 200){
                $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                }
            },
            error: function(xhr, status, error){
                console.log("error");
                console.log('error', JSON.stringify(xhr.responseJSON));
            }
        });
    });
});


})(jQuery);
