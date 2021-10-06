function init_mobile_navbar() {
  let animDur = 200;
  let animFunc = 'easeOutCirc';

  $('.mobile-button').click(function(event) {
    let indent = $(window).scrollTop();
    let lineElem = $('.mobile-button .line-decore');
    let lineHeight = parseFloat(lineElem.css('height'));
    let lineMargin = parseFloat(lineElem.css('margin-bottom'));

    $('.mobile-nav-bar').data('visiable', true);
    
    $('.mobile-nav-bar').css('display', 'flex');
    $('.mobile-exit-button').css({
      top: lineElem.position().top - (lineHeight*2 + lineMargin)*1.2/2,
      left: lineElem.position().left,
    });
    $('.exit-line').each((i, e) => {
      let pos = $(lineElem[i]).position();
      $(e).css({
        top: pos.top - indent,
        left: pos.left,
        opacity: 1
      });
      lineElem.css('opacity', 0);

      if (i == 0) {
        $(e).animate({
          top: pos.top + lineHeight/2 + lineMargin/2,
        }, animDur, animFunc);
        $(e).css({
          transform: 'rotate(45deg)',
        });
      } else {
        $(e).animate({
          top: pos.top - lineHeight/2 - lineMargin/2,
        }, animDur, animFunc);
        $(e).css({
          transform: 'rotate(-45deg)',
        });
      }
    });

    $('.mobile-anchor').each((i, e) => {
      $(e).delay(i*100).promise().then(() => $(e).css({
        top: 0, 
        opacity: 1,
      }));
    });
  });

  $('.mobile-exit-button').click(function() {
    let indent = $(window).scrollTop();

    $('.exit-line').css('transform', 'rotate(0deg)');
    $('.exit-line').each((i, e) => {
      if (i == 0) {
        $(e).animate({
          top: $('.line-decore').first().position().top - indent,
        }, animDur, animFunc, () => $('.line-decore').first().css('opacity', 1));
      } else {
        $(e).animate({
          top: $('.line-decore').last().position().top - indent,
        }, animDur, animFunc, () => $('.line-decore').last().css('opacity', 1));
      }
    });
    $('.mobile-nav-bar').animate({
      opacity: 0
    }, animDur*4, animFunc, () => {
      $('.mobile-nav-bar').removeAttr('style');
      $('.exit-line').removeAttr('style');
      $('.mobile-anchor').removeAttr('style');
      $('.mobile-exit-button').removeAttr('style');
      $('.mobile-nav-bar').data('visiable', false);
    })
  })
}

function reposition_exit_button() {
  if (!$('.mobile-nav-bar').data('visiable')) {return;}

  let indent = $(window).scrollTop();
  let lineElem = $('.mobile-button .line-decore');
  let lineHeight = parseFloat(lineElem.css('height'));
  let lineMargin = parseFloat(lineElem.css('margin-bottom'));

  $('.mobile-exit-button').css({
    top: lineElem.position().top - (lineHeight*2 + lineMargin)*1.2/2,
    left: lineElem.position().left,
  });
  $('.exit-line').each((i, e) => {
    let pos = $(lineElem[i]).position();
    $(e).css({
      top: pos.top - indent,
      left: pos.left,
      opacity: 1
    });

    if (i == 0) {
      $(e).css({
        top: pos.top + lineHeight/2 + lineMargin/2,
      });
    } else {
      $(e).css({
        top: pos.top - lineHeight/2 - lineMargin/2,
      });
    }
  });
}