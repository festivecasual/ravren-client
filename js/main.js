var KEYCODE_ESCAPE = 27;
var KEYCODE_BACKSPACE = 8;
var KEYCODE_ENTER = 13;

$().ready(function(){
  var command = $('#command');
  command.hide();
  var line = $('#line');

  $(document).keypress(function(event){
    if (command.is(':hidden')) {
      command.show();
    }
    if (!line.is(':focus')) {
      line.val(line.val() + String.fromCharCode(event.which));
    }
  });

  $(document).keydown(function(event){
    
    if (event.keyCode == KEYCODE_ESCAPE) {
      line.val('');
      command.hide();
      return;
    } else if (event.keyCode == KEYCODE_BACKSPACE && !line.is(':focus')) {
        line.val(line.val().slice(0, -1));
        event.preventDefault();
    } else if (event.keyCode == KEYCODE_ENTER) {
      command.fadeOut(400, function(){
        line.val('');
      });
    }
  });

  $(document).keyup(function(){
    if (line.val() == '') {
      command.hide();
    }
  });
});
