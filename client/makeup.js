var drawContext;
var drawing=false;
var newLine=true;
var startX; var startY;
var newX; var newY;
var storedLines=[];
var stopDrawing=false;

Template.makeup.rendered = function (){ 
	console.log("canvas rendered");

	drawContext = canvas.getContext("2d");
	drawContext.fillStyle="#cccccc";
	drawContext.fillRect(0,0,canvas.width,canvas.height);

	if (storedLines.length==0){ // first time rendering
		drawFirstTriangle();
	} else {
		redrawStoredLines();
	}
};

Template.makeup.events({
	"click #erase": function(event){
		console.log("erased polygon");

		redrawCanvas();
		storedLines=[];
		stopDrawing=false;
		drawing=false;
	},
	"click #draw": function(event){
		console.log("starting new polygon");

		// reset
		storedLines=[];
		stopDrawing=false;
		newLine=true;
		startX=undefined; startY=undefined;
		newX=undefined; newY=undefined;
		firstX=undefined; firstY=undefined;
		console.log("drawing");
		drawPoly();
	}
});

function drawFirstTriangle(){
	drawContext.beginPath();
	drawContext.moveTo(160,400);
	drawContext.lineTo(80,150);
	drawContext.lineTo(250,230);
	drawContext.lineTo(160,400);
	drawContext.strokeStyle="green";
	drawContext.stroke();
	drawContext.closePath();
}

function redrawCanvas(){
	drawContext.clearRect(0,0,canvas.width,canvas.height);
	drawContext.fillStyle="#cccccc";
	drawContext.fillRect(0,0,canvas.width,canvas.height);
}

function drawPoly(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("mousemove", 
		function(e){
			if(drawing){
			redrawStoredLines();

				if(stopDrawing){
					drawing=false;
					return;
				}

				// draw yellow line
				drawContext.beginPath();
				drawContext.moveTo(startX,startY);
				newX = e.pageX - canvas.offsetLeft;
				newY = e.pageY - canvas.offsetTop;
		    	drawContext.lineTo(newX,newY);
		    	drawContext.strokeStyle="yellow";
		    	drawContext.stroke();
		    	drawContext.closePath();
		    }
		}
	);

	canvas.addEventListener("mousedown",
		function(e){
			if(newLine){
				drawing=true;
				startX = e.pageX - canvas.offsetLeft;
		    	startY = e.pageY - canvas.offsetTop;
		    	newLine=false;
		    } else {
		    	drawing=false;
		    	storedLines.push({x1:startX, y1:startY, x2:newX, y2:newY});
		    	startX=newX;
		    	startY=newY;
		    }

		    // Check whether polygon is complete
		    if (storedLines.length>0){
				var firstX=storedLines[0].x1;
				var firstY=storedLines[0].y1;
				console.log(firstX,firstY);
				// if the line ends less than 10 px from the starting point
				stopDrawing=((Math.abs(firstX-startX))<=10 && (Math.abs(firstY-startY))<=10);
			}
		}
	);
	canvas.addEventListener("mouseup",
		function(e){
   			drawing=true;
		}
	);
}

 function redrawStoredLines(){

        if (drawing){

        	// clear canvas 
        	redrawCanvas();

	        // redraw each stored line
	        for(var i=0;i<storedLines.length;i++){
	        	// final green lines
	            drawContext.beginPath();
	            drawContext.moveTo(storedLines[i].x1,storedLines[i].y1);
	            drawContext.lineTo(storedLines[i].x2,storedLines[i].y2);
	            drawContext.strokeStyle="green";
	            drawContext.stroke();
	            drawContext.closePath();
	        }
	    }
    }