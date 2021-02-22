(function($){
    $(function(){  //document.ready

        console.log("jquery");

        $("#registration").on("click", function(e){
            e.preventDefault();
            
            var data  = $("#RegisterForm").serializeArray();
            //console.log($('input[name="communication_channel"]:checked').serialize());  


            console.log("data", data);
            var url = "https://40f1c23c3d0c.ngrok.io/api/customer";

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType:"json",
                beforeSend: function() {
                    $(".validation_error").text('');
                },
                success: function(response){
                    console.log("response", response);
                    $( "#result" ).empty().append( response );
                    if(response.success == 'customer created successfully'){
                        alert("Done: customer created successfully");
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
    output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
    }
};