//ACCORDION
function handleWindowResize() {
  window.onresize = function () {
    setNavOffset();
  };
}

function closeOthersLevel1(label) {
  var labels = $(".acnav__label");
  for (var i = 0; i < labels.length; i++) {
    if ($(labels[i]) != label && !$(label).hasClass("acnav__label--level2")) {
      var parent = $(labels[i]).parent(".has-children");
      var list = $(labels[i]).siblings(".acnav__list");
      if (parent.hasClass("is-open")) {
        list.slideUp("fast");
        parent.removeClass("is-open");
      }
    }
  }
}

function openLevel2(label) {
  var parent, list;
  parent = label.parent().parent(".has-children");
  list = label.parent().siblings(".acnav__list");

  if (!parent.hasClass("is-open")) {
    list.slideDown("fast");
    parent.addClass("is-open");
  }
}

function closeOthersLevel2(label) {
  label = label[0];
  var labels = $(".acnav__label--level2");
  for (var i = 0; i < labels.length; i++) {
    if ($(labels)[i] != label) {
      var parent = $(labels[i]).parent().parent(".has-children");
      var list = $(labels[i]).parent().siblings(".acnav__list");
      if (parent.hasClass("is-open")) {
        list.slideUp("fast");
        parent.removeClass("is-open");
      }
    }
  }
}

function closeAllLevel2() {
  var labels = $(".acnav__label--level2");
  for (var i = 0; i < labels.length; i++) {
    var parent = $(labels[i]).parent().parent(".has-children");
    var list = $(labels[i]).parent().siblings(".acnav__list");
    if (parent.hasClass("is-open")) {
      list.slideUp("fast");
      parent.removeClass("is-open");
    }
  }
}

function accordionToTop() {
  var label = $("#openAccordion div");
  var parent = label.parent(".has-children");
  var list = label.siblings(".acnav__list");

  if (!parent.hasClass("is-open")) {
    if (!label.hasClass("acnav__label--level2")) {
      closeOthersLevel1(label);
      list.slideDown("fast");
      parent.addClass("is-open");
      $("ul li a").removeClass("active");
      $("#accordion-ourRole").addClass("active");
    }
  }
}

function removeAccordionActive() {
  $(".section-link").removeClass("active");
  $(".subsection-link").removeClass("active");
}

function toggleNav() {
  var tn = $("#toggleNav");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      tn.addClass("show");
    } else {
      tn.removeClass("show");
    }
  });

  tn.on("click", function (event) {
    if (!tn.hasClass("closed")) {
      $(".accordion")
        .removeClass("col-xl-3 col-lg-4 col-md-5 col-sm-12")
        .addClass("d-none");
      tn.addClass("closed");
      $("#toggleNav i").removeClass("fa-angle-left").addClass("fa-angle-right");
    } else {
      $(".accordion")
        .removeClass("d-none")
        .addClass("col-xl-3 col-lg-4 col-md-5 col-sm-12");
      tn.removeClass("closed");
      $("#toggleNav i").removeClass("fa-angle-right").addClass("fa-angle-left");
    }
  });
}

function accordion() {
  $(".acnav__label").click(function () {
    var label = $(this);
    var parent, list;
    if (label.parent().hasClass("drop")) {
      parent = label.parent().parent(".has-children");
      list = label.parent().siblings(".acnav__list");
    } else {
      parent = label.parent(".has-children");
      list = label.siblings(".acnav__list");
    }
    if (!parent.hasClass("is-open")) {
      if (label.hasClass("acnav__label--level2")) {
        closeOthersLevel2(label);
      } else {
        closeAllLevel2();
        closeOthersLevel1(label);
      }
      list.slideDown("fast");
      parent.addClass("is-open");
    }
  });

  $(".section-link").on("click", async function () {
    await removeAccordionActive();
    if (!$(this).hasClass("drop")) {
      $(this).addClass("active");
    }
  });

  $(".subsection-link").on("click", async function () {
    await removeAccordionActive();
    $(this).addClass("active");
  });

  $(".acnav__link").on("click", function () {
    if ($(this).hasClass("acnav__link--level3")) {
    } else {
      closeAllLevel2();
    }
  });

  if (!$("#openAccordion").hasClass("is-open")) {
    $("#openAccordion div a").trigger("click");
  }

  if (window.innerWidth < 768) {
    $("#accordionCollapse").collapse("hide");
  }

  $(window).resize(function () {
    if (window.innerWidth > 768 && !$("#accordionCollapse").is(":visible")) {
      $("#accordionCollapse").collapse("show");
    }
  });

  $(".acnav__link").on("click", function () {
    if (window.innerWidth < 768) {
      $("#accordionCollapse").collapse("hide");
    }
  });

  toggleNav();
}

function accordionScrollSpy() {
  $(window).scroll(function (event) {
    var currentSection,
      currentID,
      currentClass,
      accordionEl,
      level1Label,
      level1ID;
    $("[id^=section],[id^=subsection]").each(function (_, section) {
      if (
        $(section)[0].getBoundingClientRect().top < navOffset &&
        $(section)[0].getBoundingClientRect().top >
          0 - $(section).outerHeight(true)
      ) {
        currentSection = $(section);
      }
    });
    if (currentSection) {
      currentID = $(currentSection).attr("id");
      if (currentID == "section_2-2") {
        $("#goodAnimation")[0].play();
        $("#badAnimation")[0].play();
      } else {
        $("#goodAnimation")[0].currentTime = 0;
        $("#goodAnimation")[0].pause();
        $("#badAnimation")[0].currentTime = 0;
        $("#badAnimation")[0].pause();
      }
      currentClass = currentSection.attr("class");
      if (currentClass && currentClass == "row") {
        level1ID = currentSection
          .parent()
          .parent()
          .attr("class")
          .replace("article-", "");
      } else {
        level1ID = currentClass.replace("article-", "");
      }
      level1Label = $("#" + level1ID).children(".acnav__label");
      level1Label.trigger("click");

      accordionEl = $('a[href="#' + currentID + '"]');
      if (accordionEl.hasClass("acnav__link--level2")) {
        closeAllLevel2();
      } else if (accordionEl.hasClass("drop")) {
        var label = accordionEl.children(".acnav__label");
        closeOthersLevel2(label);
        openLevel2(label);
      }
      removeAccordionActive();
      accordionEl.addClass("active");
    }
  });
}

//LearnMore
function learnMore() {
  $("#learnMore").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: $("#text").offset().top - navOffset + 1,
      },
      1200
    );
  });
}

//NAV OFFSET
var navOffset;
function setNavOffset() {
  navOffset = $("#mainNav").innerHeight();
  if ($(window).width() <= 768) {
    $(".accordion").css("top", "auto");
  } else {
    $(".accordion").css("top", navOffset + "px");
  }
}

function handleWindowResize() {
  window.onresize = function () {
    setNavOffset();
  };
}

$(document).ready(function () {
  //ACCORDION
  setNavOffset();

  accordion();

  accordionScrollSpy();

  //LEARN MORE
  learnMore();

  //LAZYLOAD
  lazyload($(".lazy-load"));

  window.onresize = handleWindowResize;
});
