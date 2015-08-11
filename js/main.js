var KEYCODE_ESCAPE = 27;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_ENTER = 13;
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

// entityMap and escapeHtml are from https://github.com/janl/mustache.js
// Copyright (c) 2009 Chris Wanstrath (Ruby)
// Copyright (c) 2010-2014 Jan Lehnardt (JavaScript)
// Copyright (c) 2010-2015 The mustache.js community
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escapeHtml(s) {
  return String(s).replace(/[&<>"'\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

$().ready(function(){
  var line = $('#line');
  var tip = $('#line_tip');
  line.hide();

  var info = $('#info');

  $('#buttons li:first').css('background-color', '#bbc').css('color', '#fff');

  $('#buttons li[data-friend=combat]').fadeTo(0, 0.1);

  function cycleVerbs(verbs, target) {
    tip.hide();
    line.show();
    for (var i = 0; i < verbs.length; i++) {
      if (line.val() == verbs[i] + ' ' + target) {
        line.val(verbs[++i % verbs.length] + ' ' + target);
        line.select();
        return;
      }
    }
    line.val(verbs[0] + ' ' + target);
    line.select();
  }

  $('.room-exit').click(function(event){
    tip.hide();
    line.show();
    line.val('go ' + $(this).data('short'));
    var enter = $.Event('keydown');
    enter.which = enter.keyCode = KEYCODE_ENTER;
    $(document).trigger(enter);
  });

  $('.room-door').click(function(event){
    cycleVerbs(['open', 'unlock', 'look'], $(this).data('short'));
  });

  $('.room-item').click(function(event){
    cycleVerbs(['look', 'get', 'open'], $(this).data('short'));
  });

  $('.room-denizen, .room-player').click(function(event){
    cycleVerbs(['look', 'attack'], $(this).data('short'));
  });

  $(document).keypress(function(event){
    if (line.is(':hidden')) {
      tip.hide();
      line.show();
      $('#live').scrollTop(0);
    }
    if (!line.is(':focus')) {
      line.val(line.val() + String.fromCharCode(event.which));
      line[0].scrollLeft = line[0].scrollWidth;
    }
  });

  tip.click(function(event){
    tip.hide();
    line.show();
    line.focus();
  });

  $(document).keydown(function(event){
    if (event.which == KEYCODE_ESCAPE) {
      line.val('');
      line.hide();
      tip.fadeIn();
    } else if (event.which == KEYCODE_ENTER) {
      var cmd = line.val();
      if (cmd) {
        $('#stream').prepend($('<p></p>').height(0).animate({
          height: '2em'
        }, 200, 'swing', function(){
          $(this).html(escapeHtml(cmd)).height('auto').css('min-height', '2em');
        }));
        line.val('').hide();
        tip.show();
      }
    } else if (!line.is(':focus')) {
      if (event.which == KEYCODE_BACKSPACE) {
        line.val(line.val().slice(0, -1));
        event.preventDefault();
      } else if (event.which == KEYCODE_LEFT) {
        // LEFT ONE TAB
      } else if (event.which == KEYCODE_RIGHT) {
        // RIGHT ONE TAB
      } else if (event.which == KEYCODE_UP) {
        info.animate({
          scrollTop: Math.max(0, info.scrollTop() - 150)
        }, 100);
        event.preventDefault();
      } else if (event.which == KEYCODE_DOWN) {
        info.animate({
          scrollTop: Math.min(info.scrollTop() + 150, info[0].scrollHeight - info[0].clientHeight)
        }, 100);
        event.preventDefault();
      }
    }
  });

  $(document).keyup(function(){
    if (line.val() == '') {
      line.hide();
      tip.fadeIn();
    }
  });
});
