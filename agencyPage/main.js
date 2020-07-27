"use strict"

let mobileCurrent = undefined,
    selected = false,
    visibleArrow = false,
    userScroll = true;

document.querySelectorAll("div[data-float]").forEach(element => element.addEventListener("click", function(event){
  let target = document.getElementById(this.id.split('_')[0]+'_target'),
      range  = undefined;

  if( this.id.endsWith("mobile") ) {
    if( selected == true &&  mobileCurrent == this ) {
      this.style.cssText = "";
      this.children[0].style.cssText = "";

      selected = false;
      mobileCurrent = undefined;
    } else if( selected == false || mobileCurrent != this ) {
      this.style.width = "7rem";
      this.style.padding = "1rem 0 1rem 0"
      this.children[0].style.marginTop = "0.2rem";
      this.children[0].style.height = "1rem";

      if( mobileCurrent != undefined && mobileCurrent != this ) {
        mobileCurrent.children[0].style.cssText = "";
        mobileCurrent.style.cssText = "";
      }

      selected = true;
      mobileCurrent = this;

      return;
    }
  }

  range = target.offsetTop-20;

  new Promise( function(resolve, reject) {
    userScroll = false;

    animation({
      timing: function(fraction) {
        if( fraction <= 0.5 ) {
          return (Math.pow(2*fraction, 3))/2;
        } else {
          return (2 - Math.pow(2*(1-fraction), 3))/2;
        }
      },
      draw: function(progress) {
        window.scrollTo(0, progress*range);
        if( Math.round(progress*100)/100 >= 0.7 ) resolve();
      },
      duration: 1000,
    })
  }).then( (res) => {userScroll = true; showArrow()} );
}));

document.getElementById("arrow").addEventListener("click", function(event) {
  let range = document.documentElement.scrollTop;

  new Promise( function( resolve, reject ) {
    userScroll = false;

    animation({
      timing: function(fraction) {
        if( fraction <= 0.5 ) {
          return (Math.pow(2*fraction, 3))/2;
        } else {
          return (2 - Math.pow(2*(1-fraction), 3))/2;
        }
      },
      draw: function(progress) {
        window.scrollTo(0, (1 - progress)*range);
        if( Math.round(progress*100)/100 >= 0.7 ) resolve();
      },
      duration: 1000,
    });
  }).then( (res) => {
    new Promise(function(resolve, reject){
      setInterval(()=>resolve(), 400);
    }).then(() => userScroll = true)
    hideArrow();
  })
})

window.addEventListener("scroll", function(event){
  if( !userScroll ) return true;

  if( document.documentElement.scrollTop == 0 ) {
    if( visibleArrow == false ) return true;
    else if( visibleArrow == true ) {hideArrow();}
  } else {
    if( visibleArrow == false ) {showArrow();}
    else if(visibleArrow == true ) return true;
  }
});

document.getElementById("arrow").addEventListener("animationend", function(event){
  if( event.animationName == "show-arrow" ) {
    event.target.style.cssText = "";
    event.target.style.opacity = "1";
  } else if( event.animationName == "hied-arrow" ) {
    event.target.style.cssText = "";
    event.target.style.opacity = "0"
  }
})

function animation({timing, draw, duration}) {
  let start = performance.now();

  requestAnimationFrame( function animate(time){
    let timeFraction = (time - start) / duration;
    if( timeFraction > 1 ) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if( timeFraction < 1 ) requestAnimationFrame(animate);
  });
}

function showArrow() {
  if( visibleArrow == true ) return;

  let arrow = document.getElementById("arrow");
  visibleArrow = true;
  arrow.style.animation = "show-arrow 0.2s";
  arrow.style.animationFillMode = "forwards";
}

function hideArrow() {
  if( visibleArrow == false ) return;

  let arrow = document.getElementById("arrow");
  visibleArrow = false;
  arrow.style.animation = "hide-arrow 0.2s";
  arrow.style.animationFillMode = "forwards";
}