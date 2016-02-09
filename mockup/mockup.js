var state = "calls", selector, gps = false, accellerating = false, activeCall = false, speedDial, speedValue, selectInProgress = false;

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
  // add a zero in front of numbers<10
  m = checkTime(m);
  $('#time').html(h + ":" + m);
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
  $('#navigation').css('top', '100%');
  $('#music').css('top', '100%');
  
  /* Adjust selector position */
  selector.css('bottom', '165px');
}

function activateNavigation() {
  /* Set state */
  state = "navigation";
  $('#menu li.active').removeClass('active');
  $('#menu-navigation').addClass('active');
  
  /* Move states */
  $('#navigation').css('top', '0px');
  $('#music').css('top', '100%');
  
  /* Adjust selector position */
  selector.css('bottom', '110px');
}

function activateMusic() {
  /* Set state */
  state = "music";
  $('#menu li.active').removeClass('active');
  $('#menu-music').addClass('active');
  
  /* Move states */
  $('#navigation').css('top', '0px');
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
  el = $('#gps-notification')
  if (gps) {
    el.css('top', '-' + el.outerHeight());
    $('#views').removeClass('padded');
    gps = false;
  } else {
    el.css('top', '25px');
    $('#views').addClass('padded');
    gps = true;
  }
}

/* Music */
function selectNextPlaylist() {
  if (!selectInProgress) {
    selectInProgress = true;
    var el = $('#playlist-container');
    el.find('.active-track').removeClass('active-track');
    el.find('.active-playlist').removeClass('active-playlist').next('.playlist').addClass('active-playlist').children('ul').children(':first-child').addClass('active-track');
    el.animateToLast();
    t = setTimeout(function() {
      selectInProgress = false;
    }, 250);
  }
}

function selectPreviousPlaylist() {
  
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

/* Interaction */

/* Swipe */ 

function handleSwipeLeft() {
  console.log('Swiped LEFT');
}

function handleSwipeUp() {
  console.log('Swiped UP');
  menuUp();
}

function handleSwipeRight() {
  console.log('Swiped RIGHT');
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

function handleSwipeDown() {
  console.log('Swiped DOWN');
  menuDown();
}

/* Press */

function handlePressLeft() {
  console.log('Pressed LEFT');
  switch(state) {
    case "calls":
      selectPreviousContact();
      break;
      
    case "navigation":
      break;
    
    case "music":
      break;
      
    default: return;
  }
}

function handlePressUp() {
  console.log('Pressed UP');
  accellerate();
}

function handlePressRight() {
  console.log('Pressed RIGHT');
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

function handlePressDown() {
  console.log('Pressed DOWN');
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
  console.log('Released LEFT');
}

function handleReleaseUp() {
  console.log('Released UP');
  accellerating = false;
}

function handleReleaseRight() {
  console.log('Released RIGHT');
}

function handleReleaseDown() {
  console.log('Released DOWN');
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
  if (speed > 120) {
    newSpeed = speed;
  } else if (speed > 20) {
    newSpeed = Math.floor(speed*=1.08)
  } else {
    newSpeed = speed + 2;
  }
  adjustSpeedDial(newSpeed);
}

function decellerate() {
  speed = parseInt(speedValue.html());
  if (accellerating) {
    // do nothing
  } else {
    if (speed > 10) {
      speed = Math.floor(speed*=0.94)
    } else if (speed > 0) {
      speed -= 1;
    }
    adjustSpeedDial(speed);
  }
  t = setTimeout(function () {
    decellerate()
  }, 100);
}

function adjustSpeedDial(value) {
  speedValue.html(value);
  var newBoxShadow = "0 5px 20px 5px rgba(0, 0, 0, .1), inset 0 0 0 " + (150 - speed*1.5) + "px rgba(33, 39, 44, 1)";
  speedDial.css('box-shadow', newBoxShadow)
}


$(document).ready(function() {
  selector = $('#selector');
  speedDial = $('#speed-dial');
  speedValue = $('#speed');
  startTime();
  activateMusic();
  decellerate();
})