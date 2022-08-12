let calTable = {
    chicken: {
        proteins: 0.182,
        fats: 0.182,
        carbohydrates: 0,
        calories: 238,
    },
    buckwheet: {
        proteins: 0.126,
        fats: 0.033,
        carbohydrates: 0.571,
        calories: 308,
    },
    eggs: {
        proteins: 0.127,
        fats: 0.115,
        carbohydrates: 0.007,
        calories: 157,
    },
    tomatoes: {
        proteins: 0.009,
        fats: 0.002,
        carbohydrates: 0.027,
        calories: 18,
    },
    cucumbers: {
        proteins: 0.008,
        fats: 0.001,
        carbohydrates: 0.025,
        calories: 14,
    },
    nuts: {
        proteins: 0.162,
        fats: 0.608,
        carbohydrates: 0.111,
        calories: 656,
    },
    rice: {
        proteins: 0.069,
        fats: 0.01,
        carbohydrates: 0.722,
        calories: 325,
    },
    fish: {
        proteins: 0.2,
        fats: 0.081,
        carbohydrates: 0,
        calories: 153,
    },
};

let maximum = 1500;
let press = false;
let target = undefined;
let startPos = undefined;
let startWidth = undefined;
let baseBlockHeight = undefined;
let currentCalories = {
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
};
let standarts = {
    proteins: 0.3,
    fats: 0.35,
    carbohydrates: 0.35,
};
let colors = {
    proteins: '#68dfff',
    fats: '#ff8652',
    carbohydrates: '#5affa0',
}

$(document).ready(function(e) {
    baseBlockHeight = $('.block').height();
    $('#scrollers').height($('.area').length * ($('.area').height() + parseFloat($('.area').css('marginTop'))))

    redrawScrollbars()
    redrawPillars()

    $(document).resize(function(e) {
        redrawScrollbars()
    });

    $('.center').mousedown(function(e) {
        e.preventDefault();

        press = true;
        target = $(e.target);
        startPos = e.pageX;
        startWidth = target.parent().children('.leftBar').width()
    });

    $(document).mousemove(function(e) {
        if (press) {
            let delta = e.pageX - startPos;
            let newWidth = 0
            let scrollbar = target.parent()
            let scrollWidth = getScrollWidth(scrollbar) - target.width()

            if (startWidth+delta < 0) {
                newWidth = 0;
                scrollbar.data('value', 0);
            } else if (startWidth+delta > scrollWidth) {
                newWidth = scrollWidth
                scrollbar.data('value', scrollbar.data('maxValue'));
            } else {
                newWidth = startWidth+delta;
                scrollbar.data('value', scrollbar.data('maxValue')*newWidth/scrollWidth)
            }

            setScrollValue(scrollbar, scrollWidth);
            printValue(scrollbar);
            sumCalories();
            setCalories();
        }
    });

    $(document).mouseup(function(e) {
        press = false;
    });
});

function redrawScrollbars() {
    let scrollbars = $('.scrollbar');
    let maxPicWidth = 0;
    let maxValWidth = 0;

    for (let s of scrollbars) {
        $(s).data('value', 0)
        $(s).data('maxValue', 100*maximum/calTable[$(s).parent().attr('data-Type')].calories)

        let val = $(s).parent().children('.val');
        val.text(Math.round($(s).data('maxValue')) + 'g');
        val.width(val.width());

        if (val.width() > maxValWidth) maxValWidth = val.width();

        val.text('0g');

        let pic = $(s).parent().children('.pic').children('img');

        if (pic.width() > maxPicWidth) maxPicWidth = pic.width()
    }

    if (maxPicWidth != 0 && maxValWidth != 0) {
        $('.pic').width(maxPicWidth);
        $('.val').width(maxValWidth);
    }

    for (let s of scrollbars) {
        let width = getScrollWidth(s);

        $(s).width(width)

        if ($(s).data('value') == undefined) {
            $(s).children('.leftBar').width(0)
            $(s).children('.rightBar').width(width - $(s).children('.center').width())
        } else {
            setScrollValue(s, width);
        }
    }
}

function getScrollWidth(elem) {
    let p = $(elem).parent();

    return (p.width() - p.children('.val').width() - p.children('.pic').width())*0.9
}

function setScrollValue(s, width) {
    let val = $(s).data('value')
    let mval = $(s).data('maxValue')
    let leftWidth = val*width/mval;
    let rightWidth = width - leftWidth;

    $(s).children('.leftBar').width(leftWidth);
    $(s).children('.rightBar').width(rightWidth);
}

function printValue(s) {
    let value = s.data('value');
    $(s).parent().children('.val').text(Math.round(value)+'g')
}

function redrawPillars() {
    let pillars = $('.pillar');
    let height = $('#recipe').height();

    for (let p of pillars) {
        if ($(p).data('value') == undefined) {
            $(p).data('value', 0);
            $(p).data('maxValue', maximum);
            
            let blankHeight = height - $(p).children('.num').height() - $(p).children('.title').outerHeight() - baseBlockHeight;
            $(p).children('.blank').height(blankHeight);

            let radius = parseFloat($(p).children('.title').css('borderTopLeftRadius'));
            let width = $(p).children('.title').outerWidth();
            let statWidth = width - 2*radius;

            $(p).children('.block').width(statWidth);

            $(p).children('.title').width($(p).children('.title').width())
        } else {
            let radius = parseFloat($(p).children('.title').css('borderTopLeftRadius'));
            let width = $(p).children('.title').outerWidth();
            let statWidth = width - 2*radius;

            $(p).children('.block').width(statWidth);

            setCalories()
        }
    }
}

function sumCalories() {
    currentCalories = {
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
    };

    for (let s of $('.scrollbar')) {
        let g = $(s).data('value');
        let ratio = calTable[$(s).parent().attr('data-type')];

        currentCalories.proteins += 4*g*ratio.proteins;
        currentCalories.fats += 9*g*ratio.fats;
        currentCalories.carbohydrates += 4*g*ratio.carbohydrates;
    }
}

function setCalories() {
    for (let p of $('.pillar')) {
        let type = $(p).attr('data-type');
        let value = currentCalories[type];
        let maxHeight = $('#recipe').height() - $(p).children('.num').height() - $(p).children('.title').outerHeight() - baseBlockHeight;

        if (Math.floor(value) > Math.floor(maximum*standarts[type])) {
            $(p).children('.num').css('color', '#ff3c40');
            $(p).children('.block').css('backgroundColor', '#ff3c40');

            let blockHeight = maxHeight + baseBlockHeight;

            $(p).children('.block').height(blockHeight);
            $(p).children('.blank').height(0);
        } else {
            let blockHeight = Math.floor(maxHeight*value/(maximum*standarts[type])) + baseBlockHeight;

            $(p).children('.block').height(blockHeight);
            $(p).children('.blank').height(maxHeight-blockHeight + baseBlockHeight);

            $(p).children('.num').css('color', '');
            $(p).children('.block').css('backgroundColor', colors[type]);
        }

        $(p).children('.num').text(Math.round(value));
    }

    $('.sum').text(Math.round(currentCalories.proteins + currentCalories.fats + currentCalories.carbohydrates));
}