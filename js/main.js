var KEYCODE_ESCAPE = 27;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_ENTER = 13;

$().ready(function(){
  $('#buttons li:first').css('background-color', '#bbc').css('color', '#fff');

  var line = $('#line');
  var tip = $('#line_tip');
  line.hide();

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
    
    if (event.keyCode == KEYCODE_ESCAPE) {
      line.val('');
      line.hide();
      tip.fadeIn();
      return;
    } else if (event.keyCode == KEYCODE_BACKSPACE && !line.is(':focus')) {
        line.val(line.val().slice(0, -1));
        event.preventDefault();
    } else if (event.keyCode == KEYCODE_ENTER) {
      line.fadeOut(400, function(){
        line.val('');
        tip.fadeIn();
      });
    }
  });

  $(document).keyup(function(){
    if (line.val() == '') {
      line.hide();
      tip.fadeIn();
    }
  });
});
