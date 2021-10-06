function init_navigation() {
  let positions = [
    $('#about_us'),
    $('#services'),
    $('#our_work'),
    $('#blog'),
    $('#map_block'),
  ];

  $('.mobile-anchor, .anchor').click(function(event) {
    let target = $(event.currentTarget);
    let index;

    target.parent().children().each((i, e) => {
      if (e == target[0]) index = i;
    });

    if (target.hasClass('mobile-anchor')) {
      $('.mobile-exit-button').trigger('click');
    }

    move_viewport_to(positions[index].position().top);
  });

  $('.more').click(function(event) {
    move_viewport_to(positions[0].position().top);
  });
}

function move_viewport_to(pos) {
  move_to({
    duration: (function(){
      let viewportHeight = $(window).height();
      let xAsympt = viewportHeight*1.2;
      let yAsympt = viewportHeight*5;
      let speed;
      let distance = pos - $(window).scrollTop();

      if (Math.abs(distance) <= xAsympt) {
        speed = viewportHeight*0.9;
      } else {
        speed = (2*viewportHeight - yAsympt)*(2*viewportHeight - xAsympt) 
                    / (Math.abs(distance) - xAsympt) + yAsympt;
      }

      return Math.abs(distance)/speed * 1000;
    })(),
    startPos: $(window).scrollTop(),
    pos: pos+10,
    moveFunc: function({
      progress,
      startPos,
    }) {$(window).scrollTop(startPos + progress);}
  })
}

function move_to({
  duration,
  startPos,
  pos, 
  moveFunc
}) {
  let start = performance.now();
  let distance = pos - startPos;
  let peak = (3/2) * distance / duration;

  let rafId = requestAnimationFrame(function animationFunc(curTime) {
    let timeFranction = (curTime - start);

    let progress = (2*peak*timeFranction)/(3*Math.pow(duration, 2)) 
                    * (3*duration * timeFranction - 2 * Math.pow(timeFranction, 2));

    moveFunc({
      progress: progress,
      startPos: startPos,
      dur: duration,
      tf: timeFranction,
    });

    if (timeFranction <= duration) requestAnimationFrame(animationFunc);
  })
}