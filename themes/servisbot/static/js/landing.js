 jQuery(document).ready(function($) {
//hide content until jquery runs
$(".slide-control").on("click", function () {
    $(".control-active").removeClass("control-active"); // remove all current selections
    $(this).addClass("control-active")            // select this element
}); 
$(".bot-form-radio").on("click", function () {
    $(".checked").removeClass("checked"); // remove all current selections
    $(this).addClass("checked")            // select this element
}); 

    //hide content until jquery runs
    var $carousel = $('.wizard-slider');
        $($carousel).flickity({
             // options
            //  cellAlign: 'right',
             draggable: false,
            prevNextButtons: false,
          imagesLoaded: true,

  
            adaptiveHeight: false,
             pageDots: false,
             });

            $('.wizard-slider-control').on( 'click', '.slide-control', function() {
            var index = $(this).index();
            $carousel.flickity( 'select', index, false, true );
            });


            var $videos = $(".video-launch");
            var $html = $("html");
            if ($videos) {
              $(".video-launch").each(function () {
                $(this).on("click", function (e) {
                  $html.addClass("no-scroll");
                  var ID = this.getAttribute("href");
                  var modal = $(ID);
                  var iframe = modal.find("iframe");
                  var closeModal = modal.find(".close-video-modal");
                  var src = iframe.attr("src");
                  modal.addClass("show-video-modal");
          
//                   iframe.attr("src", src + "?autoplay=1");
                  closeModal.focus();
                  console.log(closeModal);
                });
          
                $(this).on("keypress", function (e) {
                  if (e.which == 13) {
                    $html.addClass("no-scroll");
                    var ID = this.getAttribute("href");
                    var modal = $(ID);
                    var iframe = modal.find("iframe");
                    var closeModal = modal.find(".close-video-modal");
                    var src = iframe.attr("src");
                    modal.addClass("show-video-modal");
                    closeModal.focus();
//                     iframe.attr("src", src + "?autoplay=1");
                  }
                });
              });
          
              $(".close-video-modal").each(function () {
                $(this).on("click", function (e) {
                  $html.removeClass("no-scroll");
                  var modal = $(this).parent().parent().parent(".video-modal");
                  var iframe = modal.find("iframe");
                  var src = iframe.attr("src");
                  var srcOriginal = src.substring(0, src.length - 11);
                  modal.removeClass("show-video-modal");
                  iframe.attr("src", src);
                });
              });
            }
    
}); 
