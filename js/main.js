addEventListener("scroll", (event) => {
  currentScroll = $(window).scrollTop();
  // console.log("currentScroll", currentScroll);
});

addEventListener("wheel", (evt) => {
  if (evt.deltaY < 0) {
    $("header").removeClass("hidden");
  } else {
    $("header").addClass("hidden");
  }
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
    let observer = () => {
      // функция для работы destroy Swiper
      console.log("observer");
    };

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
        autoHeight: true,
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

  if ($(".slider-default").length > 0) {
    const sliders = document.querySelectorAll(".slider-default");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        let count = 1;
        let initial = 0;
        let navNext = undefined;
        let navPrev = undefined;

        if (!slider.swiper) {
          if ($(slider).hasClass("slider-default--spaces")) {
            count = 2;
            initial = $(slider).find(".slider-default__slide").length;

            navNext = $(slider)
              .parents(".slider-default-wrapper")
              .find(".arrows-controls__right")[0];
            navPrev = $(slider)
              .parents(".slider-default-wrapper")
              .find(".arrows-controls__left")[0];
          }

          mySwipers[index] = new Swiper(slider, {
            slidesPerView: count,
            spaceBetween: 24,
            initialSlide: initial,
            navigation: {
              nextEl: navNext && navNext,
              prevEl: navPrev && navPrev,
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
                initialSlide: 1,
                centeredSlides: true,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: count,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1280: {
                spaceBetween: 24,
                centeredSlides: false,
              },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".slider-picture").length > 0) {
    const sliders = document.querySelectorAll(".slider-picture");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        let navNext = $(slider).find(".swiper-button-next")[0];
        let navPrev = $(slider).find(".swiper-button-prev")[0];

        if (!slider.swiper) {
          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 14,
            initialSlide: 0,
            nested: true,
            navigation: {
              nextEl: navNext,
              prevEl: navPrev,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            on: {
              init: function (swiper) {},
              slideChange: function (swiper) {},
            },
            breakpoints: {
              // 0: {
              //   slidesPerView: 1,
              //   spaceBetween: 16,
              // },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".footer-menu__title").length > 0) {
    if ($(window).width() < 1280) {
      initMobileFooter();
    }

    $(window).on("resize", function () {
      if ($(window).width() < 1280) {
        initMobileFooter();
      } else {
        $(".footer-menu").removeClass("init");
        $(".footer-menu__title").off("click");
      }
    });

    function initMobileFooter() {
      if ($(".footer-menu").hasClass("init")) return false;

      $(".footer-menu").addClass("init");

      $(".footer-menu__title").on("click", function () {
        if (!$(this).hasClass("active")) {
          $(this)
            .addClass("active")
            .parents(".footer-menu__col")
            .find("ul")
            .stop()
            .slideDown();
        } else {
          $(this)
            .removeClass("active")
            .parents(".footer-menu__col")
            .find("ul")
            .stop()
            .slideUp();
        }
      });
    }
  }

  if ($(".catalog-links-invis").length > 0) {
    let positionBlock = $(".catalog").offset().top;

    let last_id;
    let top_menu = $(".catalog-links-invis");
    let menu_height = top_menu.outerHeight(true);
    let menu_items = top_menu.find("a");
    let menu_catalog = $(".catalog-menu").find("a");
    let scroll_items = menu_items.map(function () {
      let item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

    setActiveLink();
    fixedBlockCatalog(positionBlock);

    menu_items.click(function (e) {
      handleClick(e, $(this));
    });

    menu_catalog.click(function (e) {
      handleClick(e, $(this));
    });

    $(window).scroll(function () {
      setActiveLink();
      fixedBlockCatalog(positionBlock);
    });

    function fixedBlockCatalog() {
      let scroll = $("html").scrollTop();

      if (scroll > positionBlock) {
        $(".catalog-links-invis").addClass("sticky");
      } else {
        $(".catalog-links-invis").removeClass("sticky");
      }
    }

    function setActiveLink() {
      let from_top = $(this).scrollTop() + menu_height;
      let cur = scroll_items.map(function () {
        if ($(this).offset().top < from_top) {
          return this;
        }
      });

      cur = cur[cur.length - 1];

      let id = cur && cur.length ? cur[0].id : "";

      if (last_id !== id) {
        last_id = id;
        menu_items
          .parent()
          .removeClass("active")
          .end()
          .filter("[href='#" + id + "']")
          .parent()
          .addClass("active");
      }
    }

    function handleClick(e, self) {
      e.preventDefault();

      let href = self.attr("href"),
        offset_top =
          href === "#"
            ? 0
            : $(href).offset().top - $("header").outerHeight(true);
      $("html, body").stop().animate(
        {
          scrollTop: offset_top,
        },
        300
      );
    }
  }

  if ($(".product-more").length > 0) {
    $(".product-more__head").on("click", function () {
      if ($(this).hasClass("opened")) {
        $(this)
          .removeClass("opened")
          .next(".product-more__body")
          .stop()
          .slideUp();
      } else {
        $(this)
          .addClass("opened")
          .next(".product-more__body")
          .stop()
          .slideDown();
      }
    });
  }

  if ($(".slider-advantages").length > 0) {
    let observer = () => {
      // функция для работы destroy Swiper
      console.log("observer");
    };

    if ($(window).width() >= 768) {
      if ($(".slider-advantages").hasClass("init-mobile")) {
        observer();
      }
    } else {
      initAdvantagesMobile();
    }

    $(window).on("resize", function () {
      if ($(window).width() >= 768) {
        if ($(".slider-advantages").hasClass("init-mobile")) {
          observer();
        }
      } else {
        initAdvantagesMobile();
      }
    });

    function initAdvantagesMobile() {
      if ($(".slider-advantages").hasClass("init-mobile")) {
        return false;
      }

      $(".slider-advantages").addClass("init-mobile");

      const swiperStock = new Swiper(".slider-advantages", {
        slidesPerView: 1,
        initialSlide: 1,
        centeredSlides: true,
        // autoHeight: true,
        spaceBetween: 16,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".advantages-section .arrows-controls__right",
          prevEl: ".advantages-section .arrows-controls__left",
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
        $(".slider-advantages").removeClass("init-mobile");
        swiperStock.destroy(true, true);
      };
    }
  }

  if ($(".slider-product-images").length > 0) {
    const swiper = new Swiper(".slider-product-images", {
      slidesPerView: 3,
      spaceBetween: 24,
      autoHeight: true,
      centeredSlides: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".product-images .arrows-controls__right",
        prevEl: ".product-images .arrows-controls__left",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          initialSlide: 1,
          autoHeight: true,
          centeredSlides: true,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          autoHeight: true,
          spaceBetween: 14,
        },
        1280: {
          slidesPerView: 3,
          autoHeight: true,
          spaceBetween: 24,
        },
      },
    });

    setHeight();

    $(window).on("resize", function () {
      setHeight();
    });

    function setHeight() {
      let height = $(
        ".slider-product-images .swiper-slide-active .picture"
      ).height();

      $(".slider-product-images .swiper-wrapper").css("min-height", height);
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