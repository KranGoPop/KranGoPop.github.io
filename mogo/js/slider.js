function slider_init() {
  $('.back-arrow, .forward-arrow').click(function(event) {
    let target = $(event.currentTarget).parent();

    if ($(event.currentTarget).hasClass('back-arrow')) {
      moveSlide(target, 'back', 0, 1000);
    } else if ($(event.currentTarget).hasClass('forward-arrow')) {
      moveSlide(target, 'forward', 0, 1000);
    }
  });

  function moveSlide(target, direction, speed, duration) {
    let width = parseFloat(target.children('.slider-content').css('width'));
    let margin = parseFloat(target.find('.slide').slice(1).css('margin-left'));
    let current;
    let maxSlides = target.find('.slide').length;
    let nextSlide;
    let distance;
    let dur;
    let timeFunc = 'easeOutCubic';

    if (!target.data('current')) {
      target.data('current', 1);
      current = 1;
    } else {
      current = target.data('current');
    }

    if (direction == 'back') {
      if (current == 1) {
        nextSlide = maxSlides;
      } else {
        nextSlide = current - 1
      }
    } else if (direction == 'forward') {
      if (current == maxSlides) {
        nextSlide = 1;
      } else {
        nextSlide = current + 1;
      }
    }

    distance = Math.abs((width + margin)*(nextSlide - 1) - parseFloat(target.find('.slides').css('left')));

    if (speed = 0 || speed < $(window).width()*0.2) {
      dur = duration;
    } else {
      dur = distance/speed;
    }

    target.data('current', nextSlide);
    target.find('.slides').animate({
      left: -1 * (nextSlide - 1) * (margin + width),
    }, dur, timeFunc);
  }

  $('.slider-content').on('touchstart', function(event) {
    let originalEvent = event.originalEvent;
    let target = $(event.currentTarget).parent();
    let current = !target.data('current') ? 1 : target.data('current');
    let margin = parseFloat(target.find('.slide').slice(1).css('margin-left'));
    let width = parseFloat($(event.currentTarget).css('width'));

    target.data('touch', originalEvent.touches[0].clientX);
    target.data('startPos', -(current - 1)*width - (current - 1)*margin);
    target.data('pointNew', {x: originalEvent.touches[0].clientX,
                           t: performance.now()});

    event.preventDefault();
  });

  $('.slider-content').on('touchmove', function(event) {
    let originalEvent = event.originalEvent;
    let target = $(event.currentTarget).parent();
    let diff = originalEvent.touches[0].clientX - target.data('touch');

    target.find('.slides').css('left', target.data('startPos') + diff);
    target.data('pointOld', target.data('pointNew'));
    target.data('pointNew', {x: originalEvent.touches[0].clientX,
                             t: performance.now()});
  });

  $('.slider-content').on('touchend', function(event) {
    let originalEvent = event.originalEvent;
    let target = $(event.currentTarget).parent();
    let current = !target.data('current') ? 1 : target.data('current');
    let width = parseFloat(target.children('.slider-content').css('width'));
    let margin = parseFloat(target.find('.slide').slice(1).css('margin-left'));
    let diff = originalEvent.changedTouches[0].clientX - target.data('touch');
    let pnew = target.data('pointNew');
    let pold = target.data('pointOld');

    let speed = Math.abs((pnew.x - pold.x)/(pnew.t - pold.t));

    if (Math.abs(diff) >= width*0.2) {
      if (diff < 0) {
        moveSlide(target, 'forward', speed, 500);
      } else if (diff > 0) {
        moveSlide(target, 'back', speed, 500);
      }
    } else {
      target.find('.slides').animate({
        left: -1 * (current - 1) * (margin + width),
      }, 500, 'easeOutCubic');
    }
  });

  $('.back-arrow, .forward-arrow').mouseenter(function(event) {
    $(event.currentTarget).find('object')[0].contentDocument.querySelector('svg').style.fill = '#000';
  });
  $('.back-arrow, .forward-arrow').mouseleave(function(event) {
    $(event.currentTarget).find('object')[0].contentDocument.querySelector('svg').style.fill = '#ccc';
  });
}

function positioning_slider_content() {
  $('.slider').each((i, e) => {
    
    let content = $(e).find('.slider-content');
    let current = $(e).data('current') == undefined ? 1 : $(e).data('current') - 1;
    let width = parseFloat(content.css('width'));
    let margin = parseFloat(content.find('.slide').slice(1).css('margin-left'));

    content.children('.slides').animate({'left': -current*(width+margin)}, 700, 'easeOutCubic');
  });
}