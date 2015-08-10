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
  $('#buttons li:first').css('background-color', '#bbc').css('color', '#fff');

  var line = $('#line');
  var tip = $('#line_tip');
  line.hide();

  var infoport = $('#infoport');
  var stream = $('#stream');

  $(document).keypress(function(event){
    if (line.is(':hidden')) {
      tip.hide();
      line.show();
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
        stream.prepend($('<p></p>').height(0).animate({
          height: '2em'
        }, 200, 'swing', function(){
          $(this).html(escapeHtml(cmd));
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
        infoport.animate({
          scrollTop: Math.max(0, infoport.scrollTop() - 60)
        }, 100);
      } else if (event.which == KEYCODE_DOWN) {
        infoport.animate({
          scrollTop: Math.min(infoport.scrollTop() + 60, infoport[0].scrollHeight - infoport[0].clientHeight)
        }, 100);
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
