$('#preview').ready(function(event) {
  let chars = $('#preview').find('.char');
  let center = $(window).width()/2 - chars.width()/2;
  let timeFunc = 'easeInQuad';

  

  $('header').css('bottom', -1 * $(window).height());

  $('#preview').on('pageReadyShow', function(event) {
    chars.each(function(i, e) {
      $(e).css('left', center - $(e).offset().left);
  
      if (i == 0) {
        $(e).css('opacity', 1);
        $(e).animate({
          left: 0,
        }, 1100, timeFunc);
      } else {
        $(e).css('opacity', 0);
        $(e).delay((i-1)*100).animate({
          left: 0,
          opacity: 1,
        }, 700, timeFunc);
      }
    });
    // $('#preview').css('background', '#ffffff00');

    // $('#preview .block').each((i, e) => {
    //   let height = $(e).height();
    //   if (i == 0) {
    //     $(e).delay(1000).animate({
    //       top: -1 * height,
    //     }, 1000, timeFunc);
    //   } else {
    //     $(e).delay(1000).animate({
    //       bottom: -1 * height,
    //     }, 1000, timeFunc);
    //   }
    // });

    $('header').delay(1500).animate({
      bottom: 0,
    }, 500, timeFunc);

    $('#preview').delay(1500).animate({
      top: -1 * $(window).height(),
    }, 500, timeFunc, $('#preview').css('display', 'none'));

    $(window).scrollTop(0);
  });
});