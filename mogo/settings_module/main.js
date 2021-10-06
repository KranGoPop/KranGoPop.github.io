$(function() {
  $('#what_we_do .slider').css({
    height: parseFloat($('#what_we_do .slider').css('width'))*380/570
  });
  SimpleScrollbar.intiAll();
})