let observer = () => {
  // функция для работы destroy Swiper
  console.log("observer");
};

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

  if ($(".slider-collection").length > 0) {
    const swiper = new Swiper(".slider-collection", {
      slidesPerView: 3,
      initialSlide: 3,
      spaceBetween: 24,
      centeredSlides: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".collection-main .arrows-controls__right",
        prevEl: ".collection-main .arrows-controls__left",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.28,
          initialSlide: 3,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          initialSlide: 3,
          spaceBetween: 8,
        },
        1024: {
          slidesPerView: 3,
          initialSlide: 3,
          spaceBetween: 16,
        },
        1280: {
          slidesPerView: 3,
          initialSlide: 3,
          spaceBetween: 24,
        },
      },
    });

    setHeightBlock();

    $(window).on("resize", function () {
      setHeightBlock();
    });

    function setHeightBlock() {
      if ($(window).width() < 768) {
        let height =
          $(".slider-collection .swiper-slide-active").outerHeight() + 30;
        console.log(height);
        $(".slider-collection").css("min-height", height);
      } else {
        $(".slider-collection").css("min-height", 0);
      }
    }
  }

  if ($(".slider-design").length > 0) {
    const swiper = new Swiper(".slider-design", {
      slidesPerView: 1,
      spaceBetween: 25,
      initialSlide: 1,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".main-design-section .arrows-controls__right",
        prevEl: ".main-design-section .arrows-controls__left",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          initialSlide: 0,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 15,
          initialSlide: 1,
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 25,
          initialSlide: 1,
        },
      },
    });
  }

  if ($("[data-aos]").length > 0) {
    $("[data-aos]").each((i, el) => {
      // $(el).attr("data-aos-offset", 0);
      AOS.init({
        duration: 2000,
        once: true,
      });
    });
  }

  if ($(".catalog-section__links").length > 0) {
    $(".catalog-section .arrows-controls__left").on("click", function () {
      let index = $(".catalog-section__content.active").index() - 1;

      handle(index);
      mobileHandle($(this), index);
    });

    $(".catalog-section .arrows-controls__right").on("click", function () {
      let index = $(".catalog-section__content.active").index() + 1;

      if (index >= $(".catalog-section__content").length) {
        index = 0;
      }

      handle(index);
      mobileHandle($(this), index);
    });

    $(".catalog-section__links a").hover(function () {
      let self = $(this);
      let catalog = $(this).attr("data-catalog");

      $(".catalog-section__links a").removeClass("active");
      $(".catalog-section__content").removeClass("active");

      self.addClass("active");
      $(`#${catalog}`).addClass("active");
    });

    setHeightBlock();

    function handle(index) {
      $(".catalog-section__links a").removeClass("active");
      $(".catalog-section__content").removeClass("active");

      $(".catalog-section__content").eq(index).addClass("active");
      $(".catalog-section__links li").eq(index).find("a").addClass("active");
    }

    function mobileHandle(arrow, index) {
      if ($(window).width() < 768) {
        let container = $(".catalog-section__links");
        let block = $(".catalog-section__links li").eq(index).find("a");
        let containerOuterWidth = container.outerWidth(); // узнаем ширину контейнера (width + padding)
        let itemOuterWidth = block.outerWidth(); // узнаем ширину текущего элемента (width + padding)
        let itemOffsetLeft = block.offset().left; // узнаем значение отступа слева в контейнере у текущего элемента
        let containerScrollLeft = container.scrollLeft(); // узнаем текущее значение скролла
        let speedAnimate = 400; //скорость
        let positionCetner = containerOuterWidth / 2 - itemOuterWidth / 2 + 25; // рассчитываем позицию центра
        console.log(positionCetner);
        let scrollLeftUpd =
          containerScrollLeft + itemOffsetLeft - positionCetner; // рассчитываем положение скролла относительно разницы отступа элемента и центра контейнера

        arrow.addClass("disabled");

        setHeightBlock();

        setTimeout(function handleDisabled() {
          arrow.removeClass("disabled");
        }, speedAnimate);

        container.animate(
          {
            scrollLeft: scrollLeftUpd,
          },
          speedAnimate
        );
      }
    }

    function setHeightBlock() {
      if ($(window).width() < 768) {
        let catalog = $(".catalog-section__content.active").find(
          ".catalog-main-item"
        );
        let height =
          $(catalog[0]).outerHeight() + $(catalog[1]).outerHeight() + 16; // +16px отступ
        $(".catalog-section__catalog").height(height);
      } else {
        $(".catalog-section__catalog").attr("style", "");
      }
    }

    $(window).on("resize", function () {
      setHeightBlock();
    });
  }

  if ($(".stock-slider").length > 0) {
    if ($(window).width() >= 768) {
      initStockDesktop();
    } else {
      initStockMobile();
    }

    $(window).on("resize", function () {
      if ($(window).width() >= 768) {
        initStockDesktop();
      } else {
        initStockMobile();
      }
    });

    function initStockDesktop() {
      if ($(".stock-slider").hasClass("init-desktop")) {
        $(".stock-list").attr("style", "").removeClass("opened");
        $(".stock-controls").removeClass("hidden");
        return false;
      }

      if ($(".stock-slider").hasClass("init-mobile")) {
        $(".stock-slider").removeClass("init-mobile");
        observer(); // destroy swiper
      }

      $(".stock-slider").addClass("init-desktop");
      $(".stock-list").removeClass("opened");
      $(".stock-controls").removeClass("hidden");

      $(".stock-controls .btn").on("click", function (e) {
        e.preventDefault();

        let count = $(".stock-item").length / 2;
        let itemHeight = $(".stock-item").outerHeight();
        let parentsHeight = itemHeight * count;
        let gap = $(window).width() >= 1280 ? 40 : 20;
        parentsHeight = parentsHeight + count * gap - gap;

        $(".stock-controls").addClass("hidden");
        $(".stock-list").height(parentsHeight).addClass("opened");
      });
    }

    function initStockMobile() {
      if ($(".stock-slider").hasClass("init-mobile")) {
        return false;
      }

      if ($(".stock-slider").hasClass("init-desktop")) {
        $(".stock-slider").removeClass("init-desktop");
      }

      $(".stock-slider").addClass("init-mobile");

      const swiperStock = new Swiper(".stock-slider", {
        slidesPerView: 1,
        initialSlide: 1,
        centeredSlides: true,
        spaceBetween: 16,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".stock-section .arrows-controls__right",
          prevEl: ".stock-section .arrows-controls__left",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            initialSlide: 1,
            centeredSlides: true,
            spaceBetween: 16,
          },
        },
      });

      observer = () => {
        swiperStock.destroy(true, true);
      };
    }
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
