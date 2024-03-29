var state = "calls", selector, gps = false, accellerating = false, activeCall = false, speedDial, speedValue, sdFill, sdFix, selectInProgress = false;

var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];

var LOG_STUFF = false;

/* Functions to cycle lists */
$.fn.cycleToLast = function() {
  if($(this).children(':first-child')) {
    $(this).children(':first-child').appendTo($(this)); 
  }
  return this;
}

$.fn.animateToLast = function() {
  $(this).children(':first-child').hide(
    "fast",
    function() {
      $(this).appendTo($(this).parent()).show("fast");
    }
  );
  return this;
}

$.fn.cycleToFirst = function() {
  if($(this).children(':first-child')) {
    $(this).children(':last-child').prependTo($(this));
  }
  return this;
}

$.fn.animateToFirst = function() {
  $(this).children(':last-child').hide(
    "fast",
    function() {
      $(this).prependTo($(this).parent()).show("fast");
    }
  );
  return this;
}

/* Misc */
function log(string) {
  if (LOG_STUFF) {
    console.log(string);
  }
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var gpsh = h;
  var gpsm = m + 5;
  // add a zero in front of numbers<10
  m = checkTime(m);
  $('#time').html(h + ":" + m);
  if (gpsm >= 60) {
    gpsh++;
    gpsm -= 60;
  }
  gpsm = checkTime(gpsm)
  $('#gps-time').html(gpsh + ":" + gpsm);
  t = setTimeout(function () {
    startTime()
  }, 30000);
}

/* Menu and States */
function activateCalls() {
  /* Set state */
  state = "calls";
  $('#menu li.active').removeClass('active');
  $('#menu-calls').addClass('active');
  
  /* Move states */
  $('#calls').css('top', '0px');
  $('#navigation').css('top', '-100%');
  $('#music').css('top', '-100%');
  
  /* Adjust selector position */
  selector.css('bottom', '165px');
}

function activateNavigation() {
  /* Set state */
  state = "navigation";
  $('#menu li.active').removeClass('active');
  $('#menu-navigation').addClass('active');
  
  /* Move states */
  $('#calls').css('top', '100%');
  $('#navigation').css('top', '0px');
  $('#music').css('top', '-100%');
  
  /* Adjust selector position */
  selector.css('bottom', '110px');
}

function activateMusic() {
  /* Set state */
  state = "music";
  $('#menu li.active').removeClass('active');
  $('#menu-music').addClass('active');
  
  /* Move states */
  $('#calls').css('top', '100%');
  $('#navigation').css('top', '100%');
  $('#music').css('top', '0px');
  
  /* Adjust selector position */
  selector.css('bottom', '55px');
}

function menuUp() {
  switch(state) {
    case "calls":
      break;
      
    case "navigation":
      activateCalls();
      break;
      
    case "music":
      activateNavigation();
      break;
      
    default: return;
  }
}

function menuDown() {
  switch(state) {
    case "calls":
      activateNavigation();
      break;
      
    case "navigation":
      activateMusic();
      break;
      
    case "music":
      break;
      
    default: return;
  }
}

/* Calls */
function selectNextContact() {
  if (!selectInProgress) {
    selectInProgress = true;
    $('#contacts > div').animateToLast().find('.active').removeClass('active').next('.contact').addClass('active');
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

function selectPreviousContact() {
  if (!selectInProgress) {
    selectInProgress = true;
    $('#contacts > div').animateToFirst().find('.active').removeClass('active').prev('.contact').addClass('active');
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

function togglePhonecall() {
  $()
  if (activeCall) {
    
  }
}

/* Navigation */
function toggleGPS() {
  var top = $('#gps-notification');
  var bottom = $('#gps-bottom');
  if (gps) {
    bottom.css('bottom', '-' + bottom.outerHeight());
    top.css('top', '-' + top.outerHeight());
    gps = false;
  } else {
    bottom.css('bottom', '0px');
    top.css('top', '25px');
    gps = true;
  }
}

function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 40.7162412, lng: -73.940614},
    zoom: 12,
    disableDefaultUI: true
  });
  map.set('styles', [
    {"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"weight":"0.20"},{"lightness":"28"},{"saturation":"23"},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#494949"},{"lightness":13},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}
  ])
}

/* Music */
function selectNextPlaylist() {
  if (!selectInProgress) {
    selectInProgress = true;
    var el = $('#playlist-container');
    el.find('.active-track').removeClass('active-track');
    el.find('.active-playlist').removeClass('active-playlist').next('.playlist').addClass('active-playlist').children('ul').children(':first-child').next('.track').addClass('active-track');
    el.animateToLast();
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

function selectPreviousPlaylist() {
  if (!selectInProgress) {
    selectInProgress = true;
    var el = $('#playlist-container');
    el.find('.active-track').removeClass('active-track');
    el.find('.active-playlist').removeClass('active-playlist');
    el.children(':last-child').addClass('active-playlist').children('ul').children(':first-child').next('.track').addClass('active-track');
    el.animateToFirst();
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
  
}

function selectNextTrack() {
  if (!selectInProgress) {
    selectInProgress = true;
    var el = $('.active-playlist ul');
    el.find('.active-track').removeClass('active-track').next('.track').addClass('active-track');
    el.animateToLast();
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

function selectPreviousTrack() {
  if (!selectInProgress) {
    selectInProgress = true;
    var el = $('.active-playlist ul');
    el.animateToFirst();
    el.find('.active-track').removeClass('active-track').prev('.track').addClass('active-track');
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

/* Interaction */

/* Swipe */ 

function handleSwipeLeft() {
  log('Swiped LEFT');
  switch(state) {
    case "calls":
      selectPreviousContact();
      break;
      
    case "navigation":
      break;
    
    case "music":
      selectPreviousTrack();
      break;
      
    default: return;
  }
}

function handleSwipeUp() {
  log('Swiped UP');
  menuUp();
}

function handleSwipeRight() {
  log('Swiped RIGHT');
  switch(state) {
    case "calls":
      selectNextContact();
      break;
      
    case "navigation":
      break;
    
    case "music":
      selectNextTrack();
      break;
      
    default: return;
  }
}

function handleSwipeDown() {
  log('Swiped DOWN');
  menuDown();
}

/* Press */

function handlePressLeft() {
  log('Pressed LEFT');
  switch(state) {
    case "calls":
      break;
      
    case "navigation":
      break;
    
    case "music":
      selectPreviousPlaylist();
      break;
      
    default: return;
  }
}

function handlePressUp() {
  log('Pressed UP');
  accellerate();
}

function handlePressRight() {
  log('Pressed RIGHT');
  switch(state) {
    case "calls":
      break;
      
    case "navigation":
      break;
    
    case "music":
      selectNextPlaylist();
      break;
      
    default: return;
  }
}

function handlePressDown() {
  log('Pressed DOWN');
  switch(state) {
    case "calls":
      togglePhonecall();
      break;
      
    case "navigation":
      toggleGPS();
      break;
    
    case "music":
      break;
      
    default: return;
  }
}

/* Release */

function handleReleaseLeft() {
  log('Released LEFT');
}

function handleReleaseUp() {
  log('Released UP');
  accellerating = false;
}

function handleReleaseRight() {
  log('Released RIGHT');
}

function handleReleaseDown() {
  log('Released DOWN');
}

$(document).keydown(function(e) {
  switch(e.which) {
      case 37: // swipe left
        handleSwipeLeft();
        break;

      case 38: // swipe up
        handleSwipeUp();
        break;

      case 39: // swipe right
        handleSwipeRight();
        break;

      case 40: // swipe down
        handleSwipeDown();
        break;

      case 65: // press a
        handlePressLeft();
        break;

      case 87: // press w
        handlePressUp();
        break;

      case 68: // press d
        handlePressRight();
        break;

      case 83: // press s
        handlePressDown();
        break;

    default: return;
  }
  e.preventDefault();
});

$(document).keyup(function(e) {
    switch(e.which) {
      case 65: // release a
        handleReleaseLeft();
        break;

      case 87: // release w
        handleReleaseUp();
        break;

      case 68: // release d
        handleReleaseRight();
        break;

      case 83: // release s
        handleReleaseDown();
        break;

    default: return;
  }
  e.preventDefault();
});

function accellerate() {
  speed = parseInt(speedValue.html());
  accellerating = true;
  var newSpeed;
  
  if (speed > 50) {
    newSpeed = Math.floor(speed*=1.04)
  } else if (speed > 20) {
    newSpeed = Math.floor(speed*=1.08)
  } else {
    newSpeed = speed + 2;
  }
  
  if (speed > 120) { /* Cap speed at 120 */
    newSpeed = 120;
  }
  setSpeed(newSpeed);
}

function decellerate() {
  speed = parseInt(speedValue.html());
  if (accellerating) {
    // do nothing
  } else {
    if (speed > 60) {
      speed = Math.floor(speed*=0.98)
    } else if (speed > 20) {
      speed = Math.floor(speed*=0.95)
    } else if (speed > 0) {
      speed -= 1;
    }
    setSpeed(speed);
  }
  t = setTimeout(function () {
    decellerate()
  }, 200);
}

function setSpeed(speed) {
  speedValue.html(speed);
  var rotation = Math.floor((speed/120) * 136.5);
  var fill_rotation = rotation;
  var fix_rotation = rotation * 2;
  for(i in transform_styles) {
    $('#sd-progress .circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
    $('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
  }
}

$(document).ready(function() {
  selector = $('#selector');
  speedDial = $('#speed-dial');
  speedValue = $('#speed');
  sdFill = $('#sd-progress .circle .fill, .circle .mask.full');
  sdFix = $('.circle .fill.fix');
  startTime();
  activateCalls();
  decellerate();
})