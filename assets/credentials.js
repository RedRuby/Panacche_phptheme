var ngrokURL = "https://0a792748c039.ngrok.io"; //"http://3.6.94.36";
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
    });
})(jQuery);