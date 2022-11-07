$("[data-modal=consultation]").on("click", function () {
  $(".overlay, #consultation").fadeIn("slow");
});
$(".modal_close").on("click", function () {
  $(".overlay, #consultation, #thanks").fadeOut("slow");
});

$(window).on("click", function (e) {
  if (e.target.classList.contains("overlay")) {
    $(".overlay, #consultation, #thanks").fadeOut("slow");
  }
});

function validateForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      phone: "required",
      email: {
        required: true,
        email: true,
      },
      checkbox: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа!"),
      },
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен адрес почты",
      },
      checkbox: "",
    },
  });
}

validateForms("#consultation form");

// Masked
$("input[name=phone]").mask("+7 (999) 999-99-99");

//Ajax

$("form").submit(function (e) {
  e.preventDefault();
  if (!$(this).valid()) {
    return;
  }
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");
    $("#consultation").fadeOut();
    $(".overlay, #thanks").fadeIn("slow");

    $("form").trigger("reset");
  });
  return false;
});

// // Smooth scroll and pageup

$(window).scroll(function () {
  if ($(this).scrollTop() > 1200) {
    $(".pageup").fadeIn();
  } else {
    $(".pageup").fadeOut();
  }
});

$("a[href=#up]").click(function () {
  const _href = $(this).attr("href");
  $("html, body").animate({ scrollTop: $(_href).offset().top + "px" }, 1000);
  return false;
});

$(function () {
  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" }, 1500);
    return false;
  });
});

new WOW().init();

let scrolled;
window.onscroll = function () {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
  let nav = document.querySelector(".header");
  let logo = document.querySelector(".logo__link");
  let logoDescr = document.querySelector(".logo-descr");
  let contact = document.querySelector(".header__contacts-mail");
  let link = document.querySelectorAll(".menu__list-link");
  if (scrolled) {
    nav.style.cssText = `
        background-color: #ffffff;
        padding-bottom: 5px;
        padding-top: 10px;
        transition: 0.5s;
        box-shadow: 0px 0px 5px 0px;    
        `;
    logoDescr.style.display = "none";
    logo.style.width = 125 + "px";
    contact.style.display = "none";
    link.forEach((i) => {
      i.style.paddingBottom = 20.5 + "px";
      i.style.paddingTop = 30 + "px";
    });
  } else {
    nav.style.cssText = `
        transition: 0.3s;
        `;
    logoDescr.style.display = "block";
    logo.style.width = "";
    contact.style.display = "block";
    link.forEach((i) => {
      i.style.paddingBottom = "";
      i.style.paddingTop = "";
    });
  }
  // $(window).on('load resize', function() {
  //     if ($(window).width() < 1200) {
};

// timer
let deadline = "2022-12-20";
const timer = (id, deadline) => {
  const addZero = (num) => {
    if (num <= 9) {
      return "0" + num;
    } else {
      return num; //
    }
  };

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    }
  };

  setClock(id, deadline);
};

timer(".timer__container", deadline);

// slider

$(document).ready(function () {
  $(".reviews__slider").slick({
    fade: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/arrow_right.png"></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });
});

function menuToggle() {
  $(".mobile div").toggleClass("active");
  $(".mobile nav").toggleClass("open");
  $(".mobile nav ul").toggleClass("show");
}
$(".mobile div").on("click", () => {
  menuToggle();
});
$(".mobile__link").on("click", () => {
  setTimeout(menuToggle, 300);
});

for (let a = 1; a <= $(".mobile ul li").length; a++) {
  $(".mobile ul li:nth-child(" + a + ")").css(
    "animation-delay",
    "." + (a + 1) + "s"
  );
}
//

AOS.init({
  once: false,
});

// readmore

let readMore = document.querySelector(".readmore");
let more = document.querySelector(".more");
let i = 0;
readMore.addEventListener("click", () => {
  if (!i) {
    more.style.display = "inline";
    readMore.innerHTML = "Скрыть отзыв";
    i = 1;
  } else {
    more.style.display = "none";
    readMore.innerHTML = "Читать весь отзыв";
    i = 0;
  }
});

// // 2gis

let map;
DG.then(function () {
  map = DG.map("map", {
    center: [55.879689, 37.514008],
    zoom: 16,
    scrollWheelZoom: true,
  });

  mapicon = DG.icon({
    iconUrl: "icons/marker_map.png",
    iconAnchor: [32, 64],
    popupAnchor: [0, 24],
    iconSize: [52, 64],
    className: "map-icon",
  });
  DG.marker([55.879689, 37.514008], { icon: mapicon })
    .addTo(map)
    .bindPopup(
      '<div class="map-popup"><h2>Safort</h2><br/>Москва<p>Проспект гагарина 158B</p><br/></b></div>'
    );
});

// // Tabs

let tabsBtn = document.querySelectorAll(".calculation__tab");
// let tabsItems = document.querySelectorAll('.course_inner');

tabsBtn.forEach(function (item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    // let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains("calculation__tab-active")) {
      tabsBtn.forEach(function (item) {
        item.classList.remove("calculation__tab-active");
      });

      currentBtn.classList.add("calculation__tab-active");
    }
  });
});

// up-arrow

$("body").append('<div class="upbtn"></div>');
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".upbtn").css({
      bottom: "-120px",
      right: "-120px",
    });
  } else {
    $(".upbtn").css({
      bottom: "",
      right: "",
    });
  }
});
$(".upbtn").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    500
  );
  return false;
});

$(window).on("load", function () {
  $(".loader-wrapper").fadeOut().end().delay(1000).fadeOut("slow");
});
