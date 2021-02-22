 
  function getAddressByGoogle(idForm){
    let dataAddress=$("#"+idForm+"-BusinessAddress").val()
     
     if(dataAddress==""){
       $("#REGISTER_ulBoxAddress").html("")
       $("#REGISTER_ulBoxAddress").hide()
       return;
     }
     
     dataAddress = dataAddress.replaceAll("  ", " ");
     dataAddress = dataAddress.replaceAll(" ", "+");
     
     let dataz=[]
     
     $.get( "https://maps.googleapis.com/maps/api/geocode/json?address="+dataAddress+"&key=AIzaSyDht87uR3ftw7YMyp6hGanpxGpnAYPhQ7M", function( data ) {
       let data2=data.results
       data2.forEach(function callback(currentValue, index, array) {
         dataz+=`
 <li onclick="REGISTER_itemAddress('`+currentValue.formatted_address+`','`+idForm+`')" class="REGISTER_itemAddress">`+currentValue.formatted_address+`</li>
 
 `
       });
 //       $("#BILLING_address").val("")
       $("#REGISTER_ulBoxAddress").html(dataz)
       $("#REGISTER_ulBoxAddress").show()
     }); 
   }
   
   function REGISTER_itemAddress(itemName,idForm){
     $("#"+idForm+"-BusinessAddress").val(itemName)
     
     $("#REGISTER_ulBoxAddress").html("")
     $("#REGISTER_ulBoxAddress").hide()
   }
   
   
   function remove_double_dot(evt) {
     var s = document.getElementById('RegisterForm-WebSite');
     var fixed = s.value.replace(/\.{2,}/g, '.');
     s.value = fixed;
     //return string.split(' ').join('');
   }
   
   function validate_phone(evt) {
     var theEvent = evt || window.event;
 
     // Handle paste
     if (theEvent.type === 'paste') {
       key = event.clipboardData.getData('text/plain');
     } else {
       // Handle key press
       var key = theEvent.keyCode || theEvent.which;
       key = String.fromCharCode(key);
     }
     var regex = /[0-9]|\-/;
     if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
     }
   }

   document.addEventListener('DOMContentLoaded', function(){ 
    $('#RegisterForm-refered').on('change', function(){
      if ($(this).val() == 'Other' ){
        $('#RegisterForm-refered_other').attr('required', true).slideDown(200).prev().show();
      }else{
        $('#RegisterForm-refered_other').removeAttr('required').slideUp(200).prev().hide();
      }
    });
  }, false);

  
  (function() {
    // your page initialization code here
    // the DOM will be available here
    
    console.log("url", window.location.href );
    var url_string = window.location.href;
    var url = new URL(url_string);
    var view = url.searchParams.get("view");
    console.log("View", view);

    var input = document.getElementsByName('customer[tags]');
    console.log('input', input);
    input.value = view;
 
 })();



  