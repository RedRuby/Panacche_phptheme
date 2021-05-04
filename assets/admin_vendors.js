(function($) {
    $(function() {
        var url = ngrokURL + '/api/admin/vendors';
        addVendor();

        function addVendor() {
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    console.log("hello");
                    $("#table-body").empty();
                    $("#table-body").append(response.data.vendors);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        }

        $("body").on("click", "#save-vendor-btn", function(e) {
            e.preventDefault();
            var addVendorUrl = ngrokURL + '/api/admin/add/vendor';
            var formData = new FormData($("#save-vendor-form")[0]);
            console.log("save form");

            $.ajax({
                type: "POST",
                url: addVendorUrl,
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $(".validation_error").text('');
                    $('.ajax-loader').css("visibility", "visible");
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    $(".landingPageWrap #addVenderPop").modal("hide");
                    $('.alert-success').removeClass('hide');
                    $('.alert-success .text').text(response.message);
                    $('html, body').animate({
                        scrollTop: "0"
                    }, 2000);
                    addVendor();
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });
        });

        $(".searchInput").on("keyup", function(e) {
            e.preventDefault();
            var searchText = $("input[name=search]").val();
            console.log('search text ', searchText);
            // return false;
            url = ngrokURL + '/api/admin/search/vendor/' + searchText;
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    $("#shopify-section-toast-message").removeClass('hide');
                },
                success: function(response) {
                    console.log("hello");
                    $(".landingTable #table-body").empty();
                    $(".landingTable #table-body").append(response.data.vendors);
                    console.log(response.data.vendors);
                },
                error: function(xhr, status, error) {
                    console.log("error");
                    console.log('error', JSON.stringify(xhr.responseJSON));
                }
            });

        });

    });
})(jQuery);