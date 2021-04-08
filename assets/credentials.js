var ngrokURL = "https://1b21440a7a1b.ngrok.io"; //"http://panaccheuat.qodequay.co.in"; 
var shop = "panacchebeta.myshopify.com"; // "panaccheuat.myshopify.com";


(function($) {
    $(function() {
        $(".alert-danger .close").on("click", function(e) {
            e.preventDefault();
            console.log("djbasdd");
            $(".alert-danger").addClass('hide');
        });

        $(document).ajaxSend(function() {
            $(".spinner-border").removeClass('hide');
            $("#loadingDiv").removeClass('hide');
            console.log("start");
        });

        $(document).ajaxComplete(function() {
            $(".spinner-border").addClass('hide');
            $("#loadingDiv").addClass('hide');
            console.log("complete");
        });

        $(document).ajaxError(function() {
            $(".spinner-border").addClass('hide');
            $("#loadingDiv").addClass('hide');
            console.log("error");
        });

        $(document).ajaxStop(function() {
            $(".spinner-border").addClass('hide');
            $("#loadingDiv").addClass('hide');
            console.log("stop");
        });

        $(document).ajaxSuccess(function() {
            $(".spinner-border").addClass('hide');
            $("#loadingDiv").addClass('hide');
            console.log("success");
        });

        $(".alert-success .close").on("click", function(e) {
            e.preventDefault();
            console.log("hide success alert");
            $(".alert-success").addClass('hide');
        })
    });
})(jQuery);