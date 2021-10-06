$(function() {
  // preview settings
  let vsliderHeight = parseFloat($('#what_we_do .vslider').css('width'))*380/570;
  let burgerFoldHeight = $('.bur-item').length * parseFloat($('.bur-top').css('height')) + 2 * ($('.bur-item').length - 2) * parseFloat($('.bur-item').slice(1).css('margin-top'));
  let burgerDescHeight = vsliderHeight - burgerFoldHeight;
  let testDiv = $('#what_we_do .test');
  let sliderContentWidth;

  function initTestElem() {
    $(testDiv).css({
      width: $('.burger .ss-content').width(),
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: 300,
      padding: parseFloat($('.bur-wrapper').css('margin-top')) + 1
    });
  }
  initTestElem();

  function initVSclider() {
    $('#what_we_do .vslider').css({
      height: vsliderHeight,
    });
  }
  initVSclider();


  $('.soc-link>object').on('load', function(event) {
    event.currentTarget.contentDocument.querySelector('svg').style.fill = '#95e1d3'
  });


  SimpleScrollbar.initAll();

  function initScilers() {
    $('.slider').each(function(index, elem) {
      let width = $(elem).children('.slider-content').css('width');
      sliderContentWidth = width;
      $(elem).find('.slide').each((i, e) => $(e).css('width', width));
    });
  }
  initScilers();

  function initGalleryShare() {
    $('.sn-item').each((i, e) => $(e).css('height', $(e).css('width')));
  }
  initGalleryShare();

  $('.sn-item').mouseenter(function(event) {
    event.currentTarget.querySelector('object').contentDocument.querySelector('svg').style.fill = '#fff';
  });

  $('.sn-item').mouseleave(function(event) {
    event.currentTarget.querySelector('object').contentDocument.querySelector('svg').style.fill = '#f38181';
  });

  $('.soc-link').mouseenter(function(event) {
    event.currentTarget.querySelector('object').contentDocument.querySelector('svg').style.fill = '#f38181';
  });

  $('.soc-link').mouseleave(function(event) {
    event.currentTarget.querySelector('object').contentDocument.querySelector('svg').style.fill = '#95e1d3';
  });

  //Map size init
  function initMapSize() {
    $('#map').css('height', parseFloat($('#map').css('width'))*6/16)
  }
  initMapSize();

  //inits
  slider_init();

  // init Mobile Navbar
  init_mobile_navbar();

  // init Navigation
  init_navigation();

  // init Scroll Actions
  init_scrollActions({
    vsliderH: vsliderHeight,
  });

  // init Background
  init_background();

  // basic event handlers
  window.addEventListener('resize', function(event) {
    vsliderHeight = parseFloat($('#what_we_do .vslider').css('width'))*380/570;
    burgerFoldHeight = $('.bur-item').length * ( parseFloat($('.bur-top').css('height')) + parseFloat($('.bur-item').css('margin-bottom'))) 
                            - parseFloat($('.bur-item').css('margin-bottom'));
    burgerDescHeight = vsliderHeight - burgerFoldHeight;

    initVSclider();
    initTestElem();
    initScilers();
    initGalleryShare();
    initMapSize();
    reposition_exit_button();
    positioning_slider_content();
    positioning_vslider_content();
  });

  // burger menu events
  $('.bur-top').click(function(event) {
    let target = $(event.currentTarget).parent();

    if ($(target).hasClass('bur-desc-show') == false) {
      let index = 0;
      let height;

      $(testDiv).text($(target).find('.bur-wrapper').text())

      if($(testDiv).outerHeight() < burgerDescHeight) {
        height = $(testDiv).outerHeight();
        $(target).parent().find('.ss-scroll').addClass('no-scrollbar')
      } else if ($(window).width() <= 1200 ) {
        if ($(testDiv).outerHeight() < $('.vslider').height()) {
          height = $(testDiv).outerHeight();
        } else {
          height = $('.vslider').height();
        }
        $(target).parent().find('.ss-scroll').removeClass('no-scrollbar');
      } else {
        height = burgerDescHeight
        $(target).parent().find('.ss-scroll').removeClass('no-scrollbar')
      }

      $(target).parent().children('.bur-desc-show').each((i, elem) => $(elem).removeClass('bur-desc-show').children('.bur-desc').css('height', ''));
      $(target).addClass('bur-desc-show').children('.bur-desc').css('height', height);

      $(target).parent().children('.bur-item').each((i, elem) => {
        if (elem === target[0]) index = i;
      });

      target.parent().data('current', index + 1);

      $('.vslider .vslider-content').animate({
        top: -1 * index * vsliderHeight,
      }, 600, 'easeOutQuad');

    } else {
      $(target).removeClass('bur-desc-show').children('.bur-desc').css('height', '');
    }
  });

  function positioning_vslider_content() {
    $('.burger').each((i, e) => {
      let index = $(e).data('current') == undefined ? 1 : $(e).data('current');
      let target = $(e).children('.bur-item').slice(index - 1, index);
      let height;

      $(e).parent().find('.vslider-content').animate({
        top: -1 * (index-1) * vsliderHeight,
      }, 600, 'easeOutQuad');

      $(testDiv).text($(target).find('.bur-wrapper').text());

      if($(testDiv).outerHeight() < burgerDescHeight) {
        height = $(testDiv).outerHeight();
      } else if ($(window).width() <= 1200 ) {
        if ($(testDiv).outerHeight() < $('.vslider').height()) {
          height = $(testDiv).outerHeight();
        } else {
          height = $('.vslider').height();
        }
      } else {
        height = burgerDescHeight
      }

      if (target.hasClass('bur-desc-show')) {
        $(target).children('.bur-desc').css('height', height);
      }

    });
  }

  $('#preview').trigger('pageReadyShow');
});