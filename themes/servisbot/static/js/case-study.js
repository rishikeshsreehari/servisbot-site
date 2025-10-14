function checkScroll(){
    if ($(window).scrollTop() >= 5) {
        $( '#cs-head' ).addClass( 'opaque' );
    } else {
    }
}



 jQuery(document).ready(function($) {


//hide content until jquery runs
  $(function(){
  $(document).ready(function() {
           $(".case-study-container").addClass("show");
         });
});
checkScroll();
$(window).scroll(checkScroll);


}); 
