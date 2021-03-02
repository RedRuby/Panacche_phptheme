(function($){
    $(function(){  

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

        console.log('designer_dashboard.js');
   
        
   

    $("#create-design").on("submit", "#creat", function(e){
        e.preventDefault();
        console.log("clicked");
           
       var formData = new FormData($("#create-design")[0]);

        var url = ngrokURL+"/api/design";
        $.ajax({
            type: "POST",
            url: formData,
            cache : false,
            data:data,
            dataType:"json",
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
