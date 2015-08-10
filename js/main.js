var KEYCODE_ESCAPE = 27;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_ENTER = 13;
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

$().ready(function(){
  $('#buttons li:first').css('background-color', '#bbc').css('color', '#fff');

  var line = $('#line');
  var tip = $('#line_tip');
  line.hide();

  var infoport = $('#infoport');

  $(document).keypress(function(event){
    if (line.is(':hidden')) {
      line.show();
      tip.hide();
    }
    if (!line.is(':focus')) {
      line.val(line.val() + String.fromCharCode(event.which));
    }
  });

  $(document).keydown(function(event){
    if (event.which == KEYCODE_ESCAPE) {
      line.val('');
      line.hide();
      tip.fadeIn();
      return;
    } else if (event.which == KEYCODE_ENTER) {
      line.fadeOut(400, function(){
        line.val('');
        tip.fadeIn();
      });
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
