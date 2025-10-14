$(document).ready(function (e) {

  $("body").addClass("ready");

  $("a:empty").remove();
  $("p:empty").remove();

  // Trademarks and Copyrights
  $("body :not(script)")
    .contents()
    .filter(function () {
      return this.nodeType === 3;
    })
    .replaceWith(function () {
      return this.nodeValue.replace(/[™®]/g, "<sup>$&</sup>");
    });

  // accordians
  var ac = $(".accordian h3");
  var ap = $(".accordian h3 + div");
  $(ap).hide();
  $(ac).click(function () {
    i = $(ac).index(this);
    $(this).toggleClass("sel");
    $(ap.get(i)).slideToggle();
  });

  $(".tree").click(function () {
    $(this).toggleClass("open");
  });
  (function () {
    var triggerBttn = $("#tree");
    overlay = document.querySelector("div.overlay");
    var closeBttn = $(".button.overlay-close");
    var transEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend",
      },
      transEndEventName = transEndEventNames[Modernizr.prefixed("transition")],
      support = { transitions: Modernizr.csstransitions };

    function toggleOverlay() {
      if ($(overlay).hasClass("open")) {
        $("body").removeClass("noscroll");
        $(overlay).removeClass("open").addClass(overlay, "close");
        var onEndTransitionFn = function (ev) {
          if (support.transitions) {
            if (ev.propertyName !== "visibility") return;
            this.removeEventListener(transEndEventName, onEndTransitionFn);
          }
          $(overlay).removeClass("open").add(overlay, "close");
        };
        if (support.transitions) {
          overlay.addEventListener(transEndEventName, onEndTransitionFn);
        } else {
          onEndTransitionFn();
        }
      } else if (!$(overlay).hasClass("close")) {
        $(overlay).addClass("open");
        $("body").addClass("noscroll");
      }
    }
    $(triggerBttn).click(function () {
      toggleOverlay();
    });
  })();

  // Keep content in center of split panels
  var to = 100;
  var ww = $(window).width();
  var wpad = 0;
  if (ww > 1200) {
    wpad = Math.floor((ww - 1200) / 2);
  } else {
    wpad = Math.floor(ww * 0.02);
  }
  $(".split").each(function () {
    if (!$(this).is(".splitimg")) {
      if ($(this).is(".splitleft")) {
        $(this).css("padding-left", wpad + "px");
      } else {
        $(this).css("padding-right", wpad + "px");
      }
    }
  });
  $(window).resize(function () {
    clearTimeout(to);
    to = setTimeout(function () {
      $(".overlay").removeClass("open");
      $(".tree").removeClass("open");
      ww = $(window).width();
      if (ww > 1200) {
        wpad = Math.floor((ww - 1200) / 2);
      } else {
        wpad = Math.floor(ww * 0.02);
      }
      $(".split").each(function () {
        if (!$(this).is(".splitimg")) {
          if ($(this).is(".splitleft")) {
            $(this).css("padding-left", wpad + "px");
          } else {
            $(this).css("padding-right", wpad + "px");
          }
        }
      });
    }, 100);
  });

  // Add slide animations
  var slides = $(".slide");
  var slidecontainers = $(slides).find(".container");
  $(slidecontainers).each(function () {
    if (!$(this).isOnScreen()) {
      // (this).addClass('slideInUp');
    }
  });
  $(slides).on("onscreen", function (event, measurement) {
    if (measurement.percentFromTop < 60) {
      $(this).addClass("is-active");
    }
  });

  // Popup videos and push events
  $("a.video.external").click(function () {
    var vtitle = "VIDEO: " + $(this).attr("title");
    _hsq.push([
      "trackEvent",
      {
        id: vtitle,
      },
    ]);
    return false;
  });

  // Team handler
  var memberdata = $("#memberdata li");
  if (memberdata.length) {
    var members = $(".member-data"); // changed class from .member until they use this feature
    var currentmember = -1;
    var rows = Math.round(members.length / 4);
    $(members).click(function () {
      var memberclick = this;
      var targetpnl = $(this);
      var i = $(".member").index(this);
      var activemember = $("#activemember");
      if ($(window).width() > 767) {
        targetpnl = $(this).parent(".row").parent(".container");
      }
      if ($(activemember).length) {
        if (currentmember != i) {
          $(members).removeClass("sel");
          $(members).eq(i).addClass("sel");
          var sibling = $(this);
          if ($(window).width() > 767) {
            sibling = $(targetpnl).siblings().find("div");
          }
          if ($(sibling).html().indexOf("memberpnl") > 0) {
            $(activemember).html(
              "<div>" + $(memberdata).eq(i).html() + "</div>"
            );
          } else {
            $(activemember).remove();
            $(targetpnl).after(
              '<div id="activemember" class="activemember"><div>' +
                $(memberdata).eq(i).html() +
                "</div></div>"
            );
            $("#activemember").show();
          }
          currentmember = i;
        } else {
          $(members).eq(i).addClass("sel");
          $(members).eq(i).toggleClass("sel");
          $(activemember).slideToggle(function () {
            $(this).remove();
          });
        }
      } else {
        $(members).eq(i).addClass("sel");
        $(targetpnl).after(
          '<div id="activemember" class="activemember"><div>' +
            $(memberdata).eq(i).html() +
            "</div></div>"
        );
        $("#activemember").slideToggle();
        currentmember = i;
      }
      $("html,body").animate(
        { scrollTop: $(memberclick).offset().top - 100 },
        800
      );
      return false;
    });
    var mto = 100;
    $(window).resize(function () {
      clearTimeout(mto);
      mto = setTimeout(function () {
        $("#activemember").remove();
        $(members).removeClass("sel");
      }, 100);
    });
  }

  // Popup form handlers
  $(".demo a.vc_btn3, a.btn.demo, a.btn.dream, a.btn.drea, li.demo a").click(
    function () {
      $("#oform-wrap").empty();
      $("body").addClass("noscroll");
      var formID = "b4bf8b4f-4fcd-4ae9-b4ea-bdfdef47a92a";
      if ($(this).hasClass("demo") || $(this).parent("li").hasClass("demo")) {
        formID = "9bd2b454-245c-4692-9ef1-5e9845030467";
      }
      if (
        $(this).hasClass("vc_btn3") ||
        $(this).parent("li").hasClass("demo")
      ) {
        formID = "9bd2b454-245c-4692-9ef1-5e9845030467";
      }
      if ($(this).hasClass("dream")) {
        formID = "5b7cdaa4-610c-4d16-be6b-40dd4e5b8453";
      }
      hbspt.forms.create({
        css: "",
        portalId: "3807088",
        target: "#oform-wrap",
        formId: formID,
      });
      $("#form-overlay").addClass("open");
      return false;
    }
  );

  // Popup form handlers
  $(".deflection-bot,  .vp-outro-image").click(function () {
    $("#oform-wrap").empty();
    $("body").addClass("noscroll");
    var formID = "a59bee60-6254-4c5b-9ce7-438a4c79df90";
    hbspt.forms.create({
      css: "",
      portalId: "3807088",
      target: "#oform-wrap",
      formId: formID,
    });
    $("#form-overlay").addClass("open");
    return false;
  });

  $(".close-button").click(function () {
    $("#form-overlay").removeClass("open");
    $("body").removeClass("noscroll");
  });

  var infospans = $("div.info");
  $(infospans).mouseenter(function () {
    $(this).parent("div").addClass("active");
  });
  $(infospans).mouseleave(function () {
    $(this).parent("div").removeClass("active");
  });

  $(".openbot").click(function () {
    $(".sb-roundel").click();
    return false;
  });
});

(function ($) {
  $.fn.vidPop = function (options) {
    var vidPopOptions = $.extend(
      {
        autoplay: 1,
      },
      options
    );
    $(this).on("click", function (e) {
      var vidLink = $(this).attr("href");
      if (vidLink.match(/(youtube.com)/)) {
        var split_c = "v=";
        var split_n = 1;
      }
      if (vidLink.match(/(youtu.be)/) || vidLink.match(/(vimeo.com\/)+[0-9]/)) {
        var split_c = "/";
        var split_n = 3;
      }
      if (vidLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
        var split_c = "/";
        var split_n = 5;
      }
      var getVidID = vidLink.split(split_c)[split_n];
      var cleanVidID = getVidID.replace(/(&)+(.*)/, "");
      if (vidLink.match(/(youtu.be)/) || vidLink.match(/(youtube.com)/)) {
        var vidEmbedLink =
          "https://www.youtube.com/embed/" +
          cleanVidID +
          "?rel=0&autoplay=" +
          vidPopOptions.autoplay +
          "";
      }
      if (
        vidLink.match(/(vimeo.com\/)+[0-9]/) ||
        vidLink.match(/(vimeo.com\/)+[a-zA-Z]/)
      ) {
        var vidEmbedLink =
          "https://player.vimeo.com/video/" +
          cleanVidID +
          "?autoplay=" +
          vidPopOptions.autoplay +
          "";
      }
      $("body").append(
        '<div class="vidPop-Wrap vidPop-animation"><div class="vidPop-Content"><span class="vidPop-Close"></span><iframe src="' +
          vidEmbedLink +
          '" allowfullscreen></iframe></div></div>'
      );
      if ($(".vidPop-Wrap").hasClass("vidPop-animation")) {
        setTimeout(function () {
          $(".vidPop-Wrap").removeClass("vidPop-animation");
        }, 600);
      }
      $(".vidPop-Wrap, .vidPop-Close").click(function () {
        $(".vidPop-Wrap")
          .addClass("vidPop-Hide")
          .delay(515)
          .queue(function () {
            $(this).remove();
          });
      });
      e.preventDefault();
    });
    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        $(".vidPop-Wrap, .vidPop-Close").click();
      }
    });
  };
})(jQuery);

$.fn.isOnScreen = function () {
  var win = $(window);
  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft(),
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();
  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();
  return !(
    viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom
  );
};

// Main Nav
(function ($) {
  $.fn.scrollHideMenu = function (options) {
    var settings = $.extend(
      {
        control: ".tree",
      },
      options
    );
    var nav = $(this);
    var control = settings.control;
    var scroll = $(document).scrollTop();
    var headerHeight = 80;
    $(window).scroll(function () {
      var scrolled = $(document).scrollTop();
      if (scrolled > headerHeight) {
        $(nav).addClass("static");
        $(control).addClass("static");
      } else {
        $(nav).removeClass("static");
        $(control).removeClass("static");
      }
      if (scrolled > scroll) {
        $(nav).removeClass("fixed");
        $(control).removeClass("static");
      } else {
        $(nav).addClass("fixed");
        $(control).addClass("static");
      }
      if (scrolled > 100) {
        $(nav).addClass("opaque");
      } else {
        $(nav).removeClass("opaque");
      }

      scroll = $(document).scrollTop();
    });
  };
})(jQuery);

// Build Mobile Nav
(function ($) {
  $.fn.sidenav = function (options) {
    var settings = $.extend(
      {
        source: ".navc",
      },
      options
    );
    var button = $(this);
    $(button).click(function () {
      return false;
    });
    var newmenu =
      "<div class='overlay overlay-full'><div id='sidemenu'>" +
      $(settings.source).html() +
      "</div></div>";
    $(newmenu).appendTo($("body"));
    $("#sidemenu > ul").removeClass().addClass("sidemenu");
    $("#sidemenu ul ul").parent().prepend("<span>&nbsp;</span>");
    $("#sidemenu span").click(function () {
      $(this).parent().toggleClass("sel").find("ul").slideToggle();
      return false;
    });
  };
})(jQuery);

(function ($) {
  // Create and Operate Mobile Menu
  $(".n0").scrollHideMenu();
  $("#navbtn").sidenav({
    source: ".navc",
  });

  $("a.video.external").vidPop();
})(jQuery);
