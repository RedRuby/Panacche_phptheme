(function($){
    $(function(){  //document.ready

        console.log("jquery");

        $("#registration").on("click", function(e){
            e.preventDefault();
            
            var data  = $("#RegisterForm").serializeArray();
            //console.log($('input[name="communication_channel"]:checked').serialize());  

            var formData = new FormData($("#RegisterForm")[0]);


            console.log("formData", formData);
            // data['profile_pic'] = formData;
            // console.log("data", data);
            //
            var url = "https://d2372e30d0d1.ngrok.io/api/customer";

            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                dataType:"json",
                cache : false,
                processData : false,
                //contentType: "multipart/form-data",
                contentType:false,
                beforeSend: function() {
                    $(".validation_error").text('');
                },
                success: function(response){
                    console.log("response", response);
                    $( "#result" ).empty().append( response );
                    if(response.success == 'customer created successfully'){
                        alert("Account created successfully, Account activation link has been sent to your email!");
                        console.log("Account created successfully, Account activation link has been sent to your email!");
                        window.location.href = "https://panacchebeta.myshopify.com/account/";
                    }
                    
                },error: function(xhr, status, error) 
                {
                    console.log('error', xhr.responseText);
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
        
    });

    //Functions, Plugins, Etc.. Here
    //(does not wait for DOM READY STATE) 

})(jQuery);

var loadFile = function(event) {
    var output = document.getElementById('profile_pic_output');
    output.src = URL.createObjectURL(event.target.files[0]);
    $("profilePic").val(event.target.files[0]);
    console.log(event.target.files[0]);
    output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
    }
};