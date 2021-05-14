var ngrokURL = "";
var shop = window.location.hostname;
if (shop == 'panaccheuat.myshopify.com') {
    ngrokURL = "https://qodequaydev.com";
} else if (shop == 'panacch-com.myshopify.com') {
    ngrokURL = "https://panacchepartner.com";
} else if (shop == 'panacche.com') {
    ngrokURL = "https://panacchepartner.com";
} else if (shop == 'panacchedev2.myshopify.com') {
    ngrokURL = "https://panacchedev2.pagekite.me";
} else if (shop == 'panacchedev.myshopify.com') {
    ngrokURL = "https://panacchedev.pagekite.me";
} else {
    ngrokURL = "https://dba45d551510.ngrok.io";
}
(function($) {
    $(function() {
        $(".alert-danger .close").on("click", function(e) {
            e.preventDefault();
            console.log("djbasdd");
            $(".alert-danger").addClass('hide');
            $("#shopify-section-toast-message").addClass('hide');
        });

        $(document).ajaxSend(function() {
            $("#loadingDiv").removeClass('hide');
            $(".spinner-border").removeClass('hide');
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
            $("#shopify-section-toast-message").addClass('hide');
        })
    });
})(jQuery);