///////// Common functionality
require("./common.js");

import anime from "animejs";
import "particles.js"

const statOne = $("#particles-sections .stats .stat-one h3");
const myObject1 = {
  prop1: "0",
};

const statTwo = $("#particles-sections .stats .stat-two h3.number");
const myObject2 = {
  prop2: "0",
};

const statThree = $("#particles-sections .stats .stat-three h3.number");
const myObject3 = {
  prop3: "0",
};

$(window).on("load", function () {
  setTimeout(function () {
    scroll();
    $(".preloader").fadeOut(1500, function () {
      $("body").removeClass("loading");

      const tl = anime.timeline({
        direction: "normal",
        autoplay: true,
        loop: false,
      });
      tl.add({
        targets: "#hero-partners",
        backgroundSize: ["130%", "cover"],
        opacity: [0, 1],
        delay: 500,
        duration: 1500,
        easing: "easeInOutQuad",
      });
      tl.add(
        {
          targets: "#hero-partners .together",
          opacity: [0, 1],
          duration: 800,
          delay: 500,
        },
        "-=1500"
      );
      tl.add({
        targets: "#particles-sections .subtitle",
        opacity: [0, 1],
        delay: 300,
      });
      tl.add(
        {
          targets: "#particles-sections .stats .stats-item",
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(150),
        },
        "-=1000"
      );
      tl.add(
        {
          targets: myObject1,
          prop1: "7.500",
          easing: "linear",
          duration: 1000,
          update: function () {
            const out = parseFloat(myObject1.prop1)
              .toFixed(3)
              .replace(".", ",");
            statOne.html(out);
          },
        },
        "-=1300"
      );
      tl.add(
        {
          targets: myObject2,
          prop2: "500",
          easing: "linear",
          update: function () {
            const out = parseFloat(myObject2.prop2).toFixed(0);
            statTwo.html(out);
          },
        },
        "-=1100"
      );
      tl.add(
        {
          targets: myObject3,
          prop3: "800",
          easing: "linear",
          update: function () {
            const out = parseFloat(myObject3.prop3).toFixed(0);
            statThree.html(out);
          },
        },
        "-=1200"
      );
    });
  }, 500);
});

// Galaxy background animation
var glowAnimationLeft;
var glowAnimationRight;

glowAnimationLeft = anime.timeline({
  direction: "normal",
  autoplay: true,
  loop: true,
});

glowAnimationLeft
  .add({
    targets: "#galaxy .active-glow.one",
    opacity: [1, 0],
    duration: 3500,
    easing: "easeOutQuad",
    delay: 3000,
    begin: function () {
      $(".active-glow.one").removeClass("animated");
      $(".active-glow.seven").addClass("animated").fadeIn(1500);
    },
  })
  .add({
    targets: "#galaxy .active-glow.two",
    opacity: [1, 0],
    duration: 1500,
    easing: "easeOutQuad",
    delay: 4000,
    begin: function () {
      $(".active-glow.two").removeClass("animated");
      $(".active-glow.one").addClass("animated").fadeIn(1500);
    },
  })
  .add({
    targets: "#galaxy .active-glow.three",
    duration: 3500,
    easing: "easeOutQuad",
    opacity: [1, 0],
    delay: 3000,
    begin: function () {
      $(".active-glow.three").removeClass("animated");
    },
  })
  .add({
    targets: "#galaxy .active-glow.four",
    opacity: [1, 0],
    duration: 1500,
    easing: "easeOutQuad",
    delay: 6000,
    begin: function () {
      $(".active-glow.four").removeClass("animated");
      $(".active-glow.two").addClass("animated").fadeIn(1500);
    },
  })
  .add(
    {
      targets: "#galaxy .active-glow.five",
      opacity: [1, 0],
      duration: 3500,
      easing: "easeOutQuad",
      delay: 3000,
      begin: function () {
        $(".active-glow.five, .active-glow.seven").removeClass("animated");
        $(".active-glow.three, .active-glow.six")
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "500"
  )
  .add(
    {
      targets: "#galaxy .active-glow.six",
      opacity: [1, 0],
      duration: 1500,
      easing: "easeOutQuad",
      delay: 4000,
      begin: function () {
        $(".active-glow.four, active-glow.six")
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "5000"
  )
  .add(
    {
      targets: "#galaxy .active-glow.seven",
      opacity: [1, 0],
      duration: 6500,
      easing: "easeOutQuad",
      delay: 2000,
      begin: function () {
        $(".active-glow.four, .active-glow.seven")
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "2000"
  )
  .add(
    {
      targets: "#galaxy .active-glow.one",
      opacity: [1, 0],
      duration: 1500,
      easing: "easeOutQuad",
      delay: 1000,
      begin: function () {
        $(
          ".active-glow.one, .active-glow.five, .active-glow.seven, .active-glow.seven, .active-glow.three, .active-glow.four"
        )
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "900"
  );

// Right animation
glowAnimationRight = anime.timeline({
  direction: "normal",
  autoplay: true,
  loop: true,
});
glowAnimationRight
  .add({
    targets: "#galaxy .active-glow.eight",
    opacity: [1, 0],
    duration: 1500,
    easing: "easeOutQuad",
    delay: 1000,
    begin: function () {
      $(".active-glow.eight").removeClass("animated");
    },
  })
  .add(
    {
      targets: "#galaxy .active-glow.nine",
      opacity: [1, 0],
      duration: 6500,
      easing: "easeOutQuad",
      delay: 4000,
      begin: function () {
        $(".active-glow.nine").removeClass("animated");
        $(".active-glow.eight").addClass("animated").fadeIn(1500);
      },
    },
    "-=800"
  )
  .add(
    {
      targets: "#galaxy .active-glow.ten",
      opacity: [1, 0],
      duration: 4500,
      easing: "easeOutQuad",
      delay: 2000,
      begin: function () {
        $(".active-glow.eight").removeClass("animated");
        $(".active-glow.ten, .active-glow.fourteen")
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "-=500"
  )
  .add(
    {
      targets: "#galaxy .active-glow.eleven",
      opacity: [1, 0],
      duration: 2500,
      easing: "easeOutQuad",
      delay: 2000,
      begin: function () {
        $(".active-glow.eleven, .active-glow.nine")
          .addClass("animated")
          .fadeIn(1500);
      },
    },
    "2500"
  )
  .add(
    {
      targets: "#galaxy .active-glow.twelve",
      opacity: [1, 0],
      duration: 3500,
      easing: "easeOutQuad",
      delay: 3500,
      begin: function () {
        $(".active-glow.twelve, .active-glow.ten").removeClass("animated");
        $(".active-glow.eight").addClass("animated").fadeIn(1500);
      },
    },
    "-=500"
  )
  .add(
    {
      targets: "#galaxy .active-glow.thirteen",
      opacity: [1, 0],
      duration: 1500,
      easing: "easeOutQuad",
      delay: 1000,
      begin: function () {
        $(".active-glow.twelve").addClass("animated").fadeIn(1500);
      },
    },
    "1500"
  )
  .add(
    {
      targets: "#galaxy .active-glow.fourteen",
      opacity: [1, 0],
      duration: 5500,
      easing: "easeOutQuad",
      delay: 1500,
      begin: function () {
        $(".active-glow.fourteen").removeClass("animated");
      },
    },
    "1500"
  );

function scroll() {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 150) {
      $("#logo-fixed").addClass("sticky");
    } else {
      $("#logo-fixed").removeClass("sticky");
    }
  });
}

// Particles JS
particlesJS("particles-js-partners", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 1000 } },
    color: { value: "#0df" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 3 },
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: { enable: false, speed: 3, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 1.3,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.7,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
})

$("#modalAlliance").on("show.bs.modal", function (e) {
  if ($("#particles-js-modal canvas").length === 0) {
    setTimeout(() => particlesJsModal(), 500);
  }
});

// Particles JS
function particlesJsModal() {
  particlesJS("particles-js-modal", {
    particles: {
      number: { value: 500, density: { enable: true, value_area: 800 } },
      color: { value: "#0df" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 3 },
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: { enable: false, speed: 3, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 1.3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.7,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: false, mode: "repulse" },
        onclick: { enable: false, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}