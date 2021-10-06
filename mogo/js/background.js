function init_background() {
  let backs = [
    {
      zone: $('#design'),
      y: $('#design').offset().top - $(window).height(),
    },
    {
      zone: $('#happy_clients'),
      y: $('#happy_clients').offset().top - $(window).height(),
    },
    {
      zone: $('#map_block'),
      y: $('#map_block').offset().top - $(window).height(),
    }
  ];

  let getIndex = function(top) {
    if (top < backs[1].y) return 0;
    else if (top >= backs[backs.length - 1].y) return backs.length - 1;
    else if (top >= backs[1].y && top < backs[2].y) return 1;
  };
  
  let index = getIndex($(window).scrollTop());
  $(document).trigger('scroll');
  
  window.addEventListener('resize', function(event) {
    for (let i of backs) {
      i.y = i.zone.offset().top - $(window).height();
    }

    let height = $('.fixed-item').height();

    $('.fixed-cover').css('top', -1 * height * getIndex($(window).scrollTop()));
  });

  document.addEventListener('scroll', function(event) {
    let top = $(window).scrollTop();
    let height = $('.fixed-item').height();

    index = getIndex(top);

    if ($('.fixed-cover').data('current') != index) {
      $('.fixed-cover').css('top', -1 * height * index);
      $('.fixed-cover').data('current', index);
    }
  });
}