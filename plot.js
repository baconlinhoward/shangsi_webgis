// Some info about viewport percentages:
// http://stackoverflow.com/questions/1575141/make-div-100-height-of-browser-window

function makeplot() {
var d3 = Plotly.d3;

var WIDTH_IN_PERCENT_OF_PARENT = 110,
    HEIGHT_IN_PERCENT_OF_PARENT = 80;

var gd3 = d3.select('body')
    .select('#plotly_svg')
    .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 15 + 'vh'
    });

var gd = gd3.node();

Plotly.plot(gd, [{
    type: 'line',
    x: [1, 2, 3, 4],
    y: [5, 10, 2, 8],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
}], {
    title: 'Auto-Resize',
    font: {
        size: 16
    }
});

window.onresize = function() {
    Plotly.Plots.resize(gd);
};
};

makeplot();