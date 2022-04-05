function init_scrollActions(data) {
  let itemList = [
    {
      item: $('.gallery').first(),
      innerItem: '.g-item',
      innerItemDepends: true,
      widthDepends: true,
      initFunc: moveUpInitFunc,
      actionFunc: moveUp,
      triggerPoint: 0.8,
    },
    {
      item: $('#statistics'),
      innerItem: '.number',
      triggerPoint: 0.8,
      initFunc: numericInit,
      actionFunc: numericAction,
      innerItemDepends: true,
    },
    {
      item: $('.ser-content'),
      innerItem: '.ser-item',
      triggerPoint: 0.8,
      initFunc: exponsiveInit,
      actionFunc: exponsiveAction,
      widthSensitive: true,
      innerItemDepends: true,
    },
    {
      item: $('#design'),
      innerItemList: {
        iphone: {
          item: $('#design').find('.iphone'),
          done: false,
        },
        ipad: {
          item: $('#design').find('.ipad'),
          done: false,
        }
      },
      triggerPoint: 0.3,
      initFunc: designInit,
      actionFunc: designAction
    },
    {
      item: $('.wwd_exp').first(),
      innerItemList: {
        vslider: {
          item: $('.wwd_exp .vslider').first(),
          done: false,
        },
        burger: {
          item: $('.wwd_exp .burger').first(),
          done: false,
        },
      },
      widthDepends: true,
      initFunc: burgerActionInit,
      actionFunc: burgerAction,
      triggerPoint: 0.8,
      data: {
        vsh: data.vsliderH,
      },
    },
    {
      item: $('.slider-content').first(),
      triggerPoint: 0.8,
      initFunc: sliderActionInit,
      actionFunc: sliderAction,
    },
    {
      item: $('.gallery').slice(1, 2),
      innerItem: '.g-item',
      innerItemDepends: true,
      widthDepends: true,
      initFunc: moveUpInitFunc,
      actionFunc: moveUp,
      triggerPoint: 0.8,
    },
    {
      item: $('#partners'),
      innerItem: '.partner',
      triggerPoint: 0.8,
      initFunc: exponsiveInit,
      actionFunc: exponsiveAction,
      widthSensitive: false,
      innerItemDepends: true,
    },
    {
      item: $('.portfolio').first(),
      innerItem: '.portf-item',
      innerItemDepends: true,
      widthDepends: true,
      initFunc: moveUpInitFunc,
      actionFunc: moveUp,
      triggerPoint: 0.8,
      randomOrder: true,
      minVisiable: 4,
    },
    {
      item: $('.slider-content').slice(1, 2),
      triggerPoint: 0.8,
      initFunc: sliderActionInit,
      actionFunc: sliderAction,
    },
    {
      item: $('.clients').first(),
      innerItem: '.client',
      triggerPoint: 0.8,
      initFunc: exponsiveInit,
      actionFunc: exponsiveAction,
      widthSensitive: true,
      innerItemDepends: true,
    },
    {
      item: $('.blog').first(),
      innerItem: '.record',
      innerItemDepends: true,
      widthDepends: true,
      initFunc: moveUpInitFunc,
      actionFunc: moveUp,
      triggerPoint: 0.8,
    },
    {
      item: $('#map_block'),
      coverItem: $('footer'),
      initFunc: scrollMoveInit,
      actionFunc: scrollMove,
      triggerPoint: 1,
    },
  ];

  let itemIndex = {
    i: 0,
  };

  (function initAll() {
    for (let i of itemList) {
      if (i.innerItemDepends == true) {
        let innerItems = [];

        i.item.find(i.innerItem).each((index, e) => {
          innerItems.push({
            item: $(e),
            done: false,
          });
        });

        i.innerItems = innerItems;
        i.innerIndex = 0;
      }

      if (i.initFunc != undefined) i.initFunc(i);

      i.done = false;
    }
  })();

  document.addEventListener('scroll', function(event) {
    if (itemIndex.i >= itemList.length) return;

    setTimeout(checkExecActionFunc, 0, itemList, itemIndex);
  });

  function checkExecActionFunc(list, index) {
    let target = list[index.i];

    if ((target.blockBottom == true && target.item.offset().top + target.item.outerHeight() < ($(window).scrollTop() + $(window).height()*target.triggerPoint))
        || (target.blockBottom != true && target.item.offset().top <= ($(window).scrollTop() + $(window).height()*target.triggerPoint))) {

      let state = target.actionFunc(target);

      if (state == true) {
        target.done = true;
        index.i++;
      }
    }
  }
}

function moveUpInitFunc(target) {
  let indent;

  if (target.zeroIndent == true) {
    indent = 0;
  } else if (target.customIndent != undefined) {
    indent = target.customIndent;
  } else if (target.innerItemDepends == true) {
    indent = target.innerItems[0].item.width()/2;
  }

  if (target.innerItemDepends == true) {
    for (let i of target.innerItems) {
      i.item.css({
        top: indent,
        opacity: 0,
      });
    }
  } else {
    target.item.css({
      top: indent,
      opacity: 0,
    });
  }
}

function moveUp(target) {
  let timeFunc = 'easeOutCirc';
  let duration = 1000;

  if (target.innerItemDepends == true && target.randomOrder == true) {
    let items = target.innerItems;
    let visiableItems = [];

    for (let i of items) {
      if (i.item.offset().top < $(window).scrollTop() + $(window).height() * target.triggerPoint) {
        visiableItems.push(i);
      }
    }

    if (visiableItems.length >= target.minVisiable) {
      let tenpow = (() => {
        let counter = 0;
        while(true) {
          if (Math.pow(10, counter) > visiableItems.length) return Math.pow(10, counter);
          else counter++;
        }
      })();
      let halfPart = visiableItems.length/2;
      let index = 0;

      for (let i = 0; i < Math.floor(halfPart); i++) {
        let from = Math.floor(Math.random()*tenpow%halfPart);
        let to = Math.floor(Math.random()*tenpow%halfPart);
        let tempStorage = visiableItems[to];

        visiableItems[to] = visiableItems[from];
        visiableItems[from] = tempStorage;
      }

      for (let i of visiableItems) {
        if (i.done == false) {
          i.item.delay(100*index).animate({
            top: 0,
            opacity: 1,
          }, duration, timeFunc);

          i.done = true;
          index++;
        }
      }

      for (let i of items) {
        if (i.done == false) return false;
      }

      return true;
    }
  } 
  else if (target.innerItemDepends == true) {
    if (target.item.css('flex-direction') == 'column') {
      if (target.innerItems[target.innerIndex].item.offset().top > ($(window).scrollTop()+$(window).height()*target.triggerPoint)) return false;

      part = target.innerItems[target.innerIndex];

      part.done = true;
      target.innerIndex++;

      part.item.animate({
        top: 0,
        opacity: 1
      }, duration, timeFunc);

      if (target.innerIndex >= target.innerItems.length) return true;

    } else {
      for (let i of target.innerItems) {
        i.item.delay(100*target.innerIndex).animate({
          top: 0,
          opacity: 1
        }, duration, timeFunc);

        target.innerIndex++;
        i.done = true;
      }

      return true;
    }
  }
}

function numericInit(target) {
  for (let i of target.innerItems) {
    i.value = i.item.text();
    i.item.text('0');
  }
}

function numericAction(target) {
  for (let i of target.innerItems) {
    i.done = true;

    move_to({
      duration: 500 + 500*Math.random(),
      startPos: 0,
      pos: +i.value,
      moveFunc: function({
        progress
      }) {
        i.item.text(Math.round(progress));
      }
    })
  }

  return true;
}

function exponsiveInit(target) {
  let centerPosX = target.item.width()/2 - target.innerItems[0].item.width()/2 + parseFloat(target.item.css('margin-left'));
  let centerPosY = target.item.offset().top;

  for (let i of target.innerItems) {
    i.triggerPos = i.item.offset().top;

    i.item.css({
      top: centerPosY - i.item.offset().top,
      left: centerPosX - i.item.offset().left,
      opacity: 0,
    });
  }
}

function exponsiveAction(target) {
  let duration = 1500;
  let timeFunc = 'easeOutExpo';

  if (target.widthSensitive == true && target.innerItems[0].item.width() >= target.item.width()*0.8) {
    let part = target.innerItems[target.innerIndex];

    if (part.triggerPos < ($(window).scrollTop() + $(window).height()*target.triggerPoint)) {
      part.done = true;
      target.innerIndex++;

      part.item.animate({
        left: 0,
        top: 0,
        opacity: 1,
      }, duration, timeFunc);

      if (target.innerIndex >= target.innerItems.length) {
        return true;
      }
    }
  } else {
    for (let i of target.innerItems) {
      i.done = true;

      i.item.animate({
        left: 0,
        top: 0,
        opacity: 1
      }, duration, timeFunc);

      i.innerIndex++;
    }

    return true;
  }
}

function designInit(target) {
  let items = target.innerItemList;

  for (let i in items) {
    items[i].startPos = parseFloat(items[i].item.css('bottom'));
  }

  items.ipad.item.css('bottom', -items.ipad.item.height()*0.9);
  items.iphone.item.css('bottom', -items.iphone.item.height()*1.2);
}

function designAction(target) {
  let items = target.innerItemList;
  let duration = 500;
  let timeFunc = 'easeOutCirc';
  
  items.ipad.item.animate({
    bottom: items.ipad.startPos,
  }, duration, timeFunc);

  items.iphone.item.animate({
    bottom: items.iphone.startPos,
  }, duration*1.2, timeFunc);

  return true;
}

function sliderActionInit(target) {
  let item = target.item;
  let width = parseFloat(item.css('width'));
  let margin = parseFloat(item.find('.slide').slice(1).css('margin-left'));
  
  item.find('.slides').css('left', width + margin);
}

function sliderAction(target) {
  target.item.find('.slides').animate({
    left: 0,
  }, 700, 'easeOutCirc');

  return true;
}

function burgerActionInit(target) {
  let burger = target.innerItemList.burger;
  let vslider = target.innerItemList.vslider;

  vslider.item.find('.vslider-content').css('top', target.data.vsh);

  if (target.item.css('flex-direction') == 'row') {
    burger.item.css('left', vslider.item.width() - burger.item.parent().width());
  } else {
    burger.item.css('bottom', burger.item.height() + parseFloat(burger.item.css('margin-top')));
  }
}

function burgerAction(target) {
  let burger = target.innerItemList.burger;
  let vslider = target.innerItemList.vslider;
  
  if (vslider.done == false) {
    vslider.item.find('.vslider-content').animate({
      top: 0,
    }, 700, 'easeOutQuad');

    vslider.done = true;
  }
    

  if (burger.done == false) {
    if (parseFloat(burger.item.css('left')) == 0) {
      if (burger.item.offset().top + burger.item.height() < $(window).scrollTop() + $(window).height() * target.triggerPoint) {
        burger.item.animate({
          bottom: 0,
        }, 700, 'easeOutCirc');

        burger.done = true;
      }
    } else {
      burger.item.animate({
        left: 0,
      }, 700, 'easeOutCirc');

      burger.done = true;
    }
  }

  if (burger.done && vslider.done) return true;
}

function scrollMoveInit(target) {
  target.startCoverPos = parseFloat(target.coverItem.css('top'));
  target.coverItem.css('top', -1 * target.item.outerHeight());
}

function scrollMove(target) {
  let coverHeight = target.coverItem.outerHeight();
  let coverTrigger;
  let ci = target.coverItem;
  let item = target.item;

  if (coverHeight <= $(window).height()*0.5) {
    coverTrigger = 1;
  } else {
    coverTrigger = 1 - (coverHeight - $(window).height()*0.5)/coverHeight;
  }

  let view = $(window).scrollTop() + $(window).height() * target.triggerPoint;
  let cover = ci.offset().top + coverHeight * coverTrigger;

  if (view > cover) {
    let top = -1 * parseFloat(ci.css('top')) - (view - cover);

    if (top <= 0) {
      ci.css('top', 0);
      target.done = true;
    } else {
      ci.css('top', -1 * top);
    }
  }
}