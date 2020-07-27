function toggle(){
    if( document.body.offsetWidth > 1500 ){
        return false
    }

    a = document.getElementById('head')
    backup = a.className
    a.className = "elem"
    small = a.offsetHeight
    a.className = "elem responsive"
    high = a.offsetHeight
    a.className = backup
    
    return { small: small, high: high }
};

function animate({timing, draw, duration, pre, data, post}){
    let start = performance.now()

    if( typeof(draw) !== "function" && typeof(timing) !== "function" ){
        return false
    }
    
    if( typeof(pre) === "function" ){
        pre(data)
    }
    
    window.requestAnimationFrame( function anim(time){
        let timeFranction = ( time - start) / duration
        if( timeFranction > 1 ) timeFranction = 1

        let progress = timing( timeFranction )

        draw( progress, data )

        if( timeFranction < 1) {requestAnimationFrame( anim )}
        else {
            if( typeof(post) === "function" ){
                post(data)
            }
        }
    })
}

function d( progress, data ){
    h = document.getElementById('head')
    h.style.height = data.height + data.animTo*progress + 'px';
}

function easyInOut( fraction, data ){
    if (fraction <= 0.5) {
        return tt(2*fraction)/2;
      } else {
        return (2 - tt(2*(1-fraction)))/2;
      }
}

function tt(fraction, data){
    return Math.pow(fraction, 2)
}

function pref(data){
    h = document.getElementById('head')
    i = document.getElementById('ico')
    f = document.getElementById('fake-ico')
    
    if( h.className === "elem" ){
        h.style.height = '0px'
        h.className += " responsive"
        console.log( h.className)
    } 
    else{
        h.style.height = data.height + 'px'
    }

    i.style.display = 'none'
    f.style.display = 'block'
}

function postf(data){
    h = document.getElementById('head')
    i = document.getElementById('ico')
    f = document.getElementById('fake-ico')

    if( h.className === "elem responsive" && data.clr == true ){
        h.className = "elem"
    }

    h.style.height = ""
    i.style.display = ""
    f.style.display = ""
    console.log(h.className)
}

function scrollf(progress, data){
    scrollTo( 0, data.height*progress )
}

function scrollfBy(progress, data){
    scrollBy( 0, data.height*progress)
}

document.getElementById('ico').onclick = function(){
    h = document.getElementById('head')
    sc = toggle()
    if( h.className === "elem" ){
        data = {
            height: 0,
            animTo: sc.high,
            clr: false,
        }
        
    } 
    else{
        data = {
            height: sc.high,
            animTo: -sc.high,
            clr: true,
        }
    }
    animate({timing:easyInOut, draw:d, duration: 500, pre: pref, data: data, post: postf })
}

standard = document.getElementById('contact').offsetTop

document.getElementById('an-about').addEventListener( "click", function(){
    target = document.getElementById('about')
    dur = 2000*target.offsetTop/standard
    animate({timing:easyInOut, draw:scrollf,duration: dur, data:{
        height: target.offsetTop,
    }})
} );
document.getElementById('an-serves').addEventListener( "click", function(){
    target = document.getElementById('services')
    dur = 1000*target.offsetTop/standard
    animate({timing:easyInOut, draw:scrollf,duration:dur, data:{
        height: target.offsetTop,
    }})
} );
document.getElementById('an-portfolio').addEventListener( "click", function(){
    target = document.getElementById('part')
    dur = 1000*target.offsetTop/standard
    animate({timing:easyInOut, draw:scrollf,duration:dur, data:{
        height: target.offsetTop,
    }})
} );
document.getElementById('an-tests').addEventListener( "click", function(){
    target = document.getElementById('cliecnt')
    dur = 1000*target.offsetTop/standard
    animate({timing:easyInOut, draw:scrollf,duration:dur, data:{
        height: target.offsetTop,
    }})
} );
document.getElementById('an-contact').addEventListener( "click", function(){
    target = document.getElementById('contact')
    dur = 1000*target.offsetTop/standard
    animate({timing:easyInOut, draw:scrollf,duration:dur, data:{
        height: target.offsetTop,
    }})
} );

document.getElementById('totop').addEventListener( "click", function(){
    target = document.getElementById('head')
    way = target.offsetTop - window.pageYOffset
    dur = 2000*-way/document.body.offsetHeight
    console.log(dur)
    animate({timing:easyInOut, draw: scrollfBy, duration: dur, data:{
        height: way
    }})
});

document.addEventListener( "scroll", function(){
    t = document.getElementById('totop')
    if( window.pageYOffset <= 200 ){
        t.style.opacity = "0"
        t.style.transform = "rotate(180deg)"
    }
    else{
        t.style.opacity = '1'
        t.style.transform = "rotate(0deg)"
    }
})