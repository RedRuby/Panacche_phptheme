var ngrokURL = "https://4c55bb2b5542.ngrok.io"; //"http://3.6.94.36";
var shop = "panacchebeta.myshopify.com"; // "panaccheuat.myshopify.com";

(function($) {
    $(function() {

        $(".alert-danger .close").on("click", function(e) {
            e.preventDefault();
            console.log("djbasdd");
            $(".alert-danger").addClass('hide');
        });
    });
})(jQuery);