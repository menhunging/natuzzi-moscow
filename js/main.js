addEventListener("scroll", (event) => {
  currentScroll = $(window).scrollTop();
  // console.log("currentScroll", currentScroll);
});

$(document).ready(function () {
  if ($(".burger").length > 0) {
    let menu = $(".header .menu");
    let burger = $(".burger");
    let burgerСlose = $(".menu .btn-close");

    burger.on("click", function () {
      if (menu.hasClass("opened")) {
        closeMenu();
      } else {
        burger.addClass("opened");
        menu.addClass("opened");

        $(document).mouseup(function (e) {
          if (
            !menu.is(e.target) &&
            menu.has(e.target).length === 0 &&
            !burger.is(e.target)
          ) {
            closeMenu();
          }
        });
      }
    });

    burgerСlose.on("click", function () {
      closeMenu();
    });

    function closeMenu() {
      burger.removeClass("opened");
      menu.removeClass("opened");
      $(document).off("mouseup");
    }
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      $(this).inputmask({
        mask: "+7(999) 999-99-99",
        placeholder: "*",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
      });
    });
  }

  if ($(".video").length > 0) {
    $(".video__btn--play").on("click", function () {
      let elem = $(this).parents(".video").toggleClass("play").find("video");

      $(this).toggleClass("paused");
      $(this).hasClass("paused") ? elem.trigger("play") : elem.trigger("pause");
    });
  }

  if ($(".tabs").length > 0) {
    $(".tabs").tabslet({
      mouseevent: "click",
      attribute: "href",
      animation: true,
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",
      disableScroll: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => {
        e.preventDefault();
        $("body").addClass("modal-open");
      });
    });

    $("[data-micromodal-close]").map(function () {
      $(this).click((e) => {
        //        e.preventDefault();
        if ($(this).attr("data-modal")) {
          setTimeout(() => {
            $("body").addClass("modal-open");
          }, 0.1);
        }
      });
    });
  }

  if ($("[data-fancybox]").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
      helpers: {
        media: {},
      },
    });
  }

  if ($(".slider-reviews").length > 0) {
    const swiper = new Swiper(".slider-reviews", {
      slidesPerView: 1,
      spaceBetween: 10,
      initialSlide: $(".slider-reviews .swiper-slide").length - 1,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          initialSlide: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  }

  if ($("[data-aos]").length) {
    $("[data-aos]").each((i, el) => {
      // $(el).attr("data-aos-offset", 0);
      AOS.init({
        duration: 2000,
        once: true,
      });
    });
  }
});

$(window).on("resize", function () {});

$(window).on("load", function () {
  if ($(".map").length > 0) {
    setTimeout(() => ymapsLoad(), 500);
    setTimeout(() => ymaps.ready(init), 1000);
  }

  function ymapsLoad() {
    var script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=0cec76e1-1847-46ed-a96a-c84c0917f2ad&lang=ru_RU";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.744756354739636, 37.57666889814756],
      zoom: 13,
      controls: [],
    });

    myMap.controls.remove("searchControl");

    var myPlacemark = new ymaps.Placemark(
      [55.744756354739636, 37.57666889814756],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/img/svg/location.svg",
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
});
