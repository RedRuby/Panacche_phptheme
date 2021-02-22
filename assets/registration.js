(function($){
    $(function(){  //document.ready

        console.log("jquery");

        $("#registration").on("click", function(e){
            e.preventDefault();

            console.log("Register button clicked");
            var data  = $("#RegisterForm").serializeArray();
            console.log("data", data);
            var url = "https://5b35ffffefa1.ngrok.io/api/customer";

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType:"json",
                success: function(response){
                    $( "#result" ).empty().append( response );
                    if(response.success == 'customer created successfully'){
                        $("#RegisterForm").submit();
                    }
                    
                },error: function(xhr){
                   console.log("ajax call error", xhr);
                }
              });
            
        });

        //DOM READY code here

    });

    //Functions, Plugins, Etc.. Here
    //(does not wait for DOM READY STATE) 

})(jQuery);