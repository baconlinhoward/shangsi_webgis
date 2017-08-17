
setInterval(makeplot, 5000);
var c = 0; //計數器
function makeplot() {
 	Plotly.d3.csv("https://www.sinotech.org.tw/lane174/abri/sensor/sid_78.csv", 
 		function(data){ processData(data) } );

};
	
function processData(allRows) {

	console.log(allRows);
	var tricky_x = [], tricky_y = [];
	var a = ++c; //計數器
	if (a > 1) { //刪除前一個畫布
    	Plotly.deleteTraces('plotly_svg', 0);
	}

	for (var i=0; i<a; i++) {  //每次更新的資料
		row = allRows[i];
		tricky_x.push( row['rec_time'] );
		tricky_y.push( row['w4'] );
	}

	console.log( 'X',tricky_x, 'Y',tricky_y);

	makePlotly( tricky_x, tricky_y);
}

function makePlotly( x, y){
	var plotDiv = document.getElementById("plot");

	var time = x;
	var soil_water = y;

	var d3 = Plotly.d3;

	var WIDTH_IN_PERCENT_OF_PARENT = 110,
	    HEIGHT_IN_PERCENT_OF_PARENT = 80;

	var gd3 = d3.select('body')
	    .select('#plotly_svg')
	    .style({
	        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
	        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

	        height: HEIGHT_IN_PERCENT_OF_PARENT + '%',
	        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 15 + 'vh'
	    });

	var gd = gd3.node();

	window.onresize = function() {
	    Plotly.Plots.resize(gd);
	};

	Plotly.plot(gd, [{
	    type: 'line',
	    x: time,
	    y: soil_water,
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
	if (end_value > 56) {
    	document.getElementById('light').src="./pic/red_light.png";
    	// alert("邊坡監測值達到紅色警戒！");
	} else if (end_value > 55 && end_value < 56) {
		document.getElementById('light').src="./pic/yellow_light.png";
	} else {
		document.getElementById('light').src="./pic/green_light.png";
	}
};

makeplot();