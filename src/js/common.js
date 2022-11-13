// Shared includes
//require("./libs/jquery-3.6.0.min");
import $ from "jquery";
import "./libs/bootstrap.min.js";
import WOW from "./libs/wow-1.1.3.js";

const { slidebars } = require("./libs/slidebars");

$(document).ready(function () {
  // Initialize Slidebars
  var slidebarController = new slidebars();
  slidebarController.init();
  $("#mobile-hamburger").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    slidebarController.toggle("mobile");

    // Prevent site scroll when open
    if (slidebarController.getActiveSlidebar()) {
      $("body").addClass("slidebar-open");
    } else {
      $("body").removeClass("slidebar-open");
    }
  });

  $("#sb-site").on("click", function (e) {
    // Close on tap anywhere
    if (slidebarController.getActiveSlidebar()) {
      e.stopPropagation();
      e.preventDefault();

      slidebarController.close("mobile");
      $("body").removeClass("slidebar-open");
    }
  });

  window.wow = new WOW.WOW({
    boxClass: "animate",
    animateClass: "animated",
    offset: 20,
    mobile: true,
  });
  wow.init();
});

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  $(window).width() < 575
) {
  $(".animate:not(.force-animate)").removeClass("animate"); // to remove transition
}
