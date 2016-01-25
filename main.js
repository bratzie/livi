'use strict';

var header = $('#header');

// Cache selectors for scrollspy
var lastId,
  topMenu = $("#header"),
  topMenuHeight = topMenu.outerHeight() - 20,
  windowHeight = $(window).height(),
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Options for Materialize ScrollFire
var options = [
  {selector: '#challenge', offset: 150, callback: 'fadeInContent("#challenge")' },
  {selector: '#solution', offset: 150, callback: 'fadeInContent("#solution")' },
  {selector: '#offer', offset: 150, callback: 'fadeInContent("#offer")' },
  {selector: '#joinus', offset: 150, callback: 'fadeInContent("#joinus")' },
];

Materialize.scrollFire(options);

function windowContrast() {
  if ($(window).scrollTop() > 75) {
    header.addClass('contrast');
    header.addClass('z-depth-2');
  } else {
    header.removeClass('contrast');
    header.removeClass('z-depth-2');
  }
}

function fadeWelcome() {
  var fade = $('.welcome .fade-on-scroll');
  if ($(window).scrollTop() < windowHeight) {
    fade.css('opacity', 1 - $(window).scrollTop() / 500);
  }
}

$(document).ready(function () {
  $('.parallax').parallax();
  
  $('.listing div').click(function () {
   $(this).find('.listing-info').slideToggle();
  });
  
  windowContrast();
});

function fadeInContent(content) {
  $(content).animate({
        paddingTop: '1rem',
        opacity: '1'
    }, 1500);
};

// Menu contrast change
$(window).scroll(function () {
  windowContrast(this);
  fadeWelcome(this);
});

$(window).resize(function () {
  windowHeight = $(window).height();
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 500);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight + (windowHeight/2.5);

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) { return this; }
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
      menuItems
      .parent().removeClass("active")
      .end().filter("[href=\\#" + id + "]").parent().addClass("active");
  }
});