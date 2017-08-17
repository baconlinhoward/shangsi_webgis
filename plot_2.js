
setInterval(makeplot, 5000);
var c = 0; //計數器
function makeplot() {
 	Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv", 
 		function(data){ processData(data) } );

};
	
function processData(allRows) {

	console.log(allRows);
	var x = [], y = [], standard_deviation = [];
	var tricky_x = [], tricky_y = [], tricky_deviation = [];
	var a = ++c; //計數器
	if (a > 1) { //刪除前一個畫布
    	Plotly.deleteTraces('plotly_svg', 0);
	}

	for (var i=0; i<allRows.length; i++) { //完整的資料
		row = allRows[i];
		x.push( row['AAPL_x'] );
		y.push( row['AAPL_y'] );
	}
	console.log( 'X',x, 'Y',y, 'SD',standard_deviation );

	for (var i=0; i<a; i++) {  //每次更新的資料
		row = allRows[i];
		tricky_x.push( row['AAPL_x'] );
		tricky_y.push( row['AAPL_y'] );
	}

	console.log( 'X',tricky_x, 'Y',tricky_y, 'SD',tricky_deviation );

	makePlotly( tricky_x, tricky_y, tricky_deviation );
}

function makePlotly( x, y, standard_deviation ){
	var plotDiv = document.getElementById("plot");

	var time = x;
	var price = y;

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

	window.onresize = function() {
	    Plotly.Plots.resize(gd);
	};

	Plotly.plot(gd, [{
	    type: 'line',
	    x: time,
	    y: price,
	    marker: {
	        color: '#C8A2C8',
	        line: {
	            width: 2.5
	        }
	    }
	}], {
	    title: 'Depth 30cm',
	    showlegend:false,
	    font: {
	        size: 16
	    }
	});
	var end_value = y.pop()
	if (end_value < 76) {
    	document.getElementById('light').src="./pic/red_light.png";
	}
};

makeplot();