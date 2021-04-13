(function($) {
    $(function() {
        // console.log("kjjjjjjj");
        var url = ngrokURL + '/api/design';

        $.ajax({
            type: "GET",
            url: url,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function() {

            },
            success: function(response) {
                console.log('success');
                $(".landingPageWrap").empty();
                $(".landingPageWrap").append(response.data.designs);
                $(".galleryHead #designer-datalist").append(response.data.datalist);

            },
            error: function(xhr, status, error) {
                console.log("error");
                if (xhr.responseJSON.errors) {
                    $.each(xhr.responseJSON.errors, function(key, item) {
                        console.log("error", key);
                        $("input[name=" + key + "]").next("span").text(item);
                    });
                }
            }
        });


        // document.querySelector('.landingPageWrap #room-style-datalist').addEventListener('.landingPageWrap #room-style-datalist', event => {
        //     const value = event.target.value;
        //     const opt = [].find.call(event.target.list.options, o => o.value === value);

        //     if (opt) {
        //         event.target.value = opt.textContent;
        //     }
        // });

        $(".galleryHead").on("click", "#apply-search-btn", function(e) {
            e.preventDefault();
            var formData = new FormData($("#search-design-form")[0]);
            var url = ngrokURL + '/api/design/search';

            var room_budget_val = $('#room_budget').val();
            var room_budget = $('#room-budget-datalist [value="' + room_budget_val + '"]').data('value');
            var room_budget_arr = room_budget.split(",");


            var room_style_val = $('#room_style').val();
            var room_style = $('#room-style-datalist [value="' + room_style_val + '"]').data('value');

            var room_type_val = $('#room_type').val();
            var room_type = $('#room-type-datalist [value="' + room_type_val + '"]').data('value');

            var designer_val = $('#designer_id').val();
            var designer = $('#designer-datalist [value="' + designer_val + '"]').data('value');

            formData.append('min', room_budget_arr[0]);
            formData.append('max', room_budget_arr[1]);
            formData.append('room_style', room_style);
            formData.append('room_type', room_type);
            formData.append('designer', designer);

            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {

                },
                success: function(response) {
                    console.log('success');
                    $(".landingPageWrap").empty();
                    $(".landingPageWrap").append(response);

                },
                error: function(xhr, status, error) {
                    console.log("error");
                    if (xhr.responseJSON.errors) {
                        $.each(xhr.responseJSON.errors, function(key, item) {
                            console.log("error", key);
                            $("input[name=" + key + "]").next("span").text(item);
                        });
                    }
                }
            });

        });

        $(".landingPageWrap").on("click", ".view-designer-profile-btn", function(e) {
            e.preventDefault();

            var id = $(this).attr('data');

            window.location.href = "https://panacchebeta.myshopify.com/pages/designers-profile?id=" + id;

        });

    });
})(jQuery);