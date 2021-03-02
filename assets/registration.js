(function($){
    $(function(){  
        console.log("jquery");


        $("input[name='username']").on("change", function(e){
            var formData = new FormData();
            var username = $(this).val();
            formData.append('username', username);
            console.log("username changes");
            
            var url = ngrokURL+'/api/verify_username';
            $.ajax({
                type: "POST",
                url: url,
                data:formData,
                dataType:"json",
                cache : false,
                processData : false,
                contentType:false,
                beforeSend: function() {
                    $("input[name='username']").next('span').text('');
                },
                success: function(response){
                    if(response.status == 200){
                        console.log(response.message);
                    }

                },error: function(xhr, status, error) 
                {

                if(xhr.responseJSON.errors){
                    $.each(xhr.responseJSON.errors, function (key, item) 
                        {        
                            console.log("error", key);              
                            $("input[name="+key+"]").next("span").text(item);
                        });
                 }
                }
            });
        });


        $("input[name='email']").on("change", function(e){
            var formData = new FormData();
            var email = $(this).val();
            formData.append('email', email);
            console.log("email changes");
            
            var url = ngrokURL+'/api/verify_email';
            $.ajax({
                type: "POST",
                url: url,
                data:formData,
                dataType:"json",
                cache : false,
                processData : false,
                contentType:false,
                beforeSend: function() {
                    $("input[name='email']").next('span').text('');
                },
                success: function(response){
                    if(response.status == 200){
                        console.log(response.message);
                    }

                },error: function(xhr, status, error) 
                {

                if(xhr.responseJSON.errors){
                    $.each(xhr.responseJSON.errors, function (key, item) 
                        {        
                            console.log("error", key);              
                            $("input[name="+key+"]").next("span").text(item);
                        });
                 }
                }
            });
        });


        $("#registration").on("click", function(e){
            e.preventDefault();
            
            var formData = new FormData($("#RegisterForm")[0]);
            var url = ngrokURL + "/api/customer";

            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType:"json",
                cache : false,
                processData : false,
                contentType:false,
                beforeSend: function() {
                    $(".validation_error").text('');
                },
                success: function(response){
                    console.log("response", response.errors);
                    $( "#result" ).empty().append( response );
                    if(response.status == 201){
                        console.log(response.message);
                        $('.toast-header').text("Success");
                        $('.toast-body').text(response.message)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');

                    }else{
                        $('.toast-header').text("Error");
                        $('.toast-body').text(response)
                        $('.toast').removeClass('hide');
                        $('.toast').addClass('show');
                    }
                },error: function(xhr, status, error) 
                {
                    $('.toast-header').text("Error");
                    $('.toast-body').text(JSON.stringify(xhr.responseJSON.errors))
                    $('.toast').removeClass('hide');
                    $('.toast').addClass('show');

                   if(xhr.responseJSON.errors){
                    $.each(xhr.responseJSON.errors, function (key, item) 
                        {        
                            console.log("error", key);              
                            $("input[name="+key+"]").next("span").text(item);
                        });
                    }
                }
              });
        });

        $("input[name=profile_pic]").on("change", function(e){
            console.log("pic change");
            var file = e.target.files[0];
            if(file){
                var reader = new FileReader();
     
                reader.onload = function(){
                    $("#profile_pic_output").attr("src", reader.result);
                }
     
                reader.readAsDataURL(file);
            }
        })
    });
})(jQuery);
